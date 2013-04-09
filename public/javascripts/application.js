define(['backbone' , 'router', 'models/applicationmodel'],

function(backbone, Router, ApplicationModel) {
  var initialize = function() {
    window.app = new ApplicationModel({});
    app.set('router', new Router());

    Backbone.history.start({pushState:true});
    app.get('router').init(getPath(), app);
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
