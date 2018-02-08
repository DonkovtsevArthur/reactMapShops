export interface Credentials {
    token: string;
}
export interface IAppGetPayload {
    name: string;
}
export interface IAppGet {
    name: string;
    token: string;
}
export interface Item {
    name: string;
    alias: string;
    type: string;
    bysinessType: string;
    system: boolean;
}
export interface Group {
    name: string;
    alias: string;
    period: string;
    items: Item[];
}
export interface IApp {
    name: string;
    type: string;
    alias: string;
    groups: Group[];
    extras?: Object;
    settings?: Object;
}
