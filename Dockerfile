#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy Files
COPY ./build /usr/src/app
COPY ./package.json /usr/src/app
COPY ./config /config

VOLUME ["/usr/src/app/config"]

RUN npm i --production

CMD ["npm", "start"]
