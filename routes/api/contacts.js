const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacs");

router.get("/", ctrl.getContacts);
router.get("/:contactId", ctrl.getByIdContact);
router.post("/", validateBody(schemas.addSchema), ctrl.postContact);
router.put("/:contactId", validateBody(schemas.addSchema), ctrl.putContact);
router.delete("/:contactId", ctrl.deteleContact);

module.exports = router;
