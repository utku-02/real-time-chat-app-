FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY ../common/rabbit-mq ./common/rabbit-mq

EXPOSE 3000

CMD ["node", "src/index.js"]
