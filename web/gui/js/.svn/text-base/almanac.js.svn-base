window.HuangLi = window.HuangLi || {};

$(function(){
	var timestamp = getURLParameter("timestamp");
	updateAlmanac(timestamp);
	setInterval(function(){
		$('#lunarDayStr').text(lunarDayStr + getCalendarTime());
	},30000)
});
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
function updateAlmanac(timestamp){
	var selected_date;
	if(timestamp != null){
		selected_date = new Date(parseInt(timestamp));
	}else{
		selected_date = new Date();
	}
	makeHuangli(selected_date);
}

//生成黄历div
function makeHuangli(date){
	currentDate=date;
	date = setTimeZero(date);
	var datestr = date.getDate();
	lunar = templates.lunar_Info_detail(date, showYJ);	
	$(".pc_windows_todaydate").html(datestr);	
	var gregorianDayStr = "";
	switch (date.getDay())
	{
		case 1:
			gregorianDayStr += '星期一';
			break;
		case 2:
			gregorianDayStr += '星期二';
			break;
		case 3:
			gregorianDayStr += '星期三';
			break;
		case 4:
			gregorianDayStr += '星期四';
			break;
		case 5:
			gregorianDayStr += '星期五';
			break;
		case 6:
			gregorianDayStr += '星期六';
			break;
		case 0:
			gregorianDayStr += '星期日';
			break;			
	}
	gregorianDayStr += " " + date.getFullYear()+"年"+(date.getMonth()+1)+"月 ";
    gregorianDayStr += " " + lunar.festival;
	$('#gregorianDayStr').text(gregorianDayStr);
	//1.23日春节前显示为兔年
	if(date.getFullYear()==2012 && (date.getMonth()==0 && date.getDate()<23)){
		lunar.y_Info=lunar.y_Info.replace("龙","兔");
	}
	//2013 1 1~2013 2 3显示为龙年，同时改天干地支
	if(date.getFullYear()==2013 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
		lunar.y_Info=lunar.y_Info.replace("蛇","龙");
		lunar.y_Info=lunar.y_Info.replace("癸巳","壬辰");
	}
	lunarDayStr = lunar.lunar.substr(2) + " " + lunar.y_Info;
	$('#lunarDayStr').text(lunarDayStr + getCalendarTime());
	
	/*
	 *由于黄历“宜”，“忌”数据加载有延迟，将其封装作为获取宜忌数据的回调方法 		 
	 */
	function showYJ(lunar){
		var Y = lunar.huangliY;
		var Ys = Y.split('.');
		var J = lunar.huangliJ;
		var Js = J.split('.');
		var yiHtml = $.map(Ys, function(val, index){
			return "<span>"+val+"</span>";
		}).join("");
		var jiHtml = $.map(Js, function(val, index){
			return "<span>"+val+"</span>";
		}).join("");
		$(".yi_container").html(yiHtml);
		$(".ji_container").html(jiHtml);
		$("#lunar_c").html("冲: "+lunar.c);
		$("#lunar_s").html("煞: "+lunar.s);
		$("#lunar_ch").html("成: "+lunar.ch);
		$("#lunar_zc").html("正冲: "+lunar.zc.replace(/正冲/g,""));
		$("#lunar_ts").html("胎神: "+lunar.ts);
	}
	//add by wuzhq
	calendarHandler.setSelectedDate(date);
}





var templates = {
		month_day : function(date){
			var d = date || new Date();
			return d.getDate();
		},
		lunar_Info : function(date){
			var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
			var day = date.getDate();
			var cld_day = cld[day - 1];
			var lunar_detail = {
				l_day : "",
				l_month : "",
				l_day_full:""
			};
			lunar_detail.l_day = cDay(cld_day.lDay);
			lunar_detail.l_month = cld_day.lMonth;
			lunar_detail.color = "";
			var s,s2;
			s=cld_day.lunarFestival;
			if(s.length>0) 
			{ // 农历节日
				if(s.length>4)
				{
					s2 = s.toString();
					s = s.substr(0, 3)+'...';
				}
				lunar_detail.color = "#bc5016";
			}
			else 
			{ // 廿四节气
				s=cld_day.solarTerms;
				s2=s.toString();
				 //节气例外
	            var key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	            if(typeof SolarTermException[key] != 'undefined'){
	            	s = s2 = SolarTermException[key];
	            }
	            
				if(s.length>0)
				{
					lunar_detail.color = "#bc5016";             
					if((s =='清明')||(s =='芒种')||(s =='夏至')||(s =='冬至'))
					{
						lunar_detail.color = "#bc5016";
						if(s =='清明') 
						{
							s = '清明节';
						}
					}             
				}
				else 
				{ // 公历节日
					s=cld_day.solarFestival;
					s2 = s.toString();
					if(s.length>4)
					{
						if(s.length>3)
						{
							s = s.substr(0, 3)+'..';
						}
						lunar_detail.color = "#bc5016";
					}
				}
			}
			if(s.length>0)
			{
				lunar_detail.l_day = s;
				lunar_detail.l_day_full = s2;
			}
			return lunar_detail;
		},
		lunar_Info_detail : function(date, callback){
			var cld = new calendar(date.getFullYear(), date.getMonth());
			var year = date.getFullYear();
			var day = date.getDate();
			var cld_day = cld[day - 1];
			var festival=[];
			var info = {
				lunar:"",
				y_Info:"",
				huangliY:"无",
				huangliJ:"无",
				festival:""
			};
			info.lunar = '农历' + (cld_day.isLeap ? '闰 ' : '')+templates.getChinaNum(cld_day.lMonth)+"月"+ cDay(cld_day.lDay);
			info.y_Info = cld_day.cYear + '年'+this.lunar_year(date) +" "+ cld_day.cMonth + '月' + cld_day.cDay + '日';
			info.festival = cld_day.solarFestival + " " + cld_day.lunarFestival + " " + cld_day.solarTerms;
			try
			{
				if(year>=2008&&year<=2020) // 杨
				{
						var filename="/js/huangli/"+year+".js";
						$.getScript(filename,function(){
							var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
								+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));

							info.huangliY = hl.y;
							info.huangliJ = hl.j;
							info.c = hl.c;
							info.s = hl.s;
							info.ch = hl.ch;
							info.zc = hl.zc;
							info.ts = hl.ts;
							if(callback){
								callback(info);
							}
						});
				}
				else
				{
					if(callback){
							callback(info);
					}
				}
			} catch (e) {
			}
			return info;
		},
		lunar_year : function(date){

			var l_year = '['+ Animals[(date.getFullYear() - 4) % 12] + '年]';
			return l_year;
		},
		getChinaNum :function(Num) {
			var monthEn;
			switch(Num){
				case 1 : monthEn = "一";break;
				case 2 : monthEn = "二";break;
				case 3 : monthEn = "三";break;
				case 4 : monthEn = "四";break;
				case 5 : monthEn = "五";break;
				case 6 : monthEn = "六";break;
				case 7 : monthEn = "七";break;
				case 8 : monthEn = "八";break;
				case 9 : monthEn = "九";break;
				case 10 : monthEn = "十";break;
				case 11 : monthEn = "十一";break;
				case 12 : monthEn = "腊";break;
			}
			return monthEn;
		},
		init_sel_festival : function(){
			var festival_m = festival_main;
			if(festival_main)
			{
				var str = new StringBuffer();
				str.append('<div id="festival_sel_body">');
				for(var i in festival_main){
						str.append('<div date="'+i).append('">').append(festival_main[i]+'</div>');
				}
				str.append('</div>');	
			}
			$("#festival_sel_div").html(str.toString());
			$("#festival_sel_body>div").each(function(){
				$(this).click(function(){
					var y = $(this).attr("date").split("_");
					
					record.nav_date.setFullYear(y[0]);
					record.nav_date.setMonth(Number(y[1])-1);
					generic_cal(record.nav_date,record.elem_id);
					$("#festival_sel_div").hide();
				});
				$(this).hover(function(){
					$(this).addClass("year_bg");
				},
				function(){
					$(this).removeClass("year_bg");
				});
			});
		},
		init_sel_year : function(){
			var str = new StringBuffer();
			str.append('<div id="sel_body">');
			for(var i=1900;i<2050;i++)
			{
				str.append('<div>').append(i).append('</div>');
			}
			str.append('</div>');
			// 设置日期选择的初始位置
			var scroll_top = record.nav_date.getFullYear()-1900;
			$("#open_sel_div").html(str.toString());
			$("#sel_body>div").each(function(){
				$(this).click(function(){
					var y = $(this).html();
					record.nav_date.setFullYear(y);
					generic_cal(record.nav_date,record.elem_id);
					$("#open_sel_div").hide();
				});
				$(this).hover(function(){
					$(this).addClass("year_bg");
				},
				function(){
					$(this).removeClass("year_bg");
				});
			});
		},
		mousedown_hide_ele : function(id){
			$(document).bind("mousedown."+id, function(r) {
				var p = r.target;
				var q = document.getElementById(id);
				while (true) 
				{
					if (p == q) 
					{
						return true
					} 
					else 
					{
						if (p == document) 
						{
							$(document).unbind("mousedown."+id);
							$("#"+id).hide();
								return false
						} 
						else 
						{
							p = $(p).parent()[0]
						}
					}
				}
			});
		}
	};
	var cacheMgr = {
		cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
		getCld : function(year, month) {
			var key = getMonthKey(year, month);
			var cld = this.cldCache[key];
			if (typeof cld == 'undefined') 
			{
				cld = new calendar(year, month);
				this.cldCache[key] = cld;
			}
			return cld;
		}
	}


	function getCalendarTime(){
		var time = new Date();
		var hour = time.getHours();
		var minute = time.getMinutes();
		var index = Math.ceil(hour/2) % 12;
		var lunarTime = Zhi[index] + "时";
		if ( hour < 10 )
		{
			hour = "0"+hour;
		}
		if ( minute < 10 )
		{
			minute = "0"+minute;
		}
		return lunarTime + "("+hour+":"+minute+")";

	}



function setTimeZero(date){
	var ndate = new Date(date);
	ndate.setHours(0);
	ndate.setMinutes(0);
	ndate.setSeconds(0);
	ndate.setMilliseconds(0);	
	return ndate;
}