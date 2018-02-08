import * as Mongoose from 'mongoose';
export interface Item {
    name: string;
    alias: string;
    type: string;
    businessType: string;
    system: boolean;
    needDirectory: boolean;
}
export interface Group {
    name: string;
    alias: string;
    period: string;
    items: Item[];
    extras: any;
}
export interface Map {
    id: string;
    value: string;
}
export interface Payload {
    data: Map[];
    _id: string;
    groups: Group[];
    dictionary: string;
}
export declare function create(payload: Payload, response: any, db: Mongoose.Connection): Promise<void>;
export declare function update(payload: Payload, response: any, db: Mongoose.Connection): Promise<void>;
