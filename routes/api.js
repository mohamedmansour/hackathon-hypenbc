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