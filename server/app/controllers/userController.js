const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist with same email." });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = new userModel({ name, email, password: hashPassword });

    // Replace the existing document with new one which is passed, but
    // update() will update existing document with values
    await user.save();
    res.json({
      userId: user._id,
      name,
      email,
      message: "Registered Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    let isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    // const authToken = jwt.sign({ userId: result._id }, process.env.SECRET_KEY, {
    //   expiresIn: 10,
    // });

    res.json({
      userId: user._id,
      name: user.name,
      email,
      message: "Login Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

const findUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findOne({ _id: userId });
    delete user.password;
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

const getUsers = async (req, res) => {
    try {
      const users = await userModel.find();
      users = users.map((user,ind) => {
        delete user.password;
      })
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  };

module.exports = { registerUser, loginUser, findUser, getUsers };
