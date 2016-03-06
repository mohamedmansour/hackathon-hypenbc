module.exports = function(mongoose) {
  var hypeSchema = mongoose.Schema({
    UserId: String,
    TimeCreated: Date,
    HypeType: String,
    HypeStorageContainer: String,
    HypeFileName: String,
    HypePositionMilliseconds: Number,
    TotalVideoDuration: Number
  });

  return mongoose.model('Hype', hypeSchema);

  // var testHype = new Hype({ 
  //   UserId: 1, 
  //   TimeCreated: Date.now(), 
  //   HypeType: "ROFL", 
  //   HypeStorageContainer: "img",
  //   HypeFileName: "testFile.png",
  //   HypePositionMilliseconds: 99123,
  //   TotalVideoDuration: 19234923 
  // }).save(function (err, testHype) {
  //   if (err) return console.error(err);
  // });

  // Hype.find(function (err, hypes) {
  //   if (err) return console.error(err);
  //   console.log(hypes);
  // });

};

