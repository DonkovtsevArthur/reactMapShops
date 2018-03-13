import * as Pino from 'pino';
import config from '../config';

const logger = Pino();

export enum Status {
  ok = 'ok',
  error = 'error'
}

export interface IStatus {
  status: Status;
  rows: number;
  header: string[];
  message: string;
}

export interface ITypes {
  [index: string]: string;
}

class FileParser {
  private count: number = 0;
  private _status: Status = Status.ok;
  private message: string;
  private header: string[];
  private _result: any[] = [];
  private buff: string = '';
  private types: ITypes;
  constructor(types: ITypes) {
    this.types = types;
  }
  public parse(data: string) {
    try {
      const rows = data.trim().split(config.SEPARATE_ROW);
      if (this.count === 0) {
        this.header = rows[0].trim().split(config.SEPARATE_FIELD);
        rows.shift();
        this.count += rows.length - 1;
        this.parseRows(rows);
        return;
      }
      this.count += rows.length - 1;
      this.parseRows(rows);
    } catch (error) {
      this._status = Status.error;
      this.message = error.message;
    }
  }
  private parseRows(rows: string[]) {
    try {
      rows.forEach((row, i, data) => {
        if (i === 0) {
          row = this.buff + row;
        }
        if (i === data.length - 1) {
          this.buff = row;
          return;
        }
        const fields = row.trim().split(config.SEPARATE_FIELD);
        const result = {};
        this.header.forEach((field, i) => {
          const type = this.types[field];
          switch (type) {
            case 'Float32':
              result[field] = fields[i] ? parseFloat(fields[i]) : 0;
              break;
            case 'Int32':
              result[this.header[i]] = fields[i] ? parseInt(fields[i].replace(/ /g, '')) : 0;
              break;
            default:
              result[this.header[i]] = fields[i];
              break;
          }
        });
        // fields.forEach((item, i) => {
        //   const type = this.types[this.header[i]];
        //   switch (type) {
        //     case 'Float32':
        //       result[this.header[i]] = fields[i] ? parseFloat(fields[i]) : 0;
        //       break;
        //     case 'Int32':
        //       result[this.header[i]] = fields[i] ? parseInt(fields[i].replace(/ /g, '')) : 0;
        //       break;
        //     default:
        //       result[this.header[i]] = fields[i];
        //       break;
        //   }
        // });
        this._result.push(result);
      });
    } catch (error) {
      this._status = Status.error;
      this.message = error.message;
    }
  }
  get status(): IStatus {
    return {
      status: this._status,
      rows: this.count,
      header: this.header,
      message: this.message
    };
  }
  get result() {
    return this._result;
  }
}

export default FileParser;
