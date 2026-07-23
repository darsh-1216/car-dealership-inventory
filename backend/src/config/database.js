const mongoose = require("mongoose");
const dns = require("dns");

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (error) {
  // Ignore DNS set error if environment disallows overriding DNS
}

async function connectToDatabase() {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  return mongoose.connect(process.env.MONGO_URI);
}

module.exports = {
  connectToDatabase,
};

