FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/1c-datasource /usr/src/app/1c-datasource
CMD [ "node", "1c-datasource/index.js"]
