const debug = require('debug')('app:module-sales-controller')
const {SaleService} = require('./services');
const {Response} = require('../common/response');

module.exports.SalesController ={
    getSales: async (req, res) => {
        try {
            let sales = await SaleService.getAll();
            Response.sucess(res, 200, 'Lista de sales', sales);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getSale: async (req, res) => {
        try {
            const {params : {id} } = req;
            let sale = await SaleService.getById(id);
            if(!sale){
                debug(error);
                Response.error(res, new createError.NotFound());
            }
            Response.sucess(res, 200, `Sale ${id}`, sale);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createSale: async (req, res) => {
        try {
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await SaleService.create(body);
                Response.sucess(res, 201, 'Sale agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    //update
    updateSale: async(req, res) => {
        try {
            const {body} = req;
            const {params: {id}} = req;
            if(!body || Object.keys(body).length === 0 ){
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await SaleService.update(id, body);
                Response.sucess(res, 200, 'Sale modficado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
        
    },
    //delete
    deleteSale: async(req, res) => {
        const {params:{id}} = req;
        if(id === null){
            Response.error(res, new createError.BadRequest());
        }else{
            await SaleService.deleteSale(id);
            Response.sucess(res, 200, 'Sale deleted', id);
        }
    }

}