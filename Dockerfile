FROM node:16-alpine

WORKDIR /app/sp-home-work-api

COPY package*.json ./

RUN npm install

COPY . .

