/**
 * 
 * @authors huangyi
 * @date    2014-09-04 12:23:37
 * @version $Id$
 */

var token;
function setToken(t){
	token = t;
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
// function getTokenByCoco (url) {
// 	var headers = '';
// 	if(app.getUa.android){
// 		try{
// 			headers = JSON.parse(AliansBridge.getEncryptHeaders(url));
// 		}
// 		catch(e){
// 			headers = {
// 				'x-365rili-key': AliansBridge.getToken()
// 			};
// 		}
// 	}
// 	else{
// 		headers = {
// 			'x-365rili-key': token
// 		}
// 	}
// 	return headers;
// }

$(".accept_btn").on("click", function(evt){
	var eventId = getURLParameter("eventId");
	if (/coco/i.test(navigator.userAgent) || location.href.indexOf("platform") > 0) {
		createOrderWithToken(eventId)
	}else{
		createOrder(eventId);
	}
});

function createOrder(eventId){
	$.ajax({
		url: "/event/createOrder.do?eventId=" + eventId,
		type: "GET",
		dataType: "json",
		success: function(data){
			if(data.state == "ok"){
				var url   = ["http://", location.host, "/event/orderDetail.do?orderId=", data.id].join('');
				location.href = url;
			}else{
				if(data.msg){
					_alert('创建订单失败:' + data.msg);
				}else if(data.state == "wrongpass"){
					_alert('创建订单失败:用户未登录');
				}else{
					_alert('创建订单失败');					
				}
			}
		}
	})
}

function createOrderWithToken(eventId){
	var title = "订单详情";
	var url, headers;
	url = "http://www.365rili.com/event/createOrder.do?eventId=" + eventId;
	getTokenByCoco(url, function (headers) {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: headers,
			success: function(data){
				if(data.state == "ok"){
					var url   = [location.host, "/event/orderDetail.do?orderId=", data.id].join('');
					location.href = ["coco://365rili.com/jumpEvent", "?title=", encodeURIComponent(title), "&url=", encodeURIComponent(url)].join('');
				}else{
					if(data.msg){
						_alert('创建订单失败:' + data.msg);
					}else{
						_alert('创建订单失败');
					}
				}
			}
		})
	});
}


function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}


window._alert = function (txt) {
	$(document.body).dialog({
		title: '提示',
		content: txt,
		closeBtn: false,
		width: 270,
		buttons: {
			'好': function () {
				this.close().destroy();
			}
		}
	});
}