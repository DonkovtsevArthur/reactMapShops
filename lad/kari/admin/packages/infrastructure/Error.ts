export enum ErrorStatus {
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  notAcceptable = 406,
  internalServerError = 500,
}

export interface IError {
  status: ErrorStatus;
  message: string;
}

export default class Error implements IError {
  public status: ErrorStatus;
  public message: string;
  public constructor(error: IError) {
    this.status = error.status;
    this.message = error.message;
  }

  public getStatus(): ErrorStatus {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }
}
