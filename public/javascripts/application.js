define(['backbone' , 'router', 'models/applicationmodel'],

function(backbone, Router, ApplicationModel) {
  var initialize = function() {
    window.app = new ApplicationModel({});
    app.set('router', new Router());
    var foo = Backbone.history.start({pushState:true});
    app.get('router').init(getPath());
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
