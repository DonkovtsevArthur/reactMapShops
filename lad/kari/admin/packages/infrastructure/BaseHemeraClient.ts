import { IHemeraPath } from './hemera';

export default class BaseHemeraClient {
  private readonly hemera: any | null = null;
  constructor(hemera) {
    this.hemera = hemera;
  }

  public async act(path: IHemeraPath, payload) {
    if (this.hemera === null) {
      throw new Error('Hemera not initialized');
    } else {
      if (payload.cmd || payload.topic) {
        throw new Error(
          `Can't use 'cmd' or 'topic' in hemera payload: ${payload}`,
        );
      }

      const data = Object.assign({}, path, payload);
      console.log('Hemera calling', JSON.stringify(data));
      return this.hemera.act(data);
    }
  }
}
