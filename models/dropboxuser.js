
/* user profile schema */

module.exports = function(mongoose, passport) {
  var DropboxUserSchema = new mongoose.Schema({
    email    : {type: String, unique: true },
    password : {type: String },
    joined   : {type: Date }

  });

  DropboxUserSchema.statics.callbackURL = "http://127.0.0.1:3000/auth/dropbox/callback";


  /* create user creaetes  the user and delegates the callback */
  DropboxUserSchema.statics.createUser = function(email, password, callback) {
    var shaSum = crypto.createHash('sha512');
    shaSum.update(password + salt);

    var user = new LocalUser({
      email    : email,
      password : shaSum.digest('hex'),
      joined   : Date.now()
    });
    return user.save(callback);
  };

  /* signIn encapsulates verifying if the user exists or not.
   * it then calls the user lookup and passes along the callback
   */
  DropboxUserSchema.statics.signIn = function(email, password, callback) {
    //sets up the crypto salt for the user
    var shaSum = crypto.createHash('sha512');
        shaSum.update(password + salt);

    var user = LocalUser.findOne({
      email    :  email,
      password :  shaSum.digest('hex')
    }, callback ); //callback => function(err, user) {}
  };


  // this is the final falue that is returned
  var DropboxUser = mongoose.model('dropbox-user', DropboxUserSchema);
  return DropboxUser;
};



