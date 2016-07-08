<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.User" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="万年历,万年历查询,黄历,黄历查询,365,日历,阳历,阴历,公历,老皇历,黄道吉日,星座,赛程,赛事,日程,运程,共享,客户端,桌面日历,手机日历" />
<meta name="Description" content="365日历网是专业的日历门户网站，可以在PC、手机、网站之间同步数据。同时还提供各种日历日程信息，包括黄道吉日、农历、黄历、星座运程、体育赛程、电视节目等。" /> 
<title>365日历网(www.365rili.com)_万年历_桌面日历_手机日历_黄道吉日_星座运程</title>
<link rel="stylesheet" type="text/css" href="/css/cal365_default/mainCalCommon.css" />
<link rel="stylesheet" type="text/css" href="/css/cal365_default/365cal_common.css" />
<link rel="stylesheet" type="text/css" href="/css/sub365_default/365sub_default.css" />
<link rel="stylesheet" type="text/css" href="/css/sub365_default/365sub_index.css" />
</head>
<body style="margin:0;">
	<!--div style='position:fixed; background:#cecece; z-index: 0; width: 100%;height:100%;'></div-->
	<img class='body-background-img' style='position:fixed; top:0px; left:0px; z-index: 0;' src='/images/cal365_default/bg_left_top.jpg'>
	<img class='body-background-img' style='position:fixed; margin-left:-450px; margin-top:-480px; top:100%; left:100%; z-index: 0;' src='/images/cal365_default/bg_right_bottom.jpg'>
	<jsp:include page="/header.jsp" flush="true">
		<jsp:param name="header_active_type" value="1"/>
	</jsp:include>
	<div id="page_content" style="position:relative;margin:0 auto 24px;padding-top:10px; height: 100%;">
		<div style="position:relative;height:14px;width:100%;margin-bottom:-2px;">
			<div style="float:left;background:url(/images/cal365/rCorner.gif) no-repeat;height:14px;width:12px;">
			</div>
			<div style="float:left;background:url(/images/cal365/corner_bg.gif) repeat-x;height:14px;" id="gualiHeader">
			</div>
			<div style="float:right;background:url(/images/cal365/corner_left.gif) no-repeat right top;height:14px;width:11px;">
			</div>
		</div>
		<div id="main_page" style='height: 100%; background: #f9f9f9;'>
			<div id="subList" class="calList" >
				<div id='citySelect'>
					<div class='choose-city chooser' id='choose-city'>地域：</div>
					<select id='city-select'></select>
				</div>
				
				<div>
					<img src='/sub_images/allsub.png' style='float: left;'/>
					<div class='cloud-bar allsub-bar' >全部内容</div>
					<div id="cate-list" style="height: 190px; ">
						<div class="cate-list-item" id='allsub-bar-text'>
							<div class="catename">全部订阅</div>
							<div class="categt">&gt;</div>
						</div>
						<div class="cate-list-item" id="cate-list-item0">
							<div class="catename">生活</div>
							<div class="categt">&gt;</div>
						</div>
						<div class="cate-list-item" id="cate-list-item1">
							<div class="catename">活动</div>
							<div class="categt">&gt;</div>
						</div>
						<div class="cate-list-item" id="cate-list-item2">
							<div class="catename">体育</div>
							<div class="categt">&gt;</div>
						</div>
						<div class="cate-list-item" id="cate-list-item3">
							<div class="catename">演出</div>
							<div class="categt">&gt;</div>
						</div>
						<div class="cate-list-item" id="cate-list-item4">
							<div class="catename">影视</div>
							<div class="categt">&gt;</div>
						</div>
					</div>
				</div>
				<div style='margin-top: 20px;'>
					<img src='/sub_images/mysub.png' style='float: left;'/>
					<div class='cloud-bar subcloud-bar'>已关注</div>
				</div>
				<div id="subtag-cloud"></div>
				<div style="clear:both"></div>
				<!--div class='cloud-bar recommend-bar'>推荐关注</div>
				<div id="recommend-cloud">
				</div-->
			</div>
			<div id="page" style="float:left;text-align:left;">
				<div id="contentTB">
					<div id='timeSelect'>
						<div class='timeSelectArrow' id='prevDay'>◀</div>
						<div id='timeSelectStr' class='timeSelectTime'>12/20星期二</div>
						<div class='timeSelectArrow' id='nextDay'>▶</div>
						<div id='timeSelectToday' class='timeSelectDay timeSelected'>今天</div>
						<div id='timeSelectWeekend' class='timeSelectDay'>周末</div>
						<div id='timeSelectAll' class='timeSelectDay'>一周</div>
						<div id='timeSelectSelect' class='timeSelectDay'>选择日期</div>
					</div>
					<div id='gridcontainer-cate' style='display: none;'>
						<div id='cate-title' class='gridcontainer-title'>
							<div id='cate-title-name' class='gridcontainer-title-name'></div>
							<div class='expand-button' id='expand-button-cate'>
								<img class='expand-arrow' id='cate-title-button' src=''>
							</div>
						</div>
						<div id='cate-content'></div>
					</div>
					<div id='content-title' class='gridcontainer-title'>
						<div id='content-title-name'></div>
						
						<div class='expand-button' id='expand-button-content' style="display: none;">
							<img class='expand-arrow' id='content-title-button' src=''>
						</div>
						<div class='addsub-button' id='add-subscribe'>
							<div class='rss-button-name'>关注</div>
						</div>
					</div>
					<div id="gridcontainer" onselectstart="return false;">
					</div>
				</div>
			</div>
			<div class='clear'></div>
		</div>
	</div>
	
	<div class='sub-block-action' id="subaction">
		<div><img class='sub-block-action-img' src='/sub_images/rss_add.png'/></div>
		<div><img class='sub-block-action-img' src='/sub_images/rss_like.png'/></div>
		<div><img class='sub-block-action-img' src='/sub_images/comment.jpg'/></div>
		<div><img class='sub-block-action-img' src='/sub_images/sina.jpg'/></div>
	</div>
	<div id='sub-detail-pop' style='display: none;'>
		<div id='pop-detail-bar'>
			<div id='pop-detail-bar-title'></div>
			<div id='pop-detail-bar-close'>×</div>
		</div>
		<div id='pop-detail-div'>
			<iframe id='pop-detail-frame' src='' rel='nofollow'></iframe>
			<div id='pop-action'>
				<div id='pop-action-add' class='pop-action-button' title="添加到日程" ></div>
				<a href="" target="_blank" title="分享到微博"><div id='pop-action-sina' class='pop-action-button'></div></a>
			</div>
		</div>
	</div>
	<!--div id='close-pop' style='display: none;'><img src='http://www.365rili.com/sub_images/close.png'/></div-->
	<div id='pop-hint' class='hinthide'>
		<div id='pop-hint-content'>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>←&nbsp;&nbsp;</span> 左键头：上一条活动</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>→&nbsp;&nbsp;</span> 左键头：下一条活动</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>o&nbsp;&nbsp;</span> 字母o：打开活动弹窗</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>j&nbsp;&nbsp;</span> 字母j：上一条活动</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>k&nbsp;&nbsp;</span> 字母k：下一条活动</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>Enter</span> 回车：展开/收起分类栏</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>Esc&nbsp;</span> Esc键：关闭弹出窗口</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>=&nbsp;&nbsp;</span> 等号：关注/取消关注分类</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>Shift+j&nbsp;&nbsp;</span> shift+字母j：上一个分类</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>Shift+k&nbsp;&nbsp;</span> shift+字母k：下一个分类</div>
			<div class='pop-hint-item'><span class='pop-hint-item-key'>h&nbsp;&nbsp;</span> 字母h：关闭/开启提示</div>
		</div>
	</div>
	<div id="mask"></div>
	<div id='pop-notify'></div>
	<input type="text" name="btntxt" id="timeSeletcerInput" onchange="changeSelectTime()" style='display: none;'/>

<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery.md5.js"></script>
<script type="text/javascript" src="/js/jquery/jquery.hotkeys.js"></script>
<script type="text/javascript" src="/js/subscribe.js"></script>
<script type="text/javascript" src="/js/Calendar6.js"></script>
<script type="text/javascript">
	var c = new Calendar("c");
	document.write(c);
	
</script>
<script src="//www.365rili.com/js/lib/app.js"></script>
</body>
</html>
