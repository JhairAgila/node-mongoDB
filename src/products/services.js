const {Database} = require('../database/index');
const {ObjectId} = require('mongodb');

const COLLECTION = 'products';
const {ProductsUtil} = require('./utils');

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: new ObjectId(id)});
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}
//update

const update = async (id, product) => {
    const collection = await Database(COLLECTION);
    const options = { upsert: true };
    // console.log(id);
    let result = await collection.updateOne({"_id":  new ObjectId(id)}, {$set: product}, options);
    return id;

}
//delete

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({"_id": new ObjectId(id)});
}
const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtil.excelGenerator(products, name, res );
}

module.exports.ProductService = {
    getAll,
    getById,
    create,
    generateReport,
    update, 
    deleteProduct
}