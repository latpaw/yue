define(function(){
var proModel = Backbone.Model.extend({
// defaults:{name:"name",tt:"tt"},
     fetch:function(id){
       var self=this;
            var tmpContact;
            var jqxhr = $.getJSON("data/products/" + id + ".json")
              .success(function(data, status, xhr) { 
                self.set({
                  product:data
                });
                self.trigger("fetched:proDetail");
              })
              .error(function() { alert("error"); })
              .complete(function() {
                    console.log("fetch complete + " + this);
              });
          }
});
return proModel
});