FROM node:10
WORKDIR /app
CMD ls -l && npm install && npm start