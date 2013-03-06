define(['jquery', 'underscore', 'backbone','text!modules/products/proDetail.html'],
       function ($, _, Backbone, proDetail) {
  'use strict';

  var detailView = Backbone.View.extend({
    
    template: _.template(proDetail),

    initialize: function(){
        this.model.bind('fetchCompleted:proDetail',this.render,this);
    },
    
    render: function(){
      // console.log("model=" + this.model.toJSON());
      $(this.el).append(this.template(this.model.toJSON()));
      // this.trigger("renderCompleted:ContactDetail",this,"test parameter");
      return this;
    }


  });
  
  return detailView;
});