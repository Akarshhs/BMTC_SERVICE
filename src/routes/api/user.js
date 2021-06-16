const { getUserDetails, insertUserDetails, modifyUser } = require('../../controllers/expense')
const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser')

const express = require('express');
const { request } = require('express');
let ORIGIN = 'http://localhost:3000'
const app = express();

router.get('/user/login', async(request, response) => {
    try {
        let userDetails = await getUserDetails(request);
        if (userDetails && userDetails.length) {
            response.json({
                data: userDetails,
                success: true
            })
        } else {
            response.json({
                data: [],
                success: false,
                message: 'username or password incorrect'
            })
        }
    } catch (e) {
        console.log("Error is", e)
        response.json({
            success: false,
            message: e
        })
    }

});


router.post('/user/signup', async(request, response) => {
    try {
        let result = await insertUserDetails(request);
        if (result && result.insertedCount) {
            response.json({
                data: result.ops,
                success: true
            })
        } else {
            response.json({
                data: [],
                success: false,
                message: 'Failed to signup'
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})

router.put('/user/modify-user/:id', async(request, response) => {
    try {
        console.log("inside the put controller")
        let result = await modifyUser(request);
        if (result && result.modifiedCount) {
            response.json({
                success: true,
                data: []
            })
        } else {
            response.json({
                success: false,
                message: `Failed to update ${request.params.id}`
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})

// router.get(':id', (req, res) => {
//     //Get a particular document
// })


router.post('/api', cors({
    origin: 'http://localhost:3000'
}), async(req, res, next) => {
    try {
        let result = await insertExpenseDetails(req);
        result ? res.status(200).json({ 'success': true }) : res.status(404).json({ 'success': false })
    } catch (e) {
        res.status(404).json({ 'success': false })
    }
})

router.get('/api/totalprice', cors({
    origin: 'http://localhost:3000'
}), async(req, res) => {
    try {
        console.log('inside the routes');
        let result = await getTotalExpense(req);
        res.status(200).json({ 'success': true, 'cost': result })
    } catch (e) {
        console.log('e is', e)
        res.status(404).json({ 'success': false });
    }
})

module.exports = router