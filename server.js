/**
 * Created by DELL on 4/22/2016.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var connection = require('./connection');
var cors = require('cors');
const fileUpload = require('express-fileupload');
var userSchema = require('./dbmodels/users');
var _ = require('underscore');
var UserModel = mongoose.model('usersinfo', userSchema, 'users_ad');

var campaignSchema = require('./dbmodels/campaign');
var campaignModel = mongoose.model('campaigninfo',campaignSchema, 'campaign_ad');

var billboardsSchema = require('./dbmodels/billboards');
var billboardsModel = mongoose.model('billboardsinfo',billboardsSchema, 'billboards_ad');

var transactionSchema = require('./dbmodels/transactionhistory');
var transactionModel = mongoose.model('transactionhistoryinfo',transactionSchema, 'transactionhistory_ad');

var geospatialSchema = require('./dbmodels/geodata');
var geospatialModel = mongoose.model('fencelocationsinfo',geospatialSchema,'fencelocations_ad');

var videofilesSchema = require('./dbmodels/videofiles');
var videofilesModel = mongoose.model('videofilesInfo', videofilesSchema, 'videofiles_ad');

var videomapSchema = require('./dbmodels/videomap');
var videomapModel = mongoose.model('videomapModel', videomapSchema, 'videomap_ad');


var deviceSchema = require('./dbmodels/device');
var deviceModel = mongoose.model('deviceInfo',deviceSchema, 'device_ad');

app.use(cors());
app.use(fileUpload());
/*app.use(favicon(__dirname + '/public/images/favicon.ico'));*/
app.use(express.static(__dirname + '/public'));
//app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(bodyparser.json());
var ErrorLogInterface = require('./common/errorLogger.js');

mongoose.Promise = require('bluebird');
mongoose.connect(connection.connectionString, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  });
 

//Common functions
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

app.post('/validateLogin', function(req, res)
{	
	UserModel.findOne({userid: req.body.userid, Password: req.body.password },{userid: true, Role: true}, function(err,obj) { 
		
		if (obj != undefined) {
			res.json({ "success": true, "errormessage": "", data: obj });
		}
		else
		{
			res.json({ "success": false, "errormessage": "authentication mismatch or user doesnt exists in the system " });
		}		
	
	});
});

app.post('/createUser', function(req, res)
{
	try {
		
		var userdata = req.body;

		var userInfo = new UserModel(userdata);

		UserModel.findOne({userid: userdata.userid}, function(err,obj) { 
			//console.log(obj); 
			if (obj == undefined) {
				userInfo.save(function (err) {
					if (err) {
						LogError(err, "createUser");
						res.status(400).send(err);
					}
					else { res.json({ "success": true, "errormessage": "" }); }
				});	
			}
			else
			{
				res.json({ "success": false, "errormessage": "userid already exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "createUser");
	}
});

app.post('/createcampaign', function(req, res)
{
	try {
		
		var campaignData = req.body;
		//console.log(req.body);
		var campaignModelInfo = new campaignModel(campaignData);

		campaignModel.findOne({campaign_name: campaignData.campaign_name}, function(err,obj) { 
			//console.log(obj); 
			if (obj == undefined) {
				campaignModelInfo.save(function (err) {
					if (err) {
						LogError(err, "createcampaign");
						res.status(400).send(err);
					}
					else { res.json({ "success": true, "errormessage": "" }); }
				});	
			}
			else
			{
				res.json({ "success": false, "errormessage": "Campaign already exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "createcampaign");
	}
});

app.post('/createbillboard', function(req, res)
{
	
	try {
		
		var billdata = req.body;

		var billboardsModelInfo = new billboardsModel(billdata);

		billboardsModel.findOne({billboard_name: billdata.billboard_name}, function(err,obj) { 
			//console.log(obj); 
			if (obj == undefined) {
				billboardsModelInfo.save(function (err) {
					if (err) {
						LogError(err, "createbillboard");
						res.status(400).send(err);
					}
					else { res.json({ "success": true, "errormessage": "" }); }
				});	
			}
			else
			{
				res.json({ "success": false, "errormessage": "userid already exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "createbillboard");
	}
});

app.post('/createDevice', function(req, res)
{
	try {
		
		var devicedata = req.body;

		var deviceModelInfo = new deviceModel(devicedata);

		deviceModel.findOne({device_name: devicedata.device_name}, function(err,obj) { 
			//console.log(obj); 
			if (obj == undefined) {
				deviceModelInfo.save(function (err) {
					if (err) {
						LogError(err, "createDevice");
						res.status(400).send(err);
					}
					else { res.json({ "success": true, "errormessage": "" }); }
				});	
			}
			else
			{
				res.json({ "success": false, "errormessage": "userid already exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "createDevice");
	}
});


app.post('/getAllUsers', function(req, res)
{
	try {
			
		UserModel.find({Role: "User" },{ Password: false}, function(err,obj) { 
			//console.log(obj); 
			if (obj != undefined) {
				res.json({ "success": true, "errormessage": "", data: obj });
			}
			else
			{
				res.json({ "success": false, "errormessage": "authentication mismatch or user doesnt exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "getAllUsers");
	}
});

app.post('/getAllCampaign', function(req, res)
{
	try {
			
		campaignModel.find({ }, function(err,obj) { 
			//console.log(obj); 
			if (obj != undefined) {
				res.json({ "success": true, "errormessage": "", data: obj });
			}
			else
			{
				res.json({ "success": false, "errormessage": "authentication mismatch or user doesnt exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "getAllCampaign");
	}
});

app.post('/getAllBillboards', function(req, res)
{
	try {
			
		billboardsModel.find({ }, function(err,obj) { 
			// console.log(obj); 
			if (obj != undefined) {
				res.json({ "success": true, "errormessage": "", data: obj });
			}
			else
			{
				res.json({ "success": false, "errormessage": "authentication mismatch or user doesnt exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "getAllCampaign");
	}
});

app.post('/getAlldevices', function(req, res)
{
	try {
			
		deviceModel.find({ }, function(err,obj) { 
			// console.log(obj); 
			if (obj != undefined) {
				res.json({ "success": true, "errormessage": "", data: obj });
			}
			else
			{
				res.json({ "success": false, "errormessage": "authentication mismatch or user doesnt exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "getAllCampaign");
	}
});

app.post('/upload', function(req, res) {
	try {
	var device = req.body.device;
	console.log(req.body);
	if (!req.files)
	  return res.status(400).send('No files were uploaded.');
		// // Use the mv() method to place the file somewhere on your server
		req.files.file.mv('./storage/'+req.files.file.name, function(err) {
		if (err)
			{
				LogError(error, "upload");
				return res.status(500).send(err);
		}

		// updateQuery = {
		// 	"isUpload": true
        // }

		// deviceModel.findOneAndUpdate({device_code: parseInt(device)}, updateQuery, function(err,obj) { 
		// 	//console.log(obj); 
		// 	if (err) {                
        //         res.status(400).send(err);
        //     } else {       
        //         res.status(200).send({ "success": "true" });
        //     }
		
		// }); 	
		
		});
	} catch (error) {
		LogError(error, "upload");
	}
  });


app.post('/storeGPSByDeviceID', function(req, res) {
	try {
		
		var devicedata = req.body;

		var coords = [];
		coords[0] = devicedata.longitude;
		coords[1] = devicedata.latitude;

		let body = {
			'device_code': req.body.device_code,
    		'location': coords
		}
		console.log(body);
		transModelInfo = new transactionModel(body);
				
		transModelInfo.save(function (err) {
			if (err) {
				LogError(err, "createDevice");
				res.status(400).send(err);
			}
			// else { res.json({ "success": true, "errormessage": "" }); }
		});	

		geospatialModel.find({ location:
			{ $geoWithin:
			   { $centerSphere: [ coords, 5 / 3963.2 ] } } }).populate('videomap').exec(function (err, results) {
			
				var lisvidfiles = _.map(
					results, 
					function(resultsList) {
						if (resultsList.videomap !== undefined && resultsList.videomap !== null) {
							return { 
								filename:  resultsList.videomap.filename,
								isPlay: resultsList.videomap.isPlay,
								url:  resultsList.videomap.url,
							};	
						}						
					}
				);
			
				res.json({ "success": true, "errormessage": "", data: lisvidfiles });		  
		});


		
	} catch (error) {
		LogError(error, "createDevice");
	}
});

app.post('/savefenceLocations', function(req, res) {
	try {
		
		var locationdata = req.body;

		var coords = [];
		coords[0] = locationdata.longitude;
		coords[1] = locationdata.latitude;

		let body = {
			'fence_name': req.body.fence_name,
			'userid': req.body.userid,
			location: {
				'type': "Point",
				'coordinates': coords
			},
			radius: req.body.radius
		}
		console.log(body);
		geospatialModelInfo = new geospatialModel(body);
				
		geospatialModelInfo.save(function (err) {
			if (err) {
				LogError(err, "savefenceLocations");
				res.json({ "success": false, "errormessage": err.message }); 
			}
			else { res.json({ "success": true, "errormessage": "" }); }
		});	
		
	} catch (error) {
		LogError(error, "savefenceLocations");
	}
});

app.post('/getDeviceCount', function(req, res){
	try {
		deviceModel.find().exec(function (err, results) {
			res.json({ "success": true, "errormessage": "", data: results.length });		  
		  });
	} catch (error) {
		LogError(error, "getDeviceCount");
	}
});

app.post('/getFenceDetails', function(req, res){
	try {
		geospatialModel.find().exec(function (err, results) {
			res.json({ "success": true, "errormessage": "", data: results });		  
		  });
	} catch (error) {
		LogError(error, "getFenceDetails");
	}
});

app.post('/getvideofiles', function(req, res){
	try {
		videofilesModel.find().sort({"Created_date":-1}).exec(function (err, results) {
			res.json({ "success": true, "errormessage": "", data: results });		  
		  });
	} catch (error) {
		LogError(error, "getvideofiles");
	}
});

app.post('/removefilevideomapping', function(req, res){
	try {
		console.log(req.body.id);		
		videomapModel.findOneAndRemove({_id: req.body.id}, function (err, results) {
			if (err) {
				console.log(err);				
			}
			
			res.json({ "success": true, "errormessage": "" });		  
		  });
	} catch (error) {
		LogError(error, "getvideofiles");
	}
});

app.post('/savevideomap', function(req, res){
	try {
		// console.log(req.body.fence);
		// console.log(req.body.videos);		
		// let mappedArray = _.union(req.body.fence, req.body.videos);
		
		for (let index = 0; index < req.body.fence.length; index++) {
			const fenelement = req.body.fence[index];
			for (let vindex = 0; vindex < req.body.videos.length; vindex++) {
				const videlement = req.body.videos[vindex];
				
				let mappedArray = {
					'fence_code': fenelement.fence_code,
					'video_code': videlement.video_code,
					'fence_name': fenelement.fence_name,
					'url' : videlement.url,
					'filename': videlement.filename,
					'userid' : 'ramesh@gmail.com',
					'isPlay': true
				}
				console.log(mappedArray);
				deviceModel.findOne({fence_code: fenelement.fence_code, video_code: videlement.video_code}, function(err,obj) { 
					//console.log(obj); 
					if (obj == undefined) {
						let map = new videomapModel(mappedArray);
						map.save(function (err) {
							if (err) {
								LogError(err, "savevideomap");						
							}
							
						});	
					}					
				
				});    			
				
			}
			
		}
		
		res.json({ "success": true, "errormessage": "" }); 
		
	} catch (error) {
		LogError(error, "savevideomap");
	}
});

app.post('/getvideomapdetails', function(req, res){
	try {
		videomapModel.find().sort({"Created_date":-1}).exec(function (err, results) {
			res.json({ "success": true, "errormessage": "", data: results });		  
		  });
	} catch (error) {
		LogError(error, "getvideofiles");
	}
});


app.post('/searchLocations', function(req, res){
	
	var devicedata = req.body;

	var coords = [];
	coords[0] = devicedata.longitude;
	coords[1] = devicedata.latitude;
	console.log(coords);
	try {
		//{ $geoWithin: { $center: [ [-74, 40.74], 10 ] } }		
		


		deviceModel.find({
			location: {
				$geoWithin: { $center: [ coords, 0.1 ] }
			}
		  }, function(err,obj) { 
			//	 console.log(obj); 
			if (obj != undefined) {
				res.json({ "success": true, "errormessage": "", data: obj });
			}
			else
			{
				res.json({ "success": false, "errormessage": "authentication mismatch or user doesnt exists in the system" });
			}		
		
		});        
		
	} catch (error) {
		LogError(error, "getAllCampaign");
	}

});

app.post('/saveCoOrdinates', function(req, res){

	try {
		
		var devicedata = req.body;

		var coords = [];
		coords[0] = devicedata.longitude;
		coords[1] = devicedata.latitude;

		let body = {			
    		'location': coords
		}
		console.log(body);
		deviceModelInfo = new deviceModel(body);

		deviceModelInfo.save(function (err) {
			if (err) {
				res.json({ "success": false, "errormessage": "" });
			}
			else { res.json({ "success": true, "errormessage": "" }); }
		});	

				
	} catch (error) {
		console.log(error);
	}

});

app.post('/updateFenceDetails', function(req, res) {
	try {
		
		var devicedata = req.body;

		var coords = [];
		coords[0] = devicedata.longitude;
		coords[1] = devicedata.latitude;

		let body = {
			'device_code': req.body.device_code,
    		'device_name': req.body.device_name,
    		'device_type': req.body.device_type,
    		'location': {
        		'type': coords,
        		'index': '2d'      // create the geospatial index
        	}
		}

		updateQuery = {
            "$set": {
				'location': [cords]
            }
        }

		deviceModelInfo = new deviceModel(body);

		deviceModel.findOneAndUpdate({device_name: devicedata.device_name, device_type: req.body.device_type}, updateQuery, function(err,obj) { 
			//console.log(obj); 
			if (err) {                
                res.status(400).send(err);
            } else {                
                // let auditModel = {
                //     action_performed: "Save",
                //     action_desc: AuditMessages.ValidicUsertoken,
                //     module_name: "User Module",
                //     screen_name:"updateValidicTokenToUsers",                    
                //     subject_id: req.body.user,
                //     client_id: req.decoded._doc.clientId,                    
                //     new_data: JSON.stringify(update)
                // }
                // auditlogger.auditLog(auditModel);
                res.status(200).send({ "success": "true" });
            }
		
		});        
		
	} catch (error) {
		LogError(error, "createDevice");
	}
});

app.post('/updatestatus', function(req, res){
	let device = req.body.device;

	updateQuery = {
		$set : {		  
		  "isUpdated": false		  
		}
	  }
  
	  deviceModel.findOneAndUpdate({device_code: parseInt(device)}, updateQuery, function(err,obj) { 
		//console.log(obj); 
		if (err) {                
			res.json({ "success": false, "errormessage": "" });
			  } else {       
				res.json({ "success": true, "errormessage": "" });
			  }
	  
	  });
});

app.post('/fileavstatus', function(req, res){

	try {
		
		deviceModel.find({device_code: req.body.device}, function(err,obj) { 
			//console.log(obj); 
			if (err) {                
                res.status(400).send(err);
            } else {                
                // let auditModel = {
                //     action_performed: "Save",
                //     action_desc: AuditMessages.ValidicUsertoken,
                //     module_name: "User Module",
                //     screen_name:"updateValidicTokenToUsers",                    
                //     subject_id: req.body.user,
                //     client_id: req.decoded._doc.clientId,                    
                //     new_data: JSON.stringify(update)
                // }
                // auditlogger.auditLog(auditModel);
                res.json({ "success": true, "errormessage": "", data: obj });
            }
		
		}); 

				
	} catch (error) {
		console.log(error);
	}

});

app.post('/filestoplay', function(req, res){

	try {
		
		deviceModel.find({device_code: req.body.device}, function(err,obj) { 
			// console.log(obj); 
			if (err) {                
                res.status(400).send(err);
            } else {                                
                res.json({ "success": true, "errormessage": "", data: obj[0].transaction });
            }
		
		}); 

				
	} catch (error) {
		console.log(error);
	}

});




var Port = process.env.PORT || 3000;
app.listen(Port);
console.log("server running on port " + Port);