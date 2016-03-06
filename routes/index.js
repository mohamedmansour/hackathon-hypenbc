var express = require('express');
var router = express.Router();


module.exports = function(models) { 

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index');
    });

    router.get('/memes/:id', function(req, res, next) {
        var hostUrl = req.protocol + '://' + req.get('host');
        var fullUrl = hostUrl + req.originalUrl;
        console.log(fullUrl);
        if (process.env.NODE_ENV == 'dev') {
            var meme =  {"_id":"56dc3cd6a6dcec520fd5e564","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457274070338__vid_warcraft.png","__v":0};
             res.render('memepage', {
                fullUrl: fullUrl,
                imageUrl: hostUrl + meme.MemeUrl,
                meme: meme
             });
            return;
        }
        models.Memes.findOne({_id: req.params.id}, function(err, meme){
            res.render('memepage', {
                fullUrl: fullUrl,
                imageUrl: hostUrl + meme.MemeUrl,
                meme: meme
            });
        });
    });

    router.get('*', function (req, res) {
        res.render('index');
    });
    return router;
};
