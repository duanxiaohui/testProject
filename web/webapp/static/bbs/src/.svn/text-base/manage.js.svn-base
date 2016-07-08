/*
**	manage view
*/
define(function(require, exports, module) {
	//var $ = require('jquery');
	var $d = require('./data');
	var $util = require('./util');
	var $format = $util.format;

	var self = {};
	self.container = $(".subject_list_view");
	self.ulList    = $("#subject_list_ul");
	var pageNum = 0;
	
	function _initCalendar(calendar){
		var headerHtml = '<li class="subject_header e_clear"><div class="cal_img_border"><div class="cal_img"><img src="{thumb}" /></div></div>'+
					     '<div class="cal_info"><h3>{title}</h3><p>订阅：{userCount}</p><p>话题：{topicCount}</p></div></li>'
		self.ulList.append($format(headerHtml, calendar));
		$(".header_title").html(calendar.title);
	}
	
	function _renderSubject(topics){
		var listHtml='<li class="subject_item" tid="{id}">'+
						'<h3><span class="top {top}">置顶</span><span class="notice {notice}">公告</span><span class="excellent {excellent}">精华</span>{title}</h3>'+
						'<p>{body}</p>'+
						'<div class="subject_list_bottom"><span class="com_num">评论：{replyCount}</span><span class="author">发布者：{username}</span><span class="re_time">{timeStr}</span></div>'+
						'<div>'+
						'<button class="manage_action {no_top}" val="3">置顶</button><button class="manage_action {top}" val="6">取消置顶</button>'+
						'<button class="manage_action {no_notice}" val="2">公告</button><button class="manage_action {notice}" val="5">取消公告</button>'+
						'<button class="manage_action {no_excellent}" val="1">精华</button><button class="manage_action {excellent}" val="4">取消精华</button></div>'+
					 '</li>';
		var li_list = $($format(listHtml, $.map(topics, function(o, i){
			if(o.top == "show"){
				o.no_top = "hide";
			}else{
				o.no_top = "show";
			}
			if(o.notice == "show"){
				o.no_notice = "hide";
			}else{
				o.no_notice = "show";
			}
			if(o.excellent == "show"){
				o.no_excellent = "hide";
			}else{
				o.no_excellent = "show";
			}
			return o;
		})));
		li_list.find(".manage_action").click(function(){
			var $li = $(this).parent().parent();
			var topicID = $li.attr("tid");	
			var action_id = $(this).attr("val");
			$d.manageTopic(topicID, action_id, function(){
				_refresh();
			});
		});
		self.ulList.append(li_list);
	}
	function _refresh(){
		$d.initSubject(function(calendar, topics){
			self.ulList.empty();
			pageNum = 0;
			_initCalendar(calendar);
			_renderSubject(topics);
			$("#subject_loadmore_btn").html("更多");
		});
	}
	
	function _loadMore(loading){
		$d.getSubjectList(++pageNum, function(topics){
			_renderSubject(topics);
			loading.html("更多");
			loading.removeClass("loading");
			
			if(topics.length == 0){
				loading.html("没有更多内容啦");
			}
		});
	}
	
	function init(){
		render(true);
		//加载更多
		$("#subject_loadmore_btn").click(function(){
			var $elem = $(this);
			if($elem.hasClass("loading"))
				return;
			$elem.html("加载更多...");
			$elem.addClass("loading");
			_loadMore($elem);
		});
		
		
		//刷新
		self.refreshBtn.click(function(){
			_refresh();
		});

	}
	function render(bShouldReload){
		if(bShouldReload){
			_refresh();
		}
		self.container.show();
	}
		
	module.exports = {
		init: init	
	}
});
