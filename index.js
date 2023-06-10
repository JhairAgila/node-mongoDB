const express = require('express');
const debug = require("debug")("app:main");
const { Config } = require('./src/config');
const {ProductsApi} = require('./src/products/index');
const {UserApi} = require('./src/users/index');
const {SalesApi} = require('./src/sales/index')

const app = express();

app.use(express.json());

//moduls

ProductsApi(app);
UserApi(app);
SalesApi(app);

app.listen(Config.port, () => {
    debug(`Servidor escuchado en el puerto ${Config.port}`)
})