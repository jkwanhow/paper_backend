const Receipt = require('../models/receipt');
const Item = require('../models/receipt');
const mongoose = require('mongoose');

const getReceipts = (req, res) => {
  //var filter = {};
  //if (req.query._id) filter['_id'] = req.query._id;

  Receipt.find( {_id: req.user.id}, (error, items) => {
      if(error) console.log(error);
      res.send(items);
  });
};

const createReceipt = (req, res) => {

  console.log(req.body);
  var receipt = new Receipt({
    userID: req.user.id,
    shopName: req.body.shop,
    shopAddress: req.body.shopAddress,
    shopCentreAddress: req.body.centreAddress,
    ABN: req.body.ABN,
    phone: req.body.phone,
    time: new Date(),
    itemsPurchased: [],
    cashClaimed: false
  });
  
  console.log(receipt);
  console.log(req.body.items);

  //var items = JSON.parse(req.body.items).items;
  console.log("ITEMS");
  for(const item in JSON.parse(req.body.items).items) {
    console.log(item);
    var newItem = new Item({
      itemName: item.name,
      price: item.price,
      quanity: item.quantity
    })
    receipt.itemsPurchased.push(newItem);
  }

  /*itemsPurchased: [{
    itemName: {type: String, maxLength: 100},
    price: {type: Number},
    quantity: {type: Number}
  }];*/

  receipt.save(function(err, receipt){
    if (err) {
      console.log(err);
      res.send({
          'alert': 'receipt error',
          'redir': '/'
      });
    }
    res.send("Receipt posted");
  })
};

module.exports = {
  getReceipts,
  createReceipt
}