FROM node:16

WORKDIR /usr/src/app

COPY backend/auth-service/ ./auth-service
COPY backend/common/ ./common

WORKDIR /usr/src/app/auth-service
RUN npm install

EXPOSE 3000

CMD ["node", "src/index.js"]
