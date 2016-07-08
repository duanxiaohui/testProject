<%@page import="java.text.DecimalFormat"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="com.rili.common.beans.*" %>
<%
	String title = (String)request.getAttribute("title");
	String td = (String)request.getAttribute("td");
	String location = (String)request.getAttribute("location");
	int enrollLimit = (Integer)request.getAttribute("enrollLimit");
	int showEnrollCount = (Integer)request.getAttribute("showEnrollCount");
	int realEnrollCount = (Integer)request.getAttribute("realEnrollCount");
	String calendarTitle = (String)request.getAttribute("calendarTitle");
	String cityname = (String)request.getAttribute("cityname");
	boolean isExpire = (Boolean)request.getAttribute("isExpire");
	boolean isActivityLimit = (Boolean) request.getAttribute("onlyInClient");
	// 0:展示 1:隐藏
	int status = (Integer)request.getAttribute("status");
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
	String mainPic = (String)request.getAttribute("mainPic");
	List<String> pics = (List<String>)request.getAttribute("pics");
	String description = (String)request.getAttribute("description");
	String linkedUrl = (String)request.getAttribute("linkedUrl");
	boolean isCommonOffline = (Boolean)request.getAttribute("isCommonOffline");
	boolean isCustomLink = (Boolean)request.getAttribute("isCustomLink");
	String contract = (String)request.getAttribute("contract");
	boolean needVerifyCellphone = false;
	boolean hideCodeInWx = (Boolean)request.getAttribute("hideCodeInWx");
	if (isCommonOffline) {
		needVerifyCellphone = (Boolean)request.getAttribute("needVerifyCellphone");
	}
	List<String> userDatas = (List<String>)request.getAttribute("userDatas");
	String startAcceptTime = (String)request.getAttribute("startAcceptTime");
	String endAcceptTime = (String)request.getAttribute("endAcceptTime");
	String joinUrl = (String)request.getAttribute("joinUrl");
	List<String> remindTimes = (List<String>)request.getAttribute("remindTimes");
	List<String> showTimes = (List<String>)request.getAttribute("showTimes");
	String business = (String)request.getAttribute("business");
	String businessNumber = (String)request.getAttribute("businessNumber");
	String eventType = (String)request.getAttribute("eventType");
	EventAdmin eventAdmin = (EventAdmin)request.getAttribute("eventAdmin");
	long eventId = (Long)request.getAttribute("eventId");
	
	boolean isCommonLottery = (Boolean)request.getAttribute("isCommonLottery");
	String lotteryTitle = "";
	String lotteryRule = "";
	String lotteryMessage = "";
	String lotteryPrizeName = "";
	int lotteryProbability = 0;
	int prizeCount = 0;
	int prizeOwned = 0;
	if(isCommonLottery) {
		lotteryTitle = (String) request.getAttribute("lotteryTitle");
		lotteryRule = (String) request.getAttribute("lotteryRule");
		lotteryMessage = (String) request.getAttribute("lotteryMessage");
		lotteryPrizeName = (String) request.getAttribute("lotteryPrizeName");
		lotteryProbability = (int) (((Float) request.getAttribute("lotteryProbability")).floatValue() * 100);
		prizeCount = ((Integer) request.getAttribute("prizeCount")).intValue();
		prizeOwned = ((Integer) request.getAttribute("prizeOwned")).intValue();
	}
	
	boolean isNeedPay = (Boolean)request.getAttribute("needPay");
	EventPay eventPay = null;
	EventPayTradeType eventPayTradeType = null;
	if(isNeedPay) {
		eventPay = (EventPay)request.getAttribute("eventPay");
		eventPayTradeType = (EventPayTradeType) request.getAttribute("eventPayTradeType");
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
<link rel="stylesheet" href="/css/lightbox.css"/>
<link rel="stylesheet" href="/pages/activity_business_admin/css/index.css">
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery.lightbox.js"></script>
<script type="text/javascript" src="/pages/activity_business_admin/js/jquery.zclip.min.js"></script>
<script>
  var G = {
    eventId: <%=eventId%>
  };
</script>
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
<div class="activity_detail">
<div class="crumbs"><a href="/event/admin/index.do">所有活动</a><span>&gt;</span>活动详情</div>
  <h2>用户可见信息</h2>
	<div class="activity_info_top">
	  <div class="activity_info_top_btn">
		<a href="javascript:;" class="copy_url">复制网址</a>
		<a href="/event/admin/comments.do?eventId=<%=eventId %>" class="view_comment">查看评论</a>
		<a href="/event/admin/edit.do?eventId=<%=eventId %>" class="edit_activity_btn">编辑</a>
		<a href="/event/admin/orders.do?eventId=<%=eventId %>" class="order_detail_btn">订单详情</a>
		<%if(isNeedPay) { %>
		<a href="/event/admin/backedOrders.do?eventId=<%=eventId %>" class="order_detail_btn">退款订单</a>
		<%} %>
	</div>
	  <div class="activity_info_cover">
		<div class="state <%=stateClass%>"><%=stateStr %></div>
		<img src="<%=mainPic %>" alt="" width="150" height="200">
	  </div>
      <div class="activity_info_top_txt">
        <h3><%=title %></h3>
		  <p class="blue">时间：<%=td %></p>
		  <p class="blue">地点：<%=location %></p>
		  <p>活动限制：<%if(isActivityLimit){ %>仅能在365日历客户端参加<%} else { %>不限制<%} %></p>
		  <p>人数限制：<%=enrollLimit %>人</p>
		  <p>已经报名：<span class="red"><%=showEnrollCount %>人</span>（<%=realEnrollCount %>）人</p>
		  <!--expired ac_hidden-->
		  <p class="attribution_calendar e_clear">
		  	<span>所属日历：<%=calendarTitle %></span>
		    <span><%=cityname %></span>
		  </p>
	  </div>
	  </div>
		  <div class="activity_info_txt">
			<h3>详情活动</h3>
			<div class="txt_content">
			  <p><%=description %></p>
		</div>
		  </div>
		  <div class="activity_info_img">
			<h3>活动照片<span>共<%=pics.size() %>张</span></h3>
			<div class="e_clear">
			  <%for(String pic : pics) {%>
		  <a href="<%=pic %>" rel="lightbox"><img src="<%=pic %>" width="60" height="60"/></a>
		  <%} %>
			</div>
		  </div>
	  <h2>用户参与步骤信息</h2>
	  <div class="activity_notes">
		<p><b>【活动类型】</b><%=eventType %></p>
		<%if(isCommonOffline) {%>
		<%if(!contract.isEmpty()) {%>
		<p><b>【用户协议】</b><%=contract %></p>
		<%} %>
		<p><b>【手机验证】</b><%if(needVerifyCellphone){%>用户需验证手机号<%}else{%>用户不需要验证手机号<%}%></p>
		<%if(!userDatas.isEmpty()) {%>
		<p class="e_clear"><b>【信息填写】</b>
			<%for(String userData : userDatas) {%>
			<span><%=userData %></span>
			<%} %>
		</p>
		<%} %>
		<p><b>【授权码】</b>&nbsp;&nbsp;&nbsp;&nbsp;<%if(hideCodeInWx) {%>微信隐藏授权码<%} else {%>微信不隐藏授权码<%} %></p>
		<%} %>
		<%if(isCustomLink) {%>
		<p><b>【参与链接】</b><%=joinUrl%></p>
		<%} %>
		<%if(isCommonLottery) { %>
		<p><b>【抽奖页面标题】</b><%=lotteryTitle %></p>
		<p><b>【抽奖活动须知】</b><%=lotteryRule %></p>
		<p><b>【获奖短信模板】</b><%=lotteryMessage %></p>
		<p><b>【抽奖获奖概率】</b><%=lotteryProbability %>%</p>
		<p><b>【抽奖奖品名称】</b><%=lotteryPrizeName %></p>
		<p><b>【奖品数量情况】</b>共 <%=prizeCount%> 件，已发出 <%=prizeOwned%> 件</p>
		<%} %>
	  </div>
	  <h2>用户不可见信息</h2>
	  <div class="activity_notes">
		<%if(isCommonOffline) {%>
		<p><b>【兑换时间】</b><%=startAcceptTime %> -- <%=endAcceptTime %></p>
		<%} %>
		<p class="e_clear"><b>【提醒时间】</b>
			<%for(String remindTime : remindTimes) {%>
			<span><%=remindTime %></span>
			<%} %>
		</p>
		<p class="e_clear"><b>【显示时间】</b>
			<%for(String showTime : showTimes) {%>
			<span><%=showTime %></span>
			<%} %>
		</p>
		<p><b>【所属账号】</b><%=business %></p>
		<p><b>【活动ID】</b>&nbsp;&nbsp;&nbsp;&nbsp;<%=businessNumber %></p>
	  </div>
	  <h2>支付配置信息</h2>
	  <div class="activity_notes">
		<%if(!isNeedPay) {%>
		<p>无支付</p>
		<%} else {%>
		<p class="e_clear"><b>【商品类型】</b><%=eventPayTradeType.getTypeName() %></p>
		<p class="e_clear"><b>【商品名称】</b><%=eventPay.getTradeName() %></p>
		<p class="e_clear"><b>【商品描述】</b><%=eventPay.getTradeDescription() %></p>
		<p class="e_clear"><b>【商品单价】</b><%=(new DecimalFormat("#0.00")).format((double)eventPay.getPrice() / 100) %></p>
		<p class="e_clear"><b>【商家名称】</b><%=eventPay.getMerchantName() %></p>
		<p class="e_clear"><b>【退款支持】</b><%=(eventPay.isAllowRufund() ? "支持退款" : "不支持退款")%></p>
		<%} %>
	  </div>
   </div>
   <script type="text/javascript" src="/pages/activity_business_admin/js/activity_detail.js"></script>
</body>
</html>