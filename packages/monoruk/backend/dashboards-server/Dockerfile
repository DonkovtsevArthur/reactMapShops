FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/dashboards-server /usr/src/app/dashboards-server
CMD [ "node", "dashboards-server/server.js"]
