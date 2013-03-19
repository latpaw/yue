define(['jquery', 'underscore', 'backbone','text!modules/solutions/solutions.html'], 
function($, _, Backbone, productT){

  var productList = Backbone.View.extend({

    template: _.template(productT),
    initialize:function(){
      console.log("new view")
      this.model.bind("fetched:solutionList",this.render,this);
    },
    render: function(){
      console.log("list render");
      $(this.el).append(this.template(this.model.toJSON()));
      this.trigger("rendered:solutionList")
      return this;
    }
  });
  return productList;
});