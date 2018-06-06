import { setWorldConstructor } from 'cucumber';
import * as Hapi from 'hapi';
import TestServer from '../../server';
import { GROUP, ARTICLE, ITEM } from './constant';

export interface IGroup {
  groupId: number;
  name: string;
  parentId: number;
  meta: object;
}

export interface IArticle {
  articleId: number;
  groupId: number;
  name: string;
  meta: object;
}

export interface IItem {
  groupId: number;
  articleId: number;
  barcode: string;
  price: number;
  vat_rate: number;
  name: string;
  meta: object;
}

export interface IPayloadSale {
  name: string;
  price: number;
  count: number;
}

class World {
  private _server: Hapi.Server;
  private _response: Hapi.ResponseObject | null;
  private _group: IGroup;
  private _article: IArticle;
  private _item: IItem;
  private _payloadSale: IPayloadSale | null;
  constructor() {
    const testServer = new TestServer(5000);
    testServer.init();
    this._server = testServer.server;
    this._group = GROUP;
    this._article = ARTICLE;
    this._item = ITEM;
  }
  public set response(response: Hapi.ResponseObject | null) {
    this._response = response;
  }
  public get response() {
    return this._response;
  }
  public clear() {
    this._response = null;
    this._payloadSale = null;
  }
  public get server() {
    return this._server;
  }
  public get group() {
    return this._group;
  }
  public get article() {
    return this._article;
  }
  public get item() {
    return this._item;
  }
  public set payloadSale(payload: IPayloadSale | null) {
    this._payloadSale = payload;
  }
  public get payloadSale() {
    return this._payloadSale;
  }
}

setWorldConstructor(World);
