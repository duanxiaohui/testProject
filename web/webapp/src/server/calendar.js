/*
 * scheduleController.js
 * 和服务器端 schedule 交互的模块
 */
define(function(require, exports, module) {
	var $base = require('./base');
	var $package = require('./calendarPackage');
	
	var self = {};
	module.exports = self;
	
	//获取日历列表数据	
	self.getCalendarListByUser = function(render){
		$base.post({
			url:'/calendar/getCalendarListByUser.do',
			success:function(data){
				render(data);	
			}
		});
	}

	//获取日历大厅category
	self.getCalendarCategory = function(render){
		$base.get({
			url:'/qzone/getCategoryCalendars.do',
			success:function(data){
				render(data);
			}
		});
	}
	self.getCalendarCategoryById = function(id, render){
		$base.get({
			url:'/qzone/getCategoryCalendars.do?category_id=' + id,
			success:function(data){
				render(data);
			}
		});
	}
	
	self.subscribePublicCalendar = function(id, render){
		$base.post({
			url:"/qzone/subscribePublicCalendar.do",
			data:{
				calendarID:id
			},
			success: function(data){
				render(data);
			}
		});
	}
	
	self.unsubscribe = function(id, render){
		$base.post({
			url:"/qzone/unsubscribe.do",
			data:{
				calendarID:id
			},
			success: function(data){
				render(data);
			}
		});
	}
	
	self.getCalendarListWithExtend = function(render){
		$base.get({
			url:'/qzone/getCalendarListWithExtend.do',
			success:function(data){
				render(data);
			}
		});
	}
	//QQ Group
	self.getQqunUserList = function(groupOpenID, cid, render){
		$base.get({
			url:'/qqun/getUserList.do?groupOpenID=' + groupOpenID + '&calendarID=' + cid,
			success:function(data){
				render(data);
			}
		});
	}
	
	//accessType: 移除编辑组传1，添加到编辑组传2
	//userList: JSON数组，元素为选择的用户ID
	self.adjustUserType = function(groupOpenID, accessType, userList, render){
		$base.post({
			url:"/qqun/adjustUserType.do",
			data:{
				groupOpenID:groupOpenID,
				accessType:accessType,
				userList:userList
			},
			success:render
		});
	}
	
	self.getQunInfo = function(d, render){
		var urlAndParams = ["/qqun/getQunInfo.do", "?appID=", d.appID, "&openID=", d.openID, "&openKey=", d.openKey, "&groupOpenID=", d.groupOpenID, "&pf=", d.pf].join("");
		$base.get({
			url:urlAndParams,
			success:render
		});
	}
	
	self.refresh = function(d, render){
		var urlAndParams = ["/qqun/refresh.do", "?appID=", d.appID, "&openID=", d.openID, "&openKey=", d.openKey, "&groupOpenID=", d.groupOpenID, "&pf=", d.pf].join("");
		$base.get({
			url:urlAndParams,
			success:render
		});
	}
	
});