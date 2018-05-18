//mongoose schema for getting data  

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = require('../connection');
        
transSchema = mongoose.Schema({
    device_code: Number,
    device_name: String,
    device_type: String,
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
        },   
    Created_date : { type : Date, default: Date.now }
});

transSchema.index({ "location": "2d" });

module.exports = transSchema;