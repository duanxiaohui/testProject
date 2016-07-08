/**
 * order.js
 * @authors huangyi
 * @date    2014-08-28 17:09:04
 * @version $Id$
 */
/**
 * @edit
 * order.js
 * @authors zhangmingchen
 * @date    2015-02-1 17:05:00
 */
/*template方法  填充数据模板 方法*/
function copyTo (ce, e) {
    for (var i in ce) {
        if (typeof i === 'undefined') continue;
        if (typeof ce[i] == 'object') {
            e[i] = {};
            if (ce[i] instanceof Array) e[i] = [];
            copyTo(ce[i], e[i]);
            continue;
        }
        e[i] = ce[i];
    }
}
function apply (object, config, defaults) {
    if (defaults) {
        apply(object, defaults);
    }
    if (object && config && typeof config === 'object') {
        var i, j;

        for (i in config) {
            object[i] = config[i];
        }
    }

    return object
}
function typeOf (o) {
    return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
}
function template (s,o,defaults) {
    if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
    var _html = [];
    defaults = defaults || {};
    if(typeOf(o) === 'array'){
        for (var i = 0, len = o.length; i < len; i++) {
            _html.push(template(s, o[i],defaults));
        };
    }else{
        var __o = {};
        copyTo(o, __o);
        apply(__o, defaults);
        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o) : (o[_o] || __o[_o] || '');
        }));
    }
    return _html.join('');
}
var tmpl='<dl class="e_clear" {$class_name}><dt class="textJust">姓名</dt><dd>{$name}</dd></dl>\
				  <dl class="e_clear" {$class_sex}><dt class="textJust">性别</dt><dd>{$sex}</dd></dl>\
				  <dl class="e_clear" {$class_birthday}><dt class="textJust">生日</dt><dd>{$birthday}</dd></dl>\
				  <dl class="e_clear" {$class_cellphone}><dt class="textJust">手机号</dt><dd>{$cellphone}</dd></dl>\
				  <dl class="e_clear" {$class_email}><dt class="textJust">邮箱</dt><dd>{$email}</dd></dl>\
				  <dl class="e_clear" {$class_leaveWord}><dt class="textJust">留言</dt><dd>{$leaveWord}</dd></dl>';
var orderCtrl = {
	toast1:null,
	init: function(platform, showFooter){
		//控制返回按钮 返回到客户端
		if(!app.getUa.weixin){
			app.call({
				action: 'howToBack',
				params: [{
					name: 'how',
					value: 'quit'
				}],
				callback: function() {}
			});
		}
		var $h = $(window).height();
		if($h < 470) {
			$h = 470;
		}
		$('body').height($h);
		if(app.getUa.weixin){
			$(".authorization").css({
				"padding-bottom":52 + "px"
			});
			$(".help_tips").removeClass("none");
			$(".down_client_btn").click(function () {
				app.open({
					ios:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid,
					android:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid
					},app.getUa.ios
				)
			})
		}
		$(".exit_btn").on("click", function(){
			t = "提示";
			c = "确认要退出此活动吗？";
			if(G.needPay) {
				t = "确实退出该活动吗？";
				c = "费用将在1-3个工作日按原方式退回";
				if(app.getUa.weixin) {
					c += "下载365日历，第一时间获得退款进度。"
				}
			}
			_confirm(t, c, function () {
				if (platform == "mobile") {
					orderCtrl.unOrderWithToken();
				}else{
					orderCtrl.unOrder();
				}
			},function(){

			});
			// if(confirm("确定对该订单进行退订")){
			// 	if (platform == "mobile") {
			// 		orderCtrl.unOrderWithToken();
			// 	}else{
			// 		orderCtrl.unOrder();
			// 	}
			// }
		});
		$(".active_send_btn").on('click',function () {
			$(".iphone_div").show();
		})
		$(".send_btn").on("click", function(){
			var tel = $(".iphone_input").val();
			var regex = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
			if(!regex.test(tel)){
				if(orderCtrl.toast1){
					orderCtrl.toast1.show();
				}else{
					orderCtrl.toast1 = new Android_Toast({
							content: '您输入的手机号码不正确，请重新输入', 
							duration: 2500, 
							position: 'bottom'});
				}
				return;
			}
			if (platform == "mobile") {
				orderCtrl.sendTelWithToken(tel);
			}else{
				orderCtrl.sendTel(tel);
			}
		});
		$('.view_btn').on('click',function(){
	    	$(".main").hide();
	    	$(".auth_info").show();
	    	var aih = $(".auth_info").height();
	    	if(aih > $h){
	     		$('body').height(aih);
	     	}else{
	     		$(".auth_info").height($h);
	     	}
	    });
		$('.auth_back_btn').on('click', function () {
	     	$(".main").show();
	     	$(".auth_info").hide();
	     	$('body').height($h);
	    });
		
		if(app.getUa.weixin && showFooter) {
			footer.init({
				type:'activityCalendar',
				cocourl:{
					ios:'coco://365rili.com',
					android:'coco://365rili.com'
				}
			});
		}
	},
	sendTelWithToken: function(tel){
		var url, headers;
		url = "http://www.365rili.com/event/sendOrderCode.do?orderId=" + G.orderId + "&cellphone=" + tel;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url:url,
				type:"GET",
				dataType: "json",
				headers:headers,
				success: function(data){
					if(data.state == "ok"){
						_alert("授权码已经发送至您的手机" + tel);
					}else{
						var toast = new Android_Toast({
							content: '发送失败', 
							duration: 2500, 
							position: 'bottom'});						
					}
				}
			});
		});
		
	},
	sendTel: function(tel){
		$.ajax({
			url:"/event/sendOrderCode.do?orderId=" + G.orderId + "&cellphone=" + tel,
			type:"GET",
			dataType: "json",
			success: function(data){
				if(data.state == "ok"){
					_alert("授权码已经发送至您的手机" + tel);
				}else{
					var toast = new Android_Toast({
						content: '发送失败', 
						duration: 2500, 
						position: 'bottom'});						
				}
			}
		});
	},
	unOrderWithToken: function(){
		var url, headers;
		url = "http://www.365rili.com/event/unOrder.do?orderId=" + G.orderId;
		getTokenByCoco(url, function (headers) {
			$.ajax({
				url:url,
				type:"GET",
				dataType:"json",
				headers:headers,
				timeout: 3000,
				success: function(data){
					if(data.state == "ok"){
						location.href = "coco://365rili.com/unOrder?orderId=" + G.orderId + "&back=1";
					}else{
						var errorMsg = '退订操作失败,请重新再试';
						if(data.status != null) {
							if(data.status == 2) {
								errorMsg = '该活动不支持退款';
							} else if(data.status == 3) {
								errorMsg = '该授权码已使用，不能退款';
							}
						}
						var toast = new Android_Toast({
							content: errorMsg, 
							duration: 2500, 
							position: 'bottom'
						});
					}
				},
				error: function(data) {
					_alert2("网络有问题哦", "网络已断开或连接状态不佳，请检查");
				}
			})
		});
		
	},
	unOrder: function(){
		$.ajax({
			url:"/event/unOrder.do?orderId=" + G.orderId,
			type:"GET",
			dataType:"json",
			timeout: 3000,
			success: function(data){
				if(data.state == "ok"){
					var toast = new Android_Toast({
						content: '退订成功', 
						duration: 2500, 
						position: 'bottom'
					});
					
					if(typeof WeixinJSBridge != "undefined") {
						var timer = setTimeout(function() {
							WeixinJSBridge.call('closeWindow');
			            }, 1500);
					}
				}else{
					var errorMsg = '退订操作失败,请重新再试';
					if(data.status != null) {
						if(data.status == 2) {
							errorMsg = '该活动不支持退款';
						} else if(data.status == 3) {
							errorMsg = '该授权码已使用，不能退款';
						}
					}
					var toast = new Android_Toast({
						content: errorMsg, 
						duration: 2500, 
						position: 'bottom'
					});
				}
			},
			error: function(data) {
				_alert2("网络有问题哦", "网络已断开或连接状态不佳，请检查");
			}
		})
	},
	renderWithToken: function(){
		try{
			try{
			clearTimeout(mar)
		}
		catch(e){}
		}
		catch(e){}

		var url, headers;
		url = "/event/viewOrder.do?orderId=" + G.orderId;
		getTokenByCoco(url, function (headers) {	
			$.ajax({
				url: url,
				type: "GET",
				dataType:"json",
				headers:headers,
				timeout: 3000,
				success: function(data){
					$(".auth_telephone").removeClass('none');
					if(data.state == "ok"){
						$('.auth_info_box').html(template(tmpl,data, orderCtrl.templateDefaults));
					}
					if(data.status == 1){
						$(".code_txt").html(data.code);
						$(".auth_txt").html("您已参加该活动");
						$(".auth_telephone").hide();
						$(".auth_btn").hide();
					}else{
						$(".code_txt").html(data.code);
						$(".tel_input").val(data.cellphone);
					}
				},
				error: function(data) {
					_alert2("网络有问题哦", "网络已断开或连接状态不佳，请检查");
				}
			})
		});
	},
	render: function(){
		$.ajax({
			url: "http://www.365rili.com/event/viewOrder.do?orderId=" + G.orderId,
			type: "GET",
			dataType:"json",
			timeout: 3000,
			success: function(data){
				if(data.state == "wrongpass"){
					_alert("用户未登录");
					return;
				}
				if(data.state == "ok"){
					$('.auth_info_box').html(template(tmpl,data, orderCtrl.templateDefaults));
				}
				$(".auth_telephone").removeClass('none');
				if(data.status == 1){
					$(".code_txt").html(data.code);
					$(".auth_txt").html("您已参加该活动");
					$(".auth_telephone").hide();
					$(".auth_btn").hide();
				}else{
					if(G.hideCode == 'true'){
						$(".auth_telephone").html('<div class="auth_telephone_txt">请使用本微信账号登陆365日历手机客户端，进入“参加的活动”查看完整兑换码。</div>').css("height",'44px')
					}
					$(".code_txt").html(data.code);
					$(".iphone_input").val(data.cellphone);
				}
			},
			error: function(data) {
				_alert2("网络有问题哦", "网络已断开或连接状态不佳，请检查");
			}
		})
	},
	templateDefaults: {
		'class_name': function(o, p, d, i) {
			if(p.name == "") {
				return "style='display:none;'";
			}
		},
		'class_sex': function(o, p, d, i) {
			if(p.sex == "") {
				return "style='display:none;'";
			}
		},
		'class_birthday': function(o, p, d, i) {
			if(p.birthday == "") {
				return "style='display:none;'";
			}
		},
		'class_email': function(o, p, d, i) {
			if(p.email == "") {
				return "style='display:none;'";
			}
		},
		'class_cellphone': function(o, p, d, i) {
			if(p.cellphone == "") {
				return "style='display:none;'";
			}
		},
		'class_leaveWord': function(o, p, d, i) {
			if(p.leaveWord == "") {
				return "style='display:none;'";
			}
		}
	}
}

var token;
function setToken(t){
	token = t;
	orderCtrl.renderWithToken();
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

$(function(){
	if (app.getUa.android) {
		if(typeof AliansBridge != "undefined"){
			orderCtrl.renderWithToken();
			orderCtrl.init("mobile");
			return;
		}
	}
	//如果不是在手机客户端内
	if (!/coco/i.test(navigator.userAgent) && location.href.indexOf("platform") < 0) {
		orderCtrl.init("web", true);
		orderCtrl.render();
	}else{
		window.mar = setTimeout(function(){
			orderCtrl.renderWithToken();
		},500);
		orderCtrl.init("mobile");
	}

})

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
};
window._alert2 = function (title, txt) {
	$(document.body).dialog({
		title: title,
		content: txt,
		closeBtn: false,
		width: 270,
		buttons: {
			'关闭': function () {
				this.close().destroy();
			}
		}
	});
};
window._confirm = function (title, txt, s, e) {
	$(document.body).dialog({
		title: title,
		content: txt,
		closeBtn: false,
		width: 270,
		buttons: {
			'确定': function () {
				s&&s();
				this.close().destroy();
			},
			'取消': function () {
				e&&e();
				this.close().destroy();
			}
		}
	});
};