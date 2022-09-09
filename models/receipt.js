const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReceiptSchema = new Schema(
  {
    userID: {type: ObjectId},
    shopName: {type: String, required: true, maxLength: 100},
    shopAddress: {type: String},
    shoppingCentreAddress: {type: String},
    ABN: {type: String, required: true, minLength: 11, maxLength: 11},
    phone: {type: String, minLength: 10, maxLength: 10},
    time: {type: Date},
    itemsPurchased: [{
      itemName: {type: String, maxLength: 100},
      price: {type: Number},
      quantity: {type: Number}
    }],
    cashClaimed: {type: Boolean}
  },
  {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);

module.exports = mongoose.model('Receipt', ReceiptSchema);