FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/apps-server /usr/src/app/apps-server
CMD [ "node", "apps-server/server.js"]
