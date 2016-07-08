<%@ page import="com.rili.common.beans.EventAdmin"%>
<%@ page import="com.rili.common.beans.Event" %>
<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=utf-8" %>
<%
	EventAdmin eventAdmin = (EventAdmin) request.getAttribute("eventAdmin");
	String mainPic = (String)request.getAttribute("mainPic");
	String title = (String)request.getAttribute("title");
	String desc = (String)request.getAttribute("desc");
	boolean isFull = (Boolean)request.getAttribute("isFull");
	String acceptTd = (String)request.getAttribute("acceptTd");
	List<Map<String, Object>> orders = (List<Map<String, Object>>) request.getAttribute("orders");
	int pageTotal = (Integer) request.getAttribute("pageTotal");
	long eventId = (Long) request.getAttribute("eventId");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>商家后台</title>
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<link rel="stylesheet" href="/pages/activity_business/css/index.css">
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
    var G = {
        pageTotal: <%=pageTotal%>,
        eventId: <%=eventId%>
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
   <div class="activity_orders">
   		<div class="crumbs"><a href="/event/business/index.do">全部活动</a><span>&gt;</span><a href="/event/business/detail.do?eventId=<%=eventId %>">活动详情</a><span>&gt;</span>订单详情</div>
   		<div class="orders_top e_clear">
   			<div class="orders_img">
   				<img src="<%=mainPic %>"/>
   			</div>
   			<div class="orders_sign">
   				<h3><%=title %></h3>
   				<p class="product_info"><%=desc %></p>
	           	<%if(isFull) {%>
               	<span class="font_orange">已满员</span>
               	<%} else { %>
               	<span>未满员</span>
               	<%} %>
                <p>授权码兑换时间：<%=acceptTd %></p>
   			</div>
   		</div>
   		<div class="orders_list">
   			<div class="orders_print">
   				已经接受服务的订单列表
   				<a href="/event/business/orderExcel.do?eventId=<%=eventId %>" target="_blank" class="print_btn">导出Excel</a>
   			</div>
   			<div class="orders_search e_clear">
   				<input type="text"/><a href="javascript:;" class="search_btn">兑换</a>
   			</div>
			<div class="orders_list_box">
				<div class="orders_search_title">
					<p>授权</p>
					<p>手机号</p>
                    <p>用户名</p>
                    <p></p>
				</div>
				<div class="orders_search_results">
					<ul>
						<% for(Map<String, Object> order : orders) { %>
						<li><p><%=order.get("code") %>&nbsp;</p><p><%=order.get("cellphone") %>&nbsp;</p><p><%=order.get("username") %>&nbsp;</p><p><a href="javascript:;" class="recovery_btn">恢复</a></p></li>
						<%} %>
					</ul>
				</div>
				<%if (pageTotal > 0) { %>
				<div class="page e_clear">
			   		<div class="page_box">
				   		<a href="javascript:;" class="prve_btn">上一页</a>
				   		<ul class="e_clear">
				   			<%for (int i = 1; i <= pageTotal; i++) { %>
				   			<li><a class="page_num" href="javascript:;"><%= i%></a></li>
				   			<%} %>
				   		</ul>
				   		<a href="javascript:;" class="next_btn">下一页</a>
				   		<p>共<%=pageTotal %>页，到第<select id="pageTotal"></select>页</p>
				   		<a href="javascript:;" class="true_btn">确定</a>
			   		</div>
			   	</div>
			   	<%} %>
			</div>
   		</div>
   </div>

   <div class="tips_layer none">
       <h3>提示</h3>
       <p></p>
       <div class="bottomBar">
           <a href="javascript:;" class="layer_btn">确定</a>
           <a href="javascript:;" class="cancel_btn">取消</a>
       </div>
   </div>
   <script type="text/javascript" src="/pages/activity_business/js/activity_orders.js"></script>
</body>
</html>