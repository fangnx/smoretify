# Client setup
FROM node:10 as client

RUN mkdir -p /app/client
WORKDIR /app/client	

COPY ./client/package.json /app/client
COPY ./client/package-lock.json /app/client

RUN npm install

COPY ./client /app/client
CMD pwd && ls -l && ls .. && npm start

# Server setup
FROM node:10

WORKDIR /app/
COPY --from=client /app/client/build ./client/build

RUN mkdir -p /app/server
WORKDIR /app/server	

COPY ./server/package.json /app/server
COPY ./server/package-lock.json /app/server

RUN npm install

COPY ./server /app/server
CMD pwd && ls -l && ls .. && npm start