const { User } = require("../models/User");

async function createUser(userData) {
  return User.create(userData);
}

async function findUserByUsername(username) {
  return User.findOne({ username });
}

async function getAllUsers() {
  return User.find();
}

module.exports = {
  createUser,
  findUserByUsername,
  getAllUsers,
};
