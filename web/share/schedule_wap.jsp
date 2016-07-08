<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.List" %>
<%
Long calendarID = (Long)request.getAttribute("calendarID");
Long sid = (Long)request.getAttribute("sid");
Boolean isSpecial = (Boolean) request.getAttribute("special_dl");
String calendarName = (String)request.getAttribute("calendarName");
String calendarDesc = (String) request.getAttribute("calendarDesc");
String title = (String)request.getAttribute("title");
String desc = (String)request.getAttribute("desc");
String creator = (String) request.getAttribute("creator");
String bgu = (String) request.getAttribute("bgu");
String url = (String)request.getAttribute("url");
String location = (String)request.getAttribute("location");
String dateline1 = (String)request.getAttribute("dateline1");
String dateline2 = (String)request.getAttribute("dateline2");
String lunar_time = (String)request.getAttribute("lunar_time");
List<String> pics = (List<String>)request.getAttribute("pics");
String picStr = "";
String imgUrl = "";
if(pics != null && pics.size() > 0){
	imgUrl = pics.get(0);
	for(int i=0; i<pics.size(); i++){
		picStr+= pics.get(i);
        if(i != pics.size() -1){
        	picStr += ",";
        }
    }
}

Boolean isPublic = (Boolean) request.getAttribute("is_public");
Boolean isGroup = (Boolean) request.getAttribute("is_group");
Boolean isMember = (Boolean) request.getAttribute("is_member");
Boolean expired = (Boolean) request.getAttribute("expired");

Integer is_sub = (Integer) request.getAttribute("is_sub");
String calendarType;
if(isPublic && isGroup != true){
	calendarType = "public";
}else if(is_sub != null && is_sub == 1){
	calendarType = "group";
}else{
	calendarType = "private";
}
String comments = (String)request.getAttribute("replyList");
String uuid = (String)request.getAttribute("uuid");
Boolean isLogin = (Boolean)request.getAttribute("login");
Boolean on = (Boolean) request.getAttribute("on");
%>
<!DOCTYPE html>
<html> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0">
<meta content="telephone=no" name="format-detection">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0"> 

<title>365日历日程分享</title>
<link href="/share/style/share.css?20141107" rel="stylesheet">
<link rel="stylesheet" href="/share/style/shareForWhite.css">
<link href="/pages/client_calendar_h5/css/silde_s.css" rel="stylesheet" media="screen">
<link rel="stylesheet" type="text/css" href="/css/footer.css" />

<script>
	var G = {
		cid: '<%=calendarID%>',
        on: <%=on%>,
	    isSpecial: '<%=isSpecial%>',
	    calendarType: function(){/*<%=calendarType%>*/},
	    calendarName: function(){/*<%=calendarName%>*/},
	    calendarDesc: function(){/*<%=calendarDesc%>*/},
		scheduleTitle: function(){/*<%=title%>*/},
		scheduleDesc: function(){/*<%=desc%>*/},
	    creator: function(){/*<%=creator%>*/},
	    bgu: function(){/*<%=bgu %>*/},
		url: function(){/*<%=url%>*/},
	    location: function(){/*<%=location%>*/},
		dateline1: function(){/*<%=dateline1%>*/},
		dateline2: function(){/*<%=dateline2%>*/},
		lunar_time: function(){/*<%=lunar_time%>*/},
		pics: function(){/*<%=picStr%>*/},
		imgUrl: function(){/*<%=imgUrl%>*/},
        comments: function(){/*<%=comments%>*/},
        uuid: function(){/*<%=uuid%>*/},
        sid: function(){/*<%=sid%>*/},
        isLogin: function(){/*<%=isLogin%>*/},
	    isMember: function(){/*<%=isMember%>*/}
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
    <input type="hidden" id="TOKEN" value="">
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js"></script>
    <script type="text/javascript" src="/share/js/scheduleShare.js?20141224"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script type="text/javascript" src="/js/lib/slide_s.js?20141114"></script>
    <script type="text/javascript" src="/js/lib/footer.js"></script>
    <script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
    <script>
    	$(function() {
			scheduleShare.render(G, $(".main"), true);
			
			wxProtocol.init({
				imgUrl: G.imgUrl === "" ? 'http://cocoimg.365rili.com/logo/114.png' : G.imgUrl,
				title: G.scheduleTitle,
				desc: G.scheduleDesc === "null" ? "" : G.scheduleDesc
			});
		})
    </script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?type=quick&ak=7641c2bcde6b6d1d3c07de7a090029f8&v=1.0"></script>
</body>
</html>