//the application view

define(['views/sidebarview'], function(SidebarView) {

  var ApplicationController = Backbone.View.extend({
    tagName: "div",
    initialize  : function() {


    },
    events : {


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


