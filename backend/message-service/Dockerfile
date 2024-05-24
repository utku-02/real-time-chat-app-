FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ../shared-utils/authMiddleware.js ./shared-utils

EXPOSE 3002

CMD ["node", "src/index.js"]
