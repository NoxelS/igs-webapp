FROM node:latest

RUN apt-get update
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY ./dist ./dist
CMD [ "npm", "start" ]