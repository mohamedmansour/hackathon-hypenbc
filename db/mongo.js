var mongoose = require('mongoose');

// local test uri (overwritten if prod vcap env var is found)
var dbURI = 'mongodb://127.0.0.1:27017/' + 'test'; 
if(process.env.VCAP_SERVICES) {
  var vcap_env = JSON.parse(process.env.VCAP_SERVICES);
  if (vcap_env.mongolab) {
    var ml = vcap_env.mongolab;
    dbURI = ml[0].credentials.uri;
  }
}

var mongodb = mongoose.connection;
mongodb.on('connecting', function() {
    console.log('connecting');
});

mongodb.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
mongodb.on('connected', function() {
    console.log('connected!');
});
mongodb.once('open', function() {
    console.log('connection open');
});
mongodb.on('reconnected', function () {
    console.log('reconnected');
});
mongodb.on('disconnected', function() {
    console.log('disconnected');
    console.log('dbURI is: '+dbURI);
    mongoose.connect(dbURI, {server:{auto_reconnect:true, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
  });
console.log('dbURI is: '+dbURI);
mongoose.connect(dbURI, {server:{auto_reconnect:true}});

var kittySchema = mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' });
var fluffy = new Kitten({ name: 'fluffy' });
console.log(silence.name); // 'Silence'
silence.save(function (err, silence) {
  if (err) return console.error(err);
  silence.speak();
});
fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

module.exports = mongodb;