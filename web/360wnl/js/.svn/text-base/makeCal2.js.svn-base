var HuangLi = {};
var calData = new Array();
var currentDate = new Date();
var rows;
var showingToday = true;	//显示的是今天
var taskHover_inblock = false;
var taskHover_inhover = false;
var madeRiliDate = new Date();
var record = {
	elem_id : "",
	nav_date : new Date()
};
var	timeSelf = 0; //本地时间
var timeBeijing; //北京时间
function clock(time){
	timeSelf = (new Date()).getTime();
	timeBeijing = time*1000;
}
var calander = {
	//initialization the calender
	init:function()
	{
		makeCal.pareData(new Date());
		makeCal.showCal(new Date());
		//init初始化的功能只需要初始化一次
		makeCal.initAction();
		makeCal.makeHuangli(currentDate);
		$.getScript("http://utility.hao123.com/time.php?callback=clock");
	},
	//make the calender of `date`
	pareData:function(date)
	{
		date = makeCal.setTimeZero(date);
		madeRiliDate = new Date(date);
		//the first of this month
		monthFirstD = makeCal.getMonthFirst(date);
		//the first in the table
		tableFirstD = makeCal.getWeekFirst(monthFirstD);
		//the first of next month
		nextMonthFirstD = makeCal.addTime(monthFirstD, 1, "month");
		//last day of this month
		monthLastD = makeCal.addTime(nextMonthFirstD, -1, "day");
		//get the rows
		rows = Math.ceil((nextMonthFirstD.valueOf()-tableFirstD.valueOf())/(60*60*24*1000*7));
		//loop to calculate the data
		indexDay = new Date(tableFirstD);
		nowDay = makeCal.setTimeZero(new Date());
		calData = [];
		for ( var i = 0; i < rows; i++)
		{
			week = [];
			for ( var j = 0; j < 7; j++)
			{
				aDay = makeCal.createDay();
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
				aDay.china = templates.lunar_Info(aDay.value);
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
					case '2016-6-7':
						aDay.china.l_day='初三';
						break;
				}
				week.push(aDay);
				indexDay = makeCal.addTime(indexDay, 1, "day");
			}
			calData.push(week);
		}
	},
	
	showCal:function(selectDate)
	{
		if ( typeof(selectDate) == "undefined" )
		{
			selectDate = date = makeCal.setTimeZero(new Date());
		}
		selectDate = makeCal.setTimeZero(selectDate);
		$('#month_num').text(selectDate.getMonth()+1);
		$('#year_num').text(selectDate.getFullYear());
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
				var datestr = getMonthDateStr(calData[i][j].value);
				var workT="";
				try
				{
					//获取工作/放假
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
						tdclass = "restBlock";
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
					aDay += "	<div class='"+numtype+" number"+calData[i][j].rows+"'>"+calData[i][j].date+"</div>\
								<div class='chinaday chinaday"+calData[i][j].rows+" festival' style='color: "+calData[i][j].china.color+"'>"+calData[i][j].china.l_day+"</div>";
				}
				else
				{
					aDay += "	<div class='"+numtype+" number"+calData[i][j].rows+"'>"+calData[i][j].date+"</div>\
								<div class='chinaday chinaday"+calData[i][j].rows+" festival'>"+calData[i][j].china.l_day+"</div>";
				}
				if ( calData[i][j].hasWork )
				{
					aDay += "<div class='workDot workDot"+calData[i][j].rows+"'></div>"
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
		
		//显示日程图标
		calendarHandler.prepareData4(selectDate.getFullYear(),(selectDate.getMonth()+1), this.appendScheduleIcon);
		
		makeCal.makeAction();
	},
	
	//画日程图标
	appendScheduleIcon:function(date){
		//计算日期对应的日历格子坐标
		var days = (date.getTime() - calData[0][0].value.getTime())/86400000; //日差
		if(days > (7*rows -1))
			return false;
		var i = Math.floor(days/7), 
			j = Math.floor(days) % 7;
		//console.log((date.getMonth()+1) + "-" + date.getDate() + ":" + days + "," + i + "," + j);
		if(!(calData[i][j].hasWork)){
			calData[i][j].hasWork = true;
			$("td[i=" + i + "][j=" + j + "] div:first-child").append("<div class='workDot workDot"+calData[i][j].rows+"'></div>");
		}
	},
	
	//init初始化的功能只需要初始化一次
	initAction:function()
	{
		$('#next_button').bind('click', function(e){
			var month = currentDate.getMonth();
			var year = currentDate.getFullYear();
			var real_show_month = madeRiliDate.getMonth();
			month = real_show_month;
			month++;
			if ( month > 11 )
			{
				month = 0;
				year++;
			}
			var currentMonth = real_show_month;
			currentDate = makeCal.addTime(currentDate, 1, "month");
			if ( currentDate.getMonth() != (currentMonth+1)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth(currentMonth+1);
			}
			$('#year_num').text(year);
			$('#month_num').text(month+1);
			$('#festival').text('假期安排');
			makeCal.nextMonth(currentDate);
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
			currentDate = makeCal.addTime(currentDate, -1, "month");
			if ( currentDate.getMonth() != (currentMonth+11)%12 )
			{
				currentDate.setDate(1);
				currentDate.setMonth((currentMonth+11)%12);
			}
			$('#year_num').text(year);
			$('#month_num').text(month+1);
			$('#festival').text('假期安排');
			makeCal.prevMonth(currentDate);
		});
		$('#today_button').bind('click', function(e){
			makeCal.showToday();
		});
		$('#top_bar_time').text(makeCal.get365riliTime());
		$('#year_num').text(currentDate.getFullYear());
		$('#month_num').text(currentDate.getMonth()+1);
		setInterval(function(){
			var time = makeCal.get365riliTime();
			$('#top_bar_time').text(makeCal.get365riliTime());
			if ( time == '00:00:00' && showingToday )
			{
				var d = new Date();
				makeCal.pareData(d);
				makeCal.showCal(d);
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
				$('#festival_select_selecter').css({'top':$('#festival').offset().top+32+'px'});
				$('#festival_select_selecter').css({'left':$('#festival').position().left+28+'px'});
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
				$('#month_select_selecter').css({'top':$('#month_func').offset().top+32+'px'});
				$('#month_select_selecter').css({'left':$('#month_func').position().left+4+'px'});
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
				
				$('#year_select_selecter').css({'top':$('#year_func').offset().top+32+'px'});
				$('#year_select_selecter').css({'left':$('#year_func').position().left+7+'px'});
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
			makeCal.pareData(currentDate);
			makeCal.showCal(currentDate);
			makeCal.makeHuangli(currentDate);
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
			makeCal.pareData(currentDate);
			makeCal.showCal(currentDate);
			makeCal.makeHuangli(currentDate);
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
			makeCal.pareData(currentDate);
			makeCal.showCal(currentDate);
			makeCal.makeHuangli(currentDate);
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
		$('#cal_plusbutton').bind('click',function(e){
			if(!calendarHandler.isLogin()){
				login();
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
	},
	//make初始化的功能每次重绘table后就要初始化一次
	makeAction:function()
	{
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
				makeCal.prevMonth(click_date);
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
			makeCal.makeHuangli(calData[ele.attr('i')][ele.attr('j')].value);
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
				$('#taskHover').css({"left":ele.position().left-43+"px"});
				$('#taskHover').css({"top":ele.position().top+60+"px"});
			}
			else if ( ele.hasClass('block5'))
			{
				$('#taskHover').css({"display":"block"});
				$('#taskHover').css({"left":ele.position().left-43+"px"});
				$('#taskHover').css({"top":ele.position().top+49+"px"});
			}
			else if ( ele.hasClass('block6'))
			{
				$('#taskHover').css({"display":"block"});
				$('#taskHover').css({"left":ele.position().left-43+"px"});
				$('#taskHover').css({"top":ele.position().top+40+"px"});
			}
		});
	},
	//生成黄历div
	makeHuangli:function(date)
	{
		currentDate=date;
		date = makeCal.setTimeZero(date);
		var datestr = date.getDate();
		lunar = templates.lunar_Info_detail(date, showYJ);
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
		$('#popDateStr').text(getFullDateStr(date));
		$('#popChineseStr').text((lunar.lunar).substring(2));
		var nowDate = makeCal.setTimeZero(new Date());
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
		calendarHandler.setSelectedDate(date);
	},
	//get the first date in the week where `date` in
	getWeekFirst:function(date)
	{
		var day = date.getDay();
		if ( day == 0 )
		{
			day = 7;
		}
		return makeCal.addTime(date, 0-day+1, "day");
	},
	//get the first date in the month where `date` in
	getMonthFirst:function(date)
	{
		ndate = new Date(date);
		ndate.setDate(1);
		return ndate;
	},
	//add `inc` time which `mode` said on `date`
	addTime:function(date, inc, mode)
	{
		ndate = new Date(date);
		switch(mode)
		{
			case "day":
				ndate.setDate(date.getDate()+inc); 
				break;
			case "week": 
				ndate.setDate(date.getDate()+7*inc); 
				break;
			case "month": 
				ndate.setMonth(date.getMonth()+inc); 
				break;
			case "year": 
				ndate.setYear(date.getFullYear()+inc); 
				break;
			case "hour": 
				ndate.setHours(date.getHours()+inc); 
				break;
			case "minute": 
				ndate.setMinutes(date.getMinutes()+inc); 
				break;
			default:
				return ndate;
		}
		return ndate;
	},
	//set the time of date zero
	setTimeZero:function(date)
	{
		ndate = new Date(date);
		ndate.setHours(0);
		ndate.setMinutes(0);
		ndate.setSeconds(0);
		ndate.setMilliseconds(0);	
		return ndate;
	},
	//the day object
	createDay:function()
	{
		obj = new Object();
		obj.year = 0;
		obj.month = 0;
		obj.date = 0;
		obj.day = 0;
		obj.before = false;
		obj.after = false;
		obj.weekend = false;
		obj.china = null;
		obj.rows = 0;
		obj.inrow = 0;
		obj.today = false;
		obj.value = null;
		obj.hasWork = false;
		return obj;
	},
	//下一个月
	nextMonth:function(clickDate)
	{
		makeCal.pareData(clickDate);
		makeCal.showCal(clickDate);
		showingToday = false;
		makeCal.makeHuangli(clickDate);
	},
	//上一个月
	prevMonth:function(clickDate)
	{
		makeCal.pareData(clickDate);
		makeCal.showCal(clickDate);
		showingToday = false;
		makeCal.makeHuangli(clickDate);
	},
	//显示今天
	showToday:function()
	{
		currentDate = new Date();
		makeCal.pareData(currentDate);
		makeCal.showCal(new Date());
		$('#festival').text('假期安排');
		$('#year_num').text(currentDate.getFullYear());
		$('#month_num').text(currentDate.getMonth()+1);
		showingToday = true;
		makeCal.makeHuangli(currentDate);
	},
	bind_funcbutton:function(button, block, selecter)
	{
		$('#'+button).bind('click', 
			function(e)
			{
				$('#'+selecter).css({'top':$('#'+button).offset().top+30+'px'});
				$('#'+selecter).css({'left':$('#'+button).position().left-39+'px'});
				$('#'+selecter).css({'display':'block'});
				if ( button == 'year_func' )
				{
					var yearNum = $('#year_num').text();
					var offset = $('#yearitem'+yearNum).position().top;
					$('#'+selecter).scrollTop(offset);
				}
			}
		);
	},
	get365riliTime:function()
	{
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
};
function StringBuffer(){
	this._strings = new Array();
};
StringBuffer.prototype.append = function(str){
	this._strings.push(str);
	return this;
};
StringBuffer.prototype.toString = function(){
	var str = arguments.length == 0 ? '' : arguments[0];
	return this._strings.join(str);
};
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
		var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
		var year = date.getFullYear();
		var day = date.getDate();
		var cld_day = cld[day - 1];
		var festival=[];
		var info = {
			lunar:"",
			y_Info:"",
			huangliY:"无",
			huangliJ:"无"
		};
		info.lunar = '农历' + (cld_day.isLeap ? '闰 ' : '')+templates.getChinaNum(cld_day.lMonth)+"月"+ cDay(cld_day.lDay);
		info.y_Info = cld_day.cYear + '年'+this.lunar_year(date) +" "+ cld_day.cMonth + '月' + cld_day.cDay + '日';
		try
		{
			if(year>=2008&&year<=2020) // 杨
			{
				if (eval("HuangLi.y" + year) == null)
				{
					var filename="http://up1.365rili.com/js/huangli/"+year+".js";
					$.getScript(filename,function(){
						var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
							+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));

						info.huangliY = hl.y;
						info.huangliJ = hl.j;
						if(callback){
							callback(info);
						}
					}); 
				}
				else
				{
					var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
							+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));
					info.huangliY = hl.y;
					info.huangliJ = hl.j;
					if(callback){
						callback(info);
					}
				}
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

		var l_year = '【'+ Animals[(date.getFullYear() - 4) % 12] + '年】';
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
function getMonthKey(year, month) 
{ // 传入的month为0-11的数值
	return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
}
String.prototype.leftpad = function(len, str)
{
	if (!str) 
	{
		str = '0';
	}
	var s = '';
	for (var i = 0; i < len - this.length; i++) 
	{
		s += str;
	}
	return s + this;
};
window.makeCal = calander;
function getMonthDateStr(date)
{
	month = date.getMonth()+1;
	day = date.getDate();
	if ( month < 10 )
	{
		month = "0"+month;
	}
	if ( day < 10 )
	{
		day = "0" + day;
	}
	return month+""+day;
}
function getFullDateStr(date)
{
	month = date.getMonth()+1;
	day = date.getDate();
	year = date.getFullYear();
	return year+"-"+month+"-"+day;
}

//节气例外调整
var SolarTermException = {
	"2012-5-20":"小满",	"2012-5-21":"",
	"2012-12-6":"",		"2012-12-7":"大雪",
	"2013-2-3":"",		"2013-2-4":"立春",
	"2013-7-22":"大暑",	"2013-7-23":"",
	"2013-12-21":"",	"2013-12-22":"冬至",
	"2014-3-5":"",		"2014-3-6":"惊蛰",
	"2015-1-5":"",		"2015-1-6":"小寒",
	"2016-6-6":"",		"2016-6-7":"大雪",
	"2017-7-22":"大暑",	"2017-7-23":"",
	"2017-12-21":"",	"2017-12-22":"冬至",
	"2018-2-18":"",		"2018-2-19":"雨水",
	"2018-3-20":"",		"2018-3-21":"春分",
	"2019-2-4":"立春",	"2019-2-5":"",
	"2019-6-21":"夏至",	"2019-6-22":"",
	"2020-7-6":"小暑",	"2020-7-7":"",
	"2020-8-22":"处暑",	"2020-8-23":"",
	"2020-12-6":"",		"2020-12-7":"大雪"
}
