# Stage 1: Build the React app
FROM node:16 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the React app with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY test.html /usr/share/nginx/html/test.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]