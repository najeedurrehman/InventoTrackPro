const role = require("../../models/roleModel");
const messageStore = require("../../util/messageStore");

/* GET ALL ROLE'S */
const getAllRoles = async (_request, _response) => {
  try {
    const roles = await role.where().find({});
    _response.status(200).json(roles);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};

/* GET SINGAL ROLE VIA ID */
const getRoleById = async (_request, _response) => {
  try {
    const response = await role.findById(_request.params?.id);
    _response.status(200).json(response);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};

/* GET ROLE BY NAME */
const getRoleByName = async (_request, _response) => {
  try {
    const record = await role.findOne({ name: _request.params?.name });
    _response.status(200).json(record);
  } catch (err) {
    _response.status(500).json(messageStore.internalServerError(err));
  }
};
/* CREATE NEW ROLE */
const createRole = async (_request, _response) => {
  const { name } = _request.body;
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
  
  clg(_request.params?.roleId);
  _response.status(200).send("OK");

};
/* DELETE ROLE */
const deleteRole = async (_request, _response) => {

};
module.exports = {
  createRole,
  getRoleByName,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole
};
