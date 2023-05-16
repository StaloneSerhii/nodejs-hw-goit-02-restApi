const { User } = require("../models/users");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

async function resize(resultUload) {
  const image = await Jimp.read(resultUload);
  await image.resize(250, 250);
  image.write(resultUload);
}

const register = async (req, res) => {
  const { email, password } = req.body;

  /* Пошук існуючиш пошт */
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  // Хешування паролю
  const result = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  // Створення юзера з хешованим паролем і поштою
  const newUser = await User.create({
    ...req.body,
    password: result,
    avatarURL,
  });
  // Поверненя даних на фронт (пошта)
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // Пошук юзера по пошті
  const user = await User.findOne({ email });
  // Перевірка на правильність ведений даних ---логін
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  // і паролю
  const compareRusult = await bcrypt.compare(password, user.password);
  if (!compareRusult) {
    throw HttpError(401, "Email or password invalid");
  }
  // поверненя ід користувача для хешуваня токену
  const payload = {
    id: user._id,
  };
  const { subscription } = user;
  // хешуваня токену
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // Добавленя токену в бд користувачу
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: { email, subscription } });
};

const logout = async (req, res) => {
  // Пошук і видаленя токену користувача
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success" });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const patchSubscription = async (req, res) => {
  const { token } = req.user;
  const { subscription } = req.body;
  const user = await User.findOne({ token });
  await User.findByIdAndUpdate(user._id, { subscription });
  const { email, id } = user;
  res.json({ id, email, subscription });
};

const patchAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUload);
  resize(resultUload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  patchSubscription: ctrlWrapper(patchSubscription),
  patchAvatar: ctrlWrapper(patchAvatar),
};
