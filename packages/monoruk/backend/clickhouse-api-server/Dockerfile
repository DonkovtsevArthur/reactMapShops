FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install --production
COPY ./dist/clickhouse-api-server /usr/src/app/clickhouse-api-server
COPY ./configs /usr/src/app/clickhouse-api-server/configs
CMD [ "node", "clickhouse-api-server/server.js"]
