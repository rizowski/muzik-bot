#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setup environment
ENV NODE_CONFIG_DIR /config
ENV CACHE_LOCATION /cache

# Copy Files
COPY ./build /usr/src/app
COPY ./package.json /usr/src/app
COPY ./config /config

RUN npm i --production

CMD ["npm", "start"]
