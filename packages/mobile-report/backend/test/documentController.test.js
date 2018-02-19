'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const products = [{
    "uuid": "test",
    "code": "test",
    "barCodes": ["test"],
    "alcoCodes": ["test"],
    "name": "test",
    "price": 1,
    "quantity": 1,
    "costPrice": 1,
    "measureName": "test",
    "tax": "NO_VAT",
    "allowToSell": true,
    "description": "test",
    "articleNumber": "test",
    "parentUuid": "test",
    "group": true,
    "type": "NORMAL",
    "alcoholByVolume": 1,
    "alcoholProductKindCode": 1,
    "tareVolume": 1,
    "fields": {}
}];

const documents = [
    {
        "uuid": "test",
        "type": "SELL",
        "transactions": [
            {
                "type": "DISCOUNT_DOCUMENT"
            }
        ]
    }
];

const settings = {
    urlProd: '/api/v1/inventories/stores/121212/products',
    urlDoc: '/api/v1/inventories/stores/121212/documents',
    auth: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`
    }
};

function incompleteTest(payload, url, settings, name, optional) {
    for(let prop in payload[0]) {
        let newPayload = []
        let newItem = Object.assign({}, payload[0], {});
        delete newItem[prop];
        newPayload.push(newItem);
        it(`Загрузка ${name} с недостающим свойством ${prop}`, (done)=>{
            chai.request(process.env.TEST_API_HOST)
                .post(url)
                .set(settings.auth)
                .send(newPayload)
                .end((err, res) => {
                    if(optional) {
                        let opt = optional.filter((item)=>{
                            return prop == item ? true : false
                        });
                        if(opt.length > 0) {
                            res.should.have.status(200);
                            done();
                        } else {
                            expect(res.body[0].code).equal(2002);
                            done();
                        }
                    } else {
                        expect(res.body[0].code).equal(2002);
                        done();
                    }
                });
        });
    }
}

function wrongPropTest(payload, url, settings, name) {
    for(let prop in payload[0]) {
        let newPayload = []
        let newItem = Object.assign({}, payload[0], {});
        switch(typeof newItem[prop]) {
            case 'string':
                newItem[prop] = 1;
                break;
            case 'object':
            case 'number':
            case 'boolean':
                newItem[prop] = 'string';
                break;
            default:
                break;
        }
        newPayload.push(newItem);
        it(`Загрузка ${name} с неправильным свойством ${prop}`, (done)=>{
            chai.request(process.env.TEST_API_HOST)
                .post(url)
                .set(settings.auth)
                .send(newPayload)
                .end((err, res) => {
                    expect(res.body[0].code).equal(2003);
                    done();
                });
        });
    }

};

describe('Document controller', ()=>{
    describe('getProducts',()=>{
        it('Запрос без параметров. Должен возвращаться массив',(done)=>{
            chai.request(process.env.TEST_API_HOST)
                .get('/api/v1/inventories/stores/12/products')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        it('Запрос с параметрами. Должен возвращаться массив',(done)=>{
            chai.request(process.env.TEST_API_HOST)
                .get('/api/v1/inventories/stores/12/products?page=12&size=2')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        it('Код 404 если нет такого магазина',(done)=>{
            chai.request(process.env.TEST_API_HOST)
                .get('/api/v1/inventories/stores/121212/products')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('Неверно задан параметр page',(done)=>{
            chai.request(process.env.TEST_API_HOST)
                .get('/api/v1/inventories/stores/121212/products?page=qwe')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(400);
                    chai.expect(res.body[0].code).equal(2003);
                    done();
                });
        });
        it('Неверно задан параметр size',(done)=>{
            chai.request(process.env.TEST_API_HOST)
                .get('/api/v1/inventories/stores/121212/products?size=qwe')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body[0].code).equal(2003);
                    done();
                });
        });
        it('Неверно заданы оба параметра',(done)=>{
            chai.request(process.env.TEST_API_HOST)
                .get('/api/v1/inventories/stores/121212/products?size=qwe&page=qwe')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body[0].code).equal(2003);
                    done();
                });
        });

    });
    describe('pushProducts', ()=>{
        it('Загрузка валидного продукта', (done)=>{
            chai.request(process.env.TEST_API_HOST)
                .post('/api/v1/inventories/stores/121212/products')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .send(products)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        incompleteTest(products, settings.urlProd, settings, 'ПРОДУКТА', ["fields"]);

        wrongPropTest(products, settings.urlProd, settings, 'ПРОДУКТА');

        it(`Загрузка продукта с лишним свойством test`, (done)=>{
            let newProducts = []
            let newProduct = Object.assign({}, products[0], {});
            newProduct.test = 'string';
            newProducts.push(newProduct);
            chai.request(process.env.TEST_API_HOST)
                .post('/api/v1/inventories/stores/121212/products')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .send(newProducts)
                .end((err, res) => {
                    expect(res.body[0].code).equal(2002);
                    done();
                });
        });

    });

    describe('pushDocuments',()=>{
        it('Загрузка валидного документа', (done)=>{
            chai.request(process.env.TEST_API_HOST)
                .post('/api/v1/inventories/stores/121212/products')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
                .set('Content-type', 'application/json')
                .send(products)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        incompleteTest(documents, settings.urlDoc, settings, 'ДОКУМЕНТА');

        wrongPropTest(documents, settings.urlDoc, settings, 'ДОКУМЕНТА');

    });
});
