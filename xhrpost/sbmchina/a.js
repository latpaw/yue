   var email =byid("email");

   email.onfocus = function(){ ///////////////email set, blah blah
     if(email.value.length == email.value.indexOf("@")+1 && email.value.length!=0){
      newul(email.value)
     } // when the last letter is @

     email.onkeyup=function(e){
         var content = email.value || ""
         var p = byid("emailp")
        if(content.indexOf("@")>0 && e.keyCode!="40" && e.keyCode!="38"){ // when type in @
          newul(content)
          liclick(email)
        }

        if(content.indexOf("@")<0){ // delete to @ and more
         if(p){p.parentNode.removeChild(p)}
       }

        if(e.keyCode=="40"){// down key
          var li = byid("active")
          if(li && li.nextSibling && li.nextSibling.nodeName.toLowerCase() == "li"){
            li.removeAttribute("id")
            var active = li.nextSibling
            active.id="active"
          }
        }
        if(e.keyCode=="38"){// up key
          var li = byid("active")
          if(li && li.previousSibling && li.previousSibling.nodeName.toLowerCase() =="li"){
           li.removeAttribute("id")
           var active = li.previousSibling
           active.id="active"
         }
       }
       if(e.keyCode=="13"){ //enter key
        var li = byid("active")
        if(li){email.value=li.innerHTML}
          if(p) p.parentNode.removeChild(p);
      }
      var ul = byid("emailist")
      if(ul && ul.innerHTML=="" && p){
        p.parentNode.removeChild(p)
      }

    }
  }

var newul = function(content){// build the p and ul for new options and set the first li with id "active"
  var all = ["gmail.com","yahoo.com","hotmail.com"]
  var split_content = content.split("@")
  var reg = new RegExp("^"+(split_content[1] || ""))

  if(!document.getElementById("emailp")&&reg.test(all.toString())){
   var p = document.createElement("p")
   p.id="emailp"
   var ul = document.createElement("ul")
   ul.id="emailist"
   p.appendChild(ul)
   insertAfter(p,email)
   ul.style.width=email.style.width
   ul.style.border="1px #aaa solid"
  }else{
   ul= byid("emailist")
  }

  if(ul){
    ul.innerHTML=""
    for(i in all){
      if(reg.test(all[i])){
        ul.innerHTML+= "<li class='dropdown'>"+split_content[0]+"@"+all[i]+"</li>"
      }
    }
    if(ul.firstChild){
      ul.firstChild.id="active"
    }
  }
}

var liclick = function(email){ // when click on the li
  if(byid("emailist")){
   var lis = byid("emailist").childNodes
    for(i=0;i<=lis.length-1;i++){
      lis[i].onclick=function(){
       email.value = this.innerHTML
       var p = byid("emailp")
       p.parentNode.removeChild(p)
      }
      lis[i].onmouseover=function(e){byid("active").removeAttribute("id");this.id="active";}
    }
  }
}

function insertAfter(newEl, targetEl){ //insert after function
   var parentEl = targetEl.parentNode;
   if(parentEl.lastChild == targetEl){
     parentEl.appendChild(newEl);
   }else{
     parentEl.insertBefore(newEl,targetEl.nextSibling);
   }            
}

{ /////////////////////////////////auto set country
  
  function auto_country(countryname){
    window.localStorage.setItem("country",countryname);
    byid("country").value=countryname;
  }
  var country = window.localStorage.getItem("country");
  if(!!country){
    byid("country").value=country;
  }else{
    var script = document.createElement("script")
    script.type="text/javascript"
    script.src= path+"geoip/geo.php?callback=auto_country"
    document.getElementsByTagName("head")[0].appendChild(script)
  }
}///////////////////////////////////