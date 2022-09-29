const Receipt = require('../models/receipt');

const getReceipts = (req, res) => {
  Receipt.find( {}, (error, items) => {
      if(error) console.log(error);
      res.send(items);
  });
};

module.exports = {
  getReceipts,
}