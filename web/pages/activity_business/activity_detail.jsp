<%@ page import="com.rili.common.beans.EventAdmin"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%
	EventAdmin eventAdmin = (EventAdmin) request.getAttribute("eventAdmin");
	long eventId = (Long)request.getAttribute("eventId");
		String title = (String)request.getAttribute("title");
	String td = (String)request.getAttribute("td");
	String location = (String)request.getAttribute("location");
	int enrollLimit = (Integer)request.getAttribute("enrollLimit");
	boolean isFull = (Boolean)request.getAttribute("isFull");
	String onlineTime = (String)request.getAttribute("onlineTime");
	String desc = (String)request.getAttribute("desc");
	List<String> pics = (List<String>) request.getAttribute("pics");
	String mainPic = (String)request.getAttribute("mainPic");
	String contract = (String)request.getAttribute("contract");
	// 0:正在进行，1:隐藏，2:已过期
	int status = (Integer) request.getAttribute("status");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>商家后台</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link rel="stylesheet" href="/css/lightbox.css"/>
<link rel="stylesheet" href="/pages/activity_business/css/index.css">
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery.lightbox.js"></script>
<script type="text/javascript" src="/pages/activity_business/js/jquery.zclip.min.js"></script>
<script type="text/javascript">
    var G = {
        status: <%=status%>
    };
</script>
</head>
<body>
    <div class="activity_header">
    	<a href="/event/business/logout.do" class="exit_btn">退出</a>
    	<div class="username"><%=eventAdmin.getName() %></div>
    	<div class="activity_logo e_clear">
    		<a href="javascript:;"><img src="/pages/activity_business/images/logo.jpg"/></a>
    		<p>商家后台</p>
    	</div>
    </div>
   <div class="activity_detail">
   		<div class="crumbs"><a href="/event/business/index.do">全部活动</a><span>&gt;</span>活动详情</div>
   		<div class="activity_info_top">
   			<div class="activity_info_top_btn">
   				<a href="javascript:;" class="view_orders" data-id="<%=eventId %>">查看订单</a>
   				<a href="javascript:;" class="copy_url">复制网址</a>
   			</div>
   			<div class="activity_info_cover">
   				<img src="<%=mainPic %>" alt="">
   			</div>
   			<div class="activity_info_top_txt">
   				<h3><%=title %></h3>
   				<p class="blue">时间：<%=td %></p>
   				<p class="blue">地点：<%=location %></p>
   				<p>人数限制：<span class="red"><%=enrollLimit %>人</span>
	               	<%if(isFull) {%>
                  	<span class="font_orange">已满员</span>
                  	<%} else { %>
                  	<span>未满员</span>
                  	<%} %>
				</p>
          <!--expired ac_hidden-->
          <p class="state_box ac_hidden">
            <span class="state_icon">进行中</span>
          	活动上线时间：<%if(onlineTime == null) {%>未定义<%} else {%><%=onlineTime %><%} %></p>
		</div>
   		</div>
   		<div class="activity_info_txt">
   			<h3>详情活动</h3>
   			<div class="txt_content">
   				<p>
   					<%=desc %>
   				</p>
			</div>
   		</div>
   		<div class="activity_info_img">
   			<h3>活动照片<span>共<%=pics.size() %>张</span></h3>
   			<div class="e_clear">
   			<%for (String pic : pics) {%>
				<a href="<%=pic %>" rel="lightbox"><img src="<%=pic %>" width="60" height="60"/></a>
			<%} %>
   			</div>
   		</div>
      <div class="activity_notes">
        <h3>活动须知</h3>
        <p><%=contract %></p>
      </div>
   </div>
    <script type="text/javascript" src="/pages/activity_business/js/activity_detail.js"></script>
</body>
</html>