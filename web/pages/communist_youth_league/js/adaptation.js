$(function(){	var sUserAgent = navigator.userAgent.toLowerCase();	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";	var bIsAndroid = sUserAgent.match(/android/i) == "android";	var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";	var $h=$(window).height();	var $w=$(document).width();	var num=$h-102;	$(".coco").height(num);	$(".coco_bottom").click(function(){		$(".todo,.wnl").removeClass("none");		$(window).scrollTop($h);	});	if(bIsWeixin){		$(".coco_btn").click(function(event){				event.preventDefault();				$(".weixin_wap_layer").show().height(h).width(w);		})	}	if(bIsIphoneOs ){		$(".coco_btn").attr("href","http://itunes.apple.com/cn/app/365ri-li-xin-ban/id642101382?ls=1&mt=8");		$(".business_btn").attr("href","http://itunes.apple.com/cn/app/365ri-li/id456880164?ls=1&mt=8");		$(".todo_btn").attr("href","http://itunes.apple.com/cn/app/365dai-ban/id666173161?ls=1&mt=8");		$(".wnl_btn").attr("href","http://itunes.apple.com/cn/app/ji-yun-wan-nian-li/id628433727?ls=1&mt=8");	}else{		$(".coco_btn").attr("href","http://d2.365rili.com/coco.apk");		$(".business_btn").attr("href","http://d2.365rili.com/dl/android/365rili.apk");		$(".todo_btn").attr("href","http://d2.365rili.com/dl/android/todo.apk");		$(".wnl_btn").attr("href","http://d2.365rili.com/dl/android/wannianli.apk");	}});