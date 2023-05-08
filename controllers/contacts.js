const contacts = require("../models/contacts");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const getListContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, { message: "Not found" });
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "missing fields");
  }
  return res.json(result);
};

const deteleContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.json({ message: "contact deleted" });
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  postContact: ctrlWrapper(postContact),
  getByIdContact: ctrlWrapper(getByIdContact),
  deteleContact: ctrlWrapper(deteleContact),
  putContact: ctrlWrapper(putContact),
};
