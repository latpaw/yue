define(['jquery', 'underscore', 'backbone','modules/home/home','modules/products/products','modules/solutions/solutions','modules/solutions/soluDetail','modules/products/proDetail','../model/proModel','jqm'], 
	function($, _, Backbone,home,solutions,products,soluDetail,proDetail,proModel) {

    'use strict';
    var Router = Backbone.Router.extend({
       /*
         routes设定了应用的路由，用户点击链接后指向不同的hash，
         则Backbone会根据routes的设定执行对应的方法
       */
        routes: {
        	'':    'showHome',           //home view
        	'home': 'showHome',         //home view as well
	        'products/:id': 'showProduct',
	        'products': 'productList',
	        'solutions': 'solutionList',
	        'solutions/:id': 'showSolution',
	        '*actions': 'defaultAction' //default action
        },
	    
	    firstPage:true,

	    initialize:function () {
			console.log("setup router");
	    },

	    defaultAction: function(actions){

	    },

	    productList:function(actions){
          this.changePage(new products(),true)
	    },
	    solutionList:function(actions){
           this.changePage(new solutions())
	    },
	    showProduct:function(id){
	    	var promodel = new proModel()
	    	var prodetail = new proDetail({model:promodel})
	    	prodetail.bind('rendered:proDetail',this.changePage(prodetail),this);
	    	promodel.fetch(id);
	    	
           // this.changePage(prodetail,true)
	    },
	    showSolution:function(actions){

	    },

	    showHome:function(actions){
	    	this.changePage(new home());
	    },


            /*
             changePage调用每个view模块的render方法来生成template内容，然后插入到dom中。最后调用
            */
	    changePage:function (page,mark) {
		 //render方法通过template生成page
		 if(mark){page.render();}
                //设定外层div容器的data-role为'page'，以支持jquery mobile
			$(page.el).attr('data-role', 'page');   
                //插入dom
      		$('body').append($(page.el));  
			var transition = $.mobile.defaultPageTransition;  
                /*
                 如果不是第一个页面，那么调用enhance JQuery Mobile page,
                 并且执行transition动画。
                 如果是第一个页面，那么无需changePage。否则会出错。                
                */
			if(!this.firstPage){   
				$.mobile.changePage($(page.el), {changeHash:false, transition: transition});
			}else{   
				this.firstPage = false;
			}
	     } 
    });

    return Router;
});