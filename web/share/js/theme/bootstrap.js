//	@author	 huangyi
//	@require jQuery
//	@require jQuery UI
//
//
/*
(function(){
		var queryJson, str;
		$.query = function(name){
			if (!queryJson) {
				queryJson = {};
				if (str = location.search.slice(1) + '&' + location.hash.slice(1)) {
					$.each(str.split('&'), function(i, s, key, value){
						s = s.split('='), key = s[0], value = s[1];
						if (key in queryJson) {
							if ($.isArray(queryJson[key])) {
								queryJson[key].push(value);
							} else {
								queryJson[key] = [queryJson[key], value];
							}
						} else {
							queryJson[key] = value;
						}
					});
				}
			}
			return queryJson[name];
		};
	})();
*/
var defaultThemeData = {"id":51,
		"theme":{
			"dt":{"cls":"ff50403b","dx":1,"r":1,"dy":1,"cl":"ffffffff","tf":0,"sc":"33000000","sz":14},
			"nt":{"cls":"ff50403b","dx":1,"r":1,"dy":1,"cl":"ffffffff","tf":0,"sc":"33000000","sz":21},
			"ddb":"00000000",
			"sct":{"cls":"00000000","dx":1,"r":1,"dy":1,"cl":"ffffffff","tf":0,"sc":"33000000","sz":15},
			"tf":"http://d2.365rili.com/coco/pottery.ttf",
			"wkb":"00000000",
			"wdb":"00000000",
			"dkt":{"cls":"ffefbfbd","dx":1,"r":1,"dy":1,"cl":"ffefbfbd","tf":1,"sc":"33000000","sz":18},
			"ddt":{"cls":"fff9b487","dx":1,"r":1,"dy":1,"cl":"fff9b487","tf":1,"sc":"33000000","sz":18},
			"tdt":{"cls":"fff9b487","dx":1,"r":1,"dy":1,"cl":"fff9b487","tf":1,"sc":"33000000","sz":18},
			"bgc":"00000000",
			"st":{"cls":"ff50403b","dx":1,"r":1,"dy":1,"cl":"ffffffff","tf":0,"sc":"33000000","sz":25},
			"dkb":"00000000",
			"sr":{"cls":"ff211e1d","dx":1,"r":1,"dy":1,"cl":"fff9b487","tf":0,"sc":"33000000","sz":25},
			"wkt":{"cls":"ffefbfbd","dx":1,"r":1,"dy":1,"cl":"ffefbfbd","tf":0,"sc":"33000000","sz":36},
			"tdb":"00ffffff",
			"mu":"dc7b5489-3bdf-4f48-acf5-fe177f9963a9.png",
			"l":"7ff2c9c7",
			"bgn":"1c5264a9-30d1-48a6-92fa-9c2c71f49526.jpg",
			"v":0,
			"bgu":"1c5264a9-30d1-48a6-92fa-9c2c71f49526.jpg",
			"sb":"33000000",
			"wdt":{"cls":"ffffffff","dx":1,"r":1,"dy":1,"cl":"ffffffff","tf":0,"sc":"33000000","sz":36},
			"dsb":"4d000000",
			"ynm":{"cls":"7f000000","dx":1,"r":1,"dy":1,"cl":"fff9b487","tf":1,"sc":"33000000","sz":24},
			"et":{"cls":"ff211e1d","dx":1,"r":1,"dy":1,"cl":"fff9b487","tf":0,"sc":"33000000","sz":25}},
			"name":"陶瓷主题"};
$(function(){
	var app_link = "coco://365rili.com/subscribe?calendarID=" + G.cid;
	if(G.is_sub == 1){
		if(G.isPublic == false){
			$(".cal_title").html("这是我正在使用的群组日历，点击下面【关注此日历】，一起加入吧。");
		}else{
			$(".cal_title").html("这是我正在使用的公众日历，点击下面【关注此日历】，一起加入吧。");			
		}
		$(".cal_sum_desc").html(G.description == "null" ? "" : G.description);		
	}else{
		$(".cal_title").html(["<span>",G.creator,"</span>","的日历， 是创建在365日历上的私人日历, 如果你也想拥有自己的日历, 那么快下载365日历吧"].join(""));
		$(".cal_sum").html("");
		$(".collection_layer_btn").html("下载365日历");
		$(".collection_layer_btn").addClass("down_btn");
		$(".collection_layer_btn").attr("href", "http://i.365rili.com");
		$(".collection_layer_btn").attr("target", "_blank");
	}
	//微信里面显示弹层
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";	
	var bIsWeibo = sUserAgent.match(/weibo/i) == "weibo";
	var bIsqq = sUserAgent.match(/qq/i) == "qq";
	
	var data;
	try{
		data = G.data!="" ? JSON.parse(G.data.replace(/\n/g, "")) : {};
	}catch(e){}
	var bIsSpecialDl = data && data.special_dl;
	
	$(".collection_layer_btn").click(function(){
		if(G.is_sub == 1){
			$(".collection_layer").show();
		}
	});
	$(".close_coll_layer").click(function(){
			$(".collection_layer").hide();
	});

	$(".collection_btn").click(function(){
		if(bIsIphoneOs && bIsqq || bIsWeixin || bIsWeibo){
			$(".weixin_tips_layer").show();
		}else{
			window.location="coco://365rili.com/subscribe?calendarID="+G.cid
		}
	});
	$(".down_btn").click(function(){
		if(bIsSpecialDl){
			window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
		}else{ 
			if(bIsWeixin){
				window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";				
			}else{
				window.location = 'http://www.365rili.com/newwap/location_coco.html';
			}
		}
	});
	$(".weixin_tips_layer").click(function(){
		$(".weixin_tips_layer").hide();
	});
});

function renderCalendarExtend(){
	var theme = JSON.parse(G.theme);
	$(".phone_area").themePreview({
		skinJson:theme,
		title:G.title
	});
	$("#footer_calendar_name").html(G.title);
	$("#footer_calendar_id").html(G.cid);
}


function getCalendarExtend(cid){
	$.ajax({
		url:"/coco/single/getCalendarWithExtend.do",
		type:"post",
		dataType:"json",
		data:{
			calendarID:cid
		},
		success:function(data){
			if(data.state == "ok"){
				$(".phone_area").themePreview({
					skinJson:data.extend.theme,
					title:data.calendar.title
				});
				$("#footer_calendar_name").html(data.calendar.title);
				$("#footer_calendar_id").html(data.calendar.id);
				G.calendarData = data;
			}
		}
	});
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}







