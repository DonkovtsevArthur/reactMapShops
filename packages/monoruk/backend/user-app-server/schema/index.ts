import * as Mongoose from 'mongoose';
import {
  VALID_APPS_TYPE,
  VALID_STATUS,
  VALID_TYPE,
  VALID_PERIOD,
  VALID_BUSINESS_TYPE,
} from '../../interfaces/constants';

const item = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: VALID_TYPE,
      required: true,
    },
    businessType: {
      type: String,
      enum: VALID_BUSINESS_TYPE,
      required: true,
    },
    system: {
      type: Boolean,
      required: true,
    },
    needDirectory: {
      type: Boolean,
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

const group = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      enum: VALID_PERIOD,
      required: true,
    },
    items: [item],
    extras: {
      type: Mongoose.Schema.Types.Mixed,
      required: false,
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
  },
  appId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: VALID_APPS_TYPE,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: VALID_STATUS,
    default: 'active',
  },
  developId: {
    type: String,
    required: true,
  },
  copy: {
    type: Boolean,
    default: false,
  },
  parent: {
    type: String,
    default: undefined,
  },
  accessToken: {
    type: String,
    default: undefined,
  },
  groups: {
    type: [group],
    default: undefined, 
  },
  settings: {
    local: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
    },
    w: {
      type: Number,
    },
    h: {
      type: Number,
    },
  },
});

export default schema;


