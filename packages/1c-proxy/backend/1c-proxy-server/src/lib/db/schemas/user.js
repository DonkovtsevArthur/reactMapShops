const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  registerDate: {
    type: Date,
    default: Date.now,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
    default: '',
  },

  email: {
    type: String,
    required: true,
    default: '',
  },

  inn: {
    type: String,
    require: true,
  },

  evotorUuid: {
    type: String,
    required: true,
    unique: true,
  },

  token: {
    type: String,
    required: true,
  },

  evoToken: {
    type: String,
    default: '',
  },

  urlToBase: {
    type: String,
    default: '',
  },

  userBase: {
    type: String,
    default: '',
  },

  passwordBase: {
    type: String,
    default: '',
  },

  urlToBaseTrade: {
    type: String,
  },

  userBaseTrade: {
    type: String,
  },

  passwordBaseTrade: {
    type: String,
  },

  tariffId: {
    type: String,
    default: '',
  },

  tariffActive: {
    type: Boolean,
    default: false,
  },

  message: {
    type: String,
  },

  messageDate: {
    type: Date,
  },
});
