//the big login button that tells people to login with their dropbox
define(
  ['text!templates/source/big-login.hbs', 'handlebars', 'backbone'],
  function(loginSource) {

  var BigLoginView = Backbone.View.extend({
    tagName: 'div',
    template: Handlebars.compile(loginSource),
    initialize: function() {


    },

    events: {
      'submit form' : 'login'

    },

    login: function(event){
      event.preventDefault();
      console.log('login registered');

    },

    render: function() {
      this.$el.addClass('span9');
      return this.$el.html(this.template());
    }




  });

  return BigLoginView;

});
