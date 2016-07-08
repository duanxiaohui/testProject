/*
 * author huangyi
 * notification module
 */
define(['rebuild/base/common'], function(c){
	// console.log("module : notification");
	var showConsole = false;
	var self = {
		timeoutTickets:[],
		init: function(){
			if (!("Notification" in window)) {
				return;
			}
			if($.cookie("notification_setting") === "false"){
				return;
			}
			//判断是否需要授权
			if(Notification.permission === "default"){
				$.alert("您是否需要打开浏览器的提醒功能", {
					buttons:{
						'确定': function(){
							self.requestPermission(function(){
								self.loadAlarmData();
							});
							$(this).dialog("close");
						},
						'取消': function(){
							$.cookie("notification_setting", "false", {
								expires: 365,
								path:"/"
							});
							$(this).dialog("close");	
						}
					}
				})
			}else if(Notification.permission === "granted"){
				self.loadAlarmData();			
			}
		},
		refresh: function(){
			if (!("Notification" in window)) {
				return;
			}
			if($.cookie("notification_setting") === "false"){
				return;
			}
			if(Notification.permission !== "granted"){
				return;
			}
			showConsole && console.log("refresh notification timeout");
			for(var i in self.timeoutTickets){
				var ticket = self.timeoutTickets[i];
				clearTimeout(ticket);
			}
			self.timeoutTickets = [];
			self.loadAlarmData();
		},
		loadAlarmData: function(){
			$.get("/schedule/getAlarms.do").success(function(data){
				self.alarmData = data;
				$.each(data, function(i, o){
					$.each(o.schlist, function(i, o){
						if(o.alarm !==""){
							self.setNotification(o);
						}
					});
				});
			});
		},
		showNotification: function(title, content, offset, sid){
			if (!("Notification" in window)) {
				return;
			}
			var ticket = setTimeout(function(){
				if(Notification.permission === "granted"){
					var notification = new Notification(title, {
						body:content,
						icon:"/images/logo_72x72.png"
					});
					notification.onclick = function(){
						amplify.publish("showSchedule", sid);
					}
				}
			}, offset)
			self.timeoutTickets.push(ticket);
			showConsole && console.log("setTimeout("+offset+","+ ticket +"):"+title+" "+content);
		},
		requestPermission: function(callback){
			if (!("Notification" in window)) {
				return;
			}
			if(Notification.permission !== "granted"){
				Notification.requestPermission(function (permission) {
					if(!('permission' in Notification)) {
				        Notification.permission = permission;
				    }
					
					if(permission === "granted" && typeof callback === "function"){
						callback();
					}
				});
			}
		},
		setNotification: function(schedule){
			var alarms = schedule.alarm.split(",");
			var now = new Date();
			var startTime = new Date(schedule.start_time.replace(/-/g,"/"));
			for(var i in alarms){
				var alarm = parseInt(alarms[i]);
				var time = new Date(startTime.getTime() - alarm * 60000);
				var offset = time.getTime() - now.getTime();
				if(offset > 0){
					self.showNotification(schedule.start_time, schedule.text, offset, schedule.id);
				}
			}
		}
	}

	var pc = {
		init: function(){
			js365.downAlarms();
		}
	}

	if(c.isPCVersion()){
		amplify.subscribe("initApp", pc.init);
		amplify.subscribe("alarmChanged", pc.init);
		amplify.subscribe("scheduleDeleted", pc.init);
	}else{
		amplify.subscribe("initApp", self.init);
		amplify.subscribe("alarmChanged", self.refresh);
		amplify.subscribe("scheduleDeleted", self.refresh);
		amplify.subscribe("calendarDeleted", self.refresh);
		amplify.subscribe("calendarUnsubscribed", self.refresh);

	}


});

