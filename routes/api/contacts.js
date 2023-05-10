const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { sсheams } = require("../../schemas/schemas");

router.get("/", ctrl.getContacts);
router.get("/:contactId", isValidId, ctrl.getByIdContact);
router.post("/", validateBody(sсheams.addSchema), ctrl.postContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(sсheams.addSchema),
  ctrl.putContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(sсheams.updateFavoriteSchema),
  ctrl.patchContact
);
router.delete("/:contactId", isValidId, ctrl.deteleContact);
module.exports = router;
