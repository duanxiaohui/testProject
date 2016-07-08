/*
 * author huangyi
 * notification module
 */

var notificationManager = {
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
						notificationManager.requestPermission(function(){
							notificationManager.loadAlarmData();
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
			this.loadAlarmData();			
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
		console.log("refresh notification timeout");
		for(var i in this.timeoutTickets){
			var ticket = this.timeoutTickets[i];
			clearTimeout(ticket);
		}
		this.timeoutTickets = [];
		this.loadAlarmData();
	},
	loadAlarmData: function(){
		$.get("/schedule/getAlarms.do").success(function(data){
			notificationManager.alarmData = data;
			$.each(data, function(i, o){
				$.each(o.schlist, function(i, o){
					if(o.alarm !==""){
						notificationManager.setNotification(o);
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
				}
			}
		}, offset)
		this.timeoutTickets.push(ticket);
		console.log("setTimeout("+offset+","+ ticket +"):"+title+" "+content);
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
				this.showNotification(schedule.start_time, schedule.text, offset, schedule.id);
			}
		}
	}
}