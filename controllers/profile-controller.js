const { userModel, roleModel } = require("../schemas/schemas");

/* DELETE USER */
const deleteUser = async (req, res) => {
  const { id } = req?.params;
  try {
    /* GET ROLE  */
    const {
      role: { _id },
    } = await userModel.findById({ _id: id }).populate("role", "_id name");

    /* REMOVE USER FROM DATA-SOURCE */
    await userModel.findByIdAndDelete({
      _id: id,
    });
    /* REMOVE USER-ID FROM ROLES DATA-SOURCE */
    await roleModel.findByIdAndUpdate(
      { _id: _id },
      {
        $pop: {
          role: _id,
        },
      }
    );

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
/* UPDATE USER */
const updateUser = async (req, res) => {
  const { id } = req?.params;

  const { firstname, middlename, lastname } = req?.body;

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
        select: "_id firstname middlenae lastname email username",
      }
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

/* GET ALL USER PROFILE*/
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({}, "_id firstname middlename lastname email username", {
        sort: {
          createdOn: -1,
        },
      })
      .populate("role", "name");
    return res.status(200).json(users);
  } catch (err) {
    return req.status(500).json({
      error: err,
    });
  }
};
/* GET SINGLE USER PROFILE */
const getUser = async (req, res) => {
  const { id } = req?.params;
  try {
    const user = await userModel
      .findById(
        {
          _id: id,
        },
        "_id firstname middlename lastname email username"
      )
      .populate("role", "_id name");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
};
