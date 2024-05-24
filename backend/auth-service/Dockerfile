FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY ../shared-utils /usr/src/app/shared-utils

EXPOSE 3000

CMD ["npm", "start"]
