const app = require("./app");
const mongoose = require("mongoose");

app.listen(3011, () => {
  console.log("Server running. Use our API on port: 3011");
});

const DB_HOST =
  "mongodb+srv://SergiyAgent:SGALZWqreRGNTh8l@cluster0.6sly2yr.mongodb.net/contactBD?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error);
    process.error();
  });
