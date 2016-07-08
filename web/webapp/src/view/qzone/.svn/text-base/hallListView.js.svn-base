/*
**	calendarHallView	日历广场
*/
define(function(require, exports, module) {	
	var $util = require("../../common/util");
	var $calendar = require("../../server/calendar");
	var $fusion = require("../../server/fusion");
	var $shareView = require("../common/shareView");
	
	var self = {};
	module.exports = self;
	self.container = $(".calendar_hall_list");
	
	self.templateItem = "<li class='hall_item'><div class='e_clear'>" +
							"<div class='hall_item_right ui-corner-all-5'><div class='img_shadow hall_item_image'><div class='img_div'><img src='{background_img}' /></div></div></div>" +
							"<div class='hall_item_left'><h3>{title}</h3><div>{desc}</div>"+
								"<div class='hall_item_button'><a href='javascript:;' class='hall_share' cid='{id}' pic='{background_img}'>分享</a><a href='javascript:;' class='hall_subscribe {subscribe_class}' cid='{id}'>{subscribe_text}</a></div>" +
							"</div>" +
						"</div></li>";
	function init(event){
		self.hallItemClick = event;
	}
	
	function render(data){
		self.container.empty();
		for(var i in data){
			var calendar = data[i];
			var li = $($util.format(self.templateItem, calendar));
			self.container.append(li);
			(function(c){
				li.click(function(){
					self.hallItemClick(c);
				});	
			})(calendar);
		}
		
		self.container.find(".hall_subscribe").click(function(e){
			e.stopPropagation();
			var $elem = $(this);
			var cid = $elem.attr("cid");
			if($elem.hasClass("on")){
				$calendar.unsubscribe(cid, function(){
					$elem.removeClass("on");
					$elem.html("收藏");
				});
			}else{
				$calendar.subscribePublicCalendar(cid, function(){
					$elem.addClass("on");
					$elem.html("已收藏");
				});				
			}
		});
		self.container.find(".hall_share").click(function(e){
			e.stopPropagation();
			var cid = $(this).attr("cid");
			var pic = $(this).attr("pic");
			$shareView.shareCalendar(cid, "", pic);
		});
		$fusion.resize();
	}
	
	//exports method
	self.init   = init;
	self.render = render;
});
