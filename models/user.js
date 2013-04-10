/* user profile schema */

module.exports = function(mongoose) {
  var crypto = require('crypto');
  var salt   = process.env.DISCO_SALT || "";

  var LocalUserSchema = new mongoose.Schema({
    email    : {type: String, unique: true },
    password : {type: String },
    joined   : {type: Date }

  });

   /* Query models for the user */

  LocalUserSchema.statics.exists = function(email, callback) {
    //returns the user id if he exists
    LocalUser.findOne({
      email: email
    }, callback);
  };

  /* create user creaetes  the user and delegates the callback */
  LocalUserSchema.statics.createUser = function(email, password, callback) {
    var shaSum = crypto.createHash('sha512');
    shaSum.update(password + salt);

    var user = new LocalUser({
      email    : email,
      password : shaSum.digest('hex'),
      joined   : Date.now()
    });
    return user.save(callback);
  };

  /* localSignIn encapsulates verifying if the user exists or not.
   * it then calls the user lookup and passes along the callback
   */
  LocalUserSchema.statics.localSignIn = function(email, password, callback) {
    //sets up the crypto salt for the user
    var shaSum = crypto.createHash('sha512');
        shaSum.update(password + salt);

    var user = LocalUser.findOne({
      email    :  email,
      password :  shaSum.digest('hex')
    }, callback ); //callback => function(err, user) {}
  };


  // this is the final falue that is returned
  var LocalUser = mongoose.model('local-user', LocalUserSchema);
  return LocalUser;
};

