import * as Hapi from 'hapi';
import { DecoratedRequest } from '../server';
export interface DictionaryController {
    save(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
}
declare const controller: DictionaryController;
export default controller;
