requirejs.config({
  paths: {
    jquery              : '/javascripts/lib/jquery-19',
    underscore          : 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    backbone            : 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
    backbone_relational : 'http://cdnjs.cloudflare.com/ajax/libs/backbone-relational/0.7.0/backbone-relational.min',
    handlebars          : 'http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.min',
    text                : '/javascripts/lib/text',
    filepicker          : 'http://api.filepicker.io/v1/filepicker',
    bootstrap           : '/javascripts/lib/bootstrap',
    templates           : '/templates'
  },
  //shims make dependences load in the correct order
  shim: {
    backbone            : ['jquery', 'underscore'],
    bootstrap           : ['jquery'],
    backbone_relational : ['backbone'],
    application         : ['bootstrap', 'backbone_relational', 'jquery']
  }

});

define(['application'], function(app) {
  $(document).ready(app.init);

});


