define(

    ['backbone' , 'views/applicationview'],

function(backbone, ApplicationView) {

  var initialize = function() {
    Backbone.history.start({pushState:true});
    var app = new ApplicationView({});
    app.router.navigate(getPath(), {trigger: true });
    $('div.entry-point').html(app.render());
  };


  var getPath = function() {
    var pathname = window.location.pathname;
    if (pathname === '/') { return 'home'; }
    else { return pathname; }
  };

  return {
    init : initialize
  };

});
