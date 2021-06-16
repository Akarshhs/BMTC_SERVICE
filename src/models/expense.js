const connectDB = require('../../config/db');

const insertData = async (data, collectionName, callback) => {
    return new Promise(async (resolve, reject) => {
        let dbHandler = await connectDB();
        if (dbHandler) {
            let collection = dbHandler.collection(collectionName);
            let result = await collection.insertOne(data);
            resolve(result);
        }
        else
            reject(null);
    })


}

const getData = async (query, collectionName, callback) => {
    return new Promise(async (resolve, reject) => {
        let dbHandler = await connectDB();
        if (dbHandler) {
            console.log('query insdie the models', query);
            let collection = dbHandler.collection(collectionName);
            let result = await collection.find(query).toArray();
            console.log('models', result);
            resolve(result);
        }
        else
            reject(null);
    })

}

const updateData = async (query, data, collectionName) => {
    return new Promise(async (resolve, reject) => {
        let dbHandler = await connectDB();
        if (dbHandler) {
            let collection = dbHandler.collection(collectionName);
            let result = await collection.updateOne(query, data);
            resolve(result);
        }
        else
            reject(null);
    })


}

module.exports = {
    getData,
    insertData,
    updateData
}