const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const avatarURL = [];

router.get("/", (req, res) => {
  res.json(avatarURL);
});

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");
router.post("/", upload.single("avatar"), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUload);
});

module.exports = router;
