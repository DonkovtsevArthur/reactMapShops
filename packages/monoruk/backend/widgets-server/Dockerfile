FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/widgets-server /usr/src/app/widgets-server
CMD [ "node", "widgets-server/server.js"]
