export declare class DevUser {
    db: any;
    model: any;
    nats: any;
    hemera: any;
    constructor();
    start(): Promise<void>;
    mongoConnect(): Promise<{}>;
    natsConnect(model: any): void;
}
