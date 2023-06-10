const express = require('express');
const {ProductController} = require('./controller')
const router = express.Router();

module.exports.ProductsApi = (app) => {
    router
        .get('/', ProductController.getProducts) // We have to pass it like a callback (without executate)
        .get('/report', ProductController.generateReport)
        .get('/:id', ProductController.getProduct)
        .post('/', ProductController.createProduct)
        .patch('/:id', ProductController.updateProduct)
        .delete('/:id', ProductController.deleteProduct)
        
    app.use('/api/products', router);

};