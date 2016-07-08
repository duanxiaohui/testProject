var JSON = function () {
    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        s = {
            'boolean': function (x) {
                return String(x);
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            string: function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            },
            object: function (x) {
                if (x) {
                    var a = [], b, f, i, l, v;
                    if (x instanceof Array) {
                        a[0] = '[';
                        l = x.length;
                        for (i = 0; i < l; i += 1) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a[a.length] = v;
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = ']';
                    } else if (x instanceof Object) {
                        a[0] = '{';
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a.push(s.string(i), ':', v);
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = '}';
                    } else {
                        return;
                    }
                    return a.join('');
                }
                return 'null';
            }
        };
    return {
        copyright: '(c)2005 JSON.org',
        license: 'http://www.crockford.com/JSON/license.html',
/*
    Stringify a JavaScript value, producing a JSON text.
*/
        stringify: function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == 'string') {
                    return v;
                }
            }
            return null;
        },
/*
    Parse a JSON text, producing a JavaScript value.
    It returns false if there is a syntax error.
*/
        parse: function (text) {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                        text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
                    eval('(' + text + ')');
            } catch (e) {
                return false;
            }
        }
    };
}();

//--calendarObj.js
﻿/*****************************************************************************
                                   日期资料
*****************************************************************************/

var lunarInfo=new Array(
0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
0x4ae0,0xa5b6,0xa4d0,0xd250,0xd295,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
0xd520);

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅','□');
var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
var cmonthName = new Array('正','二','三','四','五','六','七','八','九','十','十一','腊');

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
 for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
 return(sum+leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
 if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
 else return(0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
 var lm = lunarInfo[y-1900] & 0xf;
 return(lm==0xf?0:lm);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y,m) {
 return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}



//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

   for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

   if(offset<0) { offset+=temp; i--; }

   this.year = i;

   leap = leapMonth(i); //闰哪个月
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      //闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

      //解除闰月
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

      offset -= temp;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; }

   if(offset<0){ offset += temp; --i; }

   this.month = i;
   this.day = offset + 1;
}

function getSolarDate(lyear, lmonth, lday, isLeap) {
  var offset = 0;
  
  // increment year
  for(var i = 1900; i < lyear; i++) {
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

  var baseDate = new Date(1900,0,31);
  var solarDate = new Date(baseDate.valueOf() + offset * 86400000);
  return solarDate;
}


//==============================返回公历 y年某m+1月的天数
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}

//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}


//============================== 阴历属性
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

      this.isToday    = false;
      //瓣句
      this.sYear      = sYear;   //公元年4位数字
      this.sMonth     = sMonth;  //公元月数字
      this.sDay       = sDay;    //公元日数字
      this.week       = week;    //星期, 1个中文
      //农历
      this.lYear      = lYear;   //公元年4位数字
      this.lMonth     = lMonth;  //农历月数字
      this.lDay       = lDay;    //农历日数字
      this.isLeap     = isLeap;  //是否为农历闰月?
      //八字
      this.cYear      = cYear;   //年柱, 2个中文
      this.cMonth     = cMonth;  //月柱, 2个中文
      this.cDay       = cDay;    //日柱, 2个中文

      this.color      = '';

      this.lunarFestival = ''; //农历节日
      this.solarFestival = ''; //公历节日
      this.solarTerms    = ''; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
   return(offDate.getUTCDate());
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
function calendar(y,m) {

   var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
   var cY, cM, cD; //年柱,月柱,日柱
   var lDPOS = new Array(3);
   var n = 0;
   var firstLM = 0;

   sDObj = new Date(y,m,1,0,0,0,0);    //当月一日日期

   this.length    = solarDays(y,m);    //公历当月天数
   this.firstWeek = sDObj.getDay();    //公历当月1日星期几

   ////////年柱 1900年立春后为庚子年(60进制36)
   if(m<2) cY=cyclical(y-1900+36-1);
   else cY=cyclical(y-1900+36);
   var term2=sTerm(y,2); //立春日期

   ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
   var firstNode = sTerm(y,m*2) //返回当月「节」为几日开始
   cM = cyclical((y-1900)*12+m+12);

   //当月一日与 1900/1/1 相差天数
   //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
   var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;

   for(var i=0;i<this.length;i++) {

      if(lD>lX) {
         sDObj = new Date(y,m,i+1);    //当月一日日期
         lDObj = new Lunar(sDObj);     //农历
         lY    = lDObj.year;           //农历年
         lM    = lDObj.month;          //农历月
         lD    = lDObj.day;            //农历日
         lL    = lDObj.isLeap;         //农历是否闰月
         lX    = lL? leapDays(lY): monthDays(lY,lM); //农历当月最后一天

         if(n==0) firstLM = lM;
         lDPOS[n++] = i-lD+1;
      }

      //依节气调整二月分的年柱, 以立春为界
      if(m==1 && (i+1)==term2) cY=cyclical(y-1900+36);
      //依节气月柱, 以「节」为界
      if((i+1)==firstNode) cM = cyclical((y-1900)*12+m+13);
      //日柱
      cD = cyclical(dayCyclical+i);

      //sYear,sMonth,sDay,week,
      //lYear,lMonth,lDay,isLeap,
      //cYear,cMonth,cDay
      this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cY ,cM, cD );
   }

   //节气
   tmp1=sTerm(y,m*2  )-1;
   tmp2=sTerm(y,m*2+1)-1;
   this[tmp1].solarTerms = solarTerm[m*2];
   this[tmp2].solarTerms = solarTerm[m*2+1];
   //if(m==3) this[tmp1].color = 'red'; //清明颜色

   //公历节日
   for(i in sFtv)
      if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
            if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red';
         }

   //月周节日
   for(i in wFtv)
      if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            tmp1=Number(RegExp.$2);
            tmp2=Number(RegExp.$3);
            if(tmp1<5)
               this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
            else {
               tmp1 -= 5;
               tmp3 = (this.firstWeek+this.length-1)%7; //当月最后一天星期?
               this[this.length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) - 1 ].solarFestival += RegExp.$5 + ' ';
            }
         }

   //农历节日
   for(i in lFtv)
      if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
         tmp1=Number(RegExp.$1)-firstLM;
         if(tmp1==-11) tmp1=1;
         if(tmp1 >=0 && tmp1<n) {
            tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
            if( tmp2 >= 0 && tmp2<this.length && this[tmp2].isLeap!=true) {
               this[tmp2].lunarFestival += RegExp.$4 + ' ';
               if(RegExp.$3=='*') this[tmp2].color = 'red';
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
//	if((this.firstWeek+12)%7==5)
//      this[12].solarFestival += '黑色星期五';

   //今日
   //if(y==g_tY && m==g_tM) {this[g_tD-1].isToday = true;}

}




//======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
function easter(y) {

   var term2=sTerm(y,5); //取得春分日期
   var dayTerm2 = new Date(Date.UTC(y,2,term2,0,0,0,0)); //取得春分的公历日期控件(春分一定出现在3月)
   var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

   if(lDayTerm2.day<15) //取得下个月圆的相差天数
      var lMlen= 15-lDayTerm2.day;
   else
      var lMlen= (lDayTerm2.isLeap? leapDays(y): monthDays(y,lDayTerm2.month)) - lDayTerm2.day + 15;

   //一天等于 1000*60*60*24 = 86400000 毫秒
   var l15 = new Date(dayTerm2.getTime() + 86400000*lMlen ); //求出第一次月圆为公历几日
   var dayEaster = new Date(l15.getTime() + 86400000*( 7-l15.getUTCDay() ) ); //求出下个周日

   this.m = dayEaster.getUTCMonth();
   this.d = dayEaster.getUTCDate();

}

//====================== 中文日期
function cDay(d){
   var s;

   switch (d) {
      case 10:
         s = '初十'; break;
      case 20:
         s = '二十'; break;
         break;
      case 30:
         s = '三十'; break;
         break;
      default :
         s = nStr2[Math.floor(d/10)];
         s += nStr1[d%10];
   }
   return(s);
}


//--workTime.js
var worktime = {};
worktime.y2012 = JSON.parse('{    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0121": {        "w": "上班"    },    "d0122": {        "w": "放假"    },    "d0123": {        "w": "放假"    },    "d0124": {        "w": "放假"    },    "d0125": {        "w": "放假"    },    "d0126": {        "w": "放假"    },    "d0127": {        "w": "放假"    },    "d0128": {        "w": "放假"    },    "d0129": {        "w": "上班"    },    "d0331": {        "w": "上班"    },    "d0401": {        "w": "上班"    },    "d0402": {        "w": "放假"    },    "d0403": {        "w": "放假"    },    "d0404": {        "w": "放假"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0622": {        "w": "放假"    },    "d0623": {        "w": "放假"    },    "d0624": {        "w": "放假"    },    "d0929": {        "w": "上班"    },    "d0930": {        "w": "放假"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    }}');
worktime.y2013 = JSON.parse('{    "d0101": {        "w": "放假"    },    "d0102": {        "w": "放假"    },    "d0103": {        "w": "放假"    },    "d0105": {        "w": "上班"    },    "d0106": {        "w": "上班"    },    "d0209": {        "w": "放假"    },    "d0210": {        "w": "放假"    },    "d0211": {        "w": "放假"    },    "d0212": {        "w": "放假"    },    "d0213": {        "w": "放假"    },    "d0214": {        "w": "放假"    },    "d0215": {        "w": "放假"    },    "d0216": {        "w": "上班"    },    "d0217": {        "w": "上班"    },    "d0404": {        "w": "放假"    },    "d0405": {        "w": "放假"    },    "d0406": {        "w": "放假"    },    "d0407": {        "w": "上班"    },    "d0427": {        "w": "上班"    },    "d0428": {        "w": "上班"    },    "d0429": {        "w": "放假"    },    "d0430": {        "w": "放假"    },    "d0501": {        "w": "放假"    },    "d0608": {        "w": "上班"    },    "d0609": {        "w": "上班"    },    "d0610": {        "w": "放假"    },    "d0611": {        "w": "放假"    },    "d0612": {        "w": "放假"    },    "d0919": {        "w": "放假"    },    "d0920": {        "w": "放假"    },    "d0921": {        "w": "放假"    },    "d0922": {        "w": "上班"    },    "d0929": {        "w": "上班"    },    "d1001": {        "w": "放假"    },    "d1002": {        "w": "放假"    },    "d1003": {        "w": "放假"    },    "d1004": {        "w": "放假"    },    "d1005": {        "w": "放假"    },    "d1006": {        "w": "放假"    },    "d1007": {        "w": "放假"    },    "d1012": {        "w": "上班"    }}');
worktime.y2014 = {
		"d0101":{"w":"放假"},
		"d0126":{"w":"上班"},
		"d0131":{"w":"放假"},
		"d0201":{"w":"放假"},
		"d0202":{"w":"放假"},
		"d0203":{"w":"放假"},
		"d0204":{"w":"放假"},
		"d0205":{"w":"放假"},
		"d0206":{"w":"放假"},
		"d0208":{"w":"上班"},
		"d0405":{"w":"放假"},
		"d0406":{"w":"放假"},
		"d0407":{"w":"放假"},
		"d0501":{"w":"放假"},
		"d0502":{"w":"放假"},
		"d0503":{"w":"放假"},
		"d0504":{"w":"上班"},
		"d0531":{"w":"放假"},
		"d0601":{"w":"放假"},
		"d0602":{"w":"放假"},
		"d0906":{"w":"放假"},
		"d0907":{"w":"放假"},
		"d0908":{"w":"放假"},
		"d0928":{"w":"上班"},
		"d1001":{"w":"放假"},
		"d1002":{"w":"放假"},
		"d1003":{"w":"放假"},
		"d1004":{"w":"放假"},
		"d1005":{"w":"放假"},
		"d1006":{"w":"放假"},
		"d1007":{"w":"放假"},
		"d1011":{"w":"上班"}
	};
 worktime.y2015 = {
    "d0101": {"w": "放假"},
    "d0102": {"w": "放假"},
    "d0103": {"w": "放假"},
    "d0104": {"w": "上班"},
    "d0215": {"w": "上班"},
    "d0218": {"w": "放假"},
    "d0219": {"w": "放假"},
    "d0220": {"w": "放假"},
    "d0221": {"w": "放假"},
    "d0222": {"w": "放假"},
    "d0223": {"w": "放假"},
    "d0224": {"w": "放假"},
    "d0228": {"w": "上班"},
    "d0404": {"w": "放假"},
    "d0405": {"w": "放假"},
    "d0406": {"w": "放假"},
    "d0501": {"w": "放假"},
    "d0502": {"w": "放假"},
    "d0503": {"w": "放假"},
    "d0620": {"w": "放假"},
    "d0621": {"w": "放假"},
    "d0622": {"w": "放假"},
    "d0903": {"w": "放假"},
    "d0904": {"w": "放假"},
    "d0905": {"w": "放假"},
    "d0906": {"w": "上班"},
    "d0926": {"w": "放假"},
    "d0927": {"w": "放假"},
    "d1001": {"w": "放假"},
    "d1002": {"w": "放假"},
    "d1003": {"w": "放假"},
    "d1004": {"w": "放假"},
    "d1005": {"w": "放假"},
    "d1006": {"w": "放假"},
    "d1007": {"w": "放假"},
    "d1010": {"w": "上班"}
}
var festival_main = {
		"2014_01_01":"元旦",
		"2014_01_31":"春节" ,
		"2014_04_05":"清明节" ,
		"2014_05_01":"劳动节" ,
		"2014_06_02":"端午节",
		"2014_09_08":"中秋节",
		"2014_10_01":"国庆节"
		};
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

String.prototype.htmlspecialchars = function(){
	//return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&acute;").replace(/&/g, "&amp;");
	return this;
}

function getMonthKey(year, month) { // 传入的month为0-11的数值
    return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
}

function getDateKey(date) {
    return date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().leftpad(2)+"-"+date.getDate().toString().leftpad(2) // 返回yyyy-MM-dd格式的字符串
}
function is_leap_year(cur_year){
	 if(cur_year % 400 == 0 || (cur_year % 100 !=0 && cur_year % 4 == 0)) return 1;
	 return 0;
}

function getDaysByMonth(date){
	var days = [[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
	return days[is_leap_year(date.getFullYear())][date.getMonth()];
}

function dateDiff(now, date){
	var diff = dateDiffDays(now, date);
	if(diff == 0) return "今天";
	else if(diff < 0) return (0-diff) + "天前";
	else return diff + "天后";
}

function dateDiffDays(now, date){
	var n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var diff = parseInt((d - n)/(24 * 60 * 60 * 1000));
	return diff;
}
  
/*==========================utils.js========================*/
var utils = {
    getEvent : function(ev) {
        return window.event ? window.event : (ev ? ev : null);
    },
    getMousePosition : function(ev) {
        var evt = this.getEvent(ev);
        if (evt.pageX || evt.pageY) {
            return {
                x : evt.pageX,
                y : evt.pageY
            };
        }
        return {
            x : evt.clientX + document.documentElement.scrollLeft
            - document.documentElement.clientLeft,
            y : evt.clientY + document.documentElement.scrollTop
            - document.documentElement.clientTop
        };
    },
    getClientWidth : function() {
        return $.browser.msie ? ieBody.clientWidth : window.innerWidth;
    },
    getClientHeight : function() {
        return $.browser.msie ? ieBody.clientHeight : window.innerHeight;
    },
	getRandomColor : function() {
		/*
		 * 
		 * getRandomColor 从colors数组获取随机颜色
		 * 
		 * @return 对象,index:索引,value:颜色代码
		 * 
		 */
		var index = Math.round(Math.random() * (colors.length - 1));
		return {
			index : index,
			value : colors[index]
		};
	},
    /*
     * obj : DOM element
     */
    getOffsetXY : function(obj, parentId) {
        /*
         *
         * getOffsetXY 获取相对坐标
         *
         * @param obj id或者dom对象 @param parentId 父级id，如果不提供则为body
         *
         * @return 坐标对象，x、y
         *
         */
//        var element;
//        if (typeof obj == 'object') {
//            element = obj;
//        } else {
//            element = document.getElementById(obj);
//        }
//        var element_X = element.offsetLeft;
//        var element_Y = element.offsetTop;
//        while (true) {
//            if ((!element.offsetParent) || (!element.offsetParent.style)
//            || (!!parentId && element.offsetParent.id == parentId)) {
//                break;
//            }
//            element_X += element.offsetParent.offsetLeft;
//            element_Y += element.offsetParent.offsetTop;
//            element = element.offsetParent;
//        }
//        element_X = element_X - document.body.scrollLeft;
//        element_Y = element_Y - document.body.scrollTop;
//
//        return {
//            x : element_X,
//            y : element_Y
//        };
        var pos= {};
        if(parentId) {
            pos = $(obj).position();
            return {
                x : pos.left,
                y : pos.top
            };
        }
        pos = $(obj).offset();
        return {
            x : pos.left,
            y : pos.top
        };
    },
	hideDialog:function(id){
		for(var i=0;i<id.length;i++)
		{
			$("#"+id[i]).hide();
			$(document).unbind("mousedown."+id[i]);
		}
	},
    mousedown_hide_ele : function(id,parent_id,descard_id) {   // 实现鼠标点击其他地方，关闭对话框，

        $(document).bind("mousedown."+id, function(r) {
            var p = r.target;
            var q = document.getElementById(id);
            while (true) {
                if (p == q) {
                    return true;
                } else {
                    try {
                        if (p.id == parent_id) {     // 此处需要修改，有的情况下会出现脚本停止响应的现象(p == document)
                            $(document).unbind("mousedown."+id);
                            $("#"+id).hide();
                            return false;
                        } else {
							if(p.id==descard_id){
								return;
							}
                            p = $(p).parent()[0]
                        }
                    } catch(e) {
                        return false;
                    }
                }
            }
        });
    }
};
/*==============cacheMgr,在cal365中用到===============*/
var cacheMgr = {
    cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
    getCld : function(year, month) {
        var key = getMonthKey(year, month);
        var cld = this.cldCache[key];
        if (typeof cld == 'undefined') {
            cld = new calendar(year, month);
            this.cldCache[key] = cld;
        }
        return cld;
    }
};

/*==========================时间处理===========================*/
/*
 %e  Day of the month without leading zeros (01..31)
 %d  Day of the month, 2 digits with leading zeros (01..31)
 %j  Day of the year, 3 digits with leading zeros (001..366)
 %a  A textual representation of a day, two letters
 %W  A full textual representation of the day of the week

 %c  Numeric representation of a month, without leading zeros (0..12)
 %m  Numeric representation of a month, with leading zeros (00..12)
 %b  A short textual representation of a month, three letters (Jan..Dec)
 %M  A full textual representation of a month, such as January or March (January..December)

 %y  A two digit representation of a year (93..03)
 %Y  A full numeric representation of a year, 4 digits (1993..03)
 */
var cal365 = {};
cal365.date= {
    date_part: function(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },
    month_day : function(date) {
        var d = date || new Date();
        return d.getDate();
    },
    time_part: function(date) {
        return (date.valueOf()/1000 - date.getTimezoneOffset()*60)%86400;
    },
    week_start: function(date,start_on_monday) {
        var shift=date.getDay();
        if (start_on_monday) {
            if (shift==0)
                shift=6
            else
                shift--;
        }
        return this.date_part(this.add(date,-1*shift,"day"));
    },
    month_start: function(date) {
        date.setDate(1);
        return this.date_part(date);
    },
    month_view_start : function(date, start_on_monday) {
        return this.week_start(this.month_start(date), start_on_monday);
    },
    year_start: function(date) {
        date.setMonth(0);
        return this.month_start(date);
    },
    day_start: function(date) {
        return this.date_part(date);
    },
    add: function(date,inc,mode) {
        var ndate=new Date(date.valueOf());
        switch(mode) {
            case "day":
                ndate.setDate(ndate.getDate()+inc);
                break;
            case "week":
                ndate.setDate(ndate.getDate()+7*inc);
                break;
            case "month":
                ndate.setMonth(ndate.getMonth()+inc);
                break;
            case "year":
                ndate.setYear(ndate.getFullYear()+inc);
                break;
            case "hour":
                ndate.setHours(ndate.getHours()+inc);
                break;
            case "minute":
                ndate.setMinutes(ndate.getMinutes()+inc);
                break;
            default:
                return defaults.date["add_"+mode](date,inc,mode);
        }
        return ndate;
    },
    to_fixed: function(num) {
        if (num<10)
            return "0"+num;
        return num;
    },
    copy: function(date) {
        return new Date(date.valueOf());
    },
    getChinaNum : function(Num) {
        var monthEn;
        switch(Num) {
            case 1 :
                monthEn = "一";
                break;
            case 2 :
                monthEn = "二";
                break;
            case 3 :
                monthEn = "三";
                break;
            case 4 :
                monthEn = "四";
                break;
            case 5 :
                monthEn = "五";
                break;
            case 6 :
                monthEn = "六";
                break;
            case 7 :
                monthEn = "七";
                break;
            case 8 :
                monthEn = "八";
                break;
            case 9 :
                monthEn = "九";
                break;
            case 10 :
                monthEn = "十";
                break;
            case 11 :
                monthEn = "十一";
                break;
            case 12 :
                monthEn = "腊";
                break;
        }
        return monthEn;
    },
    getDayNameBrief: function(day_index) {
        var day_name = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        return day_name[day_index];
    },
    daynameToIndex: function(dayname) {
    	var dayname_index_map = {'SUN':0,'MON':1,'TUE':2,'WED':3,'THU':4,'FRI':5,'SAT':6};
    	return dayname_index_map[dayname];
    },
    /*
     * date_time所在日期为当月第几周
     */
    getWeekOfMonth: function(date_time, start_on_monday) {
        var date = this.copy(date_time);
        return Math.floor((this.date_part(date).getTime() - this.month_view_start(date, start_on_monday).getTime())/604800000) + 1;
    },
    lunar_year : function(date) {
        var l_year = date.getFullYear()+'年'+(date.getMonth()+1)+'月 '+cyclical(date.getFullYear() - 1900 + 36) + '年【'+ Animals[(date.getFullYear() - 4) % 12] + '年】';
        return l_year;
    },
    lunar_Info : function(date) {

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
        if(s.length>0) { // 农历节日
            if(s.length>6) {
                s2 = s.toString();
                s = s.substr(0, 4)+'...';
            }
            lunar_detail.color = "#32CD32";
        } else { // 廿四节气
            s=cld_day.solarTerms;
            s2=s.toString();
            if(s.length>0) {
                lunar_detail.color = "#32CD32";
                if((s =='清明')||(s =='芒种')||(s =='夏至')||(s =='冬至')) {
                    lunar_detail.color = "#32CD32";
                    if(s =='清明')
                        s = '清明节';
                }
            }
            /*else
             { // 公历节日
             s=cld_day.solarFestival;
             s2 = s.toString();
             if(s.length>0) {
             if(s.length>6)
             {

             s = s.substr(0, 4)+'..';
             }
             lunar_detail.color = "#46BAEC";
             }
             }*/
        }
		lunar_detail.l_day_y = cDay(cld_day.lDay);
        if(s.length>0) {
            lunar_detail.l_day = s;
            lunar_detail.l_day_full = s2;
			
        }
        //var info = templates.getChinaNum(lunar_detail.l_month)+"月"+lunar_detail.l_day;

        //var info = lunar_detail.l_day;
        return lunar_detail;
    },
    date_to_str: function(format,utc) {
        format=format.replace(/%[a-zA-Z]/g, function(a) {
            switch(a) {

                case "%d":
                    return "\"+cal365.date.to_fixed(date.getDate())+\"";
                case "%m":
                    return "\"+cal365.date.to_fixed((date.getMonth()+1))+\"";
                case "%j":
                    return "\"+date.getDate()+\"";
                case "%n":
                    return "\"+(date.getMonth()+1)+\"";
                case "%y":
                    return "\"+cal365.date.to_fixed(date.getYear()%100)+\"";
                case "%Y":
                    return "\"+date.getFullYear()+\"";
                case "%D":
                    return "\"+cal365.locale.date.day_short[date.getDay()]+\"";
                case "%l":
                    return "\"+cal365.locale.date.day_full[date.getDay()]+\"";
                case "%M":
                    return "\"+cal365.locale.date.month_short[date.getMonth()]+\"";
                case "%F":
                    return "\"+cal365.locale.date.month_full[date.getMonth()]+\"";
                case "%h":
                    return "\"+cal365.date.to_fixed((date.getHours()+11)%12+1)+\"";
                case "%H":
                    return "\"+cal365.date.to_fixed(date.getHours())+\"";
                case "%i":
                    return "\"+cal365.date.to_fixed(date.getMinutes())+\"";
                case "%a":
                    return "\"+(date.getHours()>11?\"pm\":\"am\")+\"";
                case "%A":
                    return "\"+(date.getHours()>11?\"PM\":\"AM\")+\"";
                case "%s":
                    return "\"+cal365.date.to_fixed(date.getSeconds())+\"";
                default:
                    return a;
            }
        });
        if (utc)
            format=format.replace(/date\.get/g,"date.getUTC");
        return new Function("date","return \""+format+"\";");
    },
    numToWeek: function(inStr) {
        switch (inStr) {
            case 1:
                return '一';
            case 2:
                return '二';
            case 3:
                return '三';
            case 4:
                return '四';
            case 5:
                return '五';
            case 6:
                return '六';
            case 0:
                return '日';
        }
    },
    str_to_date: function(format,utc) {
        var splt="var temp=date.split(/[^0-9a-zA-Z]+/g);";
        var mask=format.match(/%[a-zA-Z]/g);
        for (var i=0; i<mask.length; i++) {
            switch(mask[i]) {
                case "%j":
                case "%d":
                    splt+="set[2]=temp["+i+"]||0;";
                    break;
                case "%n":
                case "%m":
                    splt+="set[1]=(temp["+i+"]||1)-1;";
                    break;
                case "%y":
                    splt+="set[0]=temp["+i+"]*1+(temp["+i+"]>50?1900:2000);";
                    break;
                case "%h":
                case "%H":
                    splt+="set[3]=temp["+i+"]||0;";
                    break;
                case "%i":
                    splt+="set[4]=temp["+i+"]||0;";
                    break;
                case "%Y":
                    splt+="set[0]=temp["+i+"]||0;";
                    break;
                case "%a":
                case "%A":
                    splt+="set[3]=set[3]%12+((temp["+i+"]||'').toLowerCase()=='am'?0:12);";
                    break;
                case "%s":
                    splt+="set[5]=temp["+i+"]||0;";
                    break;
            }
        }
        var code ="set[0],set[1],set[2],set[3],set[4],set[5]";
        if (utc)
            code =" Date.UTC("+code+")";
        return new Function("date","var set=[0,0,0,0,0,0]; "+splt+" return new Date("+code+");");
    }
};
cal365.templates= {};
cal365.config= {
    default_date: "%Y-%m-%d %H:%i",
    month_date: "%F %Y",
    load_date: "%Y-%m-%d",
    week_date: "%l",
    day_date: "%D, %F %j",
    hour_date: "%H:%i",
    month_day : "%d",
    xml_date:"%Y/%m/%d %H:%i",
    api_date:"%Y-%m-%d %H:%i",
    server_utc:false
};
cal365.init_templates= function() {
    var d=cal365.date.date_to_str;
    var c=cal365.config;
    var f = function(a,b) {
        for (var c in b)
            if (!a[c])
                a[c]=b[c];
    }
    f(cal365.templates, {
        day_date:d(c.default_date),
        month_date:d(c.month_date),
        week_date: function(d1,d2) {
            return cal365.templates.day_date(d1)+" &ndash; "+cal365.templates.day_date(cal365.date.add(d2,-1,"day"));
        },
        day_scale_date:d(c.default_date),
        month_scale_date:d(c.week_date),
        week_scale_date:d(c.day_date),
        hour_scale:d(c.hour_date),
        time_picker:d(c.hour_date),
        event_date:d(c.hour_date),
        month_day:d(c.month_day),
        xml_date:cal365.date.str_to_date(c.xml_date,c.server_utc),
        load_format:d(c.load_date,c.server_utc),
        xml_format:d(c.xml_date,c.server_utc),
        api_date:cal365.date.str_to_date(c.api_date),
        event_header: function(start,end,ev) {
            return cal365.templates.event_date(start)+" - "+cal365.templates.event_date(end);
        },
        event_text: function(start,end,ev) {
            return ev.text;
        },
        event_class: function(start,end,ev) {
            return "";
        },
        month_date_class: function(d) {
            return "";
        },
        week_date_class: function(d) {
            return "";
        },
        event_bar_date: function(start,end,ev) {
            return cal365.templates.event_date(start)+" ";
        },
        event_bar_text: function(start,end,ev) {
            return ev.text;
        }
    });
};

/*==================================语言处理============================*/
cal365.locale= {
    date: {
        month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        day_short: ["日", "一", "二", "三", "四", "五", "六"]
    }
};

/*================ 日历实用类 ==========================*/
var CalUtil = {
    /*
     * 返回一个对象,包含date所在月份的月视图的第一天和最后一天的日期,以及显示在月视图中的行数{start:..., end:..., row:...}
     */
    monthViewInfo : function(date, startOnMonday) {
        var dateUtil = cal365.date;
        var info = {};
        var s_date = dateUtil.copy(date);
        s_date = dateUtil.month_view_start(s_date, startOnMonday);
        info.start = dateUtil.copy(dateUtil.week_start(s_date, startOnMonday));
        var e_date = dateUtil.copy(date);
        e_date.setMonth(date.getMonth() + 1);
        e_date.setDate(1);
        info.row = Math.ceil((e_date.valueOf()-s_date.valueOf()) / 604800000);
        info.end = dateUtil.add(info.start, 7*info.row, 'day');
        return info;
    }
};

var colors = ['#CC3333', '#DD4477', '#994499', '#6633CC', '#336699', '#3366CC',
		'#22AA99', '#329262', '#109618', '#66AA00', '#AAAA11', '#D6AE00',
		'#EE8800', '#DD5511', '#A87070', '#8C6D8C', '#627487', '#7083A8',
		'#5C8D87', '#898951', '#B08B59'];


//dataHandler.js
/*=============== 数据处理  DataHandler ================*/
var DataHandler = {
    /*
     * 记录缓存中数据的时间范围 XXX xj: 似乎yzm修改过缓存记录方式之后此数据已经无用了
     */
    cachedData : {
        from : new Date(),
        to : new Date()
    },
	loadCld : {},
    getLoadCld : function(dateStart, dateEnd,cld){
		var sel = [];
		var str = getDateKey(dateStart)+"-"+getDateKey(dateEnd);
		for(var i=0;i<cld.length;i++)
		{
			var signal = str+"-"+cld[i];
			if(typeof DataHandler.loadCld[signal] == 'undefined')
			{
				sel.push(cld[i]);
				DataHandler.loadCld[signal] = {};
			}
			
		}
		if(sel.length>0)
			return sel.join(",");
		else
			return false;
	},
    /*
     * 缓存中format以后的数据,格式见formatSchData
     */
    resultData: {},
    
    /*
     * id为键,日程简介为值
     */
    resultDataById: {},
    
    /*
     * 根据起始时间取日程数据,若缓存中不存在所需数据,则ajax请求并入缓存,若已存在,则数据请求无动作;若callback存在,调用之
     * dateStart, dateEnd : Date
     * callback : function
     */
    getSchByPeriod : function(dateStart, dateEnd, callback) {
        var s_time = dateStart, e_time = dateEnd;
        if (dateStart >= this.cachedData.from) {
            s_time = this.cachedData.to;
        }
        if (dateEnd <= this.cachedData.to) {
            e_time = this.cachedData.from;
        }
		var cld = calendarHandler.getSelectedArray();
			
		var cldStr = DataHandler.getLoadCld(dateStart, dateEnd,cld);
        if(cldStr) {
			
			// 杨：获取当前选中的日历id
			
            $.ajax({
                url: '/schedule/list.do',
                async: true,
                type: 'post',
                dataType: 'json',
                data: {
                    fromDate: cal365.templates.load_format(dateStart),
                    toDate: cal365.templates.load_format(dateEnd),
                    timeZone: - (new Date()).getTimezoneOffset() / 60,
                    calendarId: cldStr

                },
                success: function(result) {
					for(var i=0;i<result.length;i++)
					{
						var cldObj = result[i];
						DataHandler.formatSchData(cldObj.schlist, e_time);
					}
                    if(DataHandler.cachedData.from > s_time)
                       DataHandler.cachedData.from = s_time;
                    if(DataHandler.cachedData.to < e_time)
                       DataHandler.cachedData.to = e_time;
                    if(callback) {
                       callback();
                    }
                }
            });
        } else {
            if(callback) {
                callback();
            }
        }
    },
    
    /*
     * 获取date所在月份月视图区域内数据并显示,若缓存中存在所需数据,则返回缓存中数据,否则ajax请求数据
     * date : Date
     * callback : function
     * startOnMonday : 周一作为第一天,为true, 否则为false
     */
    getSchByMonth : function(date, callback, startOnMonday) {
        var s_date = cal365.date.month_view_start(date, startOnMonday);
        var e_date = cal365.date.add(s_date, CalUtil.monthViewInfo(date, startOnMonday).row*7, 'day');
        this.getSchByPeriod(s_date, e_date, callback);
    },
    
    /*
     * 此方法是从格式化的日程数据中获取一段时间的日程并返回规定的数据格式
     * 具体的数据格式如下
     * {
     *      "d2011-05-01":{
     *          schList:[{日程信息}],    // 该天的日程列表，todo：跨天日程的处理方式，重复日程，
     *          num:   // 日程的条数
     *      },
     *      "d2011-05-02":{
     *          schList:[]
     *          num:   // 日程的条数
     *      },
     *      maxNum:    // 算出最多日程的条数  方便月视图显示日程
     * }
     * 
     * sTime, eTime : Date OR string
     */
    getSchedulesByRange: function(sTime,eTime,data,cld) {
        var result= {};
        var dataSch = data||DataHandler.resultData;
        if(typeof sTime=="string") {
            sTime = cal365.templates.api_date(sTime);
        }
        if(typeof eTime=="string") {
            eTime = cal365.templates.api_date(eTime);
        }
        sTime = cal365.date.date_part(sTime);
        eTime = cal365.date.date_part(eTime);
        for(;sTime<=eTime;) {
            var k = "d"+getDateKey(sTime);
            result[k]= {
                schList:[],
                num:0
            };
            if(dataSch[k]) {
				var schList_temp = [];
				for(var j = 0; j<dataSch[k].schList.length;j++)
				{
					var sch_t = dataSch[k].schList[j];
					for(var q = 0;q<cld.length;q++)
					{
						if(sch_t.cid==cld[q])
						{
							schList_temp.push(sch_t);
							break;
						}
					}
				}
                result[k].schList = schList_temp;
                result[k].num = schList_temp.length;
            }
            sTime = cal365.date.add(sTime,1,"day");
        }
        var maxNum = 0;
        for(var i in result) {
            var k = result[i];
            if(k.num>maxNum)
                maxNum = k.num;
        }
        result.maxNum = maxNum;
        return JSON.parse(JSON.stringify(result)); //make a copy of data to keep original data safe
    },
    
    /*
     * 为了提高日程数据的处理效率，减少重复处理，将日程数据格式化为以下模式
     * {
     *      "d2011-05-01":{
     *          schList:[{日程信息}]    // 该天的日程列表，日程列表是排好序的，排序规则：1、按照时间排序，如果时间相同则按照日历id、日程id或者可以是日程的添加时间；todo：跨天日程的处理方式，重复日程，
     *      },
     *      "d2011-05-02":{
     *          schList:[]
     *      }
     * }
     * 
     * data : Object
     * dateScope : Date
     */
    formatSchData : function(data,dateScope) {
//        console.log('raw data \n' + JSON.stringify(data));
        var result = {};

        /*
         * 注：对于数组的操作，尽量少用for(var i in data) 模式，因为此模式不仅会操作数组中的数据，同时会操作数组对象的其他属性，
         * 此处只需要遍历一遍日程列表即可，但是需要注意对跨天日程的拆分，需要添加三个字段 1、cross_st  2、cross_et,3、是否显示isDisplay
         */
        for(var i=0;i<data.length;i++) {
            var sch = data[i];
            if('' == sch.text) sch.text = '(无标题)';
            var sTime = cal365.templates.api_date(sch.start_time);
            var eTime = new Date(sTime.valueOf()+sch.duration*1000);

            var sTemp = cal365.date.copy(sTime);
            var sideTime = cal365.date.add(cal365.date.date_part(sTemp),1,"day");
			sch.isDisplay = 0;
            if(sideTime>=eTime) {
                var key = "d"+getDateKey(sTime);
                if(!result[key])
                    result[key]= {
                        schList:[]
                    };
                result[key].schList.push(sch);
            } else {
                var s_t = cal365.date.copy(sTime);
                for(;s_t<eTime&&s_t<dateScope;)     // 此处应当避免没有必要阶段性日程划分；TODO：对日程进行排序
                {
                    var k = "d"+getDateKey(s_t);
                    var sch_temp = DataHandler.copySch(sch);
                    sch_temp.cross_st = cal365.templates.day_date(s_t)+":00";
                    var e_t = cal365.date.add(cal365.date.date_part(s_t),1,"day");
                    if(e_t<=eTime)
                        sch_temp.cross_et = cal365.templates.day_date(e_t)+":00";
                    else
                        sch_temp.cross_et = cal365.templates.day_date(eTime)+":00";
                    if(!result[k])
                        result[k]= {
                            schList:[]
                        };
                    result[k].schList.push(sch_temp);
                    s_t = e_t;
                }
            }
        }
//        console.log('result which is formatted\n' + JSON.stringify(result));
        DataHandler.mergeData(DataHandler.resultData, result);
        DataHandler.formatSchDataById(data);
    },
    
    /*
     * 为了提高日程数据的处理效率，减少重复处理，将日程数据格式化为以下形式(作用待评估,暂时保留)
     * {
     *      "1234":{日程信息}, //id 为key的日程的信息
     *      "1235":{}
     *      ... ...
     * }
     */
    formatSchDataById : function(data) {
        var result = {};
        for(var i=0;i<data.length;i++) {
            result[data[i].id] = data[i];
        }
        $.extend(true, DataHandler.resultDataById, result);
    },

    /*
     * 将source中的日程数据合并到target中
     * 基于DataHandler.resultData的数据结构
     */
    mergeData: function (target, source) {
        for(var dailySch in source) {
            if(target[dailySch]) {
                var src = source[dailySch]['schList'];
                var tgt = target[dailySch]['schList'];
                for(var i = 0; i < src.length; ++i) {
                    var flag = false;
                    for(var j = 0; j < tgt.length; ++j) {
                        if(tgt[j].id == src[i].id) {
                            tgt[j] = src[i];
                            flag = true;
                            break;
                        }
                    }
                    if(!flag) {
                        tgt.push(src[i]);
                    }
                }
            } else {
                target[dailySch] = source[dailySch];
            }
            //对日程排序按开始时间排序
            target[dailySch].schList.sort(function(a, b) {
                if(a.allday_event) return -1;
                if(b.allday_event) return 1;
                var a_stime = cal365.templates.api_date(a.start_time).getTime();
                var b_stime = cal365.templates.api_date(b.start_time).getTime();
                return (a_stime - b_stime);
            });
        }
    },
    
    /*
     * 根据日程id在缓存中删除日程
     */
    delSchById: function(id) {
        for (var dailySch in DataHandler.resultData) {
            var schList = DataHandler.resultData[dailySch]['schList'];
            for (var i = 0; i < schList.length; ++i) {
                if (schList[i].id == id) {
                    schList.splice(i, 1);
                    --i;
                }
            }
        }
        delete DataHandler.resultDataById[id];
    },
    
    /*
     * 根据日程id在缓存中更新数据
     * sch : Obj
     * dateScope : Date
     */
    updateSch: function(schList, dateScope) {
//        console.log('schList\n' + schList[0].id + '\n' +JSON.stringify(schList) );
        DataHandler.delSchById(schList[0].id);
//        console.log('after delSchById\n' + JSON.stringify(DataHandler.resultData));
        DataHandler.formatSchData(schList, dateScope);
//        console.log('after format\n' + JSON.stringify(DataHandler.resultData));
    },
    
    /*
     * 克隆日程
     */
    copySch : function(sch) {
        var t = function() {
        };
        t.prototype = sch;
        return new t();
    }
};



//calendarHandler.js
(function(window){
	/*
	 * 私有变量
	 */
	var startOnMonday=true,
	reg=/^d(\d{4})-(\d{2})-(\d{2})/,
	r2=/^0/,
	calendarId=null,	//当前用户的主日历id
	navDate=null,		// 当前月份的第一天
	seletedDate=null,	//当前选择的日期
	hoverDate = null,	//hover的日期
	schData=null;		//用户的日程数据
	
	/*
	 * 私有方法
	 */
	var log=function(message){
	},
	
	//设置NavDate
	setNavDate=function(date){
		if(date instanceof Date)
			navDate=date;
		else
			navDate=null;
	},
	
	//获取navaDate所在月份的数据，赋值给schData
	getCurrentMonthViewData=function(callback){
		if(navDate){
			DataHandler.getSchByMonth(navDate, function(){
				var monthInfo = CalUtil.monthViewInfo(navDate,startOnMonday);
				var s=monthInfo.start,
					e=monthInfo.end;
				var cld=new Array();
				cld.push(calendarId);
				schData = DataHandler.getSchedulesByRange(s,e,DataHandler.resultData,cld);
				
				if(callback){
					callback();
				}
			}, startOnMonday);
			
		}
	},
	
	//添加日程
	creatSch=function(text,allday,hour,second,callback){
		var sch = {};
        sch.schTitle = text;
        sch.alldayEvent = allday;
        if(allday) {
            sch.startTime = getDateKey(seletedDate) + ' ' + '09:00:00';
        } else {
        	hour = hour + "";
        	second = second + "";
            sch.startTime = getDateKey(seletedDate) + ' ' + hour.leftpad(2) + ':' + second.leftpad(2) + ":00";
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
				getCurrentMonthViewData(function(){
					for(var key in schData){
						if(key!="maxNum"){
							var num = schData[key].num;
							var k= key.replace(reg,function(all,year,month,date){
								return year+"-"+month.replace(r2,"")+"-"+date.replace(r2,"");
							});
							if(num > 0){
								callback(cal365.templates.api_date(k));
							}
						}
					}
				});
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
		//显示日程
		drawSch:function(schList){
			
			$("#taskList").children().remove();
			var schs = [];
			if(schList.length>0){
				for(var i = 0; i < 3 && i < schList.length; i++){
					var showTxt=cutByRealLength(schList[i].text,10);
					if(showTxt.length<schList[i].text.length){
						showTxt+="...";
					}
					var showTime = "&nbsp;";
					if(! schList[i].allday_event){
						var raw = schList[i].start_time.split(' ')[1].split(':');
						raw.splice(2);
						showTime = raw.join(':') + "&nbsp;";
					}
					//var showTime = schList[i].start_time + schList[i];
					//alert(showTime);
					schs.push("<div class='workitem'>");
						schs.push("<div class='tastWorkDot'></div>");
						if(! schList[i].allday_event){
							schs.push("<div class='taskWorkTime'>" + showTime + "</div>");
							schs.push("<div style='margin-left:5px;'>" + showTxt + "</div>");
						}else{
							schs.push("<div style='margin-left:11px;'>" + showTxt + "</div>");
						}
						
					schs.push("</div>");
				}
			}
			$("#taskList").html(schs.join(''));
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
		//根据calendarId变量，判断是否登陆
		isLogin:function(){
			return !!calendarId;
		},
		//dataHandler调用，返回选中的日历id
		getSelectedArray:function(){
			var t=new Array();
			t.push(calendarId);
			return t;
		},
		//准备特定月份的数据
		prepareData4:function(year,month , callback){
			var date=new Date();
			date.setYear(year);
			date.setMonth(month-1);
			date.setDate(1);
			setNavDate(date);
			getCurrentMonthViewData(function(){
				for(var key in schData){
					if(key!="maxNum"){
						var num = schData[key].num;
						var k= key.replace(reg,function(all,year,month,date){
							return year+"-"+month.replace(r2,"")+"-"+date.replace(r2,"");
						});
						if(num > 0){
							var tttt = cal365.templates.api_date(k);
							callback(tttt);
						}
					}
				}
				//callback();
			});
		},
		//获取seletedDate
		getSelectedDate:function(){
			return seletedDate;
		},
		//设置seletedDate
		setSelectedDate:function(date){
			if(typeof date == "string")
				seletedDate = cal365.templates.api_date(date);
			else if(date instanceof Date)
				seletedDate = date;
		},
		//获取hoverDate对应的日程数据
		getSch:function(){
			return schData["d"+getDateKey(hoverDate)];
		},
		//添加日程
		addSch:function(text,allday,hour,second,callback){
			creatSch(text,allday,hour,second,callback);
		},
		//显示日程
		drawSch:function(){
			if(this.isLogin()){
				UI.drawSch(this.getSch().schList);
			}
		},
		//设置hoverDate
		setHoverDate:function(date){
			if(typeof date == "string")
				hoverDate = cal365.templates.api_date(date);
			else if(date instanceof Date)
				hoverDate = date;
		}
	}
	//公开calendarHandler对象
	if(window.calendarHandler){
		window._calendarHandler=window.calendarHandler;
	}
	window.calendarHandler=calendarHandler;
})(window); 

//=======================================makeCal.js================================
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
		var monthFirstD = makeCal.getMonthFirst(date);
		//the first in the table
	 	var tableFirstD = makeCal.getWeekFirst(monthFirstD);
		//the first of next month
		var nextMonthFirstD = makeCal.addTime(monthFirstD, 1, "month");
		//last day of this month
		var monthLastD = makeCal.addTime(nextMonthFirstD, -1, "day");
		//get the rows
		rows = Math.ceil((nextMonthFirstD.valueOf()-tableFirstD.valueOf())/(60*60*24*1000*7));
		//loop to calculate the data
		var indexDay = new Date(tableFirstD);
		var nowDay = makeCal.setTimeZero(new Date());
		
		makeCal.fillCalData(indexDay, monthFirstD, monthLastD, nowDay);
	},
	
	fillCalData:function(indexDay, monthFirstD, monthLastD, nowDay){
		calData = [];
		for ( var i = 0; i < rows; i++)
		{
			var week = [];
			for ( var j = 0; j < 7; j++)
			{
				var aDay = makeCal.createDay();
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
				}
				week.push(aDay);
				indexDay = makeCal.addTime(indexDay, 1, "day");
			}
			calData.push(week);
		}
	},
	
	prepareData4Festival:function(year, date ){
		date = makeCal.setTimeZero(date);
		madeRiliDate = new Date(date);
		
		var first = date, last = date;
		//取包含date的， 调休放假安排连续区的第一天
		var flag = false;
		while(true){
		 	var	work_T = worktime["y"+first.getFullYear()]
			var datestr = getMonthDateStr(first);
			if(work_T["d"+datestr]){
				first =  makeCal.addTime(first, -1, "day");
				flag = true;
			}else{
				if(flag)
					first =  makeCal.addTime(first, 1, "day");
				break;
			}
		}
		//取包含date的， 调休放假安排连续区的最后一天
		var flag = false;
		while(true){
		 	var	work_T = worktime["y"+last.getFullYear()]
			var datestr = getMonthDateStr(last);
			if(work_T["d"+datestr]){
				last =  makeCal.addTime(last, 1, "day");
				flag = true;
			}else{
				if(flag)
					last =  makeCal.addTime(last, -1, "day");
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
		rows = 5;
		//loop to calculate the data
		var indexDay = new Date(tableFirstD);
		
		var nowDay = makeCal.setTimeZero(new Date());
		
		makeCal.fillCalData(indexDay, monthFirstD, monthLastD, nowDay);
		
		//return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	},
	
	showCal:function(selectDate)
	{
		if ( typeof(selectDate) == "undefined" )
		{
			selectDate = date = makeCal.setTimeZero(new Date());
		}
		selectDate = makeCal.setTimeZero(selectDate);
		$("#festival_detail_str").text("");
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
		
		//显示日程图标
		calendarHandler.prepareData4(selectDate.getFullYear(),(selectDate.getMonth()+1), this.appendScheduleIcon);
		
		makeCal.makeAction();
	},
	
	//画日程图标
	appendScheduleIcon:function(date){
		//计算日期对应的日历格子坐标
		if(date.getTime()<calData[0][0].value.getTime()) return false;//如果日程日期比月视图起始格子的日期小，就返回false
		var days = (date.getTime() - calData[0][0].value.getTime())/86400000; //日差
		if(days > (7*rows -1))
			return false;
		var i = Math.floor(days/7), 
			j = Math.floor(days) % 7;
		//console.log((date.getMonth()+1) + "-" + date.getDate() + ":" + days + "," + i + "," + j);
		if(!(calData[i][j].hasWork)){
			calData[i][j].hasWork = true;
			$("td[i=" + i + "][j=" + j + "] div:first-child").append("<img class='workDot workDot"+calData[i][j].rows+"' src='http://static.365rili.com/wannianlibaidu/BD_images/dot.png'/>");
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
				makeCal.makeHuangli(d);
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
				$('#festival_select_selecter').css({'top':$('#festival').offset().top+30+'px'});
				$('#festival_select_selecter').css({'left':$('#festival').position().left+15+'px'});
				$('#festival_select_selecter').css({'display':'block'});
				$('#festival_select_selecter').css({'height':'120px'});
			}
		);
		$('#month_func').bind('click', function(e)
			{
				if ($('#month_select_selecter').css("display") == "block")
				{
					$('#month_select_selecter').css({'display':'none'});
					return;
				}
				$('#month_select_selecter').css({'top':$('#month_func').offset().top+30+'px'});
				$('#month_select_selecter').css({'left':$('#month_func').position().left+'px'});
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
				$('#year_select_selecter').css({'top':$('#year_func').offset().top+30+'px'});
				$('#year_select_selecter').css({'left':$('#year_func').position().left+'px'});
				$('#year_select_selecter').css({'display':'block'});
				$('#year_select_selecter').scrollTop(0);
				var yearNum = $('#year_num').text();
				var offset = $('#yearitem'+yearNum).position().top;
				$('#year_select_selecter').scrollTop(offset);
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
			currentDate.setFullYear(parseInt(data[0], 10));
			currentDate.setMonth(parseInt(data[1], 10)-1, 1);
			currentDate.setDate(parseInt(data[2], 10));
			$('#year_num').text(currentDate.getFullYear());
			$('#month_num').text(currentDate.getMonth()+1);
			$('#festival').text($(e.target).text());
			//makeCal.pareData(currentDate);
//			makeCal.showCal(currentDate);
//			makeCal.makeHuangli(currentDate);
//			showingToday = false;
			
			//alert("here is where I insert my code for festival");
			makeCal.prepareData4Festival((new Date()).getFullYear(), currentDate);
			
			//makeCal.pareData(currentDate);
			makeCal.showCal(currentDate);
			makeCal.makeHuangli(currentDate);
			showingToday = false;
			var dataStr = $(e.target).attr('data');			
			if ( dataStr == '2014_01_01' )
			{
				$("#festival_detail_str").text("2014年1月1日放假1天");
				$("#festival_raiders").text("");
			}
			else if ( dataStr == '2014_01_31' )
			{
				$("#festival_detail_str").text("1月31日至2月6日放假调休，共7天。1月26日（星期日）、2月8日（星期六）上班");
				$("#festival_raiders").text("");
			}
			else if ( dataStr == '2014_04_05' )
			{
				$("#festival_detail_str").text("4月5日放假，4月7日（星期一）补休");
				$("#festival_raiders").text("");
			}
			else if ( dataStr == '2014_05_01' )
			{
				$("#festival_detail_str").text("5月1日至3日放假调休，共3天。5月4日（星期日）上班");
				$("#festival_raiders").text("");
			}
			else if ( dataStr == '2014_06_02' )
			{
				$("#festival_detail_str").text("6月2日放假，与周末连休");
				$("#festival_raiders").text("");
			}
			else if ( dataStr == '2014_09_08' )
			{
				$("#festival_detail_str").text("9月8日放假，与周末连休");
				$("#festival_raiders").text("");
			}
			else if ( dataStr == '2014_10_01' )
			{
				$("#festival_detail_str").text("10月1日至7日放假调休，共7天。9月28日（星期日）、10月11日（星期六）上班");
				$("#festival_raiders").text("");
			}

			
			
			
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
				bd_loginOrAuth();
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
				$('#taskHover').css({"left":ele.position().left-35+"px"});
				$('#taskHover').css({"top":ele.position().top+66+"px"});
			}
			else if ( ele.hasClass('block5'))
			{
				$('#taskHover').css({"display":"block"});
				$('#taskHover').css({"left":ele.position().left-35+"px"});
				$('#taskHover').css({"top":ele.position().top+53+"px"});
			}
			else if ( ele.hasClass('block6'))
			{
				$('#taskHover').css({"display":"block"});
				$('#taskHover').css({"left":ele.position().left-35+"px"});
				$('#taskHover').css({"top":ele.position().top+46+"px"});
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
		gregorianDayStr += " ";
		gregorianDayStr += getYearWeek(date);
		gregorianDayStr += "周 ";
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
		//2014 2 4显示为马年，同时改天干地支
		if(date.getFullYear()==2014 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("马","蛇");
			lunar.y_Info=lunar.y_Info.replace("甲午","癸巳");
		}
		//2015 1 1~2013 2 3显示为羊年，同时改天干地支
		if(date.getFullYear()==2015 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("羊","马");
			lunar.y_Info=lunar.y_Info.replace("乙未","甲午");
		}
		//2016 1 1~2013 2 3显示为猴年，同时改天干地支
		if(date.getFullYear()==2016 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("猴","羊");
			lunar.y_Info=lunar.y_Info.replace("丙申","乙未");
		}
		//2017 1 1~2013 2 3显示为鸡年，同时改天干地支
		if(date.getFullYear()==2017 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<3))){
			lunar.y_Info=lunar.y_Info.replace("鸡","猴");
			lunar.y_Info=lunar.y_Info.replace("丁酉","丙申");
		}
		//2018 1 1~2013 2 3显示为狗年，同时改天干地支
		if(date.getFullYear()==2018 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("狗","鸡");
			lunar.y_Info=lunar.y_Info.replace("戊戌","丙申");
		}
		//2019 1 1~2013 2 3显示为猪年，同时改天干地支
		if(date.getFullYear()==2019 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("猪","狗");
			lunar.y_Info=lunar.y_Info.replace("己亥","戊戌");
		}
		//2020 1 1~2013 2 3显示为鼠年，同时改天干地支
		if(date.getFullYear()==2020 && (date.getMonth()==0 ||(date.getMonth()==1 && date.getDate()<4))){
			lunar.y_Info=lunar.y_Info.replace("鼠","猪");
			lunar.y_Info=lunar.y_Info.replace("庚子","己亥");
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
					
					var filename = "http://up1.365rili.com/js/huangli/" + year + ".js";
					this.loadScript(filename,function(){
							//alert(HuangLi['y'+ year]['d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth) + (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay)]);
							var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
									+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));
							info.huangliY = hl.y;
							info.huangliJ = hl.j;
							if(callback){
								callback(info);
							}
						}
					)
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
	 loadScript: function(url, callback){
		var script = document.createElement("script")
		script.type = "text/javascript";
		script.charset = "utf-8";
		if (script.readyState){//IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" || script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} 
		else {//Others
			script.onload = function(){
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
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
	"2016-6-6":"",		"2016-6-7":"",
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

function getYearWeek(date){  
    var date2=new Date(date.getFullYear(), 0, 1);  
    var day1=date.getDay();  
    if(day1==0) day1=7;  
    var day2=date2.getDay();  
    if(day2==0) day2=7;  
    d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);    
    return Math.ceil(d /7)+1;   
}


//====================boot============================
$(document).ready(function()
	{
		calendarHandler.init();
		makeCal.init();
		//make calendar show in middel of baidu canvas
		var width=document.body.clientWidth;
		if(width>540){
			var left = Math.floor((document.body.clientWidth-540)/2);
			$("#middle").css("left",left+"px");
		}
		gotoFestival();
		
		//不进行登录
		$('#cal_365riliUser').hide();
		$('#cal_plusbutton').hide();
	});
	
	function getUrlParam(param) {
		var hrefstr, pos, parastr, para, tempstr;
		hrefstr = window.location.href;
		pos = hrefstr.indexOf("?");
		end = hrefstr.indexOf("#");
		if (end < 0)
			end = hrefstr.length;
		parastr = hrefstr.substring(pos + 1, end);
		para = parastr.split("&");
		tempstr = "";
		for (i = 0; i < para.length; i++) {
			tempstr = para[i];
			pos = tempstr.indexOf("=");
			if (tempstr.substring(0, pos) == param) {
				return tempstr.substring(pos + 1);
			}
		}
		return null;
	}
	function gotoFestival(){
		//get festival parameter
		var search = window.location.search.substring(1); //alert(search);
		var pairs = search.split('&'); //alert(pairs.length);
		var value = '';
		for(var i in pairs){ //alert(i);
			var kv = pairs[i].split('='); //alert(kv[0]); alert(kv[1]);
			if(kv.length == 2 && kv[0] == 's_param'){
				var param = decodeURIComponent(kv[1]).split('=');
				if(param.length == 2){
					value = param[1];
				}
				break;
			}
		}
		
		function laterclick(){
			var festival_later=value.split('-');
			currentDate.setFullYear(festival_later[0]);
			currentDate.setMonth(festival_later[1]-1);
			currentDate.setDate(festival_later[2]);
			$('#year_num').text(currentDate.getFullYear());
			$('#month_num').text(currentDate.getMonth()+1);
			makeCal.prepareData4Festival(currentDate.setFullYear(festival_later[0]), currentDate);
			makeCal.showCal(currentDate);
			makeCal.makeHuangli(currentDate);
			//$("#festival_detail_str").text("2014年放假安排暂无,最终方案国务院将于2013年底予以公布,届时我们将及时更新");
		}
		
		switch(value){
			case 'yuandan' : $("#festival_select_selecter div:nth-child(1)").trigger("click"); break;
			case 'chunjie' : $("#festival_select_selecter div:nth-child(2)").trigger("click"); break;
			case 'qingming' : $("#festival_select_selecter div:nth-child(3)").trigger("click"); break;
			case 'laodong' : $("#festival_select_selecter div:nth-child(4)").trigger("click"); break;
			case 'muqin' : $("#festival_select_selecter div:nth-child(5)").trigger("click"); break;
			case 'duanwu' : $("#festival_select_selecter div:nth-child(6)").trigger("click"); break;
			case 'zhongqiu' : $("#festival_select_selecter div:nth-child(7)").trigger("click"); break;
			case 'guoqing' : $("#festival_select_selecter div:nth-child(8)").trigger("click"); break;
			case 'qingren' : $("#festival_select_selecter div:nth-child(9)").trigger("click"); break;
			case 'pingan' : $("#festival_select_selecter div:nth-child(10)").trigger("click"); break;
			case 'shengdan' : $("#festival_select_selecter div:nth-child(11)").trigger("click"); break;
			case '2014-1-1':laterclick();break;
			case '2014-1-30':laterclick();break;
			case '2014-1-31':laterclick();break;
			case '2014-4-5':laterclick();break;
			case '2014-5-1':laterclick();break;
			case '2014-6-2':laterclick();break;
			case '2014-9-8':laterclick();break;
			case '2014-10-1':laterclick();break;
			default : break;
 		}
	}
