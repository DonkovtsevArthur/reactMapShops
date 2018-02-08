export interface HemeraPath {
    topic: string;
    cmd: string;
    payload?: object;
    pubsub$?: boolean;
    timeout$?: number;
}
export interface HemeraRoute {
    path: HemeraPath;
    handler: Function;
}
export declare enum Status {
    ok = 0,
    undefinedError = 1,
}
export interface IError {
    status: Status;
    message: string | null;
}
export declare type Error = IError | null;
export interface JwtDevelopUserToken {
    developId: string;
}
export interface JwtUserToken {
    userId: string;
    boughtAppId: string;
}
export declare class HemeraClient {
    hemera: any | null;
    path: HemeraPath;
    payload: any;
    constructor(hemera: any, path: HemeraPath, payload: any);
    act(): Promise<any>;
}
