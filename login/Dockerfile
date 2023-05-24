FROM alpine:3.14

ENV NODE_VERSION 14.15.3

WORKDIR /opt/login

EXPOSE 8080

COPY . .
RUN apk add --update nodejs npm

CMD [ "node", "app.js" ]