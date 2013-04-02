// the sidebar view

define(['text!templates/source/_sidebar.hbs', 'backbone' ,'handlebars'], function(sidebarSource) {

  var SidebarView = Backbone.View.extend({
    tagName : "div",
    template: Handlebars.compile(sidebarSource),

    initialize: function() {


    },
    render: function() {
      return this.template();
    }


  });

  return SidebarView;

});


