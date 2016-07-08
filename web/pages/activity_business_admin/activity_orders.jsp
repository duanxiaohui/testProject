<%@page import="java.text.DecimalFormat"%>
<%@page import="com.rili.common.dao.EventPayDAO"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="com.rili.common.beans.*" %>
<%
	EventAdmin eventAdmin = (EventAdmin)request.getAttribute("eventAdmin");
	boolean isCommonOffline = (Boolean)request.getAttribute("isCommonOffline");
	boolean isCustomLink = (Boolean)request.getAttribute("isCustomLink");
	boolean isCommonLottery = (Boolean) request.getAttribute("isCommonLottery");
	long eventId = (Long)request.getAttribute("eventId");
	int orderCount = (Integer)request.getAttribute("orderCount");
	int usedOrderCount = (Integer)request.getAttribute("usedOrderCount");
	int thisPage = (Integer)request.getAttribute("thisPage");
	int totalPage =(Integer)request.getAttribute("totalPage");
	boolean isNeedPay = (Boolean) request.getAttribute("needPay");
	List<Map<String, Object>> orders = (List<Map<String, Object>>)request.getAttribute("orders");
	Map<String, Boolean> dataExpectMap = null;
	if(isCommonOffline) {
		dataExpectMap = (Map<String, Boolean>) request.getAttribute("dataExpectMap");
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>365日历活动及评论管理后台</title>
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<link rel="stylesheet" href="/pages/activity_business_admin/css/index.css">
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
</head>
<body>
	<div class="activity_header_box">
	    <div class="activity_header">
	    	<a href="/event/admin/logout.do" class="exit_btn">退出</a>
	    	<div class="username"><%=eventAdmin.getName() %></div>
	    	<div class="activity_logo e_clear">
	    		<a href="javascript:;"><img src="/pages/activity_business/images/logo.jpg"/></a>
	    		<p>365日历活动及评论管理后台</p>
	    	</div>
	    </div>
	</div>
    <div class="activity_orders">
   		<div class="crumbs"><a href="/event/admin/index.do">所有活动</a><span>&gt;</span><a href="/event/admin/detail.do?eventId=<%=eventId%>">活动详情</a><span>&gt;</span>订单详情</div>
   		<div class="activity_orders_content">
   		
   		<div class="orders_top e_clear">
   			<%if(isCommonOffline) {%>
   			<div class="orders_statistical ">
   				<dl class="fr">
   					<dt>下单量</dt>
   					<dd><%=orderCount %></dd>
   				</dl>
   				<dl>
   					<dt>完成兑换量</dt>
   					<dd><%=usedOrderCount %></dd>
   				</dl>
   			</div>
   			<%} %>
   			<%if(isCustomLink) {%>
   			<div class="orders_statistical orders_statistical_one">
   				<dl>
   					<dt>下单量</dt>
   					<dd><%=orderCount %></dd>
				</dl>
   			</div>
   			<%} %>
   		</div>
   		<%if(isCommonOffline) {%>
   		<div class="orders_list">
   			<div class="orders_print">
   				参加活动的订单列表
   			</div>
   			<div class="orders_list_box">
				<div class="orders_search_results">
	            <a href="/event/admin/orderExcel.do?eventId=<%=eventId %>" target="_blank" class="down_table_btn">下载报表</a>
				<table>
		            <tr>
	        		    <!-- <th width="5%">序号</th>
	             		<th width="10%">365账号</th>
	             		<th width="10%">授权码</th>
	             		<th width="8%">授权码状态</th>
	             		<th width="12%">订单创建时间</th>
	             		<th width="12%">订单兑换时间</th>
	             		<th width="6%">真实姓名</th>
	             		<th width="10%">手机号码</th>
	             		<th width="10%">邮箱</th>
	             		<th width="3%">性别</th>
	             		<th width="14%">留言</th> -->
	             		<th style="width:30px">序号</th>
	             		<th style="width:100px">365账号</th>
	             		<th style="width:100px">授权码</th>
	             		<th style="width:80px">授权码状态</th>
	             	<%if(isNeedPay) { %>
	             		<th style="width:100px">订单号</th>
	             		<th style="width:100px">交易单号</th>
	             		<th style="width:70px">付款金额</th>
	             		<th style="width:100px">付款账户标识</th>
	             		<th style="width:75px">付款时间</th>
	             		<th style="width:70px">订单状态</th>
	             	<%} %>
	             		<th style="width:75px">订单创建时间</th>
	             		<th style="width:75px">订单兑换时间</th>
	             	<%if(dataExpectMap.get("hasName")) { %>
	             		<th style="width:80px">真实姓名</th>
	             	<%} %>
	             	<%if(dataExpectMap.get("hasCellphone")) { %>
	             		<th style="width:80px">手机号码</th>
	             	<%} %>
	             	<%if(dataExpectMap.get("hasEmail")) { %>
	             		<th style="width:100px">邮箱</th>
	             	<%} %>
	             	<%if(dataExpectMap.get("hasSex")) { %>
	             		<th style="width:30px">性别</th>
	             	<%} %>
	             	<%if(dataExpectMap.get("hasLeaveWord")) { %>
	             		<th style="width:100px">留言</th>
	             	<%} %>
           			</tr>
           			<%for(Map<String,Object> order : orders) {%>
 		            <tr>
		             	<td><%=order.get("sequence") %></td>
		             	<td><%=order.get("username") %></td>
		             	<td><%=order.get("code") %></td>
			            <td>
			            	<%if((Integer)order.get("status") == 0) {%>
			            	<span>未使用</span>
			            	<%} else if((Integer)order.get("status") == 1) { %>
			            	<span class="use">已使用</span>
			            	<%} else { %>
			            	<span>不可用</span>
			            	<%} %>
			            </td>
			        <%if(isNeedPay) { %>
	             		<td><%=order.get("payOrderId") %></td>
	             		<td><%=order.get("transactionId") %></td>
	             		<td>￥<%=(new DecimalFormat("#0.00")).format(((Integer)order.get("payFee")).doubleValue() / 100) %></td>
	             		<td><%=order.get("payAccountId") %></td>
	             		<td><%=order.get("payTime") %></td>
	             		<td>
	             			<%if((Integer)order.get("status") == 0) {%>
			            		<%if((Integer)order.get("payOrderStatus") == EventOrderPay.STATUS_PAID) {%>
			            			<span>已支付</span>
			            		<%} else if((Integer)order.get("payOrderStatus") == EventOrderPay.STATUS_APPLY_REFUND) { %>
			            			<span style="color:#ff0000;">申请退款</span>
			            		<%} else if((Integer)order.get("payOrderStatus") == EventOrderPay.STATUS_REFUNDING) { %>
			            			<span>退款中</span>
			            		<%} else if((Integer)order.get("payOrderStatus") == EventOrderPay.STATUS_REFUNDED) { %>
			            			<span>已退款</span>
			            		<%} else if((Integer)order.get("payOrderStatus") == EventOrderPay.STATUS_UNPAID) { %>
			            			<span>未支付</span>
			            		<%} %>
			            	<%} else if((Integer)order.get("status") == 1) { %>
			            	<span class="use">完成</span>
			            	<%} else {%>
			            	<span>未支付或其他</span>
			            	<%} %>
	             		</td>
	             	<%} %>
		             	<td><%=order.get("createdTime") %></td>
		             	<td><%=order.get("convertTime") %></td>
		            <%if(dataExpectMap.get("hasName")) { %>
		             	<td><%=order.get("name") %></td>
		            <%} %>
	             	<%if(dataExpectMap.get("hasCellphone")) { %>
		             	<td><%=order.get("cellphone") %></td>
		            <%} %>
	             	<%if(dataExpectMap.get("hasEmail")) { %>
		             	<td><%=order.get("email") %></td>
		            <%} %>
	             	<%if(dataExpectMap.get("hasSex")) { %>
		             	<td><%=order.get("sex") %></td>
		            <%} %>
	             	<%if(dataExpectMap.get("hasLeaveWord")) { %>
		             	<td><%=order.get("leaveWord") %></td>
		            <%} %>
		           	</tr>
		           	<%} %>
		          </table>
				</div>
				<%if(orderCount > 0) {%>
				<div class="page e_clear">
					<div class="page_content">
						<%if (thisPage > 1) {%>
						<a href="/event/admin/orders.do?eventId=<%=eventId%>&page=<%=thisPage-1%>" class="pev">上一页</a>
						<%} %>
						<ul class="e_clear">
						<%for (int i = 1; i <= totalPage; i++) {%>
							<%if(i==thisPage) {%>
							<li class="on"><a><%=i%></a></li>
							<%} else {%>
							<li><a href="/event/admin/orders.do?eventId=<%=eventId%>&page=<%=i%>"><%=i%></a></li>	    		
							<%} %>
						<%} %>
						</ul>
						<%if (thisPage < totalPage) {%>
						<a href="/event/admin/orders.do?eventId=<%=eventId%>&page=<%=thisPage+1%>" class="next">下一页</a>
						<%} %>
						<span class="all_page">共<%=totalPage %>页</span>
					</div>
				</div>
    			<%} %>
			 </div>
   		</div>
   		<%} %>
   		<%if(isCommonLottery) {%>
   		<div class="orders_list">
   			<div class="orders_print">
   				中奖用户信息列表
   			</div>
   			<div class="orders_list_box">
				<div class="orders_search_results">
	            <a href="/event/admin/orderExcel.do?eventId=<%=eventId %>" target="_blank" class="down_table_btn">下载报表</a>
				<table>
		            <tr>
	        		    <th width="2%">序号</th>
	             		<th width="5%">用户id</th>
	             		<th width="5%">365账号名</th>
	             		<th width="5%">手机号码</th>
	             		<th width="5%">中奖时间</th>
	             		<th width="10%">奖品/兑换码</th>
	             		<th width="5%">奖品id</th>
           			</tr>
           			<%for(Map<String,Object> order : orders) {%>
 		            <tr>
		             	<td><%=order.get("sequence") %></td>
		             	<td><%=order.get("userid") %></td>
		             	<td><%=order.get("username") %></td>
		             	<td><%=order.get("cellphone") %></td>
		             	<td><%=order.get("createdTime") %></td>
		             	<td><%=order.get("code") %></td>
		             	<td><%=order.get("prizeid") %></td>
		           	</tr>
		           	<%} %>
		          </table>
				</div>
				<%if(orderCount > 0) {%>
				<div class="page e_clear">
					<div class="page_content">
						<%if (thisPage > 1) {%>
						<a href="/event/admin/orders.do?eventId=<%=eventId%>&page=<%=thisPage-1%>" class="pev">上一页</a>
						<%} %>
						<ul class="e_clear">
						<%for (int i = 1; i <= totalPage; i++) {%>
							<%if(i==thisPage) {%>
							<li class="on"><a><%=i%></a></li>
							<%} else {%>
							<li><a href="/event/admin/orders.do?eventId=<%=eventId%>&page=<%=i%>"><%=i%></a></li>	    		
							<%} %>
						<%} %>
						</ul>
						<%if (thisPage < totalPage) {%>
						<a href="/event/admin/orders.do?eventId=<%=eventId%>&page=<%=thisPage+1%>" class="next">下一页</a>
						<%} %>
						<span class="all_page">共<%=totalPage %>页</span>
					</div>
				</div>
    			<%} %>
			 </div>
   		</div>
   		<%} %>
   		</div>
   </div>
</body>
</html>