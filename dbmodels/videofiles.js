//mongoose schema for getting data  

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = require('../connection');

videoSchema = mongoose.Schema({
    video_code: Number,
    url: String,
    filename: String,
    isPlay: { type: Boolean, default: false},
    userid: String,
    Created_date : { type : Date, default: Date.now }
});

var connection = mongoose.createConnection(connection.connectionString);

autoIncrement.initialize(connection);
videoSchema.plugin(autoIncrement.plugin, {
  model: 'videofiles_ad',
  field: 'video_code',
  startAt: 100,
  incrementBy: 1
});

module.exports = videoSchema;