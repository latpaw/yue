define(['jquery', 'underscore', 'backbone','text!modules/home/aboutUs.html'], 
function($, _, Backbone, aboutTpl){

  var abouttpl = Backbone.View.extend({
    template:_.template(aboutTpl),
    bodyEL: $('body'),
initialize: function(){
        this.render()
    },
    render: function(){
      console.log("will render");
      $(this.el).append(this.template());
      return this;
    }
  });
  return abouttpl;
});