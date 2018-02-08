FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/develop-user-server /usr/src/app/develop-user-server
CMD [ "node", "develop-user-server/server.js"]
