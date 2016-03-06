module.exports = function(mongoose) {
  var HypesSchema = mongoose.Schema({
    UserId: String,
    TimeCreated: Date,
    HypeType: String,
    HypeStorageContainer: String,
    HypeFileName: String,
    HypePositionSeconds: Number,
    TotalVideoDuration: Number,
    VideoId: String
  });
  
  var VideosSchema = mongoose.Schema({
    VideoId: String,
    VideoLong: String,
    BannerUrl: String,
    Subtitle: String,
    Runtime: Number,
    Hypes: [HypesSchema]
  });
  
  var Hypes = mongoose.model('Hypes', HypesSchema);
  var Videos = mongoose.model('Videos', VideosSchema);

  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].forEach(function(n) {
    new Videos({
      VideoId: 'mrrobots01e' + n,
      VideoLong: 'Mr. Robot (2016)',
      Subtitle: "Season 01, Episode " + n,
      Runtime: 3600,
      BannerUrl: '/images/banners/warcraft.png',
      Hypes: []
    }).save(function (err, video) {
      if (err) return console.error(err);
    });
  });
  
  new Videos({
    VideoId: 'warcraft',
    VideoLong: 'Warcraft (2016)',
    Hypes: [],
    BannerUrl: '/images/banners/warcraft.png',
    Runtime: 7200
  }).save(function (err, video) {
    if (err) return console.error(err);
  });
  
  //prints out all the Hype records
  console.log("Saved new Hype entry to db");
  Videos.find(function (err, v) {
    if (err) return console.error(err);
      console.log(v);
  });

  return {
    Hypes: Hypes,
    Videos: Videos
  };
};

