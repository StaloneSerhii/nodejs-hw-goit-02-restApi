const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const contactShema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactShema.post("save", handleMongooseError);

const Contact = model("contact", contactShema);

module.exports = { Contact };
