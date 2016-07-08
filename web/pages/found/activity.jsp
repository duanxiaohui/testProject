<%@page import="com.rili.common.beans.Activity"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%
        Activity activity = (Activity)request.getAttribute("activity");

%>
<script type="text/javascript">
    var G ={
        "id":<%=activity.getId() %>,
        "title":"<%=activity.getTitle() %>",
        "banner":"<%=activity.getBanner() %>",
        "starttime" :"<%=activity.getStarttime().getTime()%>",
        "endtime":"<%=activity.getEndtime().getTime() %>",
        "address":"<%=activity.getAddress() %>",
        "fee":'<%=activity.getFee()%>',
        "detailHtml":function(){/*<%=activity.getDetailHtml() %>*/},
        "tips":<%=("".equals(activity.getTips()) ? "''" : activity.getTips())%> ,
        "linkurl":"<%=activity.getLinkurl()%>",
        "linkurl_category":"<%=activity.getLinkurlCategory() %>",
        "comefrom":"<%=("".equals(activity.getComefrom()) ? "''" : activity.getComefrom())%>"
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
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0"> 
<title><%=activity.getTitle() %></title>
<meta name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0"> 
<script>document.documentElement.style.webkitUserSelect='none';</script>
<meta name="format-detectionstyle" content="telephone=no"/>
<link href="/pages/ui-lib/css/ui-lib.css" rel="stylesheet">
<link href="/css/footer.css" rel="stylesheet">
<link href="/pages/found/style/found_info.css?20151016" rel="stylesheet">

</head>
<body>
    <div class="found_active_detail">
        <div class="found_active_top">
            <img src="" alt="" width="100%">
        </div>
        <div class="found_active_list">
            <h3></h3>
            <p class="found_active_detail_address"></p>
            <p class="found_active_detail_time"></p>
            <p class="found_active_detail_fee"></p>
            <p class="found_active_url"></p>
        </div>
        <div class="found_active_formatHtml"></div>
        <div class="found_active_tips">
            <h3>温馨提示</h3>
            <ul></ul>
        </div>
        <a href="javascript:;" class="found_active_btn"></a>
    </div>
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js?20151016"></script>
    <script src="/js/lib/app.js"></script>
    <script src="/js/lib/footer.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script src="/pages/ui-lib/js/plug.js?20160527"></script>
    <script src="/pages/found/js/active_details.js?20160527"></script>
</body>
</html>
