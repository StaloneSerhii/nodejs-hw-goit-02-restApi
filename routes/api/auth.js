const express = require("express");
const cntl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemasAuth } = require("../../schemas/schemas");

const router = express.Router();
router.post(
  "/register",
  validateBody(schemasAuth.registerSchema),
  cntl.register
);
router.post(
  "/verify",
  validateBody(schemasAuth.emailShemas),
  cntl.resendVerifyEmail
);

router.get("/verify/:verificationToken", cntl.verificationToken);
router.post("/login", validateBody(schemasAuth.loginSchema), cntl.login);
router.get("/current", authenticate, cntl.current);
router.post("/logout", authenticate, cntl.logout);
router.patch(
  "/",
  validateBody(schemasAuth.subscript),
  authenticate,
  cntl.patchSubscription
);
router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  cntl.patchAvatar
);
module.exports = router;
