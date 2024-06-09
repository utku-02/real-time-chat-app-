const userRepository = require('../repositories/userRepository');
const producer = require('../utils/producer');

exports.createUser = async (userData) => {
    const user = await userRepository.createUser(userData);
    await producer.sendMessage('user.registered', user);
    return user;
};

exports.updateUser = async (id, userData) => {
    const user = await userRepository.updateUser(id, userData);
    await producer.sendMessage('user.updated', user);
    return user;
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
    const updatedSettings = await userRepository.updateUserSettings(id, settings);
    await producer.sendMessage('user.settings.updated', { id, settings: updatedSettings });
    return updatedSettings;
};

exports.handleUserUpdate = async (user) => {
    console.log('User updated:', user);
};

exports.healthCheck = async () => {
    return await userRepository.healthCheck();
};
