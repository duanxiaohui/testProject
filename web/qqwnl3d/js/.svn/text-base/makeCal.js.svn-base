var HuangLi = {};
var calData = new Array();
var currentDate = new Date();
var rows;
var showingToday = true;    //显示的是今天
var taskHover_inblock = false;
var taskHover_inhover = false;
var madeRiliDate = new Date();
var record = {
    elem_id : "",
    nav_date : new Date()
};
var    timeSelf = 0; //本地时间
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
        //rows = Math.ceil((nextMonthFirstD.valueOf()-tableFirstD.valueOf())/(60*60*24*1000*7));
        rows = 6;
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
                var datestr = getMonthDateStr(aDay.value);
                try
                {
                    //获取工作/放假
                    var work_T = worktime["y"+aDay.year];
                    if(work_T)
                    {
                        workT = work_T["d"+datestr];
                    }
                }
                catch(e)
                {
                }
                if ( workT )
                {
                    if(workT.w=="上班")
                    {
                        aDay.work = true;
                    }
                    else
                    {
                        aDay.rest = true;
                    }
                }
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
                indexDay = makeCal.addTime(indexDay, 1, "day");
            }
            calData.push(week);
        }
    },
    
    showCal:function(selectDate)
    {
        if ( typeof(selectDate) == "undefined" )
        {
            selectDate = makeCal.setTimeZero(new Date());
        }
        selectDate = makeCal.setTimeZero(selectDate);
        var workImgStr = "<div class='workImg'></div>";
        var restImgStr = "<div class='restImg'></div>";
        var table = "<table id='dateTable' border='1' cellspacing='0' bordercolorlight='red' bordercolordark='white'> \
                        <tr id='titleRow'> \
                            <td><div class='titleBlock'>一</div></td> \
                            <td><div class='titleBlock'>二</div></td> \
                            <td><div class='titleBlock'>三</div></td> \
                            <td><div class='titleBlock'>四</div></td> \
                            <td><div class='titleBlock'>五</div></td> \
                            <td><div class='titleBlock restBlock'>六</div></td> \
                            <td><div class='titleBlock restBlock'>日</div></td> \
                        </tr>";
        var tdclass = "";
        for ( var i = 0; i < rows; i++)
        {
            var aWeek = "<tr class='blockRow'>";
            for ( var j = 0; j < 7; j++)
            {
                var tdclass = "dateBlock";
                if ( i > 4 ) 
                {
                    tdclass += ' restBlock';
                }
                if ( calData[i][j].before == true ||  calData[i][j].after == true )
                {
                    tdclass += ' outMonth'
                }
                if ( calData[i][j].today == true )
                {
                    tdclass += ' todayBlock';
                }
                if ( calData[i][j].value.getTime() == selectDate.getTime() )
                {
                    tdclass += ' clickBlock';
                }
                var datenum = calData[i][j].value.getDate();
                var workrest = "";
                if ( calData[i][j].work == true )
                {
                    workrest = "<div class='workImg'></div>";
                }
                if ( calData[i][j].rest == true )
                {
                    workrest = "<div class='restImg'></div>";
                }
                var aDay = "<td><div i='"+i+"' j='"+j+"' class='"+tdclass+"'>"+workrest+datenum+"</div></td>";
                aWeek += aDay;
            }
            aWeek += "<tr>";
            table += aWeek;
        }
        table += "</table>";
        $('#dateTable').remove();
        $('#backNum').text(selectDate.getMonth()+1);
        $('#leftTable').after(table);
        makeCal.makeAction();
    },
    //init初始化的功能只需要初始化一次
    initAction:function()
    {
        $('#tdNextBtn').bind('click', function(e){
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
            $("#ymstr").text();
            makeCal.nextMonth(currentDate);
        });
        $('#tdPrevBtn').bind('click', function(e){
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
        $('#tdTodayBtn').bind('click', function(e){
            makeCal.showToday();
        });

        $('#mainFrame').css("width","149px");
        $('#dateTable').css("left","16px");
        $('#dateTable').css("opacity","0");
        $('#backNum').css("opacity","0");
        $('#mainFrame').bind('mouseenter', function(e){
            $('#mainFrame').stop(false, false).animate({"width":[355,"easeOutExpo"]},function(){
                $('#dateTable').stop(false, false).animate({"opacity":1},{duration:500,easing:"easeOutExpo"});
                $('#backNum').stop(false, false).animate({"opacity":1},{duration:500,easing:"easeOutExpo"});
            });
        });
        $('#mainFrame').bind('mouseleave', function(e){
            $('#dateTable').stop(false, false).animate({"opacity":0},500);
            $('#backNum').stop(false, false).animate({"opacity":0},500, function(){
                $('#mainFrame').stop(false, false).animate({"width":149},{duration:500,easing:"easeOutExpo"});
            });
        });
    },
    //make初始化的功能每次重绘table后就要初始化一次
    makeAction:function()
    {
        $('.dateBlock').bind('click', function(e){
            var real_show_month = madeRiliDate.getMonth();
            ele = $(e.target);
            while(1)
            {
                if ( ele.hasClass('dateBlock'))
                {
                    break;
                }
                else
                {
                    ele = ele.parent();
                }
            }
            $('.dateBlock').removeClass('clickBlock');
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
            if ( calData[ele.attr('i')][ele.attr('j')].today == false )
            {
               ele.addClass("clickBlock");
            }
            makeCal.makeHuangli(calData[ele.attr('i')][ele.attr('j')].value);
        });
    },
    //生成黄历div
    makeHuangli:function(date)
    {
        currentDate = date;
        date = makeCal.setTimeZero(date);
        var datestr = date.getDate()-0;
        if ( datestr < 10 )
        {
            $('#rightTable #numTd').empty();
            $('#rightTable #numTd').append("<div id='numImg"+datestr+"' class='widthNum'></div>");
        } else {
            $('#rightTable #numTd').empty();
            $('#rightTable #numTd').append("<div id='numImg"+Math.floor(datestr/10)+"'></div>");
            $('#rightTable #numTd').append("<div id='numImg"+datestr%10+"'></div>");
        }
        $('#right_big_date').text(datestr);
        var gregorianDayStr = date.getFullYear()+"年"+(date.getMonth()+1)+"月 ";
        var ggday = ["周日","周一","周二","周三","周四","周五","周六"];
        $('#rightTable #dayStr').text(ggday[date.getDay()]);
        $('#rightTable #chinaStr').text(templates.lunar_Info(date).solarTerm);
        $('#rightTable #festivalStr').text(templates.lunar_Info(date).festival);
        $('#rightTable #chinaDayStr').text(templates.lunar_Info_detail(date).lunar);
        $('#rightTable #ymstr').text(getYearMonth(date));
        var nowDate = new Date();
        nowDate = makeCal.setTimeZero(nowDate);
        var passedTime = Math.ceil((date.getTime() - nowDate.getTime())/86400000);
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
        switch ( passedTime )
        {
            case -2:
                dayafterorbeforeStr = "前天";
                break;
            case -1:
                dayafterorbeforeStr = "昨天";
                break;
            case 1:
                dayafterorbeforeStr = "明天";
                break;
            case 2:
                dayafterorbeforeStr = "后天";
                break;
        }
        $('#afterBeforeStr').text(dayafterorbeforeStr);
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
        obj.work = false;
        obj.rest = false;
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
            l_day_full:"",
            solarTerm:"",
            festival:""
        };
        lunar_detail.l_day = cDay(cld_day.lDay);
        lunar_detail.l_month = cld_day.lMonth;
        lunar_detail.color = "";
        var fest, s2;
        
        // 廿四节气
        lunar_detail.solarTerm = cld_day.solarTerms;
        if ( lunar_detail.solarTerm == 'undefined' )
        {
            lunar_detail.solarTerm = "";
        }
        //节气例外
        var key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        if(typeof SolarTermException[key] != 'undefined'){
            lunar_detail.solarTerm = SolarTermException[key];
        }
        //各种节日
        fest = cld_day.lunarFestival;
        // 公历节日
        s2 = cld_day.solarFestival;
        if ( fest.length > 0 )
        {
            fest = fest+" "+s2;
        }
        else
        {
            fest = s2;
        }
        if(fest.length>0)
        {
            lunar_detail.festival = fest;
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
                    var filename="/js/huangli/"+year+".js";
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
function getYearMonth(date) {
    month = date.getMonth()+1;
    return date.getFullYear()+"年"+month+"月";
}
//节气例外调整
var SolarTermException = {
    "2012-5-20":"小满",    "2012-5-21":"",
    "2012-12-6":"",        "2012-12-7":"大雪",
    "2013-2-3":"",        "2013-2-4":"立春",
    "2013-7-22":"大暑",    "2013-7-23":"",
    "2013-12-21":"",    "2013-12-22":"冬至",
    "2014-3-5":"",        "2014-3-6":"惊蛰",
    "2015-1-5":"",        "2015-1-6":"小寒",
    "2016-6-6":"",        "2016-6-7":"大雪",
    "2017-7-22":"大暑",    "2017-7-23":"",
    "2017-12-21":"",    "2017-12-22":"冬至",
    "2018-2-18":"",        "2018-2-19":"雨水",
    "2018-3-20":"",        "2018-3-21":"春分",
    "2019-2-4":"立春",    "2019-2-5":"",
    "2019-6-21":"夏至",    "2019-6-22":"",
    "2020-7-6":"小暑",    "2020-7-7":"",
    "2020-8-22":"处暑",    "2020-8-23":"",
    "2020-12-6":"",        "2020-12-7":"大雪"
}
