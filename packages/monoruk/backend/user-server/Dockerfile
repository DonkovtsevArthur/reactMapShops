FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/user-server /usr/src/app/user-server
CMD [ "node", "user-server/server.js"]
