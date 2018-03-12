const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  stores: [
    {
      uuid: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        default: '',
      },
      address: {
        type: String,
        default: '',
      },
    },
  ],
  devices: [
    {
      uuid: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        default: '',
      },
    },
  ],
  employees: [
    {
      uuid: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        default: '',
      },
      lastName: {
        type: String,
        default: '',
      },
      patronymic: {
        type: String,
        default: '',
      },
      phone: {
        type: String,
        default: '',
      },
      role: {
        type: String,
        default: '',
      },
      stores: [String],
    },
  ],
  storeOpen: {
    type: String,
    default: '800',
  },
});
