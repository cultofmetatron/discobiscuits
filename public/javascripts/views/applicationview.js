//the application view

define(['router', 'views/sidebarview'], function(router, SidebarView) {

  var ApplicationController = Backbone.View.extend({
    tagName: "div",
    _router : router,
    initialize  : function() {


    },
    events : {


    },
    router : function() {
      return this._router;
    },
    navigate : function(route, opt) {
      var defaults = {
        trigger : true // this is set so that navigation by default triggers the popstate event!
      };
      opt = opt || {};
      opt = _.defaults(opt, defaults);
      this._router.navigate(route, opt);
    },

    render : function() {
      this.$el.addClass('row');
      return this.$el.html(this.renderSideBar());
    },

    renderSideBar : function() {
      var sidebarView = new SidebarView({});
      return sidebarView.render();
    },

    renderMain: function() {

    }

  });

  return ApplicationController;
});


