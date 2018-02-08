"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require("../controllers");
describe('Тестирование devUsers', () => {
    process.env.JWT_SECRET = 'test';
    let response;
    beforeEach(() => {
        response = jest.fn();
    });
    describe('Тестирование login', () => {
        const payload = { login: 'test', password: 'qwerty' };
        test('При отсутствии пользователя в базе должен возвращать ошибку 404', async () => {
            const model = {
                findOne: jest.fn().mockReturnValue(undefined),
            };
            await Controller.login(payload, response, model);
            expect(model.findOne).toHaveBeenCalledTimes(1);
            expect(response.mock.calls[0][0].output.statusCode).toBe(404);
        });
        test('Если пользователь найден но передан неверный пароль, должен возвращать 500', async () => {
            const user = {
                comparePassword: jest.fn().mockReturnValue(false),
            };
            const model = {
                findOne: jest.fn().mockReturnValue(user),
            };
            await Controller.login(payload, response, model);
            expect(user.comparePassword).toHaveBeenCalledTimes(1);
            expect(user.comparePassword).toHaveBeenCalledWith('qwerty');
            expect(response.mock.calls[0][0].output.statusCode).toBe(500);
        });
        test('Если пользователь найден и передан верный пароль, должен возвращаться jwt', async () => {
            const user = {
                _id: '1',
                comparePassword: jest.fn().mockReturnValue(true),
            };
            const model = {
                findOne: jest.fn().mockReturnValue(user),
            };
            await Controller.login(payload, response, model);
            expect(user.comparePassword).toHaveBeenCalledTimes(1);
            expect(user.comparePassword).toHaveBeenCalledWith('qwerty');
            expect(response.mock.calls[0][1].token).toBeDefined();
        });
    });
    describe('Тестирование add', () => {
        const payload = { login: 'test', password: 'qwerty' };
        test('Если пользователь уже есть. Вовращается 409', async () => {
            const model = {
                findOne: jest.fn().mockReturnValue({}),
            };
            await Controller.add(payload, response, model);
            expect(response.mock.calls[0][0].output.statusCode).toBe(409);
        });
        test('Если пользователя нет. То он создаётся и возвращается токен', async () => {
            const model = {
                findOne: jest.fn().mockReturnValue(undefined),
                create: jest.fn().mockReturnValue(true),
            };
            await Controller.add(payload, response, model);
            expect(response.mock.calls[0][1].token).toBeDefined();
        });
    });
    describe('Тестирование appAdd', () => {
        const payload = { developId: 'test', appId: 'test' };
        test('Если нет разработчика с таким developId. Возвращает 400', async () => {
            const model = {
                findOne: jest.fn().mockReturnValue(undefined),
            };
            await Controller.appAdd(payload, response, model);
            expect(response.mock.calls[0][0].output.statusCode).toBe(400);
        });
        test('Если разработчик есть. Добавляет ему новое приложение и возвращает 200', async () => {
            const user = {
                update: jest.fn().mockReturnValue(true),
            };
            const model = {
                findOne: jest.fn().mockReturnValue(user),
            };
            await Controller.appAdd(payload, response, model);
            expect(user.update).toHaveBeenCalledTimes(1);
            expect(response.mock.calls[0][1]).toBeDefined();
        });
    });
    describe('Тестирование removeAdd', () => {
        const payload = { developId: 'test', appId: 'test' };
        test('Если нет разработчика с таким developId. Возвращает 400', async () => {
            const model = {
                findOne: jest.fn().mockReturnValue(undefined),
            };
            await Controller.appAdd(payload, response, model);
            expect(response.mock.calls[0][0].output.statusCode).toBe(400);
        });
        test('Если разработчик есть. Удаляет у него приложение и возвращает 200', async () => {
            const user = {
                update: jest.fn().mockReturnValue(true),
            };
            const model = {
                findOne: jest.fn().mockReturnValue(user),
            };
            await Controller.appAdd(payload, response, model);
            expect(user.update).toHaveBeenCalledTimes(1);
            expect(response.mock.calls[0][1]).toBeDefined();
        });
    });
});
