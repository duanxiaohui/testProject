/*
 * common render function
 */
var ThemeRenderClass = function(){
	function renderFont(fontObj, fontFamily, elemObj, bFontSize){
		var self = this, $elem = $(this.element), opt = this.options;

		/*
			字体属性：
			字号 ——KEY_SIZE = "sz";
			颜色 ——KEY_COLOR = "cl";
			点击时的颜色 ——KEY_COLOR_SELECTED = "cls";
			（投影） shadowX ——KEY_SHADOW_DX = "dx";
			shadowY ——KEY_SHADOW_DY = "dy";
			投影颜色 ——KEY_SHADOW_COLOR = "sc";
			radio ——KEY_RADIO = "r";
			是否使用字库 ——KEY_USE_TYPEFACE = "tf";
		 */
		if(bFontSize){
			elemObj.css({
				"color": self._hex2rgba(fontObj.cl)
			});	
		}else{
			elemObj.css({
				"font-size": self._t(fontObj.sz) + "px",
				"color": self._hex2rgba(fontObj.cl)
			});
		}
		
	
		if(fontObj.tf && fontObj.tf != 0 && fontFamily){
			elemObj.css("font-family", fontFamily);
		}else{
			elemObj.css("font-family", "");
		}
		if(fontObj.r > 0){
			var shadow_style = fontObj.dx + "px " + fontObj.dy + "px " + "0 " + self._hex2rgba(fontObj.sc);
			elemObj.css("text-shadow",shadow_style);
		}else{
			elemObj.css("text-shadow","");
		}
	}
	function hex2rgba(hex){
		var self = this, $elem = $(this.element), opt = this.options;

		var r = parseInt(hex.substr(2, 2), 16); 
		var g = parseInt(hex.substr(4, 2), 16); 
		var b = parseInt(hex.substr(6, 2), 16); 
		var alpha = parseInt(hex.substr(0, 2), 16);
		return ["rgba","(",r,",",g,",",b,",",alpha/255,")"].join('');
	}
	function renderBackgroundColor(hex, elemObj){
		var self = this, $elem = $(this.element), opt = this.options;

		elemObj.css("background-color", self._hex2rgba(hex));
	}
	function t(size){
		var self = this, $elem = $(this.element), opt = this.options;
		
		return size;
		//return self._transferFontSize(size, 480, "toWeb");
	}
	function transferFontSize(font_size, resolution, direction){
		var self = this, $elem = $(this.element), opt = this.options;

		var andorid_resolution = 320;
		if(direction === "toAndoird"){
			return Math.ceil( font_size * andorid_resolution / resolution );						
		}else if(direction === "toWeb"){
			return Math.floor( font_size * resolution / andorid_resolution );
		}
	}
	var self = {};
	self.renderFont = renderFont;
	self.hex2rgba = hex2rgba;
	self.renderBackgroundColor = renderBackgroundColor;
	self.t = t;
	self.transferFontSize = transferFontSize;
	return self;
}

var themeRenderObj = new ThemeRenderClass();
var upyunPath = {
	bgu:"",
	mu:"",
	tbu:"",
	mbu:""	
};


$.widget('skineditor.themePreview', {
	options: {
		render:themeRenderObj,
		title:"我的个人日历"
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//define private method
		self._renderFont = opt.render.renderFont;
		self._hex2rgba = opt.render.hex2rgba;
		self._renderBackgroundColor = opt.render.renderBackgroundColor;
		self._t = opt.render.t;
		self._transferFontSize = opt.render.transferFontSize;
		//render phone preview dom element
		$elem.find(".phone_header_title").html(opt.title);
		var phone_skin = $elem.find('.phone_skin');
		var calendar = $elem.find('.calendar');
		var calendar_panel = $elem.find('.calendar_panel');
		var calendar_table = $elem.find(".calendar_table");
		$elem.append(phone_skin);

		//render month view in calendar table
		self._renderMonthView(calendar_table);
		
		//用来加载字体的style
		$elem.append("<style>");
		//mu_box
		//$($(".day_box")[17]).css("position","relative").css("width","68px");
		//$($(".day_box")[17]).append("<div class='mu_box'></div>");
		
		var activity_div = $elem.find(".phone_activity");
		try{
			var data = JSON.parse(G.data);
			for(var i in data.schedules){
				var startTime = data.schedules[i].startTime;
				var title = data.schedules[i].title;
				var htmlStr;
				if(typeof startTime == "number"){
					var dt = new Date(startTime);
					var hour = "0" + dt.getHours();
					var minute = "0" + dt.getMinutes();
					startTime = hour.slice(-2) +":"+ minute.slice(-2);
					title = title.replace(/U/g, "\\u");
					title = eval("'" + title +"'");
				}
				htmlStr = startTime + " " + title;
				activity_div.append('<div class="phone_activity_row">'+htmlStr+'</div>');
			}
		}catch(e){
			
		}
		
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		self._renderTheme(opt.skinJson);
	},
	_renderTheme: function(skinJson){
		var self = this, $elem = $(this.element), opt = this.options;
		//版本号：int —— KEY_VERSION = "v";
		//console.log("[log]Skin Data Version: " + skinJson.v);
		//字库：string（url或客户端自带），可选，默认本机字库 ——KEY_TYPEFACE_URL = "tf";
		var deviceWidth = $(".phone_skin").width();
		var deviceHeight = Math.floor(800 * deviceWidth / 480);
		if(deviceHeight < 600){
			deviceHeight = 600;
		}
		var fontFamily = "custom_font";
		if(skinJson.tf){
			try{
				$elem.find("style").html("@font-face{font-family:'custom_font';src:url('"+skinJson.tf+"');}")				
			}catch(e){
				
			}
		}
		
		//背景图片：string（url或自带） ——KEY_BACKGROUND_URL = "bgu";
		$(".phone_skin").css("background", "url(" + upyunPath.bgu +  skinJson.bgu + ") no-repeat 0px 0px transparent");
		$(".phone_skin").css("background-size","100% 100%");
		$(".phone_skin").css("height",deviceHeight + "px");
		$(".phone_activity").css("height", (deviceHeight - 450) + "px");
		$(".phone_skin").css("position","relative");
		$(".calendar").css("width", deviceWidth + "px");
		//$(".phone_skin").css("height", deviceHeight + "px")
		
		//月视图背景图：string（url或自带） ——KEY_MONTH_BG_URL = "mbu";
		if(skinJson.mbu)
			$(".calendar_panel").css("background", "url("+upyunPath.mbu+skinJson.mbu+") no-repeat top left transparent");
		$(".calendar_panel").css("background-size",deviceWidth + "px");

		//背景颜色：string ——KEY_BACKGROUND_COLOR = "bgc";
		self._renderBackgroundColor(skinJson.bgc, $(".phone_skin"));
		//设置的图标：字体属性，自定义字体库 ——KEY_SETUP_TEXT = "st";
		self._renderFont(skinJson.st, fontFamily, $(".phone_header_menu"));
		//分享的图标：字体属性，自定义字体库 ——KEY_SHARE_TEXT = "sr";
		self._renderFont(skinJson.sr, fontFamily, $(".calendar_header_link"));
		//编辑的图标：字体属性，自定义字体库 ——KEY_EDIT_TEXT = "et";
		self._renderFont(skinJson.et, fontFamily, $(".calendar_header_edit"));
		//日历名：字体属性 ——KEY_NAME_TEXT = "nt";
		self._renderFont(skinJson.nt, fontFamily, $(".phone_header_title"));	
		//日历描述：字体属性 ——KEY_DESCRIPTION_TEXT = "dt";
		self._renderFont(skinJson.nt, fontFamily, $(".phone_header_desc"));	
		//年月：字体属性 ——KEY_YEAR_AND_MONTH_TEXT = "ynm";
		self._renderFont(skinJson.ynm, fontFamily, $(".calendar_header_year_month"));
		//周（工作日）：字体属性 ——KEY_WEEK_WEEKDAY_TEXT = "wdt";
		self._renderFont(skinJson.wdt, fontFamily, $(".workday"), true);
		//周（周末）：字体属性 ——KEY_WEEK_WEEKAND_TEXT = "wkt";
		self._renderFont(skinJson.wkt, fontFamily, $(".weekend"), true);
		//日期（工作日）：字体属性 ——KEY_DATE_WEEKDAY_TEXT = "ddt";
		self._renderFont(skinJson.ddt, fontFamily, $(".daybox_workday"));
		//日期（周末）：字体属性 ——KEY_DATE_WEEKAND_TEXT = "dkt";
		self._renderFont(skinJson.dkt, fontFamily, $(".daybox_weekend"));
		//日期（今日）：字体属性 ——KEY_DATE_TODAY_TEXT = "tdt";
		if(skinJson.tdt)
			self._renderFont(skinJson.tdt, fontFamily, $(".daybox_today"));
		else
			self._renderFont(skinJson.ddt, fontFamily, $(".daybox_today"));

		//格子背景颜色（周、工作日）：string ——KEY_WEEK_WEEKDAY_BG = "wdb";
		self._renderBackgroundColor(skinJson.wdb, $(".workday"));
		//格子背景颜色（周、周末）：string ——KEY_WEEK_WEEKAND_BG = "wkb";
		self._renderBackgroundColor(skinJson.wkb, $(".weekend"));
		//格子背景颜色（日期、工作日）：string ——KEY_DATE_WEEKDAY_BG = "ddb";
		self._renderBackgroundColor(skinJson.ddb, $(".td_workday"));
		//格子背景颜色（日期、周末）：string ——KEY_DATE_WEEKAND_BG = "dkb";
		self._renderBackgroundColor(skinJson.dkb, $(".td_weekend"));
		//格子背景颜色（今天）：string ——KEY_TODAY_BG = "tdb";
		self._renderBackgroundColor(skinJson.tdb, $(".today"));
		//月视图今天格子图：string（url或自带） ——KEY_TODAY_BG_URL = "tbu";
		if(skinJson.tbu){
			$(".today").css("background-image", "url("+upyunPath.tbu + skinJson.tbu+")");
			$(".today").css("background-repeat", "no-repeat");
			$(".today").css("background-size", "60px 54px");
			$(".today").css("background-position", "0% 0%");
		}

		//格子背景颜色（点击）：string ——KEY_DATE_SELECTED_BG = "dsb";
		//格子划线颜色：string ——KEY_LINE = "l";
		$(".day_box").css("border-color", self._hex2rgba(skinJson.l));
		//默认格子图标：string（url或自带） ——KEY_MARK_URL = "mu";
		
		if(skinJson.mu){
			$(".mu_box").css("background", "url("+upyunPath.mu+skinJson.mu+") no-repeat bottom left transparent");
			$(".mu_box").css("background-size", "48px");
		}
		//日程字体：字体属性 ——KEY_SCHEDULE_TEXT = "sct";
		self._renderFont(skinJson.sct, fontFamily, $(".phone_activity_row"));
		//日程背景颜色：string（可以是多个颜色，逗号分隔，如"111111,222222"）——KEY_SCHEDULE_BG = "sb";
		self._renderBackgroundColor(skinJson.sb, $(".phone_activity_row"));
		
		//农历（工作日）：字体属性 ——KEY_LUNAR_WEEKDAY_TEXT = "ldt";
		if(skinJson.ldt)
			self._renderFont(skinJson.ldt, fontFamily, $(".td_workday .lunar_normal"));
		else
			$(".td_workday .lunar_normal").hide();
		//农历（周末）：字体属性 ——KEY_LUNAR_WEEKAND_TEXT = "lkt";
		if(skinJson.lkt)
			self._renderFont(skinJson.lkt, fontFamily, $(".td_weekend .lunar_normal"));
		else
			$(".td_weekend .lunar_normal").hide();
		//农历（今日）：字体属性 ——KEY_LUNAR_TODAY_TEXT = "ltt";
		if(skinJson.ltt)
			self._renderFont(skinJson.ltt, fontFamily, $(".lunar_today"));
		else
			$(".lunar_today").hide();
		//农历（特殊日）：字体属性 ——KEY_LUNAR_SPECIAL_TEXT = "lst";
		if(skinJson.lst)
			self._renderFont(skinJson.lst, fontFamily, $(".lunar_special"));
		else
			$(".lunar_special").hide();
	},
	_renderMonthView2: function(calendar_table){
		var self = this, $elem = $(this.element), opt = this.options;
		var lunarAry = ["儿童","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一",
		                "端午","十二","十三","十四","十五","十六","十七","十八","十九","二十","二一",
		                "二二","二三","二四","二五","二六","二七","二八","二九"]
		var startDate = new Date();
		var rowsHtml = $.map(new Array(35), function(_, i) {
	            var y = startDate.getFullYear(), m = startDate.getMonth(), d = startDate.getDate(), w = startDate.getDay();
				var weekClass;
				var tdClass;
				if(i % 7 == 5 || i % 7 == 6){
					weekClass = "daybox_weekend";
					tdClass = "td_weekend";
				}
				else{
					weekClass = "daybox_workday";
					tdClass = "td_workday";
				}
				var lunarClass = "lunar_normal";
				if(i==6||i==17)
					lunarClass = "lunar_special";
				if(i==16)
					lunarClass = "lunar_today";
	            return [i % 7 == 0 ? '<tr>' : '',
						"<td class='day_box "+tdClass+"'>",
						"<div class='day_box_number " + weekClass + "'>" + (i>=6 && i < 35 ? i-5 : "") + "</div>",
						i>=6 && i < 35 ? "<div class='day_box_lunar "+lunarClass+"'>"+lunarAry[i-6]+"</div>" : "",
						"</td>",
						i % 7 == 6 ? '</tr>' : '', void (startDate.setDate(startDate.getDate() + 1))].join('');
	    });
		calendar_table.html(rowsHtml.join(''));
		//append today fond and background color
		var today = $(calendar_table.find(".daybox_workday")[12]);
		today.removeClass("daybox_workday");
		today.addClass("daybox_today");
		var today_td = $(calendar_table.find(".day_box")[16]);
		today_td.removeClass("day_box");
		today_td.addClass("today");
		
	},
	_renderMonthView: function(calendar_table){
		var self = this, $elem = $(this.element), opt = this.options;
		//初始化表格视图
		this.tdHtml = '<td class="{dayboxClass} {monthClass}" date="{date}"><div class="day_box_number {weekClass}"><span class="solar-text">{solar}</span></div>'
						//+'<div class="day_box_lunar {lunarClass}"><span class="lunar-text">{lunar}</span></div>'
						+'</td>';
		this.date = new Date();
		this.today = new Date();
		var cld = new Calendar(this.date), calYear = this.date.getFullYear(), calMonth = this.date.getMonth(), calDate = this.date.getDate(), t = this.today;
		this.fromDate = cld.getCalendarFirstDate();
		var startDate = new Date(this.fromDate);
		var rowsHtml = $.map(new Array(42), function(_, i){
			var y = startDate.getFullYear(), m = startDate.getMonth(), d = startDate.getDate(), w = startDate.getDay();
			var l = lunar(startDate), festival = l.festival(), isToday = d == t.getDate() && m == t.getMonth() && y == t.getFullYear();
			var key = 'm' + (m + 1) + 'd' + d;
			
			return [i % 7 == 0 ? '<tr>' : '', $.format(self.tdHtml, {
				todaytext: isToday ? '<span class="today-text">今天</span>' : '',
				//vocationtext: y == 2013 && festival2013[key] ? '<span class="vocationt-text">放假</span>' : '',
				//worktext: y == 2013 && workday2013[key] ? '<span class="work-text">工作</span>' : '',
				dayboxClass: isToday ? "today" : "day_box",
 				monthClass: w == 0 || w == 6 ? 'td_weekend' : 'td_workday',
				weekClass: isToday ? "daybox_today" : w == 0 || w == 6 ? 'daybox_weekend' : 'daybox_workday',
				//monthClass: m < calMonth ? 'month_befor' : m > calMonth ? 'month_after' : isToday ? 'table-today' : w == 0 || w == 6 ? 'td_weekend' : '',
				solar: m < calMonth || m > calMonth ? "" : startDate.getDate(),
				//lunar: festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
				date: formatDate(startDate),
				color: festival.length || l.term ? '198500' : '808080'
			}), i % 7 == 6 ? '</tr>' : '', void (startDate.setDate(startDate.getDate() + 1))].join('');
		});
		
		calendar_table.html(rowsHtml.join(''));
		
		var monthStr = calMonth + 1;
		if(monthStr < 10) monthStr = "0" + monthStr;
		$(".calendar_header_year_month").html(calYear + "-" + monthStr);
	}
});
