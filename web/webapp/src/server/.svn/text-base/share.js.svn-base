/*
 * share.js
 */
define(function(require, exports, module) {
	var $base = require('./base');
	
	var self = {};
	module.exports = self;
	
	self.getScheuleShareUrl = function(cid, uuid, d1, d2, target, render){
		$base.post({
			url:'/qzone/getScheuleShareUrl.do',
			data:{
				calendarID: cid,
				scheduleUUID: uuid,
				dateline1: d1,
				dateline2: d2,
				target:target
			},
			success:function(data){
				render(data);
			}
		});
	}
	
	self.getCalendarShareUrl = function(cid, data, target, render){
		$base.post({
			url:'/qzone/getCalendarShareUrl.do',
			data:{
				calendarID: cid,
				data: data,
				target:target
			},
			success:function(data){
				render(data);
			}
		});
	}
	
});