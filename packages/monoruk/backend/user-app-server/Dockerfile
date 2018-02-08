FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/user-app-server /usr/src/app/user-app-server
CMD [ "node", "user-app-server/server.js"]
