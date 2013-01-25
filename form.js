   var exsit //the @ symbol mark
   var email =document.getElementById("email");
   // var outer =document.getElementById("outer");
   email.onfocus = function(){
     if(email.value.length == email.value.indexOf("@")+1 && email.value.length!=0){
      newul(email.value)
     }

   	window.onkeyup=function(e){
         var content = email.value || ""
var p = document.getElementById("emailp")
         if(content.indexOf("@")>0 && exsit == "false"){ // when type in @
          console.log("yes")
          newul(content)
          liclick(email)
          exsit = "true"
       }
       if(content.indexOf("@")<0){ // delete to @ and more
         console.log("no")
         exsit = "false"
         if(p){p.parentNode.removeChild(p)}
         }
         // console.log(e.keyCode)
         if(e.keyCode=="40"){// down key
           var li = document.getElementById("active")
           if(li && li.nextSibling && li.nextSibling.nodeName.toLowerCase() == "li"){
            li.removeAttribute("id")
            var active = li.nextSibling
            active.id="active"
            email.value=active.innerHTML
         }
      }
      if(e.keyCode=="38"){// up key
        var li = document.getElementById("active")
        if(li && li.previousSibling && li.previousSibling.nodeName.toLowerCase() =="li"){
           li.removeAttribute("id")
           var active = li.previousSibling
           active.id="active"
           email.value=active.innerHTML
        }
     }
     if(e.keyCode=="13"){ //enter key
      p.parentNode.removeChild(p)
   }

}
}
// email.onblur=function(){
//   var p = document.getElementById("emailp")
//   if(p){
//   p.parentNode.removeChild(p)}
// }

var newul = function(content){// build the p and ul for new options and set the first li with id "active"
   var p = document.createElement("p")
   p.id="emailp"
   var ul = document.createElement("ul")
   ul.innerHTML="<li class='dropdown' id='active'>"+content+"gmail.com</li>"
   ul.innerHTML+="<li class='dropdown'>"+content+"yahoo.com</li>"
   ul.innerHTML+="<li class='dropdown'>"+content+"hotmail.com</li>"

   p.appendChild(ul)
   insertAfter(p,email)
   ul.style.width=email.style.width
   ul.style.border="1px #aaa solid"
   ul.firstChild.style.id="active"
}

var liclick = function(email){ // when click on the li
   var lis = document.getElementsByClassName("dropdown")
   for(i=0;i<=lis.length-1;i++){
      lis[i].onclick=function(){
         email.value = this.innerHTML
         var p = document.getElementById("emailp")
         p.parentNode.removeChild(p)
      }
      lis[i].onmouseover=function(e){document.getElementById("active").removeAttribute("id");this.id="active";}

   }
}
function insertAfter(newEl, targetEl){
   var parentEl = targetEl.parentNode;
   if(parentEl.lastChild == targetEl){
     parentEl.appendChild(newEl);
  }else{
     parentEl.insertBefore(newEl,targetEl.nextSibling);
  }            
}