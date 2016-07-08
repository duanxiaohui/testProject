<%@page import="java.util.Set"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="com.rili.common.beans.EventPayTradeType"%>
<%@page import="com.rili.common.beans.EventPay"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.Event1" %>
<%
	Event1 event1 = (Event1) request.getAttribute("event1");
	boolean needPay = (Boolean) request.getAttribute("needPay");
	EventPay eventPay = null;
	EventPayTradeType eventPayTradeType = null;
	if(needPay) {
		eventPay = (EventPay) request.getAttribute("eventPay");
		eventPayTradeType = (EventPayTradeType) request.getAttribute("eventPayTradeType");
	}
	boolean isFocusWhenJoin = (Boolean) request.getAttribute("isFocusWhenJoin");
	String startTime = (String) request.getAttribute("startTime");
	String endTime = (String) request.getAttribute("endTime");
	Set<Integer> beforeMinuteSet = (Set<Integer>) request.getAttribute("beforeMinuteSet");
	int beforeMinuteSetCount = 0;
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<meta name="format-detection" content="telephone=no"/> 

<link rel="stylesheet" type="text/css" href="/pages/activity/css/active_info.css" media="screen" />
<link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.css">
<link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.iOS7.css">
<script src="/js/lib/zepto.min.js"></script>
<script src="/js/lib/gmu/gmu.js"></script>
<script src="/js/lib/app.js"></script>
<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
<script src="/share/js/weixin_1.0.js"></script>
<title>填写信息</title>
<script>
	var eventId=<%=event1.getEventId()%>;
</script>
</head>
<body>
<div class="main">
    <div class="pay_tips">
    	<%if(event1.isExpectDataCellphone() && event1.isRequireDataCellphone()) { %>
    		请填写真实信息，以便正常收取活动授权码。
    	<%} else { %>
    		请填写真实信息，以便正常参加活动。
    	<%} %>
    </div>
    <%if(needPay) { %>
    <div class="pay_number">
        <p><%=eventPayTradeType.getTypeName()%></p>
        <p class="number_txt">￥<%=(new DecimalFormat("#0.00")).format((double)eventPay.getPrice() / 100) %></p>
    </div>
    <%} %>
    <%if(event1.isExpectDataName()) {%>
    <dl class="name e_clear">
        <dt>姓名</dt>
        <dd><input id="ac_name" type="text" placeholder="请输入姓名(20个字符)" <%if(event1.isRequireDataName()) {%>data-optional="required"<%} %>></dd>
    </dl>
    <%} %>
    <%if(event1.isExpectDataSex()) {%>
    <dl class="sex e_clear">
        <dt>性别</dt>
        <dd>
            <label><input id="ac_male" type="radio" name="sexGroup" value="male" checked/><span>男</span></label>
            <label><input id="ac_female" type="radio" name="sexGroup" value="female"/><span>女</span></label>
        </dd>
    </dl>
    <%} %>
    <%if(event1.isExpectDataBirthday()) {%>
    <dl class="birthday e_clear">
        <dt>生日</dt>
        <dd>
            <div class="select_year">
                <select name="ac_year" id="ac_year">
                </select><span id="ac_year_txt">2015</span>
            </div><span>年</span>
            <div class="select_month">
                <select name="ac_month" id="ac_month">
                </select><span id="ac_month_txt">1</span>
            </div><span>月</span>
            <div class="select_day">
                <select name="ac_day" id="ac_day">
                </select><span id="ac_day_txt">11</span>
            </div><span>日</span>
        </dd>
    </dl>
    <%} %>
    <%if(event1.isExpectDataEmail()) {%>
    <dl class="email e_clear">
        <dt>邮箱</dt>
        <dd><input id="ac_mail" type="text" placeholder="请输入邮箱(50个字符)" <%if(event1.isRequireDataEmail()) {%>data-optional="required"<%} %>></dd>
    </dl>
    <%} %>
    <%if(event1.isExpectDataLeaveWord()) {%>
    <dl class="message e_clear">
        <dt>留言</dt>
        <dd><textarea name="ac_msg" id="ac_msg" placeholder="内容不超过1024个字符"></textarea></dd>
    </dl>
    <%} %>
    <%if(event1.isExpectDataCellphone()) {%>
    <dl class="phone e_clear">
        <dt>手机号</dt>
        <dd><input id="ac_mobile" type="tel" placeholder="请输入手机号" <%if(event1.isRequireDataCellphone()) {%>data-optional="required"<%} %>></dd>
    </dl>
    <%} %>
    <%if(event1.isNeedVerifyCellphone()) {%>
    <div class="input_code">
        <div class="input_code_box e_clear">
            <a href="javascript:;" class="get_code">获取验证码</a>
            <input id="ac_code" type="tel" placeholder="请输入验证码">
        </div>
    </div>
    <%} %>
    
    <%
    String contract = event1.getContract();
    if(contract != null && !contract.isEmpty()) {
    %>
    <div class="statement">
    	<input id="ac_note" type="checkbox" checked="true"><span>我已阅读并同意<a href="javascript:;" class="view_info_btn">《活动须知》</a>所有内容</span>
    </div>
    <%} %>
    <%if(beforeMinuteSet.size() > 0) { %>
    <div class="active_remind_tips none">
        <h2>在我的日历中显示</h2>
        <p>时间：<%=startTime %>
        	<%if(!endTime.equals("")) { %>
        		-<%=(endTime.length() > 5 ? "<br/><span style='padding-left:3em;'></span>" : "") %><%=endTime %>
        	<%} %>
        </p>
        <p>提醒：<%if(beforeMinuteSet.contains(0)){ %><%if(beforeMinuteSetCount++ > 0){ %>、<%} %>正点<%}%>
	    	    <%if(beforeMinuteSet.contains(5)){ %><%if(beforeMinuteSetCount++ > 0){ %>、<%} %>5分钟前<%}%>
	    		<%if(beforeMinuteSet.contains(10)){ %><%if(beforeMinuteSetCount++ > 0){ %>、<%} %>10分钟前<%}%>
	    		<%if(beforeMinuteSet.contains(30)){ %><%if(beforeMinuteSetCount++ > 0){ %>、<%} %>30分钟前<%}%>
	    		<%if(beforeMinuteSet.contains(60)){ %><%if(beforeMinuteSetCount++ > 0){ %>、<%} %>1小时前<%}%>
	    		<%if(beforeMinuteSet.contains(1440)){ %><%if(beforeMinuteSetCount++ > 0){ %>、<%} %>1天前<%}%>
	    		<%if(beforeMinuteSet.contains(4320)){ %><%if(beforeMinuteSetCount++ > 0){ %>、<%} %>3天前<%}%>
    </div>
    <%} %>
    <div class="wx_info_tips none">
        下载365日历，定制管理当前活动提醒 <a href="javascript:;">立即下载</a>
    </div>
    <%if(isFocusWhenJoin){ %>
        <div class="focusCalendar none">
        <input id="fc_note" type="checkbox" checked="true"><span>关注此活动所属日历</span>
    </div>
    <%} %>
    
    <div class="btn">
        <a href="javascript:;" class="save_btn">
            <%if(needPay) { %>提交信息并支付 <%} %>
            <%if(!needPay) { %>提交信息<%} %>
            </a>
    </div>
</div>
<div class="activity_layer none">
    <a href="javascript:;" class="activity_layer_colse"></a>
    <h3>《活动须知》</h3>
    <div class="activity_layer_txt">
        <%
        if (contract != null && !contract.isEmpty()) {
            String[] lines = contract.split("\\n+");
            for (String line : lines) {
        %>
        <p><%=line%></p>
        <%
            }
        }
        %>
    </div>
</div>
<script src="/pages/activity/js/active_info.js"></script>
<script src="/pages/activity/js/event_pay.js"></script>
</body>
</html>