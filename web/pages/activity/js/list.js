var eventCtrl = {
	init: function(){
		try{
			clearTimeout(marInit)
		}
		catch(e){};
		var url, headers;
		url = 'http://www.365rili.com/event/joined.do';
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url:url,
				type:"GET",
				headers:headers,
				dataType:"json",
				success: function(data){
					eventCtrl.render(data);
				}
			})
		});
	},
	render: function(data){
		if(data.state == "ok" && data.e.length > 0){
			var content = $('<div class="content">');
			for(var i in data.e){
				var item = data.e[i];
				var location = item.location;
				if(location.indexOf('@') > 0){
					location = location.substr(0, location.indexOf('@'));
				}
				var dl = $('<dl class="item e_clear" eid="'+item.id+'" status="'+item.status+'">');
				dl.append('<dt class="item_left"><img src="'+item.thumb+'" /></dt>')
				dl.append('<dd class="item_right">'+
							'<div class="item_title">'+item.title+'</div>' +
							'<div class="item_time">'+item.td+'</div>' +
							(item.calendarName ? '<div class="calendar_name">' +item.calendarName +'</div>' : '') +
							'<div class="item_loc">'+location+'</div>'+
							'<div class="item_person">'+item.enrollStr+'</div>'+
							'<div class="item_status '+ eventCtrl.getStatus(item.status)+'"></div></dd>');
				content.append(dl);
			}
			$(".main").append(content);
			eventCtrl.bindEvent();
		}else{
			$(".main").append('<div class="empty"><p>尚未参加活动</p></div>');
			$(".empty").css({
				"height":$(window).height()
			})
		}
	},
	bindEvent: function(){
		$(".item").on("tap", function(){
			var eventId = $(this).attr("eid");
			var status  = $(this).attr("status");
			if(status == 1){
				var toast = new Android_Toast({
					content: '该活动已下线，无法查看',
					duration: 2500, 
					position: 'bottom'
				});
			}else{
				location.href = "coco://365rili.com/openEvent?eventId=" + eventId;
			}
		})
	},
	getStatus: function(statusStr){
		var status = 'status_1';
		if(statusStr == 0){			//正在进行
			status = 'status_1';
		}else if(statusStr == 1){	//下线
			status = 'status_3';
		}else if(statusStr == 2){
			status = 'status_2';	//过期
		}
		return status;
	}
}

var token;
function setToken(t){
	token = t;
	eventCtrl.init();
}
function getTokenByCoco (url, callBack) {
	var mar = setTimeout(function () {
		var t = token
		var tSource = (new Base64()).decode(t);
		if(tSource.indexOf('%') == -1){
			callBack({
				'Authorization': 'Basic ' + token
			});
		}
		else{
			callBack({
				'x-365rili-key': token
			});
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
			callBack: function (headers) {
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
}
// function getTokenByAndroid (url) {
// 	var token = '';
// 	if(app.getUa.android){
// 		try{
// 			token = JSON.parse(AliansBridge.getEncryptHeaders(url));
// 		}
// 		catch(e){
// 			return {
// 				"x-365rili-key":AliansBridge.getToken()
// 			};
// 		}
// 	}
// 	return token;
// }
$(function(){
	if(app.getUa.android) {
		return eventCtrl.init();
	}
});
window.marInit = setTimeout(function () {
	eventCtrl.init();
},500)