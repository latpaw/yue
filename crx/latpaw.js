// (function(){
//    var td = document.getElementsByTagName("td")
//    var result = []
//    var num = 0

//    for(i in td){
//    	td[i].onclick=function(e){
//    		e.stopPropagation()
//    		// console.log(this)
//    		result.push(this.innerHTML)
//    	}
//    	td[i].ondblclick=function(e){
//    		e.stopPropagation()
//    		this.innerHTML="<?php e("+num+")?>"
//    		num = num +1
//    	}
//    }

//    window.onkeyup = function(e){
//    	if(e.keyCode=="83"){
//    		console.log(result)
//    	}
//    }

// })()


console.log("abs")
var table =document.querySelector(".dataintable")
var table2 = document.querySelector(".para_table")
/*table = table+table2*/
var td = table.querySelectorAll("td")
for(i in td){

	td[i].ondblclick=function(){
		var index = jQuery(this).parent().children().index(jQuery(this))
		jQuery(this).parent().siblings().each(function(){jQuery(this).children().eq(index).remove()})	
		jQuery(this).remove()
    }

}
var echo =function(){
	console.log(jQuery(".dataintable"))
}
