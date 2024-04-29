const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../schemas/userScheme");
const roleModel = require("../schemas/roleSchema");
const messageStore = require("../util/messageStore");

require("dotenv").config();

/* TOKEN GENERATOR */
const tokenGenerator = async (payload) => {
  const expireTime = 3 * 24 * 60 * 60; /* THREE DAY IN SECOND */
  const token = await jwt.sign(payload, process.env.SECRETKEY, {
    expiresIn: expireTime,
  });
  return token;
};
/* READ ARTICLE https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely */
/* AUTHENTICATE USER FOR LOGIN */
const authenticateUser = async (_request, _response) => {
  const authFailedMessage =
    "Login failed. The username or password you entered is incorrect.";

  const { email, password } = _request?.body;
  try {
    const user = await userModel
      .findOne({ email: email }, "_id email password")
      .populate("role", "_id name");

    if (user == null)
      return _response.status(400).json({
        message: authFailedMessage,
      });

    const encryptedPassword = user?.password;
    const verifyPassword = await bcrypt.compare(password, encryptedPassword);

    if (!verifyPassword)
      return _response.status(400).json({
        message: authFailedMessage,
      });

    const {
      _id,
      role: { name },
    } = user;

    const definePayload = {
      id: _id,
      role: name,
    };

    const token = await tokenGenerator(definePayload);
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    _response.cookie("token", token, {
      httpOnly: true,
      maxAge: maxAge,
    });
    return _response.status(200).json({
      message: "Welcome back! You're logged in.",
    });
  } catch (err) {
    return _response.status(500).json(messageStore.internalServerError(err));
  }
};

/* DELETE USER */
const deleteUser = async (_request, _response) => {
  const { id } = _request?.params;
  try {
    const result = await userModel.findByIdAndDelete({
      _id: id,
    });
    return _response.status(204).send(); /*  */
  } catch (err) {
    return _response.status(500).json(messageStore.internalServerError(err));
  }
};
/* UPDATE USER */
const updateUser = async (_request, _response) => {
  const { id } = _request?.params;

  const { firstname, middlename, lastname } = _request?.body;

  const newDocument = {
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    modifiedOn: Date.now(),
  };

  try {
    const result = await userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      newDocument,
      {
        new: true,
      }
    );

    return _response.status(200).json(result);
  } catch (err) {
    return _response.status(500).json(messageStore.internalServerError(err));
  }
};
/* CHANGE PASSWORD */
const changePassword = async (_request, _response) => {
  const { id } = _request?.params;
  const { password } = _request?.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          password: encryptedPassword,
        },
      },
      {
        new: false,
      }
    );

    return _response.status(200).json({
      message: "Your password has been successfully changed.",
    });
  } catch (err) {
    return _response.status(500).json(messageStore.internalServerError(err));
  }
};
/* CREATE USER  */
const createUser = async (_request, _response) => {
  try {
    const { firstname, middlename, lastname, email, username, password, role } =
      _request?.body;

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

    /* ADD USER INTO ROLE */

    const roleRecord = await roleModel.findById(role);
    const { users } = roleRecord;
    users.push(_id);

    const updateRecord = await roleModel.findByIdAndUpdate(
      { _id: role },
      {
        $push: {
          users: _id,
        },
      }
    );

    _response
      .status(201)
      .send(`New User ${username} has been created with ID ${_id}`);
  } catch (err) {
    const message = messageStore.internalServerError(err);
    _response.status(500).json(message);
  }
};
/* GET ALL USER */
const getAllUsers = async (_request, _response) => {
  try {
    const users = await userModel
      .find({}, "_id firstname middlename lastname email username", {
        sort: {
          createdOn: -1,
        },
      })
      .populate("role", "name");
    return _response.status(200).json(users);
  } catch (err) {
    return _request.status(500).json(messageStore.internalServerError(err));
  }
};
/* GET SINGLE USER */
const getUser = async (_request, _response) => {
  const { id } = _request?.params;
  try {
    const user = await userModel.findById(
      {
        _id: id,
      },
      "_id firstname middlename lastname email username"
    );

    return _response.status(200).json(user);
  } catch (err) {
    return _response.status(500).json(messageStore.internalServerError(err));
  }
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  changePassword,
  authenticateUser,
};
