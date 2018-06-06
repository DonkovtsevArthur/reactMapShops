import { IHemeraPath, IHemeraRoute } from './hemera';

export default class BaseHemeraServer {
  protected hemera;
  constructor(hemera, routes: IHemeraRoute[]) {
    this.hemera = hemera;
    this.hemera.ready(async () => {
      routes.forEach(route => {
        this.add(route);
      });
    });
  }

  private async ready(): Promise<void> {
    await this.hemera.ready();
  }

  private add(route: IHemeraRoute) {
    this.hemera.add(route.path, route.handler);
  }

  private async act(path: IHemeraPath, payload?: object) {
    const params = Object.assign({}, payload, path);
    console.log('acting', JSON.stringify(params, null, 4));
    return await this.hemera.act(params);
  }
}
