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
      this.navigate(route, {trigger: true });
    },
    routes: {
      'home':'home'
    },
    home: function() {
      //the home screen


    }

  });


  return Router;
});
