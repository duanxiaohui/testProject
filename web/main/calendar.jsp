<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.User" %>
<%@ page import="com.rili.web.utils.Baidu" %><%
	User u = (User)request.getAttribute("user");
	String googleId = (String)request.getAttribute("googleId");
	String outlookId = (String)request.getAttribute("outlookId");
	Integer emailSituation = (Integer)request.getAttribute("emailSituation");
	
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss"); 
	java.util.Date currentTime = new java.util.Date();
	String currDate = formatter.format(currentTime);
	java.text.SimpleDateFormat yearformatter = new java.text.SimpleDateFormat("yyyy"); 
	String currYear = yearformatter.format(currentTime);
	String url = (String) request.getAttribute("url");
	String needBind = (String)request.getAttribute("needBind");
	needBind = needBind == null || needBind == "" ? ""  : needBind;
	String autoRegBy = (String)request.getAttribute("autoRegBy");
%>
<!DOCTYPE HTML>
<html class="web">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" />
	<meta name="Keywords" content="万年历,万年历查询,黄历,黄历查询,365,日历,阳历,阴历,公历,老皇历,黄道吉日,星座,赛程,赛事,日程,运程,共享,客户端,桌面日历,手机日历" />
	<meta name="Description" content="365日历网是专业的日历门户网站，可以在PC、手机、网站之间同步数据。同时还提供各种日历日程信息，包括黄道吉日、农历、黄历、星座运程、体育赛程、电视节目等。" />
	<title>365日历网(www.365rili.com)_万年历_桌面日历_手机日历_黄道吉日_星座运程</title>
	<link href="/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet"/>
	<link href="/gui/style/jquery.jscrollpane.css" rel="stylesheet"/>
	<link href="/css/lightbox.css" rel="stylesheet"/>
	<link href="/css/calendar1.css?v=20141121" rel="stylesheet"/>
	<link href="/pages/ui-lib/css/ui-lib.css" rel="stylesheet">
	<link href="/css/birthday.css" rel="stylesheet"/>
	<script type="text/javascript">
    	var G = {
	        currUser: {
	            "id": "<%=u.getUserId()%>",
	            "username": "<%=u.getUsername() %>",
	            "email": "<%=u.getEmail() %>"
	        },
	        googleID: "<%=googleId %>",
	        outlookID: "<%=outlookId %>",
	        emailSituation: "<%=emailSituation %>",
	        needBind: "<%=needBind %>",
	        currDate: new Date("<%=currDate%>"),
			autoRegBy: "<%=autoRegBy%>"
	    };
	</script>
	<script>
		if(typeof(js365) != "undefined"){
			document.documentElement.className = "pc";
		}
	</script>
</head>
<body>
	<!-- 论坛统一登录的iframe 勿删 -->
	<iframe frameborder="0" src="<%= url %>" style="position:absolute;top:-10px;left:-10px;width:1px;height:1px;"></iframe>
	<div class="calendar_header">
		<div class="header_set">
			<a href="/account/logout.do" class="sign_out_btn"></a> <i class="i_line">|</i>
			<a href="/account/manage.do" class="calendar_site"></a>
		</div>
		<div class="user_info">
			<a href="/" class="return_btn"></a>
			<span id="sp_user_info"></span>
		</div>
	</div>
	<div id="div_calendar_list" class="my_calendar_rightnone my_calendar e_clear">
		<div id="div_calendar_left" class="my_calendar_left">
			<div id="lnk_left_switcher" class="left_visibility" title="隐藏日历列表"></div>
			<dl class="my_calendar_nav">
				<dt class="e_clear">
					<a href="javascript:;" class="left_create_schedule_btn"></a>
					<a href="javascript:;" hidefocus="true" class="open js_cldname">我的日历</a>
				</dt>
				<dd>
					<ul id="js-calendarList"></ul>
				</dd>
			</dl>
			<dl class="palug_nav">
				<dt class="e_clear">
					<a href="javascript:;" hidefocus="true" class="open js_cldname">日历插件</a>
				</dt>
				<dd>
					<ul id="ul_plugin_list">
						<li class="e_clear">
							<a href="javascript:;" hidefocus="true" class="almanac iepng" jspath="loaded" pluginname="todo">待办事项</a>
						</li>
						<li class="e_clear">
							<a href="javascript:;" hidefocus="true" class="birthday iepng"jspath="loaded" pluginname="birthday" >生日</a>
						</li>
					</ul>
				</dd>
			</dl>
		</div>
		<div class="calendar_right_newbox">
			<div id="div_today" class="today">
				<div class="calendar_month">
					<ul id="ul_view_switcher">
						<li tab="list">列表</li>
						<li tab="month">月历</li>
						<li tab="week">周历</li>
                        <!-- <li tab="day">日</li> -->
					</ul>
				</div>
				<div class="today_calendar e_clear">
					<div class="today_calendar_data none" id="today_calendar_year_month">
						<span id="sp_year" title="滚动鼠标滚轮调整年份"></span>
						年
						<span id="sp_month" title="滚动鼠标滚轮调整月份"></span>
						月
					</div>
					<div class="today_calendar_data none" id="today_calendar_week">
						<span id="sp_week"></span>
					</div>
					<div class="today_calendar_pn">
						<a id="lnk_prev" delta="-1" href="javascript:;" class="prev"
							hidefocus="true" title="前一个月" ng-click="monthChanged(-1)"></a>
						<a id="lnk_next" delta="1" href="javascript:;" hidefocus="true" class="next" title="后一个月" ng-click="monthChanged(1)"></a>
					</div>
					<a id="lnk_today" delta="0" href="javascript:;"
						class="today_btn none" hidefocus="true" title="切换回今天">今天</a>
				</div>
				<a href="javascript:location.reload();" class="refresh">刷新</a>
			</div>
			<div class="calendar_view">
				<div class="my_calendar_center calendar_sub_view">
					<div class="month_view_title none">
						<p id="p_only_hassch">只显示有日程的天</p>
					</div>
					<div id="div_calendar_panel" class="calendar"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="schedule_set_layer none">
		<h2>请勾选想要在集合中显示的日历</h2>
		<ul class="e_clear"></ul>
		<div class="schedule_set_bottom">
			<a href="javascript:;"  class="save_ary">保存</a>
			<a href="javascript:;" class="selectCtrl"></a>
		</div>
		<div class="layer_arrow_left"> <em class="arrow_10"></em> <em class="arrow_9"></em>
			<em class="arrow_8"></em>
			<em class="arrow_7"></em>
			<em class="arrow_6"></em>
			<em class="arrow_5"></em>
			<em class="arrow_4"></em>
			<em class="arrow_3"></em>
			<em class="arrow_2"></em>
			<em class="arrow_1"></em>
		</div>
	</div>

	<div class="new_add_schdule ui-corner-all none">
		<h2>
			<a href="javascript:;"></a>
			<div class=""></div>新建日程
		</h2>
		<div class="new_add_schdule_content">
			<dl class="e_clear">
				<dt class="fl">时间：</dt>
				<dd>
					<div class="schdule_time e_clear">
						<div class="select_div fl">
							<h3>公历</h3>
							<ul>
								<li>公历</li>
								<li>农历</li>
							</ul>
						</div>
						<div class="e_clear fl">
							<div class="fl">
								<h3>2014年</h3>
								<ul>
									<li></li>
								</ul>
							</div>
							<div>
							<h3>5月</h3>
								<ul>
									<li></li>
								</ul>
							</div>
							<div>
							<h3>27</h3>
								<ul>
									<li></li>
								</ul>
							</div>
						</div>
						<div class="fl e_clear">
							<div class="fl"></div><span class="fl">时</span><div class="fl"></div><span class="fl">分</span>
						</div>
					</div>
				</dd>
			</dl>
			<dl>
				<dt>提醒：</dt>
				<dd>
					<div class="schdule_reminder">
						<ul class="e_clear">
							<li class="on">正点</li>
							<li>5分前</li>
							<li>10分前</li>
							<li>30分前</li>
							<li>一小时</li>
							<li>一天前</li>
							<li>三天前</li>
						</ul>
					</div>
				</dd>
			</dl>
			<dl>
				<dt>重复：</dt>
				<dd>
					<div class="schdule_repeat">
						<ul class="e_clear">
							<li class="on">不重复</li>
							<li>每天</li>
							<li>每周</li>
							<li>每月</li>
							<li>每年</li>
						</ul>
						<div class="">
							<div class=""></div>
							<div class=""></div>
							<div class=""></div>
							<div class=""></div>
							<div class=""></div>
						</div>
					</div>
				</dd>
			</dl>
			<dl>
				<dt>内容：</dt>
				<dd>
					<div class="schdule_txt">
						<textarea></textarea>
					</div>
				</dd>
			</dl>
			<dl>
				<dt>图片：</dt>
				<dd>
					<div class="schdule_img">
						<ul>
							<li></li>
							<li></li>
						</ul>
					</div>
					<p>最多上传9张图片，每张<100K</p>
				</dd>
			</dl>
			<dl>
				<dt>链接：</dt>
				<dd>
					<div class="schdule_url">
						<input type="text" placeholder="输入URL"/>
					</div>
				</dd>
			</dl>
			<dl>
				<dt>地址：</dt>
				<dd>
					<div class="schdule_address">
						<input type="text" placeholder="输入地址"/><a href="javascript:;" class="map_btn">在地图上标记</a>
					</div>		
				</dd>
			</dl>
		</div>
		<div class="schdule_botton">
			<a href="javascript:;">取消</a>
			<a href="javascript:;">保存</a>
		</div>
	</div>
	<div style="display:none;">
    	<script src="//www.365rili.com/js/lib/app.js"></script>
    </div>
	<script src="/js/jquery/jquery-1.8.3.min.js"></script>
	<script src="/js/jquery/jquery-ui-1.9.2.custom.min.js"></script>
	<script src="/js/jquery/jquery.lightbox.js"></script>
	<script src="/js/jquery/jquery.jscrollpane.js"></script>
	<script src="/js/lib/amplify.core.min.js"></script>
	<script>
		var require = {urlArgs:"20160614"};
	</script>
    <script src="/js/lib/require.min.js" data-main="/js/dist/calendar"></script>
</body>
</html>