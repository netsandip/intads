//mongoose schema for getting data  

var mongoose = require('mongoose');
module.exports = mongoose.Schema({
    userid: String, 
    Name: String,
    EmailAddress: String,
    PhoneNumber: Number,    
    Password: String,
    Role:  { type : String, default: 'User' },    
    Created_date : { type : Date, default: Date.now }
});
