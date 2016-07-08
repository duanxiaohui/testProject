<%@ page contentType="text/html;charset=utf-8" %>
<%
String appID = (String)request.getAttribute("appID");
String openID = (String)request.getAttribute("openID");
String openKey = (String)request.getAttribute("openKey");
String groupOpenID = (String)request.getAttribute("groupOpenID");
String pf = (String)request.getAttribute("pf");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>365日历-QQ群日历</title>
<link rel="stylesheet" type="text/css" href="/webapp/assets/style/base.css?v=20140123">
<link rel="stylesheet" type="text/css" href="/webapp/assets/style/qqgroup.css?v=201401235">
<link rel="stylesheet" type="text/css" href="/css/jquery-ui-1.9.2.custom.min.css"/>
<link rel="stylesheet" type="text/css" href="/gui/style/jquery.jscrollpane.css"/>
<script>
	G = {
		appID:"<%=appID%>",
		openID:"<%=openID%>",
		openKey:"<%=openKey%>",
		groupOpenID:"<%=groupOpenID%>",
		pf:"<%=pf%>",
		websocket:true
	}
</script>
</head>
<body>
	<div class="qqgroup_calendar_wrapper">
		<div class="header">
			<a href="javascript:;" class="calendar_function"></a>
			<a href="javascript:;" class="calendar_btn_setting">在手机上使用</a>
			<a href="javascript:;" class="setting_return_btn none">返回</a>
			<div class="view_box e_clear">
				<ul class="header_btn_list">
					<li class="month_tab on none">月</li>
					<li class="day_tab none">日</li>
					<li class="setting_tab none"></li>
				</ul>
			</div>
			<div class="calendar_icon_box"><div class="calendar_icon"><img src="" style="width:46px;"/></div></div>
			<div class="calendar_title">群日历</div>
		</div>
		<div class="content">
			<div class="calendar_view">
				<div class="month_view"></div>
				<div class="day_view none"></div>
			</div>
			<div class="setting_view"></div>
		</div>
	</div>
<div class="down_layer none">
	<a href="javascript:;" class="down_layer_colse"></a>
	<div class="four mt625">
		<p>QQ登陆，同步后。<br/>进入我的日历后，一直向左滑动<br/>或点击“我的日历”进入切换日历界面<br/>找到QQ群日历</p>
		<a href="javascript:;" class="four_btn">完成</a>
	</div>
	<div class="first">
		<p class="title">下载365日历手机版<br/>在手机上也可以访问QQ群日历！</p>
		<div class="code_box e_clear">
			<div class="coco_btn">
				<a href="http://d2.365rili.com/coco.apk" target="_blank"><img src="/webapp/images/andiord_icon.jpg"/></a>
				<a href="http://itunes.apple.com/cn/app/365ri-li-xin-ban/id642101382?ls=1&mt=8"  target="_blank"><img src="/webapp/images/iphone_icon.jpg"/></a>
				<p>在各大市场搜索“365日历”下载</p>
			</div>
			<div class="coco_code">
				<img src="/webapp/images/index_coco_code.png"/>
				<p>扫一扫下载</p>
			</div>
		</div>
		<a href="javascript:;" class="first_btn_365">已有365日历账号</a>
		<a href="javascript:;" class="first_btn">下一步</a>
	</div>
	<div class="second">
		<a href="javascript:;" class="second_btn">下一步</a>
	</div>
	<div class="three">
		<p>进入我的日历后，一直向左滑动<br/>或点击“我的日历”进入切换日历界面<br/>找到QQ群日历</p>
		<a href="javascript:;" class="three_btn">完成</a>
	</div>
</div>
<div class="boot_box none">
	<div class="boot_logo"></div>
	<div class="boot_wappr">
		<div class="boot_first">
			<div class="boot_txt">
				<h3>“兴趣小组”群组日历</h3>
				<p>出行计划、聚会通知、组织活动、群内大事记…精彩不容错过</p>
			</div>
				<div class="boot_img">
					<img src="/webapp/images/loading_pic1.jpg"/>
				</div>
				<a href="javascript:;" class="boot_next_btn">下一页</a>
		</div>
		<div class="boot_second">
			
			<div class="boot_txt">
				<h3>“工作”群日历</h3>
				<p>工作计划、公司活动、会议安排一目了然，大家都看得见…</p>
			</div>
			<div class="boot_img">
				<img src="/webapp/images/loading_pic2.jpg"/>
			</div>
			<a href="javascript:;" class="boot_next_btn">下一页</a>
		</div>
		<div class="boot_three">
			<div class="boot_txt">
				<h3>“同学”群日历</h3>
				<p>课程表、班级活动、同学生日、课堂作业…不要迟到哦</p>
			</div>
			<div class="boot_img">
				<img src="/webapp/images/loading_pic3.jpg"/>
			</div>
			<a href="javascript:;" class="boot_next_btn">下一页</a>
		</div>
		<div class="boot_four">
			<div class="boot_txt">
				<h3>“家庭”群日历</h3>
				<p>亲人生日、纪念日、宝宝成长…在这里记录每一个温馨的日子</p>
			</div>
			<div class="boot_img">
				<img src="/webapp/images/loading_pic4.jpg"/>
			</div>
			<a href="javascript:;" class="boot_star_btn">开始使用吧</a>
		</div>
	</div>
</div>
<div class="boot_five none">
	<a href="javascript:;" class="boot_colse_btn">知道了</a>
</div>
<div class="bg"></div>
<div class="boot_box_new"></div>
<script src="/webapp/sea-modules/seajs/seajs/2.1.1/sea.js?+jquery"></script>
<script src="/webapp/sea-modules/jqueryui/jquery-ui-1.9.2.custom.min.js"></script>
<script src="/webapp/sea-modules/jqueryui/jquery.jscrollpane.js"></script>
<script src="/webapp/sea-modules/jqueryui/jquery.fs.selecter.js"></script>
<script type="text/javascript" charset="utf-8" src="http://fusion.qq.com/fusion_loader?appid=100296108&platform=qqqun"></script>
<script>
  var version = dev ? new Date().getTime() : "2014022003";
  seajs.config({
	base: "/webapp/sea-modules/",
	map:[['.js', '.js?v=' + version]]
  });
  seajs.use(dev ? "/webapp/src/qqgroup" : "webapp/main/1.0.0/qqgroup");
  //test sendObjMsg
  //seajs.use("/webapp/src/server/fusion", function($fusion){
  //	  $fusion.sendObjMsg(G.groupOpenID, "groupCalendar");
  //});
</script>
<div style="display:none;">
	<script src="//www.365rili.com/js/lib/app.js"></script>
</div>
</body>
</html>