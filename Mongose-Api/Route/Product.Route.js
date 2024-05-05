const express = require('express')
const router = express.Router();
const Product = require('../Model/Product.model');
const { ObjectId } = require('mongodb');

const ProductController = require('../Controller/Product.Controller')

router.get('/', ProductController.getAllProduct)

router.post('/', ProductController.addProduct)

router.get('/:id', ProductController.getProductById)

router.delete('/:id', ProductController.deleteProduct)

router.patch('/:id', ProductController.updateProduct)


module.exports = router;
