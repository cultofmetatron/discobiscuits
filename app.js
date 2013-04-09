
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');

//Mongoose ORM for mongodb
var mongoose = require('mongoose');

//the connection protocols for mongodb
var mongoLogin = {
  database : process.env.MONGO_DISCO_DEV_DB,
  user     : process.env.MONGO_DISCO_DEV_USER,
  password : process.env.MONGO_DISCO_DEV_PASS
};
var mongoUrl = 'mongodb://' + mongoLogin.user + ':' + mongoLogin.password +
                '@dharma.mongohq.com:10024/' + mongoLogin.database;

//connect to mongoose
mongoose.connect(mongoUrl);

var User = require('./models/user')(mongoose);

//passwort authntication system
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
  console.log('in the passport use', username);
  console.log('here isUser', User);
  User.signIn(username, password, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, "username not found"); }
    return done(null, user); //return the user
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});





var app = express();

// all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

  app.get('/', routes.index);

  app.get('/login', routes.login);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));

  app.get('/signup', routes.signup);
  app.get('/home', routes.home);
  //app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



