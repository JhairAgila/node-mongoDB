require('dotenv').config();
// It works like an object
module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME,
}
