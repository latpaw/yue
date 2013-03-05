// Filename: store/vew/home.js
define(['jquery', 'underscore', 'backbone','text!modules/home/homeView.html'], 
function($, _, Backbone, homeViewTemplate){

  var mainHomeView = Backbone.View.extend({
    template:_.template(homeViewTemplate),
    bodyEL: $('body'),

    render: function(){
      console.log("will render");
      $(this.el).append(this.template());
      return this;
    }
  });
  return mainHomeView;
});