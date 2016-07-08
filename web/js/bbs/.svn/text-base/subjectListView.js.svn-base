/***********************************************************
**	SubjectListView function
***********************************************************/
function SubjectListView($d, $util, clView, scView) {
	var $format = $util.format;
	
	var self = {};
	self.container = $(".subject_list_view");
	self.ulList    = $("#subject_list_ul");
	self.backBtn   = $("#subject_back_btn");
	self.createBtn = $("#create_subject_btn");
	self.refreshBtn = $("#subject_refresh_btn");
	var pageNum = 0;
	
	function _initCalendar(calendar){
		var headerHtml = '<li class="subject_header e_clear"><div class="cal_img_border"><div class="cal_img"><img src="{thumb}" /></div></div>'+
					     '<div class="cal_info"><h3>{title}</h3>'+
						 //'<p>订阅：{userCount}</p>'+
						 '<p>话题：{topicCount}</p></div></li>'
		self.ulList.append($format(headerHtml, calendar));
		$(".header_title").html(calendar.title);
	}
	
	function _renderSubject(topics){
		var listHtml='<li class="subject_item" tid="{id}">'+
						'<h3><span class="top {top}">置顶</span><span class="notice {notice}">公告</span><span class="excellent {excellent}">精华</span>{title}</h3>'+
						'<p>{body}</p>'+
						'<div class="subject_list_bottom e_clear"><span class="re_time">{timeStr}</span><span class="com_num">{replyCount}</span><span class="author">{username}</span></div>'+
						'<div class="{admin}">'+
						'<button class="manage_action {no_top}" val="3">置顶</button><button class="manage_action {top}" val="6">取消置顶</button>'+
						'<button class="manage_action {no_notice}" val="2">公告</button><button class="manage_action {notice}" val="5">取消公告</button>'+
						'<button class="manage_action {no_excellent}" val="1">精华</button><button class="manage_action {excellent}" val="4">取消精华</button></div>'+
					 '</li>';
		var li_list = $($format(listHtml, topics));
		li_list.click(function(){
			var topicID = $(this).attr("tid");
			self.scrollTop = document.body.scrollTop;
			dealloc(false, self.clView.container);
			location.href = "#clView=" + topicID;
			self.clView.render(topicID, true);
		});
		li_list.find(".manage_action").click(function(evt){
			evt.stopPropagation();
			evt.preventDefault();
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
		//self.ulList.html("<li class='preload_item'><div class='loadbar'></div><div class='loadbar'></div><div class='loadbar'></div></li>");
		$(".more_btn_wrapper").hide();
		$(".create_btn_wrapper").hide();
		$d.initSubject(function(calendar, topics){
			self.ulList.empty();
			pageNum = 0;
			_initCalendar(calendar);
			_renderSubject(topics);
			if(topics.length >= $d.subjectPageCount){
				$(".more_btn_wrapper").show();
			}else{
				self.ulList.css("margin-bottom","60px");
			}
			$("#subject_loadmore_btn").html("更多");
			$(".create_btn_wrapper").show();
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
		self.clView = clView;
		self.scView = scView;
		self.clView.init(false);
		self.scView.init();
		if(location.hash.indexOf("scView") > -1){
			dealloc(false);
			self.scView.render();
		}else if(location.hash.indexOf("clView") > -1){
			var topicID = location.hash.split("=")[1];
			dealloc(false);
			self.clView.render(topicID);
		}else{
			render(true);
		}
		//加载更多
		$("#subject_loadmore_btn").click(function(){
			var $elem = $(this);
			if($elem.hasClass("loading"))
				return;
			$elem.html("加载更多...");
			$elem.addClass("loading");
			_loadMore($elem);
		});
		
		//新建主题
		self.createBtn.click(function(){
			dealloc(false, self.scView.container);
			//创建一个新页面
			location.href = "#scView";
			self.scView.render();
		});
		
		//刷新
		self.refreshBtn.click(function(){
			_refresh();
		});
		
		//hash change event 
		//for fake page redirect
		window.addEventListener("hashchange", function(e){
			if(e.newURL.indexOf("#") == -1){
				if(e.oldURL.indexOf("#scView") > -1){
					self.scView.dealloc(false, self.container);
					render(true);
				}else{
					self.clView.dealloc(false, self.container);
					render(true);
				}
			}		
		}, false);
		
		//init container min height
		self.container.css("min-height", $(window).height() + "px");
	}
	function render(bShouldReload){
		if(bShouldReload){
			_refresh();
		}
		self.container.show();
		self.backBtn.css("display", "block");
		self.createBtn.css("display", "block");
		self.refreshBtn.css("display", "block");
		if(self.scrollTop){
			document.body.scrollTop = self.scrollTop;
		}
	}
	
	function dealloc(animate, toContainer){
		if(animate){
			$util.animate(self.container, "left", toContainer);
		}else{
			$("body").scrollTop(0);
			self.container.hide();
		}
		self.backBtn.hide();
		self.createBtn.hide();
		self.refreshBtn.hide();
	}
	self.init = init;
	return self;
}