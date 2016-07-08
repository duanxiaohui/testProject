/**
 * 汽车限行
 * @authors Huangyi
 * @date    2014-08-06 16:56:07
 * @version $Id$
 */

var tipMap = {
	"北京":"早7点至晚8点，限行机动车(含零时号牌)禁止在五环路以内道路(不含五环主路行驶)"
}

var dataMap = {
	"北京":["", [4,9], [5,0], [1,6], [2,7], [3,8], ""],
	"上海":["", [4,9], [5,0], [1,6], [2,7], [3,8], ""],
	"兰州":["", [4,9], [5,0], [1,6], [2,7], [3,8], ""],
	"天津":["", [4,9], [5,0], [1,6], [2,7], [3,8], ""],
	"成都":["", [4,9], [5,0], [1,6], [2,7], [3,8], ""],
	"南昌":["", [4,9], [5,0], [1,6], [2,7], [3,8], ""],
	"长春":["", [4,9], [5,0], [1,6], [2,7], [3,8], ""]

}

var carLimit = {
	weekAry:["日","一","二","三","四","五","六"],
	selectedCity:null,
	init: function(){
		var city = this.getCity();
		if(!city){
			this.showSetting();
		}else{
			this.showLimitContent();
		}
		this.initEvent();
	},
	initEvent:function(){
		
		$('.constellation_list ul li').on("tap", function(){
			if($(this).hasClass("on"))
				return;
			$('.constellation_list ul li.on').removeClass("on");
			$(this).addClass("on");
		});

		$('.botton').on("tap", function(){
			var city = $('.constellation_list ul li.on').html();
			carLimit.setCity(city);
			$(".set").hide();
			carLimit.showLimitContent()	
		});
		$(".set_btn").on("tap", function(){
			$(".limit_content").hide();
			carLimit.showSetting();
		})

	},
	getCity: function(){
		return localStorage["city"];
	},
	setCity: function(city){
		localStorage["city"] = city;
	},
	showSetting: function(){
		var city = this.getCity();
		if(city){
			$('.constellation_list ul li').each(function(i,o){
				if(o.innerHTML == city){
					$(o).addClass("on");
				}
			});
		}else{
			$('.constellation_list ul li').eq(0).addClass("on");
		}
		$(".set").show();	
	},
	showLimitContent: function(){
		var city = this.getCity();
		$(".limit_head div").html(city + "市");
		$(".limit_num .date").html(this.getDateStr(new Date()));
		$(".tips").html(tipMap[city]);
		this.showLimitNum();
		$(".limit_content").show();
	},
	showLimitNum: function(){
		var d = new Date();
		var city = this.getCity();
		var data = dataMap[city];

		var current = data[d.getDay()];
		if(current == ""){
			$(".today_num li").html("");
		}else{
			$(".today_num li").eq(0).html(current[0]);
			$(".today_num li").eq(1).html(current[1]);
		}
		$(".limit_num_list ul").empty();
		var iteratorDate = new Date();
		for(var i =0; i < 5; i++){
			iteratorDate.setDate(iteratorDate.getDate() + 1);
			var num = data[iteratorDate.getDay()];
			var $li = $("<li><div class='wek_num'><span></span><span></span></div></li>");
			$li.append(this.getDateStr(iteratorDate, i));
			if(num != ""){
				$li.find('span').eq(0).html(num[0]);
				$li.find('span').eq(1).html(num[1]);
			}
			$li.appendTo(".limit_num_list ul");
		}
	},
	getDateStr: function(d, i){
		if(i !== undefined){
			var tomrrow = ['今天 ','明天 ','后天 ','',''];
			return [tomrrow[i],"周", this.weekAry[d.getDay()], " ", d.getMonth(), "月", d.getDate(), "日"].join('');
		}else{
			return [d.getFullYear(),"年",d.getMonth(),"月",d.getDate(),"日"," 星期", this.weekAry[d.getDay()]].join("");
		}
	}
}

$(function() {
	carLimit.init();
})