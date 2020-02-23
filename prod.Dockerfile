FROM node:12.13.0-alpine
COPY build/ .
EXPOSE 80
CMD ["node", "server.js"]
