define(function(require,exports, module) {
	var $util = require("./common/util");
	
	if(!$util.cookie("first_boot_" + G.groupOpenID)){
		//$(".boot_box_new").show();
		//$(".bg").show();
		$util.cookie("first_boot_" + G.groupOpenID, "open", {
			expires: 365,
			path:"/qqun/main.do"
		});
	}
	
	var groupViewController = require("./view/qqgroup/groupViewController");
	groupViewController.init();
});