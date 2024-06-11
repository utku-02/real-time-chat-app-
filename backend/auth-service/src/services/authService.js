const authRepository = require('../repositories/authRepository');
const producer = require('../utils/producer');
const emailSender = require('../utils/emailSender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await authRepository.createUser({ ...userData, password: hashedPassword });
    await producer.sendMessage('user.registered', user);
    return user;
};

exports.loginUser = async ({ email, password }) => {
    const user = await authRepository.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

exports.forgotPassword = async (email) => {
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await emailSender.sendEmail(email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
};

exports.resetPassword = async (token, newPassword) => {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authRepository.updateUserPassword(decoded.id, hashedPassword);
};

exports.healthCheck = async () => {
    return await authRepository.healthCheck();
};
