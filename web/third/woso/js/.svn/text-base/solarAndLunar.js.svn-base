/**
 * 日历类
 * @param {Object} date
 */
function Calendar(date){
	this.date = date ? new Date(+date) : (G.currDate || new Date);
}

Calendar.prototype = {
	getMonthFirstDate: function(){
		var date = new Date(+this.date);
		date.setDate(1);
		return date;
	},
	getCalendarFirstDate: function(){
		var date = this.getMonthFirstDate(), day = date.getDay(), ar = [-6, 0, -1, -2, -3, -4, -5];
		date.setDate(date.getDate() + ar[day]);
		return date;
	}
};
(function(){
	//存储1900-2100年的农历月大小，闰月及天数
	var MAP = [0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2, 0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd295, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977, 0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970, 0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f, 0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557, 0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0, 0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0, 0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6, 0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570, 0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0, 0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5, 0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930, 0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530, 0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45, 0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0, 0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef, 0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4, 0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0, 0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260, 0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252, 0xd520];
	var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
	var monthName = '正,二,三,四,五,六,七,八,九,十,冬,腊'.split(',');
	var Gan = '甲,乙,丙,丁,戊,己,庚,辛,壬,癸'.split(',');
	var Zhi = '子,丑,寅,卯,辰,巳,午,未,申,酉,戌,亥'.split(',');
	var Animals = '鼠,牛,虎,兔,龙,蛇,马,羊,猴,鸡,狗,猪'.split(',');
	var solarTerm = '小寒,大寒,立春,雨水,惊蛰,春分,清明,谷雨,立夏,小满,芒种,夏至,小暑,大暑,立秋,处暑,白露,秋分,寒露,霜降,立冬,小雪,大雪,冬至'.split(',');
	var dateName = "初一,初二,初三,初四,初五,初六,初七,初八,初九,初十,十一,十二,十三,十四,十五,十六,十七,十八,十九,二十,廿一,廿二,廿三,廿四,廿五,廿六,廿七,廿八,廿九,三十".split(',');
	var arCnDigits = '零一二三四五六七八九'.split('');
	var arWeek = '日一二三四五六'.split('');
	
	//农历节日
	var lFtv = {
		'0101': '春节',
		'0115': '元宵节',
		'0202': '龙抬头',
		'0505': '端午节',
		'0707': '七夕',
		'0715': '中元节',
		'0815': '中秋节',
		'0909': '重阳节',
		'1208': '腊八',
		'1223': '小年'
	};
	//公历节日
	var sFtv = {
		'0101': '元旦',
		'0214': '情人节',
		'0308': '妇女节',
		'0312': '植树节',
		'0401': '愚人节',
		'0422': '地球日',
		'0501': '劳动节',
		'0504': '青年节',
		'0531': '无烟日',
		'0601': '儿童节',
		'0701': '建党日',
		'0801': '建军节',
		'0815': '日本投降',
		'0910': '教师节',
		'0918': '九·一八事变纪念日',
		'1001': '国庆节',
		'1031': '万圣节',
		'1111': '光棍节',
		'1201': '艾滋病日',
		'1213': '南京大屠杀纪念日',
		'1224': '平安夜',
		'1225': '圣诞节'
	};
	/**
	 * 返回对应公历日期的农历日期信息，包括：年，月，日，节气，节日
	 * @param {Object} date
	 */
	window.Lunar = function(date){
		this.init(date);
	};
	
	Lunar.prototype = {
		init: function(date){
			this.solarDate = date ? new Date(+date) : G.currDate;
			//公历年月日
			this.sYear = this.solarDate.getFullYear();
			this.sMonth = this.solarDate.getMonth() + 1;
			this.sDate = this.solarDate.getDate();
			//农历数字年月日
			this.lYear = '';//this.sYear + 2698
			this.lMonth = '';
			this.isLeapMonth = false;
			this.isBigMonth = false;
			this.lDate = '';
			//农历中文年月日
			this.cnYear = '';
			this.cnMonth = '';
			this.cnDate = '';
			//农历干支年月日
			this.gzYear = '';
			//中文星期几
			this.cnDay = '';
			
			if (this.solarDate >= Lunar.BEGIN && this.solarDate < Lunar.END) {
				this.calLunarInfo();
				this.calCnInfo();
				this.calGanZhiInfo();
				this.calSolarTerm();
				this.calSolarFtv();
				this.calLunarFtv();
			}
		},
		calLunarInfo: function(){
			var year = this.sYear, index = year - 1900, date = new Date(this.solarDate < springDays[index] ? springDays[year--, index -= 1] : springDays[index]);
			this.lYear = year + 2698;
			this.animal = Animals[this.lYear % 12];
			
			var offset = Math.floor((this.solarDate - date) / 86400000), days, lmonth = Lunar.getLeapMonth(year);
			for (var i = 1; i < 13; i++) {
				days = Lunar.getMonthDays(year, i);
				if (offset < days) {
					this.lMonth = i;
					this.isBigMonth = days == 30;
					this.lDate = offset + 1;
					break;
				} else {
					offset -= days;
				}
				if (lmonth == i) {
					days = Lunar.getLeapMonthDays(year);
					if (offset < days) {
						this.lMonth = i;
						this.isLeapMonth = true;
						this.isBigMonth = days == 30;
						this.lDate = offset + 1;
						break;
					} else {
						offset -= days;
					}
				}
			}
		},
		calCnInfo: function(){
			var strYear = String(this.lYear);
			this.cnYear = arCnDigits[strYear.charAt(0)] + arCnDigits[strYear.charAt(1)] + arCnDigits[strYear.charAt(2)] + arCnDigits[strYear.charAt(3)];
			this.cnMonth = (this.isLeapMonth ? '闰' : '') + monthName[this.lMonth - 1];
			this.cnDate = this.lDate == 1 ? this.cnMonth + '月' + (this.isBigMonth ? '大' : '小') : dateName[this.lDate - 1];
		},
		//计算干支年
		calGanZhiInfo: function(){
			this.gzYear = Gan[this.lYear % 10] + Zhi[this.lYear % 12];
		},
		//计算节气
		calSolarTerm: function(){
			this.term = this.sDate == Lunar.getSolarTermDate(this.sYear, this.sMonth, false) ? solarTerm[this.sMonth * 2 - 2] : this.sDate == Lunar.getSolarTermDate(this.sYear, this.sMonth, true) ? solarTerm[this.sMonth * 2 - 1] : '';
			this.cnDay = '星期' +  arWeek[this.solarDate.getDay()];
		},
		//计算公历节日
		calSolarFtv: function(){
			this.soloarFtv = sFtv[('0' + this.sMonth).slice(-2) + ('0' + this.sDate).slice(-2)] || '';
		},
		//计算农历节日
		calLunarFtv: function(){
			this.lunarFtv = lFtv[('0' + this.lMonth).slice(-2) + ('0' + this.lDate).slice(-2)] || '';
		},
		getInfo: function(name){
			return this[name];
		},
		
		getDate: function(){
			return this.lunarFtv && this.soloarFtv ? (this.lunarFtv + ' ' + this.soloarFtv) : (this.lunarFtv || this.soloarFtv || this.term || this.cnDate);
		}
	};
	
	$.extend(Lunar, {
		cache: {},
		BEGIN: new Date('1900/1/31'),
		END: new Date('2100/12/31'),
		//返回农历 y年的总天数
		getYearDays: function(year){
			var i, sum = 348, data = MAP[year - 1900];
			for (i = 0x8000; i > 0x8; i >>= 1) {
				sum += data & i ? 1 : 0;
			}
			return sum + Lunar.getLeapMonthDays(year);
		},
		//返回农历 y年闰月的天数
		getLeapMonthDays: function(year){
			return Lunar.getLeapMonth(year) ? ((MAP[year - 1899] & 0xf) == 0xf ? 30 : 29) : 0;
		},
		//返回农历 y年闰哪个月 1-12 , 没闰返回 0
		getLeapMonth: function(year){
			var lm = MAP[year - 1900] & 0xf;
			return lm == 0xf ? 0 : lm;
		},
		//返回农历 y年m月的总天数
		getMonthDays: function(year, month){
			return (MAP[year - 1900] & (0x10000 >> month)) ? 30 : 29;
		},
		//计算某年某月的第一、二个节气的公历日期
		getSolarTermDate: function(year, month, isSecond){
			return new Date((31556925974.7 * (year - 1900) + sTermInfo[(month - 1) * 2 + !!isSecond] * 60000) + Date.UTC(1900, 0, 6, 2, 5)).getUTCDate();
		}
	});
	
	var springDays = (function(){
		var day = new Date('1900/1/31'), year;
		var springDays = [day];
		while (MAP[(year = day.getFullYear()) - 1900]) {
			day = new Date(+day);
			day.setDate(day.getDate() + Lunar.getYearDays(year));
			springDays.push(day);
		}
		return springDays;
	})();
})();
