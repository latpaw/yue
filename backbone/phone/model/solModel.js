define(function(){
var proModel = Backbone.Model.extend({
// defaults:{name:"name",tt:"tt"},
     fetch:function(id){
       var self=this;
            var tmpContact;
            var jqxhr = $.getJSON("data/solutions/" + id + ".json")
              .success(function(data, status, xhr) { 
                self.set({
                  solution:data,
                  img:id
                });
                self.trigger("fetched:solDetail");
              })
              .error(function() { alert("error"); })
              .complete(function() {
                    console.log("fetch complete + " + this);
              });
          }
});
return proModel
});