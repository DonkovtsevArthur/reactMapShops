import * as Mongoose from 'mongoose';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  VALID_APPS_TYPE,
  VALID_STATUS,
  VALID_TYPE,
  SALT_WORK_FACTOR,
} from '../../interfaces/constants';

const columns = new Mongoose.Schema(
  {
    app: {
      type: String,
      required: true,
    },
    column: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const schema = new Mongoose.Schema({
  orgId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: VALID_STATUS,
    default: 'active',
  },
  apps: [String],
  dashboards: [String],
  columns: [columns],
});

export default schema;


