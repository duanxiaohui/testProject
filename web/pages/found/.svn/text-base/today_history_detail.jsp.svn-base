<%@ page contentType="text/html;charset=utf-8" %>
<%@page import="java.util.Map"%>
<%
	Map<String, Object> data = (Map)request.getAttribute("data");
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>历史上的今天</title>
<meta name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0"> 
<script>document.documentElement.style.webkitUserSelect='none';</script>
<meta name="format-detectionstyle" content="telephone=no"/>
<link href="/pages/found/style/main.css" rel="stylesheet">
</head>
<body>
    <div class="info">
        <div class="top_img">
            <img src="<%=data.get("picture") %>" width="100%">
            <div class="info_txt">
                <h1><%=data.get("title") %></h1>
                <p><%=data.get("desctribute")%></p>
            </div>
        </div>

    	<div class="main">
    		<%=data.get("content")%>
    	</div>

    	<div class="editor">
    		 编辑/<%=data.get("author") %>
    	</div>
    </div>
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js"></script>
    <script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
     <script src="/js/lib/footer.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script>
    $(function () {
        var shareData ={
            "title":'<%=data.get("title") %>',
            "content":'<%=data.get("desctribute")%>',
            "link":window.location.href,
            "image":"<%=data.get("picture") %>"
        }
        if(app.version){
            app.call({
                action: 'setShareContent',
                params: [
                    {
                        name: 'shareString',
                        value: JSON.stringify(shareData)
                    }
                    ],
                callBack: null
            })
        }
         if(app.getUa.weixin){
                $('body').css({
                    "paddingBttom":35 + 'px'
                });
                footer.init({
                    type: 'publicSchedule',
                    cocourl: 'coco://365rili.com'
                });

                wxProtocol.init(function (wx, link) {
                    wx.onMenuShareAppMessage({
                        title: '<%=data.get("title") %>',
                        desc: '<%=data.get("desctribute")%>',
                        imgUrl: "<%=data.get("picture") %>"
                    });
                    wx.onMenuShareTimeline({
                        title: '<%=data.get("title") %>',
                        imgUrl: "<%=data.get("picture") %>"
                    });
                });
            }
    })
    </script>
 </body>
</html>

