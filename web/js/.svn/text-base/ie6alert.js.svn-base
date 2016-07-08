$(function(){
	if ( $("#ie6alertblock").length > 0 )
	{
		return;
	}
	$("body").append("<div id='ie6alertblock'> \
						<div id='id6365logo' style='filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/images/index/iealert/logo.png\"); \
	width: 95px; \
	height: 97px; \
	margin-top: 20px; \
	margin-left: 40px; \
	display: inline; \
	float: left;'></div> \
						<div id='365alertcontent' style=' margin-left: 10px; float: left; \
							padding-top: 20px;'> \
							<div id='365alerttishi' style='font-size: 40px; padding-top: 10px;'>小提示：</div> \
							<div id='365alerttishiStr' style='font-size: 20px; padding-top: 10px;'>您的浏览器过于陈旧，推荐使用高效安全的IE8或Chrome浏览器</div> \
						</div> \
						<a target=_blank href='http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-8'> \
						<div style='filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/images/index/iealert/icon_ie.png\"); \
									width: 80px; \
									height: 80px; \
									margin-top: 20px; \
									float: left; \
									cursor: pointer; \
									'>\
						</div>\
						</a>\
						<a target=_blank href='http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html?hl=zh-CN'> \
						<div style='filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/images/index/iealert/icon_ch.png\"); \
									width: 80px; \
									height: 80px; \
									margin-top: 20px; \
									float: left; \
									cursor: pointer; \
									'>\
						</div>\
						</a>\
						<div id='closeIeAlert' style='filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/images/index/iealert/closeIeAlert.png\"); width: 32px; height: 28px; float: right; margin-top: 50px; margin-right: 10px; cursor: pointer;'></div> \
					</div>");
	var alertIsPoped = false;
	var alertIsTimeout = false;
	var alertIsMousein = false;
	var closeClicked = false;
	$("#closeIeAlert").bind("click", function(){
		closeClicked = true;
		$("#ie6alertblock").css({"display":"none"});
	});
	$("#ie6alertblock").animate({
		top: -138
		}, 2000, function(){
			$("#ie6alertblock").animate({
				top: 0
			}, 800, function(){
				alertIsPoped = true;
				$("#ie6alertblock").animate({
					top: 0
				}, 4000, function(){
					alertIsTimeout = true;
					$("#ie6alertblock").bind("mouseover", function(){
						alertIsMousein = true;
					});
					$(document).bind("mousemove", function(e){
						if ( e.clientY >= 138 )
						{
							$("#ie6alertblock").animate({
								top: -138
							}, 800);
						}
					});
				});
			});
		});
});
