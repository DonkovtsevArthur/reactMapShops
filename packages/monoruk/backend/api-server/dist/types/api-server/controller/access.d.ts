import * as Hapi from 'hapi';
import { DecoratedRequest } from '../server';
export interface AppController {
    share(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    openShare(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    closeShare(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    removeShare(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    getShareToApp(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
    copy(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
}
declare const controller: AppController;
export default controller;
