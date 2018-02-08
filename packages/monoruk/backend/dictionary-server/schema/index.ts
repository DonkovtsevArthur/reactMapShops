import * as Mongoose from 'mongoose';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  VALID_COLUMN_TYPE,
} from '../../interfaces/constants';

const schema = new Mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export default schema;


