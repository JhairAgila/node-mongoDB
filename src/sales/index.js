const express = require('express');
const {SalesController} = require('./controller')
const router = express.Router();

module.exports.SalesApi = (app) => {
    router
        .get('/', SalesController.getSales) // We have to pass it like a callback (without executate)
        .get('/:id', SalesController.getSale)
        .post('/', SalesController.createSale)
        .patch('/:id',SalesController.updateSale)
        .delete('/:id', SalesController.deleteSale)
        
    app.use('/api/sales', router);

};