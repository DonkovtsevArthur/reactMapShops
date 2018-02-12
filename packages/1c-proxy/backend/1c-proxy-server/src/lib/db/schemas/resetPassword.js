const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  requestDate: {
    type: Date,
    default: Date.now,
  },
  confirmCode: {
    type: String,
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
