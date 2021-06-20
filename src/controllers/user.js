const { getData, insertData, updateData } = require('../models/datamodel')

const { v4: uuidv4 } = require('uuid');

async function getUserDetails(request) {
    try {

        let { email, password } = request.body || null;
        console.log("username", email);
        console.log("password", password);
        let user_query = {
            $and: [{
                    'email': email
                },
                {
                    'password': password
                }
            ]
        }
        let result = await getData(user_query, 'passengers');
        console.log("User login result is", result)
        return result;

    } catch (e) {
        console.error('err', e)
        throw new Error(e);
    }
}

async function getUserTicket(request) {
    try {
        let tid = request.params.id;
        console.log("Transaction id", tid);
        let result = await getData({ tid: tid }, "transactions");
        console.log("Transaction is", result);
        return result;

    } catch (e) {
        console.error("Error reported in getUserTicket", e);
        throw new Error(e);
    }
}
async function getUserTransactions(request) {
    try {
        let pid = request.params.id;
        console.log("transaction id", pid);
        let result = await getData({
            passenger_id: pid
        }, 'transactions')
        console.log("User transaction is", result);
        return result
    } catch (e) {
        console.error("Error reported in getUserTransaction", e)
        throw new Error(e);
    }
}
async function insertUserDetails(request) {
    try {
        let userDetails = request.body;
        userDetails.pid = `passenger-${uuidv4()}`;
        userDetails.walletbalance = 0;
        let result = await insertData(userDetails, 'passengers');
        console.log("Inserted passenger details", result);
        return result;
    } catch (e) {
        console.log("Error reported in insertUserDetails", e);
        throw new Error(e)
    }
}

async function insertUserTransaction(request) {
    try {
        console.log("58")
        let userTransaction = request.body;
        userTransaction.tid = `transaction-${uuidv4()}`;
        let result = await insertData(userTransaction, 'transactions');
        console.log("Inserted user transaction is", result);
        return result;
    } catch (e) {
        console.error("Error reported in insertUserTransaction", e);
        throw new Error(e);
    }
}

async function modifyUser(request) {
    try {
        console.log("update id", request.body.pid);
        let userData = request.body;
        if (userData && Object.keys(userData).length) {
            if (userData._id) {
                delete userData._id
            }
            let result = await updateData({ "pid": request.body.pid }, { $set: userData }, 'passengers');
            return result
        } else {
            return null;
        }


    } catch (e) {
        console.error('Error reported in modify user', e);
        throw new Error(e);
    }
}

module.exports = {
    getUserDetails,
    getUserTicket,
    getUserTransactions,
    insertUserDetails,
    insertUserTransaction,
    modifyUser
}