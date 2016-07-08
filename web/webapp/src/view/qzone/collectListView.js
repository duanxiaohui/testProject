/*
**	collectListView
*/
define(function(require, exports, module) {
	var $util  = require('../../common/util');
	var self = {};
	module.exports = self;
	
	self.container = $(".calendar_collect_list");
	self.templateItem = "<li class='collect_list_item {selected}' cid={id} title='{title}'><span>{title}</span></li>";
	
	function init(event){
		self.listClick = event;
	}
	
	function render(data){
		var li_list = $util.format(self.templateItem, data);
		self.container.html(li_list);
		if(self.container.find("li").size() > 15){
			$("div.calendar_collect_scrollpane").jScrollPane();
		}
		self.container.find(".collect_list_item").click(function(){
			if($(this).hasClass("on")){
				return;
			}
			self.container.find(".on").removeClass("on");
			$(this).addClass("on");
			
			var cid = $(this).attr("cid");
			self.listClick(cid);
		});
	}
	
	function removeCurrent(){
		self.container.find(".on").remove();
		self.container.find(".collect_list_item").eq(0).click();
	}
	//exports method
	self.init = init;
	self.render = render;
	self.removeCurrent = removeCurrent;
});
