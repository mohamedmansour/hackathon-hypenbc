var express = require('express');
var router = express.Router();
var db = require('../db/bluemixdb.js');
    
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

module.exports = function(io) { 
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