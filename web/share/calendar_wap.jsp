<%@ page contentType="text/html;charset=utf-8" %>
<%	
	String calendarName = (String) request.getAttribute("calendarName");
	Integer calendarID = (Integer) request.getAttribute("calendarID");
	String data = request.getAttribute("data") == null ? null : (String) request.getAttribute("data");
	String encode_data = data.replaceAll("\n", " ");
	Boolean isPublic = (Boolean) request.getAttribute("is_public");
	String theme = (String) request.getAttribute("theme");
	Integer is_sub = (Integer) request.getAttribute("is_sub");
	String calendarDesc = (String) request.getAttribute("calendarDesc");
	calendarDesc = calendarDesc.replaceAll("\n", "").replaceAll("\"", "'");
	String creator = (String) request.getAttribute("creator");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta id="viewport" name="viewport" content="width=320;width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<title>365日历</title>
<link href="/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet"/>
<link href="/share/style/theme.css?t=20140412" rel="stylesheet"/>
<style>[ng-cloak] { display: none; }</style>
<script type="text/javascript">
    var G = {
        cid: <%=calendarID%>,
        isPublic: <%=isPublic%>,
        data: '<%=data%>',
        theme: '<%= theme%>',
        title: "<%=calendarName%>",
        description: "<%=calendarDesc%>",
        creator:"<%=creator%>",
        is_sub: <%=is_sub%>
    };
</script>
</head>
<body>
<div class="main_area">
	<div class="area_top">
		<div class="source">365日历</div>
		<p class="cal_title">这是我正在使用的公众日历，点击下面【关注此日历】，一起加入吧。</p>
		<p>日历名称：<span class="cal_sum_name"><%=calendarName %></span></p>
		<p>日历介绍：<span class="cal_sum_desc"><%=calendarDesc %></span></p>
		<div class="btn_box">
			<a href="javascript:;>" class="collection_layer_btn">关注此日历</a>
		</div>
	</div>
	<div class="phone_area" ng-app="365_calendar" ng-controller="CalendarShareController" ng-cloak>
		<div class="phone_skin" ng-style="theme.bgu">
			<div class="phone_header">
				<div class="phone_header_title" ng-style="theme.nt">{{calendarTitle}}</div>
				<!--  <div class="phone_header_menu">Ã</div> -->
			</div>
			<div class="phone_activity">
				<ul>
					<li ng-repeat="schedule in ScheduleModel.selectedDateItem.schedules" class="schedule_item" ng-style="theme.scheduleStyle">
						{{schedule.text}}
					</li>				
				</ul>
			</div>
			<div class="calendar">
				<div class="calendar_header">
					<div class="calendar_header_year_month" ng-style="theme.ynm">{{yearMonthStr}}</div>
				</div>
				<div class="calendar_panel">
					<table cellspacing="0" cellpadding="0" width="100%" >
						<tr class="calendar_th">
							<th class="workday" ng-style="theme.wdt">周一</th>
							<th class="workday" ng-style="theme.wdt">周二</th>
							<th class="workday" ng-style="theme.wdt">周三</th>
							<th class="workday" ng-style="theme.wdt">周四</th>
							<th class="workday" ng-style="theme.wdt">周五</th>
							<th class="weekend" ng-style="theme.wkt">周六</th>
							<th class="weekend" ng-style="theme.wkt">周日</th>
						</tr>
					</table>
					<table cellspacing="0" cellpadding="0" width="100%" class="calendar_table">
						<tr ng-repeat="row in ScheduleModel.monthRows">
							<td class="day_box" ng-repeat="cell in row.cells" ng-class="{day_box_right:cell.day==0}" ng-style="theme.l">
								<div class="day_box_cell" ng-hide="cell.isMonthBefore||cell.isMonthAfter" ng-style="cell.selected && theme.dsb" ng-click="selectDateItem(cell)">
									<span class="solar-text" ng-style="theme.ddt">{{cell.solar}}</span>
									<img ng-src="{{theme.mu}}" class="schedule_icon" ng-show="cell.schedules.length!=0"/>
								</div>
								<!--  <div class="day_box_lunar {lunarClass}">
									<span class="lunar-text">{{cell.lunar}}</span>
								</div>
								-->
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="rili_about">
		<h3>关于「365日历」</h3>
		<p>中国最优秀的日历软件，上亿人在使用，您可进行个人日程管理，与朋友一起使用群组日历，也可关注球赛赛程、演出电影、折扣活动等各种有意思的公众日历。</p>
	</div>
	<div class="btn_box">
		<a href="javascript:;>" class="collection_layer_btn">关注此日历</a>
	</div>
	<div class="footer">
		&copy; 2014版权所有
	</div>

	<div class="collection_layer"  style="display:none;">
		<a href="javascript:;" class="close_coll_layer"></a>
		<p class="installed_txt">已经安装365日历</p>
			<%
			if(is_sub != null && is_sub == 1)
			{
			%>	
			<a href="javascript:;" class="collection_btn">关注此日历</a>
			<%
			}
			%>
		<p class="not_installed_txt">没有安装365日历？</p>
		<a href="javascript:;" class="down_btn"  target="_blank">下载365日历</a>
	</div>
	<div class="weixin_tips_layer" style="display:none;">
		<div class="weixin_tips_txt1">
			<div class="weixin_tips_box">
				<h2>第一步</h2>
				<p>点击右上角的分享按钮<img src="http://www.365rili.com/share/images/shar_icon.png" class="shar_icon"/></p>
				<h2>第二步</h2>
				<p>选择一款浏览器打开<img src="http://www.365rili.com/share/images/shar_bow2.png" class="shar_bow"/><img src="http://www.365rili.com/share/images/shar_bow1.png"  class="shar_bow"/></p>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript" src="/js/app/bower_components/angular/angular.js"></script>
<script type="text/javascript" src="/js/app/bower_components/angular-touch/angular-touch.min.js"></script>
<script type="text/javascript" src="/js/newweb/common.js?v=20140411"></script>
<script type="text/javascript" src="/js/newweb/solarAndLunar.js?v=20140411"></script>
<script type="text/javascript" src="/js/angular/controller/calendarShareCtrl.js?v=20140513"></script>
<script type="text/javascript" src="/js/angular/model/scheduleModel.js?v=20140411"></script>
<script type="text/javascript" src="/share/js/theme/bootstrap.js?t=20140709"></script>
<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
</body>
</html>