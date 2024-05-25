const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3000';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://user-service:3000';
const chatServiceUrl = process.env.CHAT_SERVICE_URL || 'http://chat-service:3001';
const messageServiceUrl = process.env.MESSAGE_SERVICE_URL || 'http://message-service:3002';

app.use('/auth', createProxyMiddleware({
  target: authServiceUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '/',
  },
}));

app.use('/users', createProxyMiddleware({
  target: userServiceUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/users': '/',
  },
}));

app.use('/chats', createProxyMiddleware({
  target: chatServiceUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/chats': '/',
  },
}));

app.use('/messages', createProxyMiddleware({
  target: messageServiceUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/messages': '/',
  },
}));

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
