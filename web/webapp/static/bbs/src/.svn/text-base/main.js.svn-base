define(function(require,exports, module) {
	//var $ = require('jquery');
	var slView = require('./subjectListView');
	var clView = require('./commentListView');
	var util   = require('./util');
	var scView = require("./subjectCreateView");
	var mlView = require("./messageListView");
			
	function init(type){
		if(type == "subject_list"){
			slView.init(clView, scView);		
		}else if(type == "comment_list"){
			if(location.href.indexOf("uuid") > 0){
				clView.init(true);
				var uuid = util.getURLParameter("uuid");
				clView.render(uuid);
			}else{
				clView.init(false);
				var tid = util.getURLParameter("tid");
				clView.render(tid);
			}
		}else if(type == "subject_create"){
			scView.init();
		}else if(type == "message_list"){
			mlView.init();
		}
	}
	
	module.exports = {
		init:init
	};
	//enable css active
	document.addEventListener("touchstart", function() {},false);
});