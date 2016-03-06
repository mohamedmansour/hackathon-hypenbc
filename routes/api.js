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

module.exports = function(io, models) { 
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
      
      console.log("Adding new Hype to video: " + data.videoTitle);
      
      models.Videos.update({VideoId: data.videoTitle},
         {$push: { 'Hypes' : 
            {
              UserId: userId,
              TimeCreated: timestamp,
              HypeType: hypeType,
              HypeStorageContainer: blobImageContainerName,
              HypeFileName: newFileName,
              HypePositionSeconds: data.videoElapsed,
              TotalVideoDuration: data.videoDuration,
              VideoId: data.videoTitle,
            }
         }
         },{upsert:true}, function(err, data) { 
      });
      
      //prints out all the Hype records
      console.log("Saved new Hype entry to db");
      console.log("Showing video where VideoId = " + data.videoTitle);
      models.Videos.find({VideoId: data.videoTitle}, function (err, hype) {
        if (err) return console.error(err);
          console.log(hype);
      })
    });
  });
  
  router.get('/meme', function(req, res, next){
    if (process.env.NODE_ENV == 'dev') {     
        res.send([{"_id":"56dc278d91eff01d06d227c9","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457268621892__vid_warcraft.png","__v":0},{"_id":"56dc39e02958c6e00dbbc253","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457273312135__vid_warcraft.png","__v":0},{"_id":"56dc3a5574b5ba330e0f5e6b","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457273429310__vid_warcraft.png","__v":0},{"_id":"56dc3aac36c7595a0e5aebb8","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457273516089__vid_warcraft.png","__v":0},{"_id":"56dc3ae5a8d4c6830e38ebe1","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457273573519__vid_warcraft.png","__v":0},{"_id":"56dc3be2761eb9e40eb2cae8","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457273826786__vid_warcraft.png","__v":0},{"_id":"56dc3c93b42ca62a0f2f4aa2","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457274003448__vid_warcraft.png","__v":0},{"_id":"56dc3cd6a6dcec520fd5e564","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457274070338__vid_warcraft.png","__v":0}]);
        return;
    }
    models.Memes.find(function(err, memes) {
      res.send(memes.reverse());
    });
  });
  
  router.get('/meme/:id', function(req, res, next){
    if (process.env.NODE_ENV == 'dev') {
      res.send({"_id":"56dc3cd6a6dcec520fd5e564","UserId":"1","VideoTitle":"warcraft","MemeUrl":"/api/image/meme__created_1457274070338__vid_warcraft.png","__v":0});
      return;
    }
    models.Memes.findOne({_id: req.params.id}, function(err, meme){
      res.send(meme);
    });
  });
  
  router.post('/meme', function(req, res, next) {
    var memeString = req.body.memeString;
    var videoTitle = req.body.videoTitle;
    var memeFileName = "meme__created_" + Date.now() + "__" + "vid_" + videoTitle + ".png";
    
    console.log("Uploading new meme: " + memeFileName);
    var writeStream = db.upload({
      container: blobImageContainerName,
      remote: memeFileName
    });
    
    var readStream = new stream.Readable();
    readStream._read = function noop() {};
    readStream.push(new Buffer(memeString, 'base64'));
    readStream.push(null);
      
    readStream.pipe(writeStream);
    
    console.log('Finished uploading to object store');
    
    new models.Memes({
      UserId: '1',
      VideoTitle: videoTitle,
      MemeUrl: '/api/image/' + memeFileName
    }).save(function (err, video) {
      if (err) return console.error(err);
      console.log(video);
    });
    
    res.send({success: true, imgUrl: '/api/image/' + memeFileName});
  });
  
  router.get('/videos', function(req, res, next) {
    if (process.env.NODE_ENV == 'dev') {     
       console.log("Using mock video data...");   
       res.send([{
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
       },
       {
           title: 'Warcraft (2016)',
           bannerImage: '/images/banners/warcraft.png',
           runtime: 3600,
           hypes: [
               {
                   thumbnail: '/images/frames/frame1.png',
                   timestamp: '1:20',
                   timemark: '1:20'
               },
               {
                   thumbnail: '/images/frames/frame3.png',
                   timestamp: '10:20',
                   timemark: '10:20'
               }
           ]
       }]);

        return;
    }
    
    models.Videos.find({ Hypes: { $exists: true, $not: {$size: 0} } }, function(err, vids) {
      res.send(vids.map(function(v){
        return new Object(
        {
          title: v.VideoLong,
          subtitle: v.Subtitle,
          runtime: v.Runtime,
          bannerImage: v.BannerUrl,
          hypes: v.Hypes.map(function(h){
            return new Object({
              thumbnail: '/api/image/' + h.HypeFileName,
              timestamp: h.TimeCreated,
              timemark: Math.floor(h.HypePositionSeconds / 60).toString() +  ":" + Math.floor(h.HypePositionSeconds - Math.floor(h.HypePositionSeconds / 60) * 60).toString()
            })
          }).reverse()
        });
      }));  
    });
  });
  
/* GET images from object storage. */
  router.get('/image/:id', function(req, res, next) {
      db.download({container: 'img', remote: req.params.id}).pipe(res);
  });
  

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
      io.emit('captureRequest', req.query);
      console.log("Emitted a captureRequest to all sockets.");
      res.send({
        status: true,
        message: "captureRequest sent to the client. Your capture image will be available soon!"
      });
    }
  });
  
  router.get('/watch', function(req, res, next) {
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
      console.log("Emitting watchRequest to all sockets...");
      io.emit('watchRequest', req.query.video);
      console.log("Emitted a watchRequest to all sockets.");
      res.send({
        status: true,
        message: "watchRequest sent to the client. Your video will be available soon!"
      });
    }
  });
  return router;
}