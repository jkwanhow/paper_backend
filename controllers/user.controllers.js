const User = require('../models/user');

const getStatistics = (req, res) => {
    
  User.findOne( {_id: req.user.id}, (error, items) => {
      if(error) console.log(error);
      res.send([items.paperSaved, items.amountClaimed]);
  });
};

module.exports = {
  getStatistics,
}