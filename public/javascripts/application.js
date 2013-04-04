define(['backbone' , 'router', 'models/applicationmodel'],

function(backbone, Router, ApplicationModel) {
  var initialize = function() {
    var app = new ApplicationModel({});
    var router = new Router({});
    var foo = Backbone.history.start({pushState:true});
    router.init(app, getPath());
    router.navigate('/login', {trigger:true});
    router.navigate('/signup', {trigger:true});
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
