define(function(){
var proModel = Backbone.Model.extend({

     fetch:function(id){
       var self=this;
            var tmpContact;
            var jqxhr = $.getJSON("data/" + id + ".json")
              .success(function(data, status, xhr) { 
                self.set({name:data.name});
                self.trigger("fetchCompleted:proDetail");
              })
              .error(function() { alert("error"); })
              .complete(function() {
                    console.log("fetch complete + " + this);
              });
          }
});
return proModel
});