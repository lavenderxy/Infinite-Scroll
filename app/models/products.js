var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsDBSchema = new Schema({
  fullName: String,
  shortName: String,
  imageUrl: String,
  price: String
});

module.exports = mongoose.model('ProductsDB', ProductsDBSchema);
