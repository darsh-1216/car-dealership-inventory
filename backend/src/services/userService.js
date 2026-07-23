const { createUser, findUserByUsername, getAllUsers } = require("../repositories/userRepository");

async function registerUser(userData) {
  return createUser(userData);
}

async function getUserByUsername(username) {
  return findUserByUsername(username);
}

async function getUsers() {
  return getAllUsers();
}

module.exports = {
  registerUser,
  getUserByUsername,
  getUsers,
};
