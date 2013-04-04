/* user profile schema */
module.exports = function(mongoose) {
  var crypto = require('crypto');
  var salt   = process.env.DISCO_SALT || "";

  var LocalUserSchema = new mongoose.Schema({
    email    : {type: String, unique: true },
    password : {type: String },
    joined   : {type: Date }

  });

  var LocalUser = mongoose.model('local-user', LocalUserSchema);

  /* Query models for the user */

  var exists = function(email, callback) {
    //returns the user id if he exists
    LocalUser.findOne({
      email: email
    });
  };

  var createUser = function(email, password, callback) {
    var shaSum = crypto.createHash('sha512');
    shaSum.update(password + salt);

    var user = new User({
      email    : email,
      password : shaSum.digest('hex'),
      joined   : Date.now()
    });

    callback = callback || function() {};
    user.save(callback);
  };




  return {
    User:User,
    register : createUser
  };
};



