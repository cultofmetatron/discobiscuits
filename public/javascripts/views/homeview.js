define(['!text!templates/source/home.hbs', 'handlebars'], function(homeSource, Handlebars) {
// this is the index view.

  var HomeView = new Backbone.View.extend({
    tagName: 'div',
    template: function() {
      return Handlebars.compile(homeSource);
    },
    initialize: function() {
      console.log('in homeView');
    },
    render: function() {
      return this.$el;
    }


  });


  return HomeView;
});