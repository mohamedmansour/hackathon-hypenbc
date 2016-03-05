var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hype', function(req, res, next) {
   res.send({
       status: true
   });
});

module.exports = router;
