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
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
};
