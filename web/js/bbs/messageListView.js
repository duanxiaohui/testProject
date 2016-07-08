/************************************************
**	MessageListView function
*************************************************/
function MessageListView($d, $util) {
	var $format = $util.format;

	var self = {};
	
	self.container = $(".message_list_view");
	self.ulList    = $("#message_list_ul");
	self.backBtn   = $("#message_back_btn");
	self.refreshBtn = $("#message_refresh_btn");
	var pageNum = 0;
	
	function _renderMessage(messages){
		var listHtml='<li class="message_item" tid="{topic_id}" rid="{reply_id}">'+
						'<div class="message_username">{username}</div>' +
						'<div class="message_content">{content}</div>' + 
						'<div class="message_reply_topic">回复我的主题：{topic_title}</div>' + 
						'<div class="message_reply_source">来自【{title}】 {timeStr}</div>'
					 '</li>';
		var li_list = $($format(listHtml, messages));
		li_list.click(function(){
			var topicID = $(this).attr("tid");
			var params = $d.getParams();
			location.href = "comment.html" + params + "&tid=" + topicID;		
		});
		self.ulList.append(li_list);
	}
	
	function _refresh(){
		pageNum = 0;
		$(".message_loadmore").hide();
		$d.getMessageList(pageNum, function(messages){
			self.ulList.empty();
			_renderMessage(messages);
			$("#message_loadmore_btn").html("更多");
			$(".message_loadmore").show();
		});
	}
	
	function _loadMore(loading){
		$d.getMessageList(++pageNum, function(messages){
			_renderMessage(messages);
			loading.html("更多");
			loading.removeClass("loading");
			
			if(messages.length == 0){
				loading.html("没有更多内容啦");
			}
		});	
	}
	
	self.init = function(){
		render(true);
		
		//加载更多
		$("#message_loadmore_btn").click(function(){
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
		self.backBtn.css("display", "block");
		self.refreshBtn.css("display", "block");
	}
	
	function dealloc(){
		self.container.hide();
		self.backBtn.hide();
		self.refreshBtn.hide();
		
	}
	return self;
}