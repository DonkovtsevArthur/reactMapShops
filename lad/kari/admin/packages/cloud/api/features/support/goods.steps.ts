import { When, Then } from 'cucumber';
import TestServer from '../../server';
import { expect } from 'chai';
import * as Sinon from 'sinon';

When('делается Get запрос на {string}', async function(url) {
  const response = await this.server.inject({
    method: 'GET',
    url
  });
  this.response = response;
});

Then('возвращается Work!', function() {
  expect(this.response.payload).to.equal('Work!');
});

Then('возврашается массив валидныx групп', function() {
  expect(this.response.payload)
    .to.be.an('array')
    .that.includes(this.group);
});

Then('возвращается массив валидных групп с параметром parentId=1', function() {
  expect(this.response.payload)
    .to.be.an('array')
    .that.includes(this.group)
    .that.include({ parentId: 1 });
});

Then('возвращается пустой массив', function() {
  expect(this.response.payload).to.be.an('array').that.is.empty;
});

Then('возвращается ошибка 406 Not Acceptable', function() {
  expect(this.response.statusCode).to.be.equal(406);
});

Then('возвращается ошибка 404 Not found', function() {
  expect(this.response.statusCode).to.be.equal(404);
});

Then('возвращается массив валидных артиклей товаров', function() {
  expect(this.response.payload)
    .to.be.an('array')
    .that.includes(this.article);
});

Then('возвращается массив валидных артиклей товаров c groupId=1', function() {
  expect(this.response.payload)
    .to.be.an('array')
    .that.includes(this.article)
    .include({ groupId: 1 });
});

Then('возвращается валидный артикль товара с articleId=5', function() {
  expect(this.response.payload)
    .to.be.an('array')
    .that.includes(this.article)
    .include({ articleId: 5 });
});

Then('возвращается массив валидных товаров', function() {
  expect(this.response.payload)
    .to.be.an('array')
    .that.includes(this.item);
});

Then('возвращается то возвращается валидный товар', function() {
  expect(this.response.payload).to.be.equal(this.item);
});
