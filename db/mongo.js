var mongoose = require('mongoose');

// local test uri (overwritten if prod vcap env var is found)
var dbURI = 'mongodb://127.0.0.1:27017/' + 'test';
if(process.env.VCAP_SERVICES) {
  var vcap_env = JSON.parse(process.env.VCAP_SERVICES);
  console.log(vcap_env);
  if (vcap_env['mongodb-2.4']) {
    var ml = vcap_env['mongodb-2.4'];
    dbURI = ml[0].credentials.url;
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

if (process.env.NODE_ENV) {
    mongoose.connect(dbURI, {server:{auto_reconnect:true}});
}

module.exports = mongoose;
