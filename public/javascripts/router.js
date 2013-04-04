// this is the router system
define(['views/sidebarview', 'views/homeview' , 'backbone'], function(SidebarView, HomeView) {
  var Router = Backbone.Router.extend({

    init  : function(app, route) {
      //initialize app
      this.app = app;
      this.app.set('sidebar', new SidebarView({}));
      this.app.set('bigpanel', new HomeView({}));
      //set up model
      $('div.sidebar').html(this.app.get('sidebar').render());
      $('div.main').html(this.app.get('bigpanel').render());
    },

    isLoggedIn: function() {
      //checks if logged in
      return false;
    },
    routes: {
      'home'   : 'home',
      'login'  : 'login',
      'signup' : 'signup'
    },
    home: function() {
      //the home screen


    },
    login: function() {
      console.log('in the loginz');
      this.navigate('signup', {trigger: true});

    },
    signup: function() {
      console.log('in the signupz');


    }

  });


  return Router;
});
