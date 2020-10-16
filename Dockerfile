FROM node:12.19.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn compile

CMD ["yarn", "start"]
