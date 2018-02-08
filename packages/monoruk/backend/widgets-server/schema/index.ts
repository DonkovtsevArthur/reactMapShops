import * as Mongoose from 'mongoose';
import { INDEX_ACTIONS, PERIOD } from '../../interfaces/constants';

const schema = new Mongoose.Schema({
  appId: {
    type: String,
    required: true,
  },
  group: String,
  index: String,
  section: String,
  graph: String,
  color: String,
  indexAction: {
    type: String, 
    enum: INDEX_ACTIONS,
    default: '',
  },
  secondIndexAction: {
    type: String, 
    enum: INDEX_ACTIONS,
    default: '',
  },
  formula: {
    type: [String],
    default: undefined, 
  },
  dateStart: Date,
  dateEnd: Date,
  period: {
    type: String,
    enum: PERIOD,
  },
});

export default schema;


