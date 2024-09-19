# Base image
FROM node:22-alpine3.19 AS base

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]