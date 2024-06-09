const userRepository = require('../repositories/userRepository');

exports.createUser = async (userData) => {
  return await userRepository.createUser(userData);
};

exports.updateUser = async (id, userData) => {
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
