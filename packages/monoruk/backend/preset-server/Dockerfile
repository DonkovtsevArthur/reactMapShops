FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/preset-server /usr/src/app/preset-server
CMD [ "node", "preset-server/server.js"]
