
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'DiscoBiscuit' });
};

exports.home = function(req, res) {
  res.render('index', {title: 'DiscoBiscuit' });
};



