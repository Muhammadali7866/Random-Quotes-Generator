// all the authrentication code is implment here

// importing
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const {} = require("uuid");
const { UUIDV4 } = require("sequelize");
const User = db.User;
const { QuotesMap } = require("../models/index");

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
  const types = quotesType.split(",");
  console.log("the tyeps is 0-------------------", types);
  types.forEach(async (element) => {
    await QuotesMap.create({ userId: user.id, type: element });
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

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return next(new AppError("User is not found ", 404));
  }
  await user.destroy();
  return res.status(200).json({
    message: "User is sucessfully deleted",
  });
});

exports.allUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll({});
  return res.status(200).json({
    message: "Success",
    users: users.length,
    Users: {
      users,
    },
  });
});

// exports.forgetPassword = catchAsync(async (req, res, next) => {
//   const user = User.findOne({where:{email:req.body.email}});
//   if(!user){
//     return next(new AppError("There is no user with email"));
//   }
//   const uuid1 = UUIDV4();
//   const uuid2 = uuid4()

// });
