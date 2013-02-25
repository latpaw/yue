   var exsit //the @ symbol mark
   var email =byid("email");
   // var outer =byid("outer");



   email.onfocus = function(){
     if(email.value.length == email.value.indexOf("@")+1 && email.value.length!=0){
      newul(email.value)
     } // when the last letter is @

   	window.onkeyup=function(e){
         var content = email.value || ""
         var p = byid("emailp")
         var li = byid("active")
         if(content.indexOf("@")>0 && exsit == "false"){ // when type in @
          console.log("yes")
          newul(content)
          liclick(email)
          exsit = "true"
       }
       if(email.value.length - content.indexOf("@")==2 && e.keyCode!="71"&&e.keyCode!="72"&&e.keyCode!="89"&&e.keyCode!="38"&&e.keyCode!="40"){
        if(p){p.parentNode.removeChild(p)}
          console.log(email.value.length - content.indexOf("@"))
       }
       if(content.indexOf("@")<0){ // delete to @ and more
         console.log("no")
         exsit = "false"
         if(p){p.parentNode.removeChild(p)}
         }
         // console.log(e.keyCode)
         if(e.keyCode=="40"){// down key
           if(li && li.nextSibling && li.nextSibling.nodeName.toLowerCase() == "li"){
            li.removeAttribute("id")
            var active = li.nextSibling
            active.id="active"
            email.value=active.innerHTML
         }
      }
      if(e.keyCode=="38"){// up key
        if(li && li.previousSibling && li.previousSibling.nodeName.toLowerCase() =="li"){
           li.removeAttribute("id")
           var active = li.previousSibling
           active.id="active"
           email.value=active.innerHTML
        }
     }
     if(e.keyCode=="13"){ //enter key
      if(li){email.value=li.innerHTML}
      p.parentNode.removeChild(p)
   }

}
}
// email.onblur=function(){
//   var p = byid("emailp")
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
         var p = byid("emailp")
         p.parentNode.removeChild(p)
      }
      lis[i].onmouseover=function(e){byid("active").removeAttribute("id");this.id="active";}

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


/////////////////////////////////////////////////////////////////////////////////////////////////



{ /////////////////////////////////auto set country
  function auto_country(countryname){
    byid("country").innerHTML='<option value="'+countryname+'">'+countryname+'</option>'
       byid("country").value=countryname
       if(navigator.appVersion.indexOf("MSIE") >=0){
        var cout = byid("country_out")
        cout.innerHTML= 'country: <select id="country" name="country" disabled >'+'<option value="'+countryname+'">'+countryname+'</option>'+'</select><b id="not">Not</b>'
        var no = byid("not")
        no.onclick= function(){
          notclick()
        }
       }
  }
  var script = document.createElement("script")
  script.type="text/javascript"
  script.src= path+"geoip/geo.php?callback=auto_country"
  document.getElementsByTagName("head")[0].appendChild(script)
 }///////////////////////////////////
 
 { /////////////////////////////////// set options when wrong pick
  function setoptions(options){
    var options = options.split(","),
        c = byid("country"),
        n = "";
       for(i in options){
        var trim_option = options[i].replace('"','').replace('"','')
       n += '<option value="'+trim_option+'">'+trim_option+'</option>'}
       c.innerHTML = n
       if(navigator.appVersion.indexOf("MSIE") >=0){
        var cout = byid("country_out")
        cout.innerHTML= 'country: <select id="country" name="country">'+n+'</select>'
       }
  }

  var not = byid("not")
  not.onclick= notclick
  function notclick(){
  byid("country").removeAttribute("disabled")
  var script2 = document.createElement("script")
  script2.type="text/javascript"
  script2.src= path + "geoip/countries.php?callback=setoptions"
  document.getElementsByTagName("head")[0].appendChild(script2)
  if(navigator.appVersion.indexOf("MSIE") <0){
  not.parentNode.removeChild(not)}

  }
 } ///////////////////////////////

var submit = byid("submit")
submit.onclick=function(ev){

    var textarea = byid("textarea")
    var message = textarea.value + interested()
    if(message==" "){textarea.style.display="block";setHeight();textarea.focus();return false;} //感兴趣的产品和inquiry必须填一个

 var xrequest =function(){
 if(this.XMLHttpRequest){
   return new XMLHttpRequest(); 
 }else{
   return new ActiveXObject("Microsoft.XMLHTTP");
 }
}
 var xhr = xrequest();
var url = path + "recieve.php"
var params = "name="+byid("name").value+"&email="+byid("email").value+"&country="+byid("country").value+"&phone="+byid("phone").value+"&company="+byid("company").value+"&visits="+byid("visits").value+"&content="+message
xhr.open("POST",url,true)
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset:UTF-8")
xhr.onreadystatechange =  function(){
  if(xhr.readyState == 4 && xhr.status == 200){
    var b = xhr.responseText
    // console.log(b)
    // byid("result").innerHTML = b

    if(b){// build the mask for form to show the message from server
      var mask = document.createElement("div")
      mask.id="mask"
      mask.innerHTML="<p id='maskp'>"+b+"</p>"
      byid("form").appendChild(mask)
    }
  }
}
xhr.send(params)
}
