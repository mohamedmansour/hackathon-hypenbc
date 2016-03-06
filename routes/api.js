var express = require('express');
var router = express.Router();

module.exports = function(io){
  /* GET users listing. */
  router.get('/hype', function(req, res, next) {
    res.send({
        status: true
    });
  });
  return router;
}