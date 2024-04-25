const role = require("../../schemas/roleSchema");
const messageStore = require("../../util/messageStore");

/* GET ALL ROLE'S */
const getAllRoles = async (_request, _response) => {
  try {
    const roles = await role.find({}, "_id name", { sort: { createdOn: -1 } });
    _response.status(200).json(roles);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};

/* GET SINGAL ROLE VIA ID */
const getRoleById = async (_request, _response) => {
  try {
    const { id } = _request?.params;
    const response = await role.findById({ _id: id }, "_id name");
    _response.status(200).json(response);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};

/* GET ROLE BY NAME */
const getRoleByName = async (_request, _response) => {
  try {
    const { name } = _request?.params;
    const record = await role.findOne({ name: name });
    _response.status(200).json(record);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};
/* CREATE NEW ROLE */
const createRole = async (_request, _response) => {
  const { name } = _request?.body;
  const defineRole = {
    name: name,
    modifiedOn: Date.now(),
  };
  const createRole = new role(defineRole);
  try {
    const createdDocument = await createRole.save();
    const { _id } = createdDocument;
    _response
      .status(201)
      .send(`New role ${name} has been created with ID ${_id}`);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};
/* UPDATE ROLE */
const updateRole = async (_request, _response) => {
  try {
    const { id } = _request?.params;
    const { name } = _request?.body;
    const newDocument = {
      modifiedOn: Date.now(),
      name: name,
    };
    const result = await role.findByIdAndUpdate({ _id: id }, newDocument, {
      new: true,
    });
    _response.status(200).json(result);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};
/* DELETE ROLE */
const deleteRole = async (_request, _response) => {
  const { id } = _request?.params;
  try {
    const result = await role.deleteOne({
      _id: id,
    });
    _response.status(204).send();
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};
module.exports = {
  createRole,
  getRoleByName,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
};
