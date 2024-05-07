const { roleModel: role } = require("../schemas/schemas");

/* GET ALL ROLE'S */
const getAllRoles = async (req, res) => {
  try {
    const roles = await role.find({}, "_id name", { sort: { createdOn: -1 } });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/* GET SINGAL ROLE VIA ID */
const getRoleById = async (req, res) => {
  try {
    const { id } = req?.params;
    const response = await role.findById({ _id: id }, "_id name");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/* GET ROLE BY NAME */
const getRoleByName = async (req, res) => {
  try {
    const { name } = req?.params;
    const record = await role.findOne({ name: name });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
/* CREATE NEW ROLE */
const createRole = async (req, res) => {
  const { name } = req?.body;
  const defineRole = {
    name: name,
    modifiedOn: Date.now(),
  };
  const createRole = new role(defineRole);
  try {
    const createdDocument = await createRole.save();
    const { _id } = createdDocument;
    res.status(201).send(`New role ${name} has been created with ID ${_id}`);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
/* UPDATE ROLE */
const updateRole = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name } = req?.body;
    const newDocument = {
      modifiedOn: Date.now(),
      name: name,
    };
    const result = await role.findByIdAndUpdate({ _id: id }, newDocument, {
      new: true,
      select: "_id name",
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
/* DELETE ROLE */
const deleteRole = async (req, res) => {
  const { id } = req?.params;
  try {
    await role.findByIdAndDelete({
      _id: id,
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
/* ROLE WITH USER */
const roleWithUsers = async (req, res) => {
  const { id } = req?.params;

  try {
    const result = await role
      .findById({ _id: id }, "_id name")
      .populate("users", "_id firstname middlename lastname email username");
    return res.status(200).json(result);
  } catch (err) {
    return res
      .status(500)
      .json(messageStore.internalServerError({ error: err }));
  }
};
module.exports = {
  createRole,
  getRoleByName,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
  roleWithUsers,
};
