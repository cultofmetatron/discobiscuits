//the big login button that tells people to login with their dropbox
define(
  ['text!templates/source/big-login.hbs', 'handlebars', 'backbone', 'jquery_form'],
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
      var self = this;
      $(event.target).ajaxSubmit({
        method: 'POST',
        success: function(data) {
          //did it return an error or a user?
          if (data.success === true) {
            //we got a success
            app.get('router').navigate('home', {trigger: true});
          } else {
            self.$el.find('span.notice').html(data.error).removeClass('hidden').fadeIn();
          }
        }
      });


    },

    render: function() {
      this.$el.addClass('span9');
      return this.$el.html(this.template());
    }




  });

  return BigLoginView;

});
