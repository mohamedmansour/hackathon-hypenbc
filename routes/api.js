var express = require('express');
var router = express.Router();
var db = require('../db/bluemixdb.js');
var stream = require('stream');
var blobImageContainerName = 'img';
    
// Authenticate to OpenStack
db.auth(function(error) {
    if (error) {
        console.error("storageClient.auth() : error creating storage client: ", error); 
    }
    else {
        console.log("connected to bluemix object storage");
       //API: 
       
       //db.upload({conatiner: 'img', remote: 'FLENAME'});
       
       //db.download({container: 'img', remote: 'FILENAME'}); 
    }
});

module.exports = function(io, Hype) { 
  io.on('connection', function(socket) {
    console.log('A user connected to socket: ' + socket);
    
    socket.on('captureResponse', function(data) {
      console.log("Got captureResponse:");
      console.log(data);
      
      var userId = 1;
      var timestamp = Date.now();
      var hypeType = "Angry";
      var newFileName = "user_" + userId + 
                        "__vid_" + data.videoTitle + 
                        "__elapsd_" + data.videoElapsed.toString().replace('.','_') + 
                        "__hype_" + hypeType + 
                        ".png";
      
      console.log("New file name for image: " + newFileName);
      
      console.log("Attempting to upload image to blob storage");
      var writeStream = db.upload({
        container: blobImageContainerName,
        remote: newFileName
      });
      var readStream = new stream.Readable();
      readStream._read = function noop() {};
      readStream.push(new Buffer(data.image, 'base64'));
      readStream.push(null);
      
      readStream.pipe(writeStream);
      console.log("Done uploading image to blob storage");
      
      console.log("Creating new Hype entry");
      new Hype({
        UserId: userId,
        TimeCreated: timestamp,
        HypeType: hypeType,
        HypeStorageContainer: blobImageContainerName,
        HypeFileName: newFileName,
        HypePositionMilliseconds: data.videoElapsed,
        TotalVideoDuration: data.videoDuration
      }).save(function (err, testHype) {
        if (err) return console.error(err);
      });
      console.log("Saved new Hype entry to db");
    });
  });
  
  router.get('/videos', function(req, res, next) {
    res.send([
        {
            title: 'Warcraft (2016)',
            bannerImage: '/images/banners/warcraft.png',
            runtime: 7200,
            hypes: [
                {
                    thumbnail: '/images/frames/frame1.png',
                    timestamp: '1:20',
                    timemark: '1:20'
                },
                {
                    thumbnail: '/images/frames/frame3.png',
                    timestamp: '3:20',
                    timemark: '3:20'
                }
            ]
        },
        {
            title: 'Mr Robot (2015)',
            subtitle: 'Season 1, Episode 5',
            bannerImage: '/images/banners/warcraft.png',
            runtime: 3600,
            hypes: [
                {
                    thumbnail: '/images/frames/frame1.png',
                    timestamp: '1:20',
                    timemark: '1:20'
                },
                {
                    thumbnail: '/images/frames/frame2.png',
                    timestamp: '5:20',
                    timemark: '5:20'
                },
                {
                    thumbnail: '/images/frames/frame3.png',
                    timestamp: '10:20',
                    timemark: '10:20'
                }
            ]
        }
    ]);    
  });
  
/* GET images from object storage. */
  router.get('/image/:id', function(req, res, next) {
      db.download({container: 'img', remote: req.params.id}).pipe(res);
  });
  
  /* GET users listing. */
  router.get('/hype', function(req, res, next) {
    var connectedClients = io.sockets.clients().connected;
    console.log("Connected Clients:");
    console.log(connectedClients);
    
    if (Object.keys(connectedClients).length === 0){
      console.log("No connected clients!");
      res.send({
        status: false,
        message: "No clients are connected. Watch a show dummy!"
      });
    } else {
      console.log("Emitting captureRequest to all sockets...");
      io.emit('captureRequest');
      console.log("Emitted a captureRequest to all sockets.");
      res.send({
        status: true,
        message: "captureRequest sent to the client. Your capture image will be available soon!"
      });
    }
  });
  return router;
}