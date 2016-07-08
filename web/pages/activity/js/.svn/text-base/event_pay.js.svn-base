var G = {};
eventPay = {
	callType : null,
	payOrderId : null,
	isAndroid : false,
	
	init : function(){
		if (app.getUa.androidCoco) {
			eventPay.callType = "android";
		} else if(app.getUa.weixin) {
			eventPay.callType = "wechat";
		} else {
			eventPay.callType = "other";
		}
		if (app.getUa.android) {
			eventPay.isAndroid = true;
		}
	},
	
	payAll : function(eventId) {
		if(eventPay.callType != "wechat") {
			var v = eventPay.getClientVersion();
			if(v > 0) {
				if(v < 5.5) {
					eventPay.eventAlert("您当前版本的客户端不支持支付，请先升级到最新版本:)");
					return;
				}
			}
		}
	    url = 'http://www.365rili.com/event/pay/createOrder.do';
	    eventPay.getTokenByCocoPay(url, function (header) {
	        $.ajax({
	            url: url,
	            headers : header,
	            type:"post",
	            data:{
	                eventId: eventId,
					count : 1,
					tradeType: (eventPay.callType == "wechat" ? 'JSAPI' : 'APP') 
				},
				success : function(data) {
					if (data.state == "ok") {
						eventPay.payOrderId = data.payOrderId;
						eventPay.prepay(data.payOrderId);
					} else {
						eventPay.eventAlert("创建订单失败");
					}
				}
			});
		});
	},
	
	prepay : function(payOrderId) {
		url = 'http://www.365rili.com/tenpay/' + (eventPay.callType == "wechat" ? 'webPrepay' : 'prepay') + '.do';
		eventPay.getTokenByCocoPay(url, function(header) {
			$.ajax({
				url : url,
				headers : header,
				type : 'post',
				data : {
					payOrderId : payOrderId
				},
				success : function(data) {
					if (data.state == "ok") {
						if (eventPay.callType == "android") {
							AliansBridge.nativeTenpay(JSON.stringify(data),
									payOrderId);
						} else if(eventPay.callType == "wechat") {
							G.tenpayOrderInfo = data;
							eventPay.jsApiCall();
						} else {
							data.payorderid = payOrderId;
							G.tenpayOrderInfo = JSON.stringify(data);
							window.location.href = "cocoinapp://tenpay";
						}
					} else {
						eventPay.eventAlert(data.msg);
					}
				}
			});
		});
	},
	
	//调用微信JS api 支付
	jsApiCall : function() {
		 wx.chooseWXPay({
			 timestamp: G.tenpayOrderInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			 nonceStr: G.tenpayOrderInfo.nonceStr, // 支付签名随机串，不长于 32 位
			 package: G.tenpayOrderInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
			 signType: G.tenpayOrderInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			 paySign: G.tenpayOrderInfo.paySign, // 支付签名
			 success: function(res) {
				 // 支付成功后的回调函数
				 getPayResult();
			 }
		 });
	},

	callpay : function() {
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', eventPay.jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', eventPay.jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', eventPay.jsApiCall);
		    }
		}else{
			eventPay.jsApiCall();
		}
	},

	getTokenByCocoPay : function(url, callBack) {
		if(!eventPay.isAndroid && eventPay.callType == "wechat") {
			callBack({});
			return;
		}
		mar = setTimeout(function() {
			try {
				t = '';
				tSource = (new Base64()).decode(t);
				if (tSource.indexOf('%') == -1) {
					callBack({
						'Authorization' : 'Basic ' + t
					});
				} else {
					callBack({
						'x-365rili-key' : t
					});
				}
			} catch (e) {
				callBack({});
			} 
		}, 500); 
		
		try {
			app.call({
				action : 'getEncryptHeaders',
				params : [ {
					name : 'url',
					value : url
				} ],
				callback : function(headers) {
					try {
						clearTimeout(mar);
					} catch (e) {
					}
					headers = JSON.parse(headers);
					callBack(headers);
				}
			});
		} catch (e) {
			try {
				app.call({
					action : 'getToken',
					callBack : function(token) {
						try {
							clearTimeout(mar);
						} catch (e) {
						}
						headers = {
							'x-365rili-key' : token
						};
						callBack(headers);
					}
				});
			} catch (e) {
				
			}
		}
	},
	
	getClientVersion : function() {
		var version = 0;
		var sUserAgent = navigator.userAgent.toLowerCase();
	 	var len = sUserAgent.length;
	 	var index = -1;
		if(app.getUa.ios){
		 	var index = sUserAgent.indexOf('ios-coco');
		} else if(app.getUa.androidCoco) {
			index = sUserAgent.indexOf('android-coco');
		}
		if(index > -1) {
	 		var s = sUserAgent.substring(index, len);
	 		var arr = s.split('|');
	 		version = parseFloat(arr[2]);
	 	}
		return version;
	},
	
	eventAlert : function() {
		var title = "提示";
		var txt;
		var callback;
		
		if(arguments.length >= 2) {
			title = arguments[0];
			txt = arguments[1];
		} else {
			txt = arguments[0];
		}
		if(typeof arguments[2] != 'undefined') {
			callback = arguments[1];
		}
		$(document.body).dialog({
			title: title,
			content : txt,
			closeBtn : false,
			width : 270,
			buttons : {
				'好' : function() {
					this.close().destroy();
				}
			},
			close: callback
		});
	}
};

//发起查询支付结果
function getPayResult() {
	url = "http://www.365rili.com/tenpay/" + (eventPay.callType == "wechat" ? "webPayResult" : "payResult") + ".do";
	eventPay.getTokenByCocoPay(url, function(header) {
		$.ajax({
			url : url,
			headers : header,
			type: 'post',
			data : {
				payOrderId : eventPay.payOrderId
			},
			success : function(data) {
				if (data.state == "ok") {
					//支付成功
					window.location.href = data.jumpUrl;
				} else {
					eventPay.eventAlert("支付失败");
				}
			}

		});
	});
}

$(function(){
	eventPay.init();
});

