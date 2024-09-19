# Base image
FROM node:22-alpine3.19 AS base

WORKDIR /app

COPY package*.json .

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

CMD [ "npm", "run", "dev" ]
