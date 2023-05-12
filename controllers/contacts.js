// const contacts = require("../models/contacts");
const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const getContacts = async (req, res) => {
  const { favorite } = req.query;
  const { id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner },
    "email subscription favorite",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  if (favorite === "true" || favorite === "false") {
    const myBool = favorite === "true";
    const result = contacts.filter((contact) => contact.favorite === myBool);
    return res.json(result);
  } else if (favorite === undefined) {
    res.json(contacts);
  } else {
    throw HttpError(404, "Not found");
  }
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, { message: "Not found" });
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "missing fields");
  }
  return res.json(result);
};

const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, { message: "missing field favorite" });
  }
  return res.json(result);
};

const deteleContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.json({ message: "contact deleted" });
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  postContact: ctrlWrapper(postContact),
  getByIdContact: ctrlWrapper(getByIdContact),
  deteleContact: ctrlWrapper(deteleContact),
  putContact: ctrlWrapper(putContact),
  patchContact: ctrlWrapper(patchContact),
};
