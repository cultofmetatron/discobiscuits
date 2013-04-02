// this is the router system
define(['backbone'], function() {
  var Router = Backbone.Router.extend({
    _viewLoaded : false, //this is used to prevent refreshes on new views
    routes: {
      'home':'home'

    },
    home: function() {
      //the home screen


    }

  });


  return new Router();
});
