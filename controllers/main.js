const jwt = require("jsonwebtoken");
// const CustomAPIError = require("../errors/custom-error");
const { BadRequest } = require("../errors/index");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    // throw new BadRequest("Please provide email and password", 400);
    throw new BadRequest("Please provide email and password");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //   console.log(username, password);
  //   res.send("Fake login/register/signup route");
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // console.log(req.headers);
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   throw new CustomAPIError("No token provided", 401);
  // }

  // const token = authHeader.split(" ")[1];
  // console.log(token);

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   // console.log(decoded);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
  });
  // } catch (error) {
  //   throw new CustomAPIError("Not authorized to access this route", 401);
  // }
};

module.exports = {
  login,
  dashboard,
};
