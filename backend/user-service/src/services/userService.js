const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

exports.createUser = async (userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return await userRepository.createUser(userData);
};

exports.updateUser = async (id, userData) => {
  if (userData.password) {
    const existingUser = await userRepository.getUser(id);
    if (existingUser.password !== userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
  }
  return await userRepository.updateUser(id, userData);
};

exports.getUser = async (id) => {
  return await userRepository.getUser(id);
};

exports.getUsers = async () => {
  return await userRepository.getUsers();
};

exports.getUserSettings = async (id) => {
  return await userRepository.getUserSettings(id);
};

exports.updateUserSettings = async (id, settings) => {
  return await userRepository.updateUserSettings(id, settings);
};

exports.healthCheck = async () => {
  return await userRepository.healthCheck();
};
