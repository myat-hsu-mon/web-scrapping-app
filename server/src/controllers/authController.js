const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const validator = require("email-validator");

const { getUserByEmail, getUserById, createUser } = require("./userController");

const saltRounds = parseInt(process.env.SALT_ROUND);
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isEmailValid(email)) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }
    const hashedPassword = await getHashPassword(password);
    const newUser = await createUser({ name, email, password: hashedPassword });
    const token = await signToken(newUser.id);
    newUser.password = null;

    return res.status(201).json({
      status: "success",
      message: "Signup Successfully!",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email or password is required",
    });
  }
  try {
    if (!isEmailValid(email)) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: "Please sign up",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = await signToken(user.id);
    user.password = null;

    res.status(200).json({
      status: "success",
      message: "Signed in successfully!",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error.message,
    });
  }
};

const getHashPassword = async (plainTextPassword) => {
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  return hashedPassword;
};

const signToken = async (id) => {
  return await jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresIn });
};

const protect = async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Provide token to authenticate",
    });
  }
  try {
    const decoded = await verifyToken(token, jwtSecretKey);
    const { id } = decoded;
    const user = await getUserById(id);
    if (!user) {
      return res.status(400).json({
        message: "No user exists with this token!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error.message,
    });
  }
};

const verifyToken = async (token, jwtSecretKey) => {
  try {
    return await promisify(jwt.verify)(token, jwtSecretKey);
  } catch (error) {
    return error;
  }
};

const isEmailValid = (email) => {
  return validator.validate(email);
};

module.exports = {
  signUp,
  signIn,
  protect,
};
