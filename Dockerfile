FROM node:11.15.0-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ] AS prod
