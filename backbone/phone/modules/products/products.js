define(['jquery', 'underscore', 'backbone','text!modules/products/products.html'], 
function($, _, Backbone, productT){

  var productList = Backbone.View.extend({

    template: _.template(productT),
    initialize:function(){
      console.log("new view")
      this.model.bind("fetched:productList",this.render,this);
    },
    render: function(){
      console.log("list render");
      $(this.el).append(this.template(this.model.toJSON()));
      this.trigger("rendered:productList")
      return this;
    }
  });
  return productList;
});