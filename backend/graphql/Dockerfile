FROM node:16
RUN apt-get update && apt-get install -y mongodb-clients
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000 4001
CMD ["node", "src/index.js"]
