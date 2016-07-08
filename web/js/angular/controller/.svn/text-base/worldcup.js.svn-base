angular.module('365_calendar.worldcup', [])
.controller('WorldcupCtrl', function($scope, WorldCupData){
	$scope.WorldCupData = WorldCupData;
})
.service('WorldCupData', function($http){
	var host = "http://www.365rili.com";
	var self = {
		shortListRows:[
			{
				time:'6月13日04:00',
				team1:"巴西",
				team2:"克罗地亚"
			},
			{
				time:'6月14日00:00',
				team1:"墨西哥",
				team2:"喀麦隆"
			},
			{
				time:'6月14日03:00',
				team1:"西班牙",
				team2:"荷兰"
			},
			{
				time:'6月14日06:00',
				team1:"智利",
				team2:"澳大利亚"
			},
			{
				time:'6月15日00:00',
				team1:"哥伦比亚",
				team2:"希腊"
			},
			{
				time:'6月15日03:00',
				team1:"乌拉圭",
				team2:"哥斯达黎加"
			},
			{
				time:'6月15日06:00',
				team1:"科特迪瓦",
				team2:"日本"
			},
			{
				time:'6月15日06:00',
				team1:"英格兰",
				team2:"意大利"
			}
		],
		listRows:[],
		monthRows:[],
		dateCellMap:{},
		initMonthRows:function (date, len){
			var startDate = new Date(date);
			var rows = [];
			for(var i = 0; i < len; i++){
				var row = {};
				row.cells = $.map(new Array(7), function(_, j){
					var cell = {
						date:startDate,
						monthDateStr:self.formatMonthDate(startDate),
						schedules:[]
					}
					self.dateCellMap[self.formatDate(startDate)] = cell;
					void (startDate.setDate(startDate.getDate() + 1));
					return cell;
				});
				rows.push(row);
			}
			self.monthRows = rows;
			var fromDate = new Date(date);
			var toDate = startDate;
			$http({
				url:host + "/coco/single/getPublicSchedulesByRange.do",
				params:{
					fromDate: self.formatDate(fromDate),
					toDate: self.formatDate(toDate),
					timeZone: -fromDate.getTimezoneOffset() / 60,
					calendarID: 203436509
				}
			}).success(function(data){
				self.mergeScheduleData4Share(data);
			});
			return rows;
		},
		formatDate: function(date){
			return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
		},
		formatMonthDate: function(date){
			return (date.getMonth()+1) + "月" + date.getDate() + "日";
		},
		mergeScheduleData4Share:function(data){
			$.each(data, function(_, o){
				//add pic_str
				if(o.pics){
					o.pic_str = $.map(o.pics, function(val, index){
						return val.pic;
					}).join(",");
				}else{
					o.pic_str = "";
				}
				var date = new Date(o.startTime);
				var d = self.formatDate(date);
				var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
				o.access_type = o.accessType;
				o.start_time = d + " " + time;

				o.time = o.allDayEvent ? '全天' : date.toTimeString().substr(0, 5) ;
				o.allday_event = o.allDayEvent;
				o.text = o.title.split('\n')[0];
				if (self.dateCellMap[d]) {
					var cell = self.dateCellMap[d];
					cell.schedules.push(o);
				}
				var tmpAry = o.text.split(/\s/);
				o.team1 = tmpAry[0];
				o.team2 = tmpAry[2];
				self.listRows.push(o);
			});
		}
	}

	self.initMonthRows(new Date("2014/06/09"), 6);
	return self;
});