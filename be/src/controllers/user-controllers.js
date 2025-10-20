const UserService = require("../services/user-services");
const inputValidationException = require("../exceptions/inputValidationException");
const User = require("../models/user");
const addNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, type } = req.body;
    let user = {
      firstName,
      lastName,
      email,
      password,
      type,
    };

    user = await UserService.addNewUser(user);
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res
      .status(error instanceof inputValidationException ? 400 : 500)
      .send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await UserService.loginUser({ email, password });
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id });
    user.tokens.filter((token) => token !== req.token);
    await user.save();
    return res.status(200).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    let studentList = await User.find({ type: "STUDENT" });
    return res.status(200).send(studentList);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { addNewUser, loginUser, logoutUser, getStudents };
