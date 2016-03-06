var express = require('express');
var router = express.Router();

module.exports = function(io){  
  /* GET users listing. */
  router.get('/hype', function(req, res, next) {
    io.to('captureRoom').emit('captureRequest');
    console.log("Emitted a captureRequest to captureRoom");
        
    res.send({
        status: true
    });
  });
  return router;
}