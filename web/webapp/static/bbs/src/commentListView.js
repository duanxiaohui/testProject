define(function(require, exports, module) {
	//var $ = require('jquery');
	var $d = require('./data');
	var $util = require('./util');
	var $format = $util.format;
	
	var self = {};
	var pageNum = 0;
	self.ulList    = $("#comment_list_ul")
	self.container = $(".comment_list_view");
	var shouldReloadParent = false;
	
	function _initHeader(topic, piclist){
		//schedule topic id
		self.scheduleTopicID = topic.id;	
		var headerHtml = '<li class="comment_header">'+
							'<h3>' + 
							//'<span class="top {top}">置顶</span><span class="notice {notice}">公告</span><span class="excellent {excellent}">精华</span>' + 
							'{title}</h3>'+
							'<p>{body}</p>'+
							'<div class="image_container"></div>' +
							'<div class="comment_header_bottom"><a href="javascript:;" class="delete_subject_btn {deleteClass}" tid={id}>删除</a><span class="author">{username}</span><span class="re_time">{timeStr}</span><p class="reply_num">共{replyCount}楼</p></div>'+
							'<div class="floor">{floor}楼</div>'+
						 '</li>'
		self.ulList.append($format(headerHtml, topic));
		self.ulList.find(".delete_subject_btn").click(function(){
			var rs = confirm("确定删除您所发表的主题？");
			if(!rs)
				return;
			$d.deleteSubject($(this).attr("tid"),function(result){
				if(self.bSchedule){
					_refresh();
				}else{
					self.parentRender(true);
				}
			});			
		});
		//add pic
		if(piclist){
			for(var i in piclist){
				self.ulList.find(".image_container").append("<div class='image_div'><img src='"+piclist[i]+"' class='image_item'/></div>");				
			}
		}
	}
	
	function _renderComment(replyList, newReply){
		var listHtml='<li class="comment_item comment_item_{id}">'+
						'<div class="comment_username"><span class="louzhu hide">楼主</span>{username} :</div>' +
						'<div class="comment_txt">{replyUsername}{content}</div>' +
						'<div class="comment_item_bottom"><span>{timeStr}</span><a href="javascript:;" class="delete_comment_btn {deleteClass}" rid={id}>删除</a><a href="javascript:;" class="reply_btn" userid={userID} username={username} >回复</a></div>' +
						'<div class="floor">{floor}楼</div>'+
					'</li>';
		var li_list = $($format(listHtml, replyList));
		if(newReply){
			li_list.css("background", "#fffcd7");
		}
		li_list.find(".delete_comment_btn").click(function(){
			var rs = confirm("是否删除您的评论");
			if(!rs)
				return;
			var rid = $(this).attr("rid");
			$d.deleteComment(rid, function(result){
				self.ulList.find(".comment_item_" + rid).remove();
			});
		});
		
		li_list.find(".reply_btn").click(function(){
			var $reply_btn = $(this);
			var $li = $reply_btn.parent().parent();
			if($li.find(".reply_comment_div").length > 0){
				$li.find(".reply_comment_div").remove();
				$reply_btn.html("回复");
			}else{
				//remove all reply_comment_div
				$(".comment_item .reply_btn").html("回复");
				$(".comment_item .reply_comment_div").remove();
				var userID = $reply_btn.attr("userid");
				var username = $reply_btn.attr("username");
				$reply_btn.html("取消回复");
				$li.append("<div class='reply_comment_div'>"+
							"<div class='reply_input_div'><textarea type='text' class='reply_input' placeholder='回复 "+username+"'></textarea></div>"+
							"<a class='reply_send' href='javascript:;'>回复</a></div>");
				$li.find(".reply_send").click(function(){
					var content = $(this).parent().find(".reply_input").val().trim();
					if(content.length == 0){
						alert("回复不能为空");
						return;
					}
					if(content.length > 1024){
						alert("回复内容超出限制");
						return;
					}
					var reply_send_btn = $(this);
					if($(this).hasClass("progress")){
						return;
					}
					$(this).addClass("progress");
					$d.addComment({
						userID:userID,
						content:content,
						topicID:self.topicID
					},function(reply){
						reply_send_btn.removeClass("progress");
						shouldReloadParent = true;
						$li.find(".reply_comment_div").remove();
						$reply_btn.html("回复");
						_renderComment(reply, true);						
					}, self.bSchedule);
				});
				
			}
		})
		self.ulList.append(li_list);
	}
	
	function _refresh(){
		$(".comment_edit_area").hide();
		$(".comment_loadmore").hide();
		self.ulList.html('<li class="preload_item" style="background: #ecedee;border:none;margin:200px auto;"><div class="loadbar"></div><div class="loadbar"></div><div class="loadbar"></div></li>');	
		$d.initComment(self.topicID, function(topic, replyList, piclist){
			self.ulList.empty();
			pageNum = 0;
			if(!self.bSchedule){
				_initHeader(topic, piclist);				
			}
			_renderComment(replyList);
			if(replyList.length >= $d.commentPageCount){
				$(".comment_loadmore").show();				
			}
			$("#comment_loadmore_btn").html("更多");
			$(".comment_edit_area").show();
			
			if(document.body.scrollHeight > screen.height){
				$(".comment_back_btn").show();
			}else{
				$(".comment_back_btn").hide();	
			}			
		}, self.bSchedule, function(fail){
			self.ulList.html('<li style="text-align:center;height:100px;line-height:100px;">抱歉，此消息已被作者删除</li>');
		});
	}
	
	function _loadMore(loading){
		var tid = self.topicID;
		if(self.bSchedule)
			tid = self.scheduleTopicID;	
		if(tid == -1){
			_refresh();
			return;
		}
		$d.getCommentList(tid, ++pageNum, function(replyList){
			_renderComment(replyList);
			loading.html("更多");
			loading.removeClass("loading");
			
			if(replyList.length == 0){
				loading.html("没有更多内容啦");
			}
		});
	}

	self.init = function(bSchedule){
		self.parentRender = function(){
			history.back();
		};
		self.bSchedule = bSchedule;	
		$("#send_comment").click(function(){
			var content = $("#comment_input").val().trim();
			if(content.length == 0){
				alert("评论不能为空");
				return;
			}
			if(content.length > 1024){
				alert("评论内容超出限制");
				return;
			}
			if($(this).hasClass("progress")){
				return;
			}
			$(this).addClass("progress");
			$d.addComment({
				userID:"-1",
				content:content,
				topicID:self.topicID
			},function(reply){
				$("#send_comment").removeClass("progress");
				shouldReloadParent = true;
				$("#comment_input").val("");
				_renderComment(reply, true);

			},bSchedule);
		});
		$("#comment_loadmore_btn").click(function(){
			var $elem = $(this);
			if($elem.hasClass("loading"))
				return;
			$elem.html("加载更多...");
			$elem.addClass("loading");
			_loadMore($elem);
		});
		//init container min height
		self.container.css("min-height", $(window).height() + "px");
		
		$(".comment_back_btn").click(function(){
			$(this).hide();
			$("#comment_input").focus();
		});
		
		$(window).scroll(function(){
			if($(window).scrollTop() + $(window).height() >= $(document).height()){
				$(".comment_back_btn").hide();
			}else if($(window).scrollTop() == 0){
				$(".comment_back_btn").show();	
			}
		});
	}
	
	self.render = function(topicID){		
		self.topicID = topicID;
		shouldReloadParent = false;
		_refresh();

		self.container.show();
		//focus comment_input
		if(location.href.indexOf("focus") > 0){
			setTimeout(function(){
				$("#comment_input").focus();	
			}, 500)
		}
	}	
	
	self.dealloc = function(animate, toContainer){
		if(animate){
			$util.animate(self.container, "right", toContainer);
		}else{
			$("body").scrollTop(0);
			self.container.hide();
			self.container.css("left", "0px");
			self.container.css("z-index", "1");
		}
		$("#comment_input").val("");
	}
	
	module.exports = self;
});
