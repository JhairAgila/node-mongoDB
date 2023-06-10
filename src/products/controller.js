const debug = require('debug')('app:module-products-controller')
const {ProductService} = require('./services');
const {Response} = require('../common/response');

module.exports.ProductController ={
    getProducts: async (req, res) => {
        try {
            let products = await ProductService.getAll();
            Response.sucess(res, 200, 'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async (req, res) => {
        try {
            const {params : {id} } = req;
            let product = await ProductService.getById(id);
            if(!product){
                debug(error);
                Response.error(res, new createError.NotFound());
            }
            Response.sucess(res, 200, `Producto ${id}`, product);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProduct: async (req, res) => {
        try {
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await ProductService.create(body);
                Response.sucess(res, 201, 'Productpo agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    //update
    updateProduct: async(req, res) => {
        try {
            const {body} = req;
            const {params: {id}} = req;
            if(!body || Object.keys(body).length === 0 ){
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await ProductService.update(id, body);
                Response.sucess(res, 200, 'Producto modficado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
        
    },
    //delete
    deleteProduct: async(req, res) => {
        const {params:{id}} = req;
        if(id === null){
            Response.error(res, new createError.BadRequest());
        }else{
            await ProductService.deleteProduct(id);
            Response.sucess(res, 200, 'Product deleted', id);
        }
    },
    
    generateReport: (req, res) => {
        try {
            ProductService.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
            
        }
    }

}