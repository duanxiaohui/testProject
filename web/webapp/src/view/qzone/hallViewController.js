/*
**	calendarHallView	日历广场
*/
define(function(require, exports, module) {	
	var $hallCategoryView = require("./hallCategoryView");
	var $hallListView = require("./hallListView");
	var $hallPanelView = require("./hallPanelView");
	var $calendar = require("../../server/calendar");
	var $fusion = require("../../server/fusion");
	var self = {};
	module.exports = self;
	
	function init(container){
		self.container = container;
		$hallCategoryView.init(onCategoryChanged);
		$hallListView.init(onListItemClicked);
		$hallPanelView.init();
		renderCategory();
	}
	
	function renderCategory(){
		$calendar.getCalendarCategory(function(data){
			$.each(data.category, function(i, o){
				if(o.id == data.active_category_id){
					o.selected = "on";
				}
				//remove 工具
				if(o.title == "工具"){
					data.category.splice(i, 1);
				}
			});
			$hallCategoryView.render(data.category);
			$hallListView.render(packageCalendar(data.active_calendars));
		});
	}
	
	function renderList(id){
		show("list");
		$calendar.getCalendarCategoryById(id, function(data){
			$hallListView.render(packageCalendar(data.active_calendars));			
		});
	}
	
	function packageCalendar(calendars){
		return $.map(calendars, function(o, i){
			if(o.is_subscribed == 0){
				o.subscribe_class = "";
				o.subscribe_text  = "收藏";
			}else{
				o.subscribe_class = "on";
				o.subscribe_text  = "已收藏";
			}
			return o;
		});
	}

	
	
	function onCategoryChanged(id){
		renderList(id);
	}
	function onListItemClicked(calendar){
		show("panel");
		$hallPanelView.render(calendar);
	}
	
	function show(container){
		if(container == "list"){
			$hallListView.container.show();
			$hallPanelView.container.hide();
		}else{
			$hallListView.container.hide();
			$hallPanelView.container.show();
		}
		$fusion.resize();
	}
	//exports method
	self.init = init;
	self.show = show;
});
