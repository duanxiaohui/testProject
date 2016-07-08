/*********************************************************
*	DataUtil function
**********************************************************/
function DataUtil($util) {
	var self = {};
	var host = "";
	var cID;
	var token;
	var currentUserID;
	var intervalID;
	var ua;
	var uaParams;
	var nocache = new Date().getTime();
	var bAdmin = $util.getURLParameter("admin");
	//评论管理
	if(bAdmin == "true"){
		$(".comment_btn_wrapper").show();
		$(".comment_back_btn").click(function(){
			history.back();
		});
	}
	
	if(location.href.indexOf("?dev") > 0){
		cID = "427";
		token = "MjQ2OjExMTExMQ==";
		currentUserID = "246";
		intervalID = new Date().getTime();
	}else{
		cID   = $util.getURLParameter("cid");
		if(!app.getUa.android){
			token = $util.getURLParameter("t");
		}
		currentUserID = $util.getURLParameter("uid");
		intervalID = $util.getURLParameter("i");
		if(location.href.indexOf("coco-ua") > 0){
			ua = $util.getURLParameter("coco-ua");
			uaParams = "&coco-ua=" + encodeURIComponent(ua);
		}else{
			ua = "";
			uaParams = "";
		}
	}

	self.subjectPageCount = 20;
	self.commentPageCount = 100;
	var currentTopic = {};
	var floorCount = 1;
	
	function getTimeStr(timestamp){
		var offset = new Date().getTime() - timestamp;
		var time = new Date(timestamp);
		var offset_zero = $util.getDateZero(new Date()).getTime() - $util.getDateZero(time).getTime();		
		
		if(offset < 60000){
			return "刚刚";
		}else if(offset >= 60000 && offset < 3600000){
			return Math.floor(offset/60000) + "分钟前";
		}else if(offset >= 3600000 && offset_zero < 86400000){
			return [
				("0" + time.getHours()).slice(-2), 
				("0" + time.getMinutes()).slice(-2)
			].join(":");
		}else if(offset_zero >= 86400000 && offset_zero < 30 * 86400000){
			return Math.floor(offset_zero/86400000) + "天前";
		}else{
			return [time.getFullYear(), 
				("0" + (time.getMonth() + 1)).slice(-2), 
				("0" + time.getDate()).slice(-2)
			].join("-"); 
		}
	}
	function setTopicProperty(o){
			if(o.type == 0){
				o.excellent = "hide";
				o.no_excellent = "show";
			}else{
				o.excellent = "show";
				o.no_excellent = "hide";
			}
			if(o.state == 0){
				o.top = "hide";
				o.notice = "hide";
				o.no_top = "show";
				o.no_notice = "show";
			}else if(o.state == 1){
				o.top = "show";
				o.notice = "hide";
				o.no_top = "hide";
				o.no_notice = "show";
			}else{
				o.top = "hide";
				o.notice = "show";
				o.no_top = "show";
				o.no_notice = "hide";
			}
			
			o.title = $util.encodeHtml(o.title);
			o.body = $util.encodeHtml(o.body);
	}
	
	function packageTopic(topics){
		return $.map(topics, function(o, i){
			if(o.scheduleID == 0){
				if(o.body.length > 50){
					o.body = o.body.substr(0,50) + "...";
				}
			}else{
				o.body = "";
			}
			setTopicProperty(o);
			o.timeStr = getTimeStr(o.lastReplyTime);
			if(bAdmin == "true"){
				o.admin = "show";
			}else{
				o.admin = "hide";
			}
			return o;
		});
	}
	function packageReply(reply){
		if(!reply)
			return [];
		return $.map(reply, function(o, i){
			o.timeStr = getTimeStr(o.created);
			if(o.userID == currentTopic.userID){
				o.lz = "show";
			}else{
				o.lz = "hide";
			}
			o.floor = ++floorCount;
			if(o.reply_user_id != -1){
				o.replyUsername = "回复 " + o.replyUsername + "：";
			}
			if(o.userID == currentUserID || bAdmin == "true"){
				o.deleteClass = "show";
			}else{
				o.deleteClass = "hide";
			}
			o.content = $util.encodeHtml(o.content);
			return o;
		});
	}

	function getTokenByCoco (url, callBack) {
		var mar = setTimeout(function () {
			try{
				var t = $util.getURLParameter("t") || $util.getURLParameter("token") || '';
				var tSource = (new Base64()).decode(t);  
				if(tSource.indexOf('%') == -1){
					callBack({
						'Authorization': 'Basic ' + $util.getURLParameter("t")
					});
				}
				else{
					callBack({
						'x-365rili-key': $util.getURLParameter("t")
					});
				}
			}
			catch(e){
				callBack({});
			}
		}, 500);
		try{
			app.call({
				action: 'getEncryptHeaders',
				params: [
					{
						name: 'url',
						value: url
					}
				],
				callback: function (headers) {
					try{
			clearTimeout(mar)
		}
		catch(e){};
					headers = JSON.parse(headers);
					callBack(headers);
				}
			});
		}
		catch(e){
			try{
				app.call({
					action: 'getToken',
					callBack: function (token) {
						try{
			clearTimeout(mar)
		}
		catch(e){};
						var headers = {
							'x-365rili-key': token
						};
						callBack(headers);
					}
				});
			}
			catch(e){}
		}

		// return;
		// var token = '';
		// if(app.getUa.android){
		// 	try{
		// 		token = JSON.parse(AliansBridge.getEncryptHeaders(url));
		// 	}
		// 	catch(e){
		// 		return {
		// 			'x-365rili-key': $util.getURLParameter("t")
		// 		};
		// 	}
		// }
		// return token;
	}
	
	function getTopicList(f){
		var url = "http://www.365rili.com/bbs365/getTopicList.do?calendarID=" + cID + "&pageNum=0&pageCount=" + self.subjectPageCount + "&token=" + token + "&nocache=" + nocache + uaParams;
		
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers:headers,
				success: function(result){
					f(result);
				}
			});	
		});
	}
	
	function getMoreTopics(pageNum, f){
		var url = "http://www.365rili.com/bbs365/getMoreTopics.do?calendarID=" + cID + "&pageNum="+ pageNum +"&pageCount="+ self.subjectPageCount +"&token=" + token + "&nocache=" + nocache + uaParams;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url:url,
				type:"get",
				dataType:"json",
				headers:headers,
				success: function(result){
					f(result);
				}
			});
		});
	}
	
	function getReplyList(topicID, f){
		var url = "http://www.365rili.com/bbs365/getReplyList.do?topicID=" + topicID + "&pageNum=0&pageCount="+self.commentPageCount+"&token=" + token + "&nocache=" + nocache + uaParams;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers:headers,
				success: function(result){
					f(result);
				}
			});
		});
	}
	
	function getMoreReplies(topicID, pageNum, f){
		var url = "http://www.365rili.com/bbs365/getMoreReplies.do?topicID=" + topicID + "&pageNum="+pageNum+"&pageCount="+self.commentPageCount+"&token=" + token + "&nocache=" + nocache + uaParams;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers: headers,
				success: function(result){
					f(result);
				}
			});	
		});
	}
	
	function getTopicBySchedule(uuid, f){
		var url = "http://www.365rili.com/bbs365/getTopicBySchedule.do?calendarID=" + cID + "&uuid=" + uuid + "&pageNum=0&pageCount="+self.commentPageCount+"&token=" + token + "&nocache=" + nocache + uaParams;
		
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers:headers,
				success: function(result){
					f(result);
				}
			});
		});
		






		// var url, headers;
		// url = "http://www.365rili.com/bbs365/getTopicBySchedule.do?calendarID=" + cID + "&uuid=" + uuid + "&pageNum=0&pageCount="+self.commentPageCount+"&token=" + token + "&nocache=" + nocache + uaParams
		// headers = getTokenByCoco(url);
		// $.ajax({
		// 	url: url,
		// 	type:"get",
		// 	dataType:"json",
		// 	headers:headers,
		// 	success: function(result){
		// 		f(result);
		// 	}
		// });
	}
	
	function postTopic(title, body, f){
		var url = "http://www.365rili.com/bbs365/postTopic.do";
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"post",
				dataType:"json",
				headers: headers,
				data:{
					calendarID:cID,
					title:title,
					body:body,
					token:token,
					'coco-ua':ua
				},
				success:function(result){
					f(result);
				}
			});
		});
	}
	
	function postReply(userID, content, topicID, f, error){
		var url = "http://www.365rili.com/bbs365/postReply.do";
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"post",
				dataType:"json",
				headers:headers,
				data:{
					replyUserID:userID,	
					content:content,
					topicID:topicID,
					token:token,
					'coco-ua':ua
				},
				success:function(result){
					f(result);
				},
				error:error,
				timeout:10000
			});
		});
	}
	
	function postReplyBySchedule(userID, content, uuid, f, error){
		var url = "http://www.365rili.com/bbs365/postReplyBySchedule.do";
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"post",
				dataType:"json",
				headers:headers,
				data:{
					replyUserID:userID,	
					content:content,
					uuid:uuid,
					token:token,
					calendarID:cID,
					'coco-ua':ua
				},
				success:function(result){
					f(result);
				},
				error:error,
				timeout:10000
			});
		});
	}
	
	function deleteTopic(topicID, f){
		var url = "http://www.365rili.com/bbs365/deleteTopic.do?topicID=" + topicID + "&token=" + token + uaParams;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers:headers,
				success: function(result){
					f(result);
				}
			});
		});
	}
	
	function deleteReply(replyID, f){
		var url = "http://www.365rili.com/bbs365/deleteReply.do?replyID=" + replyID + "&token=" + token + uaParams;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers:headers,
				success: function(result){
					f(result);
				}
			});
		});
	}
	
	function topicAdmin(topicID, action, f){
		var url = "http://www.365rili.com/bbs365/topicAdmin.do?topicID="+topicID+"&action="+action+"&token=" + token + uaParams;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers: headers,
				success: function(result){
					f(result);
				}
			});
		});
	}
	
	function getMyReplies(pageNum, f){
		var url = "http://www.365rili.com/bbs365/getMyReplies.do?pageNum=" + pageNum + "&pageCount=" + self.commentPageCount + "&token=" + token + "&nocache=" + nocache + uaParams;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				headers:headers,
				success: function(result){
					f(result);
				}
			});
		});
	}
	/********************************************************************
	**	public method
	*********************************************************************/
	self.initSubject = function(render){
		getTopicList(function(result){
			if(result.state == "ok"){
				render(result.calendarInfo, packageTopic(result.specialTopics.concat(result.topics)));
			}
		});
	}
	
	self.getSubjectList = function(pageNum, render){
		getMoreTopics(pageNum, function(result){
			if(result.state == "ok"){
				render(packageTopic(result.topics));
			}
		});
	}
	
	self.addSubject = function(opt, render){
		//show loading
		$("#loading_wrapper").show();
		var time = new Date().getTime();
		postTopic(opt.title, opt.body, function(result){
			if(result.state == "ok"){
				var offset = new Date().getTime() - time;
				if(offset < 1000){
					setTimeout(function(){
						$('#loading_wrapper').hide();						
						render(result);
					}, 1000 - offset);
				}else{
					$('#loading_wrapper').hide();
					render(result);
				}
			}
		});
	}
	
	self.deleteSubject = function(topicID, render){
		deleteTopic(topicID, function(result){
			if(result.state == "ok"){
				render(result);
			}
		});
	}
	
	self.initComment = function(topicID, render, bSchedule, fail){
		var getMethod = getReplyList;
		if(bSchedule){
			getMethod = getTopicBySchedule;
		}
		getMethod(topicID, function(result){
			if(result.state == "ok"){
				currentTopic = result.topic;
				result.topic.timeStr = $util.formatDate(result.topic.created);				
				floorCount = 1;
				result.topic.floor = floorCount;
				result.topic.replyCount++;
				if((result.topic.userID == currentUserID && result.topic.id != -1) || bAdmin == "true"){
					result.topic.deleteClass = "show";
				}else{
					result.topic.deleteClass = "hide";
				}
				setTopicProperty(result.topic);
				render(result.topic, packageReply(result.replyList), result.piclist);
			}else if(result.state == "failed"){
				fail();
			}
		});
	}
	
	self.getCommentList = function(topicID, pageNum, render){
		getMoreReplies(topicID, pageNum, function(result){
			render(packageReply(result.replyList));
		});
	}

	self.addComment = function(opt, render, bSchedule){
		var postMethod = postReply;
		if(bSchedule){
			postMethod = postReplyBySchedule;
		}
		//show loading
		$("#loading_wrapper").show();
		var time = new Date().getTime();
		postMethod(opt.userID, opt.content, opt.topicID, function(result){
			if(result.state == "ok"){
				//end loading
				var offset = new Date().getTime() - time;
				if(offset < 1000){
					setTimeout(function(){
						$('#loading_wrapper').hide();						
						render(packageReply([result.reply]));
					}, 1000 - offset);
				}else{
					$('#loading_wrapper').hide();
					render(packageReply([result.reply]));
				}
			}
		}, function(error){
			$('#loading_wrapper').html("<div class='loading_error'>回复失败，请刷新后重试</div>");
			setTimeout(function () {
				$('#loading_wrapper').html('').fadeOut('fast');
			}, 2000);
		});
	}
	
	self.deleteComment = function(replyID, render){
		deleteReply(replyID, function(result){
			if(result.state == "ok"){
				render(result);
			}
		});
	}
	
	self.manageTopic = function(topicID, action, render){
		topicAdmin(topicID, action, function(result){
			if(result.state == "ok"){
				render(result);
			}
		});
	}
	
	self.getMessageList = function(pageNum, render){
		getMyReplies(pageNum, function(result){
			render($.map(result, function(o,i){
				o.timeStr = $util.formatDate(o.created);
				return o;
			}));
		});
	}
	
	self.getParams = function(){
		return [
			"?cid=", cID, 
			"&uid=", currentUserID, 
			"&t=", token, 
			"&i=", intervalID,
			uaParams
		].join('');	
	}
	
	return self;
}