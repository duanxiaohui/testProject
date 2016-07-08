/*********************************************************
*	Util function
**********************************************************/
function Util() {
	var rFormat;
	var self = {};
	/**
	 * 格式化一个字符串
	 */
	self.format = function(){
		var str = String(arguments[0] || "");
		var first = arguments[1];
		var ar = [];
		var args = $.isArray(first) ? first : [first];
		$.each(args, function(i, o){
			ar.push(str.replace(rFormat || (rFormat = /\{([\d\w\.]+)\}/g), function(m, n, v){
				v = n === 'INDEX' ? i : n.indexOf(".") < 0 ? o[n] : $.route(o, n);
				return v === undefined ? m : ($.isFunction(v) ? v.call(o, n) : v)
			}));
		});
		return ar.join('');
	};
	
	self.formatDate = function(date){
		var d = new Date(date);
		var dateStr = [
			d.getFullYear(),
			("0" + (d.getMonth() + 1)).slice(-2),
			("0" + d.getDate()).slice(-2)
		].join("-");
		var timeStr = [
			("0" + d.getHours()).slice(-2),
			("0" + d.getMinutes()).slice(-2)
			//("0" + d.getSeconds()).slice(-2)
		].join(":");
		return dateStr + " " + timeStr;
	}
		
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
		if (str.length == 0) return "";  
		s = str.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");  
		s = s.replace(/>/g, "&gt;");  
		s = s.replace(/ /g, "&nbsp;");  
		s = s.replace(/\'/g, "&#39;");  
		s = s.replace(/\"/g, "&quot;");  
		s = s.replace(/\n/g, "<br>");  
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
	return self;
}