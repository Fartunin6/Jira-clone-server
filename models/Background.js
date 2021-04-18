const mongoose = require('mongoose');

const Background = new mongoose.Schema({
  color: {
    type: String,
    required: true,
    max: 15,
  },
});

module.exports = mongoose.model('Board_Background', Background);
