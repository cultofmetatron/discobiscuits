
/*
 * GET home page.
 */



exports.index = function(req, res){
  res.render('index', { title: 'DiscoBiscuit' });
};

exports.home = function(req, res) {
  res.render('index', {title: 'DiscoBiscuit' });
};

exports.login = function(req, res) {
  res.render('index', {title: 'DiscoBiscuits' });
};

exports.signup = function(req, res) {
  res.render('index', {title: 'DiscoBiscuits' });
};



