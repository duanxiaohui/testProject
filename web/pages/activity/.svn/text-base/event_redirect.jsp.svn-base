<%@ page contentType="text/html;charset=utf-8" %>
<%	
	long eventId = (Long)request.getAttribute("eventId");
	long calendarId = (Long)request.getAttribute("calendarId");
	String uuid = (String)request.getAttribute("uuid");
	String redirectUrl = (String)request.getAttribute("redirect_url");
	boolean onlyInClient = (Boolean) request.getAttribute("onlyInClient");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title></title>
<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0">
<meta content="telephone=no" name="format-detection">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0"> 

<link href="/pages/client_calendar_h5/css/silde_s.css?v=20140913" rel="stylesheet">
<link href="/pages/activity/css/event.css?v=20141105" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="/css/footer.css?20141128" />

<script>
	var G = {
		eventId: <%=eventId%>,
		uuid:'<%=uuid%>',
		cid:<%=calendarId%>,
		redirectUrl: '<%=redirectUrl%>'
	};
</script>
</head>
<body>
	<div class="main"></div>
    <script src="/js/lib/zepto.min.js"></script>
	<script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
    <script src="/pages/activity/js/event.js?v=20141114"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script>
    	$(function() {
    		<%if(onlyInClient) {%>
    		if(!app.getUa.weixin && (app.getUa.androidCoco || app.getUa.iosCoco)) {
    			location.href = G.redirectUrl;
    		} else {
    			app.open({
					ios:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid,
					android:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid
				},app.getUa.ios);
    		}
    		<%} else {%>
    		location.href = G.redirectUrl;
			<%}%>
		});

    </script>
</body>
</html>