const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contact = await fs.readFile(contactsPath);
  return JSON.parse(contact);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};

const addContact = async (body) => {
  const getContact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  getContact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(getContact, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const getContact = await listContacts();
  const result = getContact.findIndex((item) => item.id === contactId);
  if (result === -1) {
    return null;
  }
  getContact[result] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(getContact, null, 2));
  return getContact[result];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
