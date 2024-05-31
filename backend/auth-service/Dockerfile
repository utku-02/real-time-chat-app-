FROM node:16

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/auth-service
RUN npm install

EXPOSE 3000

CMD ["node", "src/index.js"]
