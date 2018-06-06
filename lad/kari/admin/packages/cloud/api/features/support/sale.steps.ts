import { When, Then, Given } from 'cucumber';
import TestServer from '../../server';
import { expect } from 'chai';
import * as Sinon from 'sinon';

Given('payload: {string}', function(payload) {
  this.payloadSale = JSON.parse(payload);
});

When('делается Post запрос на {string}', async function(url) {
  const response = await this.server.inject({
    method: 'POST',
    url,
    payload: this.payloadSale
  });
  this.response = response;
});

Then('возвращается 200 Ok', function() {
  expect(this.response.statusCode).to.equal(200);
});

Then('возвращается 400 Bad Request', function() {
  expect(this.response.statusCode).to.equal(400);
});
