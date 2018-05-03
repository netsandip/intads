//mongoose schema for getting data  

var mongoose = require('mongoose');
module.exports = mongoose.Schema({
    campaign_name: String,
    campaign_title: String,
    Created_date : { type : Date, default: Date.now }
});
