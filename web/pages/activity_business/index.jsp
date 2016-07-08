<%@ page import="com.rili.common.beans.EventAdmin"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%
	List<Map<String,Object>> es = (List<Map<String,Object>>) request.getAttribute("e");
	EventAdmin eventAdmin = (EventAdmin) request.getAttribute("eventAdmin");
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
<link rel="stylesheet" href="/pages/activity_business/css/index.css">
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
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
   <div class="activity_list">
   	  <ul class="activity_tab_list e_clear">
   	  	  <%if(status == 1) {%>
          <li><a href="/event/business/index.do">正在进行</a></li>
          <li class="on">隐藏活动</li>
          <li><a href="/event/business/index.do?status=2">过期活动</a></li>
          <%} else if (status == 2) {%>
	      <li><a href="/event/business/index.do">正在进行</a></li>
          <li><a href="/event/business/index.do?status=1">隐藏活动</a></li>
          <li class="on">过期活动</li>
		  <%} else {%>
	      <li class="on">正在进行</li>
          <li><a href="/event/business/index.do?status=1">隐藏活动</a></li>
          <li><a href="/event/business/index.do?status=2">过期活动</a></li>
		  <%} %>		  
      </ul>
      <div class="activity_newlist_box">
          <div class="activity_ing">
            <ul>
              <% 
              for(Map<String, Object> e : es) {
	           %>
              <li class="e_clear">
                <div class="activity_img"><img src="<%=e.get("thumb") %>" width="125" height="125"/></div>
                <div class="activity_content">
                  <a href="javascript:;" class="view_btn" data-id="<%=e.get("id") %>">查看订单</a>
                  <h3><%=e.get("title") %></h3>
                  <p class="product_info"><%=e.get("desc") %></p>
                  <p class="blue">时间：<%=e.get("td") %></p>
                  <p class="blue">地点：<%=e.get("location") %> </p>
                  <p class="num">
                  	<span>人数限制：<%=e.get("enrollLimit") %>人</span>
                  	<%if((Boolean)e.get("isFull")) {%>
                  	<span class="font_orange">已满员</span>
                  	<%} else { %>
                  	<span>未满员</span>
                  	<%} %>
	              </p>
                </div>
              </li>
              <% } %>
            </ul>
          </div>
          <div class="activity_hidden"></div>
          <div class="activity_expired"></div>
      </div>
      
   </div>
   <script type="text/javascript" src="/pages/activity_business/js/activity_list.js"></script>
</body>
</html>