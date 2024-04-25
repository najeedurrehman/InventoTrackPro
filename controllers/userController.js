const userModel = require("../schemas/userScheme");
const messageStore = require("../util/messageStore");

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
/* CREATE USER  */
const createUser = async (_request, _response, next) => {
  try {
    const { firstname, middlename, lastname, email, username } = _request?.body;
    const defineUser = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      username: username,
      modifiedOn: Date.now(),
    };

    const user = new userModel(defineUser);
    const { _id } = await user.save();
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
    const users = await userModel.find(
      {},
      "_id firstname middlename lastname email username",
      {
        sort: {
          createdOn: -1,
        },
      }
    );
    return _response.status(200).json(users);
  } catch (err) {
    return _request.status(500).json(messageStore.internalServerError(err));
  }
};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
};