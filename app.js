
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

//passport authentication system
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

var DropboxStrategy = require('passport-dropbox').Strategy;
var DropBoxCredentials = {
  key    : process.env.MONGO_DISCO_DEV_DROPBOX_KEY,
  secret : process.env.MONGO_DISCO_DEV_DROPBOX_SECRET
};


console.log(DropBoxCredentials);
passport.use(new DropboxStrategy({
  //dropbox strategy
    consumerKey    :  DropBoxCredentials.key,
    consumerSecret :  DropBoxCredentials.secret,
    callbackURL: "http://127.0.0.1:3000/auth/dropbox/callback"
  },
  function(token, tokenSecret, profile, done) {

    process.nextTick(function() {

      return done(null, profile);
    });
  }
));

passport.use(new LocalStrategy({
    usernameField: 'email' //since we are using email logins
  },
  function(email, password, done) {
  User.localSignIn(email, password, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, "email login not found"); }
    user.type = "local";
    return done(null, user); //return the user
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
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

  var xhrLoginHandler = function(req, res) {


  };

  app.post('/login', function(req, res) {
    passport.authenticate('local', function(err, user) {
      if (req.xhr) {
        //thanks @jkevinburton
        if (err)   { return res.json({ error: err.message }); }
        if (!user) { return res.json({error : "Invalid Login"}); }
        req.login(user, {}, function(err) {
          if (err) { return res.json({error:err}); }
          return res.json(
            { user: {
                      id: req.user.id,
                      email: req.user.email,
                      joined: req.user.joined
              },
              success: true
            });
        });
      } else {
        if (err)   { return res.redirect('/login'); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, {}, function(err) {
          if (err) { return res.redirect('/login'); }
          return res.redirect('/');
        });
      }
    })(req, res);
  });

  app.get('/auth/dropbox', function(req, res) {
    passport.authenticate('dropbox', function(err, profile) {
      if (err) { return res.redirect('/login'); }
      if (profile) {
        console.log(profile);
        return res.redirect('/');

      }

    })(req, res);

  });

  app.get('/auth/dropbox/callback', function(req, res) {
    passport.authenticate('dropbox', function(err, profile) {
      console.log('this is res');
      if (err) { return res.redirect('/login'); }
      if (!err && profile) {
        console.log(profile);
        return res.redirect('/');
      }
    })(req, res);
  });

  app.get('/authenticated', function(req, res) {
    console.log(req.user);

  });

  app.get('/signup', routes.signup);
  app.get('/home', routes.home);
  //app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



