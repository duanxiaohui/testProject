/*
 * base.js
 * 服务器端交互的基础方法
 */
define(function(require, exports, module) {
	var self = {};
	module.exports = self;
	
	self.post = function(opt, callback){
		var params = $.extend(true, {
			type:"post",
			dataType:"json"
		}, opt);
		$.ajax(params);
	}
	
	self.get = function(opt, callback){
		var params = $.extend(true, {
			type:"get",
			dataType:"json"
		}, opt);
		$.ajax(params);		
	}
	
	self.formatDate = function(date){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	}
});