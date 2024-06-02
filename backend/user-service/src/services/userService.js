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

exports.handleUserUpdate = async (user) => {
    console.log('User updated:', user);
    // Add logic to handle user update if necessary
};
