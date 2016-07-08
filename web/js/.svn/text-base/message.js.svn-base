var ajaxMessages={
	messageCount:function(callback){
		$.ajax({
        	type: 'post',
            url: '/message/count-web.do',
            success: callback,
            dataType: 'json'
     	});
	},
	getMessages:function(callback){
		$.ajax({
        	type: 'post',
            url: '/message/get-web.do',
            success: callback,
            dataType: 'json'
     	});
	}
}	

function notify() {
	// 显示通知信息
	ajaxMessages.messageCount(function(result){
		var htmlMsg = "";
		if(result>0) {
			var htmlMsg='<a style="color:white;" target="_blank" href="http://www.365rili.com/message/get-web.do">您有'+result+'条新消息</a>'
		} 
		$("#noticeArea").html(htmlMsg);
	});
}
