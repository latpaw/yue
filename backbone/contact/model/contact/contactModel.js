define(function(){

	var Contact=Backbone.Model.extend({

		defaults:{
			id:"",
			name:'',
			img:'img/anonymous.png',
			desc:'',
			programs:[]
		},

		fetch:function(id){
            var self=this;
            var tmpContact;
            var jqxhr = $.getJSON("data/" + id + ".json")
              .success(function(data, status, xhr) { 
                self.set({id:data.id,img:data.img,name:data.name,desc:data.desc,programs:data.programs});
                self.trigger("fetchCompleted:ContactDetail");
              })
              .error(function() { alert("error"); })
              .complete(function() {
                    console.log("fetch complete + " + this);
              });
          }
	});

	return Contact;
});