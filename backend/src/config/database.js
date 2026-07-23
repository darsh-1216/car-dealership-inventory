const mongoose = require("mongoose");

async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  return mongoose.connect(process.env.MONGO_URI);
}

module.exports = {
  connectToDatabase,
};
