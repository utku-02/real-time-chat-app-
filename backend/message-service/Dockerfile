FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ../shared-utils /usr/src/app/shared-utils

EXPOSE 3002

CMD ["node", "src/index.js"]
