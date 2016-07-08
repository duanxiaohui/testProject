/**
 * logic for a_141015
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-10-15 15:56:07
 */

(function () {
	function init() {
		if(token !== null){
			xheader["x-365rili-key"] = token;
		}
		$.ajax({
			url: '/event/filmLottery/result.do',
			type: 'GET',
			dataType: 'json',
			headers: xheader,
			success: function (data) {
				if(data.state == 'failed'){
					_alert('您的网络不太稳定，请重新访问');
				}
				switch (data.status) {
					case 0: 
						status1();
						break;
					case 1: 
						status2(data['ticketPasswd']);
						break;
					case 2: 
						status3();
						break;
				}
			},
			error: function () {
				_alert('您的网络不太稳定，请重新访问');
			}
		});
		
	}

	var mar = null;
	function goClock() {
		try{
			clearTimeout(mar)
		}
		catch(e){};
		var _btn = $('#js-checkcellphone');
		var _num = +_btn.html();
		_btn.html(--_num);

		if(_num > 0){
			mar = setTimeout(goClock, 1000);
		}
		else{
			_btn.html('发送验证码').removeClass('goclock').on('click', checkPhone);
		}
	}

	function checkPhone () {
		var _input = $('#cphone');
		var _val = _input.val();
		if(_val == '' || !/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(_val)){
			_input.val('');
			_input.focus();
			return false;
		}
		$('#js-checkcellphone').off('click').addClass('goclock');
		$.ajax({
			url: '/event/filmLottery/sendVerifyCode.do',
			type: 'GET',
			dataType: 'json',
			headers: xheader,
			data: {
				cellphone: _val
			},
			success: function (data) {
				if(data.state == 'failed'){
					$('#js-checkcellphone').on('click', checkPhone).removeClass('goclock');
					_alert('验证码发送失败，请重试');
				}
				else if(data.status == 1){
					$('#js-checkcellphone').on('click', checkPhone).removeClass('goclock');
					_alert('该手机号码已使用');
				}
				else{
					$('#js-checkcellphone').html('60');
					$('#js-phoneTip').show();
					goClock();
				}
			},
			error: function () {
				$('#js-checkcellphone').on('click', checkPhone).removeClass('goclock');
				_alert('验证码发送失败，请重试');
			}
		});
	}

	function grabbing () {
		var _input = $('#code');
		var _val = _input.val();
		if(_val == ''){
			_input.val('');
			_input.focus();
			return false;
		}

		$(this).off('click').addClass('goclock');
		var _this = this;
		$.ajax({
			url: '/event/filmLottery/lottery.do',
			type: 'GET',
			dataType: 'json',
			headers: xheader,
			data: {
				verifyCode: _val
			},
			success: function (data) {
				if(data.state == 'failed'){
					$(this).removeClass('goclock').on('click', grabbing);
					_alert('您的网络不太稳定，请重新访问');
				}
				else{
					switch (data.status) {
						case 1: 
							$('.move_box').addClass('none');
							status2(data['ticketPasswd']);
							break;
						case 2: 
							$('.move_box').addClass('none');
							status3();
							break;
						case 3: 
							$(_this).removeClass('goclock').on('click', grabbing);
							_alert('您输入的验证码有误');
							break;
					}
				}
			},
			error: function () {
				$(this).removeClass('goclock').on('click', grabbing);
				_alert('您的网络不太稳定，请重新访问');
			}
		});
	}

	var mar1 = null;
	function goClock1() {
		clearTimeout(mar1);
		var _btn = $('#js-sendagine');
		var _num = +_btn.html().split(' ')[0];
		_btn.html(--_num + ' 秒后可重新发送');

		if(_num > 0){
			mar1 = setTimeout(goClock1, 1000);
		}
		else{
			_btn.html('点我再次发送').css('color','#208de9').on('click', send);
		}
	}

	function send () {
		$('#js-sendagine').off('click').css('color', '#999');
		$.ajax({
			url: '/event/filmLottery/sendTicket.do',
			type: 'GET',
			dataType: 'json',
			headers: xheader,
			success: function (data) {
				if(data.state == 'failed'){
					$('#js-sendagine').on('click', send).css('color', '#208de9');
					_alert('您的网络不太稳定，请重新访问');
				}
				else{
					$('#js-sendagine').html('60 秒后可重新发送');
					_alert('信息已发送至您手机');
					goClock1();
				}
			},
			error: function () {
				$('#js-sendagine').on('click', send).css('color', '#208de9');
				_alert('您的网络不太稳定，请重新访问');
			}
		});	}

	function status1 () {
		$('.move_box').removeClass('none');
		$('#js-checkcellphone').on('click', checkPhone);
		$('#js-grabbing').on('click', grabbing)
	}

	function status2 (ticNum) {
		$('.snag').removeClass('none')
		$('.ticket_num').html('<p><span>票券密码：</span>' + ticNum + '</p>')
		$('#js-sendagine').on('click', send);
	}

	function status3 () {
		$('.nsnag').removeClass('none')
	}

	var token = null;
	var xheader = {};
	window.setToken = function (t) {
		token = t;
		init();
	};

	if (/android/i.test(navigator.userAgent)) {
		if(typeof AliansBridge != "undefined"){
			token =  AliansBridge.getToken();
			init();
		}
	}
	//如果不是在手机客户端内
	if (navigator.userAgent.toLowerCase().match(/micromessenger/i) == "micromessenger") {
		init();
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
})();