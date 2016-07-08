<%@ page contentType="text/html;charset=utf-8" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="/css/jquery-ui-1.9.2.custom.min.css">
<link href="/css/jquery.jscrollpane.css" rel="stylesheet"/>
<link href="/css/lightbox.css" rel="stylesheet"/>
<link href="/css/calendar1.css" rel="stylesheet">
<link href="/css/tuanwei.css" rel="stylesheet">
<title>团委管理后台</title>
<script type="text/javascript">
	var G = {
	        currUser: {
	        	id:"tw_admin"
	        },
	        currDate: new Date()
	    };
</script>
</head> <body>
	<div class="calendar_header">
		<div class="header_set">
			<a href="/tuanwei/tw_logout.do" class="sign_out_btn"></a>
		</div>
		<div class="user_info">
			<span id="sp_user_info"></span>
		</div>
	</div>
	<div id="div_calendar_list" class="my_calendar_rightnone my_calendar e_clear">
		<div id="div_calendar_left" class="my_calendar_left">
			<!-- <div id="lnk_left_switcher" class="left_visibility" title="隐藏日历列表"></div> -->
			<dl>
				<dt style="background-position:12px -76px;">用户管理</dt>
				<dd>
					<ul class="user_manage_ul"><li>所有用户</li></ul>
				</dd>
			</dl>
			<dl class="my_calendar_nav">
				<dt class="e_clear">
					<!-- <a href="javascript:;" class="left_create_schedule_btn"></a> -->
					<a href="javascript:;" hidefocus="true" class="open js_cldname">消息管理</a>
				</dt>
				<dd>
					<ul id="js-calendarList"></ul>
				</dd>
			</dl>
		</div>
		<div class="user_management">
			<div class="admin_user">
				<div class="search_user">
					<input type="text" class="search_user_text" />
					<a href="javascript:;" class="search_btn">搜索用户</a>
					<a href="javascript:;" class="show_user_btn none" style="margin-left:15px;">显示全部用户</a>
					
				</div>
				<div class="user_list">
					<div class="user_list_table">
						<table class="table_th">
							<tr>
								<th>姓名</th>
								<th>单位及职别</th>
								<th>手机号码</th>
								<th>网络账号</th>
								<th>平台</th>
								<th>类别</th>
								<th>备注信息</th>
								<th>操作</th>
							</tr>
						</table>
						<table class="user_list_td">
						</table>
					</div>
					<div class="user_list_pages">
						<ul></ul>
					</div>
				</div>
			</div>			
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
		<h2>请勾选想要在集合中显示的分组消息</h2>
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
	<script src="/js/jquery/jquery-1.8.3.min.js"></script>
	<script src="/js/jquery/jquery-ui-1.9.2.custom.min.js"></script>
	<script src="/js/jquery/jquery.lightbox.js"></script>
	<script src="/js/jquery/jquery.jscrollpane.js"></script>
	<script src="/js/lib/amplify.core.min.js"></script>
	<script>
		var require = {urlArgs:"20141021"};
	</script>
    <script src="/js/lib/require.min.js" data-main="/js/rebuild/tw_admin/main"></script>
</body>
</html>