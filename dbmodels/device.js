//mongoose schema for getting data  

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = require('../connection');
        
deviceSchema = mongoose.Schema({
    device_code: Number,
    device_name: String,
    device_type: String,
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
        },
    isUpload: { type : Boolean, default: false },
    isUpdated: { type : Boolean, default: false },
    transaction: [{
        url: String,
        isPlay: Boolean,
        isStop: Boolean
    }],
    updated_date : Date,
    Created_date : { type : Date, default: Date.now }
});

deviceSchema.index({ "location": "2d" });


var connection = mongoose.createConnection(connection.connectionString);

autoIncrement.initialize(connection);
deviceSchema.plugin(autoIncrement.plugin, {
  model: 'device_ad',
  field: 'device_code',
  startAt: 100,
  incrementBy: 1
});

module.exports = deviceSchema;