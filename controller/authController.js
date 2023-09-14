// all the authrentication code is implment here

// importing
const userModel = require("./../models/usermodel");

//1) user signUp

exports.signUp = async (req, res) => {
  console.log(req.body);
  // const { name } = req.body;
  // , email, password, confirmPassword, quotesType
  // console.log(req.body.name);
  res.end("no");
};
