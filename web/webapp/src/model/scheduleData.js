/*
 * scheduleData.js
 */
define(function(require, exports, module) {
	var $schedule = require('../server/schedule');
	var $util = require('../common/util');
	
	var self = {};
	module.exports = self;
	self.scheduleMap  = {};
	self.publicScheduleMap = {};
	
	function loadScheduleData(fromDate, toDate, cid, render){
		$schedule.getScheduleList(fromDate, toDate, [cid], function(data){
			self.scheduleMap = {};
			mergeScheduleData(data[0], self.scheduleMap);
			render(self.scheduleMap);
		});
	}
	
	function loadPublicScheduleData(fromDate, toDate, cid, render){
		$schedule.getPublicSchedulelist(fromDate, toDate, cid, function(data){
			//self.publicScheduleMap = {};
			//mergeScheduleData(data[0], self.publicScheduleMap);
			$.each(data[0].schlist, function(i, o){
				o.time = o.allday_event ? '' : o.start_time.slice(11, 16);
				//add pic_str
				if(o.pics){
					o.pic_str = $.map(o.pics, function(val, index){
						return val.pic;
					}).join(",");
				}else{
					o.pic_str = "";
				}
				o.encodeText = $util.encodeText(o.text);
			});
			render(data[0].schlist);
		});
	}
	
	function mergeScheduleData(data, map){
		//需要处理跨天的日程
		var expand_schlist = [];
		$.each(data.schlist, function(_, o){
			//处理图片
			if(data.piclist && data.piclist[o.uuid]){
				o.pics = data.piclist[o.uuid];
			}
			if(o.duration > 0){
				expand_schlist.push(o);
				function getDateFromStr(str){
					var d = new Date();
					try{
						var ary = o.start_time.split(" ");
						d.setFullYear(ary[0].split("-")[0]);
						d.setMonth(parseInt(ary[0].split("-")[1]) - 1);
						d.setDate(ary[0].split("-")[2]);
						
						d.setHours(ary[1].split(":")[0]);
						d.setMinutes(ary[1].split(":")[1]);
						d.setSeconds(ary[1].split(":")[2])
						return d;
					}catch(e){
						return new Date(str);
					}
				}
				var start = getDateFromStr(o.start_time);
				var end = new Date(start.getTime() + o.duration*1000);
				var start_zero = new Date(start);
				start_zero.setHours(0);
				start_zero.setMinutes(0);
				start_zero.setSeconds(0);
				
				for(var i=new Date(start_zero.getTime() + 86400000); i<=end; i=new Date(i.getTime()+86400000)){
					var clonedObj = {};
					$.extend(clonedObj,o);
					clonedObj.start_time = $util.formatDate(i) + " 09:00:00";
					clonedObj.allday_event = true;
					expand_schlist.push(clonedObj);
				}
			}else{
				expand_schlist.push(o);
			}
		});
		$.each(expand_schlist, function(i, o){
			//var d = $util.dateFromStr(o.start_time);
			var dateStr = o.start_time.split(" ")[0];
			if(!map[dateStr]){
				map[dateStr] = [];
			}
			o.time = o.allday_event ? '' : o.start_time.slice(11, 16);
			//TODO  workaround
			if(typeof(G) != "undefined"){
				o.access_type = G.accessType;				
			}
			//add pic_str
			if(o.pics){
				o.pic_str = $.map(o.pics, function(val, index){
					return val.pic;
				}).join(",");
			}else{
				o.pic_str = "";
			}
			o.encodeText = $util.encodeText(o.text);
			map[dateStr].push(o);
		});
	}
	
	function deleteScheduleData(sid){
		for(var i in self.scheduleMap){
			var ar = self.scheduleMap[i];
			for (var j = ar.length - 1; j > -1; j--) {
				if (sid == ar[j].id) {
					ar.splice(j, 1);
				}
			}
		}
	}
	
	function onCreated(data, sid, render){
		if(sid){
			deleteScheduleData(sid);			
		}
		mergeScheduleData(data, self.scheduleMap);
		render(self.scheduleMap);
	}
	
	function onRemoved(sid, render){
		deleteScheduleData(sid)
		render(self.scheduleMap);
	}
	
	self.loadScheduleData = loadScheduleData;
	self.onCreated = onCreated;
	self.onRemoved = onRemoved;
	self.loadPublicScheduleData = loadPublicScheduleData;
});