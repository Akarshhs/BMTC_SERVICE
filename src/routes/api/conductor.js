const { getBusDetails, getBusById, getBusTrips, getTripPassengers, modifyConductor } = require('../../controllers/conductor')
const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser')

const express = require('express');
const { request } = require('express');
let ORIGIN = 'http://localhost:3000'
const app = express();

router.post('/login', async(request, response) => {
    try {
        let busDetails = await getBusDetails(request);
        if (busDetails && busDetails.length) {
            response.json({
                data: busDetails,
                success: true
            })
        } else {
            response.json({
                data: [],
                success: false,
                message: 'busnumber or password incorrect'
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

router.put('/modify-conductor', async(request, response) => {
    try {
        let result = await modifyConductor(request);
        if (result) {
            response.json({
                success: true,
                data: result
            })
        } else {
            response.json({
                success: false,
                message: `Bus document missing in the body for ${request.body.busnumber}`
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})

router.get('/:busid', async(request, response) => {
    try {
        console.log("62")
        let result = await getBusById(request);
        if (result) {
            response.json({
                success: true,
                data: result
            })
        } else {
            response.json({
                success: false,
                message: `Bus ID is missing in the request`
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})

router.get('/trips/:busid', async(request, response) => {
    try {
        console.log("85")
        let result = await getBusTrips(request);
        console.log("result", result)
        if (result) {
            response.json({
                success: true,
                data: result
            })
        } else {
            response.json({
                success: false,
                message: `Failed to fetch bustrips for ${request.params.busid}`
            })
        }
    } catch (e) {
        response.json({
            success: false,
            message: e
        })
    }
})

router.get('/passengers/:busid', async(request, response) => {
    try {
        let result = await getTripPassengers(request);
        if (result) {
            response.json({
                success: true,
                data: result
            })
        } else {
            response.json({
                success: false,
                message: `Failed to fetch trip passengers for ${request.params.busid}`
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