const mongoose = require('mongoose');
const crypto = require('crypto');
const Board = require('./Board');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true },
);

// virtual
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) {
      return '';
    }
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },

  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
};

// pre middlewares
userSchema.pre('deleteOne', function (next) {
  Board.remove({ userId: this._conditions._id }).exec();
  next();
});

module.exports = mongoose.model('User', userSchema);
