const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
var fs = require('fs');



// POST endpoint to add a product

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    console.log("Image path: ", imagePath); // Debugging

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      size: req.body.size, // Include the size
      category: req.body.category,
      price: req.body.price,
      image: {
        data: fs.readFileSync(imagePath),
        contentType: req.file.mimetype,
      },
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error); // More detailed error logging
    res.status(400).json({ message: error.message });
  }
});



router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    products.forEach(product => {
      if (product.image && product.image.data) {
        product.image = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
