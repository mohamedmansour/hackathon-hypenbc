var express = require('express');
var router = express.Router();

module.exports = function(io){  
  /* GET users listing. */
  router.get('/hype', function(req, res, next) {
    
    console.log("Emitting captureRequest to all sockets...")
    io.emit('captureRequest', 'hi!');
    console.log("Emitted a captureRequest to all sockets.");

    res.send({
        status: true
    });
  });
  return router;
}