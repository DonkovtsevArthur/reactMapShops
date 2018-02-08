import * as Mongoose from 'mongoose';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  VALID_COLUMN_TYPE,
} from '../../interfaces/constants';

const schema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: VALID_COLUMN_TYPE,
    required: true,
  },
});

export default schema;


