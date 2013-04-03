define(['text!templates/source/home.hbs', 'handlebars', 'backbone'], function(homeSource) {
// this is the index view.

  var HomeView = Backbone.View.extend({
    tagName: 'div',
    template: Handlebars.compile(homeSource),
    initialize: function() {
      console.log('in homeView');
    },
    render: function() {
      return this.template();
    }


  });


  return HomeView;
});
