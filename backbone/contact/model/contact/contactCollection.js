define(['jquery', 'underscore', 'backbone','model/contact/contactModel'],
       function ($, _, Backbone,Contact){

        var Contacts=Backbone.Collection.extend({
          model:Contact,

          fetch:function(){
            console.log("i will fetch");
            var self=this;
            var tmpContact;
            var jqxhr = $.getJSON("data/data.json")
              .success(function(data, status, xhr) { 
                console.log("success" + data);
                $.each(data, function(i,item){
                  tmpContact=new Contact({id:item.id,name:item.name});
                  self.add(tmpContact);
                });
                console.log("will trigger fetchComplete:Contact");
                self.trigger("fetchCompleted:Contacts");
              })
              .error(function() { alert("error"); })
              .complete(function() {
                    console.log("fetch complete + " + this);
              });
          }
  });

  return Contacts;
});