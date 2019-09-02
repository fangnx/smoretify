FROM node:10
WORKDIR /app
CMD ls -ltr && npm install && npm start