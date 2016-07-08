/*
**	calendarHallView	日历广场
*/
define(function(require, exports, module) {	
	var $util = require("../../common/util");
	
	var self = {};
	module.exports = self;
	self.container = $(".calendar_hall_category");
	
	self.templateItem = "<li class='hall_category_item {selected}' cid={id}><span class='category_link'>{title}</span></li>";
	
	function init(changeEvent){
		self.change = changeEvent;
	}
	
	function render(data){
		var li_html = $util.format(self.templateItem, data);
		self.container.html(li_html);
		var li_list = self.container.find(".hall_category_item");
		li_list.click(function(){
			//if($(this).hasClass("on")){
			//	return;
			//}
			li_list.removeClass("on");
			$(this).addClass("on");
			var id = $(this).attr("cid");
			self.change(id);
		});
	}
	//exports method
	self.init   = init;
	self.render = render;
});
