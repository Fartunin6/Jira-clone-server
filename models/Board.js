const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  backgroundId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board_Background',
    required: true,
  },
  isSaved: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model('Board', BoardSchema);
