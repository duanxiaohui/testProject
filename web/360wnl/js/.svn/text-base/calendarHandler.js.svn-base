(function(window){
	var startOnMonday=true,
	reg=/^d(\d{4})-(\d{2})-(\d{2})/,
	r2=/^0/;
	/*
	 * 当前用户的主日历id
	 */
	var calendarId=null,
	/*
	 * 当前月份的第一天
	 */
	navDate=null,
	/*
	 * 当前选择的日期
	 */
	seletedDate=null,
	/*
	 * 添加日程的日期
	 */
	addSchDate = null,
	/*
	 * 用户的日程数据
	 */
	schData=null;
	
	var log=function(message){
		//console.log(message);//调试完成后，注释此行
	},
	setNavDate=function(date){
		if(date instanceof Date)
			navDate=date;
		else
			navDate=null;
	},
	getCurrentMonthViewData=function(){
		if(navDate){
			DataHandler.getSchByMonth(navDate, this.drawSchedule, startOnMonday);
			var monthInfo = CalUtil.monthViewInfo(navDate,startOnMonday);
			var s=monthInfo.start,
				e=monthInfo.end;
			var cld=new Array();
			cld.push(calendarId);
			schData = DataHandler.getSchedulesByRange(s,e,DataHandler.resultData,cld);
		}
	},
	creatSch=function(text,allday,hour,second,callback){
		var sch = {};
        sch.schTitle = text;
        sch.alldayEvent = allday;
        if(allday) {
            sch.startTime = getDateKey(addSchDate) + ' ' + '09:00:00';
        } else {
            sch.startTime = getDateKey(addSchDate) + ' ' + hour.leftpad(2) + ':' + second.leftpad(2) + ':00';
        }
        sch['timeZone'] = - (new Date()).getTimezoneOffset() / 60;
        // dialog内添加的都是简单日程(不重复,不跨天)
        var dateScope = cal365.date.add(cal365.templates.api_date(sch.startTime), 1, 'day');
        $.ajax({
            type: 'post',
            data: sch,
            url: '/schedule/update.do',
            success: function(result) {
				for(var i=0;i<result.length;i++)
				{
					var cldObj = result[i];
					DataHandler.formatSchData(cldObj.schlist, dateScope);
				}
				getCurrentMonthViewData();
				if(callback)
					callback();
            },
            dataType: 'json'
        });
	},
	cutByRealLength=function(str,size){
		var totalCount=0;
		var i;
		for(i=0;i<str.length;i++){
			var c=str.charCodeAt(i);
			if((c>=0x0001&&c<=0x007e)||(0xff60<=c&&c<=0xff9f)){
				totalCount++;
			}else{
				totalCount+=2;
			}if(totalCount>=size){
				return str.substring(0,i+1);
			}
		}
		return str;
	};
	var UI={
		drawSch:function(schList){
			$(".work_item_dot").hide();
			$(".work_item_content").html("");
			$(".work_item_content").attr("title","");
			if(schList.length>0){
				for(var i=0;i<5 && i<schList.length;i++){
					var showTxt=cutByRealLength(schList[i].text,16);
					if(showTxt.length<schList[i].text.length){
						showTxt+="...";
					}
					var showTime = "";
					if(! schList[i].allday_event){
						var raw = schList[i].start_time.split(' ')[1].split(':');
						raw.splice(2,1);
						showTime = raw.join(':') + "&nbsp;&nbsp;";
					}
					$("#work_item"+i+">.work_item_dot").show();
					$("#work_item"+i+">.work_item_content").html(showTime + showTxt).attr("title",schList[i].text);
				}
			}
		}
	}
	var calendarHandler={
		init:function(id){
			if(typeof id == 'number')
				calendarId=id;
			else if(typeof id == 'string')
				calendarId=parseInt(id);
			navDate=seletedDate=new Date();
			cal365.init_templates();
		},
		isLogin:function(){
			return !!calendarId;
		},
		/*
		 * dataHandler调用，返回选中的日历id
		 */
		getSelectedArray:function(){
			var t=new Array();
			t.push(calendarId);
			return t;
		},
		prepareData4:function(year,month){
			var date=new Date();
			date.setYear(year);
			date.setMonth(month-1);
			date.setDate(1);
			setNavDate(date);
			getCurrentMonthViewData();
		},
		travelsal:function(callback){
			if(typeof callback == "function"){
				for(var key in schData){
					if(key!="maxNum"){
						var num = schData[key].num;
						var k= key.replace(reg,function(all,year,month,date){
							return year+"-"+month.replace(r2,"")+"-"+date.replace(r2,"");
						});
						callback(k,num);
					}
				}
			}
		},
		setSelectedDate:function(date){
			if(typeof date == "string")
				seletedDate = cal365.templates.api_date(date);
			else if(date instanceof Date)
				seletedDate = date;
		},
		setAddSchDate:function(date){
			addSchDate = date;
		},
		getAddSchDate:function(){
			return addSchDate;
		},
		getSch:function(){
			return schData["d"+getDateKey(seletedDate)];
		},
		getSelectedDate:function(){
			return seletedDate;
		},
		addSch:function(text,allday,hour,second,callback){
			creatSch(text,allday,hour,second,callback);
		},
		drawSch:function(){
			if(this.isLogin()){
				UI.drawSch(this.getSch().schList);
			}
		}
	}
	
	if(window.calendarHandler){
		window._calendarHandler=window.calendarHandler;
	}
	window.calendarHandler=calendarHandler;
})(window); 
