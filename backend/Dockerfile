FROM node:latest

RUN apt-get update
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
RUN npm build
CMD [ "npm", "start" ]