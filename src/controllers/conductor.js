const { getData, insertData, updateData } = require('../models/datamodel')



async function getBusById(request) {
    try {
        let { busid } = request.params || null;
        if (busid) {
            let result = await getData({ 'bus_number': busid }, 'busstops');
            console.log("Bus info", result);
            return result;
        } else {
            return null
        }
    } catch (e) {
        console.error("Error reported in getBusById function", e);
        throw new Error(e);
    }
}
async function getBusDetails(request) {
    try {

        let { busnumber, password } = request.body;

        let bus_query = {
            $and: [{
                    'busnumber': busnumber
                },
                {
                    'password': password
                }
            ]
        }
        let result = await getData(bus_query, 'buses');
        console.log("result is 28", result)
        return result;

    } catch (e) {
        console.error('error reported in getBusDetails', e)
        throw new Error(e);
    }
}

async function getBusTrips(request) {
    try {
        let { busid } = request.params;
        let { date } = request.query;
        let trip_query = {
            '$and': [{
                    bus_number: busid
                },
                {
                    date: date
                }
            ]
        }
        console.log("trip query is", trip_query);
        let result = await getData(trip_query, "tripshistory");
        console.log("result is", result);
        return result;
    } catch (e) {
        console.error("Error reported in getBusTrips", e);
        throw new Error(e);
    }
}

async function modifyConductor(request) {
    try {
        let busDetails = request.body;
        if (busDetails && Object.keys(busDetails).length) {
            if (busDetails._id) {
                delete busDetails._id
            }
            let update_query = {
                busnumber: request.body.busnumber
            }
            let result = await updateData(update_query, { $set: busDetails }, 'buses');
            return result
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error reported in modfyConductor", e);
        throw new Error(e);
    }
}

async function getTripPassengers(request) {
    try {
        let { startdate, enddate } = request.query;
        startdate = new Date(new Date(startdate).getTime() - (new Date(startdate).getTimezoneOffset() * 0)).toISOString();
        enddate = new Date(new Date(enddate).getTime() - (new Date(enddate).getTimezoneOffset() * 0)).toISOString();
        console.log("start date is", startdate);
        console.log("enddate is", enddate);
        let passenger_query = {
            '$and': [{
                    'time': {
                        '$gte': startdate,
                        '$lte': enddate
                    }
                },

                {
                    "bus_number": request.params.busid
                },
                {
                    "type": "DEBIT"
                },
                {
                    "rideinfo.type": request.query.type
                }
            ]
        }
        console.log("trip user query is", JSON.stringify(passenger_query, null, 4));
        let result = await getData(passenger_query, "transactions")
        console.log("trip passengers are", result);
        return result;

    } catch (e) {
        console.error("Error reported in getTripPassengers", e);
        throw new Error(e)
    }
}
module.exports = {
    getBusDetails,
    getBusById,
    getBusTrips,
    getTripPassengers,
    modifyConductor
}