define(['jquery', 'underscore', 'backbone','modules/home/home','modules/home/about','modules/home/contact','modules/home/inquiry','modules/products/products','modules/solutions/solutions','modules/solutions/soluDetail','modules/products/proDetail','../model/proModel','../model/proListModel'/*,'jqm'*/], 
	function($, _, Backbone,home,about,contact,inquiry,products,solutions,soluDetail,proDetail,proModel,proListModel) {

    'use strict';
    var Router = Backbone.Router.extend({
       /*
         routes设定了应用的路由，用户点击链接后指向不同的hash，
         则Backbone会根据routes的设定执行对应的方法
       */
        routes: {
        	'':    'showHome',           //home view
        	'home': 'showHome', 
        	'about': 'aboutUs',
        	'contact': 'contactUs',  
        	'inquiry': 'inquiry',
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

	    aboutUs: function(actions){
	    	this.changePage(new about());
	    },
	    inquiry:function(actions){
	    	this.changePage(new inquiry());
	    },
	    contactUs:function(actions){
	    	this.changePage(new contact());
	    },

	    productList:function(actions){
	    	var prolistmodel = new proListModel()
	    	var productlist = new products({model:prolistmodel})
            productlist.bind('rendered:productList',this.changePage(productlist),this)
            prolistmodel.fetch()
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
			  
           console.log(window.location.href);
                //插入dom
                $(page.el)[0].id="body"
                var contentpart = $("<div>")
                $(contentpart).attr("id","products")
      		$('body').append(contentpart);
      		contentpart.append($(page.el));
      		// console.log($(page.el))

      		$('#body').prepend('<header>    <p id="toptop"></p>    <div id="logo_search">        <p id="search"><img src="css/images/wap_05.png" alt=""><input type="text" placeholder="Search"></p>        <img src="css/images/wap_03.png" alt="" id="logo">    </div></header>');
            
      		// console.log($(page.el)[0])
      		if(!document.getElementById("foot")){
      			$('body').append('<div id="foot" style="position:fixed;bottom:0;width:100%">   <p id="slideup"><img src="css/images/wap_38.png" alt=""></p>    <div id="hidden_parts">        <ul>            <li id="list_home"><img src="css/images/wap_42.png" alt="">Home</li>             <li><img src="css/images/wap_45.png" alt="">List</li>            <li><img src="css/images/wap_47.png" alt="">Inquiry</li>            <li><img src="css/images/wap_49.png" alt="">Chat Online</li>            <li><img src="css/images/wap_51.png" alt="">Email</li>        </ul>        <div class="clear"></div>    </div></div>')  
				window.localStorage.setItem("new","no")
				var height = $("#hidden_parts").height()+"px"
				var _hide;
				var hide =function(){ 
				    _hide = window.setTimeout(function(){
					$("#foot").stop().animate({"bottom":"-"+height})
					},5000);
					
				}
				$(document).ready(hide)
				$("#slideup>img").click(function(e){
					if(e.target && e.target.nodeName!="A"){
					 $("#foot").stop().animate({"bottom":"0px"});
					 hide();
				    }
				});

				$("#foot").hover(function(_hide){
					window.clearTimeout(_hide)
				},function(){hide()})
			}
		
	    } 
    });

    return Router;
});