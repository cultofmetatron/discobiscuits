// this is the router system
define(['views/sidebarview', 'views/homeview', 'views/bigloginview', 'backbone'],
    function(SidebarView, HomeView, BigLoginView) {
  var Router = Backbone.Router.extend({

    init  : function(route, app) {
      this.model = app;
      //setting up the sidebar
      this.model.set('foo', "barrors");
      this.model.set('mainpanel', BigLoginView);
      $('div.sidebar').html(new SidebarView().render());
      this.navigate(route, {trigger: true});
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

    loadBigPanel: function(PanelView, context) {
      context = context || {};
      $('div.main').html(new PanelView(context).render());

    },

    home: function() {
      //the home screen
      this.loadBigPanel(HomeView);
      //this.navigate('login', {trigger: true});
    },

    login: function() {
      console.log('in the loginz');
      this.loadBigPanel(BigLoginView);
    },

    signup: function() {
      console.log('in the signupz');


    }

  });


  return Router;
});
