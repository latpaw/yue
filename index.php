<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title></title>
<script type="text/javascript" src="jquery-1.8.3.js"></script>
<script type="text/javascript" src="underscore.js"></script>
<script type="text/javascript" src="backbonerisk.js"></script>
</head>
<body>
<input type="text" id="pp" />
<input type="button" value="submit" id="sub" />
<ul>
</ul>

<script type="text/javascript">

var app = Backbone.View.extend({
	tagName:'h3',
		render:function(){
			$(this.el).html('hello world');
			return this;
}
})

$('body').append(new app().render().el)











var Man = Backbone.Model.extend({name:"this is name"})
Manlist = Backbone.Collection.extend({model:Man})
Mans = new Manlist();
var ManView = Backbone.View.extend({tagName:'li',
	events:{},
	//temp: this.model,
	render:function(){
		console.log(this.model)
      $(this.el).html(this.temp)
		  return this;
    }
})
	new ManView().render();
var Appview = Backbone.View.extend({
	el:$("#sub"),
    events: {"click":"one",},
	initialize:function(){
},
	one:function(){
manview = new ManView().render().el;$(manview).html($("#pp").val());
		$("ul").append(manview)
    },
	render:function(){
		//console.log(this.model)
}
})

window.app=new Appview()
</script>




</body>
</html>
