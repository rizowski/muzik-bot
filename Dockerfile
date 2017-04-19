FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Copy Files
COPY . /usr/src/app
RUN npm i --production


CMD ["npm", "start"]
