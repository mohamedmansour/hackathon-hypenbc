var express = require('express');
var router = express.Router();

router.get('/video-list.html', function(req, res, next) {
    res.render('video-list');
});

router.get('/video.html', function(req, res, next) {
    res.render('video');
});

router.get('/doodle.html', function(req, res, next) {
    res.render('doodle');
});

module.exports = router;
