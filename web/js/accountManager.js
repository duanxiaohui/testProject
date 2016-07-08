function formatDate(date){
	return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
}

function showLoginInfo(){
	var html, tmpl;
	if (G.needBind) {
		tmpl = '<span>{hello}</span>{username}<a href="#" class="user_reg_bind" onclick="return openRegBindWin();">注册365日历账号并绑定</a><a href="/account/logout.do" class="user_quit" title="退出登录"></a>';
	} else {
		tmpl = '<span>{hello}</span>{username}<a href="/account/manage.do" class="user_set" title="设置个人资料"></a><a href="/account/logout.do" class="user_quit" title="退出登录"></a>';
	}
	html = $.format(tmpl, $.extend({}, {
		hello: getHello(G.currDate)
	}, G.currUser));
	$('#dd_userinfo').html(html);
}

function openRegBindWin(){
	
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
	/*
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
	if (typeof value != 'undefined') { // name and value given, set cookie
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
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
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

/** Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
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
	if (typeof(r) == 'string') {
		return arguments.callee.apply(null, convertHexColor(r));
	}
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
}﻿/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
$.widget('mxx.simpleTab', {
	options: {
		cName: 'on',
		event: 'click',
		selected: 0
	},
	_create: function(){
		var self = this, $elem = self.element, opt = self.options;
		self.tabs = $elem.find('li');
		self.lnks = $elem.find('li > a');
		var ids = $.map(self.lnks.toArray(), function(lnk, i){
			return lnk.hash;
		}).join(',');
		self.contents = $(ids);
		
		self.lnks.bind(opt.event, function(evt){
			evt.preventDefault();
			var $lnk = $(this), $tab = $lnk.parent(), id = this.hash, $cont;
			if (!$tab.hasClass(opt.cName)) {
				self.tabs.removeClass(opt.cName);
				$tab.addClass(opt.cName);
				$cont = self.contents.hide().filter(id).show('fade');
				//$cont.find(':text,:password').not('[readonly]').first().focus();
			}
		});
		self.lnks.eq(opt.selected).click();
	}
});

function showHintText($elem, text){
	var $hint = $elem.parents('dd').find('div.password_wrong');
	$hint.html(text).show();
	$elem.one('focus', function(){
		$hint.hide();
	});
	return true;
}

function initBasicInfoPanel(){
	var map = {
		'126.com': 'http://www.126.com/',
		'vip.126.com': 'http://vip.126.com/',
		'163.com': 'http://mail.163.com/',
		'vip.163.com': 'http://vip.163.com/',
		'yeah.net': 'http://www.yeah.net/',
		'188.com': 'http://www.188.com/',
		
		'sina.com.cn': 'http://mail.sina.com.cn/',
		'vip.sina.com': 'http://vip.sina.com.cn/',
		
		'yahoo.cn': 'http://mail.cn.yahoo.com/',
		'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
		
		'21cn.com': 'http://mail.21cn.com/',
		'vip.21cn.com': 'http://mail.21cn.com/vip/',
		
		'gmail.com': 'http://mail.google.com/',
		
		'hotmail.com': 'https://login.live.com/',
		
		'qq.com': 'https://mail.qq.com/',
		'vip.qq.com': 'https://mail.qq.com/',
		'foxmail.com': 'https://mail.qq.com/',
		
		'tom.com': 'http://mail.tom.com/',
		'vip.tom.com': 'http://mail.tom.com/',
		'163.net': 'http://mail.tom.com/',
		
		'139.com': 'http://mail.10086.cn/',
		'189.cn': 'http://webmail3.189.cn/webmail/',
		'sogou.com': 'http://mail.sogou.com/',
		
		'sohu.com': 'http://mail.sohu.com/',
		'vip.sohu.com': 'http://vip.sohu.com/',
		
		'263.net': 'http://mail.263.net/',
		'263.net.cn': 'http://mail.263.net/',
		'x263.net': 'http://mail.263.net/'
	};
	
	$('#lnk_save_email').click(function(evt){
		evt.preventDefault();
		//检查用户输入的email
		var submitCancel = false;
		var rEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var $username = $('#username'), $email = $('#safe_email'), email = $.trim($email.placeholder('val'));
		if (email == '') {
			submitCancel = showHintText($email, '请填写电子邮件帐号') || submitCancel;
		} else if (!rEmail.test(email)) {
			submitCancel = showHintText($email, '请填写正确电子邮件帐号') || submitCancel;
		}
		var $pwd = $('#password365'), pwd = $pwd.val();
		if (pwd == '') {
			submitCancel = showHintText($pwd, '请填写登录365日历的密码') || submitCancel;
		}
		
		submitCancel ||
		$.ajax({
			url: '/account/basicInfo.do',
			type: 'post',
			data: {
				email: email,
				userName: $username.val(),
				password: hex_md5(pwd)
			},
			success: function(response){
				switch (response.state) {
					case 'wrongpass':
						showHintText($pwd, '原始密码不正确,请查实');
						break;
					case 'invalid_email':
						showHintText($email, '请填写正确电子邮件帐号');
						break;
					case 'exist_email':
						showHintText($email, '邮箱地址已被占用');
						break;
					case 'invalid_username':
						showHintText($username, '用户名不合规则');
						break;
					case 'exist_username':
						showHintText($username, '用户名已被占用');
						break;
					case 'ok':
						$.alert("恭喜您，修改成功！<br>已向您的邮箱发送邮箱验证邮件，请前往查看。", {
							buttons: {
								'确定': function(){
									//尝试分析email地址，帮助用户打开邮箱
									var domain = (email.split('@')[1] || '').toLowerCase();
									if (map[domain]) {
										window.open(map[domain], 'emailLogin');
									}
									$(this).dialog("close");
									location.reload();
								}
							}
						});
						break;
					default:
						break;
				}
			}
		});
	});
	$('#password365').ctrlEnter({
		action: '#lnk_save_email',
		noCtrl: true
	});
	
	
	$('#div_third_accouts dl').account();
	
	
}
(function(){
	function getCnName(partner){
		return {
			google: '谷歌',
			baidu: '百度',
			qh360: '奇虎360',
			weibo: '新浪微博',
			qqz: 'QQ空间',
			qqt: '腾讯微博',
			outlook: 'Outlook'
		}[partner];
	}
	$.widget('mxx.account', {
		options: {
			bindText: '马上绑定',
			unbindText: '解除绑定'
		},
		_create: function(){
			var self = this, $elem = self.element, opt = self.options;
			
			self.partner = $elem.attr('partner');
			self.partnerName = getCnName(self.partner);
			self.enable = $elem.attr('enable') == 'true';
			self.allowBind = $elem.attr('allowBind') == 'true';
			self.urlGet = $elem.attr('load');
			self.urlBind = $elem.attr('bind');
			self.urlUnbind = $elem.attr('unbind');
			
			self.$lnk = $elem.find('a.js_bind');
			self.$lnk.click(function(evt){
				evt.preventDefault();
				var $lnk = $(this), $elem = $lnk.parents('dl'), txt = $lnk.text();
				if (txt == opt.bindText) {
					var winParam = self.urlBind.split(';');
					if (winParam.length > 1) {
						var instWin = window.open.apply(window, winParam);
						
						var intervalId = setInterval(function(){
							if (instWin.closed) {
								clearInterval(intervalId);
								self.partner == 'google' && self._init();
							} else if (instWin.qqtAuth == "success" || instWin.weiboAuth == "success") {
								instWin.close();
								clearInterval(intervalId);
								self._init();
							}
						}, 100);
						
					} else {
						//for outlook
					}
				} else if (txt == opt.unbindText) {
					$.confirm('确定要解除与' + self.partnerName + '帐号的绑定吗？', {
						buttons: [{
							click: function(){
								var dialog = this;
								$.ajax({
									type: 'post',
									url: self.urlUnbind,
									data: self.partner == 'outlook' ? {
										outlookAccount: self.account
									} : {},
									success: function(rslt){
										if (rslt == 'ok') {
											self._showAccount('');
										}
										$(dialog).dialog('close');
									},
									dataType: 'json'
								});
							}
						}]
					});
				}
			});
		},
		_init: function(){
			var self = this, $elem = self.element, opt = self.options;
			var $lnk = this.$lnk;
			
			if (self.enable) {
				$.ajax({
					url: self.urlGet,
					type: 'post',
					success: function(account){
						self._showAccount(account);
					}
				});
			} else {
				$elem.hide();
			}
		},
		_showAccount: function(account){
			var self = this, $elem = self.element, opt = self.options;
			this.account = account;
			$elem.find('dd.mail_address').text(account);
			if (account) {
				self.$lnk.html(opt.unbindText);
			} else {
				if (self.allowBind) {
					self.$lnk.html(opt.bindText);
				} else {
					$elem.hide();
				}
			}
		}
	});
})();


function initSafeSettingPanel(){
	$('#lnk_save_pwd').click(function(evt){
		evt.preventDefault();
		var $oripwd = $('#pwd_oripwd'), oripwd = $oripwd.val(), submitCancel = false;
		if (oripwd == '') {
			submitCancel = showHintText($oripwd, '请填写登录365日历的密码') || submitCancel;
		}
		
		var $newpwd = $('#pwd_newpwd'), newpwd = $newpwd.val();
		if (newpwd == '') {
			submitCancel = showHintText($newpwd, '请填写新密码') || submitCancel;
		} else if (newpwd.length < 6 || newpwd.length > 20) {
			submitCancel = showHintText($newpwd, '新密码长度应为6-20位') || submitCancel;
		}
		
		var $rptpwd = $('#pwd_rptpwd'), rptpwd = $rptpwd.val();
		if (rptpwd == '') {
			submitCancel = showHintText($rptpwd, '请重复填写新密码') || submitCancel;
		}
		if (rptpwd != newpwd) {
			submitCancel = showHintText($rptpwd, '两次输入的新密码不一致') || submitCancel;
		}
		submitCancel ||
		$.ajax({
			url: '/account/changePwd.do',
			type: 'post',
			data: {
				password: hex_md5(oripwd),
				newPwd: hex_md5(newpwd),
				newPwd2: hex_md5(rptpwd)
			},
			success: function(response){
				switch (response.state) {
					case 'wrongpass':
						showHintText($oripwd, '原始密码不正确,请查实');
						break;
					case 'invalid_new_password':
						showHintText($newpwd, '新密码长度应为6-20位');
						break;
					case 'new_password_not_matched':
						showHintText($rptpwd, '两次输入的新密码不一致');
						break;
					case 'ok':
						$.alert("恭喜您，修改成功！");
						$("#safe_setting :input").val("");
						break;
					default:
				}
			}
		});
	});
	$('#pwd_rptpwd').ctrlEnter({
		action: '#lnk_save_pwd',
		noCtrl: true
	});
}

function initPersonalInfoPanel(){
	$('#dd_location select').addr();
	$('#ipt_birthday').datepicker($.getDPOptions({}));
}

$(function($){
	showLoginInfo();
	initBasicInfoPanel();
	initSafeSettingPanel();
	//initPersonalInfoPanel();
	$('#safe_email').placeholder();
	$('#div_tab').simpleTab();
	
});
