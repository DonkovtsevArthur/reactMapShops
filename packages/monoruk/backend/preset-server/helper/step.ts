import * as Hemera from 'nats-hemera';
import { HemeraClient, HemeraPath } from '../../interfaces/core';

export interface Props {
  topic: string;
  cmd: string;
  payload: any;
  hemera: Hemera;
}

export default ({ topic, cmd, payload, hemera }: Props) => {
  const path: HemeraPath = { topic, cmd, };
  const action = new HemeraClient(hemera, path, payload);
  return action.act();
};

