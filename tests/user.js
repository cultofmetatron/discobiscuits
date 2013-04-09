var path = require('path');

//Mongoose ORM for mongodb
var mongoose = require('mongoose');

//the connection protocols for mongodb
//mongodb://disco:fries@dharma.mongohq.com:10024/discobiscuit-dev
var mongoLogin = {
  database : process.env.MONGO_DISCO_DEV_DB,
  user     : process.env.MONGO_DISCO_DEV_USER,
  password : process.env.MONGO_DISCO_DEV_PASS
};
var mongoUrl = 'mongodb://' + mongoLogin.user + ':' + mongoLogin.password +
                '@dharma.mongohq.com:10024/' + mongoLogin.database;


console.log('the url, ' , mongoUrl);
mongoose.connect(mongoUrl);

//require the user model
var User = require('../models/user');

User.createUser('cultofmetatron@aumlogic.com', 'foofighter', function(err, doc) {
  console.log(err, doc);
});





