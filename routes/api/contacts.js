const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { sсheams } = require("../../schemas/schemas");

router.get("/", authenticate, ctrl.getContacts);
router.get("/:contactId", authenticate, isValidId, ctrl.getByIdContact);
router.post(
  "/",
  authenticate,
  validateBody(sсheams.addSchema),
  ctrl.postContact
);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(sсheams.addSchema),
  ctrl.putContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(sсheams.updateFavoriteSchema),
  ctrl.patchContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deteleContact);
module.exports = router;
