const authRepository = require('../repositories/authRepository');
const producer = require('../utils/producer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await authRepository.createUser({ ...userData, password: hashedPassword });
    await producer.sendMessage('user.registered', user);
    return user;
};

exports.login = async (loginData) => {
    const user = await authRepository.findUserByEmail(loginData.email);
    if (!user || !await bcrypt.compare(loginData.password, user.password)) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
