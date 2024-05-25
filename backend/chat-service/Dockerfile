FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY src /usr/src/app/src

EXPOSE 3001

CMD ["node", "src/index.js"]
