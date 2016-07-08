<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="com.rili.common.beans.*" %>
<%
	String title = (String)request.getAttribute("title");
	String mainPic = (String)request.getAttribute("mainPic");
	int commentCount = (Integer)request.getAttribute("commentCount");
	List<Map<String,Object>> replys = (List<Map<String,Object>>)request.getAttribute("replys");
	int totalPage = (Integer)request.getAttribute("totalPage");
	int thisPage = (Integer)request.getAttribute("thisPage");
	long eventId = (Long)request.getAttribute("eventId");
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
		<div class="crumbs"><a href="/event/admin/index.do">所有活动</a><span>&gt;</span><a href="/event/admin/detail.do?eventId=<%=eventId%>">活动详情</a><span>&gt;</span>评论详情</div>
	</div>
	<div class="comments_content">
		<div class="comments_top e_clear">
			<div class="activity_img">
				<img src="<%=mainPic %>" width="125" height="125"/>
			</div>
			<div class="activity_comments_title">
				<h2><%=title %></h2>
				<p>评论数：<%=commentCount %></p>
				<!--  <a href="javascript:;">关闭评论</a> -->
			</div>
		</div>
		<div class="comments_all_list">
			<h3>所有评论</h3>
			<ul>
				<%for(Map<String, Object> reply : replys) {%>
				<li data-id="<%=reply.get("replyId")%>">
					<div class="username"><%=reply.get("username") %></div>
					<p><%=reply.get("content") %></p>
					<div class="comments_all_list_bottom">
						<a href="" class="del_comments">删除</a>
						<div class="comments_time"><%=reply.get("created") %></div>
					</div>
				</li>
				<%} %>
			</ul>
		</div>
		<%if(commentCount > 0) {%>
		<div class="page e_clear">
			<div class="page_content">
				<%if (thisPage > 1) {%>
				<a href="/event/admin/comments.do?eventId=<%=eventId%>&page=<%=thisPage-1%>" class="pev">上一页</a>
				<%} %>
				<ul class="e_clear">
				<%for (int i = 1; i <= totalPage; i++) {%>
					<%if(i==thisPage) {%>
					<li class="on"><a><%=i%></a></li>
					<%} else {%>
					<li><a href="/event/admin/comments.do?eventId=<%=eventId%>&page=<%=i%>"><%=i%></a></li>	    		
					<%} %>
				<%} %>
				</ul>
				<%if (thisPage < totalPage) {%>
				<a href="/event/admin/comments.do?eventId=<%=eventId%>&page=<%=thisPage+1%>" class="next">下一页</a>
				<%} %>
				<span class="all_page">共<%=totalPage %>页</span>
			</div>
		</div>
		<%} %>
	</div>
	<script src="/js/jquery/jquery-1.8.3.min.js"></script>
    <script src="/pages/activity_business_admin/js/activity_comments.js"></script>	    
</body>
</html>