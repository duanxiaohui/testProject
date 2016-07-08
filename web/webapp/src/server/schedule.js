/*
 * scheduleController.js
 * 和服务器端 schedule 交互的模块
 */
define(function(require, exports, module) {
	var $base = require('./base');
	
	var self = {};
	module.exports = self;
	
	self.getScheduleList = function(fromDate, toDate, cldIds, render){
		$base.post({
			url:'/schedule/list.do',
			data:{
				fromDate: $base.formatDate(fromDate),
				toDate: $base.formatDate(toDate),
				timeZone: -fromDate.getTimezoneOffset() / 60,
				calendarId: cldIds.join(',')
			},
			success:function(data){
				render(data);
			}
		});
	}
	
	self.getPublicSchedulelist = function(fromDate, toDate, cid, render){
		$base.post({
			url:'/qzone/getPublicSchedulelist.do',
			data:{
				fromDate: $base.formatDate(fromDate),
				toDate: $base.formatDate(toDate),
				timeZone: -fromDate.getTimezoneOffset() / 60,
				calendarId: cid
			},
			success:function(data){
				render(data);
			}
		});
	}
	
	self.updateV2 = function(data, render, error){
		data.updateV2Origin = '21';
		$base.post({
			url:'/schedule/updateV2.do',
			data: data,
			success: function(data){
				render(data);
			},
			error:error
		});		
	}
	
	self.getRawScheduleByIdV2 = function(sid, render){
		$base.post({
			url:'/schedule/getRawScheduleByIdV2.do',
			data:{
				scheduleId:sid
			},
			success:function(data){
				render(data);
			}
		})
	}
	
	self.getpics = function(data, render){
		$base.post({
			url:'/schedule/getpics.do',
			data:{
				calendarID:data.calendarId,
				scheduleUUID:data.uuid
			},
			success: function(data){
				render(data);
			}
		})
	}
	
	self.setRedhot = function(data, sid){
		$base.post({
			url:'/qqun/setRedhot.do',
			data: data
		});
		$base.post({
			url:'/qqun/sendObjmsg.do',
			data: {
				openID: data.openID,
				openKey: data.openKey,
				groupOpenID: data.groupOpenID,
				pf: data.pf,
				appID: data.appID,
				scheduleID: sid
			}
		});		
	}
});