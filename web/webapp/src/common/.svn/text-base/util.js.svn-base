define(function(require, exports, module) {
	var rFormat;
	var self = {};
	module.exports = self;
	/**
	 * 格式化一个字符串
	 */
	self.format = function(){
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
	
	self.cookie = function(name, value, options){
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
		
	self.bIsAndroid = function(){
		var u = navigator.userAgent.toLowerCase();
		return u.match(/android/i) == "android";	
	}
	
	self.getURLParameter = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	
	self.getDateZero = function(date){
		var d = new Date(date);
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		d.setMilliseconds(0);
		return d;
	}
	
	self.encodeHtml = function(str){
		var s = "";  
		if (s.length == 0) return "";  
		s = str.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");  
		s = s.replace(/>/g, "&gt;");  
		s = s.replace(/ /g, "&nbsp;");  
		s = s.replace(/\'/g, "&#39;");  
		s = s.replace(/\"/g, "&quot;");  
		s = s.replace(/\n/g, "<br>");  
		return s;  
	}
	self.decodeHtml = function(str){
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&amp;/g, "&");  
		s = s.replace(/&lt;/g, "<");  
		s = s.replace(/&gt;/g, ">");  
		s = s.replace(/&nbsp;/g, " ");  
		s = s.replace(/&#39;/g, "\'");  
		s = s.replace(/&quot;/g, "\"");  
		s = s.replace(/<br>/g, "\n");  
		return s; 
	}
	self.encodeText = function(str){
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&amp;/g, "&");  
		s = s.replace(/&lt;/g, "<");  
		s = s.replace(/&gt;/g, ">");  
		s = s.replace(/&nbsp;/g, " ");  
		s = s.replace(/&#39;/g, "\'");  
		s = s.replace(/&quot;/g, "\"");
		
		s = s.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");  
		s = s.replace(/>/g, "&gt;");  
		s = s.replace(/ /g, "&nbsp;");  
		s = s.replace(/\'/g, "&#39;");  
		s = s.replace(/\"/g, "&quot;"); 
		return s;
	}
	self.animate = function(container, direction, toContainer){
		var width = $(window).width();
		$("body").scrollTop(0);
		container.css("z-index","11");
		container.one('webkitTransitionEnd', function(){
			$(this).hide();
			$(this).css("left","0px");
			$(this).css("z-index","1");		
		});
		if(direction == "left"){
			container.css("left","-" + width + "px");
		}else{
			container.css("left",width + "px");
		}
	}
	
	self.formatDate = function(date){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	}
	
	self.formatTime = function(date){
		return [
		        ("0" + date.getHours()).slice(-2),
		        ("0" + date.getMinutes()).slice(-2),
		        ("0" + date.getSeconds()).slice(-2)
		].join(":");
	}
	
	
	self.formatDateTime = function(date){
		return self.formatDate(date) + " " + self.formatTime(date);
	}
	
	self.isToday = function(d){
		var t = new Date();
		if(t.getFullYear() == d.getFullYear() &&
			t.getMonth()   == d.getMonth() &&
			t.getDate()    == d.getDate()){
			return true;
		}
		return false;
	}
	
	self.isProgression = function (ar){
		if (ar.length < 2) { return false; }
		ar = ar.slice();
		for (var first = ar.shift(), delta = ar[0] - first, i = 1, l = ar.length; i < l; i++) {
			if (ar[i] - ar[i - 1] != delta) { return false; }
		}
		return true;
	}
	//2012-01-01 01:01:00
	self.dateFromStr = function(dateStr){
		//var str = dateStr.replace(" ", "T");
		return new Date(dateStr);	
	}
});