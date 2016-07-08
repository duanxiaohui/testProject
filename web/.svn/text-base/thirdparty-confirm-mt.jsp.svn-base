<%@ page contentType="text/html;charset=utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%  
	String confirmCallback = (String)request.getAttribute("confirmCallback");
	String cancelCallback = (String)request.getAttribute("cancelCallback");
	String bindType = (String)request.getAttribute("bindType"); 
   	String account365 = (String)request.getAttribute("account365");
   	String account365ToBind = (String)request.getAttribute("account365ToBind");
   	if(account365ToBind == null)
   	{
   		account365ToBind = "";
   	}
   	String account3rdParty = (String)request.getAttribute("account3rdParty");   	
   	%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
<link rel="stylesheet" type="text/css" href="/css/cal365_default/userConfirm.css?v=2014" />
<script type="text/javascript">
	var G = {
		bindType: function(){/*<%=bindType%>*/},
		account3rdParty: function(){/*<%=account3rdParty%>*/},
		account365: function(){/*<%=account365%>*/}
	};
	(function(){
		for(var i in G){
			if(typeof G[i] == "function"){
				var s = G[i].toString();
				G[i] = s.substring(s.indexOf("/*") + 2,s.lastIndexOf("*/"));
			}
		}
	})();
</script>
<title>第三方账号绑定确认</title>
</head>
<body>
<div class="bar_container">
	<div class="topbar_orange"></div>
	<div class="topbar_yellow"></div>
	<div class="topbar_lightblue"></div>
	<div class="topbar_darkblue"></div>
</div>
<div id="info_container" class="info_container">
	<div id="info" class="info">
		您的<%=bindType%>账号<span class="green_text"><%=account3rdParty%></span>与365日历账号<span class="blue_text"><%=account365%></span>已绑定，
		继续将解除该绑定关系。<span class="red_text">注意：该操作会丢失原账号全部数据</span>
	</div>
	<div class="submit_button_green" onclick="eventHandlers.show_tip();">
		继续
	</div>
	<div class="submit_button_blue" onclick="eventHandlers.m_cancel_click();">
		退出
	</div>
	<div id="slogan" class="slogan">精彩每一天 365日历</div>
</div>
<div class="weixin_container">
	<p class="wx_txt">您之前用<%=bindType%>号<span class="green_text"><%=account3rdParty%></span>参加过的活动、加入的群组、参加过的好友日程，将转移到当前365日历<span class="blue_text"><%=account365ToBind%></span>下。</p>
	<div class="wx_submit_button_green" onclick="eventHandlers.continue_click();">
		继续
	</div>
	<p class="wx_tips">如果您用<%=bindType%>号<%=account3rdParty%>创建过日程和代办,绑定前请先<a href="http://www.365rili.com/bind-weixin.html">确认之前绑定的365账号和密码</a></p>
</div>
<div id="tips_container" style="display:none;">
	<div class="tips_layer">
		<h3>警告</h3>
		<p class="param">确认要解除绑定365账号<%=account365%>吗？ </p>
		<p class="param red_text">注意:该操作会丢失原账号全部数据</p>
	    <a href="javascript:;" class="layer_btn_green" onclick="eventHandlers.continue_click();">确认解除</a>
	    <a href="javascript:;" class="layer_btn" onclick="eventHandlers.m_cancel_click();">退出</a>
	    
	</div>
	<div class="mask"></div>
</div>
<form id="user_confirm" name="user_confirm" action="<%=confirmCallback%>"></form>
<form id="user_cancel" name="user_cancel" action="<%=cancelCallback%>"></form>
<script type="text/javascript">
/*
 * 事件处理句柄
 */
var eventHandlers={
	show_tip: function(){
		document.getElementById('tips_container').style.display = "block";
	},
	continue_click:function(){
		document.forms['user_confirm'].submit();
	},
	cancel_click:function() {
		self.close();
	},
	m_cancel_click:function() {
		document.forms['user_cancel'].submit();
	}
};
(function(){
	var body = document.body;
	if(G.bindType=="微信"){
		body.className="weixin";
	}
})()
</script>
</body>
</html>