var request = require('request');

function UserInterface() {
  if (!(this instanceof UserInterface))
  return new UserInterface();
}

var LogError = function(error, moduleName)
{
    let errorlogger = ErrorLogInterface();
    let errorModel = {
      message: error.message,
      modulename: moduleName,
      errorStack: error.errorStack === undefined ?  JSON.stringify(error) : JSON.stringify(error.errorStack)
    }
    errorlogger.logError(errorModel);
}

UserInterface.prototype.getAuthToken = function(cb) {
  
  // Configure the request
  var options = {
    url: 'http://35.177.14.80/createToken/chkLoginuser',
    method: 'GET'
  }

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {        
        var val;
        try {
          val = body;
        } catch (err) {
          return cb(err);
        }
        cb(null, val);
    }
    else
    {      
      LogError(err, "BetFairAuthInterface - getAuthToken");
    }
  })  
};

module.exports = UserInterface;