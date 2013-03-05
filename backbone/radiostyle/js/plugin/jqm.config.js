// Filename: store/vew/home.js
define(['jquery'], function($){
  'use strict';
		console.log("bind configure jqm");
		document.firstPage=true;
	  	$(document).bind("mobileinit", function () {
			console.log("configure jqm");
			$.mobile.ajaxEnabled = false;
			$.mobile.linkBindingEnabled = false;
			$.mobile.hashListeningEnabled = false;
			$.mobile.pushStateEnabled = false;

			$.mobile.defaultPageTransition='slide';
			// Remove page from DOM when it's being replaced
			$('div[data-role="page"]').live('pagehide', function (event, ui) {
				$(event.currentTarget).remove();
			});
		});


	/* For Test*/

	       $(document).live('pagebeforeload pageload pageloadfailed pagebeforechange pagechange pagechangefailed pagebeforeshow pagebeforehide pageshow pagehide pagebeforecreate pagecreate pageinit pageremove', function (event,ui){
				console.log('--------' + event.type);
			});

});

