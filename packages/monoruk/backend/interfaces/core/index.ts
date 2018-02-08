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

export enum Status {
  ok,
  undefinedError,
}

export interface IError {
  status: Status;
  message: string | null;
}

export type Error = IError | null;

export interface JwtDevelopUserToken {
  developId: string;
}

export interface JwtUserToken {
  userId: string;
  boughtAppId: string;
}

export class HemeraClient {
  hemera: any | null = null;
  path: HemeraPath;
  payload: any;

  constructor(hemera, path: HemeraPath, payload) {
    this.hemera = hemera;
    this.path = path;
    this.payload = payload;
  }

  public async act() {
    if (this.hemera === null) {
      throw new Error('Hemera not initialized');
    } else {
      if (this.payload.cmd || this.payload.topic) {
        throw new Error(`Can't use 'cmd' or 'topic' in hemera payload: ${this.payload}`);
      }
      this.path.payload = this.payload;
      this.path.timeout$ = 20000;
      console.log('Hemera calling', this.path);
      return this.hemera.act(this.path);
    }
  }
}
