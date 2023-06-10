const debug = require('debug')('app:module-users-controller')
const {UserService} = require('./services');
const {Response} = require('../common/response');

module.exports.UsersController ={
    getUsers: async (req, res) => {
        try {
            let users = await UserService.getAll();
            Response.sucess(res, 200, 'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    gerUser: async (req, res) => {
        try {
            const {params : {id} } = req;
            let user = await UserService.getById(id);
            if(!user){
                debug(error);
                Response.error(res, new createError.NotFound());
            }
            Response.sucess(res, 200, `User ${id}`, user);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await UserService.create(body);
                Response.sucess(res, 201, 'User agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res)
        }
    },
    //update
    updateUser: async(req, res) => {
        try {
            const {body} = req;
            const {params: {id}} = req;
            if(!body || Object.keys(body).length === 0 ){
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await UserService.update(id, body);
                Response.sucess(res, 200, 'User modficado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
        
    },
    //delete
    deleteUser: async(req, res) => {
        const {params:{id}} = req;
        if(id === null){
            Response.error(res, new createError.BadRequest());
        }else{
            await UserService.deleteProduct(id);
            Response.sucess(res, 200, 'User deleted', id);
        }
    }

}