//mongoose schema for getting data  

var mongoose = require('mongoose');
module.exports = mongoose.Schema({
    billboard_name: String,
    billboard_title: String,
    gps_cordinates_lon: Number,
    gps_cordinates_lat: Number,
    Created_date : { type : Date, default: Date.now }
});
