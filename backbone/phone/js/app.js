/* We define a global variable 'namespace' as module manager*/

/* start application*/
define(['jquery','underscore', 'backbone', 'router','jqmconfig'], 
	function($, _, Backbone, Router) {

	'use strict';

	var init=function(){
		var router=new Router();
		Backbone.history.start();
	};

    return{
	    initialize:init
    }
});