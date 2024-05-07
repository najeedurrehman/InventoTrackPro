const { userModel, roleModel } = require("../schemas/schemas");

/* PACKAGES */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

/* HELPER FUNCTION */
const tokenGenerator = async (payload) => {
  const maxTime = 2 * 24 * 60 * 60; /* CONVERT TWO DAY IN SEC */
  const token = await jwt.sign(payload, process.env.SECRETKEY, {
    expiresIn: maxTime,
  });

  return token;
};

/* CONTROLLER'S */
const signIn = async (req, res) => {
  console.log(req?.host);
  const { email, password } = req?.body;
  const authenticationFailed =
    "Login failed. The email or password you entered is incorrect.";
  try {
    const user = await userModel
      .findOne({ email: email }, "_id email password role")
      .populate("role", "_id name");

    if (user == null)
      return res.status(401).json({ error: authenticationFailed });

    const encryptedPassword = user?.password;
    const verifyPassword = await bcrypt.compare(password, encryptedPassword);

    if (!verifyPassword)
      return res.status(401).json({ error: authenticationFailed });

    const {
      _id,
      role: { name },
    } = user;

    const payload = {
      id: _id,
      role: name,
    };

    const token = await tokenGenerator(payload);
    res.cookie("auth_token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Welcome back! You're logged in.",
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
const signUp = async (req, res) => {
  try {
    const { firstname, middlename, lastname, email, username, password, role } =
      req?.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const defineUser = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      username: username,
      password: encryptedPassword,
      modifiedOn: Date.now(),
      role: role,
    };

    const user = new userModel(defineUser);
    const { _id } = await user.save();

    const updateRecord = await roleModel.findByIdAndUpdate(
      { _id: role },
      {
        $push: {
          users: _id,
        },
      }
    );

    return res
      .status(201)
      .send(`New User ${username} has been created with ID ${_id}`);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
const logout = async (req, res) => {
  const cookie = req.cookies.auth_token;
  if (cookie) {
    res.cookie("auth_token", "", { maxAge: 0 });
  }
  res.status(200).json({
    message: "You have been successfully logged out.",
  });
};

const forgetPassword = async (req, res) => {
  const { email, password } = req?.body;
  try {
    const verifyUserEmail = await userModel.findOne(
      { email: email },
      "_id email"
    );
    if (verifyUserEmail == null)
      return res.status(400).json({
        error: "We couldn't find an account associated with the email address",
      });

    /* ADDING EMAIL FUNCTIONALITY LATER */

    const encryptPassword = await bcrypt.hash(password, 10);
    const { _id } = verifyUserEmail;

    const updatePassword = await userModel.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        $set: {
          password: encryptPassword,
          modifiedOn: Date.now(),
        },
      },
      {
        new: false,
      }
    );

    return res.status(200).json({
      message: "Your password has been successfully changed.",
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  signIn,
  signUp,
  logout,
  forgetPassword,
};
