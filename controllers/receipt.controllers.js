const Receipt = require('../models/receipt');
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
  const uid = req.user.id;
  const shop = req.query.shop;
  const add1 = req.query.shopAddress;
  const add2 = req.query.centreAddress;
  const ABN1 = req.query.ABN;
  const mobile = req.query.phone;

  var receipt = new Receipt({
    userID: uid,
    shopName: shop,
    shopAddress: add1,
    shopCentreAddress: add2,
    ABN: ABN1,
    phone: mobile,
    time: new Date(),
    itemsPurchased: [],
    cashClaimed: false
  });

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
  })
};

module.exports = {
  getReceipts,
  createReceipt
}