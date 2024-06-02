const authRepository = require('../repositories/authRepository');
const producer = require('../utils/producer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await authRepository.createUser({ ...userData, password: hashedPassword });
    await producer.sendMessage('user.registered', user);
    return user;
};

exports.loginUser = async ({ email, password }) => {
    const user = await authRepository.getUserByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
