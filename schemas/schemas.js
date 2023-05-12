const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const subscript = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .max(1)
    .required(),
});

const schemasAuth = {
  registerSchema,
  loginSchema,
  subscript,
};

const sсheams = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { sсheams, schemasAuth };
