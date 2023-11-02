const mongoose = require("mongoose");
require("dotenv").config();

URI = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(URI);
}
main()
  .then(() => console.log("MONGODB is connected"))
  .catch((err) => console.log(err));

module.exports = main;
