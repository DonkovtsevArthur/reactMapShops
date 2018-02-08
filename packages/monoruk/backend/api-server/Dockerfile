FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/api-server /usr/src/app/api-server
CMD [ "node", "api-server/server.js"]
