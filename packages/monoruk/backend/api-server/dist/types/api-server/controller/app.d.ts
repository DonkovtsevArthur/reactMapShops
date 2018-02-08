import * as Hapi from 'hapi';
import { DecoratedRequest } from '../server';
export interface AppController {
    get(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    getAll(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    add(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    update(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    remove(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    status(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
}
declare const controller: AppController;
export default controller;
