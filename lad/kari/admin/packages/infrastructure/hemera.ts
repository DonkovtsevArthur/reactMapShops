export interface IHemeraPath {
  topic: string;
  cmd: string;
}

export interface IHemeraRoute {
  path: IHemeraPath;
  handler: (params: any) => Promise<any>;
}
