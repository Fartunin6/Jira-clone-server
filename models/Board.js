const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 26,
  },
  description: {
    type: String,
    required: true,
    max: 100,
  },
  background: {
    type: String,
    required: true,
  },
  isSaved: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model('Board', BoardSchema);
