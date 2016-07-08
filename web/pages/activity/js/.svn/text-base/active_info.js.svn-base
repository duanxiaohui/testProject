
var active_info = {

	config: {
		monHead: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		_data: {

		}
	},

	init: function() {
		active_info.initUI();
		active_info.bindEvents();
		active_info.adapterHeight();
		active_info.focusCalendar();
		active_info.viewInfo();
		active_info.placeholder();
	},

	initUI: function() {
		active_info.createDate();
	},
	adapterHeight:function () {
		var deviceH = $(window).height();
		var bodyH = $('body').height();
		if(deviceH > bodyH){
			$('body').height(deviceH);
		}
	},
	createDate: function() {
		var y = (new Date()).getFullYear(),
			m = (new Date()).getMonth(),
			date = (new Date()).getDate();

		active_info.fillSelectYear(y);
		active_info.fillSelectMonth();
		var d = active_info.config.monHead[m];
		if(m == 1 && active_info.isRN(y)) d++; 
		active_info.fillSelectDays(d);

		active_info.defaultDisplayTime(y, m, date);
		active_info.defaultSelected(y, m+1, date);
	},

	defaultSelected: function(y, m, date) {
		var yStr = 'option[value="' + y + '"]',
			mStr = 'option[value="' + m + '"]',
			dStr = 'option[value="' + date + '"]';

		$('#ac_year').find(yStr).prop('selected', true);
		$('#ac_month').find(mStr).prop('selected', true);
		$('#ac_day').find(dStr).prop('selected', true);
	},

	defaultDisplayTime: function(y, m, date) {
		$('#ac_year_txt').text(y);
		$('#ac_month_txt').text(m + 1);
		$('#ac_day_txt').text(date);
	},

	fillSelectYear: function(y) {
    	var y_items = '';

    	for(var i=(y-55); i<(y+1); i++) {
			y_items += '<option value="' + i + '">' + i + '</option>\r\n';
		}

		$('#ac_year').append(y_items);
    },

    fillSelectMonth: function() {
    	var m_items = '';

    	for(var i=1; i<13; i++) {
			m_items += '<option value="' + i + '">' + i + '</option>\r\n';
		}

		$('#ac_month').append(m_items);
    },

    fillSelectDays: function(d) {
    	var d_items = '';

    	for(var i=1; i<(d+1); i++) {
			d_items += '<option value="' + i + '">' + i + '</option>\r\n';
		}

		$('#ac_day').empty();
		$('#ac_day').append(d_items);
    },

	isRN: function(year) {
        return (year%4 == 0 && year%100 != 0) || (year%400 == 0);
    },
    focusCalendar:function () {
    	var url='/event/isSubscribed.do';
    	if(!app.getUa.weixin){
    			getTokenByCoco(url, function(headers){
    				$.ajax({
			    		url: url,
			            type: 'post',
			            headers:headers,
			            dataType: 'json',
			            data: {
			            	eventId: eventId
			            },
			            success: function(data) {
			            	if(data.state = 'ok'){
			            		if(!data.isSubscribed){
			            			$('.focusCalendar').removeClass("none");
			            		}
			            	}
			            	if($(".focusCalendar").is(':visible')){
			            		if($('input#fc_note').prop('checked')){
			            			active_info.config._data.subscribe = true;
			            		}
			            		$('#fc_note').click(function () {
			            			if($(this).prop('checked') !='true'){
			            				active_info.config._data.subscribe = false;	
			            			}
			            		})
			            	}
			            }
			    	});
    			})
    	}
    },
    viewInfo:function () {
    	$(".view_info_btn").click(function () {
    		var layerH = $(window).height() - 42;
    		$(".activity_layer").removeClass("none");
    		$(".activity_layer").css({
    			"height":layerH +"px",
    			"margin-top":-layerH/2 + "px"
    		})
    	})
    	if(!app.getUa.weixin && (app.getUa.androidCoco || app.getUa.iosCoco)) {
    		$(".active_remind_tips").removeClass("none");
    	}else{
    		$(".wx_info_tips").removeClass("none");
    	}

    	$(".wx_info_tips").find("a").click(function () {
    		app.open({
				ios:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid,
				android:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid
				},app.getUa.ios
			)
    	})
    	
    },
    getCaptcha: function(mobile) {
    	if(app.getUa.weixin) {
    		$.ajax({
	    		url: '/event/sendVerifyCode.do',
	            type: 'post',
	            dataType: 'json',
	            data: {
	            	cellphone: mobile
	            },
	            success: function(data) {
	            	if(data.state = 'ok'){
	            		_alert("验证码已经发送至您的手机" + mobile);
	            	};
	            }
	    	});
    	} else {
    		var url, headers;
			url = ['http://', location.host, '/event/sendVerifyCode.do'].join('');
			getTokenByCoco(url, function(headers) {
				$.ajax({
					url: url,
					type: 'post',
					headers: headers,
					dataType: 'json',
					data: {
						cellphone: mobile
					},
					success: function(data) {
	            		if(data.state = 'ok'){
	            			_alert("验证码已经发送至您的手机" + mobile);
	            		}
					}
				})
			});
    	}
    },

    createOrder: function(params) {
    	if(app.getUa.weixin) {
    		$.ajax({
	    		url: '/event/createOrder.do',
	            type: 'post',
	            dataType: 'json',
	            data: params,
	            timeout: 3000,
	            success: function(data) {
	            	active_info.checkOrder(data);
	            },
	            error: function(data) {
	            	alertDialog.close();
	            	_alert("网络有问题哦", "网络已断开或连接状态不佳，请检查");
	            }
	    	});
    	} else {
    		var url, headers;
			url = ['http://', location.host, '/event/createOrder.do'].join('');
			getTokenByCoco(url, function(headers) {
				$.ajax({
					url: url,
					type: 'post',
					headers: headers,
					dataType: 'json',
					data: params,
					timeout: 3000,
					success: function(data) {
							app.call({
								action: 'getNotify',
								params: [],
								callBack: function () {
									active_info.checkOrder(data);
								}
							})
					},
					error: function(data) {
						alertDialog.close();
		            	_alert("网络有问题哦", "网络已断开或连接状态不佳，请检查");
					}
				})
			});
    	}
    },

    checkOrder: function(data) {
    	alertDialog.close();
    	if(data.state == 'ok') {
    		// 创建订单成功，如需支付，则启动付款
    		if(data.need_pay) {
    			eventPay.payAll(eventId);
    		} else {
    			var url = ['http://', location.host, '/event/orderDetail.do?orderId=', data.id].join('');
    			location.href = url;
    		}
    		
    	} else {
    		if(data.msg) {
    			_alert('创建订单失败:' + data.msg);
    		} else {
    			_alert('创建订单失败');
    		}
    		active_info.setCountDown($('.get_code'), 0);
    	}
    },
    
    timer: null,
    
    setCountDown: function($ele, wait) {
    	if(wait == 0) {
    		clearTimeout(active_info.timer);
            $ele.text('重新获取');
            wait = 60;
            $('.get_code').removeClass('waiting_cd');
    	} else {
            $ele.text(wait);
            wait--;
            $('.get_code').addClass('waiting_cd');
            active_info.timer = setTimeout(function() {
                active_info.setCountDown($ele, wait);
            }, 1000);
    	}
    },

	bindEvents: function() {
		var timer = null;
		//获取验证码
		$('.get_code').on('click', function() {
			var $this = $(this),
			    mobile = $.trim($('#ac_mobile').val()),
			    wait = 60;

			if(mobile == '' || !/^(13[0-9]|14[0-9]|15[0-9]17[0-9]|18[0-9])\d{8}$/i.test(mobile)) {
				_alert('请输入正确的手机号码');
				return;
			}

			if(parseInt($('.get_code').text()) > -1) return;

			active_info.setCountDown($this, wait);
			active_info.getCaptcha(mobile);
		});

		$('#ac_note').on('click',function () {
			var ac_note = $('#ac_note').prop('checked');
			if(ac_note == false) {
				$('.save_btn').addClass("save_btn_disabled");
			}else{
				$('.save_btn').removeClass("save_btn_disabled");
			}
		})
		//保存个人信息
		
		$('.save_btn').on('click', function() {
			var ac_note = $('#ac_note').prop('checked');
			if(ac_note == false){
				return false;
			}
			var flag = active_info.validate();

			if(!flag) return;

			_loading("提交订单...");
			
			clearTimeout(timer);
			timer = setTimeout(function() {
				active_info.createOrder(active_info.config._data);
            }, 1000);
		});

		$('#ac_year').on('change', function() {
			var year = $(this).val(),
				month = $('#ac_month').val(),
				day = $('#ac_day').val();

			d = active_info.config.monHead[month-1]; 

			if(month == 2 && active_info.isRN(year)) d++;
			active_info.fillSelectDays(d);
			$('#ac_year_txt').text(year);
			active_info.defaultSelected(year, month, day);
		});

		$('#ac_month').on('change', function() {
			var month = $(this).val(),
				year = $('#ac_year').val(),
				day = $('#ac_day').val();

			d = active_info.config.monHead[month-1];

			if(month == 2 && active_info.isRN(year)) d++;

			active_info.fillSelectDays(d);
			$('#ac_month_txt').text(month);
			active_info.defaultSelected(year, month, day);
		});

		$('#ac_day').on('change', function() {
			var day = $(this).val();

			$('#ac_day_txt').text(day);
		});

		$('.activitiesNotice').on('click', function() {
			$('.activity_layer').removeClass('none');
			var wh = $(window).height();
			var h = $('.activity_layer').height();
			$('.activity_layer').css({"margin-top":-(h/2) + "px"});
		});

		$('.activity_layer_colse').on('click', function() {
			$('.activity_layer').addClass('none');
		});
	},
	placeholder:function () {
		if($('dl.name').length > 0) {
			var optional = $('#ac_name').data('optional');
			if(optional == 'required'){
				$('#ac_name').attr("placeholder","必填");
			}
		}
		if($('dl.email').length > 0) {
			var optional = $('#ac_mail').data('optional');
			if(optional == 'required'){
				$('#ac_mail').attr("placeholder","必填");
			}
		}
		if($('#ac_msg') > 0){
			var optional = $('#ac_msg').data('optional');
			if(optional == 'required'){
				$('#ac_msg').attr("placeholder","必填");
			}
		}
		if($('dl.phone').length > 0) {
			var optional = $('#ac_mobile').data('optional');
			if(optional == 'required'){
				$('#ac_mobile').attr("placeholder","必填");
			}
		}
	},
	validate: function() {
		var data = active_info.config._data;
		if($('dl.name').length > 0) {
			var optional = $('#ac_name').data('optional'),
			    ac_name = $.trim($('#ac_name').val());

			if(optional == 'required') {
				if(ac_name == '') {
					_formValidation('您输入的姓名有误');
					// $('#ac_name').focus();
					return false;
				}else if(ac_name.length > 20){
					_formValidation('姓名不能超过20个字符');
					return false;
				}
				data.name = ac_name;
			} else {
				if(ac_name != '') {
					if(ac_name.length > 20) {
						_formValidation('姓名不能超过20个字符');
						return false;
					} else {
						data.name = ac_name;
					}
				} else {
					data.name = '';
				}
			}
		}
		
		if($('dl.sex').length > 0) {
			var ac_sex = $('input[name="sexGroup"]:checked').val();
			data.sex = (ac_sex == 'male' ? 1 : 2);
		}

		if($('dl.birthday').length > 0) {
			var yItem = $('#ac_year').val(),
				mItem = $('#ac_month').val(),
				dItem = $('#ac_day').val();

			if(mItem < 10) {
				mItem = '0' + mItem;
			}
			if(dItem < 10) {
				dItem = '0' + dItem;
			}
			data.birthday = yItem + '-' + mItem + '-' + dItem;
		}

		if($('dl.email').length > 0) {
			var optional = $('#ac_mail').data('optional'),
			    ac_mail = $.trim($('#ac_mail').val());

			if(optional == 'required') {
				if(ac_mail == '' || ac_mail.length > 50 || !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i.test(ac_mail)) {
					$('#ac_mail').val(' ').focus();
					$('#ac_mail').attr("placeholder","必填");
					_formValidation('您输入的邮箱有误');
					return false;
				}
				data.email = ac_mail;
			} else {
				if(ac_mail != '') {
					if(ac_mail.length > 50 || !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i.test(ac_mail)) {
						$('#ac_mail').val(' ').focus();
						_formValidation('您输入的邮箱有误');
						return false;
					} else {
						data.email = ac_mail;
					}
				} else {
					data.email = '';
				}
			}
		}

		if($('dl.message ').length > 0) {
			var optional = $('#ac_msg').data('optional'),
			    ac_msg = $.trim($('#ac_msg').val());

			if(optional == 'required') {
				if(ac_msg == '' || ac_msg.length > 1024) {
					_formValidation('您需要填写留言');
					return false;
				}
				data.leaveWord = ac_msg;
			} else {
				if(ac_msg != '') {
					if(ac_msg.length > 1024) {
						_formValidation('留言不能超过1024个字符');
						return false;
					} else {
						data.leaveWord = ac_msg;
					}
				} else {
					data.leaveWord = '';
				}
			}
		}

		if($('dl.phone').length > 0) {
			var optional = $('#ac_mobile').data('optional'),
			    ac_mobile = $.trim($('#ac_mobile').val());

			if(optional == 'required') {
				if(ac_mobile == '' || !/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(ac_mobile)) {
					$('#ac_mobile').val(' ').focus();
					_formValidation('您输入的手机号码有误');
					return false;
				}
				data.cellphone = ac_mobile;
			} else {
				if(ac_mobile != '') {
					if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(ac_mobile)) {
						$('#ac_mobile').val(' ').focus();
						_formValidation('您输入的手机号码有误');
						return false;
					} else {
						data.cellphone = ac_mobile;
					}
				} else {
					data.cellphone = '';
				}
			}
		}

		if($('div.input_code').length > 0) {
			var ac_code = $.trim($('#ac_code').val());
			if(ac_code == '') {
				$('#ac_code').val(' ').focus();
				_formValidation('请输入验证码');
				return false;
			}
			data.verifyCode = ac_code;
		}


		data.eventId = eventId;
		
		return true;
	}

};

var token;

function setToken(t) {
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

var alertDialog = null;
window._loading = function() {
	var txt = arguments[0];
	var callback;
	if(typeof arguments[1] != 'undefined') {
		callback = arguments[1];
	}
	alertDialog = gmu.Dialog({
		content : txt,
		closeBtn : false,
		width : 270,
		buttons : false,
		close: callback
	});
	alertDialog.open();
}

window._alert = function() {
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
			'关闭' : function() {
				this.close().destroy();
			}
		},
		close: callback
	});
}
window._formValidation = function (txt) {
	var formTips = $('<div class="form_tips animated fadeOut"></div>');
	$('body').append(formTips.html(txt));
}
$(document).ready(function() {
	active_info.init();
});

