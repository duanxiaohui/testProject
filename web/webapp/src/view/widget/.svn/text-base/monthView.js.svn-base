/*
**	monthView
*/
define(function(require, exports, module) {
	var $dateUtil = require('../../common/dateUtil');
	var LunarDate = require('../../model/lunarDate');
	var $lunar    = require('../../common/lunar');
	
	var self = {};
	module.exports = self;
	self.container = $("#mainCal");
	var	timeSelf = 0; //本地时间
	var timeBeijing; //北京时间
	function clock(time){
		timeSelf = (new Date()).getTime();
		timeBeijing = time*1000;
	}
	
	var worktime = {};
	worktime.y2012 = JSON.parse('{    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0121": {        "w": "上班"    },    "d0122": {        "w": "放假"    },    "d0123": {        "w": "放假"    },    "d0124": {        "w": "放假"    },    "d0125": {        "w": "放假"    },    "d0126": {        "w": "放假"    },    "d0127": {        "w": "放假"    },    "d0128": {        "w": "放假"    },    "d0129": {        "w": "上班"    },    "d0331": {        "w": "上班"    },    "d0401": {        "w": "上班"    },    "d0402": {        "w": "放假"    },    "d0403": {        "w": "放假"    },    "d0404": {        "w": "放假"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0622": {        "w": "放假"    },    "d0623": {        "w": "放假"    },    "d0624": {        "w": "放假"    },    "d0929": {        "w": "上班"    },    "d0930": {        "w": "放假"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    }}');
	worktime.y2013 = JSON.parse('{    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0105": {        "w": "上班"    },    "d0106": {        "w": "上班"    },    "d0209": {        "w": "放假"    },    "d0210": {        "w": "放假"    },    "d0211": {        "w": "放假"    },    "d0212": {        "w": "放假"    },    "d0213": {        "w": "放假"    },    "d0214": {        "w": "放假"    },    "d0215": {        "w": "放假"    },    "d0216": {        "w": "上班"    },    "d0217": {        "w": "上班"    },    "d0404": {        "w": "放假"    },    "d0405": {        "w": "放假"    },    "d0406": {        "w": "放假"    },    "d0407": {        "w": "上班"    },    "d0427": {        "w": "上班"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0608": {        "w": "上班"    },    "d0609": {        "w": "上班"    },    "d0610": {        "w": "放假"    },    "d0611": {        "w": "放假"    },    "d0612": {        "w": "放假"    },    "d0919": {        "w": "放假"    },    "d0920": {        "w": "放假"    },    "d0921": {        "w": "放假"    },    "d0922": {        "w": "上班"    },    "d0929": {        "w": "上班"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    },    "d1012": {        "w": "上班"    }}');

	var festival_main = {
			"2013_01_01":"元旦",
			"2013_02_10":"春节" ,
			"2013_04_04":"清明节" ,
			"2013_05_01":"劳动节" ,
			"2013_06_12":"端午节",
			"2013_09_19":"中秋节",
			"2013_10_01":"国庆节"
			};
	
	
	function init(){
		pareData(new Date());
		renderMonthView();
		makeHuangli(new Date());
		initEvent();
	}
	
	function refresh(date){
		pareData(date);
		renderMonthView();
		makeHuangli(date);
	}
	var madeRiliDate;
	var rows;
	var calData;
	var selectDate = new Date();
	
	//make the calender of `date`
	function pareData(date){
		date = $dateUtil.setTimeZero(date);
		madeRiliDate = new Date(date);
		//the first of this month
		var monthFirstD = $dateUtil.getMonthFirst(date);
		//the first in the table
		var tableFirstD = $dateUtil.getWeekFirst(monthFirstD);
		//the first of next month
		var nextMonthFirstD = $dateUtil.addTime(monthFirstD, 1, "month");
		//last day of this month
		var monthLastD = $dateUtil.addTime(nextMonthFirstD, -1, "day");
		//get the rows
		rows = Math.ceil((nextMonthFirstD.valueOf()-tableFirstD.valueOf())/(60*60*24*1000*7));
		//loop to calculate the data
		var indexDay = new Date(tableFirstD);
		var nowDay = $dateUtil.setTimeZero(new Date());
		fillCalData(indexDay, monthFirstD, monthLastD, nowDay);
	}
				
	function fillCalData(indexDay, monthFirstD, monthLastD, nowDay){
		calData = [];
		for ( var i = 0; i < rows; i++)
		{
			var week = [];
			for ( var j = 0; j < 7; j++)
			{
				var aDay = new LunarDate();
				//set year month date
				aDay.year = indexDay.getFullYear();
				aDay.month = indexDay.getMonth();
				aDay.date = indexDay.getDate();
				//set mode
				if ( indexDay.getTime() < monthFirstD.getTime() )
				{
					aDay.before = true;
				}
				else if ( indexDay.getTime() > monthLastD.getTime() )
				{
					aDay.after = true;
				}
				if ( indexDay.getTime() == nowDay.getTime() )
				{
					aDay.today = true;
				}
				if ( j == 5 || j == 6 )
				{
					aDay.weekend = true;
				}
				aDay.rows = rows;
				aDay.inrow = i+1;
				aDay.value = indexDay;
				aDay.china = {
						l_day : "",
						l_month : "",
						l_day_full:"",
						color:""
					}
				aDay.china = $lunar.lunarInfo(aDay.value);
				//临时调整节气
				var date_detail = aDay.value.getFullYear()+"-"+(aDay.value.getMonth()+1)+"-"+aDay.value.getDate();
				switch(date_detail){
					case '2011-11-22':
						aDay.china.l_day='廿七';
						aDay.china.color="";
						break;
					case '2011-11-23':
						aDay.china.l_day='小雪';
						aDay.china.color="#bc5016";
						break;
					case '2012-1-1'  :
						aDay.china.l_day='元旦';
						aDay.china.color="#bc5016";
						break;
					case '2012-1-20':
						aDay.china.l_day='廿七';
						aDay.china.color="";
						break;
					case '2012-1-21':
						aDay.china.l_day='大寒';
						aDay.china.color="#bc5016";
						break;
				}
				week.push(aDay);
				indexDay = $dateUtil.addTime(indexDay, 1, "day");
			}
			calData.push(week);
		}
	}
	
	function renderMonthView(){
		var table = "<table> \
			<thead class='tablehead'> \
				<tr> \
					<td class='thead"+rows+"'>一</td> \
					<td class='thead"+rows+"'>二</td> \
					<td class='thead"+rows+"'>三</td> \
					<td class='thead"+rows+"'>四</td> \
					<td class='thead"+rows+"'>五</td> \
					<td class='thead"+rows+"' style='color:#bc5016;'>六</td> \
					<td class='thead"+rows+"' style='color:#bc5016;'>日</td> \
				</tr> \
			</thead> \
			<tbody>";
		var tdclass = "";
		for ( var i = 0; i < rows; i++)
		{
		var	aWeek = "<tr>";
		for ( var j = 0; j < 7; j++)
		{
			var tdclass = "";
			if ( calData[i][j].before == true )
			{
				tdclass = 'before';
			}
			else if ( calData[i][j].after == true )
			{
				tdclass = 'after';
			}
			var datestr = $dateUtil.getMonthDateStr(calData[i][j].value);
			var workT="";
			try
			{
				// 获取工作/放假
				var work_T = worktime["y"+calData[i][j].year];
				if(work_T)
				{
					workT = work_T["d"+datestr];
				}
			}
			catch(e)
			{
			}
			var workType = "";
			if ( workT )
			{
				if(workT.w=="上班")
				{
					tdclass = "workBlock";
					workType = "work";
				}
				else
				{
					tdclass = "restBlock" + +calData[i][j].rows;
					workType = "rest";
				}
			}
			if ( calData[i][j].today == true )
			{
				tdclass = 'today today'+calData[i][j].rows;
			}
			var numtype = "number";
			if ( calData[i][j].weekend == true )
			{
				numtype = "weekendNum";
			}
			if ( calData[i][j].before )
			{
				numtype = "before number";
			}
			else if ( calData[i][j].after )
			{
				numtype = "after number";
			}
			var isClickBlock = "";
			if ( calData[i][j].today == false && calData[i][j].value.getTime() == selectDate.getTime() )
			{
				isClickBlock = " clickBlock"+calData[i][j].rows;
			}
			var aDay = "<td i="+i+" j="+j+" class='block block"+calData[i][j].rows+" "+tdclass+isClickBlock+"'>";
			aDay += "<div class='block_content block_content"+calData[i][j].rows+"'>";
			if ( workType == "work" )
			{
				aDay += "<div class='workrest work'></div>";
			}
			else if ( workType == "rest" )
			{
				aDay += "<div class='workrest rest'></div>";
			}
			
			if ( calData[i][j].today == false )
			{
				var title = calData[i][j].china.l_day_full;
				if(!title)
					title = "";
				aDay += "	<div class='"+numtype+" number"+calData[i][j].rows+"'>"+calData[i][j].date+"</div>\
							<div class='chinaday chinaday"+calData[i][j].rows+" festival' style='color: "+calData[i][j].china.color+"' title='"+title+"'>"+calData[i][j].china.l_day+"</div>";
			}
			else
			{
				var title = calData[i][j].china.l_day_full;
				if(!title)
					title = "";
				aDay += "	<div class='"+numtype+" number"+calData[i][j].rows+"'>"+calData[i][j].date+"</div>\
							<div class='chinaday chinaday"+calData[i][j].rows+" festival' title='"+title+"'>"+calData[i][j].china.l_day+"</div>";
			}

			if ( calData[i][j].hasWork )
			{
		        aDay += "<img class='workDot workDot"+calData[i][j].rows+"' src='http://static.365rili.com/wannianlibaidu/BD_images/dot.png'/>"
			}

			aDay += "</div></td>";
			aWeek += aDay;
		}
		aWeek += "<tr>";
		table += aWeek;
		}
		table += "</tbody></table>";
		$('#mainCal').empty();
		$('#mainCal').append(table);
		
		makeAction();
	}
	
	//init初始化的功能只需要初始化一次
	function initEvent(){
		$('#next_button').bind('click', function(e){
			var year = currentDate.getFullYear();
			var month = currentDate.getMonth();
			var real_show_month = madeRiliDate.getMonth();
			month = real_show_month;
			month++;
			if ( month > 11 )
			{
				month = 0;
				year++;
			}
			var currentMonth = real_show_month;
			currentDate = $dateUtil.addTime(currentDate, 1, "month");
			if ( currentDate.getMonth() != (currentMonth+1)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth(currentMonth+1);
			}
			$('#year_num').text(year);
			$('#month_num').text(month+1);
			$('#festival').text('假期安排');
			refresh(currentDate);
		});
		$('#prev_button').bind('click', function(e){
			var month = currentDate.getMonth();
			var year = currentDate.getFullYear();
			var real_show_month = madeRiliDate.getMonth();
			month = real_show_month;
			month--;
			if ( month < 0 )
			{
				month = 11;
				year--;
			}
			var currentMonth = real_show_month;
			currentDate = $dateUtil.addTime(currentDate, -1, "month");
			if ( currentDate.getMonth() != (currentMonth+11)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth((currentMonth+11)%12);
			}
			$('#year_num').text(year);
			$('#month_num').text(month+1);
			$('#festival').text('假期安排');
			refresh(currentDate);
		});
		$('#today_button').bind('click', function(e){
			currentDate = new Date();
			$('#festival').text('假期安排');
			$('#year_num').text(currentDate.getFullYear());
			$('#month_num').text(currentDate.getMonth()+1);
			refresh(currentDate);
		});
		$('#top_bar_time').text(get365riliTime());
		$('#year_num').text(currentDate.getFullYear());
		$('#month_num').text(currentDate.getMonth()+1);
		setInterval(function(){
			var time = get365riliTime();
			$('#top_bar_time').text(get365riliTime());
			if ( time == '00:00:00' && showingToday )
			{
				var d = new Date();
				refresh(d);
				$('#year_num').text(d.getFullYear());
				$('#month_num').text(d.getMonth()+1);
			}
		}, 1000);
		//bind funcbutton and selecter

		$('#festival').bind('click', function(e)
			{
				if ($('#festival_select_selecter').css("display") == "block")
				{
					$('#festival_select_selecter').css({'display':'none'});
					return;
				}
				$('#festival_select_selecter').css({'top':$('#festival').offset().top+26+'px'});
				$('#festival_select_selecter').css({'left':$('#festival').position().left+16+'px'});
				$('#festival_select_selecter').css({'display':'block'});
			}
		);
		$('#month_func').bind('click', function(e)
			{
				if ($('#month_select_selecter').css("display") == "block")
				{
					$('#month_select_selecter').css({'display':'none'});
					return;
				}
				$('#month_select_selecter').css({'top':$('#month_func').offset().top+26+'px'});
				$('#month_select_selecter').css({'left':$('#month_func').position().left+2+'px'});
				$('#month_select_selecter').css({'display':'block'});
			}
		);
		$('#year_func').bind('click', function(e)
			{
				if ($('#year_select_selecter').css("display") == "block")
				{
					$('#year_select_selecter').css({'display':'none'});
					return;
				}
				
				$('#year_select_selecter').css({'top':$('#year_func').offset().top+26+'px'});
				$('#year_select_selecter').css({'left':$('#year_func').position().left+0+'px'});
				$('#year_select_selecter').css({'display':'block'});
				var yearNum = $('#year_num').text();
				var offset = (yearNum - 1900-2)*20;
				//$('#year_select_selecter').scrollTop(offset);
				$('#year_select_selecter').animate({scrollTop:offset}, 200);
			}
		);
			
		//下拉菜单数据
		for ( var i = 1900; i <= 2050; i++)
		{
			$('#year_select_selecter').append('<div id="yearitem'+i+'" data='+i+' class="select_item year_item">'+i+'</div>');
		}
		for ( var i = 1; i <= 12; i++)
		{
			$('#month_select_selecter').append('<div data='+(i-1)+' class="select_item month_item">'+i+'月</div>');
		}
		for ( var key in festival_main )
		{
			$('#festival_select_selecter').append('<div data='+key+' class="select_item festival_item">'+festival_main[key]+'</div>');
		}
		$('#popHourSelectList').append('<div class="hourItem" data="-1">全天</div>');
		for ( var i = 0; i < 24; i++)
		{
			$('#popHourSelectList').append('<div class="hourItem" data="'+i+'">'+i+'点</div>');
		}
		for ( var i = 0; i < 60; i+=5)
		{
			$('#popMinuteSelectList').append('<div class="minItem" data="'+i+'">'+i+'分</div>');
		}
		$('#popMinuteSelect').bind('click', function(e){
			$('#popMinuteSelectList').css({'display':'block'});
		});
		$('#popHourSelect').bind('click', function(e){
			$('#popHourSelectList').css({'display':'block'});
		});
		$('.minItem').bind('click', function(e){
			$('#popMinuteSelectNumb').html($(e.target).html());
		});
		$('.hourItem').bind('click', function(e){
			$('#popHourSelectNumb').html($(e.target).html());
			if ( $(e.target).attr('data') == "-1" )
			{
				$('#popMinuteSelect').css({"visibility":"hidden"});
			}
			else
			{
				$('#popMinuteSelect').css({"visibility":"visible"});
			}
		});
		$('.year_item').bind('click', function(e){
			data = $(e.target).attr('data');
			currentDate.setFullYear(data);
			$('#year_num').text(currentDate.getFullYear());
			refresh(currentDate);
			$('#festival').text('假期安排');
			showingToday = false;
		});
		$('.month_item').bind('click', function(e){
			data = $(e.target).attr('data');
			currentDate.setMonth(data);
			if ( currentDate.getMonth() != data )
			{
				currentDate.setDate(1);
				currentDate.setMonth(data);
			}
			$('#month_num').text(currentDate.getMonth()+1);
			refresh(currentDate);
			$('#festival').text('假期安排');
			showingToday = false;
		});
		$('.festival_item').bind('click', function(e){
			var data = $(e.target).attr('data').split('_');
			currentDate.setFullYear(data[0]);
			currentDate.setMonth(data[1]-1);
			currentDate.setDate(data[2]);
			$('#year_num').text(currentDate.getFullYear());
			$('#month_num').text(currentDate.getMonth()+1);
			$('#festival').text($(e.target).text());
			refresh(currentDate);
			showingToday = false;
		});
		//单击其他地方菜单消失
		$('body').bind('click', function(e){
			if ( e.target.id != 'year_func' && e.target.id != 'year_num' && e.target.id != 'year_str' )
			{
				$('#year_select_selecter').css({'display':'none'});
			}
			if ( e.target.id != 'month_func' && e.target.id != 'month_num' && e.target.id != 'month_str' )
			{
				$('#month_select_selecter').css({'display':'none'});
			}
			if ( e.target.id != 'festival_button' && e.target.id != 'festival')
			{
				$('#festival_select_block').css({'display':'none'});
				$('#festival_select_selecter').css({'display':'none'});
			}
			if ( $(e.target).hasClass('minuteselect') == false )
			{
				$('#popMinuteSelectList').css({'display':'none'});
				document.getElementById('popMinuteSelectList').style.display = "none";
			}
			if ( $(e.target).hasClass('hourselect') == false )
			{
				$('#popHourSelectList').css({'display':'none'});
				document.getElementById('popHourSelectList').style.display = "none";
			}
			if ( $(e.target).attr('class') != 'YJdiv' && 
				 $(e.target).attr('class') != 'popYJ' && 
				 $(e.target).attr('class') != 'popWord' && 
				 $(e.target).attr('class') != 'popHuangliItemY' && 
				 $(e.target).attr('class') != 'popHuangliItemJ' && 
				 $(e.target).attr('class') != 'popStr')
			{
				$('#huangliDiv').css({'display':'none'});
			}
		});
		var indiv = false;
		var inhuangli = false;
		$('#YJdiv').bind('mouseover', function(e){
			indiv = true;
			setTimeout(function(){
				if ( indiv || inhuangli )
				$('#huangliDiv').css({'display': 'block'});
				}, 500);			
		});
		$('#YJdiv').bind('mouseout', function(e){
			indiv = false;
			if ( inhuangli == false )
			{
			setTimeout(function(){
				if ( inhuangli == false && indiv == false )
				$('#huangliDiv').css({'display': 'none'});
				}, 500);
			}
		});
		$('#huangliDiv').bind('mouseover', function(e){
			inhuangli = true;
			setTimeout(function(){
				if ( indiv || inhuangli )
				$('#huangliDiv').css({'display': 'block'});
				}, 500);
		});
		$('#huangliDiv').bind('mouseout', function(e){
			inhuangli = false;
			if ( indiv == false )
			{
			setTimeout(function(){
				if ( inhuangli == false && indiv == false )
				$('#huangliDiv').css({'display': 'none'});
				}, 500);
			}
		});
		$("#plusDivCreate").bind('click', function(e){
			
			try{
				var hour = parseInt($("#popHourSelectNumb").html()),
				min =  parseInt($("#popMinuteSelectNumb").html()),
				txt = $("#popTextarea").val().replace(/^\s*|\s*$/g,"");
				if(txt.length==0){
					$("#popTextarea").css("border-color","red");
					var count=0;
					var id = setInterval(function(){
						if(count++%2==0){
							$("#popTextarea").css("border-color","#888");
						}else{
							$("#popTextarea").css("border-color","red");
						}
						if(count>=5){
							clearInterval(id);
						}
					},200);
					return;
				}
				var isAllDay = false;
				if ( $("#popHourSelectNumb").text() == "全天" )
				{
					isAllDay = true;
				}
				calendarHandler.addSch(txt,isAllDay,hour,min,makeCal.appendScheduleIcon);
			}catch(e){
				
			}
			$("#popTextarea").val("");
			$('#poparea').val('');
			$("#popHourSelectNumb").html("全天");
			$("#popMinuteSelectNumb").html("0分");
			$('#plusDivEle').css({'display':'none'});
			$('#plusDiv').css({'display':'none'});
		});
		$('#cal_plusbutton').unbind();
		$('#cal_plusbutton').bind('click',function(e){
			if ( clientwnlIsLogin == false )
			{
				if ( $("#loginPop").css("display") == "none" )
				{
					$("#loginPop").css({"display":"block"});
					$('#loginPopUsername').focus();
				}
				else
				{
					$("#loginPop").css({"display":"none"});
				}
				return;
			}
			if ( $('#plusDiv').css('display') == 'block' )
			{
				$('#closePlus').click();
				return;
			}
			$('#plusTime').text(getFullDateStr(currentDate));
			$('#plusDiv').css({'display':'block'});
			$('#plusDivEle').css({'display':'block'});
			$('#popSHI').css({'visibility':'hidden'});
			$('#popFEN').css({'visibility':'hidden'});
			$('#popMinuteSelect').css({'visibility':'hidden'});
		});
		$('#closePlus').bind('click', function(e){
			$('#popTextarea').val("");
			$('#plusDiv').css({'display':'none'});
			$('#plusDivEle').css({'display':'none'});
			$('#popMinuteSelectNumb').text("0分");
			$('#popHourSelectNumb').text("全天")
		});
	}
	
	function makeHuangli(date)
	{
		currentDate=date;
		date = $dateUtil.setTimeZero(date);
		var datestr = date.getDate();
		lunar = $lunar.lunar_Info_detail(date, showYJ);
		$('#right_big_date').text(datestr);
		var gregorianDayStr = date.getFullYear()+"年"+(date.getMonth()+1)+"月 ";
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
		$('#gregorianDayStr').text(gregorianDayStr);
		$('#popDateStr').text($dateUtil.getFullDateStr(date));
		$('#popChineseStr').text((lunar.lunar).substring(2));
		var nowDate = $dateUtil.setTimeZero(new Date());
		var nowMiliSecond = nowDate.getTime();
		var targetMiliSecond = date.getTime();
		var passedTime = Math.ceil((targetMiliSecond - nowMiliSecond)/86400000);
		var dayafterorbeforeStr = "";
		if ( nowDate.getDate() == date.getDate() )
		{
			dayafterorbeforeStr = '今天';
		}
		if ( passedTime < 0 )
		{
			dayafterorbeforeStr = (0-passedTime)+"天前";
		}
		else if ( passedTime > 0 )
		{
			dayafterorbeforeStr = passedTime+"天后";
		}
		$('#dayafterorbefore').text(dayafterorbeforeStr);
		$('#chinaDay').text((lunar.lunar).substring(2));
		
		/*kun:过了春节就算龙年
		if(date.getFullYear()==2012 && (date.getMonth()==0 || (date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("龙","兔");
		}
		*/
		//1.23日春节前显示为兔年
		if(date.getFullYear()==2012 && (date.getMonth()==0 && date.getDate()<23)){
			lunar.y_Info=lunar.y_Info.replace("龙","兔");
		}
		//2013 1 1~2013 2 3显示为龙年，同时改天干地支
		if(date.getFullYear()==2013 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("蛇","龙");
			lunar.y_Info=lunar.y_Info.replace("癸巳","壬辰");
		}
		info = lunar.y_Info;
		var yInfo = info.split(" ");
		$('#chinaDay2').text(yInfo[0]);
		$('#chinaDay3').text(yInfo[1]);
		
		/*
		 *由于黄历“宜”，“忌”数据加载有延迟，将其封装作为获取宜忌数据的回调方法 		 
		 */
		function showYJ(lunar){
			Y = lunar.huangliY;
			Ys = Y.split('.');
			$('#ylist').empty();
			var i = 0;
			for ( var key in Ys )
			{
				i++;
				if (i > 5)
				{
					break;
				}
				$('#ylist').append('<div class="YJdiv">'+Ys[key]+'</div>');
			}
			$('#popYStr').empty();
			for ( var key in Ys )
			{
				$('#popYStr').append('<div class="popHuangliItemY">'+Ys[key]+'</div>');
			}
			J = lunar.huangliJ;
			Js = J.split('.');
			$('#jlist').empty();
			i = 0;
			for ( var key in Js )
			{
				i++;
				if (i > 5)
				{
					break;
				}
				$('#jlist').append('<div class="YJdiv">'+Js[key]+'</div>');
			}
			$('#popJStr').empty();
			for ( var key in Js )
			{
				$('#popJStr').append('<div class="popHuangliItemJ">'+Js[key]+'</div>');
			}
		}
		//add by wuzhq
		//calendarHandler.setSelectedDate(date);
	}
	
	function get365riliTime(){
		var time = (function(){
			if(timeBeijing != null){
				var now = new Date();
				var diff = now.getTime() - timeSelf;
				now.setTime(timeBeijing + diff);
				return now;
			}else{
				return new Date();
			}
		})();
		hour = time.getHours();
		minute = time.getMinutes();
		second = time.getSeconds();
		if ( hour < 10 )
		{
			hour = "0"+hour;
		}
		if ( minute < 10 )
		{
			minute = "0"+minute;
		}
		if ( second < 10 )
		{
			second = "0"+second;
		}
		return hour+":"+minute+":"+second;
	}
	//make初始化的功能每次重绘table后就要初始化一次
	function makeAction(){
		$('.block').bind('click', function(e){
			
			var real_show_month = madeRiliDate.getMonth();
			ele = $(e.target);
			while(1)
			{
				if ( ele.hasClass('block'))
				{
					break;
				}
				else
				{
					ele = ele.parent();
				}
			}
			
			$('.block').removeClass('clickBlock4');
			$('.block').removeClass('clickBlock5');
			$('.block').removeClass('clickBlock6');
			click_date = calData[ele.attr('i')][ele.attr('j')].value;
			//click on a prevDate
			if ( click_date.getMonth() == (real_show_month + 11)%12)
			{
				refresh(click_date);
				return;
			}
			else if ( click_date.getMonth() == (real_show_month+1)%12 )
			{
				makeCal.nextMonth(click_date);
				return;
			}
			if ( ele.hasClass('today') == false )
			{
				if ( ele.hasClass('block4') )
				{
					ele.addClass('clickBlock4');
				}
				else if ( ele.hasClass('block5') )
				{
					ele.addClass('clickBlock5');
				}
				else if ( ele.hasClass('block6') )
				{
					ele.addClass('clickBlock6');
				}
			}
			makeHuangli(calData[ele.attr('i')][ele.attr('j')].value);
		});
		$('#cal_down').bind('mouseover', function(e){
			ele = $(e.target);
			
			for ( var i = 0; i < 5; i++ )
			{
				if ( ele.hasClass('block'))
				{
					break;
				}
				else
				{
					ele = ele.parent();
				}
			}
			var dateWork;
			var i = ele.attr('i'),
				j = ele.attr('j');
			if ( ele.hasClass('block') && calData[i][j].hasWork)
			{
				dateWork = calData[i][j].value;
				calendarHandler.setHoverDate(dateWork);
				calendarHandler.drawSch();
			}else
			{
				$('#taskHover').css({"display":"none"});
				return;
			}
			if ( ele.hasClass('block4'))
			{
				$('#taskHover').css({"display":"block"});
				$('#taskHover').css({"left":ele.position().left-20+"px"});
				$('#taskHover').css({"top":ele.position().top+60+"px"});
			}
			else if ( ele.hasClass('block5'))
			{
				$('#taskHover').css({"display":"block"});
				$('#taskHover').css({"left":ele.position().left-35+"px"});
				$('#taskHover').css({"top":ele.position().top+49+"px"});
			}
			else if ( ele.hasClass('block6'))
			{
				$('#taskHover').css({"display":"block"});
				$('#taskHover').css({"left":ele.position().left-43+"px"});
				$('#taskHover').css({"top":ele.position().top+40+"px"});
			}
		});
	}
	self.init = init;
});
