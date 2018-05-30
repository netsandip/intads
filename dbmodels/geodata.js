//mongoose schema for getting data  

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = require('../connection');
        
geospatialSchema = mongoose.Schema({
    fence_code: Number,
    fence_name: String,    
    // location: {
    //     type: [Number],  // [<longitude>, <latitude>]
    //     index: '2d'      // create the geospatial index
    //     },  
    locationtype: { type : String, default: "circle" },  
    location: {
        type: { type : String, default: "Point" },
        coordinates: []
    },
    radius: Number,
    userid: String,
    updated_date : Date,
    Created_date : { type : Date, default: Date.now }
}, { toObject : { virtuals:true }, toJSON: { virtuals: true } });

geospatialSchema.index({ "location": "2dsphere" });


var connection = mongoose.createConnection(connection.connectionString);

autoIncrement.initialize(connection);
geospatialSchema.plugin(autoIncrement.plugin, {
  model: 'fencelocations_ad',
  field: 'fence_code',
  startAt: 100,
  incrementBy: 1
});

geospatialSchema.virtual('videomap', {
    ref: "videomapModel",
    localField: "fence_code",
    foreignField: 'fence_code',
    justOne: true
});


module.exports = geospatialSchema;