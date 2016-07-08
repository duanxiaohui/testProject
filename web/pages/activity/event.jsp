<%@ page contentType="text/html;charset=utf-8" %>
<%	
	String title = (String)request.getAttribute("title");
	String desc = (String)request.getAttribute("desc");
	String url = (String)request.getAttribute("url");
	String location = (String)request.getAttribute("location");
	String picStr = (String)request.getAttribute("picStr");
	// 报名人数
	String enrollStr = (String)request.getAttribute("enrollStr");
	boolean isExpire = (Boolean)request.getAttribute("isExpire");
	boolean isLogin = (Boolean)request.getAttribute("isLogin");

	long eventId = (Long)request.getAttribute("eventId");
	long calendarId = (Long)request.getAttribute("calendarId");
	String uuid = (String)request.getAttribute("uuid");
	// 如果为0则表示没有订单
	long orderId = (Long)request.getAttribute("orderId");
	// 时间描述
	String dateline = (String)request.getAttribute("dateline");
	// 背景图
	String bgu = (String)request.getAttribute("bgu");
	String from = (String)request.getAttribute("from");
	
	//按钮名称
	String joinButton = (String)request.getAttribute("joinButton");
	String joinedButton = (String)request.getAttribute("joinedButton");
	
	boolean onlyInClient = (Boolean) request.getAttribute("onlyInClient");
	boolean enrollFull = (Boolean) request.getAttribute("enrollFull");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>活动详情</title>
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
		orderId: <%=orderId%>, // 如果为0则表示没有订单
		isExpire:<%=isExpire%>,
		isLogin:<%=isLogin%>,
		enrollFull:<%=enrollFull%>,
		scheduleTitle: function(){/*<%=title%>*/},
		scheduleDesc: function(){/*<%=desc%>*/},
		url: function(){/*<%=url%>*/},
	    location: function(){/*<%=location%>*/},
		dateline1: function(){/*<%=dateline%>*/},
		pics: function(){/*<%=picStr%>*/},
		joinedPerson: function(){/*<%=enrollStr%>*/},
		bgu: function(){/*<%=bgu%>*/},
		from: function(){/*<%=from%>*/},
		joinButton: '<%=joinButton%>',
		joinedButton: '<%=joinedButton%>'
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
</head>
<body>
	<div class="main"></div>
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js"></script>
    <script type="text/javascript" src="/js/lib/slide_s.js?20141114"></script>
    <script type="text/javascript" src="/js/lib/footer.js?20141128"></script>
	<script type="text/javascript" src="/js/lib/app.js?20151021"></script>
	<script src="/pages/activity/js/event.js?v=20141114"></script>
    <script src="/pages/activity/js/zepto-slide-transition.min.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script>
    	$(function() {
    		app.open({
				ios:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid,
				android:'coco://365rili.com/schedule?scheduleUuid='+G.uuid+'&cid='+G.cid
			},app.getUa.ios,function(){
				/* WeixinJSBridge.invoke("getInstallState",{   
					'packageUrl': 'com.tencent.news://xxx', // IOS必填，xxxx:// 开头的一个scheme
				    'packageName':'com.tencent.news' // android必填，包名
			    },
			    function(e){
			    	if(e.err_msg) */
			    	scheduleShare.render(G, $(".main"), true, <%=onlyInClient%>);
			    /* }); */
			});

			G.imgUrl = imgs = G.pics.split(',')[0];
			wxProtocol.init({
				imgUrl: G.imgUrl === "" ? G.bgu : G.imgUrl,
				title: G.scheduleTitle,
				desc: G.scheduleDesc === "null" ? "" : G.scheduleDesc
			});
		})

    </script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?type=quick&ak=7641c2bcde6b6d1d3c07de7a090029f8&v=1.0"></script>
</body>
</html>