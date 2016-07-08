function formatDate(date){
	return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
}

function showLoginInfo(){
	var html, tmpl;
	if (G.needBind) {
		tmpl = '<span>{hello}</span><a href="#" class="user_reg_bind" onclick="return openRegBindWin();">注册365日历账号并绑定</a>';
	} else {
		tmpl = '<span>{hello}</span>{username}</a>';
	}
	html = $.format(tmpl, $.extend({}, {
		hello: getHello(G.currDate)
	}, G.currUser));
	$('#p_userinfo').html(html);
	$('#dd_userinfo').click(function(evt){
		evt.stopPropagation();
		if (evt.target.nodeName != 'A') {
			var $div = $('div.set_select', this);
			if ($div.stop(true, true).fadeToggle().is(':visible')) {
				$('body').one('click', function(){
					$div.stop(true, true).fadeToggle();
				});
			}
		}
	});
	$('#sp_userinfo').html(getHello(G.currDate) + ' ' + G.currUser.username);
}

function getHello(date){
	var hour = date.getHours(), text;
	if (hour < 6) {
		text = "凌晨好，";
	} else if (hour < 9) {
		text = "早上好，";
	} else if (hour < 12) {
		text = "上午好，";
	} else if (hour < 14) {
		text = "中午好，";
	} else if (hour < 17) {
		text = "下午好，";
	} else if (hour < 19) {
		text = "傍晚好，";
	} else if (hour < 22) {
		text = "晚上好，";
	} else {
		text = "深夜好，";
	}
	return text;
}

function openRegBindWin(){
	$.confirm('<form class="form_reg"><dl><dt>用  户  名：</dt><dd><input type="text" class="username" placeholder="请输入用户名，4~20个普通字符"/></dd><dt>密码：</dt><dd><input type="password" class="password"/></dd><dd class="hint">(6-20位)</dd><dt>重复密码：</dt><dd><input type="password" class="cfmpassword"/></dd><dd class="message"></dd></dl></form>', {
		title: '注册365日历账号并绑定',
		width: 420,
		height: 280,
		create: function(event, ui){
			var $div = $(this), $form = $div.find('form'), $uname = $form.find('input.username'), $pwd = $form.find('input.password'), $cfmPwd = $form.find('input.cfmpassword');
			$uname.placeholder();
		},
		buttons: [{
			text: "绑定",
			click: function(){
				var $div = $(this), $form = $div.find('form');
				var $uname = $form.find('input.username'), $pwd = $form.find('input.password'), $cfmPwd = $form.find('input.cfmpassword');
				var $msg = $form.find('dd.message');
				var uname = $uname.val(), pwd = $pwd.val(), cfmpwd = $cfmPwd.val();
				
				if (uname.length == 0) { return $msg.html("请输入用户名！"), $uname.focus().select(); } else if (uname.length < 4 || uname.length > 20) { return $msg.html("用户名长度应在4至20位之间！"), $uname.focus().select(); } else if (null != uname.match(/[`,\.;\/\\'" \t\r\n<>\?~!@#\$%\^&\*\(\)\[\]\{\}\+\-\|]/ig)) { return $msg.html("用户名不能含有特殊字符！"), $uname.focus().select(); }
				if (pwd.length == 0) { return $msg.html("请输入密码！"), $pwd.focus().select(); } else if (pwd.length < 6 || pwd.length > 20) { return $msg.html("密码长度应为6-20位！"), $pwd.focus().select(); } else if (pwd != cfmpwd) { return $msg.html("两次密码输入不一致！"), $cfmPwd.focus().select(); }
				$msg.html("");
				
				$.ajax({
					type: 'post',
					url: '/account/checkUsername4Bind.do',
					data: {
						username: uname
					},
					success: function(result){
						if (result.state == 'usernameExist') {
							$msg.html("该名称已被占用！");
							$("#div_reg").find(".tip")[0].innerHTML = "该名称已被占用！";
						} else if (result.state == 'success') {
							$msg.html("");
							$.ajax({
								url: '/main/bind-365-reg.do',
								type: 'POST',
								dataType: 'json',
								data: {
									username: uname,
									password: pwd
								},
								success: function(data){
									if (data == "success") {
										location.reload();
									} else {
										$msg.html("对不起，系统异常，请稍后重试！");
									}
								}
							});
						} else if (result.state == 'emptyUsername') {
							$msg.html("该名称已被占用！");
						} else {
							$msg.html("对不起，系统异常，请稍后重试！");
						}
					}
				});
				
			}
		}]
	});
	return false;
}

(function(){
	var rRoute, rFormat;
	/**
	 * 在一个对象中查询指定路径代表的值，找不到时返回undefined
	 * @param {Object} obj 被路由的对象
	 * @param {Object} path 路径
	 */
	$.route = function(obj, path){
		obj = obj || {};
		var m;
		(rRoute || (rRoute = /([\d\w_]+)/g)).lastIndex = 0;
		while ((m = rRoute.exec(path)) !== null) {
			obj = obj[m[0]];
			if (obj == undefined) {
				break
			}
		}
		return obj
	};
	/**
	 * 格式化一个字符串
	 */
	$.format = function(){
		var args = $.makeArray(arguments), str = String(args.shift() || ""), ar = [], first = args[0];
		args = $.isArray(first) ? first : typeof(first) == 'object' ? args : [args];
		$.each(args, function(i, o){
			ar.push(str.replace(rFormat || (rFormat = /\{([\d\w\.]+)\}/g), function(m, n, v){
				v = n === 'INDEX' ? i : n.indexOf(".") < 0 ? o[n] : $.route(o, n);
				return v === undefined ? m : ($.isFunction(v) ? v.call(o, n) : v)
			}));
		});
		return ar.join('');
	};
	var rlenw = /[^\x00-\xff]/g;
	/**
	 * 计算字符串的字节长度
	 * @param {Object} str
	 */
	$.lenW = function(str){
		return str.replace(rlenw, "**").length;
	};
	/**
	 * 对一个字符串截取指定字节长度
	 * @param {Object} str  被截取的字符串
	 * @param {Object} bitLen   字节长度
	 * @param {Object} tails   补充结尾字符串
	 */
	$.ellipsis = function(str, bitLen, tails){
		str = String(str);
		if (isNaN(bitLen -= 0)) { return str; }
		var len = str.length, i = Math.min(Math.floor(bitLen / 2), len), cnt = $.lenW(str.slice(0, i));
		for (; i < len && cnt < bitLen; i++) {
			cnt += 1 + (str.charCodeAt(i) > 255);
		}
		return str.slice(0, cnt > bitLen ? i - 1 : i) + (i < len ? (tails || '') : '');
	};
	/**
	 * 随机方法，不传参数时，返回一个[0,1)随机数
	 * 			传一个参数时，表示传入的数组，在数组中随机取一个元素
	 * 			传两个参数时，表示一个区间，返回这个[a, b)区间里的数值
	 * @param {Object} a
	 * @param {Object} b
	 */
	$.r = function(a, b){
		var r = Math.random(), l = arguments.length;
		return l == 2 ? (a + Math.floor(r * (b - a))) : l == 1 ? a[Math.floor(r * a.length)] : r;
	};
	/**
	 * 将一个数组随机排序
	 * @param {Object} ar
	 */
	$.randomArray = function(ar){
		var rslt = [], len;
		while (len = ar.length) {
			rslt.push(ar.splice(Math.floor(Math.random() * len), 1)[0]);
		}
		return rslt;
	};
	/**
	 * 判断一个数组是不是等差数列
	 */
	$.isProgression = function(ar){
		if (ar.length < 2) { return false; }
		ar = ar.slice();
		for (var first = ar.shift(), delta = ar[0] - first, i = 1, l = ar.length; i < l; i++) {
			if (ar[i] - ar[i - 1] != delta) { return false; }
		}
		return true;
	};
})();

jQuery.cookie = function(name, value, options){
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

(function(){
	var queryJson, str;
	/**
	 * 从url中取得参数的值
	 * @param {Object} name
	 */
	$.query = function(name){
		if (!queryJson) {
			queryJson = {};
			if (str = location.search.slice(1) + '&' + location.hash.slice(1)) {
				$.each(str.split('&'), function(i, s, key, value){
					s = s.split('='), key = s[0], value = s[1];
					if (key in queryJson) {
						if ($.isArray(queryJson[key])) {
							queryJson[key].push(value);
						} else {
							queryJson[key] = [queryJson[key], value];
						}
					} else {
						queryJson[key] = value;
					}
				});
			}
		}
		return queryJson[name];
	};
})();

$.alert = function(content, opt){
	opt = $.extend(true, {
		modal: true,
		title: '温馨提示',
		buttons: {
			'确定': function(){
				$(this).dialog("close");
			}
		}
	}, opt);
	$(['<div class="dialog-content">', content, '</div>'].join('')).dialog(opt);
};

$.confirm = function(content, opt){
	opt = $.extend(true, {
		modal: true,
		title: '温馨提示',
		buttons: [{
			text: "确定",
			click: function(){
				$(this).dialog("close");
			}
		}, {
			text: "取消",
			click: function(){
				$(this).dialog("close");
			}
		}]
	}, opt);
	$(['<div class="dialog-content">', content, '</div>'].join('')).dialog(opt);
};

(function(){
	$.loading = function(){
		var html = '<img id="img_loading" src="/images/cal365_default/loading.gif" style="width:100px;height:100px;"/>';
		$(html).appendTo('body').position({
			of: 'body'
		});
	};
	$.loading.close = function(){
		$('#img_loading').remove();
	};
	$.loading.is = function(){
		return $('#img_loading:visible').size();
	}
})();

$.widget("mxx.ctrlEnter", {
	options: {
		action: null,
		noCtrl: false
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$elem.keypress(function(evt){
			if ((opt.noCtrl && !evt.ctrlKey || evt.ctrlKey) && (evt.which == 13 || evt.which == 10)) {
				if ($.isFunction(opt.action)) {
					opt.action = $.proxy(opt.action, this)()
				} else {
					$(opt.action).triggerHandler('click');
				}
			}
		});
	}
});

$.widget('mxx.placeholder', {
	options: {
		attr: 'placeholder',
		holdingClass: 'holding',
		value: ''
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.holdText = $elem.attr(opt.attr);
		if (!$.browser.msie) { return; }
		$elem.focus(function(evt){
			var val = $elem.val();
			if (val == '' || val == self.holdText) {
				$elem.val('');
			}
			$elem.removeClass(opt.holdingClass);
		}).on('drop', function(evt){
			var val = $elem.val();
			if (val == '' || val == self.holdText) {
				$elem.val('');
			}
		}).blur(function(evt){
			var val = $elem.val();
			if (val == '' || val == self.holdText) {
				$elem.val(self.holdText).addClass(opt.holdingClass);
			} else {
				$elem.removeClass(opt.holdingClass);
			}
		}).blur();
	},
	val: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return $elem.val() == this.holdText ? '' : $elem.val();
	}
});


$.widget('mxx.input', {
	options: {
		onInput: $.noop
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var prevValue = $elem.val(), onValueChange = function(evt){
			var value = $.trim($elem.val());
			if (prevValue != value) {
				opt.onInput.call($elem, value);
				prevValue = value;
			}
		};
		$elem.keyup(onValueChange).change(onValueChange).on('dropend', onValueChange);
	}
});

$.getDPOptions = function(opt){
	return $.extend({
		closeText: '关闭',
		prevText: '&#x3C;上月',
		nextText: '下月&#x3E;',
		currentText: '今天',
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'
	}, opt)
};

(function(a){
	function d(b){
		var c = b || window.event, d = [].slice.call(arguments, 1), e = 0, f = !0, g = 0, h = 0;
		return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), h = e, c.axis !== undefined && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e), c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120), c.wheelDeltaX !== undefined && (g = -1 * c.wheelDeltaX / 120), d.unshift(b, e, g, h), (a.event.dispatch || a.event.handle).apply(this, d)
	}
	var b = ["DOMMouseScroll", "mousewheel"];
	if (a.event.fixHooks) {
		for (var c = b.length; c;) 
			a.event.fixHooks[b[--c]] = a.event.mouseHooks;
	}
	a.event.special.mousewheel = {
		setup: function(){
			if (this.addEventListener) for (var a = b.length; a;) 
				this.addEventListener(b[--a], d, !1);
			else this.onmousewheel = d
		},
		teardown: function(){
			if (this.removeEventListener) for (var a = b.length; a;) 
				this.removeEventListener(b[--a], d, !1);
			else this.onmousewheel = null
		}
	};
	a.fn.extend({
		mousewheel: function(a){ return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")} ,
		unmousewheel: function(a){ return this.unbind("mousewheel", a)} }
);
})(jQuery);

$.widget('mxx.loading', {
	options: {
		speed: 500
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.loadingTimer = null;
		this.oriText = $elem.text();
		$elem.click(function(evt){
			$elem.hasClass('loading') && evt.stopImmediatePropagation();
		});
	},
	start: function(){
		var self = this, $elem = $(this.element), opt = this.options, i = 0, str = '...';
		$elem.addClass('loading');
		this.loadingTimer = setInterval(function(){
			$elem.html(self.oriText + str.slice(0, i++ % 3 + 1));
		}, opt.speed);
	},
	end: function(){
		var self = this, $elem = $(this.element), opt = this.options, i = 1;
		$elem.removeClass('loading');
		clearInterval(this.loadingTimer);
		$elem.html(self.oriText);
	},
	is: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return $elem.hasClass('loading');
	}
});

/**
 * 和颜色相关的算法
 */
function uniform(color){
	if (String(color).slice(0, 3) == 'rgb') {
		var ar = color.slice(4, -1).split(','), r = parseInt(ar[0]), g = parseInt(ar[1]), b = parseInt(ar[2]);
		return ['#', r < 16 ? '0' : '', r.toString(16), g < 16 ? '0' : '', g.toString(16), b < 16 ? '0' : '', b.toString(16)].join('');
	}
	return color;
}

function hslToRgb(h, s, l){
	var r, g, b;
	if (s == 0) {
		r = g = b = l;
	} else {
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return uniform(['rgb(', Math.round(r * 255), ', ', Math.round(g * 255), ', ', Math.round(b * 255), ')'].join(''));
}

function rgbToHsl(r, g, b){
	if (typeof(r) == 'string') { return arguments.callee.apply(null, convertHexColor(r)); }
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b), h = 0, s = 0, l = (max + min) / 2, d, sum = max + min;
	if (d = max - min) {
		s = l > 0.5 ? d / (2 - sum) : d / sum;
		h = (max == r ? ((g - b) / d + (g < b ? 6 : 0)) : max == g ? ((b - r) / d + 2) : ((r - g) / d + 4)) / 6;
	}
	return [h, s, l];
}

function hue2rgb(p, q, t){
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}

function convertHexColor(color){
	color = String(color || '');
	color.charAt(0) == '#' && (color = color.substring(1));
	color.length == 3 && (color = color.replace(/([0-9a-f])/ig, '$1$1'));
	return color.length == 6 ? [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)] : [0, 0, 0];
}

function isPCVersion(){
	if ($.browser.webkit) {
		try {
			js365.runScriptDeskWnd('+new Date()');
			return true;
		} catch (ex) {
		}
	}
	return false;
}
