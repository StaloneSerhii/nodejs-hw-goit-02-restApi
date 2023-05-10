const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
mongoose.set("strictQuery", true);
// "mongodb+srv://SergiyAgent:SGALZWqreRGNTh8l@cluster0.6sly2yr.mongodb.net/contactBD?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3011);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
