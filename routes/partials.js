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

router.get('/meme.html', function(req, res, next) {
    res.render('meme');
});

router.get('/meme-list.html', function(req, res, next) {
    res.render('meme-list');
});

module.exports = router;
