import * as Mongoose from 'mongoose';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  VALID_APPS_TYPE,
  VALID_STATUS,
  VALID_TYPE,
  SALT_WORK_FACTOR,
} from '../../interfaces/constants';

const schema = new Mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: VALID_STATUS,
    default: 'active',
  },
  apps:[String],
});

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default schema;


