<%@ page contentType="text/html;charset=utf-8" %>
<%@page import="java.util.Map"%>
<%
	Map<String, Object> data = (Map)request.getAttribute("data");
    String today = (String)request.getAttribute("today");
%>
<script type="text/javascript">
    var G ={
        content:function(){/*<%=data.get("content")%>*/},
        picture:function(){/*<%=data.get("picture")%>*/},
        author:function(){/*<%=data.get("author")%>*/},
        title:function(){/*<%=data.get("title")%>*/},
        datalist:function(){/*<%=data.get("datalist")%>*/},
        prefix:function(){/*<%=data.get("prefix")%>*/},
        today:function(){/*<%=today%>*/}
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
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>历史上的今天</title>
<meta name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0"> 
<script>document.documentElement.style.webkitUserSelect='none';</script>
<meta name="format-detectionstyle" content="telephone=no"/>
<link href="/pages/ui-lib/css/ui-lib.css" rel="stylesheet">
<link href="/pages/found/style/found_history.css" rel="stylesheet">
</head>
<body>

    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js"></script>
    <script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
     <script src="/js/lib/footer.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script src="/pages/found/js/function.js"></script>
    <script src="/pages/found/js/found_history.js?2016010402"></script>
 </body>
</html>

