const validateBody = require("./validateBody");
const isValidId = require("./isValid");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  authenticate,
  upload,
};
