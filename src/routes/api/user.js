const { getUserDetails, insertUserDetails, modifyUser, getUserTransactions, insertUserTransaction, getUserTicket } = require('../../controllers/user');

const router = require('express').Router();



router.post('/login', async(request, response) => {
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
router.post('/signup', async(request, response) => {
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

router.put('/modify-user', async(request, response) => {
    try {
        let result = await modifyUser(request);
        if (result && result.modifiedCount) {
            response.json({
                success: true,
                message: "User updated successfully",
                data: request.body.pid
            })
        } else {
            response.json({
                success: false,
                message: `User document missing in the body for ${request.body.pid}`
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})
router.get('/transaction/:id', async(request, response) => {
    try {
        let result = await getUserTransactions(request);
        if (result) {
            response.json({
                success: true,
                data: result
            })
        } else {
            response.json({
                success: false,
                message: `Failed to fetch passenger ${request.params.id} transactions`
            })
        }

    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})
router.post('/transaction', async(request, response) => {
    try {
        console.log("inside the 102")
        let result = await insertUserTransaction(request);
        if (result) {
            response.json({
                success: true,
                data: result
            })
        } else {
            response.json({
                success: false,
                message: `Failed to Insert user transaction`
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})
router.get('/ticket/:id', async(request, response) => {
    try {
        let result = await getUserTicket(request);
        if (result) {
            response.json({
                success: true,
                data: result
            })
        } else {
            response.json({
                success: false,
                message: `Failed to fetch passenger ticket ${request.params.id}`
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})

module.exports = router