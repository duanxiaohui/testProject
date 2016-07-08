<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.*" %>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%
	List<Map<String, Object>> choiceCalendarMaps  = (List<Map<String,Object>>)request.getAttribute("choiceCalendarMaps");
	List<Map<String, Object>> eventCityMaps  = (List<Map<String,Object>>)request.getAttribute("eventCityMaps");
	Map<Date,List<Map<String,Object>>> date2list = (Map<Date,List<Map<String,Object>>>)request.getAttribute("date2list");
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
	int thisPage = (Integer)request.getAttribute("thisPage");
	int totalPage =  (Integer)request.getAttribute("totalPage");
	int totalCount = (Integer)request.getAttribute("totalCount");
	long calendarId =  (Long)request.getAttribute("calendarId");
	String citycode =  (String)request.getAttribute("citycode");
	EventAdmin eventAdmin = (EventAdmin)request.getAttribute("eventAdmin");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>365日历活动及评论管理后台</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="/pages/activity_business_admin/css/main.css" rel="stylesheet">
<script>
	var G = {
		thisPage: <%=thisPage%>
	};
</script>
</head>
<body>
    <div class="activity_comments_top">
    	<div class="activity_comments_top_content">
    		<div class="activity_name">
    			<a href="/event/admin/logout.do">退出</a>
    			<%=eventAdmin.getName() %>
    		</div>
    		<div class="activity_logo">活动及评论管理后台</div>
    	</div>
    </div>
    <div class="main">
    	<div class="crumbs">所有活动</div>
		<div class="select_calendar_city">
			<a href="/event/admin/create.do" class="add_activity_btn">创建活动</a>
			<div class="select_calendar e_clear">
				<span>日历选择</span>
				<select name="calendarSel" id="calendarSel">
					<option value="0">所有日历</option>
					<%
					for(Map<String,Object> calendarMap : choiceCalendarMaps) {
						boolean selected = (Boolean)calendarMap.get("selected");
						if(selected) {						        
			        %>
						<option value="<%=calendarMap.get("calendarId") %>" selected><%=calendarMap.get("title") %></option>
					<%  } else { %>
					    <option value="<%=calendarMap.get("calendarId") %>"><%=calendarMap.get("title") %></option>
				    <%
					    }
					}
					%>
				</select>
			</div>
			<div class="select_city e_clear">
				<span>城市选择</span>
				<select name="citySel" id="citySel">
				<%
				   for(Map<String,Object> eventCityMap : eventCityMaps) {
					   boolean selected = (Boolean) eventCityMap.get("selected");
					   if(selected) {
				%>
					<option value="<%=eventCityMap.get("citycode") %>" selected><%=eventCityMap.get("cityname") %></option>
				<%
					   } else {
				%>
					<option value="<%=eventCityMap.get("citycode") %>"><%=eventCityMap.get("cityname") %></option>
				<%
					   }
				}
				%>
				</select>
			</div>
		</div>
	    <div class="activity_comments_content">
	    	<%for(Map.Entry<Date, List<Map<String,Object>>> entry : date2list.entrySet()) {%>
	    	<%String date = sdf.format(entry.getKey()); %>
	    	<!--acticity_date start-->
	    	<div class="acticity_date">
	    		<div class="activity_date_h2">编辑时间：<%=date %></div>
	    		<!--activity_date_list start-->
	    		<%for(Map<String,Object> eventMap: entry.getValue()) {%>
	    		<%
						boolean isExpire = (Boolean)eventMap.get("isExpire");
						// 0:展示 1:隐藏
						int status = (Integer)eventMap.get("status");
						String stateStr;
						String stateClass;
						if (isExpire) {
						    if (status == 0) {
						        stateStr = "已过期（展示中）";
						    } else {
						        stateStr = "已过期（隐藏）";
						    }
						   	stateClass = "overdue";
						} else {
						    if (status == 0) {
						        stateStr = "展示中";
						        stateClass = "show";
						    } else {
						        stateStr = "隐藏";
						        stateClass = "hide";
						    }
						}
				%>
	    		<div class="activity_date_list" data-id="<%=eventMap.get("eventId") %>">
	    			<dl class="e_clear">
	    				<dt>
	    					<!--show是展示 hide是隐藏 overdue是过期-->
	    					<div class="state <%=stateClass %>"><%=stateStr %></div>
	    					<a href="/event/admin/detail.do?eventId=<%=eventMap.get("eventId") %>"><img src="<%=eventMap.get("thumb") %>" alt="" width="150" height="150"></a>
	    					<!-- <img src="/pages/activity_business_admin/img.jpg" alt=""> -->
	    				</dt>
	    				<dd class="activity_date_txt">
	    					<h3><a href="/event/admin/detail.do?eventId=<%=eventMap.get("eventId") %>"><%=eventMap.get("title") %></a></h3>
	    					<p>时间：<%=eventMap.get("td") %></p>
	    					<p>地点：<%=eventMap.get("location") %></p>
	    					<p>人数限制：<%=eventMap.get("enrollLimit") %>人<span>已报名：<b><%=eventMap.get("showEnrollCount") %>人</b>（<%=eventMap.get("realEnrollCount") %>人）</span></p>
	    					<p>评论数：<%=eventMap.get("commentCount") %></p>
	    				</dd>
	    				<dd class="number">
	    					<a id="updateEnrollCount" href="javascript:;">修改报名人数</a>
	    				</dd>
	    			</dl>
	    			<div class="activity_date_list_footer">
	    				<div class="operation_btn">
	    					<%if(status == 0) {%>
	    					<a class="hideBtn" href="javascript:;">隐藏</a>
	    					<%} else { %>
	    					<a class="displayBtn" href="javascript:;">展示</a>
	    					<%} %>
	    					<a class="deleteBtn" href="javascript:;">删除</a>
	    				</div>
	    				<span>活动ID：<%=eventMap.get("businessNumber") %></span>
	    				<span>所属账号：<%=eventMap.get("businessName") %></span>
	    				<span>所属日历：<%=eventMap.get("calendarTitle") %></span>
	    				<span>最后编辑时间：<%=eventMap.get("modifiedTime") %></span>
	    			</div>
	    		</div>
	    		<!--activity_date_list end-->
	    		<%} %>
	    	</div>
	    	<!--acticity_date end-->
	    	<%} %>
	    </div>
    </div>
    <%if(totalCount > 0) {%>
    <div class="page e_clear">
    	<div class="page_content">
    		<%if (thisPage > 1) {%>
    		<a href="/event/admin/index.do?page=<%=thisPage-1%>&citycode=<%=citycode%>&calendarId=<%=calendarId%>" class="pev">上一页</a>
    		<%} %>
	    	<ul class="e_clear">
	    	<%for (int i = 1; i <= totalPage; i++) {%>
	    		<%if(i==thisPage) {%>
	    		<li class="on"><a><%=i%></a></li>
	    		<%} else {%>
				<li><a href="/event/admin/index.do?page=<%=i%>&citycode=<%=citycode%>&calendarId=<%=calendarId%>"><%=i%></a></li>	    		
	    		<%} %>
	    	<%} %>
	    	</ul>
	    	<%if (thisPage < totalPage) {%>
	    	<a href="/event/admin/index.do?page=<%=thisPage+1%>&citycode=<%=citycode%>&calendarId=<%=calendarId%>" class="next">下一页</a>
	    	<%} %>
		    <span class="all_page">共<%=totalPage %>页</span>
    	</div>
    </div>
    <%} %>
    <div class="alert_layer deleteActivity none">
		<h3>提示</h3>
		<div class="alert_layer_content">
			<p>确定删除该日程？</p>
		</div>
		<div class="alert_btn">
			<a href="javascript:;" class="cancel_btn">取消</a><a href="javascript:;" class="sure_btn">确定</a>
		</div>
	</div>
	<div class="alert_layer edit_number none">
		<h3>请输入人数</h3>
		<div class="alert_layer_content">
			<input id="enrollCount" type="text">
		</div>
		<div class="alert_btn">
			<a href="javascript:;" class="alert_cancel_btn">取消</a><a href="javascript:;" class="alert_save_btn">保存</a>
		</div>
	</div>
    <script src="/js/jquery/jquery-1.8.3.min.js"></script>
    <script src="/pages/activity_business_admin/js/activity_list.js"></script>
</body>
</html>