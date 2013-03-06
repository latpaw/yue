// Filename: store/vew/list.js
define(['jquery', 'underscore', 'backbone','text!modules/solutions/solutions.html'], 
function($, _, Backbone, solutionT){

  var solutionView = Backbone.View.extend({

    template: _.template(solutionT),
    render: function(){
      console.log("list render");
      $(this.el).append(this.template());
      return this;
    }
  });
  return solutionView;
});