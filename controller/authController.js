// all the authrentication code is implment here

// importing
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const { UUID } = require("sequelize");
const User = db.User;
const QuoteMap = db.QuotesMap;

console.log(User);

//1) user signUp

exports.signUp = catchAsync(async (req, res, next) => {
  let { name, email, password, quotesType } = req.body;
  const exitUser = await User.findOne({ where: { email: email } });
  if (exitUser) {
    return next(new AppError("user already exit try another email", 400));
  }

  // then hashed the password
  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = jwt.sign({ id: user.id }, "your-secret-key", {
    expiresIn: "1h",
  });

  // create the junction table
  const type = quotesType.split(",");
  type.forEach(async (element) => {
    await QuoteMap.create({ user: user.id, type: element });
  });

  return res.status(201).json({
    status: "success",
    message: "Successfully create user",
    token: token,
    data: {
      user,
    },
  });
});

// 2) user login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //first check  the email and password
  if (!email || !password) {
    next(new AppError("please provide email and password"));
  }

  // now check the current user is in database or not
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return next(new AppError("Invalid Credentials try again later", 401));
  }
  // now compare the passowords
  const isPasswordValid = bcrypt.compare(user.password, password);
  if (!isPasswordValid) {
    return next(new AppError("Invalid Credentials try again later", 401));
  }

  // now generate the jwt token
  const token = jwt.sign({ id: user.id }, "your-secret-key", {
    expiresIn: "1h",
  });

  console.log(user);
  return res.status(200).json({
    message: "Success",
    token: token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decode = jwt.verify(token, "your-secret-key");
  req.user = decode.id;
  next();
});
