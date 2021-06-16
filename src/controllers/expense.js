const { getData, insertData, updateData } = require('../models/expense')

const { v4: uuidv4 } = require('uuid');

async function getUserDetails(request) {
    try {

        let { username, password } = request.query || null;
        console.log("username", username);
        console.log("password", password);
        let user_query = {
            $and: [{
                    'username': username
                },
                {
                    'password': password
                }
            ]
        }
        let result = await getData(user_query, 'user');
        console.log("result is 28", result)
        return result;

    } catch (e) {
        console.error('err', e)
        throw new Error(e);
    }
}

async function insertUserDetails(request) {
    try {
        let userDetails = request.body;
        userDetails.systemId = `user-${uuidv4()}`;
        let result = await insertData(userDetails, 'user');

        return result;
    } catch (e) {
        console.log("Error reported in insertUserDetails", e);
        throw new Error(e)
    }
}

async function modifyUser(request) {
    try {
        console.log("request params", request.params.id);
        let userData = request.body;
        let systemId = request.params.id;
        if (userData && Object.keys(userData).length) {
            let result = await updateData({ 'systemId': systemId }, { $set: userData }, 'user');
            console.log("updated result is", result);
            return result
        } else {
            return null;
        }


    } catch (e) {
        console.error('Error reported in modify user');
        throw new Error(e);
    }
}
module.exports = {
    getUserDetails,
    insertUserDetails,
    modifyUser
}