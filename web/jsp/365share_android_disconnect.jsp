<%@ page contentType="text/html;charset=utf-8" %>
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>
	下载365日历Android版
</title>
<script>
function autoResize(){
	var w = document.getElementById("dl_container").style.paddingLeft;
	w = w.substring(0, w.length - 2);
	document.getElementById("dl_container").style.width = (window.screen.width - 2 * w) + "px";
	document.getElementById("dl_btn").style.width = (window.screen.width - 2 * w) + "px";
}
</script>
</head>
<body onload="setTimeout('autoResize()', 300);" style="margin:0;padding:0;background: url('/dl/bg.jpg');">
<div id="dl_container" style="padding-left:15px; padding-right: 15px;">
	<div id="ct_r1" style="margin-top:20px;height:60px;line-height: 60px;background:#5e5e5e;
							padding:10px 13px;font-family: Microsoft YaHei;
							color: #ffffff;">
		<div id="who_share" style="font-size: 20px;";>365日历欢迎您:</div>
	</div>
	<div id="ct_r2" style="margin: 15px auto 0px;font-family: Microsoft YaHei;
							font-size: 14px;color: #9a9a9a;font-weight:bold;
							line-height: 25px;">
		安装365日历后，好友分享给您的日历/日程可直接显示在您的日历中：
	</div>
	<div id="ct_r3" style="margin-top:10px;">
		<a href="http://when.365rili.com/dl/android/Calendar365.apk">
			<img id="dl_btn" src="/dl/android/dl_btn.png"></img>
		</a>
	</div>
	<div id="ct_r4" style="margin-top:15px;text-align:right;color:#9a9a9a;font-size: 12px;
							font-weight:bold;font-family: Microsoft YaHei;">
		目前只支持Android版和iPhone版
	</div>
	<div id="ct_r5" style="margin-top:60px;margin-bottom:25px;color:#9a9a9a;font-size:20px;
							font-weight:bold;text-align:center;
							font-family: Microsoft YaHei;">
		精彩每一天  365日历
	</div>
</div>
</body>