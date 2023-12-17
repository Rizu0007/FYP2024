// Product Schema in Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  size: String, // Add this line

  price: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
