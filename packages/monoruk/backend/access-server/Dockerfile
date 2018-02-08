FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/access-server /usr/src/app/access-server
CMD [ "node", "access-server/server.js"]
