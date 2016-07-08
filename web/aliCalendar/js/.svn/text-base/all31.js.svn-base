var containers = new Array("cal_container", "single_container", "jieqi_container", "festival_container");
var jieqiData = [];

function getJieQiData(callback) {
    if (jieqiData.length > 0) {
        callback();
    } else {
        $.ajax({
            type: "GET",
            url: "data/jieqi.json?v=20140226",
            dataType: "json",
            success: function(jsonObj) {
                jieqiData = jsonObj;
                callback();
            }
        });
    }
}
var festiArr = globalData.data[globalData.targetYear].festiArr;
var nameTable = {
    '元旦': 'yuandan',
    '春节': 'chunjie',
    '清明节': 'qingmingjie',
    '劳动节': 'laodong',
    '端午节': 'duanwu',
    '中秋节': 'zhongqiu',
    '国庆节': 'guoqing'
};
for (var i = 0; i < festiArr.length; i++) {
  var py = nameTable[festiArr[i].name];
  $('.jieriTd[jieri="'+py+'"] .jieriDate').html(festiArr[i].time);
};

var showContainers = function(name) {
    for (i = 0; i < containers.length; i++) {
        if (containers[i] != name) {
            $("#" + containers[i]).hide();
        } else {
            $("#" + name).show();
        }
    }
}

//--calendarObj.js
/*****************************************************************************
                                   日期资料
*****************************************************************************/

var lunarInfo = new Array(
    0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2,
    0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd295, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977,
    0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970,
    0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f,
    0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557,
    0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0,
    0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0,
    0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6,
    0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570,
    0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0,
    0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5,
    0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930,
    0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530,
    0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45,
    0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0,
    0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef,
    0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4,
    0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0,
    0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260,
    0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252,
    0xd520);

var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
var nStr2 = new Array('初', '十', '廿', '卅', '□');
var monthName = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
var cmonthName = new Array('正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '腊');

//公历节日 *表示放假日
var sFtv = new Array(
    "0101*元旦",
    "0214 情人节",
    "0308 妇女节",
    "0312 植树节",
    "0401 愚人节",
    "0422 地球日",
    "0501 劳动节",
    "0504 青年节",
    "0531 无烟日",
    "0601 儿童节",
    "0606 爱眼日",
    "0701 建党日",
    "0707 抗战纪念日",
    "0801 建军节",
    "0910 教师节",
    "0918 九·一八事变纪念日",
    "1001*国庆节",
    "1031 万圣节",
    "1111 光棍节",
    "1201 艾滋病日",
    "1213 南京大屠杀纪念日",
    "1224 平安夜",
    "1225 圣诞节");

//某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
var wFtv = new Array(
    //一月的最后一个星期日（月倒数第一个星期日）
    "0520 母亲节",
    "0630 父亲节",
    "1144 感恩节");

//农历节日
var lFtv = new Array(
    "0101*春节",
    "0115 元宵节",
    "0202 龙抬头",
    "0505 端午节",
    "0707 七夕",
    "0715 中元节",
    "0815 中秋节",
    "0909 重阳节",
    "1208 腊八节",
    "1223 小年",
    "0100*除夕");


/*****************************************************************************
                                      日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    return (sum + leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29);
    else return (0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
    var lm = lunarInfo[y - 1900] & 0xf;
    return (lm == 0xf ? 0 : lm);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y, m) {
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}



//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

    var i, leap = 0,
        temp = 0;
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2100 && offset > 0; i++) {
        temp = lYearDays(i);
        offset -= temp;
    }

    if (offset < 0) {
        offset += temp;
        i--;
    }

    this.year = i;

    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
            --i;
            this.isLeap = true;
            temp = leapDays(this.year);
        } else {
            temp = monthDays(this.year, i);
        }

        //解除闰月
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;

        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap) {
            this.isLeap = false;
        } else {
            this.isLeap = true;
            --i;
        }

    if (offset < 0) {
        offset += temp;
        --i;
    }

    this.month = i;
    this.day = offset + 1;
}

function getSolarDate(lyear, lmonth, lday, isLeap) {
    var offset = 0;

    // increment year
    for (var i = 1900; i < lyear; i++) {
        offset += lYearDays(i);
    }

    // increment month
    // add days in all months up to the current month
    for (var i = 1; i < lmonth; i++) {
        // add extra days for leap month
        if (i == leapMonth(lyear)) {
            offset += leapDays(lyear);
        }
        offset += monthDays(lyear, i);
    }
    // if current month is leap month, add days in normal month
    if (isLeap) {
        offset += monthDays(lyear, i);
    }

    // increment 
    offset += parseInt(lday) - 1;

    var baseDate = new Date(1900, 0, 31);
    var solarDate = new Date(baseDate.valueOf() + offset * 86400000);
    return solarDate;
}


//==============================返回公历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    else
        return (solarMonth[m]);
}

//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return (Gan[num % 10] + Zhi[num % 12]);
}


//============================== 阴历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {

    this.isToday = false;
    //瓣句
    this.sYear = sYear; //公元年4位数字
    this.sMonth = sMonth; //公元月数字
    this.sDay = sDay; //公元日数字
    this.week = week; //星期, 1个中文
    //农历
    this.lYear = lYear; //公元年4位数字
    this.lMonth = lMonth; //农历月数字
    this.lDay = lDay; //农历日数字
    this.isLeap = isLeap; //是否为农历闰月?
    //八字
    this.cYear = cYear; //年柱, 2个中文
    this.cMonth = cMonth; //月柱, 2个中文
    this.cDay = cDay; //日柱, 2个中文

    this.color = '';

    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = ''; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate());
}





//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

  OBJ.length      返回当月最大日
  OBJ.firstWeek   返回当月一日星期

  由 OBJ[日期].属性名称 即可取得各项值

  OBJ[日期].isToday  返回是否为今日 true 或 false

  其他 OBJ[日期] 属性参见 calElement() 中的注解
*/
function calendar(y, m) {

    var sDObj, lDObj, lY, lM, lD = 1,
        lL, lX = 0,
        tmp1, tmp2, tmp3;
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;

    sDObj = new Date(y, m, 1, 0, 0, 0, 0); //当月一日日期

    this.length = solarDays(y, m); //公历当月天数
    this.firstWeek = sDObj.getDay(); //公历当月1日星期几

    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) cY = cyclical(y - 1900 + 36 - 1);
    else cY = cyclical(y - 1900 + 36);
    var term2 = sTerm(y, 2); //立春日期

    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = sTerm(y, m * 2) //返回当月「节」为几日开始
    cM = cyclical((y - 1900) * 12 + m + 12);

    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

    for (var i = 0; i < this.length; i++) {

        if (lD > lX) {
            sDObj = new Date(y, m, i + 1); //当月一日日期
            lDObj = new Lunar(sDObj); //农历
            lY = lDObj.year; //农历年
            lM = lDObj.month; //农历月
            lD = lDObj.day; //农历日
            lL = lDObj.isLeap; //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天

            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }

        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && (i + 1) == term2) cY = cyclical(y - 1900 + 36);
        //依节气月柱, 以「节」为界
        if ((i + 1) == firstNode) cM = cyclical((y - 1900) * 12 + m + 13);
        //日柱
        cD = cyclical(dayCyclical + i);

        //sYear,sMonth,sDay,week,
        //lYear,lMonth,lDay,isLeap,
        //cYear,cMonth,cDay
        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7],
            lY, lM, lD++, lL,
            cY, cM, cD);
    }

    //节气
    tmp1 = sTerm(y, m * 2) - 1;
    tmp2 = sTerm(y, m * 2 + 1) - 1;
    this[tmp1].solarTerms = solarTerm[m * 2];
    this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    //if(m==3) this[tmp1].color = 'red'; //清明颜色

    //公历节日
    for (i in sFtv)
        if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + ' ';
                if (RegExp.$3 == '*') this[Number(RegExp.$2) - 1].color = 'red';
            }

            //月周节日
    for (i in wFtv)
        if (wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                tmp1 = Number(RegExp.$2);
                tmp2 = Number(RegExp.$3);
                if (tmp1 < 5)
                    this[((this.firstWeek > tmp2) ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
                else {
                    tmp1 -= 5;
                    tmp3 = (this.firstWeek + this.length - 1) % 7; //当月最后一天星期?
                    this[this.length - tmp3 - 7 * tmp1 + tmp2 - (tmp2 > tmp3 ? 7 : 0) - 1].solarFestival += RegExp.$5 + ' ';
                }
            }

            //农历节日
    for (i in lFtv)
        if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            tmp1 = Number(RegExp.$1) - firstLM;
            if (tmp1 == -11) tmp1 = 1;
            if (tmp1 >= 0 && tmp1 < n) {
                tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1;
                if (tmp2 >= 0 && tmp2 < this.length && this[tmp2].isLeap != true) {
                    this[tmp2].lunarFestival += RegExp.$4 + ' ';
                    if (RegExp.$3 == '*') this[tmp2].color = 'red';
                }
            }
        }


        //复活节只出现在3或4月
        //  if(m==2 || m==3) {
        //      var estDay = new easter(y);
        //      if(m == estDay.m)
        //         this[estDay.d-1].solarFestival = this[estDay.d-1].solarFestival+' 复活节 Easter Sunday';
        //   }

        //黑色星期五
        //  if((this.firstWeek+12)%7==5)
        //      this[12].solarFestival += '黑色星期五';

        //今日
        //if(y==g_tY && m==g_tM) {this[g_tD-1].isToday = true;}

}




//======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
function easter(y) {

    var term2 = sTerm(y, 5); //取得春分日期
    var dayTerm2 = new Date(Date.UTC(y, 2, term2, 0, 0, 0, 0)); //取得春分的公历日期控件(春分一定出现在3月)
    var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

    if (lDayTerm2.day < 15) //取得下个月圆的相差天数
        var lMlen = 15 - lDayTerm2.day;
    else
        var lMlen = (lDayTerm2.isLeap ? leapDays(y) : monthDays(y, lDayTerm2.month)) - lDayTerm2.day + 15;

    //一天等于 1000*60*60*24 = 86400000 毫秒
    var l15 = new Date(dayTerm2.getTime() + 86400000 * lMlen); //求出第一次月圆为公历几日
    var dayEaster = new Date(l15.getTime() + 86400000 * (7 - l15.getUTCDay())); //求出下个周日

    this.m = dayEaster.getUTCMonth();
    this.d = dayEaster.getUTCDate();

}

//====================== 中文日期
function cDay(d) {
    var s;

    switch (d) {
        case 10:
            s = '初十';
            break;
        case 20:
            s = '二十';
            break;
            break;
        case 30:
            s = '三十';
            break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}

//--common.js
/*======================一些公共的方法========================*/
$.dom = function(elementId) {
    return document.getElementById(elementId);
};

//设置stringBuffer
function StringBuffer() {
    this._strings = new Array();
};

StringBuffer.prototype.append = function(str) {
    this._strings.push(str);
    return this;
};

StringBuffer.prototype.toString = function() {
    var str = arguments.length == 0 ? '' : arguments[0];
    return this._strings.join(str);
};

String.prototype.leftpad = function(len, str) {
    if (!str) {
        str = '0';
    }

    var s = '';
    for (var i = 0; i < len - this.length; i++) {
        s += str;
    }
    return s + this;
};

String.prototype.htmlspecialchars = function() {
    //return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&acute;").replace(/&/g, "&amp;");
    return this;
}

function getMonthKey(year, month) { // 传入的month为0-11的数值
    return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
}

function getDateKey(date) {
    return date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString().leftpad(2) + "-" + date.getDate().toString().leftpad(2) // 返回yyyy-MM-dd格式的字符串
}

function is_leap_year(cur_year) {
    if (cur_year % 400 == 0 || (cur_year % 100 != 0 && cur_year % 4 == 0)) return 1;
    return 0;
}

function getDaysByMonth(date) {
    var days = [
        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    ];
    return days[is_leap_year(date.getFullYear())][date.getMonth()];
}

function dateDiff(now, date) {
    var diff = dateDiffDays(now, date);
    if (diff == 0) return "今天";
    else if (diff < 0) return (0 - diff) + "天前";
    else return diff + "天后";
}

function dateDiffDays(now, date) {
    var n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var diff = parseInt((d - n) / (24 * 60 * 60 * 1000));
    return diff;
}


/*==============cacheMgr,在cal365中用到===============*/
var cacheMgr = {
    cldCache: {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
    getCld: function(year, month) {
        var key = getMonthKey(year, month);
        var cld = this.cldCache[key];
        if (typeof cld == 'undefined') {
            cld = new calendar(year, month);
            this.cldCache[key] = cld;
        }
        return cld;
    }
};

//======================makeCal.js start===================================
var HuangLi = {};
var calData = new Array();
var currentDate = new Date();
var rows;
var showingToday = true; //显示的是今天
var taskHover_inblock = false;
var taskHover_inhover = false;
var madeRiliDate = new Date();
var record = {
    elem_id: "",
    nav_date: new Date()
};
var timeSelf = 0; //本地时间
var timeBeijing; //北京时间
function clock(time) {
    timeSelf = (new Date()).getTime();
    timeBeijing = time * 1000;
}
var calander = {
    //initialization the calender
    init: function() {
        makeCal.pareData(new Date());
        makeCal.showCal(new Date());
        //init初始化的功能只需要初始化一次
        makeCal.initAction();
        makeCal.makeHuangli(currentDate);
    },
    //make the calender of `date`
    pareData: function(date) {
        date = makeCal.setTimeZero(date);
        madeRiliDate = new Date(date);
        //the first of this month
        var monthFirstD = makeCal.getMonthFirst(date);
        //the first in the table
        var tableFirstD = makeCal.getWeekFirst(monthFirstD);
        //the first of next month
        var nextMonthFirstD = makeCal.addTime(monthFirstD, 1, "month");
        //last day of this month
        var monthLastD = makeCal.addTime(nextMonthFirstD, -1, "day");
        //get the rows
        rows = 6;
        //loop to calculate the data
        var indexDay = new Date(tableFirstD);
        var nowDay = makeCal.setTimeZero(new Date());

        makeCal.fillCalData(indexDay, monthFirstD, monthLastD, nowDay);
    },

    fillCalData: function(indexDay, monthFirstD, monthLastD, nowDay) {
        calData = [];
        for (var i = 0; i < rows; i++) {
            var week = [];
            for (var j = 0; j < 7; j++) {
                var aDay = makeCal.createDay();
                //set year month date
                aDay.year = indexDay.getFullYear();
                aDay.month = indexDay.getMonth();
                aDay.date = indexDay.getDate();
                //set mode
                if (indexDay.getTime() < monthFirstD.getTime()) {
                    aDay.before = true;
                } else if (indexDay.getTime() > monthLastD.getTime()) {
                    aDay.after = true;
                }
                if (indexDay.getTime() == nowDay.getTime()) {
                    aDay.today = true;
                }
                if (j == 5 || j == 6) {
                    aDay.weekend = true;
                }
                aDay.rows = rows;
                aDay.inrow = i + 1;
                aDay.value = indexDay;
                aDay.china = templates.lunar_Info(aDay.value);
                //临时调整节气
                var date_detail = aDay.value.getFullYear() + "-" + (aDay.value.getMonth() + 1) + "-" + aDay.value.getDate();
                switch (date_detail) {
                    case '2011-11-22':
                        aDay.china.l_day = '廿七';
                        aDay.china.color = "";
                        break;
                    case '2011-11-23':
                        aDay.china.l_day = '小雪';
                        aDay.china.color = "#bc5016";
                        break;
                    case '2012-1-1':
                        aDay.china.l_day = '元旦';
                        aDay.china.color = "#bc5016";
                        break;
                    case '2012-1-20':
                        aDay.china.l_day = '廿七';
                        aDay.china.color = "";
                        break;
                    case '2012-1-21':
                        aDay.china.l_day = '大寒';
                        aDay.china.color = "#bc5016";
                        break;
                }
                week.push(aDay);
                indexDay = makeCal.addTime(indexDay, 1, "day");
            }
            calData.push(week);
        }
    },

    prepareData4Festival: function(year, date) {
        date = makeCal.setTimeZero(date);
        madeRiliDate = new Date(date);

        var first = date,
            last = date;
        //取包含date的， 调休放假安排连续区的第一天
        while (true) {
            var work_T = worktime["y" + first.getFullYear()]
            var datestr = getMonthDateStr(first);
            if (work_T["d" + datestr]) {
                first = makeCal.addTime(first, -1, "day");
            } else {
                first = makeCal.addTime(first, 1, "day");
                break;
            }
        }
        //取包含date的， 调休放假安排连续区的最后一天
        while (true) {
            var work_T = worktime["y" + last.getFullYear()]
            var datestr = getMonthDateStr(last);
            if (work_T["d" + datestr]) {
                last = makeCal.addTime(last, 1, "day");
            } else {
                last = makeCal.addTime(last, -1, "day");
                break;
            }
        }



        //the first of this month
        var monthFirstD = first;

        //the first in the table
        var tableFirstD = makeCal.getWeekFirst(monthFirstD);

        //last day of this month
        var monthLastD = last;
        //get the rows
        rows = 6;
        //loop to calculate the data
        var indexDay = new Date(tableFirstD);

        var nowDay = makeCal.setTimeZero(new Date());

        makeCal.fillCalData(indexDay, monthFirstD, monthLastD, nowDay);

        //return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    },

    showCal: function(selectDate) {
        if (typeof(selectDate) == "undefined") {
            selectDate = date = makeCal.setTimeZero(new Date());
        }
        selectDate = makeCal.setTimeZero(selectDate);
        //显示下载手机版的按钮
        if (downAppSwitch) {
            var today = new Date();
            if (today.getFullYear() == selectDate.getFullYear() && today.getMonth() == selectDate.getMonth()) {
                $("#today_button").html("<a href='" + downAppLink + "' target='_blank' style='color:#493413;display:block;'>手机版</a>");
                $("#today_button").css("width", "50px");
                $("#today_button").addClass("download_app_btn");
            } else {
                $("#today_button").html("今天")
                $("#today_button").css("width", "40px");
                $("#today_button").removeClass("download_app_btn");
            }
        }


        $('#year_time').text(selectDate.getFullYear() + "年" + (selectDate.getMonth() + 1) + "月");
        var table = "<table id='caltable'> \
                        <thead class='tablehead'> \
                            <tr> \
                                <td class='thead" + rows + "'>一</td> \
                                <td class='thead" + rows + "'>二</td> \
                                <td class='thead" + rows + "'>三</td> \
                                <td class='thead" + rows + "'>四</td> \
                                <td class='thead" + rows + "'>五</td> \
                                <td class='thead" + rows + "' style='color:#bc5016;'>六</td> \
                                <td class='thead" + rows + "' style='color:#bc5016;'>日</td> \
                            </tr> \
                        </thead> \
                        <tbody>";
        var tdclass = "";
        for (var i = 0; i < rows; i++) {
            var aWeek = "<tr>";
            for (var j = 0; j < 7; j++) {
                var tdclass = "";
                if (calData[i][j].before == true) {
                    tdclass = 'before';
                } else if (calData[i][j].after == true) {
                    tdclass = 'after';
                }
                var datestr = getMonthDateStr(calData[i][j].value);
                var workT = "";
                try {
                    //获取工作/放假
                    var work_T = worktime["y" + calData[i][j].year];
                    if (work_T) {
                        workT = work_T["d" + datestr];
                    }
                } catch (e) {}
                var workType = "";
                if (workT) {
                    if (workT.w == "上班") {
                        tdclass = "workBlock";
                        workType = "work";
                    } else {
                        tdclass = "restBlock";
                        workType = "rest";
                    }
                }
                if (calData[i][j].today == true) {
                    tdclass = 'today today' + calData[i][j].rows;
                }
                var numtype = "number";
                if (calData[i][j].weekend == true) {
                    numtype = "weekendNum";
                }
                if (calData[i][j].before) {
                    numtype = "before number";
                } else if (calData[i][j].after) {
                    numtype = "after number";
                }
                var isClickBlock = "";
                if (calData[i][j].today == false && calData[i][j].value.getTime() == selectDate.getTime()) {
                    isClickBlock = " clickBlock" + calData[i][j].rows;
                }
                var aDay = "<td i=" + i + " j=" + j + " class='block block" + calData[i][j].rows + " " + tdclass + isClickBlock + "'>";
                aDay += "<div class='block_content block_content" + calData[i][j].rows + "'>";
                if (workType == "work") {
                    aDay += "<div class='workrest work'>班</div>";
                } else if (workType == "rest") {
                    aDay += "<div class='workrest rest'>休</div>";
                }
                if (calData[i][j].today == false) {
                    aDay += "   <div class='" + numtype + " number" + calData[i][j].rows + "'>" + calData[i][j].date + "</div>\
                                <div class='chinaday chinaday" + calData[i][j].rows + " festival' style='color: " + calData[i][j].china.color + "'>" + (calData[i][j].china.l_day).substring(0, 4) + "</div>";
                } else {
                    aDay += "   <div class='" + numtype + " number" + calData[i][j].rows + "'>" + calData[i][j].date + "</div>\
                                <div class='chinaday chinaday" + calData[i][j].rows + " festival' style='color: white;'>" + calData[i][j].china.l_day + "</div>";
                }

                if (calData[i][j].hasWork) {
                    aDay += "<img class='workDot workDot" + calData[i][j].rows + "' src='http://static.365rili.com/wannianlibaidu/BD_images/dot.png'/>"
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

        makeCal.makeAction();
    },

    //init初始化的功能只需要初始化一次
    initAction: function() {
        $('#next_button').bind('click', function(e) {
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            var real_show_month = madeRiliDate.getMonth();
            month = real_show_month;
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
            var currentMonth = real_show_month;
            currentDate = makeCal.addTime(currentDate, 1, "month");
            if (currentDate.getMonth() != (currentMonth + 1) % 12) {
                currentDate.setDate(1);
                currentDate.setMonth(currentMonth + 1);
            }
            $('#year_time').text(year + "年" + (month + 1) + "月");
            $('#festival_rest').text("");
            makeCal.nextMonth(currentDate);
        });
        $('#prev_button').bind('click', function(e) {
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            var real_show_month = madeRiliDate.getMonth();
            month = real_show_month;
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            var currentMonth = real_show_month;
            currentDate = makeCal.addTime(currentDate, -1, "month");
            if (currentDate.getMonth() != (currentMonth + 11) % 12) {
                currentDate.setDate(1);
                currentDate.setMonth((currentMonth + 11) % 12);
            }
            $('#year_time').text(year + "年" + (month + 1) + "月");
            $('#festival_rest').text("");
            makeCal.prevMonth(currentDate);
        });
        $('#today_button').bind('click', function(e) {
            if ($(this).hasClass("download_app_btn")) {
                return;
            }
            makeCal.showToday();
            $('#festival_rest').text("");
        });
        $('#single_today_button').bind('click', function(e) {
            makeCal.showToday();
            $('#festival_rest').text("");
        });
        $('#top_bar_time').text(makeCal.get365riliTime());
        $("#festival_back_button").bind("click", function() {
            showContainers("cal_container");
        });
        $("#festival").bind("click", function() {
            showContainers("festival_container");
            $('#jieri_button').click();
        });
        $('#jieri_button').bind("click", function() {
            $("#mainJieri").show();
            $("#mainNongli").hide();
            if ($('#jieri_button').hasClass("active_tab_button") == false) {
                $('#jieri_button').addClass("active_tab_button");
            }
            $('#nongli_button').removeClass("active_tab_button");
        });
        $('#nongli_button').bind("click", function() {
            $("#mainNongli").show();
            $("#mainJieri").hide();
            if ($('#nongli_button').hasClass("active_tab_button") == false) {
                $('#nongli_button').addClass("active_tab_button");
            }
            $('#jieri_button').removeClass("active_tab_button");
        });
        $("#singleArrowLeftTd").bind("click", function() {
            currentDate = makeCal.addTime(currentDate, -1, "day");
            makeCal.pareData(currentDate);
            makeCal.showCal(currentDate);
            makeCal.makeHuangli(currentDate);
        });
        $("#singleArrowRightTd").bind("click", function() {
            currentDate = makeCal.addTime(currentDate, 1, "day");
            makeCal.pareData(currentDate);
            makeCal.showCal(currentDate);
            makeCal.makeHuangli(currentDate);
        });
        $('#jieqiDiv').bind("click", function(e) {
            getJieQiData(function() {
                name = $("#jieqiStr").text().substring(7);
                $("#jieqi_back_button").attr({
                    "from": "single_container"
                });
                for (var i = 0; i < 24; i++) {
                    if (name == jieqiData[i].name) {
                        var id = i;
                        $("#jieqiName").text(jieqiData[id].name);
                        $("#jieqiTime").text(jieqiData[id].time);
                        $("#jieqiDescribe").html(jieqiData[id].des.replace(/(^|<br\/>)/g, '$1　　'));
                        break;
                    }
                }
                showContainers("jieqi_container");
            });
        });
        $("#jieqi_back_button").bind("click", function() {
            var from = $("#jieqi_back_button").attr("from");
            showContainers(from);
        });
        $('.smallJieqiTd').bind("click", function(e) {
            getJieQiData(function() {
                ele = $(e.target);
                id = ele.attr("id");
                $("#jieqi_back_button").attr({
                    "from": "festival_container"
                });
                $("#jieqiName").text(jieqiData[id].name);
                $("#jieqiTime").text(jieqiData[id].time);
                $("#jieqiDescribe").html(jieqiData[id].des.replace(/(^|<br\/>)/g, '$1　　'));
                showContainers("jieqi_container");
            });
        });
        $('.jieriTd').bind('click', function(e) {
            if ($(this).attr("id") == "downApp_container")
                return;
            ele = $(this);
            jieri = ele.attr("jieri");
            settoFestival(jieri);
            var festival_rest_text;
            if (jieri == "qingming")
                festival_rest_text = fangjiaData["qingmingjie"];
            else
                festival_rest_text = fangjiaData[jieri];
            $('#festival_rest').text(festival_rest_text);
            showContainers("cal_container");
        });
        setInterval(function() {
            var time = makeCal.get365riliTime();
            $('#top_bar_time').text(makeCal.get365riliTime());
            if (time == '00:00:00' && showingToday) {
                var d = new Date();
                makeCal.pareData(d);
                makeCal.showCal(d);
                makeCal.makeHuangli(d);
                $('#year_num').text(d.getFullYear());
                $('#month_num').text(d.getMonth() + 1);
            }
        }, 1000);
    },
    //make初始化的功能每次重绘table后就要初始化一次
    makeAction: function() {
        $('.block').bind('click', function(e) {
            var real_show_month = madeRiliDate.getMonth();
            ele = $(this);
            makeCal.makeHuangli(calData[ele.attr('i')][ele.attr('j')].value);
            showContainers("single_container");
            $('#festival_rest').text("");
        });
        $("#single_back_button").bind('click', function() {
            showContainers("cal_container");
        });
    },
    //生成黄历div
    makeHuangli: function(date) {
        currentDate = date;
        date = makeCal.setTimeZero(date);
        var datestr = date.getDate();
        lunar = templates.lunar_Info_detail(date, showYJ);
        $('#singleNumTd').text(datestr);
        var gregorianDayStr = date.getFullYear() + "年" + (date.getMonth() + 1) + "月 ";

        switch (date.getDay()) {
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
        gregorianDayStr += " ";
        $('#singleDateStr').text(gregorianDayStr);
        var jieqi = templates.lunar_Info(date).solarTerm;
        $('#festivalStr').text(templates.lunar_Info(date).festival);
        if (jieqi != "") {
            $("#jieqiDiv").show();
            $("#jieqiStr").text("24节气 - " + jieqi);
        } else {
            $("#jieqiDiv").hide();
        }
        $('#popDateStr').text(getFullDateStr(date));
        $('#popChineseStr').text((lunar.lunar).substring(2));
        var nowDate = makeCal.setTimeZero(new Date());
        var nowMiliSecond = nowDate.getTime();
        var targetMiliSecond = date.getTime();
        var passedTime = Math.ceil((targetMiliSecond - nowMiliSecond) / 86400000);
        var dayafterorbeforeStr = "";
        if (nowDate.getDate() == date.getDate()) {
            dayafterorbeforeStr = '今天';
        }
        if (passedTime < 0) {
            dayafterorbeforeStr = (0 - passedTime) + "天前";
        } else if (passedTime > 0) {
            dayafterorbeforeStr = passedTime + "天后";
        }
        $('#dayafterorbefore').text(dayafterorbeforeStr);
        $('#chinaDay').text((lunar.lunar).substring(2));

        /*kun:过了春节就算龙年
        if(date.getFullYear()==2012 && (date.getMonth()==0 || (date.getMonth()==1 && date.getDate()<4))){
            lunar.y_Info=lunar.y_Info.replace("龙","兔");
        }
        */
        //2012 1.23日春节前显示为兔年
        if (date.getFullYear() == 2012 && (date.getMonth() == 0 && date.getDate() < 23)) {
            lunar.y_Info = lunar.y_Info.replace("龙", "兔");
        }
        //2013 1 1~2013 2 3显示为龙年，同时改天干地支
        if (date.getFullYear() == 2013 && (date.getMonth() == 0 || (date.getMonth() == 1 && date.getDate() < 4))) {
            lunar.y_Info = lunar.y_Info.replace("蛇", "龙");
            lunar.y_Info = lunar.y_Info.replace("癸巳", "壬辰");
        }
        info = lunar.y_Info;
        var yInfo = info.split(" ");
        $('#nongliStr1').text(yInfo[0]);
        $('#nongliStr2').text(yInfo[1]);

        /*
         *由于黄历“宜”，“忌”数据加载有延迟，将其封装作为获取宜忌数据的回调方法       
         */
        function showYJ(lunar) {
            Y = lunar.huangliY;
            Ys = Y.split('.');
            $('#YStr').empty();
            for (var key in Ys) {
                $('#YStr').append(Ys[key] + " ");
            }
            J = lunar.huangliJ;
            Js = J.split('.');
            $('#JStr').empty();
            for (var key in Js) {
                $('#JStr').append(Js[key] + " ");
            }
        }
        //add by wuzhq
        //calendarHandler.setSelectedDate(date);
    },
    //get the first date in the week where `date` in
    getWeekFirst: function(date) {
        var day = date.getDay();
        if (day == 0) {
            day = 7;
        }
        return makeCal.addTime(date, 0 - day + 1, "day");
    },
    //get the first date in the month where `date` in
    getMonthFirst: function(date) {
        ndate = new Date(date);
        ndate.setDate(1);
        return ndate;
    },
    //add `inc` time which `mode` said on `date`
    addTime: function(date, inc, mode) {
        ndate = new Date(date);
        switch (mode) {
            case "day":
                ndate.setDate(date.getDate() + inc);
                break;
            case "week":
                ndate.setDate(date.getDate() + 7 * inc);
                break;
            case "month":
                ndate.setMonth(date.getMonth() + inc);
                break;
            case "year":
                ndate.setYear(date.getFullYear() + inc);
                break;
            case "hour":
                ndate.setHours(date.getHours() + inc);
                break;
            case "minute":
                ndate.setMinutes(date.getMinutes() + inc);
                break;
            default:
                return ndate;
        }
        return ndate;
    },
    //set the time of date zero
    setTimeZero: function(date) {
        ndate = new Date(date);
        ndate.setHours(0);
        ndate.setMinutes(0);
        ndate.setSeconds(0);
        ndate.setMilliseconds(0);
        return ndate;
    },
    //the day object
    createDay: function() {
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
    nextMonth: function(clickDate) {
        makeCal.pareData(clickDate);
        makeCal.showCal(clickDate);
        showingToday = false;
        makeCal.makeHuangli(clickDate);
    },
    //上一个月
    prevMonth: function(clickDate) {
        makeCal.pareData(clickDate);
        makeCal.showCal(clickDate);
        showingToday = false;
        makeCal.makeHuangli(clickDate);
    },
    //显示今天
    showToday: function() {
        currentDate = new Date();
        makeCal.pareData(currentDate);
        makeCal.showCal(new Date());
        $('#year_time').text(currentDate.getFullYear() + "年" + (currentDate.getMonth() + 1) + "月");
        showingToday = true;
        $('#festival_rest').text("");
        makeCal.makeHuangli(currentDate);
    },
    bind_funcbutton: function(button, block, selecter) {
        $('#' + button).bind('click',
            function(e) {
                $('#' + selecter).css({
                    'top': $('#' + button).offset().top + 30 + 'px'
                });
                $('#' + selecter).css({
                    'left': $('#' + button).position().left - 39 + 'px'
                });
                $('#' + selecter).css({
                    'display': 'block'
                });
                if (button == 'year_func') {
                    var yearNum = $('#year_num').text();
                    var offset = $('#yearitem' + yearNum).position().top;
                    $('#' + selecter).scrollTop(offset);
                }
            }
        );
    },
    get365riliTime: function() {
        var time = (function() {
            if (timeBeijing != null) {
                var now = new Date();
                var diff = now.getTime() - timeSelf;
                now.setTime(timeBeijing + diff);
                return now;
            } else {
                return new Date();
            }
        })();
        hour = time.getHours();
        minute = time.getMinutes();
        second = time.getSeconds();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return hour + ":" + minute + ":" + second;
    }
};

function StringBuffer() {
    this._strings = new Array();
};
StringBuffer.prototype.append = function(str) {
    this._strings.push(str);
    return this;
};
StringBuffer.prototype.toString = function() {
    var str = arguments.length == 0 ? '' : arguments[0];
    return this._strings.join(str);
};
var templates = {
    month_day: function(date) {
        var d = date || new Date();
        return d.getDate();
    },
    lunar_Info: function(date) {
        var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
        var day = date.getDate();
        var cld_day = cld[day - 1];
        var lunar_detail = {
            l_day: "",
            l_month: "",
            l_day_full: "",
            solarTerm: "",
            festival: ""
        };
        lunar_detail.l_day = cDay(cld_day.lDay);
        lunar_detail.l_month = cld_day.lMonth;
        lunar_detail.color = "";
        var fest, s2;

        // 廿四节气
        lunar_detail.solarTerm = cld_day.solarTerms;
        if (lunar_detail.solarTerm == 'undefined') {
            lunar_detail.solarTerm = "";
        }
        //节气例外
        var key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        if (typeof SolarTermException[key] != 'undefined') {
            lunar_detail.solarTerm = SolarTermException[key];
        }
        //各种节日
        fest = cld_day.lunarFestival;
        // 公历节日
        s2 = cld_day.solarFestival;
        if (fest.length > 0) {
            fest = fest + " " + s2;
        } else {
            fest = s2;
        }
        if (lunar_detail.solarTerm.length > 0) {
            lunar_detail.l_day = lunar_detail.solarTerm;
        }
        if (fest.length > 0) {
            lunar_detail.festival = fest;
            lunar_detail.l_day = fest;
            lunar_detail.color = "#bc5016";
        }
        return lunar_detail;
    },
    lunar_Info_detail: function(date, callback) {
        var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
        var year = date.getFullYear();
        var day = date.getDate();
        var cld_day = cld[day - 1];
        var festival = [];
        var info = {
            lunar: "",
            y_Info: "",
            huangliY: "无",
            huangliJ: "无"
        };
        info.lunar = '农历' + (cld_day.isLeap ? '闰 ' : '') + templates.getChinaNum(cld_day.lMonth) + "月" + cDay(cld_day.lDay);
        info.y_Info = cld_day.cYear + '年' + this.lunar_year(date) + " " + cld_day.cMonth + '月' + cld_day.cDay + '日';
        try {
            if (year >= 2008 && year <= 2020) // 杨
            {
                var huangliYearMonth = year + "" + (cld_day.sMonth < 10 ? ('0' + cld_day.sMonth) : cld_day.sMonth);

                if (eval("HuangLi.y" + huangliYearMonth) == null) {
                    var filename = "http://baidu365.duapp.com/wannianlibaidu/js/huangli/month/" + huangliYearMonth + ".js";
                    $.getScript(filename, function() {
                        var hl = eval('HuangLi.y' + huangliYearMonth + '.d' + (cld_day.sMonth < 10 ? ('0' + cld_day.sMonth) : cld_day.sMonth) + (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));

                        info.huangliY = hl.y;
                        info.huangliJ = hl.j;

                        //kun:处理y有数据，而j显示“诸事不宜”的情况，改为“余事勿取"
                        if (hl.y.length > 8 && hl.j.indexOf('诸事不宜') >= 0) {
                            info.huangliJ = '余事勿取';
                        }

                        if (callback) {
                            callback(info);
                        }
                    });
                } else {
                    var hl = eval('HuangLi.y' + huangliYearMonth + '.d' + (cld_day.sMonth < 10 ? ('0' + cld_day.sMonth) : cld_day.sMonth) + (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));
                    info.huangliY = hl.y;
                    info.huangliJ = hl.j;
                    //kun:处理y有数据，而j显示“诸事不宜”的情况，改为“余事勿取"
                    if (hl.y.length > 8 && hl.j.indexOf('诸事不宜') >= 0) {
                        info.huangliJ = '余事勿取';
                    }
                    if (callback) {
                        callback(info);
                    }
                }
            } else {
                if (callback) {
                    callback(info);
                }
            }
        } catch (e) {}
        return info;
    },
    lunar_year: function(date) {

        var l_year = '【' + Animals[(date.getFullYear() - 4) % 12] + '年】';
        return l_year;
    },
    getChinaNum: function(Num) {
        var monthEn;
        switch (Num) {
            case 1:
                monthEn = "一";
                break;
            case 2:
                monthEn = "二";
                break;
            case 3:
                monthEn = "三";
                break;
            case 4:
                monthEn = "四";
                break;
            case 5:
                monthEn = "五";
                break;
            case 6:
                monthEn = "六";
                break;
            case 7:
                monthEn = "七";
                break;
            case 8:
                monthEn = "八";
                break;
            case 9:
                monthEn = "九";
                break;
            case 10:
                monthEn = "十";
                break;
            case 11:
                monthEn = "十一";
                break;
            case 12:
                monthEn = "腊";
                break;
        }
        return monthEn;
    },
    init_sel_festival: function() {
        var festival_m = festival_main;
        if (festival_main) {
            var str = new StringBuffer();
            str.append('<div id="festival_sel_body">');
            for (var i in festival_main) {
                str.append('<div date="' + i).append('">').append(festival_main[i] + '</div>');
            }
            str.append('</div>');
        }
        $("#festival_sel_div").html(str.toString());
        $("#festival_sel_body>div").each(function() {
            $(this).click(function() {
                var y = $(this).attr("date").split("_");

                record.nav_date.setFullYear(y[0]);
                record.nav_date.setMonth(Number(y[1]) - 1);
                generic_cal(record.nav_date, record.elem_id);
                $("#festival_sel_div").hide();
            });
            $(this).hover(function() {
                    $(this).addClass("year_bg");
                },
                function() {
                    $(this).removeClass("year_bg");
                });
        });
    },
    init_sel_year: function() {
        var str = new StringBuffer();
        str.append('<div id="sel_body">');
        for (var i = 1900; i < 2050; i++) {
            str.append('<div>').append(i).append('</div>');
        }
        str.append('</div>');
        // 设置日期选择的初始位置
        var scroll_top = record.nav_date.getFullYear() - 1900;
        $("#open_sel_div").html(str.toString());
        $("#sel_body>div").each(function() {
            $(this).click(function() {
                var y = $(this).html();
                record.nav_date.setFullYear(y);
                generic_cal(record.nav_date, record.elem_id);
                $("#open_sel_div").hide();
            });
            $(this).hover(function() {
                    $(this).addClass("year_bg");
                },
                function() {
                    $(this).removeClass("year_bg");
                });
        });
    },
    mousedown_hide_ele: function(id) {
        $(document).bind("mousedown." + id, function(r) {
            var p = r.target;
            var q = document.getElementById(id);
            while (true) {
                if (p == q) {
                    return true
                } else {
                    if (p == document) {
                        $(document).unbind("mousedown." + id);
                        $("#" + id).hide();
                        return false
                    } else {
                        p = $(p).parent()[0]
                    }
                }
            }
        });
    }
};

function getMonthKey(year, month) { // 传入的month为0-11的数值
    return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
}
String.prototype.leftpad = function(len, str) {
    if (!str) {
        str = '0';
    }
    var s = '';
    for (var i = 0; i < len - this.length; i++) {
        s += str;
    }
    return s + this;
};
window.makeCal = calander;

function getMonthDateStr(date) {
    month = date.getMonth() + 1;
    day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return month + "" + day;
}

function getFullDateStr(date) {
    month = date.getMonth() + 1;
    day = date.getDate();
    year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

//节气例外调整
var SolarTermException = {
    "2012-5-20": "小满",
    "2012-5-21": "",
    "2012-12-6": "",
    "2012-12-7": "大雪",
    "2013-2-3": "",
    "2013-2-4": "立春",
    "2013-7-22": "大暑",
    "2013-7-23": "",
    "2013-12-21": "",
    "2013-12-22": "冬至",
    "2014-3-5": "",
    "2014-3-6": "惊蛰",
    "2015-1-5": "",
    "2015-1-6": "小寒",
    "2016-6-6": "",
    "2016-6-7": "大雪",
    "2017-7-22": "大暑",
    "2017-7-23": "",
    "2017-12-21": "",
    "2017-12-22": "冬至",
    "2018-2-18": "",
    "2018-2-19": "雨水",
    "2018-3-20": "",
    "2018-3-21": "春分",
    "2019-2-4": "立春",
    "2019-2-5": "",
    "2019-6-21": "夏至",
    "2019-6-22": "",
    "2020-7-6": "小暑",
    "2020-7-7": "",
    "2020-8-22": "处暑",
    "2020-8-23": "",
    "2020-12-6": "",
    "2020-12-7": "大雪"
}

function getYearWeek(date) {
    var date2 = new Date(date.getFullYear(), 0, 1);
    var day1 = date.getDay();
    if (day1 == 0) day1 = 7;
    var day2 = date2.getDay();
    if (day2 == 0) day2 = 7;
    d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(d / 7) + 1;
}

//======================makeCal.js end===================================
//全局变量
var downAppSwitch = true;
var downAppLink = "http://www.365rili.com/bd/transfer/redirect_baiduwap.html";
if (false && downAppSwitch) {
    var now = new Date();
    var fromTime = new Date();
    var toTime = new Date();
    fromTime.setHours(7);
    fromTime.setMinutes(30);
    fromTime.setSeconds(0);
    toTime.setHours(21);
    toTime.setMinutes(30);
    toTime.setSeconds(0);
    if (now > fromTime && now < toTime)
        downAppSwitch = false;
}

function onReady() {
    $("#downApp_btn").html("<a href='" + downAppLink + "' style='color:#816526;' target='_blank'>手机版下载</a>");
    //calendarHandler.init();
    makeCal.init();
    //make calendar show in middel of baidu canvas
    gotoFestival();
    //当参数t=t时，为“今天几号”查询，此时不显示登录、添加按钮也不进行登录
}

window.onload = onReady;

function gotoFestival() {
    //get festival parameter
    var search = window.location.search.substring(1); //alert(search);
    var pairs = search.split('bd_param='); //alert(pairs.length);
    var value = '';
    if (pairs.length > 1) {
        value = pairs[1];
    }
    value = value.replace("festival%3D", "");
    switch (value) {
        case 'jieqi':
            showContainers("festival_container");
            $('#nongli_button').click();
            break;
        case 'fangjia':
            showContainers("festival_container");
            $('#jieri_button').click();
            break;
        case 'lichun':
        case 'yushui':
        case 'jingzhe':
        case 'chunfen':
        case 'qingming':
        case 'guyu':
        case 'lixia':
        case 'xiaoman':
        case 'mangzhong':
        case 'xiazhi':
        case 'xiaoshu':
        case 'dashu':
        case 'liqiu':
        case 'chushu':
        case 'bailu':
        case 'qiufen':
        case 'hanlu':
        case 'shuangjiang':
        case 'lidong':
        case 'xiaoxue':
        case 'daxue':
        case 'dongzhi':
        case 'xiaohan':
        case 'dahan':
            getJieQiData(function() {
                for (var i = 0; i < 24; i++) {
                    if (value == jieqiData[i].ename) {
                        var id = i;
                        $("#jieqiName").text(jieqiData[id].name);
                        $("#jieqiTime").text(jieqiData[id].time);
                        $("#jieqiDescribe").html(jieqiData[id].des.replace(/(^|<br\/>)/g, '$1　　'));
                        break;
                    }
                }
                showContainers("jieqi_container");
            });
            break;
        case 'rili_2013':
            currentDate.setFullYear(2013);
            currentDate.setMonth(0);
            currentDate.setDate(1);
            makeCal.pareData(currentDate);
            makeCal.showCal(currentDate);
            $('#year_time').text(currentDate.getFullYear() + "年" + (currentDate.getMonth() + 1) + "月");
            showingToday = true;
            makeCal.makeHuangli(currentDate);
            break;
        case 'rili_2014':
            currentDate.setFullYear(2014);
            currentDate.setMonth(0);
            currentDate.setDate(1);
            makeCal.pareData(currentDate);
            makeCal.showCal(currentDate);
            $('#year_time').text(currentDate.getFullYear() + "年" + (currentDate.getMonth() + 1) + "月");
            showingToday = true;
            makeCal.makeHuangli(currentDate);
            break;
        case 'rili_2012':
            currentDate.setFullYear(2012);
            currentDate.setMonth(0);
            currentDate.setDate(1);
            makeCal.pareData(currentDate);
            makeCal.showCal(currentDate);
            $('#year_time').text(currentDate.getFullYear() + "年" + (currentDate.getMonth() + 1) + "月");
            showingToday = true;
            makeCal.makeHuangli(currentDate);
        case 'yuandan':
        case 'chunjie':
        case 'qingmingjie':
        case 'laodong':
        case 'duanwu':
        case 'zhongqiu':
        case 'guoqing':
            $('#festival_rest').text(fangjiaData[value]);
            settoFestival(value);
            break;
        default:
            $('#festival_rest').text("");
            break;
    }
}
// function settoFestival(name) {
//     if (name == 'qingming') name = 'qingmingjie';
//     var data = festivalData[name].split('_');
//     var endData = festivalEndData[name].split('_');
//     var today=new Date();
//     var endDtae=new Date();

//     currentDate.setFullYear(parseInt(data[0], 10));
//     currentDate.setMonth(parseInt(data[1], 10) - 1, 1);
//     currentDate.setDate(parseInt(data[2], 10));

//     endDtae.setFullYear(parseInt(data[0], 10));
//     endDtae.setMonth(parseInt(data[1], 10) - 1, 1);
//     endDtae.setDate(parseInt(data[2], 10));

//     if(today>endDtae){
//         name=name+"_next";
//         var data = festivalData[name].split('_');
//         currentDate.setFullYear(parseInt(data[0], 10));
//     }

//     makeCal.prepareData4Festival((new Date()).getFullYear(), currentDate);
//     makeCal.showCal(currentDate);
//     makeCal.makeHuangli(currentDate);
// }
function settoFestival(name) {
    if (name == 'qingming') name = 'qingmingjie';
    var data = festivalData[name].split('_');
    currentDate.setFullYear(parseInt(data[0], 10));
    currentDate.setMonth(parseInt(data[1], 10) - 1, 1);
    currentDate.setDate(parseInt(data[2], 10));
    makeCal.prepareData4Festival((new Date()).getFullYear(), currentDate);
    makeCal.showCal(currentDate);
    makeCal.makeHuangli(currentDate);

}
