FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/dictionary-server /usr/src/app/dictionary-server
CMD [ "node", "dictionary-server/server.js"]
