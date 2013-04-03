define(['backbone' , 'router', 'models/applicationmodel'],

function(backbone, Router, ApplicationModel) {
  var initialize = function() {
    Backbone.history.start({pushState:true});
    var app = new ApplicationModel({});
    var router = new Router({});
    router.init(app, getPath());
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
