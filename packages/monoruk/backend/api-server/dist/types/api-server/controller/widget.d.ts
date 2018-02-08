import * as hapi from 'hapi';
import { DecoratedRequest } from '../server';
export interface ReplyEvents extends hapi.ReplyNoContinue {
    event(data: any): void;
}
export interface WidgetController {
    get(request: DecoratedRequest, reply: hapi.ReplyNoContinue): void;
    update(request: DecoratedRequest, reply: hapi.ReplyNoContinue): void;
    events(request: DecoratedRequest, reply: ReplyEvents): void;
}
declare const controller: WidgetController;
export default controller;
