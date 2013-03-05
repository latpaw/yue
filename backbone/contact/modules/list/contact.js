// Filename: store/vew/list.js
define(['jquery', 'underscore', 'backbone', 'text!modules/list/contactView.html'],
       function ($, _, Backbone, listViewTemplate) {
  'use strict';

  var listView = Backbone.View.extend({
    
    template: _.template(listViewTemplate),

    initialize: function(){
        this.collection.bind('fetchCompleted:Contacts',this.render,this);
    },
    
    render: function(){
      $(this.el).append(this.template({data:this.collection.toJSON()}));
      this.trigger("renderCompleted:Contacts",this,"test parameter");
      return this;
    }
  });
  
  return listView;
});