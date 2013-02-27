//latpaw custom js frame and comman js snippets
(function(){

window.byid = function(id){return document.getElementById(id)}



function insertAfter(newEl, targetEl){ //insert after function
   var parentEl = targetEl.parentNode;
   if(parentEl.lastChild == targetEl){
     parentEl.appendChild(newEl);
  }else{
     parentEl.insertBefore(newEl,targetEl.nextSibling);
  }            
}


function cookie2obj(){
	var c = document.cookie.split(";")
	var obj={};
	for(i in c){
		_c = c[i].split("=")
		key = _c[0]//.trim()
        val = _c[1]
        obj[key] = val
	}
	return obj
}

})()
