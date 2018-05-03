/**
 * Created by Sandeep on 23 Jan 2018.
 */
//exports.connectionString= "mongodb://localhost:27017/test";

var environment = 'Dev';
var dbconnection='';
if(environment==='Dev') {
    dbconnection ='mongodb://ustDWrite:ust123@ds049598.mlab.com:49598/ustartifacts'
}
else
{
    dbconnection='';
}
exports.connectionString= dbconnection;
 