define(['jquery', 'underscore', 'backbone','modules/home/home','modules/list/contact',
			'model/contact/contactCollection','modules/detail/contactDetail','model/contact/contactModel','jqm'], 
	function($, _, Backbone,HomeView,ContactView,ContactCollection,ContactDetailView,Contact) {

    'use strict';
    var Router = Backbone.Router.extend({
       /*
         routes设定了应用的路由，用户点击链接后指向不同的hash，
         则Backbone会根据routes的设定执行对应的方法
       */
        routes: {
        	'':    'showHome',           //home view
        	'home': 'showHome',         //home view as well
	        'contact': 'showContact',         //list view
	        'contactdetail/:name/:id' : 'showContactDetail',   //detail view
	        '*actions': 'defaultAction' //default action
        },
	    
	    firstPage:true,

	    initialize:function () {
			console.log("setup router");
	    },

	    defaultAction: function(actions){

	    },

	    showHome:function(actions){
	    	var homeView=new HomeView();
	    	homeView.render();
	    	this.changePage(homeView);
	    },

	    showContact:function(actions){
	    	//first, we fetch data to initialize view
	    	var contactList=new ContactCollection();
	    	var contactView=new ContactView({collection:contactList});
	    	//need to pass this as context , so we can call "this.changePage(view) in triggerChangeView function"
	    	contactView.bind('renderCompleted:Contacts',this.triggerChangeView,this);
	    	contactList.fetch();
		    // this.changePage(new list());
	    },


	    showContactDetail:function(name,id){
	    	var contact=new Contact();
	    	var contactDetailView=new ContactDetailView({model:contact});
	    	contactDetailView.bind('renderCompleted:ContactDetail',this.triggerChangeView,this);
	    	contact.fetch(id);
	    },

	    //the parameter 'view' is transferred from trigger call
	    triggerChangeView:function(view,demoparm){
	    	this.changePage(view);
	    },
            /*
             changePage调用每个view模块的render方法来生成template内容，然后插入到dom中。最后调用
            */
	    changePage:function (view) {
	    	console.log("changePage" + view.el);
            //设定外层div容器的data-role为'page'，以支持jquery mobile
			$(view.el).attr('data-role', 'page');   
                //插入dom
      		$('body').append($(view.el));  
			var transition = $.mobile.defaultPageTransition;  
                /*
                 如果不是第一个页面，那么调用enhance JQuery Mobile page,
                 并且执行transition动画。
                 如果是第一个页面，那么无需changePage。否则会出错。                
                */
			if(!this.firstPage){   
				$.mobile.changePage($(view.el), {changeHash:false, transition: transition});
			}else{   
				this.firstPage = false;
			}
	     } 
    });

    return Router;
});