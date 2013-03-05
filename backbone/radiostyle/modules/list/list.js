// Filename: store/vew/list.js
define(['jquery', 'underscore', 'backbone','text!modules/list/listView.html'], 
function($, _, Backbone, listViewTemplate){

  var listView = Backbone.View.extend({

    template: _.template(listViewTemplate),
    render: function(){
      console.log("list render");
      $(this.el).append(this.template());
      return this;
    }
  });
  return listView;
});