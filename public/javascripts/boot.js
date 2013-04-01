requirejs.config({
  paths: {
    jquery     : '/javascripts/lib/jquery-19',
    underscore : 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js',
    backbone   : 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
    text       : '/javascripts/lib/text',
  },
  //shims make dependences load in the correct order
  shim: {
    backbone : ['jquery', 'underscore'],
    application: ['backbone']
  }

});

define(['application'], function(app) {


})


