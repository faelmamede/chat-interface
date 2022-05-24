FROM alpine:3.14

ENV NODE_VERSION 14.15.3

WORKDIR /usr/frontend/src/app

COPY . .
RUN apk add --update nodejs npm
RUN npm install

CMD [ "npm", "start" ]