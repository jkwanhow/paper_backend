const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReceiptSchema = new Schema(
  {
    userID: {type: mongoose.Schema.Types.ObjectId},
    shopName: {type: String, required: true, maxLength: 100},
    shopAddress: {type: String},
    shoppingCentreAddress: {type: String},
    ABN: {type: String, required: true, minLength: 11, maxLength: 11},
    phone: {type: String, maxLength: 10},
    time: {type: Date},
    itemsPurchased: [{type: new Schema({
      itemName: {type: String, required: true, maxLength: 100},
      price: {type: Number, required: true,},
      quantity: {type: Number, required: true,}
    })}],
    cashClaimed: {type: Boolean}
  },
  {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);

module.exports = mongoose.model('Receipt', ReceiptSchema);
/*
const ItemSchema = new Schema({
  itemName: {type: String, required: true, maxLength: 100},
  price: {type: Number, required: true,},
  quantity: {type: Number, required: true,}
})

module.exports = mongoose.model('Item', ItemSchema);
*/