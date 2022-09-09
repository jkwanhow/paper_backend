const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {type: String, required: true, maxLength: 100},
    lastName: {type: String, required: true, maxLength: 100},
    dateOfBirth: {type: Date},
    paperSaved: {type: Number},
    amountClaimed: {type: Number}
  },
  {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);

module.exports = mongoose.model('User', UserSchema);