if (typeof JSON !== 'object') {
	JSON = {};
}
(function(){
	'use strict';
	function f(n){
		return n < 10 ? '0' + n : n;
	}
	if (typeof Date.prototype.toJSON !== 'function') {
		Date.prototype.toJSON = function(key){
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key){
			return this.valueOf();
		};
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	}, rep;
	function quote(string){
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function(a){
			var c = meta[a];
			return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + string + '"';
	}
	function str(key, holder){
		var i, k, v, length, mind = gap, partial, value = holder[key];
		if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}
		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}
		switch (typeof value) {
			case 'string':
				return quote(value);
			case 'number':
				return isFinite(value) ? String(value) : 'null';
			case 'boolean':
			case 'null':
				return String(value);
			case 'object':
				if (!value) { return 'null'; }
				gap += indent;
				partial = [];
				if (Object.prototype.toString.apply(value) === '[object Array]') {
					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || 'null';
					}
					v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
					gap = mind;
					return v;
				}
				if (rep && typeof rep === 'object') {
					length = rep.length;
					for (i = 0; i < length; i += 1) {
						if (typeof rep[i] === 'string') {
							k = rep[i];
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				} else {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}
				v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
				gap = mind;
				return v;
		}
	}
	if (typeof JSON.stringify !== 'function') {
		JSON.stringify = function(value, replacer, space){
			var i;
			gap = '';
			indent = '';
			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}
			} else if (typeof space === 'string') {
				indent = space;
			}
			rep = replacer;
			if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {   throw new Error('JSON.stringify'); }
			return str('', {
				'': value
			});
		};
	}
	if (typeof JSON.parse !== 'function') {
		JSON.parse = function(text, reviver){
			var j;
			function walk(holder, key){
				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}
			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function(a){
					return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}
			if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
				j = eval('(' + text + ')');
				return typeof reviver === 'function' ? walk({
					'': j
				}, '') : j;
			}
			throw new SyntaxError('JSON.parse');
		};
	}
}());
function formatDate(date){
	return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
}

function showLoginInfo(){
	var html, tmpl;
	if (G.needBind) {
		tmpl = '<span>{hello}</span><a href="#" class="user_reg_bind" onclick="return openRegBindWin();">注册365日历账号并绑定</a><a href="/account/logout.do" class="user_quit" title="退出登录"></a>';
	} else {
		tmpl = '<span>{hello}</span>{username}<a href="/account/manage.do" class="user_set" title="设置个人资料"></a><a href="/account/logout.do" class="user_quit" title="退出登录"></a>';
	}
	html = $.format(tmpl, $.extend({}, {
		hello: getHello(G.currDate)
	}, G.currUser));
	$('#dd_userinfo').html(html);
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
		text = "夜里好，";
	}
	return text;
}

function openRegBindWin(){
	$.confirm('<form class="form_reg"><dl><dt>用  户  名：</dt><dd><input type="text" class="username" placeholder="请输入用户名，4~20个普通字符"/></dd><dt>密码：</dt><dd><input type="password" class="password"/></dd><dd class="hint">(6-20位)</dd><dt>重复密码：</dt><dd><input type="password" class="cfmpassword"/></dd><dd class="message"></dd></dl></form>', {
		title: '注册365日历账号并绑定',
		width: 400,
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
		dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
		dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		showMonthAfterYear: true,
		firstDay: 1,
		selectOtherMonths: true,
		showOtherMonths: true,
		dateFormat: 'yy-mm-dd',
		nextText: '下个月',
		prevText: '上个月'
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
/**
 * 日历类
 * @param {Object} date
 */
function Calendar(date){
	this.date = date ? new Date(+date) : (G.currDate || new Date);
}

Calendar.prototype = {
	getMonthFirstDate: function(){
		var date = new Date(+this.date);
		date.setDate(1);
		return date;
	},
	getCalendarFirstDate: function(){
		var date = this.getMonthFirstDate(), day = date.getDay(), ar = [-6, 0, -1, -2, -3, -4, -5];
		date.setDate(date.getDate() + ar[day]);
		return date;
	}
};
(function(){
	function lunar(oDate){
		var d = new Date(oDate);
		if (+d < -10233222336000) {
			return null;
		}
		return new Lunar(d);
	}
	function Lunar(oDate){
		this.oDate = oDate;
		this.julianDay = JulianDay.fromDate(this.oDate);
		this.cnDay = this.oDate.getDay() ? DB.digitCN[this.oDate.getDay()] : '日';
		var mjd = this.mjd = this.julianDay - JulianDay.JD2000;
		var arTerm = this.terms = Term.getTerms(mjd);
		var arNewMoon = this.newMoons = NewMoon.getNewMoons(arTerm);
		for (var days = Math.round(mjd - arNewMoon[0].JD), i = 0, o; i < arNewMoon.length; i++) {
			o = arNewMoon[i];
			if (days < o.days) {
				this.isBigMonth = o.days == 30;
				this.isLeap = o.isLeap;
				this.monthIndex = (o.index + 10) % 12;
				this.lMonth = o.name;
				this.lNextMonth = o.nextName;
				this.lDate = DB.dateCn[days];
				this.dateIndex = days;
				break;
			} else {
				days -= o.days;
			}
		}
		mjd = Math.round(mjd);
		this.lYear = Math.floor((arTerm[3].JD + (mjd < arTerm[3].JD ? -365 : 0) + 365.25 * 16 - 35) / 365.2422 + 0.5);
		var t = arNewMoon[arNewMoon.zyIndex].JD;
		t -= mjd < t ? 365 : 0;
		t += 5810;
		this.sYear = Math.floor(t / 365.2422 + 0.5);
		this.hYear = this.sYear + 1984 + 2698;
		var t = arTerm.hash[mjd];
		this.term = t ? t.name : '';
		var t = this.lYear + 6000;
		this.animal = DB.chineseZodiac[t % 12];
		this.gzYear = DB.heavenlyStems[t % 10] + DB.earthlyBranches[t % 12];
		var t = Math.floor((mjd - arTerm[0].JD) / 30.43685);
		t < 12 && mjd >= arTerm[2 * t + 1].JD && t++;
		t += Math.floor((arTerm[12].JD + 390) / 365.2422) * 12 + 900000;
		this.gzMonth = DB.heavenlyStems[t % 10] + DB.earthlyBranches[t % 12];
		var t = mjd - 6 + 9000000;
		this.gzDate = DB.heavenlyStems[t % 10] + DB.earthlyBranches[t % 12];
		this.gzChrono = DB.earthlyBranches[Math.floor((this.oDate.getHours() + 1) / 2)] || '子';
	}
	var DB = Lunar.DB = {
		digitCN: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
		heavenlyStems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
		earthlyBranches: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
		chineseZodiac: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
		term: ['冬至', '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', 
		'小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪'],
		monthCn: ['十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
		dateCn: ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一']
	};
	var NewMoon = {
		correction: unzip('EqoFscDcrFpmEsF1DfFideFelFpFfFfFiaipqti3ksttikptikqckstekqttgkqttgkqteksttikptikq1fjstgjqttjkqttgkqtekstfkptikq1tijstgjiFkirFsAeACoFsiDaDiADc3AFbBfgdfikijFifegF3FhaikgFag3E1btaieeibggiffdeigFfqDfaiBkF3kEaikhkigeidhhdiegcFfakF3ggkidbiaedksaFffckekidhhdhdikcikiakicjF3deedFhFccgicdekgiFbiaikcfi3kbFibefgEgFdcFkFeFkdcfkF3kfkcickEiFkDacFiEfbiaejcFfffkhkdgkaiei3ehigikhdFikfckF3dhhdikcfgjikhfjicjicgiehdikcikggcifgiejF3jkieFhegikggcikFegiegkfjebhigikggcikdgkaFkijcfkcikfkcifikiggkaeeigefkcdfcfkhkdgkegieidhijcFfakhfgeidieidiegikhfkfckfcjbdehdikggikgkfkicjicjF3dbidikFiggcifgiejkiegkigcdiegfggcikdbgfgefjF3kfegikggcikdgFkeeijcfkcikfkekcikdgkabhkFikaffcfkhkdgkegbiaekfkiakicjhfgqdq1fkiakgkfkhfkfcjiekgFebicggbedF3jikejbbbiakgbgkacgiejkijjgigfiakggfggcibFifjefjF3kfekdgjcibFeFkijcfkfhkfkeaieigekgbhkfikidfcjeaibgekgdkiffiffkiakF3jhbakgdki3dj3ikfkicjicjieeFkgdkicggkighdF3jfgkgfgbdkicggfggkidFkiekgijkeigfiskiggfaidheigF3jekijcikickiggkidhhdbgcfkFikikhkigeidieFikggikhkffaffijhidhhakgdkhkijF3kiakF3kfheakgdkifiggkigicjiejkieedikgdfcggkigieeiejfgkgkigbgikicggkiaideeijkefjeijikhkiggkiaidheigcikaikffikijgkiahi3hhdikgjfifaakekighie3hiaikggikhkffakicjhiahaikggikhkijF3kfejfeFhidikggiffiggkigicjiekgieeigikggiffiggkidheigkgfjkeigiegikifiggkidhedeijcfkFikikhkiggkidhh3ehigcikaffkhkiggkidhh3hhigikekfiFkFikcidhh3hitcikggikhkfkicjicghiediaikggikhkijbjfejfeFhaikggifikiggkigiejkikgkgieeigikggiffiggkigieeigekijcijikggifikiggkideedeijkefkfckikhkiggkidhh3ehijcikaffkhkiggkidhh3hhigikhkikFikfckcidhh3hiaikgjikhfjicjicgiehdikcikggifikigiejfejkieFhegikggifikiggfghigkfjeijkhigikggifikiggkigieeijcijcikfksikifikiggkidehdeijcfdckikhkiggkhghh3ehijikifffffkhsFngErD3pAfBoDd3BlEtFqA1AqoEpDqElAEsEeB1BmADlDkqBtC3FnEpDqnEmFsFsAFnllBbFmDsDiCtDmAB1BmtCgpEplCpAEiBiEoFqFtEqsDcCnFtADnFlEgdkEgmEtEsCtDmADqFtAFrAtEcCqAE3BoFqC3F3DrFtBmFtAC1ACnFaoCgADcADcCcFfoFtDlAFgmFqBq1bpEoAEmkqnEeCtAE3bAEqgDfFfCrgEcBrACfAAABqAAB3AAClEnFeCtCgAADqDoBmtAAACbFiAAADsEtBqAB1FsDqpFqEmFsCeDtFlCeDtoEpClEqAAFrAFoCgFmFsFqEnAEcCqFeCtFtEnAEeFtAAEkFnErAABbFkADnAAeCtFeAfBoAEpFtAABtFqAApDcCGJ'),
		calcForLow: function(W){
			var v = 7771.37714500204, t = (W + 1.08472) / v, L;
			t -= (-0.0000331 * t * t + 0.10976 * Math.cos(0.785 + 8328.6914 * t) + 0.02224 * Math.cos(0.187 + 7214.0629 * t) - 0.03342 * Math.cos(4.669 + 628.3076 * t)) / v + (32 * (t + 1.8) * (t + 1.8) - 20) / 86400 / 36525;
			return t * 36525 + 8 / 24;
		},
		calcForHigh: function(W){
			var t = XL.MS_aLon_t2(W) * 36525;
			t = t - dt_T(t) + 8 / 24;
			var v = ((t + 0.5) % 1) * 86400;
			if (v < 1800 || v > 86400 - 1800) t = XL.MS_aLon_t(W) * 36525 - dt_T(t) + 8 / 24;
			return t;
		},
		cache: {},
		getNewMoons: function(terms){
			var jd = terms[0].JD, firstDay = NewMoon.calc(jd), ar = [];
			if (firstDay > jd) {
				firstDay -= 29.53;
			}
			if (NewMoon.cache[firstDay]) {
				ar = NewMoon.cache[firstDay];
			} else {
				for (var i = 0; i < 16; i++) {
					ar.push({
						JD: NewMoon.calc(firstDay + 29.5306 * i),
						index: i
					});
					if (i) {
						ar[i - 1].days = ar[i].JD - ar[i - 1].JD;
					}
				}
				if (ar[13].JD <= terms[24].JD) {
					for (i = 1; ar[i + 1].JD > terms[2 * i].JD && i < 13; i++) {
					}
					ar[i].isLeap = true;
					ar.leapIndex = i;
					for (; i < 16; i++) {
						ar[i].index--;
					}
				}
				for (i = 0; i < 16; i++) {
					ar[i].name = (ar[i].isLeap ? '闰' : '') + DB.monthCn[ar[i].index % 12];
					if (ar[i + 1]) {
						ar[i].nextName = (ar[i + 1].isLeap ? '闰' : '') + DB.monthCn[ar[i + 1].index % 12];
					}
					if (ar.zyIndex == undefined && ar[i].index == 2) {
						ar.zyIndex = i;
					}
				}
				NewMoon.cache[firstDay] = ar;
			}
			return ar;
		},
		calc: function(jd){
			jd += JulianDay.JD2000;
			var D, n, pc = 14, JDstart = 1947168.00, JD1960 = 2436935;
			if (jd >= JD1960) {
				return Math.floor(this.calcForHigh(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5);
			}
			if (jd >= JDstart && jd < JD1960) {
				D = Math.floor(this.calcForLow(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5);
				n = this.correction.substr(Math.floor((jd - JDstart) / 29.5306), 1) - 0;
				return D + (n ? n - 2 : n);
			}
		}
	};
	var Term = {
		correction: unzip('FrcFs11AFsckF1tsDtFqEtF3posFdFgiFseFtmelpsEfhkF1anmelpFlF3ikrotcnEqEq1FfqmcDsrFor11FgFrcgDscFs11FgEeFtE1sfFs11sCoEsaF1tsD3FpeE1eFsssEciFsFnmelpFcFhkF1tcnEqEpFgkrotcnEqrEtFermcDsrE111FgBmcmr11DaEfnaF111sD3FpeForeF1tssEfiFpEoeFssD3iFstEqFppDgFstcnEqEpFg33FscnEqrAoAF1ClAEsDmDtCtBaDlAFbAEpAAAAAD1FgBiBqoBbnBaBoAAAAAAAEgDqAdBqAFrBaBoACdAAf3AACgAAAeBbCamDgEifAE1AABa3C3BgFdiAAACoCeE3ADiEifDaAEqAAFe3AcFbcAAAAAF3iFaAAACpACmFmAAAAAAAACrDaAAADG0'),
		calcForLow: function(W){
			var t, L, v = 628.3319653318;
			t = (W - 4.895062166) / v;
			t -= (53 * t * t + 334116 * Math.cos(4.67 + 628.307585 * t) + 2061 * Math.cos(2.678 + 628.3076 * t) * t) / v / 10000000;
			L = 48950621.66 + 6283319653.318 * t + 53 * t * t + 334166 * Math.cos(4.669257 + 628.307585 * t) + 3489 * Math.cos(4.6261 + 1256.61517 * t) + 2060.6 * Math.cos(2.67823 + 628.307585 * t) * t - 994 - 834 * Math.sin(2.1824 - 33.75705 * t);
			t -= (L / 10000000 - W) / 628.332 + (32 * (t + 1.8) * (t + 1.8) - 20) / 86400 / 36525;
			return t * 36525 + 8 / 24;
		},
		getNearestWinter: function(jd){
			var winterDay = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355;
			Term.calc(winterDay) > jd && (winterDay -= 365.2422);
			return winterDay;
		},
		cache: {},
		getTerms: function(jd){
			var winterDay = Term.getNearestWinter(jd), ar = [];
			if (Term.cache[winterDay]) {
				ar = Term.cache[winterDay];
			} else {
				ar.hash = {};
				for (var i = 0, o; i < 25; i++) {
					o = {
						JD: Term.calc(winterDay + 15.2184 * i),
						name: DB.term[i % 24]
					};
					ar.push(o);
					ar.hash[o.JD] = o;
				}
				Term.cache[winterDay] = ar;
			}
			return ar;
		},
		calcForHigh: function(W){
			var t = XL.S_aLon_t2(W) * 36525;
			t = t - dt_T(t) + 8 / 24;
			var v = ((t + 0.5) % 1) * 86400;
			if (v < 1200 || v > 86400 - 1200) {
				t = XL.S_aLon_t(W) * 36525 - dt_T(t) + 8 / 24;
			}
			return t;
		},
		calc: function(jd){
			jd += JulianDay.JD2000;
			var i, D, n, pc = 7, JDstart = 2322147.76, JD1960 = 2436935;
			if (jd >= JD1960) {
				return Math.floor(this.calcForHigh(Math.floor((jd + pc - 2451259) / 365.2422 * 24) * Math.PI / 12) + 0.5);
			}
			if (jd >= JDstart && jd < JD1960) {
				D = Math.floor(this.calcForLow(Math.floor((jd + pc - 2451259) / 365.2422 * 24) * Math.PI / 12) + 0.5);
				n = this.correction.substr(Math.floor((jd - JDstart) / 365.2422 * 24), 1) - 0;
				return D + (n ? n - 2 : n);
			}
		}
	};
	var JulianDay = {
		JD2000: 2451545,
		fromDate: function(oDate){
			var y = oDate.getFullYear(), m = oDate.getMonth() + 1, d = oDate.getDate() + ((oDate.getSeconds() / 60 + oDate.getMinutes()) / 60 + oDate.getHours()) / 24;
			var isGregory = y * 372 + m * 31 + Math.floor(d) >= 588829, numLeap = 0;
			if (m <= 2) {
				m += 12;
				y -= 1;
			}
			if (isGregory) {
				numLeap = Math.floor(y / 100);
				numLeap = 2 - numLeap + Math.floor(numLeap / 4);
			}
			return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + numLeap - 1524.5;
		}
	};
	var XL0_xzb = [-0.08631, +0.00039, -0.00008, -0.07447, +0.00006, +0.00017, -0.07135, -0.00026, -0.00176, -0.20239, +0.00273, -0.00347, -0.25486, +0.00276, +0.42926, +0.24588, +0.00345, -14.46266, -0.95116, +0.02481, +58.30651];
	var XL0 = new Array(new Array(10000000000, 20, 578, 920, 1100, 1124, 1136, 1148, 1217, 1226, 1229, 1229, 1229, 1229, 1937, 2363, 2618, 2633, 2660, 2666, 17534704567, 0.00000000000, 0.00000000000, 334165646, 4.669256804, 6283.075849991, 3489428, 4.6261024, 12566.1517000, 349706, 2.744118, 5753.384885, 341757, 2.828866, 3.523118, 313590, 3.627670, 77713.771468, 267622, 4.418084, 7860.419392, 234269, 6.135162, 3930.209696, 132429, 0.742464, 11506.769770, 127317, 2.037097, 529.690965, 119917, 1.109629, 1577.343542, 99025, 5.23268, 5884.92685, 90186, 2.04505, 26.29832, 85722, 3.50849, 398.14900, 77979, 1.17883, 5223.69392, 75314, 2.53339, 5507.55324, 50526, 4.58293, 18849.22755, 49238, 4.20507, 775.52261, 35666, 2.91954, 0.06731, 31709, 5.84902, 11790.62909, 28413, 1.89869, 796.29801, 27104, 0.31489, 10977.07880, 24281, 0.34481, 5486.77784, 20616, 4.80647, 2544.31442, 20539, 1.86948, 5573.14280, 20226, 2.45768, 6069.77675, 15552, 0.83306, 213.29910, 13221, 3.41118, 2942.46342, 12618, 1.08303, 20.77540, 11513, 0.64545, 0.98032, 10285, 0.63600, 4694.00295, 10190, 0.97569, 15720.83878, 10172, 4.26680, 7.11355, 9921, 6.2099, 2146.1654, 9761, 0.6810, 155.4204, 8580, 5.9832, 161000.6857, 8513, 1.2987, 6275.9623, 8471, 3.6708, 71430.6956, 7964, 1.8079, 17260.1547, 7876, 3.0370, 12036.4607, 7465, 1.7551, 5088.6288, 7387, 3.5032, 3154.6871, 7355, 4.6793, 801.8209, 6963, 0.8330, 9437.7629, 6245, 3.9776, 8827.3903, 6115, 1.8184, 7084.8968, 5696, 2.7843, 6286.5990, 5612, 4.3869, 14143.4952, 5558, 3.4701, 6279.5527, 5199, 0.1891, 12139.5535, 5161, 1.3328, 1748.0164, 5115, 0.2831, 5856.4777, 4900, 0.4874, 1194.4470, 4104, 5.3682, 8429.2413, 4094, 2.3985, 19651.0485, 3920, 6.1683, 10447.3878, 3677, 6.0413, 10213.2855, 3660, 2.5696, 1059.3819, 3595, 1.7088, 2352.8662, 3557, 1.7760, 6812.7668, 3329, 0.5931, 17789.8456, 3041, 0.4429, 83996.8473, 3005, 2.7398, 1349.8674, 2535, 3.1647, 4690.4798, 2474, 0.2148, 3.5904, 2366, 0.4847, 8031.0923, 2357, 2.0653, 3340.6124, 2282, 5.2220, 4705.7323, 2189, 5.5559, 553.5694, 2142, 1.4256, 16730.4637, 2109, 4.1483, 951.7184, 2030, 0.3713, 283.8593, 1992, 5.2221, 12168.0027, 1986, 5.7747, 6309.3742, 1912, 3.8222, 23581.2582, 1889, 5.3863, 149854.4001, 1790, 2.2149, 13367.9726, 1748, 4.5605, 135.0651, 1622, 5.9884, 11769.8537, 1508, 4.1957, 6256.7775, 1442, 4.1932, 242.7286, 1435, 3.7236, 38.0277, 1397, 4.4014, 6681.2249, 1362, 1.8893, 7632.9433, 1250, 1.1305, 5.5229, 1205, 2.6223, 955.5997, 1200, 1.0035, 632.7837, 1129, 0.1774, 4164.3120, 1083, 0.3273, 103.0928, 1052, 0.9387, 11926.2544, 1050, 5.3591, 1592.5960, 1033, 6.1998, 6438.4962, 1001, 6.0291, 5746.2713, 980, 0.999, 11371.705, 980, 5.244, 27511.468, 938, 2.624, 5760.498, 923, 0.483, 522.577, 922, 4.571, 4292.331, 905, 5.337, 6386.169, 862, 4.165, 7058.598, 841, 3.299, 7234.794, 836, 4.539, 25132.303, 813, 6.112, 4732.031, 812, 6.271, 426.598, 801, 5.821, 28.449, 787, 0.996, 5643.179, 776, 2.957, 23013.540, 769, 3.121, 7238.676, 758, 3.974, 11499.656, 735, 4.386, 316.392, 731, 0.607, 11513.883, 719, 3.998, 74.782, 706, 0.323, 263.084, 676, 5.911, 90955.552, 663, 3.665, 17298.182, 653, 5.791, 18073.705, 630, 4.717, 6836.645, 615, 1.458, 233141.314, 612, 1.075, 19804.827, 596, 3.321, 6283.009, 596, 2.876, 6283.143, 555, 2.452, 12352.853, 541, 5.392, 419.485, 531, 0.382, 31441.678, 519, 4.065, 6208.294, 513, 2.361, 10973.556, 494, 5.737, 9917.697, 450, 3.272, 11015.106, 449, 3.653, 206.186, 447, 2.064, 7079.374, 435, 4.423, 5216.580, 421, 1.906, 245.832, 413, 0.921, 3738.761, 402, 0.840, 20.355, 387, 1.826, 11856.219, 379, 2.344, 3.881, 374, 2.954, 3128.389, 370, 5.031, 536.805, 365, 1.018, 16200.773, 365, 1.083, 88860.057, 352, 5.978, 3894.182, 352, 2.056, 244287.600, 351, 3.713, 6290.189, 340, 1.106, 14712.317, 339, 0.978, 8635.942, 339, 3.202, 5120.601, 333, 0.837, 6496.375, 325, 3.479, 6133.513, 316, 5.089, 21228.392, 316, 1.328, 10873.986, 309, 3.646, 10.637, 303, 1.802, 35371.887, 296, 3.397, 9225.539, 288, 6.026, 154717.610, 281, 2.585, 14314.168, 262, 3.856, 266.607, 262, 2.579, 22483.849, 257, 1.561, 23543.231, 255, 3.949, 1990.745, 251, 3.744, 10575.407, 240, 1.161, 10984.192, 238, 0.106, 7.046, 236, 4.272, 6040.347, 234, 3.577, 10969.965, 211, 3.714, 65147.620, 210, 0.754, 13521.751, 207, 4.228, 5650.292, 202, 0.814, 170.673, 201, 4.629, 6037.244, 200, 0.381, 6172.870, 199, 3.933, 6206.810, 199, 5.197, 6262.300, 197, 1.046, 18209.330, 195, 1.070, 5230.807, 195, 4.869, 36.028, 194, 4.313, 6244.943, 192, 1.229, 709.933, 192, 5.595, 6282.096, 192, 0.602, 6284.056, 189, 3.744, 23.878, 188, 1.904, 15.252, 188, 0.867, 22003.915, 182, 3.681, 15110.466, 181, 0.491, 1.484, 179, 3.222, 39302.097, 179, 1.259, 12559.038, 62833196674749, 0.000000000000, 0.000000000000, 20605886, 2.67823456, 6283.07584999, 430343, 2.635127, 12566.151700, 42526, 1.59047, 3.52312, 11926, 5.79557, 26.29832, 10898, 2.96618, 1577.34354, 9348, 2.5921, 18849.2275, 7212, 1.1385, 529.6910, 6777, 1.8747, 398.1490, 6733, 4.4092, 5507.5532, 5903, 2.8880, 5223.6939, 5598, 2.1747, 155.4204, 4541, 0.3980, 796.2980, 3637, 0.4662, 775.5226, 2896, 2.6471, 7.1135, 2084, 5.3414, 0.9803, 1910, 1.8463, 5486.7778, 1851, 4.9686, 213.2991, 1729, 2.9912, 6275.9623, 1623, 0.0322, 2544.3144, 1583, 1.4305, 2146.1654, 1462, 1.2053, 10977.0788, 1246, 2.8343, 1748.0164, 1188, 3.2580, 5088.6288, 1181, 5.2738, 1194.4470, 1151, 2.0750, 4694.0030, 1064, 0.7661, 553.5694, 997, 1.303, 6286.599, 972, 4.239, 1349.867, 945, 2.700, 242.729, 858, 5.645, 951.718, 758, 5.301, 2352.866, 639, 2.650, 9437.763, 610, 4.666, 4690.480, 583, 1.766, 1059.382, 531, 0.909, 3154.687, 522, 5.661, 71430.696, 520, 1.854, 801.821, 504, 1.425, 6438.496, 433, 0.241, 6812.767, 426, 0.774, 10447.388, 413, 5.240, 7084.897, 374, 2.001, 8031.092, 356, 2.429, 14143.495, 350, 4.800, 6279.553, 337, 0.888, 12036.461, 337, 3.862, 1592.596, 325, 3.400, 7632.943, 322, 0.616, 8429.241, 318, 3.188, 4705.732, 297, 6.070, 4292.331, 295, 1.431, 5746.271, 290, 2.325, 20.355, 275, 0.935, 5760.498, 270, 4.804, 7234.794, 253, 6.223, 6836.645, 228, 5.003, 17789.846, 225, 5.672, 11499.656, 215, 5.202, 11513.883, 208, 3.955, 10213.286, 208, 2.268, 522.577, 206, 2.224, 5856.478, 206, 2.550, 25132.303, 203, 0.910, 6256.778, 189, 0.532, 3340.612, 188, 4.735, 83996.847, 179, 1.474, 4164.312, 178, 3.025, 5.523, 177, 3.026, 5753.385, 159, 4.637, 3.286, 157, 6.124, 5216.580, 155, 3.077, 6681.225, 154, 4.200, 13367.973, 143, 1.191, 3894.182, 138, 3.093, 135.065, 136, 4.245, 426.598, 134, 5.765, 6040.347, 128, 3.085, 5643.179, 127, 2.092, 6290.189, 125, 3.077, 11926.254, 125, 3.445, 536.805, 114, 3.244, 12168.003, 112, 2.318, 16730.464, 111, 3.901, 11506.770, 111, 5.320, 23.878, 105, 3.750, 7860.419, 103, 2.447, 1990.745, 96, 0.82, 3.88, 96, 4.08, 6127.66, 91, 5.42, 206.19, 91, 0.42, 7079.37, 88, 5.17, 11790.63, 81, 0.34, 9917.70, 80, 3.89, 10973.56, 78, 2.40, 1589.07, 78, 2.58, 11371.70, 77, 3.98, 955.60, 77, 3.36, 36.03, 76, 1.30, 103.09, 75, 5.18, 10969.97, 75, 4.96, 6496.37, 73, 5.21, 38.03, 72, 2.65, 6309.37, 70, 5.61, 3738.76, 69, 2.60, 3496.03, 69, 0.39, 15.25, 69, 2.78, 20.78, 65, 1.13, 7058.60, 64, 4.28, 28.45, 61, 5.63, 10984.19, 60, 0.73, 419.48, 60, 5.28, 10575.41, 58, 5.55, 17298.18, 58, 3.19, 4732.03, 5291887, 0.0000000, 0.0000000, 871984, 1.072097, 6283.075850, 30913, 0.86729, 12566.15170, 2734, 0.0530, 3.5231, 1633, 5.1883, 26.2983, 1575, 3.6846, 155.4204, 954, 0.757, 18849.228, 894, 2.057, 77713.771, 695, 0.827, 775.523, 506, 4.663, 1577.344, 406, 1.031, 7.114, 381, 3.441, 5573.143, 346, 5.141, 796.298, 317, 6.053, 5507.553, 302, 1.192, 242.729, 289, 6.117, 529.691, 271, 0.306, 398.149, 254, 2.280, 553.569, 237, 4.381, 5223.694, 208, 3.754, 0.980, 168, 0.902, 951.718, 153, 5.759, 1349.867, 145, 4.364, 1748.016, 134, 3.721, 1194.447, 125, 2.948, 6438.496, 122, 2.973, 2146.165, 110, 1.271, 161000.686, 104, 0.604, 3154.687, 100, 5.986, 6286.599, 92, 4.80, 5088.63, 89, 5.23, 7084.90, 83, 3.31, 213.30, 76, 3.42, 5486.78, 71, 6.19, 4690.48, 68, 3.43, 4694.00, 65, 1.60, 2544.31, 64, 1.98, 801.82, 61, 2.48, 10977.08, 50, 1.44, 6836.65, 49, 2.34, 1592.60, 46, 1.31, 4292.33, 46, 3.81, 149854.40, 43, 0.04, 7234.79, 40, 4.94, 7632.94, 39, 1.57, 71430.70, 38, 3.17, 6309.37, 35, 0.99, 6040.35, 35, 0.67, 1059.38, 31, 3.18, 2352.87, 31, 3.55, 8031.09, 30, 1.92, 10447.39, 30, 2.52, 6127.66, 28, 4.42, 9437.76, 28, 2.71, 3894.18, 27, 0.67, 25132.30, 26, 5.27, 6812.77, 25, 0.55, 6279.55, 23, 1.38, 4705.73, 22, 0.64, 6256.78, 20, 6.07, 640.88, 28923, 5.84384, 6283.07585, 3496, 0.0000, 0.0000, 1682, 5.4877, 12566.1517, 296, 5.196, 155.420, 129, 4.722, 3.523, 71, 5.30, 18849.23, 64, 5.97, 242.73, 40, 3.79, 553.57, 11408, 3.14159, 0.00000, 772, 4.134, 6283.076, 77, 3.84, 12566.15, 42, 0.42, 155.42, 88, 3.14, 0.00, 17, 2.77, 6283.08, 5, 2.01, 155.42, 3, 2.21, 12566.15, 27962, 3.19870, 84334.66158, 10164, 5.42249, 5507.55324, 8045, 3.8801, 5223.6939, 4381, 3.7044, 2352.8662, 3193, 4.0003, 1577.3435, 2272, 3.9847, 1047.7473, 1814, 4.9837, 6283.0758, 1639, 3.5646, 5856.4777, 1444, 3.7028, 9437.7629, 1430, 3.4112, 10213.2855, 1125, 4.8282, 14143.4952, 1090, 2.0857, 6812.7668, 1037, 4.0566, 71092.8814, 971, 3.473, 4694.003, 915, 1.142, 6620.890, 878, 4.440, 5753.385, 837, 4.993, 7084.897, 770, 5.554, 167621.576, 719, 3.602, 529.691, 692, 4.326, 6275.962, 558, 4.410, 7860.419, 529, 2.484, 4705.732, 521, 6.250, 18073.705, 903, 3.897, 5507.553, 618, 1.730, 5223.694, 380, 5.244, 2352.866, 166, 1.627, 84334.662, 10001398880, 0.00000000000, 0.00000000000, 167069963, 3.098463508, 6283.075849991, 1395602, 3.0552461, 12566.1517000, 308372, 5.198467, 77713.771468, 162846, 1.173877, 5753.384885, 157557, 2.846852, 7860.419392, 92480, 5.45292, 11506.76977, 54244, 4.56409, 3930.20970, 47211, 3.66100, 5884.92685, 34598, 0.96369, 5507.55324, 32878, 5.89984, 5223.69392, 30678, 0.29867, 5573.14280, 24319, 4.27350, 11790.62909, 21183, 5.84715, 1577.34354, 18575, 5.02194, 10977.07880, 17484, 3.01194, 18849.22755, 10984, 5.05511, 5486.77784, 9832, 0.8868, 6069.7768, 8650, 5.6896, 15720.8388, 8583, 1.2708, 161000.6857, 6490, 0.2725, 17260.1547, 6292, 0.9218, 529.6910, 5706, 2.0137, 83996.8473, 5574, 5.2416, 71430.6956, 4938, 3.2450, 2544.3144, 4696, 2.5781, 775.5226, 4466, 5.5372, 9437.7629, 4252, 6.0111, 6275.9623, 3897, 5.3607, 4694.0030, 3825, 2.3926, 8827.3903, 3749, 0.8295, 19651.0485, 3696, 4.9011, 12139.5535, 3566, 1.6747, 12036.4607, 3454, 1.8427, 2942.4634, 3319, 0.2437, 7084.8968, 3192, 0.1837, 5088.6288, 3185, 1.7778, 398.1490, 2846, 1.2134, 6286.5990, 2779, 1.8993, 6279.5527, 2628, 4.5890, 10447.3878, 2460, 3.7866, 8429.2413, 2393, 4.9960, 5856.4777, 2359, 0.2687, 796.2980, 2329, 2.8078, 14143.4952, 2210, 1.9500, 3154.6871, 2035, 4.6527, 2146.1654, 1951, 5.3823, 2352.8662, 1883, 0.6731, 149854.4001, 1833, 2.2535, 23581.2582, 1796, 0.1987, 6812.7668, 1731, 6.1520, 16730.4637, 1717, 4.4332, 10213.2855, 1619, 5.2316, 17789.8456, 1381, 5.1896, 8031.0923, 1364, 3.6852, 4705.7323, 1314, 0.6529, 13367.9726, 1041, 4.3329, 11769.8537, 1017, 1.5939, 4690.4798, 998, 4.201, 6309.374, 966, 3.676, 27511.468, 874, 6.064, 1748.016, 779, 3.674, 12168.003, 771, 0.312, 7632.943, 756, 2.626, 6256.778, 746, 5.648, 11926.254, 693, 2.924, 6681.225, 680, 1.423, 23013.540, 674, 0.563, 3340.612, 663, 5.661, 11371.705, 659, 3.136, 801.821, 648, 2.650, 19804.827, 615, 3.029, 233141.314, 612, 5.134, 1194.447, 563, 4.341, 90955.552, 552, 2.091, 17298.182, 534, 5.100, 31441.678, 531, 2.407, 11499.656, 523, 4.624, 6438.496, 513, 5.324, 11513.883, 477, 0.256, 11856.219, 461, 1.722, 7234.794, 458, 3.766, 6386.169, 458, 4.466, 5746.271, 423, 1.055, 5760.498, 422, 1.557, 7238.676, 415, 2.599, 7058.598, 401, 3.030, 1059.382, 397, 1.201, 1349.867, 379, 4.907, 4164.312, 360, 5.707, 5643.179, 352, 3.626, 244287.600, 348, 0.761, 10973.556, 342, 3.001, 4292.331, 336, 4.546, 4732.031, 334, 3.138, 6836.645, 324, 4.164, 9917.697, 316, 1.691, 11015.106, 307, 0.238, 35371.887, 298, 1.306, 6283.143, 298, 1.750, 6283.009, 293, 5.738, 16200.773, 286, 5.928, 14712.317, 281, 3.515, 21228.392, 280, 5.663, 8635.942, 277, 0.513, 26.298, 268, 4.207, 18073.705, 266, 0.900, 12352.853, 260, 2.962, 25132.303, 255, 2.477, 6208.294, 242, 2.800, 709.933, 231, 1.054, 22483.849, 229, 1.070, 14314.168, 216, 1.314, 154717.610, 215, 6.038, 10873.986, 200, 0.561, 7079.374, 198, 2.614, 951.718, 197, 4.369, 167283.762, 186, 2.861, 5216.580, 183, 1.660, 39302.097, 183, 5.912, 3738.761, 175, 2.145, 6290.189, 173, 2.168, 10575.407, 171, 3.702, 1592.596, 171, 1.343, 3128.389, 164, 5.550, 6496.375, 164, 5.856, 10984.192, 161, 1.998, 10969.965, 161, 1.909, 6133.513, 157, 4.955, 25158.602, 154, 6.216, 23543.231, 153, 5.357, 13521.751, 150, 5.770, 18209.330, 150, 5.439, 155.420, 139, 1.778, 9225.539, 139, 1.626, 5120.601, 128, 2.460, 13916.019, 123, 0.717, 143571.324, 122, 2.654, 88860.057, 121, 4.414, 3894.182, 121, 1.192, 3.523, 120, 4.030, 553.569, 119, 1.513, 17654.781, 117, 3.117, 14945.316, 113, 2.698, 6040.347, 110, 3.085, 43232.307, 109, 0.998, 955.600, 108, 2.939, 17256.632, 107, 5.285, 65147.620, 103, 0.139, 11712.955, 103, 5.850, 213.299, 102, 3.046, 6037.244, 101, 2.842, 8662.240, 100, 3.626, 6262.300, 98, 2.36, 6206.81, 98, 5.11, 6172.87, 98, 2.00, 15110.47, 97, 2.67, 5650.29, 97, 2.75, 6244.94, 96, 4.02, 6282.10, 96, 5.31, 6284.06, 92, 0.10, 29088.81, 85, 3.26, 20426.57, 84, 2.60, 28766.92, 81, 3.58, 10177.26, 80, 5.81, 5230.81, 78, 2.53, 16496.36, 77, 4.06, 6127.66, 73, 0.04, 5481.25, 72, 5.96, 12559.04, 72, 5.92, 4136.91, 71, 5.49, 22003.91, 70, 3.41, 7.11, 69, 0.62, 11403.68, 69, 3.90, 1589.07, 69, 1.96, 12416.59, 69, 4.51, 426.60, 67, 1.61, 11087.29, 66, 4.50, 47162.52, 66, 5.08, 283.86, 66, 4.32, 16858.48, 65, 1.04, 6062.66, 64, 1.59, 18319.54, 63, 5.70, 45892.73, 63, 4.60, 66567.49, 63, 3.82, 13517.87, 62, 2.62, 11190.38, 61, 1.54, 33019.02, 60, 5.58, 10344.30, 60, 5.38, 316428.23, 60, 5.78, 632.78, 59, 6.12, 9623.69, 57, 0.16, 17267.27, 57, 3.86, 6076.89, 57, 1.98, 7668.64, 56, 4.78, 20199.09, 55, 4.56, 18875.53, 55, 3.51, 17253.04, 54, 3.07, 226858.24, 54, 4.83, 18422.63, 53, 5.02, 12132.44, 52, 3.63, 5333.90, 52, 0.97, 155427.54, 51, 3.36, 20597.24, 50, 0.99, 11609.86, 50, 2.21, 1990.75, 48, 1.62, 12146.67, 48, 1.17, 12569.67, 47, 4.62, 5436.99, 47, 1.81, 12562.63, 47, 0.59, 21954.16, 47, 0.76, 7342.46, 46, 0.27, 4590.91, 46, 3.77, 156137.48, 45, 5.66, 10454.50, 44, 5.84, 3496.03, 43, 0.24, 17996.03, 41, 5.93, 51092.73, 41, 4.21, 12592.45, 40, 5.14, 1551.05, 40, 5.28, 15671.08, 39, 3.69, 18052.93, 39, 4.94, 24356.78, 38, 2.72, 11933.37, 38, 5.23, 7477.52, 38, 4.99, 9779.11, 37, 3.70, 9388.01, 37, 4.44, 4535.06, 36, 2.16, 28237.23, 36, 2.54, 242.73, 36, 0.22, 5429.88, 35, 6.15, 19800.95, 35, 2.92, 36949.23, 34, 5.63, 2379.16, 34, 5.73, 16460.33, 34, 5.11, 5849.36, 33, 6.19, 6268.85, 10301861, 1.10748970, 6283.07584999, 172124, 1.064423, 12566.151700, 70222, 3.14159, 0.00000, 3235, 1.0217, 18849.2275, 3080, 2.8435, 5507.5532, 2497, 1.3191, 5223.6939, 1849, 1.4243, 1577.3435, 1008, 5.9138, 10977.0788, 865, 1.420, 6275.962, 863, 0.271, 5486.778, 507, 1.686, 5088.629, 499, 6.014, 6286.599, 467, 5.987, 529.691, 440, 0.518, 4694.003, 410, 1.084, 9437.763, 387, 4.750, 2544.314, 375, 5.071, 796.298, 352, 0.023, 83996.847, 344, 0.949, 71430.696, 341, 5.412, 775.523, 322, 6.156, 2146.165, 286, 5.484, 10447.388, 284, 3.420, 2352.866, 255, 6.132, 6438.496, 252, 0.243, 398.149, 243, 3.092, 4690.480, 225, 3.689, 7084.897, 220, 4.952, 6812.767, 219, 0.420, 8031.092, 209, 1.282, 1748.016, 193, 5.314, 8429.241, 185, 1.820, 7632.943, 175, 3.229, 6279.553, 173, 1.537, 4705.732, 158, 4.097, 11499.656, 158, 5.539, 3154.687, 150, 3.633, 11513.883, 148, 3.222, 7234.794, 147, 3.653, 1194.447, 144, 0.817, 14143.495, 135, 6.151, 5746.271, 134, 4.644, 6836.645, 128, 2.693, 1349.867, 123, 5.650, 5760.498, 118, 2.577, 13367.973, 113, 3.357, 17789.846, 110, 4.497, 4292.331, 108, 5.828, 12036.461, 102, 5.621, 6256.778, 99, 1.14, 1059.38, 98, 0.66, 5856.48, 93, 2.32, 10213.29, 92, 0.77, 16730.46, 88, 1.50, 11926.25, 86, 1.42, 5753.38, 85, 0.66, 155.42, 81, 1.64, 6681.22, 80, 4.11, 951.72, 66, 4.55, 5216.58, 65, 0.98, 25132.30, 64, 4.19, 6040.35, 64, 0.52, 6290.19, 63, 1.51, 5643.18, 59, 6.18, 4164.31, 57, 2.30, 10973.56, 55, 2.32, 11506.77, 55, 2.20, 1592.60, 55, 5.27, 3340.61, 54, 5.54, 553.57, 53, 5.04, 9917.70, 53, 0.92, 11371.70, 52, 3.98, 17298.18, 52, 3.60, 10969.97, 49, 5.91, 3894.18, 49, 2.51, 6127.66, 48, 1.67, 12168.00, 46, 0.31, 801.82, 42, 3.70, 10575.41, 42, 4.05, 10984.19, 40, 2.17, 7860.42, 40, 4.17, 26.30, 38, 5.82, 7058.60, 37, 3.39, 6496.37, 36, 1.08, 6309.37, 36, 5.34, 7079.37, 34, 3.62, 11790.63, 32, 0.32, 16200.77, 31, 4.24, 3738.76, 29, 4.55, 11856.22, 29, 1.26, 8635.94, 27, 3.45, 5884.93, 26, 5.08, 10177.26, 26, 5.38, 21228.39, 24, 2.26, 11712.96, 24, 1.05, 242.73, 24, 5.59, 6069.78, 23, 3.63, 6284.06, 23, 1.64, 4732.03, 22, 3.46, 213.30, 21, 1.05, 3496.03, 21, 3.92, 13916.02, 21, 4.01, 5230.81, 20, 5.16, 12352.85, 20, 0.69, 1990.75, 19, 2.73, 6062.66, 19, 5.01, 11015.11, 18, 6.04, 6283.01, 18, 2.85, 7238.68, 18, 5.60, 6283.14, 18, 5.16, 17253.04, 18, 2.54, 14314.17, 17, 1.58, 7.11, 17, 0.98, 3930.21, 17, 4.75, 17267.27, 16, 2.19, 6076.89, 16, 2.19, 18073.70, 16, 6.12, 3.52, 16, 4.61, 9623.69, 16, 3.40, 16496.36, 15, 0.19, 9779.11, 15, 5.30, 13517.87, 15, 4.26, 3128.39, 15, 0.81, 709.93, 14, 0.50, 25158.60, 14, 4.38, 4136.91, 13, 0.98, 65147.62, 13, 3.31, 154717.61, 13, 2.11, 1589.07, 13, 1.92, 22483.85, 12, 6.03, 9225.54, 12, 1.53, 12559.04, 12, 5.82, 6282.10, 12, 5.61, 5642.20, 12, 2.38, 167283.76, 12, 0.39, 12132.44, 12, 3.98, 4686.89, 12, 5.81, 12569.67, 12, 0.56, 5849.36, 11, 0.45, 6172.87, 11, 5.80, 16858.48, 11, 6.22, 12146.67, 11, 2.27, 5429.88, 435939, 5.784551, 6283.075850, 12363, 5.57935, 12566.15170, 1234, 3.1416, 0.0000, 879, 3.628, 77713.771, 569, 1.870, 5573.143, 330, 5.470, 18849.228, 147, 4.480, 5507.553, 110, 2.842, 161000.686, 101, 2.815, 5223.694, 85, 3.11, 1577.34, 65, 5.47, 775.52, 61, 1.38, 6438.50, 50, 4.42, 6286.60, 47, 3.66, 7084.90, 46, 5.39, 149854.40, 42, 0.90, 10977.08, 40, 3.20, 5088.63, 35, 1.81, 5486.78, 32, 5.35, 3154.69, 30, 3.52, 796.30, 29, 4.62, 4690.48, 28, 1.84, 4694.00, 27, 3.14, 71430.70, 27, 6.17, 6836.65, 26, 1.42, 2146.17, 25, 2.81, 1748.02, 24, 2.18, 155.42, 23, 4.76, 7234.79, 21, 3.38, 7632.94, 21, 0.22, 4705.73, 20, 4.22, 1349.87, 20, 2.01, 1194.45, 20, 4.58, 529.69, 19, 1.59, 6309.37, 18, 5.70, 6040.35, 18, 6.03, 4292.33, 17, 2.90, 9437.76, 17, 2.00, 8031.09, 17, 5.78, 83996.85, 16, 0.05, 2544.31, 15, 0.95, 6127.66, 14, 0.36, 10447.39, 14, 1.48, 2352.87, 13, 0.77, 553.57, 13, 5.48, 951.72, 13, 5.27, 6279.55, 13, 3.76, 6812.77, 11, 5.41, 6256.78, 10, 0.68, 1592.60, 10, 4.95, 398.15, 10, 1.15, 3894.18, 10, 5.20, 244287.60, 10, 1.94, 11856.22, 9, 5.39, 25132.30, 8, 6.18, 1059.38, 8, 0.69, 8429.24, 8, 5.85, 242.73, 7, 5.26, 14143.50, 7, 0.52, 801.82, 6, 2.24, 8635.94, 6, 4.00, 13367.97, 6, 2.77, 90955.55, 6, 5.17, 7058.60, 5, 1.46, 233141.31, 5, 4.13, 7860.42, 5, 3.91, 26.30, 5, 3.89, 12036.46, 5, 5.58, 6290.19, 5, 5.54, 1990.75, 5, 0.83, 11506.77, 5, 6.22, 6681.22, 4, 5.26, 10575.41, 4, 1.91, 7477.52, 4, 0.43, 10213.29, 4, 1.09, 709.93, 4, 5.09, 11015.11, 4, 4.22, 88860.06, 4, 3.57, 7079.37, 4, 1.98, 6284.06, 4, 3.93, 10973.56, 4, 6.18, 9917.70, 4, 0.36, 10177.26, 4, 2.75, 3738.76, 4, 3.33, 5643.18, 4, 5.36, 25158.60, 14459, 4.27319, 6283.07585, 673, 3.917, 12566.152, 77, 0.00, 0.00, 25, 3.73, 18849.23, 4, 2.80, 6286.60, 386, 2.564, 6283.076, 31, 2.27, 12566.15, 5, 3.44, 5573.14, 2, 2.05, 18849.23, 1, 2.06, 77713.77, 1, 4.41, 161000.69, 1, 3.82, 149854.40, 1, 4.08, 6127.66, 1, 5.26, 6438.50, 9, 1.22, 6283.08, 1, 0.66, 12566.15));
	var XL1 = [[[22639.586, 0.78475822, 8328.691424623, 1.5229241, 25.0719, -0.123598, 4586.438, 0.1873974, 7214.06286536, -2.184756, -18.860, 0.08280, 2369.914, 2.5429520, 15542.75428998, -0.661832, 6.212, -0.04080, 769.026, 3.140313, 16657.38284925, 3.04585, 50.144, -0.2472, 666.418, 1.527671, 628.30195521, -0.02664, 0.062, -0.0054, 411.596, 4.826607, 16866.9323150, -1.28012, -1.07, -0.0059, 211.656, 4.115028, -1114.6285593, -3.70768, -43.93, 0.2064, 205.436, 0.230523, 6585.7609101, -2.15812, -18.92, 0.0882, 191.956, 4.898507, 23871.4457146, 0.86109, 31.28, -0.164, 164.729, 2.586078, 14914.4523348, -0.6352, 6.15, -0.035, 147.321, 5.45530, -7700.3894694, -1.5496, -25.01, 0.118, 124.988, 0.48608, 7771.3771450, -0.3309, 3.11, -0.020, 109.380, 3.88323, 8956.9933798, 1.4963, 25.13, -0.129, 55.177, 5.57033, -1324.1780250, 0.6183, 7.3, -0.035, 45.100, 0.89898, 25195.623740, 0.2428, 24.0, -0.129, 39.533, 3.81213, -8538.240890, 2.8030, 26.1, -0.118, 38.430, 4.30115, 22756.817155, -2.8466, -12.6, 0.042, 36.124, 5.49587, 24986.074274, 4.5688, 75.2, -0.371, 30.773, 1.94559, 14428.125731, -4.3695, -37.7, 0.166, 28.397, 3.28586, 7842.364821, -2.2114, -18.8, 0.077, 24.358, 5.64142, 16171.056245, -0.6885, 6.3, -0.046, 18.585, 4.41371, -557.314280, -1.8538, -22.0, 0.10, 17.954, 3.58454, 8399.679100, -0.3576, 3.2, -0.03, 14.530, 4.9416, 23243.143759, 0.888, 31.2, -0.16, 14.380, 0.9709, 32200.137139, 2.384, 56.4, -0.29, 14.251, 5.7641, -2.301200, 1.523, 25.1, -0.12, 13.899, 0.3735, 31085.508580, -1.324, 12.4, -0.08, 13.194, 1.7595, -9443.319984, -5.231, -69.0, 0.33, 9.679, 3.0997, -16029.080894, -3.072, -50.1, 0.24, 9.366, 0.3016, 24080.995180, -3.465, -19.9, 0.08, 8.606, 4.1582, -1742.930514, -3.681, -44.0, 0.21, 8.453, 2.8416, 16100.068570, 1.192, 28.2, -0.14, 8.050, 2.6292, 14286.150380, -0.609, 6.1, -0.03, 7.630, 6.2388, 17285.684804, 3.019, 50.2, -0.25, 7.447, 1.4845, 1256.603910, -0.053, 0.1, -0.01, 7.371, 0.2736, 5957.458955, -2.131, -19.0, 0.09, 7.063, 5.6715, 33.757047, -0.308, -3.6, 0.02, 6.383, 4.7843, 7004.513400, 2.141, 32.4, -0.16, 5.742, 2.6572, 32409.686605, -1.942, 5, -0.05, 4.374, 4.3443, 22128.51520, -2.820, -13, 0.05, 3.998, 3.2545, 33524.31516, 1.766, 49, -0.25, 3.210, 2.2443, 14985.44001, -2.516, -16, 0.06, 2.915, 1.7138, 24499.74767, 0.834, 31, -0.17, 2.732, 1.9887, 13799.82378, -4.343, -38, 0.17, 2.568, 5.4122, -7072.08751, -1.576, -25, 0.11, 2.521, 3.2427, 8470.66678, -2.238, -19, 0.07, 2.489, 4.0719, -486.32660, -3.734, -44, 0.20, 2.146, 5.6135, -1952.47998, 0.645, 7, -0.03, 1.978, 2.7291, 39414.20000, 0.199, 37, -0.21, 1.934, 1.5682, 33314.76570, 6.092, 100, -0.5, 1.871, 0.4166, 30457.20662, -1.297, 12, -0.1, 1.753, 2.0582, -8886.00570, -3.38, -47, 0.2, 1.437, 2.386, -695.87607, 0.59, 7, 0, 1.373, 3.026, -209.54947, 4.33, 51, -0.2, 1.262, 5.940, 16728.37052, 1.17, 28, -0.1, 1.224, 6.172, 6656.74859, -4.04, -41, 0.2, 1.187, 5.873, 6099.43431, -5.89, -63, 0.3, 1.177, 1.014, 31571.83518, 2.41, 56, -0.3, 1.162, 3.840, 9585.29534, 1.47, 25, -0.1, 1.143, 5.639, 8364.73984, -2.18, -19, 0.1, 1.078, 1.229, 70.98768, -1.88, -22, 0.1, 1.059, 3.326, 40528.82856, 3.91, 81, -0.4, 0.990, 5.013, 40738.37803, -0.42, 30, -0.2, 0.948, 5.687, -17772.01141, -6.75, -94, 0.5, 0.876, 0.298, -0.35232, 0, 0, 0, 0.822, 2.994, 393.02097, 0, 0, 0, 0.788, 1.836, 8326.39022, 3.05, 50, -0.2, 0.752, 4.985, 22614.84180, 0.91, 31, -0.2, 0.740, 2.875, 8330.99262, 0, 0, 0, 0.669, 0.744, -24357.77232, -4.60, -75, 0.4, 0.644, 1.314, 8393.12577, -2.18, -19, 0.1, 0.639, 5.888, 575.33849, 0, 0, 0, 0.635, 1.116, 23385.11911, -2.87, -13, 0, 0.584, 5.197, 24428.75999, 2.71, 53, -0.3, 0.583, 3.513, -9095.55517, 0.95, 4, 0, 0.572, 6.059, 29970.88002, -5.03, -32, 0.1, 0.565, 2.960, 0.32863, 1.52, 25, -0.1, 0.561, 4.001, -17981.56087, -2.43, -43, 0.2, 0.557, 0.529, 7143.07519, -0.30, 3, 0, 0.546, 2.311, 25614.37623, 4.54, 75, -0.4, 0.536, 4.229, 15752.30376, -4.99, -45, 0.2, 0.493, 3.316, -8294.9344, -1.83, -29, 0.1, 0.491, 1.744, 8362.4485, 1.21, 21, -0.1, 0.478, 1.803, -10071.6219, -5.20, -69, 0.3, 0.454, 0.857, 15333.2048, 3.66, 57, -0.3, 0.445, 2.071, 8311.7707, -2.18, -19, 0.1, 0.426, 0.345, 23452.6932, -3.44, -20, 0.1, 0.420, 4.941, 33733.8646, -2.56, -2, 0, 0.413, 1.642, 17495.2343, -1.31, -1, 0, 0.404, 1.458, 23314.1314, -0.99, 9, -0.1, 0.395, 2.132, 38299.5714, -3.51, -6, 0, 0.382, 2.700, 31781.3846, -1.92, 5, 0, 0.375, 4.827, 6376.2114, 2.17, 32, -0.2, 0.361, 3.867, 16833.1753, -0.97, 3, 0, 0.358, 5.044, 15056.4277, -4.40, -38, 0.2, 0.350, 5.157, -8257.7037, -3.40, -47, 0.2, 0.344, 4.233, 157.7344, 0, 0, 0, 0.340, 2.672, 13657.8484, -0.58, 6, 0, 0.329, 5.610, 41853.0066, 3.29, 74, -0.4, 0.325, 5.895, -39.8149, 0, 0, 0, 0.309, 4.387, 21500.2132, -2.79, -13, 0.1, 0.302, 1.278, 786.0419, 0, 0, 0, 0.302, 5.341, -24567.3218, -0.27, -24, 0.1, 0.301, 1.045, 5889.8848, -1.57, -12, 0, 0.294, 4.201, -2371.2325, -3.65, -44, 0.2, 0.293, 3.704, 21642.1886, -6.55, -57, 0.2, 0.290, 4.069, 32828.4391, 2.36, 56, -0.3, 0.289, 3.472, 31713.8105, -1.35, 12, -0.1, 0.285, 5.407, -33.7814, 0.31, 4, 0, 0.283, 5.998, -16.9207, -3.71, -44, 0.2, 0.283, 2.772, 38785.8980, 0.23, 37, -0.2, 0.274, 5.343, 15613.7420, -2.54, -16, 0.1, 0.263, 3.997, 25823.9257, 0.22, 24, -0.1, 0.254, 0.600, 24638.3095, -1.61, 2, 0, 0.253, 1.344, 6447.1991, 0.29, 10, -0.1, 0.250, 0.887, 141.9754, -3.76, -44, 0.2, 0.247, 0.317, 5329.1570, -2.10, -19, 0.1, 0.245, 0.141, 36.0484, -3.71, -44, 0.2, 0.231, 2.287, 14357.1381, -2.49, -16, 0.1, 0.227, 5.158, 2.6298, 0, 0, 0, 0.219, 5.085, 47742.8914, 1.72, 63, -0.3, 0.211, 2.145, 6638.7244, -2.18, -19, 0.1, 0.201, 4.415, 39623.7495, -4.13, -14, 0, 0.194, 2.091, 588.4927, 0, 0, 0, 0.193, 3.057, -15400.7789, -3.10, -50, 0, 0.186, 5.598, 16799.3582, -0.72, 6, 0, 0.185, 3.886, 1150.6770, 0, 0, 0, 0.183, 1.619, 7178.0144, 1.52, 25, 0, 0.181, 2.635, 8328.3391, 1.52, 25, 0, 0.181, 2.077, 8329.0437, 1.52, 25, 0, 0.179, 3.215, -9652.8694, -0.90, -18, 0, 0.176, 1.716, -8815.0180, -5.26, -69, 0, 0.175, 5.673, 550.7553, 0, 0, 0, 0.170, 2.060, 31295.0580, -5.6, -39, 0, 0.167, 1.239, 7211.7617, -0.7, 6, 0, 0.165, 4.499, 14967.4158, -0.7, 6, 0, 0.164, 3.595, 15540.4531, 0.9, 31, 0, 0.164, 4.237, 522.3694, 0, 0, 0, 0.163, 4.633, 15545.0555, -2.2, -19, 0, 0.161, 0.478, 6428.0209, -2.2, -19, 0, 0.158, 2.03, 13171.5218, -4.3, -38, 0, 0.157, 2.28, 7216.3641, -3.7, -44, 0, 0.154, 5.65, 7935.6705, 1.5, 25, 0, 0.152, 0.46, 29828.9047, -1.3, 12, 0, 0.151, 1.19, -0.7113, 0, 0, 0, 0.150, 1.42, 23942.4334, -1.0, 9, 0, 0.144, 2.75, 7753.3529, 1.5, 25, 0, 0.137, 2.08, 7213.7105, -2.2, -19, 0, 0.137, 1.44, 7214.4152, -2.2, -19, 0, 0.136, 4.46, -1185.6162, -1.8, -22, 0, 0.136, 3.03, 8000.1048, -2.2, -19, 0, 0.134, 2.83, 14756.7124, -0.7, 6, 0, 0.131, 5.05, 6821.0419, -2.2, -19, 0, 0.128, 5.99, -17214.6971, -4.9, -72, 0, 0.127, 5.35, 8721.7124, 1.5, 25, 0, 0.126, 4.49, 46628.2629, -2.0, 19, 0, 0.125, 5.94, 7149.6285, 1.5, 25, 0, 0.124, 1.09, 49067.0695, 1.1, 55, 0, 0.121, 2.88, 15471.7666, 1.2, 28, 0, 0.111, 3.92, 41643.4571, 7.6, 125, -1, 0.110, 1.96, 8904.0299, 1.5, 25, 0, 0.106, 3.30, -18.0489, -2.2, -19, 0, 0.105, 2.30, -4.9310, 1.5, 25, 0, 0.104, 2.22, -6.5590, -1.9, -22, 0, 0.101, 1.44, 1884.9059, -0.1, 0, 0, 0.100, 5.92, 5471.1324, -5.9, -63, 0, 0.099, 1.12, 15149.7333, -0.7, 6, 0, 0.096, 4.73, 15508.9972, -0.4, 10, 0, 0.095, 5.18, 7230.9835, 1.5, 25, 0, 0.093, 3.37, 39900.5266, 3.9, 81, 0, 0.092, 2.01, 25057.0619, 2.7, 53, 0, 0.092, 1.21, -79.6298, 0, 0, 0, 0.092, 1.65, -26310.2523, -4.0, -68, 0, 0.091, 1.01, 42062.5561, -1.0, 23, 0, 0.090, 6.10, 29342.5781, -5.0, -32, 0, 0.090, 4.43, 15542.4020, -0.7, 6, 0, 0.090, 3.80, 15543.1066, -0.7, 6, 0, 0.089, 4.15, 6063.3859, -2.2, -19, 0, 0.086, 4.03, 52.9691, 0, 0, 0, 0.085, 0.49, 47952.4409, -2.6, 11, 0, 0.085, 1.60, 7632.8154, 2.1, 32, 0, 0.084, 0.22, 14392.0773, -0.7, 6, 0, 0.083, 6.22, 6028.4466, -4.0, -41, 0, 0.083, 0.63, -7909.9389, 2.8, 26, 0, 0.083, 5.20, -77.5523, 0, 0, 0, 0.082, 2.74, 8786.1467, -2.2, -19, 0, 0.080, 2.43, 9166.5428, -2.8, -26, 0, 0.080, 3.70, -25405.1732, 4.1, 27, 0, 0.078, 5.68, 48857.5200, 5.4, 106, -1, 0.077, 1.85, 8315.5735, -2.2, -19, 0, 0.075, 5.46, -18191.1103, 1.9, 8, 0, 0.075, 1.41, -16238.6304, 1.3, 1, 0, 0.074, 5.06, 40110.0761, -0.4, 30, 0, 0.072, 2.10, 64.4343, -3.7, -44, 0, 0.071, 2.17, 37671.2695, -3.5, -6, 0, 0.069, 1.71, 16693.4313, -0.7, 6, 0, 0.069, 3.33, -26100.7028, -8.3, -119, 1, 0.068, 1.09, 8329.4028, 1.5, 25, 0, 0.068, 3.62, 8327.9801, 1.5, 25, 0, 0.068, 2.41, 16833.1509, -1.0, 3, 0, 0.067, 3.40, 24709.2971, -3.5, -20, 0, 0.067, 1.65, 8346.7156, -0.3, 3, 0, 0.066, 2.61, 22547.2677, 1.5, 39, 0, 0.066, 3.50, 15576.5113, -1.0, 3, 0, 0.065, 5.76, 33037.9886, -2.0, 5, 0, 0.065, 4.58, 8322.1325, -0.3, 3, 0, 0.065, 6.20, 17913.9868, 3.0, 50, 0, 0.065, 1.50, 22685.8295, -1.0, 9, 0, 0.065, 2.37, 7180.3058, -1.9, -15, 0, 0.064, 1.06, 30943.5332, 2.4, 56, 0, 0.064, 1.89, 8288.8765, 1.5, 25, 0, 0.064, 4.70, 6.0335, 0.3, 4, 0, 0.063, 2.83, 8368.5063, 1.5, 25, 0, 0.063, 5.66, -2580.7819, 0.7, 7, 0, 0.062, 3.78, 7056.3285, -2.2, -19, 0, 0.061, 1.49, 8294.9100, 1.8, 29, 0, 0.061, 0.12, -10281.1714, -0.9, -18, 0, 0.061, 3.06, -8362.4729, -1.2, -21, 0, 0.061, 4.43, 8170.9571, 1.5, 25, 0, 0.059, 5.78, -13.1179, -3.7, -44, 0, 0.059, 5.97, 6625.5702, -2.2, -19, 0, 0.058, 5.01, -0.5080, -0.3, 0, 0, 0.058, 2.73, 7161.0938, -2.2, -19, 0, 0.057, 0.19, 7214.0629, -2.2, -19, 0, 0.057, 4.00, 22199.5029, -4.7, -35, 0, 0.057, 5.38, 8119.1420, 5.8, 76, 0, 0.056, 1.07, 7542.6495, 1.5, 25, 0, 0.056, 0.28, 8486.4258, 1.5, 25, 0, 0.054, 4.19, 16655.0816, 4.6, 75, 0, 0.053, 0.72, 7267.0320, -2.2, -19, 0, 0.053, 3.12, 12.6192, 0.6, 7, 0, 0.052, 2.99, -32896.013, -1.8, -49, 0, 0.052, 3.46, 1097.708, 0, 0, 0, 0.051, 5.37, -6443.786, -1.6, -25, 0, 0.051, 1.35, 7789.401, -2.2, -19, 0, 0.051, 5.83, 40042.502, 0.2, 38, 0, 0.051, 3.63, 9114.733, 1.5, 25, 0, 0.050, 1.51, 8504.484, -2.5, -22, 0, 0.050, 5.23, 16659.684, 1.5, 25, 0, 0.050, 1.15, 7247.820, -2.5, -23, 0, 0.047, 0.25, -1290.421, 0.3, 0, 0, 0.047, 4.67, -32686.464, -6.1, -100, 0, 0.047, 3.49, 548.678, 0, 0, 0, 0.047, 2.37, 6663.308, -2.2, -19, 0, 0.046, 0.98, 1572.084, 0, 0, 0, 0.046, 2.04, 14954.262, -0.7, 6, 0, 0.046, 3.72, 6691.693, -2.2, -19, 0, 0.045, 6.19, -235.287, 0, 0, 0, 0.044, 2.96, 32967.001, -0.1, 27, 0, 0.044, 3.82, -1671.943, -5.6, -66, 0, 0.043, 5.82, 1179.063, 0, 0, 0, 0.043, 0.07, 34152.617, 1.7, 49, 0, 0.043, 3.71, 6514.773, -0.3, 0, 0, 0.043, 5.62, 15.732, -2.5, -23, 0, 0.043, 5.80, 8351.233, -2.2, -19, 0, 0.042, 0.27, 7740.199, 1.5, 25, 0, 0.042, 6.14, 15385.020, -0.7, 6, 0, 0.042, 6.13, 7285.051, -4.1, -41, 0, 0.041, 1.27, 32757.451, 4.2, 78, 0, 0.041, 4.46, 8275.722, 1.5, 25, 0, 0.040, 0.23, 8381.661, 1.5, 25, 0, 0.040, 5.87, -766.864, 2.5, 29, 0, 0.040, 1.66, 254.431, 0, 0, 0, 0.040, 0.40, 9027.981, -0.4, 0, 0, 0.040, 2.96, 7777.936, 1.5, 25, 0, 0.039, 4.67, 33943.068, 6.1, 100, 0, 0.039, 3.52, 8326.062, 1.5, 25, 0, 0.039, 3.75, 21013.887, -6.5, -57, 0, 0.039, 5.60, 606.978, 0, 0, 0, 0.039, 1.19, 8331.321, 1.5, 25, 0, 0.039, 2.84, 7211.433, -2.2, -19, 0, 0.038, 0.67, 7216.693, -2.2, -19, 0, 0.038, 6.22, 25161.867, 0.6, 28, 0, 0.038, 4.40, 7806.322, 1.5, 25, 0, 0.038, 4.16, 9179.168, -2.2, -19, 0, 0.037, 4.73, 14991.999, -0.7, 6, 0, 0.036, 0.35, 67.514, -0.6, -7, 0, 0.036, 3.70, 25266.611, -1.6, 0, 0, 0.036, 5.39, 16328.796, -0.7, 6, 0, 0.035, 1.44, 7174.248, -2.2, -19, 0, 0.035, 5.00, 15684.730, -4.4, -38, 0, 0.035, 0.39, -15.419, -2.2, -19, 0, 0.035, 6.07, 15020.385, -0.7, 6, 0, 0.034, 6.01, 7371.797, -2.2, -19, 0, 0.034, 0.96, -16623.626, -3.4, -54, 0, 0.033, 6.24, 9479.368, 1.5, 25, 0, 0.033, 3.21, 23661.896, 5.2, 82, 0, 0.033, 4.06, 8311.418, -2.2, -19, 0, 0.033, 2.40, 1965.105, 0, 0, 0, 0.033, 5.17, 15489.785, -0.7, 6, 0, 0.033, 5.03, 21986.540, 0.9, 31, 0, 0.033, 4.10, 16691.140, 2.7, 46, 0, 0.033, 5.13, 47114.589, 1.7, 63, 0, 0.033, 4.45, 8917.184, 1.5, 25, 0, 0.033, 4.23, 2.078, 0, 0, 0, 0.032, 2.33, 75.251, 1.5, 25, 0, 0.032, 2.10, 7253.878, -2.2, -19, 0, 0.032, 3.11, -0.224, 1.5, 25, 0, 0.032, 4.43, 16640.462, -0.7, 6, 0, 0.032, 5.68, 8328.363, 0, 0, 0, 0.031, 5.32, 8329.020, 3.0, 50, 0, 0.031, 3.70, 16118.093, -0.7, 6, 0, 0.030, 3.67, 16721.817, -0.7, 6, 0, 0.030, 5.27, -1881.492, -1.2, -15, 0, 0.030, 5.72, 8157.839, -2.2, -19, 0, 0.029, 5.73, -18400.313, -6.7, -94, 0, 0.029, 2.76, 16.000, -2.2, -19, 0, 0.029, 1.75, 8879.447, 1.5, 25, 0, 0.029, 0.32, 8851.061, 1.5, 25, 0, 0.029, 0.90, 14704.903, 3.7, 57, 0, 0.028, 2.90, 15595.723, -0.7, 6, 0, 0.028, 5.88, 16864.631, 0.2, 24, 0, 0.028, 0.63, 16869.234, -2.8, -26, 0, 0.028, 4.04, -18609.863, -2.4, -43, 0, 0.027, 5.83, 6727.736, -5.9, -63, 0, 0.027, 6.12, 418.752, 4.3, 51, 0, 0.027, 0.14, 41157.131, 3.9, 81, 0, 0.026, 3.80, 15.542, 0, 0, 0, 0.026, 1.68, 50181.698, 4.8, 99, -1, 0.026, 0.32, 315.469, 0, 0, 0, 0.025, 5.67, 19.188, 0.3, 0, 0, 0.025, 3.16, 62.133, -2.2, -19, 0, 0.025, 3.76, 15502.939, -0.7, 6, 0, 0.025, 4.53, 45999.961, -2.0, 19, 0, 0.024, 3.21, 837.851, -4.4, -51, 0, 0.024, 2.82, 38157.596, 0.3, 37, 0, 0.024, 5.21, 15540.124, -0.7, 6, 0, 0.024, 0.26, 14218.576, 0, 13, 0, 0.024, 3.01, 15545.384, -0.7, 6, 0, 0.024, 1.16, -17424.247, -0.6, -21, 0, 0.023, 2.34, -67.574, 0.6, 7, 0, 0.023, 2.44, 18.024, -1.9, -22, 0, 0.023, 3.70, 469.400, 0, 0, 0, 0.023, 0.72, 7136.511, -2.2, -19, 0, 0.023, 4.50, 15582.569, -0.7, 6, 0, 0.023, 2.80, -16586.395, -4.9, -72, 0, 0.023, 1.51, 80.182, 0, 0, 0, 0.023, 1.09, 5261.583, -1.5, -12, 0, 0.023, 0.56, 54956.954, -0.5, 44, 0, 0.023, 4.01, 8550.860, -2.2, -19, 0, 0.023, 4.46, 38995.448, -4.1, -14, 0, 0.023, 3.82, 2358.126, 0, 0, 0, 0.022, 3.77, 32271.125, 0.5, 34, 0, 0.022, 0.82, 15935.775, -0.7, 6, 0, 0.022, 1.07, 24013.421, -2.9, -13, 0, 0.022, 0.40, 8940.078, -2.2, -19, 0, 0.022, 2.06, 15700.489, -0.7, 6, 0, 0.022, 4.27, 15124.002, -5.0, -45, 0, 0.021, 1.16, 56071.583, 3.2, 88, 0, 0.021, 5.58, 9572.189, -2.2, -19, 0, 0.020, 1.70, -17.273, -3.7, -44, 0, 0.020, 3.05, 214.617, 0, 0, 0, 0.020, 4.41, 8391.048, -2.2, -19, 0, 0.020, 5.95, 23869.145, 2.4, 56, 0, 0.020, 0.42, 40947.927, -4.7, -21, 0, 0.019, 1.39, 5818.897, 0.3, 10, 0, 0.019, 0.71, 23873.747, -0.7, 6, 0, 0.019, 2.81, 7291.615, -2.2, -19, 0, 0.019, 5.09, 8428.018, -2.2, -19, 0, 0.019, 4.14, 6518.187, -1.6, -12, 0, 0.019, 3.85, 21.330, 0, 0, 0, 0.018, 0.66, 14445.046, -0.7, 6, 0, 0.018, 1.65, 0.966, -4.0, -48, 0, 0.018, 5.64, -17143.709, -6.8, -94, 0, 0.018, 6.01, 7736.432, -2.2, -19, 0, 0.018, 2.74, 31153.083, -1.9, 5, 0, 0.018, 4.58, 6116.355, -2.2, -19, 0, 0.018, 2.28, 46.401, 0.3, 0, 0, 0.018, 3.80, 10213.597, 1.4, 25, 0, 0.018, 2.84, 56281.132, -1.1, 36, 0, 0.018, 3.53, 8249.062, 1.5, 25, 0, 0.017, 4.43, 20871.911, -3, -13, 0, 0.017, 4.44, 627.596, 0, 0, 0, 0.017, 1.85, 628.308, 0, 0, 0, 0.017, 1.19, 8408.321, 2, 25, 0, 0.017, 1.95, 7214.056, -2, -19, 0, 0.017, 1.57, 7214.070, -2, -19, 0, 0.017, 1.65, 13870.811, -6, -60, 0, 0.017, 0.30, 22.542, -4, -44, 0, 0.017, 2.62, -119.445, 0, 0, 0, 0.016, 4.87, 5747.909, 2, 32, 0, 0.016, 4.45, 14339.108, -1, 6, 0, 0.016, 1.83, 41366.680, 0, 30, 0, 0.016, 4.53, 16309.618, -3, -23, 0, 0.016, 2.54, 15542.754, -1, 6, 0, 0.016, 6.05, 1203.646, 0, 0, 0, 0.015, 5.2, 2751.147, 0, 0, 0, 0.015, 1.8, -10699.924, -5, -69, 0, 0.015, 0.4, 22824.391, -3, -20, 0, 0.015, 2.1, 30666.756, -6, -39, 0, 0.015, 2.1, 6010.417, -2, -19, 0, 0.015, 0.7, -23729.470, -5, -75, 0, 0.015, 1.4, 14363.691, -1, 6, 0, 0.015, 5.8, 16900.689, -2, 0, 0, 0.015, 5.2, 23800.458, 3, 53, 0, 0.015, 5.3, 6035.000, -2, -19, 0, 0.015, 1.2, 8251.139, 2, 25, 0, 0.015, 3.6, -8.860, 0, 0, 0, 0.015, 0.8, 882.739, 0, 0, 0, 0.015, 3.0, 1021.329, 0, 0, 0, 0.015, 0.6, 23296.107, 1, 31, 0, 0.014, 5.4, 7227.181, 2, 25, 0, 0.014, 0.1, 7213.352, -2, -19, 0, 0.014, 4.0, 15506.706, 3, 50, 0, 0.014, 3.4, 7214.774, -2, -19, 0, 0.014, 4.6, 6665.385, -2, -19, 0, 0.014, 0.1, -8.636, -2, -22, 0, 0.014, 3.1, 15465.202, -1, 6, 0, 0.014, 4.9, 508.863, 0, 0, 0, 0.014, 3.5, 8406.244, 2, 25, 0, 0.014, 1.3, 13313.497, -8, -82, 0, 0.014, 2.8, 49276.619, -3, 0, 0, 0.014, 0.1, 30528.194, -3, -10, 0, 0.013, 1.7, 25128.050, 1, 31, 0, 0.013, 2.9, 14128.405, -1, 6, 0, 0.013, 3.4, 57395.761, 3, 80, 0, 0.013, 2.7, 13029.546, -1, 6, 0, 0.013, 3.9, 7802.556, -2, -19, 0, 0.013, 1.6, 8258.802, -2, -19, 0, 0.013, 2.2, 8417.709, -2, -19, 0, 0.013, 0.7, 9965.210, -2, -19, 0, 0.013, 3.4, 50391.247, 0, 48, 0, 0.013, 3.0, 7134.433, -2, -19, 0, 0.013, 2.9, 30599.182, -5, -31, 0, 0.013, 3.6, -9723.857, 1, 0, 0, 0.013, 4.8, 7607.084, -2, -19, 0, 0.012, 0.8, 23837.689, 1, 35, 0, 0.012, 3.6, 4.409, -4, -44, 0, 0.012, 5.0, 16657.031, 3, 50, 0, 0.012, 4.4, 16657.735, 3, 50, 0, 0.012, 1.1, 15578.803, -4, -38, 0, 0.012, 6.0, -11.490, 0, 0, 0, 0.012, 1.9, 8164.398, 0, 0, 0, 0.012, 2.4, 31852.372, -4, -17, 0, 0.012, 2.4, 6607.085, -2, -19, 0, 0.012, 4.2, 8359.870, 0, 0, 0, 0.012, 0.5, 5799.713, -2, -19, 0, 0.012, 2.7, 7220.622, 0, 0, 0, 0.012, 4.3, -139.720, 0, 0, 0, 0.012, 2.3, 13728.836, -2, -16, 0, 0.011, 3.6, 14912.146, 1, 31, 0, 0.011, 4.7, 14916.748, -2, -19, 0], [1.67680, 4.66926, 628.301955, -0.0266, 0.1, -0.005, 0.51642, 3.3721, 6585.760910, -2.158, -18.9, 0.09, 0.41383, 5.7277, 14914.452335, -0.635, 6.2, -0.04, 0.37115, 3.9695, 7700.389469, 1.550, 25.0, -0.12, 0.27560, 0.7416, 8956.993380, 1.496, 25.1, -0.13, 0.24599, 4.2253, -2.301200, 1.523, 25.1, -0.12, 0.07118, 0.1443, 7842.36482, -2.211, -19, 0.08, 0.06128, 2.4998, 16171.05625, -0.688, 6, 0, 0.04516, 0.443, 8399.67910, -0.36, 3, 0, 0.04048, 5.771, 14286.15038, -0.61, 6, 0, 0.03747, 4.626, 1256.60391, -0.05, 0, 0, 0.03707, 3.415, 5957.45895, -2.13, -19, 0.1, 0.03649, 1.800, 23243.14376, 0.89, 31, -0.2, 0.02438, 0.042, 16029.08089, 3.07, 50, -0.2, 0.02165, 1.017, -1742.93051, -3.68, -44, 0.2, 0.01923, 3.097, 17285.68480, 3.02, 50, -0.3, 0.01692, 1.280, 0.3286, 1.52, 25, -0.1, 0.01361, 0.298, 8326.3902, 3.05, 50, -0.2, 0.01293, 4.013, 7072.0875, 1.58, 25, -0.1, 0.01276, 4.413, 8330.9926, 0, 0, 0, 0.01270, 0.101, 8470.6668, -2.24, -19, 0.1, 0.01097, 1.203, 22128.5152, -2.82, -13, 0, 0.01088, 2.545, 15542.7543, -0.66, 6, 0, 0.00835, 0.190, 7214.0629, -2.18, -19, 0.1, 0.00734, 4.855, 24499.7477, 0.83, 31, -0.2, 0.00686, 5.130, 13799.8238, -4.34, -38, 0.2, 0.00631, 0.930, -486.3266, -3.73, -44, 0, 0.00585, 0.699, 9585.2953, 1.5, 25, 0, 0.00566, 4.073, 8328.3391, 1.5, 25, 0, 0.00566, 0.638, 8329.0437, 1.5, 25, 0, 0.00539, 2.472, -1952.4800, 0.6, 7, 0, 0.00509, 2.88, -0.7113, 0, 0, 0, 0.00469, 3.56, 30457.2066, -1.3, 12, 0, 0.00387, 0.78, -0.3523, 0, 0, 0, 0.00378, 1.84, 22614.8418, 0.9, 31, 0, 0.00362, 5.53, -695.8761, 0.6, 7, 0, 0.00317, 2.80, 16728.3705, 1.2, 28, 0, 0.00303, 6.07, 157.7344, 0, 0, 0, 0.00300, 2.53, 33.7570, -0.3, -4, 0, 0.00295, 4.16, 31571.8352, 2.4, 56, 0, 0.00289, 5.98, 7211.7617, -0.7, 6, 0, 0.00285, 2.06, 15540.4531, 0.9, 31, 0, 0.00283, 2.65, 2.6298, 0, 0, 0, 0.00282, 6.17, 15545.0555, -2.2, -19, 0, 0.00278, 1.23, -39.8149, 0, 0, 0, 0.00272, 3.82, 7216.3641, -3.7, -44, 0, 0.00270, 4.37, 70.9877, -1.9, -22, 0, 0.00256, 5.81, 13657.8484, -0.6, 6, 0, 0.00244, 5.64, -0.2237, 1.5, 25, 0, 0.00240, 2.96, 8311.7707, -2.2, -19, 0, 0.00239, 0.87, -33.7814, 0.3, 4, 0, 0.00216, 2.31, 15.9995, -2.2, -19, 0, 0.00186, 3.46, 5329.1570, -2.1, -19, 0, 0.00169, 2.40, 24357.772, 4.6, 75, 0, 0.00161, 5.80, 8329.403, 1.5, 25, 0, 0.00161, 5.20, 8327.980, 1.5, 25, 0, 0.00160, 4.26, 23385.119, -2.9, -13, 0, 0.00156, 1.26, 550.755, 0, 0, 0, 0.00155, 1.25, 21500.213, -2.8, -13, 0, 0.00152, 0.60, -16.921, -3.7, -44, 0, 0.00150, 2.71, -79.630, 0, 0, 0, 0.00150, 5.29, 15.542, 0, 0, 0, 0.00148, 1.06, -2371.232, -3.7, -44, 0, 0.00141, 0.77, 8328.691, 1.5, 25, 0, 0.00141, 3.67, 7143.075, -0.3, 0, 0, 0.00138, 5.45, 25614.376, 4.5, 75, 0, 0.00129, 4.90, 23871.446, 0.9, 31, 0, 0.00126, 4.03, 141.975, -3.8, -44, 0, 0.00124, 6.01, 522.369, 0, 0, 0, 0.00120, 4.94, -10071.622, -5.2, -69, 0, 0.00118, 5.07, -15.419, -2.2, -19, 0, 0.00107, 3.49, 23452.693, -3.4, -20, 0, 0.00104, 4.78, 17495.234, -1.3, 0, 0, 0.00103, 1.44, -18.049, -2.2, -19, 0, 0.00102, 5.63, 15542.402, -0.7, 6, 0, 0.00102, 2.59, 15543.107, -0.7, 6, 0, 0.00100, 4.11, -6.559, -1.9, -22, 0, 0.00097, 0.08, 15400.779, 3.1, 50, 0, 0.00096, 5.84, 31781.385, -1.9, 5, 0, 0.00094, 1.08, 8328.363, 0, 0, 0, 0.00094, 2.46, 16799.358, -0.7, 6, 0, 0.00094, 1.69, 6376.211, 2.2, 32, 0, 0.00093, 3.64, 8329.020, 3.0, 50, 0, 0.00093, 2.65, 16655.082, 4.6, 75, 0, 0.00090, 1.90, 15056.428, -4.4, -38, 0, 0.00089, 1.59, 52.969, 0, 0, 0, 0.00088, 2.02, -8257.704, -3.4, -47, 0, 0.00088, 3.02, 7213.711, -2.2, -19, 0, 0.00087, 0.50, 7214.415, -2.2, -19, 0, 0.00087, 0.49, 16659.684, 1.5, 25, 0, 0.00082, 5.64, -4.931, 1.5, 25, 0, 0.00079, 5.17, 13171.522, -4.3, -38, 0, 0.00076, 3.60, 29828.905, -1.3, 12, 0, 0.00076, 4.08, 24567.322, 0.3, 24, 0, 0.00076, 4.58, 1884.906, -0.1, 0, 0, 0.00073, 0.33, 31713.811, -1.4, 12, 0, 0.00073, 0.93, 32828.439, 2.4, 56, 0, 0.00071, 5.91, 38785.898, 0.2, 37, 0, 0.00069, 2.20, 15613.742, -2.5, -16, 0, 0.00066, 3.87, 15.732, -2.5, -23, 0, 0.00066, 0.86, 25823.926, 0.2, 24, 0, 0.00065, 2.52, 8170.957, 1.5, 25, 0, 0.00063, 0.18, 8322.132, -0.3, 0, 0, 0.00060, 5.84, 8326.062, 1.5, 25, 0, 0.00060, 5.15, 8331.321, 1.5, 25, 0, 0.00060, 2.18, 8486.426, 1.5, 25, 0, 0.00058, 2.30, -1.731, -4, -44, 0, 0.00058, 5.43, 14357.138, -2, -16, 0, 0.00057, 3.09, 8294.910, 2, 29, 0, 0.00057, 4.67, -8362.473, -1, -21, 0, 0.00056, 4.15, 16833.151, -1, 0, 0, 0.00054, 1.93, 7056.329, -2, -19, 0, 0.00054, 5.27, 8315.574, -2, -19, 0, 0.00052, 5.6, 8311.418, -2, -19, 0, 0.00052, 2.7, -77.552, 0, 0, 0, 0.00051, 4.3, 7230.984, 2, 25, 0, 0.00050, 0.4, -0.508, 0, 0, 0, 0.00049, 5.4, 7211.433, -2, -19, 0, 0.00049, 4.4, 7216.693, -2, -19, 0, 0.00049, 4.3, 16864.631, 0, 24, 0, 0.00049, 2.2, 16869.234, -3, -26, 0, 0.00047, 6.1, 627.596, 0, 0, 0, 0.00047, 5.0, 12.619, 1, 7, 0, 0.00045, 4.9, -8815.018, -5, -69, 0, 0.00044, 1.6, 62.133, -2, -19, 0, 0.00042, 2.9, -13.118, -4, -44, 0, 0.00042, 4.1, -119.445, 0, 0, 0, 0.00041, 4.3, 22756.817, -3, -13, 0, 0.00041, 3.6, 8288.877, 2, 25, 0, 0.00040, 0.5, 6663.308, -2, -19, 0, 0.00040, 1.1, 8368.506, 2, 25, 0, 0.00039, 4.1, 6443.786, 2, 25, 0, 0.00039, 3.1, 16657.383, 3, 50, 0, 0.00038, 0.1, 16657.031, 3, 50, 0, 0.00038, 3.0, 16657.735, 3, 50, 0, 0.00038, 4.6, 23942.433, -1, 9, 0, 0.00037, 4.3, 15385.020, -1, 6, 0, 0.00037, 5.0, 548.678, 0, 0, 0, 0.00036, 1.8, 7213.352, -2, -19, 0, 0.00036, 1.7, 7214.774, -2, -19, 0, 0.00035, 1.1, 7777.936, 2, 25, 0, 0.00035, 1.6, -8.860, 0, 0, 0, 0.00035, 4.4, 23869.145, 2, 56, 0, 0.00035, 2.0, 6691.693, -2, -19, 0, 0.00034, 1.3, -1185.616, -2, -22, 0, 0.00034, 2.2, 23873.747, -1, 6, 0, 0.00033, 2.0, -235.287, 0, 0, 0, 0.00033, 3.1, 17913.987, 3, 50, 0, 0.00033, 1.0, 8351.233, -2, -19, 0], [0.004870, 4.6693, 628.30196, -0.027, 0, -0.01, 0.002280, 2.6746, -2.30120, 1.523, 25, -0.12, 0.001500, 3.372, 6585.76091, -2.16, -19, 0.1, 0.001200, 5.728, 14914.45233, -0.64, 6, 0, 0.001080, 3.969, 7700.38947, 1.55, 25, -0.1, 0.000800, 0.742, 8956.99338, 1.50, 25, -0.1, 0.000254, 6.002, 0.3286, 1.52, 25, -0.1, 0.000210, 0.144, 7842.3648, -2.21, -19, 0, 0.000180, 2.500, 16171.0562, -0.7, 6, 0, 0.000130, 0.44, 8399.6791, -0.4, 3, 0, 0.000126, 5.03, 8326.3902, 3.0, 50, 0, 0.000120, 5.77, 14286.1504, -0.6, 6, 0, 0.000118, 5.96, 8330.9926, 0, 0, 0, 0.000110, 1.80, 23243.1438, 0.9, 31, 0, 0.000110, 3.42, 5957.4590, -2.1, -19, 0, 0.000110, 4.63, 1256.6039, -0.1, 0, 0, 0.000099, 4.70, -0.7113, 0, 0, 0, 0.000070, 0.04, 16029.0809, 3.1, 50, 0, 0.000070, 5.14, 8328.3391, 1.5, 25, 0, 0.000070, 5.85, 8329.0437, 1.5, 25, 0, 0.000060, 1.02, -1742.9305, -3.7, -44, 0, 0.000060, 3.10, 17285.6848, 3.0, 50, 0, 0.000054, 5.69, -0.352, 0, 0, 0, 0.000043, 0.52, 15.542, 0, 0, 0, 0.000041, 2.03, 2.630, 0, 0, 0, 0.000040, 0.10, 8470.667, -2.2, -19, 0, 0.000040, 4.01, 7072.088, 1.6, 25, 0, 0.000036, 2.93, -8.860, -0.3, 0, 0, 0.000030, 1.20, 22128.515, -2.8, -13, 0, 0.000030, 2.54, 15542.754, -0.7, 6, 0, 0.000027, 4.43, 7211.762, -0.7, 6, 0, 0.000026, 0.51, 15540.453, 0.9, 31, 0, 0.000026, 1.44, 15545.055, -2.2, -19, 0, 0.000025, 5.37, 7216.364, -3.7, -44, 0], [0.00001200, 1.041, -2.3012, 1.52, 25, -0.1, 0.00000170, 0.31, -0.711, 0, 0, 0]]];
	var rad = 180 * 3600 / Math.PI;
	var dt_at = new Array(-4000, 108371.7, -13036.80, 392.000, 0.0000, -500, 17201.0, -627.82, 16.170, -0.3413, -150, 12200.6, -346.41, 5.403, -0.1593, 150, 9113.8, -328.13, -1.647, 0.0377, 500, 5707.5, -391.41, 0.915, 0.3145, 900, 2203.4, -283.45, 13.034, -0.1778, 1300, 490.1, -57.35, 2.085, -0.0072, 1600, 120.0, -9.81, -1.532, 0.1403, 1700, 10.2, -0.91, 0.510, -0.0370, 1800, 13.4, -0.72, 0.202, -0.0193, 1830, 7.8, -1.81, 0.416, -0.0247, 1860, 8.3, -0.13, -0.406, 0.0292, 1880, -5.4, 0.32, -0.183, 0.0173, 1900, -2.3, 2.06, 0.169, -0.0135, 1920, 21.2, 1.69, -0.304, 0.0167, 1940, 24.2, 1.22, -0.064, 0.0031, 1960, 33.2, 0.51, 0.231, -0.0109, 1980, 51.0, 1.29, -0.026, 0.0032, 2000, 63.87, 0.1, 0, 0, 2005, 64.7, 0.4, 0, 0, 2015, 69);
	var nutB = new Array(2.1824, -33.75705, 36e-6, -1720, 920, 3.5069, 1256.66393, 11e-6, -132, 57, 1.3375, 16799.4182, -51e-6, -23, 10, 4.3649, -67.5141, 72e-6, 21, -9, 0.04, -628.302, 0, -14, 0, 2.36, 8328.691, 0, 7, 0, 3.46, 1884.966, 0, -5, 2, 5.44, 16833.175, 0, -4, 2, 3.69, 25128.110, 0, -3, 0, 3.55, 628.362, 0, 2, 0);
	function gxc_sunLon(t){
		var v = -0.043126 + 628.301955 * t - 0.000002732 * t * t;
		var e = 0.016708634 - 0.000042037 * t - 0.0000001267 * t * t;
		return (-20.49552 * (1 + e * Math.cos(v))) / rad;
	}
	function gxc_moonLon(t){
		return -3.4E-6;
	}
	function nutationLon2(t){
		var i, a, t2 = t * t, dL = 0, B = nutB;
		for (i = 0; i < B.length; i += 5) {
			if (i == 0) a = -1.742 * t;
			else a = 0;
			dL += (B[i + 3] + a) * Math.sin(B[i] + B[i + 1] * t + B[i + 2] * t2);
		}
		return dL / 100 / rad;
	}
	function dt_T(t){
		return dt_calc(t / 365.2425 + 2000) / 86400.0;
	}
	function dt_ext(y, jsd){
		var dy = (y - 1820) / 100;
		return -20 + jsd * dy * dy;
	}
	function dt_calc(y){
		var y0 = dt_at[dt_at.length - 2];
		var t0 = dt_at[dt_at.length - 1];
		if (y >= y0) {
			var jsd = 31;
			if (y > y0 + 100) return dt_ext(y, jsd);
			var v = dt_ext(y, jsd);
			var dv = dt_ext(y0, jsd) - t0;
			return v - dv * (y0 + 100 - y) / 100;
		}
		var i, d = dt_at;
		for (i = 0; i < d.length; i += 5) 
			if (y < d[i + 5]) break;
		var t1 = (y - d[i]) / (d[i + 5] - d[i]) * 10, t2 = t1 * t1, t3 = t2 * t1;
		return d[i + 1] + d[i + 2] * t1 + d[i + 3] * t2 + d[i + 4] * t3;
	}
	function XL0_calc(xt, zn, t, n){
		t /= 10;
		var i, j, v = 0, tn = 1, c;
		var F = XL0[xt], n1, n2, N;
		var n0, pn = zn * 6 + 1, N0 = F[pn + 1] - F[pn];
		for (i = 0; i < 6; i++, tn *= t) {
			n1 = F[pn + i], n2 = F[pn + 1 + i], n0 = n2 - n1;
			if (!n0) continue;
			if (n < 0) N = n2;
			else {
				N = Math.floor(3 * n * n0 / N0 + 0.5) + n1;
				if (i) N += 3;
				if (N > n2) N = n2;
			}
			for (j = n1, c = 0; j < N; j += 3) 
				c += F[j] * Math.cos(F[j + 1] + t * F[j + 2]);
			v += c * tn;
		}
		v /= F[0];
		if (xt == 0) {
			var t2 = t * t, t3 = t2 * t;
			if (zn == 0) v += (-0.0728 - 2.7702 * t - 1.1019 * t2 - 0.0996 * t3) / rad;
			if (zn == 1) v += (+0.0000 + 0.0004 * t + 0.0004 * t2 - 0.0026 * t3) / rad;
			if (zn == 2) v += (-0.0020 + 0.0044 * t + 0.0213 * t2 - 0.0250 * t3) / 1000000;
		} else {
			var dv = XL0_xzb[(xt - 1) * 3 + zn];
			if (zn == 0) v += -3 * t / rad;
			if (zn == 2) v += dv / 1000000;
			else v += dv / rad;
		}
		return v;
	}
	function XL1_calc(zn, t, n){
		var ob = XL1[zn];
		var i, j, F, N, v = 0, tn = 1, c;
		var t2 = t * t, t3 = t2 * t, t4 = t3 * t, t5 = t4 * t, tx = t - 10;
		if (zn == 0) {
			v += (3.81034409 + 8399.684730072 * t - 3.319e-05 * t2 + 3.11e-08 * t3 - 2.033e-10 * t4) * rad;
			v += 5028.792262 * t + 1.1124406 * t2 + 0.00007699 * t3 - 0.000023479 * t4 - 0.0000000178 * t5;
			if (tx > 0) v += -0.866 + 1.43 * tx + 0.054 * tx * tx;
		}
		t2 /= 1e4, t3 /= 1e8, t4 /= 1e8;
		n *= 6;
		if (n < 0) n = ob[0].length;
		for (i = 0; i < ob.length; i++, tn *= t) {
			F = ob[i];
			N = Math.floor(n * F.length / ob[0].length + 0.5);
			if (i) N += 6;
			if (N >= F.length) N = F.length;
			for (j = 0, c = 0; j < N; j += 6) 
				c += F[j] * Math.cos(F[j + 1] + t * F[j + 2] + t2 * F[j + 3] + t3 * F[j + 4] + t4 * F[j + 5]);
			v += c * tn;
		}
		if (zn != 2) v /= rad;
		return v;
	}
	var XL = {
		E_Lon: function(t, n){
			return XL0_calc(0, 0, t, n);
		},
		M_Lon: function(t, n){
			return XL1_calc(0, t, n);
		},
		E_v: function(t){
			var f = 628.307585 * t;
			return 628.332 + 21 * Math.sin(1.527 + f) + 0.44 * Math.sin(1.48 + f * 2) + 0.129 * Math.sin(5.82 + f) * t + 0.00055 * Math.sin(4.21 + f) * t * t;
		},
		M_v: function(t){
			var v = 8399.71 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t);
			v -= 179 * Math.sin(2.543 + 15542.7543 * t) + 160 * Math.sin(0.1874 + 7214.0629 * t) + 62 * Math.sin(3.14 + 16657.3828 * t) + 34 * Math.sin(4.827 + 16866.9323 * t) + 22 * Math.sin(4.9 + 23871.4457 * t) + 12 * Math.sin(2.59 + 14914.4523 * t) + 7 * Math.sin(0.23 + 6585.7609 * t) + 5 * Math.sin(0.9 + 25195.624 * t) + 5 * Math.sin(2.32 - 7700.3895 * t) + 5 * Math.sin(3.88 + 8956.9934 * t) + 5 * Math.sin(0.49 + 7771.3771 * t);
			return v;
		},
		MS_aLon: function(t, Mn, Sn){
			return this.M_Lon(t, Mn) + gxc_moonLon(t) - (this.E_Lon(t, Sn) + gxc_sunLon(t) + Math.PI);
		},
		S_aLon: function(t, n){
			return this.E_Lon(t, n) + nutationLon2(t) + gxc_sunLon(t) + Math.PI;
		},
		MS_aLon_t: function(W){
			var t, v = 7771.37714500204;
			t = (W + 1.08472) / v;
			t += (W - this.MS_aLon(t, 3, 3)) / v;
			v = this.M_v(t) - this.E_v(t);
			t += (W - this.MS_aLon(t, 20, 10)) / v;
			t += (W - this.MS_aLon(t, -1, 60)) / v;
			return t;
		},
		S_aLon_t: function(W){
			var t, v = 628.3319653318;
			t = (W - 1.75347 - Math.PI) / v;
			v = this.E_v(t);
			t += (W - this.S_aLon(t, 10)) / v;
			v = this.E_v(t);
			t += (W - this.S_aLon(t, -1)) / v;
			return t;
		},
		MS_aLon_t2: function(W){
			var t, v = 7771.37714500204;
			t = (W + 1.08472) / v;
			var L, t2 = t * t;
			t -= (-0.00003309 * t2 + 0.10976 * Math.cos(0.784758 + 8328.6914246 * t + 0.000152292 * t2) + 0.02224 * Math.cos(0.18740 + 7214.0628654 * t - 0.00021848 * t2) - 0.03342 * Math.cos(4.669257 + 628.307585 * t)) / v;
			L = this.M_Lon(t, 20) - (4.8950632 + 628.3319653318 * t + 0.000005297 * t * t + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t + 0.000349 * Math.cos(4.6261 + 1256.61517 * t) - 20.5 / rad);
			v = 7771.38 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t) - 179 * Math.sin(2.543 + 15542.7543 * t) - 160 * Math.sin(0.1874 + 7214.0629 * t);
			t += (W - L) / v;
			return t;
		},
		S_aLon_t2: function(W){
			var t, L, v = 628.3319653318;
			t = (W - 1.75347 - Math.PI) / v;
			t -= (0.000005297 * t * t + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t) / v;
			t += (W - this.E_Lon(t, 8) - Math.PI + (20.5 + 17.2 * Math.sin(2.1824 - 33.75705 * t)) / rad) / v;
			return t;
		}
	};
	function unzip(str){
		var z10 = "0000000000", z20 = z10 + z10;
		var map={J:'00',I:'000',H:'0000',G:'00000',t:'01',s:'001',r:'0001',q:'00001',p:'000001',o:'0000001',n:'00000001',m:'000000001',l:'0000000001',k:'03',j:'0303',i:'003',h:'003003',g:'0003',f:'00003',e:'000003',d:'0000003',c:'00000003',b:'000000003',a:'0000000003',A:z20+z20+z20,B:z20+z20+z10,C:z20+z20,D:z20+z10,E:z20,F:z10};
		return str.replace(/\D/g, function(c){
			return map[c];
		});
	}
	window.Lunar = Lunar;
	window.lunar = lunar;
	window.NewMoon = NewMoon;
	window.Term = Term;
})();
(function(){
	/**
	 * 节日的分类：
	 * 		t:中国传统节日
	 * 		i:世界性节日
	 * 		h:中国节假日
	 * 		c:基督教节日
	 * 		a:北美节日
	 */
	
	var FESTIVAL = {
		//t:中国传统节日
		'正月初一': 't,春节 ',
		'正月十五': 't,元宵节',
		'二月初二': 't,龙头节',
		'五月初五': 't,端午节',
		'七月初七': 't,乞巧节',
		'七月十五': 't,中元节',
		'八月十五': 't,中秋节',
		'九月初九': 't,重阳节',
		'十月初一': 't,寒衣节',
		'十月十五': 't,下元节',
		'腊月初八': 't,腊八节',
		'腊月廿三': 't,祭灶节',
		//'十二月卅日（或廿九） 除夕
		
		//i:世界性节日
		'0202': 'i,世界湿地日,1996',
		'0308': 'i,国际妇女节,1975',
		'0315': 'i,国际消费者权益日,1983',
		'0422': 'i,世界地球日,1990',
		'0501': 'i,国际劳动节,1889',
		'0512': 'i,国际护士节,1912',
		'0518': 'i,国际博物馆日,1977',
		'0605': 'i,世界环境日,1972',
		'0623': 'i,国际奥林匹克日,1948',
		'0624': 'i,世界骨质疏松日,1997',
		'1117': 'i,世界学生日,1942',
		'1201': 'i,世界爱滋病日,1988',
		
		//h:中国节假日
		'0101': 'h,元旦',
		'0312': 'h,植树节,1979',
		'0504': 'h,五四青年节,1939',
		'0601': 'h,儿童节,1950',
		'0701': 'h,建党节,1941',
		'0801': 'h,建军节,1933',
		'0910': 'h,教师节,1985',
		'1001': 'h,国庆节,1949',
		
		//c:基督教节日
		'1224': 'c,平安夜',
		'1225': 'c,圣诞节',
		
		//a:北美节日
		'0214': 'a,西洋情人节',
		w: {
			'0520': 'i,母亲节,1913',
			'0630': 'a,父亲节',
			'1144': 'a,感恩节(美国)',
			'1021': 'a,感恩节(加拿大)',
		}
	};
	
	Lunar.prototype.festival = function(){
		var y = this.oDate.getFullYear(), m = this.oDate.getMonth() + 1, d = this.oDate.getDate(), skey = align(m) + align(d);
		var day = this.oDate.getDay(), nWeek = Math.ceil(d / 7), wkey = align(m) + nWeek + day;
		var M = this.lMonth, D = this.lDate, lkey = M + '月' + D;
		var arRslt = [];
		if (this.lNextMonth == '正' && D == (this.isBigMonth ? '三十' : '廿九')) {
			arRslt.push('t,除夕');
		}
		if (FESTIVAL.w[wkey]) {
			arRslt = arRslt.concat(FESTIVAL.w[wkey].split('|'));
		}
		if (FESTIVAL[skey]) {
			arRslt = arRslt.concat(FESTIVAL[skey].split('|'));
		}
		if (FESTIVAL[lkey]) {
			arRslt = arRslt.concat(FESTIVAL[lkey].split('|'));
		}
		for (var t, i = arRslt.length - 1; i > -1; i--) {
			t = arRslt[i].split(',');
			if (t[2] && y < t[2] - 0) {
				arRslt.splice(i, 1);
				continue;
			}
			arRslt[i] = {
				type: t[0],
				desc: t[1]
			}
		}
		return arRslt.sort(function(a, b){
			return b.type.charCodeAt(0) - a.type.charCodeAt(0);
		});
	};
	function align(n){
		return (n < 10 ? '0' : '') + n;
	}
})();

//for lunarPicker
(function(){
	Lunar.prototype.getMonthInfo = function(){
		var ar = this.newMoons, date = new Date(this.oDate);
		if (this.mjd < this.newMoons[ar.zyIndex].JD) {
			ar = NewMoon.getNewMoons(Term.getTerms(this.terms[3].JD - 24 * 15.2184));
		}
		ar = ar.slice(ar.zyIndex).slice(0, ar.leapIndex ? 13 : 12);
		date.setDate(date.getDate() - Math.round(this.mjd) + ar[0].JD);
		ar.solarSpringDay = date;
		return ar;
	};
})();
(function(){
	var $menu;
	function getMenu(){
		if (!$menu) {
			$menu = $(['<div class="create_schedule_list_layer none"><ul></ul><div class="layer_arrow_left">', $.map(new Array(10), function(_, i){
				return ['<em class="arrow_', '"></em>'].join(i + 1);
			}).reverse().join(''), '</div></div>'].join('')).appendTo('body');
			
			$menu.click(function(evt){
				closeMenu();
			});
			$('body').bind('click', closeMenu);
		}
		return $menu;
	}
	
	function closeMenu(evt){
		if ($menu && $menu.is(':visible')) {
			$menu.hide('fade');
		}
	}
	
	$.widget('mxx.rightBubbleMenu', {
		options: {
			buttons: [],
			stopPropagation: false
		},
		_create: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			
			$elem.click(function(evt){
				evt.preventDefault();
				opt.stopPropagation && evt.stopPropagation();
				var offset = $elem.offset(), t = offset.top, l = offset.left, $menu = getMenu(), $ul = $menu.find('ul');
				
				$ul.empty().html($.format('<li><a href="javascript:;">{text}</a></li>', opt.buttons));
				$ul.find('li').each(function(i, li){
					var $li = $(li), method = opt.buttons[i].onclick;
					$.isFunction(method) ? $li.click($.proxy(method, $elem)) : $li[method]($.extend(opt.buttons[i].params, {
						target: $elem
					}));
				});
				$menu.css({
					top: t - 20 + Math.floor($elem.height() / 2),
					left: l + $elem.width() + 10
				}).show('fade');
			});
		}
	});
	
})();
$.widget('mxx.calendarList', {
	options: {},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		//当前已有日历使用过的颜色
		self.usedColors = {};
		
		var $btn = $elem.find(".my_calendar_nav a.left_create_schedule_btn");
		$elem.find(".my_calendar_nav").mouseenter(function(evt){
			$btn.stop(true, true).show('fade');
		}).mouseleave(function(){
			if (!($btn.data('bubbleMenu') && $btn.data('bubbleMenu').filter(':visible').size())) {
				$btn.stop(true, true).hide('fade');
			}
		});
		
		//点击展开或者折叠子项
		$elem.find("dl.my_calendar_nav dt,dl.group_calendar_nav dt,dl.palug_nav dt").click(function(evt){
			$('a.js_cldname', this).toggleClass('open');
			if ($(this).next().find('li').size()) {
				$(this).next().stop(true, true).slideToggle();
			}
		});
		
		//点击加号按钮显示操作菜单
		$elem.find(".my_calendar_nav dt a.left_create_schedule_btn").rightBubbleMenu({
			stopPropagation: true,
			onClose: function(evt){
				this.hide('fade');
			},
			buttons: [{
				text: '新建日历',
				onclick: 'calendarCreator'
			}, {
				text: G.googleID ? '解除绑定：' + G.googleID : '绑定Google日历',
				onclick: function(evt){
					if (G.googleID) {
						$.confirm('确定要解除与Google帐号的绑定吗？', {
							buttons: [{
								click: function(){
									var dialog = this;
									$.ajax({
										type: 'post',
										url: '/removeGoogleBind-web.do',
										success: function(rslt){
											if (rslt == 'ok') {
												G.googleID = "";
											}
											$(dialog).dialog('close');
										},
										dataType: 'json'
									});
								}
							}]
						});
					} else {
						var instWin = open('http://when.365rili.com/google-account-bind-web.do', 'bindGoogleAnd365', 'width=347,height=530');
						var intervalId = setInterval(function(){
							if (instWin.closed) {
								location.reload();
							}
						}, 100);
					}
				}
			}]
		});
		
		//点击列表子项，切换选中状态。 经过时显示更多操作按钮
		$('.my_calendar_nav li, .group_calendar_nav li', $elem).live('click', function(evt){
			var $li = $(this);
			$li.find('div').toggleClass('on');
			self.recordSelectedCalendarIDs();
			G.cldPanel.calendarPanel('refresh');
		}).live('mouseenter', function(evt){
			$('a.arrow', this).stop(true, true).show('fade');
		}).live('mouseleave', function(evt){
			var $btn = $('a.arrow', this);
			if (!($btn.data('bubbleMenu') && $btn.data('bubbleMenu').filter(':visible').size())) {
				$btn.stop(true, true).hide('fade');
			}
		});
		
		$('#lnk_left_switcher').click(function(){
			$elem.toggleClass("my_calendar_leftnone");
			$elem.hasClass('my_calendar_leftnone') && $elem.find('dl.palug_nav').find('dd').show().end().find('a.js_cldname').addClass('open');
			$(this).toggleClass("hidden_bg");
		});
	},
	_init: function(newCldId){
		var self = this, $elem = $(this.element), opt = this.options;
		
		//获取日历列表数据
		$.ajax({
			url: '/calendar/getCalendarListByUser.do',
			type: 'post',
			dataType: 'json',
			success: function(data){
				self.cldListData = data;
				self._renderList(newCldId);
			}
		});
	},
	init: function(newCldId){
		this._init(newCldId);
	},
	_renderList: function(newCldId){
		var self = this, $elem = $(this.element), opt = this.options;
		var ckCldIDs = $.cookie('selectedClds' + G.currUser.id);
		var ids = ckCldIDs ? ckCldIDs.split(',') : [];
		if (newCldId) {
			ids.push(newCldId);
		}
		var tmpl = '<li title="{title}" class="e_clear"><a href="javascript:;" class="arrow my_calendar_nav_set none" cldID="{id}" cldName="{title}" isprimary="{is_primary}"></a><div class="checkbox ui-corner-all-16 iepng{selected}" cldID="{id}" cldName="{title}" style="border-color:{color}; background-color:{lightcolor};"></div><span class="my_calendar_nav_txt">{title}</span></li>';
		self.oPermissions = {};
		var html = $.format(tmpl, $.map(self.cldListData, function(o){
			self.oPermissions[o.id] = o.access_type;
			o.selected = ckCldIDs == null || $.inArray(o.id, ids) > -1 ? ' on' : '';
			var hsl = rgbToHsl(o.color), h = hsl[0], s = hsl[1];
			o.lightcolor = hslToRgb.call(null, h, s, 0.70);
			return self.usedColors[String(o.color).toLowerCase()] = o;
		}));
		$elem.find('dl.my_calendar_nav ul').html(html);
		self.recordSelectedCalendarIDs();
		self._makeBubbleMenu();
		G.cldPanel.calendarPanel('refresh');
	},
	_makeBubbleMenu: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		var mEdit = {
			text: '编辑日历',
			onclick: 'calendarCreator'
		}, mDel = {
			text: '删除日历',
			onclick: function(evt){
				var cldID = $(this).attr('cldID'), name = $(this).attr('cldName');
				$.confirm('确定要删除这个日历吗？', {
					buttons: [{
						text: "删除",
						click: function(){
							$(this).dialog("close");
							self._deleteCalendar(cldID);
						}
					}, {
						text: "取消",
						click: function(){
							$(this).dialog("close");
						}
					}]
				});
			}
		}, mOnly = {
			text: '只显示此日历',
			onclick: function(evt){
				var cldID = $(this).attr('cldID');
				self.showOnly(cldID);
			}
		}, mRevoke = {
			text: '取消订阅',
			onclick: function(evt){
				var cldID = $(this).attr('cldID'), name = $(this).attr('cldName');
				$.confirm('确认取消订阅这个日历吗？', {
					buttons: [{
						text: "确定",
						click: function(){
							$(this).dialog("close");
							self._revokeCalendar(cldID);
						}
					}]
				});
			}
		};
		
		$elem.find("a.arrow").each(function(){
			var $lnk = $(this), isPrimary = $lnk.attr('isprimary') == 'true', id = $lnk.attr('cldID'), permit = self.oPermissions[id];
			$lnk.rightBubbleMenu({
				stopPropagation: true,
				onClose: function(evt){
					this.hide('fade');
				},
				buttons: (permit == 1 || permit == 2 ? [] : isPrimary ? [mEdit] : [mEdit, mDel]).concat(isPrimary ? [mOnly] : [mRevoke, mOnly])
			});
		});
		
	},
	showOnly: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		$elem.find('.my_calendar_nav li div').removeClass('on').filter('[cldID="' + cldID + '"]').addClass('on');
		self.recordSelectedCalendarIDs();
		G.cldPanel.calendarPanel('refresh');
	},
	_deleteCalendar: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		//删除日历
		$.ajax({
			url: '/main/calendarManager/delete.do',
			type: 'post',
			dataType: 'json',
			data: 'calendarId=' + cldID,
			success: function(data){
				if (data === true) {
					self._init();
				} else if (data.state == 'wrongpass') {
					$.alert('对不起，您的登录已经过期，请重新登录！', {
						buttons: {
							'确定': function(){
								location = '/account/login.do';
							}
						}
					});
				} else if (data == 'false') {
					$.alert('对不起，您没有删除该日历的权限！');
				}
			}
		});
	},
	_revokeCalendar: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		$.ajax({
			type: 'post',
			url: '/main/calendarManager/revoke.do',
			data: {
				calendarId: cldID
			},
			success: function(data){
				if (data === true) {
					self._init();
				} else if (data.state == 'wrongpass') {
					$.alert('对不起，您的登录已经过期，请重新登录！', {
						buttons: {
							'确定': function(){
								location = '/account/login.do';
							}
						}
					});
				} else {
				
				}
			},
			dataType: 'json'
		});
	},
	recordSelectedCalendarIDs: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$.cookie('selectedClds' + G.currUser.id, self.getSelectedCalendarIDs().join(','));
	},
	getSelectedCalendarIDs: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var $els = $elem.find('dl.my_calendar_nav ul div');
		return $els.size() ? $els.filter('.on').map(function(){
			return parseInt($(this).attr('cldID'));
		}).get() : null;
	},
	getAllCalendarNames: function(noReadOnly){
		var self = this, $elem = $(this.element), opt = this.options;
		var rslt = {};
		if (self.cldListData) {
			$.each(self.cldListData, function(i, o){
				if (!noReadOnly || self.oPermissions[o.id] != 1) {
					rslt[o.title] = o.id;
				}
			});
		}
		return rslt;
	},
	getNameById: function(cid){
		var self = this, $elem = $(this.element), opt = this.options;
		for (var o, i = 0, l = self.cldListData.length; i < l; i++) {
			o = self.cldListData[i];
			if (o.id == cid) {
				return o.title;
			}
		}
		return null;
	},
	setColor: function($container, prefix){
		var self = this, $elem = $(this.element), opt = this.options;
		if (self.cldListData) {
			$.each(self.cldListData, function(i, o){
				var $elems = $container.find(prefix + o.id).hide();
				var hsl = rgbToHsl(o.color), h = hsl[0], s = hsl[1], l = hsl[2];
				$elems.css({
					backgroundColor: hslToRgb.call(null, h, s, 0.96),
					borderColor: o.color
				});
				$elems.find('div.spheric').css({
					backgroundColor: hslToRgb.call(null, h, s, 0.80),
					borderColor: o.color
				});
				$elems.show();
			});
		}
	},
	getUsedColors: function(){
		return this.usedColors;
	},
	getPermissionsMap: function(){
		return this.oPermissions;
	}
});
$.widget('mxx.calendarPanel', {
	options: {
		defaultDate: G.currDate,
		year: '#sp_year',
		month: '#sp_month',
		prevBtn: '#lnk_prev',
		nextBtn: '#lnk_next',
		todayBtn: '#lnk_today',
		dateTip: '#div_calendar_right'
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		this.date = new Date(+opt.defaultDate);
		this.panel = $elem;
		this.year = $(opt.year);
		this.month = $(opt.month);
		this.prevBtn = $(opt.prevBtn);
		this.nextBtn = $(opt.nextBtn);
		this.todayBtn = $(opt.todayBtn);
		this.dateTip = $(opt.dateTip);
		this.dateTipYi = this.dateTip.find('div.almanac_content div.fitting');
		this.dateTipJi = this.dateTip.find('div.almanac_content div.shun');
		this.today = new Date(+G.currDate);
		this.headHtml = '<table cellspacing="0" cellpadding="0" width="100%" height="38" class="js_tb_head"><tbody><tr class="calendar_th"><th height="38">周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th class="weekend">周六</th><th class="weekend">周日</th></tr></tbody></table>';
		this.tdHtml = '<td class="{monthClass}" date="{date}"><dl class="day_box"><dt><span>{solar}</span>&nbsp;&nbsp;<span style="color:#{color}">{lunar}</span></dt><dd class="task_more"></dd></dl></td>';
		this.tmplTask = '<dd stime="{start_time}" rtype="{repeat_type}" cid="{cid}" sid="{id}" access_type="{access_type}" class="task ui-corner-all jsc-{cid}" cont="{text}"><div class="spheric ui-corner-all-16"></div><p class="task_text" title="{time}&nbsp;{text}">{time}&nbsp;{text}</p></dd>';
		this.tmplMore = '<div class="schedule_list_layer ui-shadow none"><dl><dt><a href="javascript:;" class="close_btn"></a><span></span></dt></dl></div>';
		
		this.prevBtn.add(this.nextBtn).add(this.todayBtn).click(function(evt){
			evt.preventDefault();
			var $lnk = $(this), delta = Number($lnk.attr('delta'));
			delta ? self.date.setDate(delta > 0 ? 32 : 0) : (self.date = new Date(+G.currDate));
			self._init();
		});
		this.year.add(this.month).mousewheel(function(evt, delta){
			if (this.id == opt.month.slice(1)) {
				self[delta < 0 ? 'prevBtn' : 'nextBtn'].click();
			} else {
				var year = self.year.html() - 0, month = self.month.html() - 0;
				self.date = new Date(year + delta, month - 1, 1);
				self._init();
			}
		});
		$("#lnk_right_switcher").click(function(){
			if (self.dateTip.hasClass('almanac_layer')) {
				self.dateTip.removeClass('almanac_layer').addClass('my_calendar_right');
				G.cldList.removeClass('my_calendar_rightnone');
			} else {
				self.dateTip.removeClass('my_calendar_right').addClass('almanac_layer none').hide();
				G.cldList.addClass('my_calendar_rightnone')
			}
		});
		
		$(window).resize(function(){
			self.fixPanelHeight();
		});
	},
	_init: function(sid){
		var self = this, $elem = $(this.element), opt = this.options;
		
		var cld = new Calendar(this.date), calYear = this.date.getFullYear(), calMonth = this.date.getMonth(), calDate = this.date.getDate(), t = this.today;
		this.fromDate = cld.getCalendarFirstDate();
		var startDate = new Date(this.fromDate), rowsHtml = $.map(new Array(42), function(_, i){
			var y = startDate.getFullYear(), m = startDate.getMonth(), d = startDate.getDate(), w = startDate.getDay();
			var l = lunar(startDate), festival = l.festival();
			return [i % 7 == 0 ? '<tr>' : '', $.format(self.tdHtml, {
				monthClass: m < calMonth ? 'month_befor' : m > calMonth ? 'month_after' : d == t.getDate() && m == t.getMonth() && y == t.getFullYear() ? 'table-today' : w == 0 || w == 6 ? 'weekend' : '',
				solar: startDate.getDate(),
				lunar: festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
				date: formatDate(startDate),
				color: festival.length || l.term ? '198500' : '808080'
			}), i % 7 == 6 ? '</tr>' : '', void (startDate.setDate(startDate.getDate() + 1))].join('');
		});
		this.toDate = new Date(startDate);
		this.panel.html([self.headHtml, '<table cellspacing="0" cellpadding="0" width="100%" class="calendar_table">', rowsHtml.join(''), '</table>'].join(''));
		this.mainTable = this.panel.find('table.calendar_table');
		this.schContainers = this.mainTable.find('dl');
		this.year.html(calYear);
		this.month.html(('0' + (calMonth + 1)).slice(-2));
		this.todayBtn[calYear == this.today.getFullYear() && calMonth == this.today.getMonth() ? 'hide' : 'show']();
		this.fixPanelHeight();
		this.selectable();
		this.droppable();
		this.moreTask();
		this.panel.find('table.calendar_table td').scheduleCreator();
		this.scheduleData = [];
		this.refresh(sid);
	},
	/**
	 * 创建日历列表、切换日历显示状态
	 * 新增日程、修改日程、删除日程
	 */
	refresh: function(sid){
		var self = this, $elem = $(this.element), opt = this.options;
		var cldIDs = G.cldList.calendarList('getSelectedCalendarIDs');
		if (cldIDs !== null) {
			var arNeedLoad = [], allCacheIds = $.map(this.scheduleData, function(o){
				return o.cid;
			});
			arNeedLoad = $.map(cldIDs, function(id){
				return $.inArray(id, allCacheIds) > -1 ? undefined : id;
			});
			if (arNeedLoad.length) {
				$.ajax({
					url: '/schedule/list.do',
					type: 'post',
					dataType: 'json',
					data: {
						fromDate: formatDate(this.fromDate),
						toDate: formatDate(this.toDate),
						timeZone: -this.fromDate.getTimezoneOffset() / 60,
						calendarId: arNeedLoad.join(',')
					},
					success: function(data){
						if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						} else {
							self.mergeScheduleData(data);
							self.showSchedules(cldIDs, sid);
						}
					}
				});
			} else if (this.scheduleData.length) {
				self.showSchedules(cldIDs);
			}
		}
	},
	showSchedules: function(cldIDs, sid){
		var self = this, $elem = $(this.element), opt = this.options;
		var $tasks = $('#notexist'), $dls = $('#notexist'), oSort = {}, oPermissions = G.cldList.calendarList('getPermissionsMap');
		this.schContainers.find('dd').hide().filter('.task').remove();
		$.each(this.getScheduleData(cldIDs), function(_, c){
			$.each(c.schlist, function(_, o){
				var date = o.start_time.split(' ')[0];
				if (!oSort[date]) {
					oSort[date] = [];
				}
				o.access_type = oPermissions[o.cid];
				o.time = o.start_time.slice(11, 16);
				oSort[date].push($.format(self.tmplTask, o));
			});
		});
		
		$.each(oSort, function(d, ar){
			var $dl = self.panel.find('td[date="' + d + '"] dl'), $dds = $(ar.sort().join(''));
			$dl.find('dd.task_more').before($dds);
			$tasks = $tasks.add($dds);
			$dls = $dls.add($dl);
		});
		
		this.tip($tasks);
		G.cldList.calendarList('setColor', self.panel, 'dd.jsc-');
		this.fixSize($dls);
		this.draggable();
		if (sid) {
			var $dl = self.panel.find('td[date="' + formatDate(self.date) + '"] dl');
			if ($dl.size()) {
				var $more = $dl.find('dd.task_more');
				if ($more.is(':visible')) {
					$more.click();
					self.moreTip.find('dd[sid="' + sid + '"]').click();
				} else {
					$dl.find('dd[sid="' + sid + '"]').click();
				}
			}
		}
	},
	getScheduleData: function(cids){
		return $.map(this.scheduleData, function(o){
			return $.inArray(o.cid, cids) > -1 ? o : undefined;
		});
	},
	mergeScheduleData: function(data){
		var self = this, $elem = $(this.element), opt = this.options;
		if ($.isPlainObject(data)) {
			data = [data];
		}
		$.each(data, function(i, o){
			var cid = o.cid;
			for (var c, i = 0, l = self.scheduleData.length; i < l; i++) {
				c = self.scheduleData[i];
				if (c.cid == cid) {
					$.each(o.schlist, function(_, s){
						for (var j = c.schlist.length - 1; j > -1; j--) {
							if (s.id == c.schlist[j].id) {
								c.schlist.splice(j, 1);
							}
						}
					});
					c.schlist = c.schlist.concat(o.schlist);
					return false;
				}
			}
			self.scheduleData.push(o);
		});
		self.scheduleData.sort(function(a, b){ return a.cid - b.cid; });
	},
	deleteScheduleData: function(sid){
		var self = this, $elem = $(this.element), opt = this.options;
		for (var c, i = 0, l = self.scheduleData.length; i < l; i++) {
			c = self.scheduleData[i];
			for (var j = c.schlist.length - 1; j > -1; j--) {
				if (sid == c.schlist[j].id) {
					c.schlist.splice(j, 1);
				}
			}
		}
	},
	draggable: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.schContainers.find('dd.task[access_type!="1"]').draggable({
			helper: 'clone',
			appendTo: 'body',
			containment: self.mainTable,
			opacity: 0.65,
			zIndex: 9999,
			start: function(evt, ui){
				ui.helper.width($(this).width());
			}
		});
	},
	droppable: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.mainTable.find('td').droppable({
			drop: function(evt, ui){
				var rtype = ui.draggable.attr('rtype'), $td = $(this), date = new Date($td.attr('date').replace(/-/g, '/'));
				if (!$td.find(ui.draggable).size()) {
					if (rtype == "0") {
						ui.draggable.triggerHandler('click', true);
						var $detail = self.$tip.find('a.js_detail');
						$detail.scheduleCreator('autoSave', function($form){
							$form.startTime.datepicker('setDate', date);
						});
						$detail.click();
					} else {
						ui.draggable.click();
						self.$tip.find('a.js_detail').click();
					}
				}
			}
		});
	},
	selectable: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.panel.find('table.calendar_table').selectable({
			filter: 'td',
			cancel: 'dd',
			selecting: function(evt, ui){
				$(ui.selecting).addClass('selected');
			},
			unselecting: function(evt, ui){
				$(ui.unselecting).removeClass('selected');
			},
			stop: function(evt, ui){
				var $tds = self.panel.find('table.calendar_table td.selected');
				if ($tds.size()) {
					$tds.first().scheduleCreator('showForm', $tds, evt);
				}
			}
		});
	},
	moreTask: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		if (!self.moreTip) {
			self.moreTip = $(self.tmplMore).appendTo('body');
			self.moreTip.resizable();
			self.moreTip.find('a.close_btn').click(function(){
				self.moreTip.hide('fade');
			});
		}
		self.moreTip.hide();
		self.panel.find('dd.task_more').click(function(evt){
			evt.stopPropagation();
			var $more = $(this), $dl = $more.parent(), $td = $dl.parent(), $tasks = $dl.find('dd.task').clone().show(), d = $td.attr('date').split('-'), date = new Date(d.join('/'));
			self.moreTip.find('dt span').html([date.getFullYear(), '年', date.getMonth() + 1, '月', date.getDate(), '日 星期', '日一二三四五六'.split('')[date.getDay()]].join(''));
			self.moreTip.find('dl').find('dd.task').remove().end().append($tasks).end().width(Math.max($td.width(), 165)).show().position({
				of: $td,
				my: 'left top',
				at: 'left top',
				collision: 'fit'
			});
			self.tip($tasks);
			$tasks.filter('[access_type!="1"]').draggable({
				helper: 'clone',
				appendTo: 'body',
				containment: self.mainTable,
				opacity: 0.65,
				zIndex: 9999,
				start: function(evt, ui){
					ui.helper.width($(this).width());
				}
			});
		});
	},
	getDate: function(){
		return this.date;
	},
	setDate: function(date, sid){
		this.date = date instanceof Date ? date : new Date(date);
		this._init(sid);
	},
	tip: function($els){
		var self = this, $elem = $(this.element), opt = this.options;
		function closeTip(){
			self.$tip.removeData('lastTip').hide('fade');
		}
		if (!self.$tip) {
			self.$tip = $('<div class="schedule_layer ui-shadow none"></div>').appendTo('body');
			self.$tip.click(function(evt){
				var $lnk = $(evt.target);
				if ($lnk.hasClass('js_delete')) {
					var sid = $lnk.attr('sid');
					$.confirm('确定要删除这个日程吗？', {
						buttons: [{
							text: "删除",
							click: function(){
								var dialog = this;
								$.getJSON('/schedule/delete.do?scheduleId=' + sid, function(data){
									if (data == true) {
										$(dialog).dialog("close");
										$(self.$tip.data('lastTip')).remove();
										closeTip();
										self.deleteScheduleData(sid)
										self.refresh();
									} else if (data.state == 'wrongpass') {
										$.alert('对不起，您的登录已经过期，请重新登录！', {
											buttons: {
												'确定': function(){
													location = '/account/login.do';
												}
											}
										});
									}
								});
							}
						}, {
							text: "取消",
							click: function(){
								$(this).dialog("close");
							}
						}]
					});
				} else if ($lnk.hasClass('close_btn')) {
					closeTip();
				}
			});
		}
		self.$tip.hide();
		
		var tmpl = '<a href="javascript:;" class="close_btn"></a><h2>{calendarName}</h2><div class="schedule_content"><p><span>时间：</span>{datetime}</p>\
		<p><span>内容：</span>{content}</p></div><div class="schedule_bottom{editable}"><a href="javascript:;" class="js_delete" sid="{sid}">删除</a><i>|</i><a href="javascript:;" sid="{sid}" date={date} class="js_detail">详细设置</a></div>\
		<div class="layer_arrow"><em class="arrow_1 ui-shadow"></em><em class="arrow_2 ui-shadow"></em><em class="arrow_3 ui-shadow"></em><em class="arrow_4 ui-shadow"></em><em class="arrow_5 ui-shadow"></em>\
		<em class="arrow_6 ui-shadow"></em><em class="arrow_7 ui-shadow"></em><em class="arrow_8 ui-shadow"></em><em class="arrow_9 ui-shadow"></em><em class="arrow_10 ui-shadow"></em>\
		<em class="arrow_11 ui-shadow"></em><em class="arrow_12 ui-shadow"></em></div>';
		
		$els.click(function(evt, isOutSight){
			evt.stopPropagation();
			var $el = $(this), cid = $el.attr('cid'), access_type = $el.attr('access_type');
			if (self.$tip.data('lastTip') == this && self.$tip.is(':visible')) {
				self.$tip.hide('fade');
			} else {
				self.$tip.html($.format(tmpl, {
					calendarName: G.cldList.calendarList('getNameById', cid),
					datetime: $el.attr('stime'),
					content: $el.attr('cont'),
					sid: $el.attr('sid'),
					date: $el.attr('stime').split(' ')[0],
					editable: access_type == 2 || access_type == 3 ? '' : ' none'
				})).show('fade').position(isOutSight ? {
					of: 'body',
					my: 'right',
					at: 'left',
					offset: '-20'
				} : {
					collision: 'fit',
					my: "center bottom",
					at: "center top",
					of: this
				}).data('lastTip', this);
				self.$tip.find('a.js_detail').scheduleCreator({
					onOpen: closeTip
				});
			}
		});
	},
	fixSize: function($dls){
		$dls = $dls && $dls.size() ? $dls : this.schContainers;
		var $tasks = $dls.find('dd.task');
		if ($tasks.size()) {
			var $dl = $dls.first(), tdHeight, dlHeight, available, nVisible;
			var dtHeight = $dl.find('dt').outerHeight(), ddHeight = $tasks.first().outerHeight();
			$tasks.hide();
			$dls.each(function(i, dl){
				var $dl = $(dl), $dds = $dl.find('dd.task'), $more = $dl.find('dd.task_more').hide(), numShow;
				if (i % 6 == 0) {
					tdHeight = $dl.parent().height();
					dlHeight = $dl.height();
					available = Math.max(0, dlHeight - dtHeight);
					nVisible = Math.floor(available / ddHeight);
				}
				
				if ($dds.size() > nVisible) {
					if (nVisible < 1) {
						$more.html('还有' + $dds.size() + '个日程…').show();
					} else {
						$dds.slice(0, numShow = Math.max(0, nVisible - 1)).show();
						$more.html('还有' + ($dds.size() - numShow) + '个日程…').show();
					}
				} else {
					$dds.show();
				}
			});
		}
	},
	fixPanelHeight: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var topHeight = $('#div_top').outerHeight() + $('#div_today').outerHeight();
		this.mainTableHeight = $(document).height() - topHeight - this.panel.find('table.js_tb_head').outerHeight();
		if ($.browser.msie && parseInt($.browser.version) == 7) {
			this.mainTableHeight -= topHeight;
		}
		this.panel.find('table.calendar_table').height(this.mainTableHeight);
		if (this.scheduleData) {
			clearTimeout(this.fixSizeTimer);
			this.fixSizeTimer = setTimeout(function(){
				self.fixSize();
			}, 20);
		}
	},
	getDateRange: function(){
		return {
			from: this.fromDate,
			to: this.toDate
		}
	}
});
$.widget('mxx.userValidate', {
	options: {
		input: null,
		target: null,
		permit: null
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$elem.click(function(){
			var $ipt = opt.input, username = $ipt.val();
			if (!username) {
				return $.alert("请填写用户名或邮箱！", {
					buttons: {
						'确定': function(){
							$(this).dialog("close");
							$ipt.focus().select();
						}
					}
				});
			}
			
			$.ajax({
				type: 'post',
				url: '/account/findUser.do',
				data: {
					username: username
				},
				dataType: 'json',
				error: function(){
					$.alert('对不起，网络繁忙，请稍后再试。');
				},
				success: function(data){
					if (data.state == "correct") {
						if (!self.addUser($.extend(data, {
							accountType: "-100",
							icon: 'rili365'
						}))) {
							$.alert("该用户已在您的分享列表中！", {
								close: function(){
									$ipt.val('').focus();
								}
							});
						}
					} else if (data.state == "currentUser") {
						$.alert("您填写的是自己的用户名或邮箱！", {
							close: function(){
								$ipt.val('').focus();
							}
						});
					} else if (data.state == "noExist") {
						var rEemail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
						if (rEemail.test(username)) {
							$.confirm('该用户还不是365日历用户，确定邀请您的朋友加入吗？', {
								buttons: [{
									text: '马上邀请',
									click: function(){
										if (!self.addUser($.extend(data, {
											accountType: "-300",
											userid: '-1',
											username: username,
											icon: 'email_icon'
										}))) {
											$.alert("该用户已在您的分享列表中！", {
												close: function(){
													$ipt.val('').focus();
												}
											});
										}
										$(this).dialog('close');
									}
								}]
							});
						} else if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						} else {
							$.alert("该用户不存在，请输入您要邀请的的邮箱地址！", {
								close: function(){
									$ipt.focus().select();
								}
							});
						}
					}
				}
			});
		});
	},
	addUser: function(data){
		var self = this, $elem = $(this.element), opt = this.options;
		var $tb = opt.target, $ipt = opt.input, selected = ' selected="selected"', accessType = data.accessType || opt.permit.val();
		if (!$tb.find('tr[accountType="' + data.accountType + '"][accountId="' + data.userid + '"][accountName="' + data.username + '"]').size()) {
			var tmpl = '<tr accountType="{accountType}" accountId="{userid}" accountName="{username}">\
						<td width="105" align="center">&nbsp;</td>\
						<td width="340" align="left">\
							<div class="mail_type {icon}">{username}</div>\
						</td>\
						<td width="110" align="center"><select id="dlt_user_right_{userid}"><option value="1"{readonly}>只读</option><option value="2"{edit}>编辑</option><option value="3"{admin}>管理</option></select></td>\
						<td width="60" align="center"><a href="javascript:;" class="js_del_user" title="取消当前日历对{username}的共享">删除</a></td>\
						<td width="55">&nbsp;</td>\
					</tr>';
			/*[
			 {"accountType":"-100","accountId":"29055524","accessType":"1"},
			 {"accountType":"-200","accountId":"1747514562","accessType":"2","accountName":"劉嘉玲"}
			 {"accountType":"-300","accountId":-1,"accessType":"1","accountName":"meixuexiang@gmail.com"},
			 ] */
			var $tr = $($.format(tmpl, $.extend(data, {
				readonly: accessType == '1' ? selected : '',
				edit: accessType == '2' ? selected : '',
				admin: accessType == '3' ? selected : ''
			}))).prependTo($tb);
			
			$('a.js_del_user', $tr).click(function(evt){
				evt.preventDefault();
				$(this).blur().parents('tr[accountId]').remove();
			});
			
			$ipt.val('').focus();
			return true;
		}
		return false;
	}
});
$.widget('mxx.importFromSina', {
	options: {
		target: null
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$elem.click(function(){
			self.users ? self.showUsers(self.users) : $.ajax({
				type: 'post',
				url: '/weibo/friends-web.do',
				success: function(data){
					if (data.state == 'no_weibo') {
						$.confirm('您的帐号还没有绑定新浪微博，是否现在绑定？', {
							buttons: [{
								text: '现在绑定',
								click: function(){
									$(this).dialog("close");
									location = '/account/manage.do?tab=account';
								}
							}]
						});
					} else if (data.state == 'ok') {
						self.showUsers(self.users = data.users);
					}else{
						$.alert('发现未知错误：' + data.state);
					}
				},
				dataType: 'json'
			});
		});
	},
	getAlreadyShared: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var $tb = $('#tb_share_user_list'), $trs = $tb.find('tr[accountType="-200"]'), ids = {};
		$trs.each(function(i, tr){
			var $tr = $(this), id = $tr.attr('accountId');
			ids[id] = true;
		});
		return ids;
	},
	showUsers: function(users){
		var self = this, $elem = $(this.element), opt = this.options;
		var ids = this.getAlreadyShared();
		var tmpl = '<li class="e_clear ui-corner-all" userid="{userId}" username="{screenName}"><div class="sina_avatar"><img src="{profileImageUrl.protocol}://{profileImageUrl.host}"/></div><div class="sina_name">{screenName}</div></li>';
		var html = ['<div title="请选择您的微博好友" class="sinafriend ui-corner-all ui-shadow none"><div class="sinafriend_list"><ul class="e_clear">', $.format(tmpl, $.map(users, function(o){
			return ids[o.userId] ? undefined : o;
		})), '</ul></div><div class="sinafriend_bottom ui-corner-bl ui-corner-br"><a href="javascript:;" class="sinafriend_btn js_invite">确认邀请</a><div class="search_sinafriend"><input type="text" class="enter js_filter" placeholder="输入名字搜索"/></div></div></div>'].join('');
		var $content = $(html).dialog({
			width: 836,
			resizable: false
		});
		
		var $lis = $content.find('li').click(function(evt){
			$(this).toggleClass('on');
		});
		$content.find('input.js_filter').placeholder().input({
			onInput: function(segName){
				segName ? $lis.hide().filter('[username*=' + segName + ']').show() : $lis.show();
			}
		});
		
		$content.find('a.js_invite').click(function(evt){
			var selectedUsers = $lis.filter('.on');
			if (selectedUsers.size()) {
				var arExist = [];
				selectedUsers.map(function(){
					var $li = $(this), userid = $li.attr('userid'), username = $li.attr('username');
					if (!opt.target.userValidate('addUser', {
						accountType: "-200",
						userid: userid,
						username: username,
						icon: 'sina_weibo'
					})) {
						arExist.push(username);
					}
				});
				$content.dialog('close');
				if (arExist.length) {
					$.alert('用户"' + arExist.slice(0, 3).join('"、"') + (arExist.length > 3 ? '"等' : '"') + '已在您的分享列表中');
				}
			} else {
				$.confirm("您没有选择任何新浪微博好友！ <br/>您希望：", {
					buttons: [{
						text: '选择好友',
						click: function(){
							$(this).dialog('close');
						}
					}, {
						text: '放弃选择',
						click: function(){
							$(this).dialog('close');
							$content.dialog('close');
						}
					}]
				});
			}
		});
	}
});
$.widget('mxx.calendarCreator', {
	options: {
		usedColors: [],
		attrCldID: 'cldID',
		attrCldName: 'cldName',
		target: null
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		$elem.click(function(evt){
			evt.preventDefault();
			
			var cldID, title = '创建新日历';
			if (opt.target && (cldID = opt.target.attr(opt.attrCldID))) {
				title = '编辑日历';
			}
			if (!self.addForm) {
				self._initForm();
			}
			
			self.addForm.dialog({
				title: title,
				width: 684,
				modal: true,
				open: function(evt, ui){
					cldID && self.loadData(cldID);
				}
			});
		});
	},
	_initForm: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		var usedColors = G.cldList.calendarList('getUsedColors');
		var arColors = $.map('ce312d,df4176,9a409b,6629cf,30659b,2f63cf,12ab99,2c9360,009802,64ac00,aaab00,d7af00,f08800,df5500,a9706f,8d6c8d,617488,6f82a9,5a8d87,898a4e,b18c55'.split(','), function(c, o){
			return {
				color: c,
				title: (o = usedColors['#' + c]) ? (o.title) : ''
			};
		});
		var tmpl = '<div class="create_schedule_layer ui-shadow none"><div class="create_schedule_content"><div class="create_schedule_box"><dl class="e_clear"><dt>名称：<input type="hidden" class="js_cldid"/></dt>\
		<dd><input type="text" class="schedule_name js_cldname" maxlength="20" placeholder="请输入日历名称"/></dd></dl><dl class="e_clear"><dt>选颜色：</dt><dd class="e_clear"><div class="selected_color"></div>\
		<ul class="selected_color_list e_clear">' +
		$.format('<li title="{title}" bcolor="#{color}" style="background-color:#{color};"></li>', arColors) +
		'</ul></dd></dl></div><div class="create_schedule_email"><table cellspacing="0" cellpadding="0" width="100%" ><tr><th width="105"></th><th width="340" align="left">用户</th><th width="110">权限设置</th><th width="60">删除</th><th width="55"></th></tr><tr class="operating"><td width="105" align="right">共享给：</td><td width="340" align="left"><input maxlength="" type="text" class="add_email_input js_inputname"><a href="javascript:;" class="add_email_btn js_adduser">添加</a><span class="sina_icon js_import" title="从新浪微博导入"><img src="/images/sina.png" width="16" height="16"/></span><span class="qq_icon none" title="从腾讯微博导入"><img src="/images/qq.png" width="16" height="16"/></span></td><td width="110" align="center"><select id="dlt_user_right" class="js_permit"><option value="1">只读</option><option value="2">编辑</option><option value="3">管理</option></select></td><td width="60"></td><td width="55"></td></tr><tr><td><div class="add_friends"><table class="js_userlist" cellspacing="0" cellpadding="0" width="100%" ></table></div></td></tr></table></div></div><div class="create_schedule_bottom"><a href="javascript:;" class="giveup_schedule_btn">放弃</a><a href="javascript:;" class="create_schedule_btn">保存</a></div></div>';
		
		self.addForm = $(tmpl);
		self.iptCldID = self.addForm.find('input.js_cldid');
		self.iptCldName = self.addForm.find('input.js_cldname');
		self.colorList = self.addForm.find('ul.selected_color_list');
		self.colorDemo = self.colorList.prev();
		self.userList = self.addForm.find('table.js_userlist');
		self.iptShare = self.addForm.find('input.js_inputname');
		self.lnkAdd = self.addForm.find('a.js_adduser');
		self.spImport = self.addForm.find('span.js_import')
		self.btnCancel = self.addForm.find('a.giveup_schedule_btn');
		self.btnSave = self.addForm.find('a.create_schedule_btn');
		self.permit = self.addForm.find('select.js_permit');
		
		self.iptCldName.placeholder();
		
		var $lis = self.colorList.find('li').click(function(){
			var color = $(this).attr('bcolor');
			self.colorDemo.css('background-color', color).attr('bcolor', color);
		}), $li = $lis.eq(Math.floor(Math.random() * $lis.size()));
		$lis = $lis.filter('[title=""]');
		$li = $lis.size() ? $lis.first() : $li;
		$li.click();
		
		self.lnkAdd.userValidate({
			input: self.iptShare,
			target: self.userList,
			permit: self.permit
		});
		self.iptShare.ctrlEnter({
			action: self.lnkAdd,
			noCtrl: true
		});
		self.spImport.importFromSina({
			target: self.lnkAdd
		});
		
		self.btnCancel.click(function(evt){
			self.addForm.dialog('close');
		});
		
		self.btnSave.loading();
		self.btnSave.click(function(evt){
			if (evt.isImmediatePropagationStopped() || self.btnSave.loading('is')) { return false; }
			evt.stopPropagation();
			var cid = self.iptCldID.val(), isEdit = !!cid, $ipt = self.iptCldName;
			var cldname = $.trim($ipt.placeholder('val')), color = self.colorDemo.attr('bcolor'), postData;
			if (!cldname) {
				$.alert("请给您的日历起个名吧！", {
					buttons: {
						'确定': function(){
							$(this).dialog("close");
							$ipt.focus().select();
						}
					}
				});
				return;
			}
			var allCldNames = G.cldList.calendarList('getAllCalendarNames');
			if (allCldNames[cldname] && (!isEdit || allCldNames[cldname] != cid)) {
				$.alert("日历名称不能重复，请重新起个名字吧！", {
					buttons: {
						'确定': function(){
							$(this).dialog("close");
							$ipt.focus().select();
						}
					}
				});
				return;
			}
			//TODO: 当颜色没有使用完的时候，建议不要使用重复的颜色
			
			postData = self._getShareUsersData();
			if (isEdit) {
				postData.name = cldname == self.iptCldName.attr('oriName') ? '' : cldname;
				postData.color = color == self.colorDemo.attr('oriColor') ? '' : color;
				
				if (!postData.name && !postData.color && postData.addShare == '[]' && postData.updatePower == '[]' && postData.deleShare == '[]') {
					$.confirm('日历设置没有修改，不需要保存！<br/>您希望：', {
						buttons: [{
							text: '不改了',
							click: function(){
								self.addForm.dialog('close');
								self.iptCldName.val(self.iptCldName.attr('oriName'));
								$(this).dialog('close');
							}
						}, {
							text: '继续修改'
						}]
					});
					return;
				}
			} else {
				postData = $.extend(postData, {
					color: self.colorDemo.attr('bcolor'),
					name: cldname
				});
			}
			self.btnSave.loading('start');
			$.ajax({
				url: isEdit ? '/main/calendarManager/save.do' : '/main/calendarManager/create.do',
				type: 'post',
				dataType: 'json',
				data: postData,
				success: function(data){
					self.btnSave.loading('end');
					if (data.state == 'wrongpass') {
						$.alert('对不起，您的登录已经过期，请重新登录！', {
							buttons: {
								'确定': function(){
									location = '/account/login.do';
								}
							}
						});
					} else {
						if (isEdit && data === true || data.state == 'ok') {
							G.cldList.calendarList('init', isEdit ? '' : data.calendarId);
							self.addForm.dialog('close');
						}
					}
				},
				error: function(){
					self.btnSave.loading('end');
				}
			});
		});
	},
	_getShareUsersData: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var cid = self.iptCldID.val(), isEdit = !!cid, $trs = self.userList.find('tr'), spliter = ':';
		
		if (isEdit) {
			var addShare = [], deleShare = [], updatePower = [], oUsers = {}, oUsersNoAccess = {};
			
			$.each(self.oriData.users, function(i, o){
				var ar = [o.accountType, o.accountId, o.accountName];
				oUsers[ar.join(spliter)] = o;
			});
			
			$trs.each(function(){
				var $tr = $(this), accountType = $tr.attr('accountType'), accountId = $tr.attr('accountId'), accountName = $tr.attr('accountName'), accessType = $tr.find('select').val();
				var ar = [accountType, accountId, accountName], user;
				
				if (user = oUsers[ar.join(spliter)]) {
					delete oUsers[ar.join(spliter)];
					if (accessType != user.accessType) {
						updatePower.push($.extend({}, user, {
							accessType: accessType
						}));
					}
				} else {
					addShare.push({
						accountType: accountType,
						accountId: accountId,
						accountName: accountName,
						accessType: accessType
					});
				}
			});
			
			$.each(oUsers, function(_, user){
				deleShare.push({
					accountId: user.accountId,
					accountType: user.accountType,
					invitationId: user.invitationId
				});
			});
			
			return {
				calendarId: cid,
				addShare: JSON.stringify(addShare),
				deleShare: JSON.stringify(deleShare),
				updatePower: JSON.stringify(updatePower)
			};
		} else { return {
			share: JSON.stringify($trs.map(function(){
				var $tr = $(this), obj = {
					accountType: $tr.attr('accountType'),
					accountId: $tr.attr('accountId'),
					accessType: $tr.find('select').val()
				};
				obj.accountType == '-100' || (obj.accountName = $tr.attr('accountName'));
				return obj;
			}).get())
		}; }
	},
	loadData: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		
		$.ajax('/main/getCalendarInfo.do?id=' + cldID, {
			dataType: 'json',
			cache: false,
			success: function(data){
				if (data.state == 'ok') {
					self.oriData = data;
					self.iptCldID.val(data.calendarId);
					self.iptCldName.val(data.calendarName).attr('oriName', data.calendarName);
					self.colorDemo.css('background-color', data.calendarColor).attr('bcolor', data.calendarColor).attr('oriColor', data.calendarColor);
					$.each(data.users, function(i, o){
						o = $.extend({}, o)
						o.userid = o.accountId;
						o.username = o.accountName;
						o.icon = o.accountType == '-100' ? 'rili365' : o.accountType == '-200' ? 'sina_weibo' : 'email_icon';
						self.lnkAdd.userValidate('addUser', o);
					});
				} else if (data.state == 'wrongpass') {
					$.alert('对不起，您的登录已经过期，请重新登录！', {
						buttons: {
							'确定': function(){
								location = '/account/login.do';
							}
						}
					});
				} else {
					$.alert('数据异常');
				}
			},
			error: function(){
			
			}
		});
	}
});

$.widget('mxx.lunarPicker', {
	options: {
		yearStart: 1901,
		yearEnd: 2099,
		date: new Date(),
		onChange: null
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.dlts = $elem.find('select');
		this.$year = this.dlts.eq(0);
		this.$month = this.dlts.eq(1);
		this.$date = this.dlts.eq(2);
		this.yearHtml = $.format('<option value="{value}">{text}</option>', $.map(new Array(opt.yearEnd - opt.yearStart + 1), function(_, index){
			return {
				value: index + opt.yearStart,
				text: (index + opt.yearStart) + '年'
			};
		}));
		this.$date.change(function(){
			self._triggerChangeEvent();
		});
		this.setDate(opt.date);
	},
	init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//初始化年
		var year = this.lunarDate.lYear + 1984;
		this.$year.empty().append(this.yearHtml.replace('"' + year + '"', '"' + year + '"' + ' selected="selected"'));
		
		this.$year.off('change').change(function(evt){
			self._calYearData();
			self._fillMonth(evt);
			self._fillDate(evt);
		}).change();
		
		this.$month.off('change').change(function(evt){
			self._fillDate(evt);
		}).change();
		
	},
	_fillMonth: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var month = evt.isTrigger ? ((self.lunarDate.isLeap ? 'r' : '') + (self.lunarDate.monthIndex + 1)) : self.$month.val().slice(-(self.$month.val() - 1));
		self.$month.empty().append($.format('<option idx="{INDEX}" value="{value}">{text}</option>', self.data).replace('value="' + month + '"', 'value="' + month + '"' + ' selected="selected"'));
		self.$month.change();
	},
	_fillDate: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var idx = self.$month.find('option:selected').attr('idx'), date = evt.isTrigger ? self.lunarDate.dateIndex + 1 : self.$date.val();
		self.$date.empty().append($.format('<option date="{date}" value="{value}">{text}</option>', self.data[idx].days).replace('value="' + date + '"', 'value="' + date + '"' + ' selected="selected"'));
		self.$date.change();
	},
	_triggerChangeEvent: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var optDate = this.$date.find('option:selected');
		
		$.isFunction(opt.onChange) &&
		opt.onChange.apply(this, [optDate.attr('date'), this.$year.find('option:selected').text(), this.$month.find('option:selected').text(), optDate.text()]);
	},
	_calYearData: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var ar = lunar(new Date(self.$year.val(), 2, 1)).getMonthInfo(), date = ar.solarSpringDay, obj;
		self.data = [];
		$.each(ar, function(index, o){
			obj = self.data[index] = {
				value: (o.isLeap ? 'r' : '') + ((o.index - 2) % 12 + 1),
				text: o.name + '月',
				days: []
			};
			$.each(new Array(o.days), function(dayIndex){
				obj.days.push({
					value: dayIndex + 1,
					text: Lunar.DB.dateCn[dayIndex],
					date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
				});
				date.setDate(date.getDate() + 1);
			});
		});
	},
	getDate: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return new Date(this.$date.find('option:selected').attr('date').replace(/-/g, '/'));
	},
	getLunarInfo: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return {
			year: this.$year.val(),
			month: this.$month.val(),
			date: this.$date.val(),
			cnYear: this.$year.find('option:selected').text(),
			cnMonth: this.$month.find('option:selected').text(),
			cnDate: this.$date.find('option:selected').text()
		};
	},
	setDate: function(date){
		this.date = date;
		this.lunarDate = lunar(this.date);
		this.init();
	}
});
(function(){
	var $form;
	function getForm(){
		if (!$form) {
			var tmpl = '<div id="div_add_schedule" class="add_schedule_layer complete ui-shadow none"><!--complete simple--><a href="javascript:;" class="close_btn js_close"></a><h2></h2><div class="add_schedule_content"><form><input type="hidden" name="scheduleId" value="" readonly="readonly"/><dl class="e_clear"><dt>内容：</dt><dd><textarea name="schTitle"></textarea></dd></dl><dl class="e_clear"><dt>时间：</dt><dd><div class="timetype"><label><input type="checkbox" name="alldayEvent" checked="checked"/><span>全天</span></label><label><input type="checkbox" name="chk_lunar"/><span>农历</span></label></div><div class="data_box "><ul class="js_datepicker" style="float:left;"><li><input type="text" name="startTime" readonly="readonly"/></li><li class="none js_lunarPicker"><select name="dlt_from_year"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_month"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_date"><option value="1">初一</option><option value="2">初二</option><option value="3">初三</option><option value="4">初四</option><option value="5">初五</option><option value="6">初六</option><option value="7">初七</option><option value="8">初八</option><option value="9">初九</option><option value="10">初十</option><option value="11">十一</option><option value="12">十二</option><option value="13">十三</option><option value="14">十四</option><option value="15">十五</option><option value="16">十六</option><option value="17">十七</option><option value="18">十八</option><option value="19">十九</option><option value="20">二十</option><option value="21">廿一</option><option value="22">廿二</option><option value="23">廿三</option><option value="24">廿四</option><option value="25">廿五</option><option value="26">廿六</option><option value="27">廿七</option><option value="28">廿八</option><option value="29">廿九</option><option value="30">三十</option></select></li></ul>&nbsp;<div class="hour js_time none"><select name="dlt_start_hour"><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><span>时</span><select name="dlt_start_minute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select><span>分</span></div></div></dd></dl><div class="complete_time_calender"><dl class="e_clear"><dt>日历：</dt><dd><select name="calendarId"></select></dd></dl></div><div class="complete_content"><div class="complete_set s-no"><dl class="st1 e_clear"><dt>重复类型：</dt><dd><select><option mode="s-no" value="0">不重复</option><option mode="s-dy" value="1">按天</option><option mode="s-w" value="7">按周</option><option mode="s-m" value="31">按月</option><option mode="s-dy" value="365">按年</option></select></dd></dl><dl class="st2 e_clear"><dt>重复类型：</dt><dd><select><option mode="l-no" value="0">不重复</option><option mode="l-my" value="29">农历每月</option><option mode="l-my" value="354">农历每年</option></select></dd></dl><dl class="st3 e_clear"><dt>重复频率：</dt><dd>每<select name="repeatFrequency"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option></select><span class="js_rp_unit">周</span></dd></dl><dl class="st4 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_month"><label><input type="radio" name="rdo_repeat" checked="checked" value="month"/><span>一个月的某一天</span></label><label><input type="radio" name="rdo_repeat" value="week"/><span>一周的某一天</span></label></dd></dl><dl class="st5 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_week"><label><input type="checkbox" name="chk_rp_week" day="一" value="MON"/><span>一</span></label><label><input type="checkbox" name="chk_rp_week" day="二" value="TUE"/><span>二</span></label><label><input type="checkbox" name="chk_rp_week" day="三" value="WED"/><span>三</span></label><label><input type="checkbox" name="chk_rp_week" day="四" value="THU"/><span>四</span></label><label><input type="checkbox" name="chk_rp_week" day="五" value="FRI"/><span>五</span></label><label><input type="checkbox" name="chk_rp_week" day="六" value="SAT"/><span>六</span></label><label><input type="checkbox" name="chk_rp_week" day="日" value="SUN"/><span>日</span></label>&nbsp;<a href="javascript:;" class="js-work-day" title="只选择工作日">工作日</a>&nbsp;<a href="javascript:;" class="js-rest-day" title="只选择双休日">双休日</a></dd></dl><dl class="st6 e_clear"><dt>结束条件：</dt><dd class="end_data"><ul><li><label><input type="radio" name="rdo_repeat_cond" value="never" checked="checked"/><span>从不</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="times" id="rdo_repeat_cond_1"/><span>发生</span></label><input type="text" class="end_data_text1" name="repeatCount" value="20"/><label for="rdo_repeat_cond_1"><span>次后</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="date"/><span>在</span></label><input type="text" name="repeatStopTime" class="end_data_text2" readonly="readonly"/></li></ul></dd></dl><dl class="st7 e_clear"><dt>摘要：</dt><dd class="summary"></dd></dl><dl class="e_clear"><dt>提醒设置：</dt><dd><select name="before_minutes"><option value="0">正点</option><option value="5">5分前</option><option value="10">10分前</option><option value="30">30分前</option><option value="60">1小时前</option><option value="1440">1天前</option><option value="4320">3天前</option></select></dd></dl><dl class="e_clear"><dt>关联URL：</dt><dd><input type="text" size="50" name="linked_url"/></dd></dl></div></div></form></div><div class="add_schedule_bottom"><a href="javascript:;" class="giveup_schedule_btn js_close">放弃</a><a href="javascript:;" class="create_schedule_btn js_save">保存</a><a href="javascript:;" class="simple_more">详细设置</a><div class="layer_arrow"><em class="arrow_1 ui-shadow"></em><em class="arrow_2 ui-shadow"></em><em class="arrow_3 ui-shadow"></em><em class="arrow_4 ui-shadow"></em><em class="arrow_5 ui-shadow"></em><em class="arrow_6 ui-shadow"></em><em class="arrow_7 ui-shadow"></em><em class="arrow_8 ui-shadow"></em><em class="arrow_9 ui-shadow"></em><em class="arrow_10 ui-shadow"></em><em class="arrow_11 ui-shadow"></em><em class="arrow_12 ui-shadow"></em></div></div></div>';
			$form = $(tmpl).appendTo('body');
			
			$form.find(':input[name]').each(function(){
				var $elem = $(this), name = $elem.attr('name');
				$form[name] = $form[name] ? $form[name].add($elem) : $elem;
			});
			$form.summary = $form.find('dd.summary');
			$form.liLunarPicker = $form.find('li.js_lunarPicker');
			$form.complete_set = $form.find('div.complete_set');
			$form.btnSave = $form.find('a.js_save');
			
			var ALLTYPE = 's-no s-dy s-m s-w l-no l-my';
			$form.draggable({
				containment: 'body',
				handle: 'h2',
				cancel: 'a',
				cursor: "move",
				opacity: 0.85,
				drag: function(){
					if ($form.hasClass('simple')) {
						var $tb = $('#div_calendar_panel table.calendar_table'), cor = $tb.position();
						var pos = $form.find('div.layer_arrow em:last').offset();
						pos.top -= cor.top;
						pos.left -= cor.left;
						if (pos.top >= 0 && pos.left >= 0) {
							var width = $tb.width(), height = $tb.height(), uw = Math.floor(width / 7), uh = Math.floor(height / 6);
							var y = Math.floor(pos.left / uw), x = Math.floor(pos.top / uh);
							var $td = $tb.find('td').eq(x * 7 + y), date = $td.attr('date');
							$form.startTime.datepicker('setDate', new date(strDate.replace(/-/g, '/')));
						}
					}
				}
			});
			/*
			 */
			//TODO: 内容要限制字数
			$form.find('a.js_close').click(function(){
				$form.hide('fade');
			});
			
			$form.alldayEvent.click(function(evt){
				$form.find('div.js_time')[this.checked ? 'addClass' : 'removeClass']('none');
				if (this.checked) {
					$form.dlt_start_hour.val('09');
					$form.dlt_start_minute.val('00');
				}
				summary();
			});
			
			$form.chk_lunar.click(function(evt){
				//隐藏公历，显示农历
				var $li = $form.find('ul.js_datepicker li').hide().eq(+this.checked).show();
				//计算公历对应的农历日期
				if (this.checked) {
					var $dlts = $li.find('select'), strDate = formatDate($form.startTime.datepicker('getDate')), d = new Date(strDate.replace(/-/g, '/'));
					$form.liLunarPicker.lunarPicker('setDate', d);
				} else {
					$form.startTime.datepicker('setDate', $form.liLunarPicker.lunarPicker('getDate'));
				}
				//切换公农历设置类型
				var $div = $form.complete_set.removeClass(ALLTYPE);
				$div.find('dl select').eq(+this.checked).change();
				summary();
			});
			
			$form.complete_set.find('dl.st1 select, dl.st2 select').change(function(){
				var $opt = $('option:selected', this), cname = $opt.attr('mode'), text = $opt.text();
				$form.complete_set.removeClass(ALLTYPE).addClass(cname);
				//设置重复单位
				if ('年月周天'.indexOf(text = text.charAt(text.length - 1)) > -1) {
					$form.find('span.js_rp_unit').text(text);
				}
				summary();
			});
			
			$form.chk_rp_week.click(function(){
				summary();
			});
			
			$form.rdo_repeat.click(function(){
				summary();
			});
			
			$form.repeatFrequency.change(function(){
				summary();
			});
			
			$form.liLunarPicker.lunarPicker({
				onChange: function(solar, lunarYear, lunarMonth, lunarDate){
					$form.startTime.datepicker('setDate', solar);
					summary();
				}
			});
			
			$form.startTime.add($form.repeatStopTime).datepicker($.getDPOptions({
				onSelect: function(dateText, inst){
					summary();
				}
			}));
			
			$form.repeatCount.input({
				onInput: function(val){
					summary();
				}
			});
			
			$form.rdo_repeat_cond.click(function(){
				$(this).parents('li').find('input[type="text"]').focus().select();
				summary();
			});
			
			$form.find('a.simple_more').click(function(evt){
				evt.preventDefault();
				$form.removeClass('simple').addClass('complete').position({
					of: 'body'
				});
				//$form.draggable('enable');
				$form.schTitle.focus();
			});
			
			$form.find('a.js-work-day, a.js-rest-day').click(function(evt){
				evt.preventDefault();
				$form.chk_rp_week.attr('checked', false);
				($(this).hasClass('js-work-day') ? $form.chk_rp_week.slice(0, 5) : $form.chk_rp_week.slice(-2)).attr('checked', true);
				summary();
			});
			
			$form.btnSave.loading();
			$form.btnSave.click(function(evt){
				if (evt.isImmediatePropagationStopped() || $form.btnSave.loading('is')) { return false; }
				evt.preventDefault();
				var isSimple = $form.hasClass('simple'), postData = {
					schTitle: $.trim($form.schTitle.val()),
					alldayEvent: $form.alldayEvent.is(':checked'),
					calendarId: $form.calendarId.val(),
					startTime: [($form.chk_lunar.is(':checked') ? formatDate($form.liLunarPicker.lunarPicker('getDate')) : formatDate($form.startTime.datepicker('getDate'))), ' ', $form.dlt_start_hour.val(), ':', $form.dlt_start_minute.val(), ':00'].join(''),
					timeZone: -(new Date()).getTimezoneOffset() / 60
				};
				if (!postData.schTitle) {
					$.alert("请输入日程内容", {
						buttons: {
							'确定': function(){
								$(this).dialog("close");
								$form.schTitle.focus();
							}
						}
					});
					return;
				}
				if (!isSimple) {
					var repeatType = $form.complete_set.find('dl select:visible').val() - 0;
					var dateRange = G.cldPanel.calendarPanel('getDateRange');
					var otherData = {
						repeatType: repeatType,
						calendarType: $form.chk_lunar.is(':checked') ? 'L' : 'S',
						before_minutes: $form.before_minutes.val(),
						fromDate: formatDate(dateRange.from),
						toDate: formatDate(dateRange.to),
						duration: 0,
						repeatCount: '',
						repeatDay: '',
						repeatFrequency: '',
						repeatMonth: '',
						repeatMonthDay: '',
						repeatStopTime: '',
						scheduleId: $form.scheduleId.val()
					};
					if (repeatType != 0) {
						otherData.repeatFrequency = $form.repeatFrequency.val();
						var $rdoEnd = $form.rdo_repeat_cond.filter(':checked'), endVal = $rdoEnd.val();
						if (endVal == 'date') {
							var stime = $form.repeatStopTime.val();
							if (!stime || !/^\d{4}-\d{2}-\d{2}$/.test(stime)) {
								$form.repeatStopTime.val('');
								$.alert("请选择结束日期", {
									buttons: {
										'确定': function(){
											$(this).dialog("close");
											$form.repeatStopTime.focus();
										}
									}
								});
								return;
							}
							otherData.repeatStopTime = stime + ' 00:00:00';
						} else if (endVal == 'times') {
							var stime = parseInt($form.repeatCount.val());
							if (isNaN(stime)) {
								$.alert("请选择结束次数", {
									buttons: {
										'确定': function(){
											$(this).dialog("close");
											$form.repeatCount.val(20).focus().select();
										}
									}
								});
								return;
							}
							otherData.repeatCount = stime;
						}
					}
					var url = $.trim($form.linked_url.val());
					//if (url) {
					otherData.linked_url = url;
					//}
					switch (repeatType) {
						case 7:
							otherData.repeatDay = $form.chk_rp_week.filter(':checked').map(function(){ return $(this).val(); }).get().join(':');
							if (!otherData.repeatDay) {
								$.alert("请选择重复时间", {
									buttons: {
										'确定': function(){
											$(this).dialog("close");
										}
									}
								});
								return;
							}
							break;
						case 31:
							var type = $form.rdo_repeat.filter(':checked').val(), d = $form.startTime.datepicker('getDate');
							if (type == 'month') {
								otherData.repeatMonthDay = d.getDate();
							} else {
								otherData.repeatDay = Math.ceil(d.getDate() / 7) + 'SUN MON TUE WED THU FRI SAT'.split(' ')[d.getDay()]
							}
							break;
						case 365:
							var d = $form.startTime.datepicker('getDate');
							otherData.repeatMonth = d.getMonth();
							otherData.repeatMonthDay = d.getDate();
							break;
						case 29:
							otherData.repeatMonthDay = $form.liLunarPicker.lunarPicker('getLunarInfo').date
							break;
						case 354:
							var d = $form.startTime.datepicker('getDate'), l = lunar(d);
							otherData.repeatMonth = l.monthIndex;
							otherData.repeatMonthDay = l.dateIndex + 1;
							break;
						default:
							break;
					}
					postData = $.extend(postData, otherData);
				}

				postData.updateV2Origin = '5';
				
				$form.btnSave.loading('start');
				$.ajax({
					url: '/schedule/updateV2.do',
					type: 'post',
					dataType: 'json',
					data: postData,
					success: function(data){
						$form.btnSave.loading('end');
						$form.find(':input').attr('disabled', false);
						//{"cid":51972177,"schlist":[{"id":51562287,"start_time":"2012-11-01 09:00:00","text":"get up","duration":0,"allday_event":true,"cid":51972177,"repeat_type":1}],"emailList":"meixuexiang@gmail.com","weiboList":" @鍾欣桐","state":"ok"}
						if (data.state == 'ok') {
							$form.hide('fade');
							postData.scheduleId && G.cldPanel.calendarPanel('deleteScheduleData', postData.scheduleId);
							G.cldPanel.calendarPanel('mergeScheduleData', data);
							G.cldPanel.calendarPanel('refresh');
							
							var notice = [];
							if (data.emailList) {
								notice.push("发送邮件提醒给(" + data.emailList + ")");
							}
							if (data.weiboList) {
								notice.push("发送微博提醒给(" + data.weiboList + ")");
							}
							if (notice.length) {
								notice.unshift('您的一些小组日历成员还没有注册365日历，<br/>需要通过如下方式通知TA们这条日程吗？');
								$.confirm(notice.join('<br/>'), {
									width: 400,
									buttons: [{
										text: "通知",
										click: function(){
											var dialog = this;
											$.ajax({
												type: 'post',
												data: {
													cid: data.cid,
													scheduleId: data.schlist[0].id
												},
												url: '/schedule/sendNotice.do',
												success: function(result){
													if (result.state == "ok") {
														$.alert("发送提醒成功！", {
															buttons: {
																'确定': function(){
																	$(dialog).dialog('close');
																	$(this).dialog('close');
																}
															}
														});
													} else {
														$.alert("发送提醒失败！");
													}
												},
												dataType: 'json'
											});
										}
									}, {
										text: "取消",
										click: function(){
											$(this).dialog("close");
										}
									}]
								});
							}
						} else if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						} else {
							//{"state":"failed"}
						}
					},
					error: function(data){
						$form.btnSave.loading('end');
					}
				});
				
			});
		}
		//获取所有日历名称
		$form.calendarId.html($.map(G.cldList.calendarList('getAllCalendarNames', true), function(id, name){ return '<option value="' + id + '">' + name + '</option>'; }).join(''));
		//TODO: 表单重置
		
		return $form;
	}
	function summary(){
		var arText = [];
		var rpType = $form.complete_set.find('dl select:visible').val() - 0;
		if (rpType) {
			var isLunar = $form.chk_lunar.get(0).checked;
			arText.push(isLunar ? '农历' : '公历');
			var rpTimes = $form.repeatFrequency.val() - 0;
			var unit = {
				1: '天',
				7: '周',
				29: '月',
				31: '月',
				354: '年',
				365: '年'
			}[rpType];
			arText.push((rpTimes == 1 ? '每' : ('每隔' + rpTimes)) + unit);
			if (rpType == 7) {
				var arDays = $form.chk_rp_week.filter(':checked').map(function(){
					return $(this).attr('day');
				}).get();
				if (arDays.length) {
					arText.push('周' + arDays.join('、'));
				}
			} else if (rpType == 31) {
				var type = $form.rdo_repeat.filter(':checked').val(), d = $form.startTime.datepicker('getDate'), strDate = formatDate(d);
				if (type == 'month') {
					arText.push('每月第' + d.getDate() + '天');
				} else {
					arText.push('第' + Math.ceil(d.getDate() / 7) + '个周' + '日一二三四五六'.split('')[d.getDay()]);
				}
			} else if (rpType == 365) {
				var d = $form.startTime.datepicker('getDate'), strDate = formatDate(d);
				arText.push('在' + (d.getMonth() + 1) + '月' + d.getDate() + '日');
			} else if (rpType == 29) {
				var lunarInfo = $form.liLunarPicker.lunarPicker('getLunarInfo');
				arText.push(lunarInfo.cnDate);
			} else if (rpType == 354) {
				var lunarInfo = $form.liLunarPicker.lunarPicker('getLunarInfo');
				arText.push(lunarInfo.cnMonth + lunarInfo.cnDate);
			}
			var $rdoEnd = $form.rdo_repeat_cond.filter(':checked'), endVal = $rdoEnd.val();
			if (endVal == 'date') {
				arText.push('直到' + $form.repeatStopTime.val() + '结束');
			} else if (endVal == 'times') {
				arText.push('重复' + $form.repeatCount.val() + '次后结束');
			} else {
				arText.push('永不结束');
			}
			$form.summary.html($.map(arText, function(t){ return ['<span>', t, '</span>'].join(''); }).join(''));
		}
	}
	
	$.widget('mxx.scheduleCreator', {
		options: {
			onOpen: $.noop
		},
		_create: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			$elem.click(function(evt){
				self.showForm();
			});
		},
		showForm: function($tds, evt){
			var self = this, $elem = $(this.element), opt = this.options;
			var strDate = $elem.attr('date'), sid = $elem.attr('sid');
			self.$form = getForm();
			if (sid) {
				if (self.$form.hasClass('simple')) {
					self.$form.removeClass('simple').addClass('complete');
				}
				if (!self.$form.is(':visible')) {
					self.$form.show().position(self.auto ? {
						of: 'body',
						my: 'right',
						at: 'left',
						offset: '-20'
					} : {
						of: 'body'
					});
				}
			} else {
				if (!$tds || $tds.size() > 1) {
					var initData = this.getOptBySelected($tds);
					if (initData) {
						if (self.$form.hasClass('simple')) {
							self.$form.removeClass('simple').addClass('complete');
						}
						if (!self.$form.is(':visible')) {
							self.$form.show().position({
								of: 'body'
							});
						}
					} else { return $.alert('对不起，365日历暂不支持将您的选择创建为单个日程，请分别创建。'); }
				} else {
					self.$form.removeClass('complete').addClass('simple').show().position({
						collision: 'fit',
						my: "center bottom",
						at: "center top",
						of: $elem
					});
				}
			}
			opt.onOpen.apply($elem, []);
			self.loadData(sid, initData);
		},
		loadData: function(sid, initData){
			var self = this, $elem = $(this.element), opt = this.options;
			if (sid) {
				self.$form.find('h2').html('编辑日程');
				$.ajax({
					url: '/schedule/getRawScheduleByIdV2.do',
					type: 'post',
					data: {
						scheduleId: sid
					},
					success: function(data){
						if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						} else {
							self.initForm(data);
						}
					},
					error: function(){
					
					},
					dataType: 'json'
				});
			} else {
				self.$form.find('h2').html('添加日程');
				self.initForm($.extend({
					title: '',
					id: '',
					allDayEvent: true,
					calendarType: 'S',
					startTime: +new Date($elem.attr('date').replace(/-/g, '/') + ' 09:00:00'),
					before_minutes: '0',
					repeatType: 0,
					calendarId: G.cldList.calendarList('getSelectedCalendarIDs')[0] || self.$form.calendarId.find('option:first').val(),
					scheduleId: ''
				}, initData));
			}
		},
		getOptBySelected: function($tds){
			if (!$tds || $tds.size() == 1) { return {
				repeatType: 0
			}; } else {
				//两个日期相同的为按月重复
				var arDate = $tds.map(function(){
					return new Date($(this).attr('date').replace(/-/g, '/'));
				}).get();
				var tmp = [];
				$.each(arDate, function(i, d){
					i = d.getDate();
					if (i != tmp[0]) {
						tmp.push(i);
					}
				});
				if (tmp.length == 1) { return {
					repeatType: 31,
					repeatFrequency: 1,
					repeatCount: arDate.length
				}; }
				
				//按周重复
				var arDay = $.map(arDate, function(d, i){ return d.getDay(); });
				if (/^(\d+?)\1+$/.test(arDay.join(''))) {
					var days = RegExp.$1.split(''), arVal = 'SUN MON TUE WED THU FRI SAT'.split(' ');
					days = $.map(days, function(day){
						return arVal[day]
					});
					tmp = [];
					for (var i = 0, len = days.length, l = arDate.length / len; i < l; i++) {
						tmp.push(+arDate[i * len]);
					}
					if ($.isProgression(tmp)) { return {
						repeatType: 7,
						repeatFrequency: (tmp[1] - tmp[0]) / (1000 * 3600 * 24 * 7),
						repeatDay: days.join(':'),
						repeatCount: arDay.length
					}; }
				}
				
				//等差数列为按日重复
				tmp = $.map(arDate, function(d, i){ return +d; });
				if ($.isProgression(tmp)) { return {
					repeatType: 1,
					repeatFrequency: (tmp[1] - tmp[0]) / (1000 * 3600 * 24),
					repeatCount: tmp.length
				}; }
				
				return null;
			}
		},
		initForm: function(data){
			var self = this, $elem = $(this.element), opt = this.options;
			var $form = self.$form, $repeatType = $form.complete_set.find('dl select');
			if (data.id !== undefined) {
				$form.scheduleId.val(data.id);
				$form.schTitle.val(data.title);
				$form.alldayEvent.attr('checked', data.allDayEvent).triggerHandler('click');
				$form.chk_lunar.attr('checked', data.calendarType == 'L').triggerHandler('click');
				
				var sTime = new Date(data.startTime);
				$form.dlt_start_hour.val(('0' + sTime.getHours()).slice(-2));
				$form.dlt_start_minute.val(('0' + sTime.getMinutes()).slice(-2));
				if (data.calendarType == 'L') {
					$form.liLunarPicker.lunarPicker('setDate', sTime);
					$repeatType = $repeatType.eq(1);
				} else {
					$form.startTime.datepicker('setDate', sTime);
					$repeatType = $repeatType.eq(0);
				}
				
				$repeatType.val(data.repeatType);
				$form.calendarId.val(data.calendarId);
				
				if (data.repeatType != 0) {
					$form.repeatFrequency.val(data.repeatFrequency);
					if (data.repeatStopTime) {
						$form.rdo_repeat_cond.eq(2).attr('checked', true);
						$form.repeatStopTime.val(formatDate(new Date(data.repeatStopTime)));
					} else if (data.repeatCount) {
						$form.rdo_repeat_cond.eq(1).attr('checked', true);
						$form.repeatCount.val(data.repeatCount);
					} else {
						$form.rdo_repeat_cond.eq(0).attr('checked', true);
					}
				}
				
				switch (data.repeatType) {
					case 7:
						$form.chk_rp_week.each(function(_, $chk){
							$chk = $(this);
							$chk.attr('checked', data.repeatDay.indexOf($chk.val()) > -1);
						});
						break;
					case 31:
						$form.rdo_repeat.eq(!!data.repeatDay).attr('checked', true).click();
						break;
					default:
						break;
				}
				$form.linked_url.val(data.url || '');
			}
			if (data.alarm !== undefined) {
				$form.before_minutes.val(data.alarm);
			}
			$form.schTitle.focus();
			$repeatType.change();
			
			if (this.auto) {
				this.onBeforeSave.call(this, $form);
				$form.find(':input').attr('disabled', true);
				$form.btnSave.click();
				this.auto = false;
				this.onBeforeSave = $.noop;
			}
		},
		autoSave: function(onBeforeSave){
			this.auto = true;
			this.onBeforeSave = onBeforeSave;
		}
	});
})();
function browserCheck(){
	if ($.browser.msie) {
		var ver = parseInt($.browser.version);
		if (ver < 8) {
			var text = ver < 7 ? '对不起，您使用的网页浏览器版本非常古老，<br/>不仅无法使用365日历的部分功能，而且还会错过其它网站的精彩体验，<br/>强烈建议您升级您的浏览器！<br/><a href="http://www.ie6countdown.com/" target="_blank" style="color:blue">看看正在消失的IE6浏览器</a>' : '尊敬的365日历用户，您想体验更好用的、更快的、更酷的365日历产品吗？请升级您的网页浏览器！'
			$.confirm(text, {
				width: 500,
				buttons: [{
					text: '马上升级',
					click: function(){
						open('http://www.microsoft.com/zh-cn/download/ie.aspx?q=internet+explorer');
						$(this).dialog("close");
					}
				}, {
					text: '下次再说',
					click: function(){
						$(this).dialog("close");
					}
				}]
			});
		}
	}
	if ($.browser.webkit) {
		try {
			js365.runScriptDeskWnd('$("#div_calendar").webCalendar()');
		} catch (ex) {
		
		}
	}
}

$(function($){
	showLoginInfo();
	G.cldList = $('#div_calendar_list');
	G.cldPanel = $('#div_calendar_panel');
	G.cldList.calendarList();
	G.cldPanel.calendarPanel();
	browserCheck();
});
