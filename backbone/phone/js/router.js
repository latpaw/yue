define(['jquery', 'underscore', 'backbone','modules/home/home','modules/products/products','modules/solutions/solutions','modules/solutions/soluDetail','modules/products/proDetail','../model/proModel'/*,'jqm'*/], 
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
           if(window.localStorage.getItem("new")=="no"){
           	var width = window.innerWidth+"px"
			$(page.el).css({"position":"absolute","left":width}).animate({"left":"0"},500); 
			$(page.el).delegate("a","click",function(e){
				$(page.el).animate({"left":"-"+width},500,function(){$(this).remove()})
			})
		   }
			  
           // console.log($(page.el));
                //插入dom
      		$('body').append($(page.el));
      		if(!document.getElementById("foot")){
      			$('body').append('<footer style="position:fixed" id="foot"><section><p><a href="">Home</a> <a href="">Navigate</a> <a href="">Inquiry</a> <a href="">Contact</a></p><script type="text/javascript">$("#foot").css({"bottom":"10px","background":"#fff","z-index":"1000"});</script></section></footer>')  
				window.localStorage.setItem("new","no")
				var _hide;
				var hide =function(){ 
				    _hide = window.setTimeout(function(){
					$("#foot").animate({"bottom":"-40px"})
					},2000);
					return _hide;
				}
				hide()
				document.onclick=function(e){
					if(e.target && e.target.nodeName!="A"){
					 $("#foot").animate({"bottom":"10px"});
					 hide();
				    }
				}

				$("#foot").hover(function(){
					window.clearTimeout(_hide)
				},function(){hide()})
			}
	     } 
    });

    return Router;
});