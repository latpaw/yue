define(['jquery', 'underscore', 'backbone','text!modules/home/inquiry.html'], 
function($, _, Backbone, Tpl){

  var tpl = Backbone.View.extend({
    template:_.template(Tpl),
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
  return tpl;
});