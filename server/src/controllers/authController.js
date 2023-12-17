const { getUserByEmail, createUser } = require("./userController");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    return res.status(400).json({
      message: "User already exists.",
    });
  }

  //hash password
  const hashPassword = "";
  const newUser = await createUser({ name, email, password: hashPassword });

  return res.status(201).json({
    status: "success",
    message: "A user is created!",
    data: newUser,
  });
};

const signIn = async (req, res) => {};

module.exports = {
  signUp,
  signIn,
};
