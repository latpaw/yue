// Filename: store/vew/list.js
define(['jquery', 'underscore', 'backbone','text!modules/products/products.html'], 
function($, _, Backbone, productT){

  var productView = Backbone.View.extend({

    template: _.template(productT),
    initialize:function(){this.render();},
    render: function(){
      console.log("list render");
      $(this.el).append(this.template());
      return this;
    }
  });
  return productView;
});