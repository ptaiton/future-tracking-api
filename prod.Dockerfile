FROM node:12.13.0-alpine
COPY build/ /usr/app

RUN apk update && apk add --no-cache wget && apk --no-cache add openssl wget && apk add ca-certificates && update-ca-certificates

RUN wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C / \
    && npm config set user 0 \
    && npm install -g phantomjs-prebuilt
    
RUN apk add --update ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family && rm -rf /var/cache/apk/*

ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_HOST

ENV LISTEN_PORT=80
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_HOST=${MYSQL_HOST}

EXPOSE 80
CMD ["node", "/usr/app/index.js"]
