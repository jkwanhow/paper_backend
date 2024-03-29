const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {type: String, required: true, maxLength: 100},
    lastName: {type: String, required: true, maxLength: 100},
    dateOfBirth: {type: Date},
    paperSaved: {type: Number},
    amountClaimed: {type: Number},
    email: {type: String, required: true},
    password: {type: String, required: true},
  },
  {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);

UserSchema.pre("save", function(next) {
  const user = this;

  if(this.isModified("password") || this.isNew){
    bcrypt.genSalt(10, function(saltError, salt){
      if (saltError) {
        return next(saltError);
      }else{
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError){
            return next(hashError);
          }
          user.password = hash;
          next();
        })
      }
    })
  }else return next();
})

module.exports = mongoose.model('User', UserSchema);