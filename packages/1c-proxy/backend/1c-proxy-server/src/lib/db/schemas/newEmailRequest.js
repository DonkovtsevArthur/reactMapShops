const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  requestDate: {
    type: Date,
    default: Date.now,
  },
  newEmail: {
    type: String,
    required: true,
  },
  confirmCode: {
    type: String,
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
