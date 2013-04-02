define(

    ['backbone' , 'router', 'views/sidebarview'],

function(backbone, router, SidebarView) {

  var ApplicationController = Backbone.View.extend({
    tagName: "div",
    router : router,
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

  var initialize = function() {
    Backbone.history.start({pushState:true});
    var app = new ApplicationController({});
    debugger
    app.router.navigate(getPath(), {trigger: true });
    $('div.entry-point').html(app.render());
  };


  var getPath = function() {
    var pathname = window.location.pathname
    if (pathname === '/') { return 'home' }
    else { return pathname };
  };

  return {
    init : initialize,
  };

});
