<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.User" %>
<%
	User u = (User)request.getAttribute("user");
%>

<head>
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="万年历,万年历查询,黄历,黄历查询,365,日历,阳历,阴历,公历,老皇历,黄道吉日,星座,赛程,赛事,日程,运程,共享,客户端,桌面日历,手机日历" />
<meta name="Description" content="365日历网是专业的日历门户网站，可以在PC、手机、网站之间同步数据。同时还提供各种日历日程信息，包括黄道吉日、农历、黄历、星座运程、体育赛程、电视节目等。" /> 
<meta property="qc:admins" content="5366234547636521416375" />
<meta name="baidu_union_verify" content="b9bea6069f88d9d2840d4acba0acc2be">
<link rel="shortcut icon" href="/favicon.ico"/>
<link rel="Bookmark" href="/favicon.ico"/>
<title>365日历网(www.365rili.com)_万年历_桌面日历_手机日历_黄道吉日_星座运程</title> 
<link rel="stylesheet" type="text/css" href="v4/css/base.css?v=20131219" media="screen" />
<link rel="stylesheet" type="text/css" href="v4/css/index.css?v=20131219" media="screen" />
</head>
<body>
<div class="rili_v4_focus">
	<ul id="focus_box">
		<li class="f1"></li>
		<li class="f2"></li>
		<li class="f3"></li>
	</ul>
	<div class="focus_tab">
		<ul>
			<li class="on" id="focus_tab_0"></li>
			<li id="focus_tab_1"></li>
			<li id="focus_tab_2"></li>
		</ul>
	</div>
	<div class="rili_v4_top e_clear">
		<div class="logo e_clear">
			<a href="http://www.365rili.com"><img src="v4/images/logo.png" alt="365日历"/></a>
		</div>
		<div class="nav">
			<ul class="e_clear">
				<li class="public"><a href="http://open.365rili.com" target="_blank">公众平台</a></li>
				<li class="down"><a href="v4/product.html">产品下载</a></li>
				<li class="personrl"><a href="/main/calendar.do">个人日历</a></li>
				<li class="home"><a href="/" class="on">首页</a></li>
			</ul>
		</div>
	</div>
</div>
<div class="rili_v4_product e_clear">
	<div class="iphone_list">
		<div class="list_title">
			<p>365日历</p>
			<h3>手机版</h3>
		</div>
		<div class="list_content">
			<div class="iphone_code"><img src="v4/images/index_coco_code.jpg"/></div>
			<div class="iphone_link">
				<a href="http://d2.365rili.com/coco.apk" class="android_icon"></a>
				<a href="http://itunes.apple.com/cn/app/365ri-li-xin-ban/id642101382?ls=1&mt=8" target="_blank" class="ios_icon"></a>
			</div>
		</div>
	</div>
	<div class="pc_list">
		<div class="list_title">
			<p>365日历</p>
			<h3>PC版</h3>
		</div>
		<div class="list_content">
			<p>独立Windows应用，提供丰富的桌面插件。</p>
			<p>云同步、云存储一个账号，手机、Web完美切换，无缝同步</p>
			<a href="http://d2.365rili.com/pc/update/365rili.exe" class="btn">下载安装</a>
		</div>
	</div>
	<div class="web_list">
		<div class="list_title">
			<p>365日历</p>
			<h3>web在线版</h3>
		</div>
		<div class="list_content">
		<% if(u!=null){%>
			<div class="login_box">
				<div class="username"><div class="username_box"><%=u.getUsername() %></div><a href="/account/logout.do" class="exit_user">安全退出</a></div>
				<div class="login_txt"></div>
				<a href="/main/calendar.do" class="inCalendar_btn">进入您的日历</a>
			</div>
		<%}else{%>
			<p>轻松创建个人日历，支持与Google日历同步，与手机日历同步；与小伙伴分享日历、日程；并有待办事项、生日等实用插件。</p>
			<a href="/account/login.do" class="btn">登录我的日历</a><a href="/account/login.do?page=register">立即注册</a>
		<%}%>
		</div>
	</div>
</div>
<div class="rili_v4_footerbox">
	<div class="rili_v4_about">
		<a href="v4/prospect.html">公司远景</a><a href="http://www.365rili.com/v3/milestone/index.htm" target="_blank">里程碑</a><a href="v4/join.html">加入我们<span class="num"></span></a><a href="v4/faq.html">常见问题</a><a href="v4/service.html">服务条款</a><a href="v4/privacy.html">隐私政策</a><a href="http://bbs.365rili.com" target="_blank">在线支持</a><a href="v4/contact.html">联系我们</a>
	</div>
	<div class="rili_v4_footer">
		<p>&copy; 2016 365rili Inc. 京ICP证130262号 </p>
		<p>京公网安备11010102002007号</p>
	</div>
</div>
<div class="coop_link e_clear">
	<a href="http://pro.25pp.com" target="_blank" class="link_pp"><img src="v4/images/link_pp.jpg"/></a>
	<a href="http://zs.91.com/" target="_blank" class="link_91"><img src="v4/images/link_91.jpg"/></a>
	<a href="http://www.360.cn/shoujizhushou/" target="_blank" class="link_360"><img src="v4/images/link_360.jpg"/></a>
	<a href="http://android.myapp.com/" target="_blank" class="link_tc"><img src="v4/images/link_tc.jpg"/></a>
	<a href="http://www.wandoujia.com/" target="_blank" class="link_wdj"><img src="v4/images/link_wdj.jpg"/></a>
	<a href="http://as.baidu.com/a/bdsuite?qd=100027p" target="_blank" class="link_baidu"><img src="v4/images/link_baidu.jpg"/></a>
</div>
<script src="//www.365rili.com/js/lib/app.js"></script>
</body>
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
$(function(){
	var isClicked = false;
	$(".focus_tab li").click(function(){
		if($(this).hasClass("on"))
			return;
		var from = $(".focus_tab .on").attr("id");
		from = parseInt(from.substr(10));
		var to = $(this).attr("id");
		to = parseInt(to.substr(10));
		isClicked = true;
		imageSlider(from, to);
	});
	
	function imageSlider(from, to){
		$("#focus_tab_" + from).removeClass("on");
		$("#focus_tab_" + to).addClass("on");
		
		$("#focus_box li").eq(from).animate({opacity:0},1000,function(){
			$(this).hide();
		})
		$("#focus_box li").eq(to).css("opacity",0).show().animate({opacity:1}, 1000);
		
	}
	
	setInterval(function(){
		if(isClicked){
			isClicked = false;
			return;
		}
		var index = $(".focus_tab .on").attr("id");
		index = parseInt(index.substr(10));
		imageSlider(index, (index + 1) % 3)
	}, 5000);
	$(".rili_v4_product li").hover(
		function(){
			$(this).addClass("on");
		},
		function(){
			$(this).removeClass("on");
		}
	);
	function getHello(date){
		var hour = date.getHours(), text;
		if (hour < 6) {
			text = "凌晨好，";
		} else if (hour < 9) {
			text = "早上好，";
		} else if (hour < 12) {
			text = "上午好，";
		} else if (hour < 14) {
			text = "中午好，";
		} else if (hour < 17) {
			text = "下午好，";
		} else if (hour < 19) {
			text = "傍晚好，";
		} else if (hour < 22) {
			text = "晚上好，";
		} else {
			text = "深夜好，";
		}
		return text;
	}
	var idate=new Date(), y, m, d, week,greet;
	y=idate.getFullYear();
	m=idate.getMonth()+1;
	d=idate.getDate();
	week=["星期天","星期一","星期二","星期三","星期四","星期五","星期六"][idate.getDay()];
	greet=getHello(idate);
	$(".login_txt").html(greet+'今天是'+y+'年'+m+'月'+d+'日'+week);
});
</script>
</html>
