$(function(){
	//根据useragent判断当前的设备类型
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";
	var bIsWeibo = sUserAgent.match(/weibo/i) == "weibo";
	var bIsqq = sUserAgent.match(/qq/i) == "qq";
	
	$(".collection_btn").click(function(){
		if(bIsIphoneOs && bIsqq || bIsWeixin || bIsWeibo){
			$(".weixin_tips_layer").show();
		}else{
			window.location='coco://365rili.com/subscribe?calendarID='+G.cid
		}
	});
	$(".down_btn").click(function(){
		if(G.isSpecial){
			window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
		}else{
			if(bIsWeixin){
				window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
			}else{
				window.location='http://www.365rili.com/newwap/location_coco.html'
			}			
		}
	});
	$(".weixin_tips_layer").click(function(){
		$(this).hide();
	});
	if(bIsIpad || bIsIphoneOs || bIsAndroid){
		$width=parseInt($(window).width())-55;
		$(".source p").width($width);
	}
	//内容格式化输出
	var content = $(".calendar_txt").html();
	$(".calendar_txt").html(html_encode(content));
	$(".calendar_txt").find("br").eq(0).remove();
	
	if(G.is_sub == 1){
		if(G.isPublic == false){
			$(".cal_title").html(["<span>《",G.title,"》</span>","是发布在365日历平台上的一个群组日历,","创建者为<span>", G.creator,"</span>",G.description == "null" || G.description == "" ? "" : "对日历的描述如下 :"].join(""));
		}else{
			$(".cal_title").html(["<span>《",G.title,"》</span>","是发布在365日历平台上的一个公众日历,","发布者为<span>", G.creator,"</span>",G.description == "null" || G.description == "" ? "" : "对日历的描述如下 :"].join(""));			
		}
		$(".cal_sum").html(G.description == "null" ? "" : G.description);		
	}else{
		$(".cal_title").html(["<span>",G.creator,"</span>","的日历， 是创建在365日历上的私人日历, 如果你也想拥有自己的日历, 那么快下载365日历吧"].join(""));
		$(".cal_sum").html("");
	}
});

function html_encode(str){
	var s = "";  
	if (str.length == 0) return "";  
	s = str.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");  
	s = s.replace(/>/g, "&gt;");  
	s = s.replace(/ /g, "&nbsp;");  
	s = s.replace(/\'/g, "&#39;");  
	s = s.replace(/\"/g, "&quot;");  
	s = s.replace(/\n/g, "<br>");  
	return s;  
}
function html_decode(str)  
{  
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&amp;/g, "&");  
		s = s.replace(/&lt;/g, "<");  
		s = s.replace(/&gt;/g, ">");  
		s = s.replace(/&nbsp;/g, " ");  
		s = s.replace(/&#39;/g, "\'");  
		s = s.replace(/&quot;/g, "\"");  
		s = s.replace(/<br>/g, "\n");  
		return s;  
}