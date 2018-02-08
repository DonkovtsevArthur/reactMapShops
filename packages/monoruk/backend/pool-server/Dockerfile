FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/pool-server /usr/src/app/pool-server
CMD [ "node", "pool-server/server.js"]
