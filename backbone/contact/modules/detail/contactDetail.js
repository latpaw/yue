// Filename: store/vew/list.js
define(['jquery', 'underscore', 'backbone','text!modules/detail/contactDetailView.html'],
       function ($, _, Backbone, detailViewTemplate) {
  'use strict';

  var detailView = Backbone.View.extend({
    
    template: _.template(detailViewTemplate),

    initialize: function(){
        this.model.bind('fetchCompleted:ContactDetail',this.render,this);
    },
    
    render: function(){
      console.log("model=" + this.model.toJSON());
      $(this.el).append(this.template(this.model.toJSON()));
      this.trigger("renderCompleted:ContactDetail",this,"test parameter");
      return this;
    }


  });
  
  return detailView;
});