import * as Mongoose from 'mongoose';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  VALID_COLUMN_TYPE,
  ACCESS_VALID_TYPE
} from '../../interfaces/constants';

const app = new Mongoose.Schema({
  appId: {
    type: String,
    required: true,
  },
  appType: {
    type: String,
    enum: ACCESS_VALID_TYPE,
    required: true,
  },
});

const schema = new Mongoose.Schema({
  parent: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  apps: [app],
});

export default schema;


