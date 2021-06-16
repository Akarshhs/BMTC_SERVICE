const MongoClient = require('mongodb').MongoClient;
let database = null;
const connectDB = (callback) => {
    return new Promise((resolve, reject) => {
        if (database)
            resolve(database);
        else {
            MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
                if (!err) {
                    console.log(`Connected successfully to the Database`);
                    database = client.db('bus_services');
                    resolve(database);
                } else {
                    reject(err);
                    console.error('Erorr in db.js', error);
                }

            });
        }
    })
}

module.exports = connectDB;