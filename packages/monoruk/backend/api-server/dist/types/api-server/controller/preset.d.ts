import * as Hapi from 'hapi';
import { DecoratedRequest } from '../server';
export declare function start(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): Promise<void>;
