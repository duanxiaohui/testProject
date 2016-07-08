<%@ page contentType="text/html;charset=utf-8" %>
<%
    // 奇葩节日
    Object holidayRes = request.getAttribute("holidayRes");
    // 历史上今天
    Object todayHistory = request.getAttribute("todayHistory");

    // qq同城
    Object qqtc = request.getAttribute("qqtc");

    // 专题
    Object recommands = request.getAttribute("recommands");
    Object activity = request.getAttribute("activity");
    Object banner = request.getAttribute("banner");
    Object activityList = request.getAttribute("activityList");

%>
<script type="text/javascript">
    var G ={
        "holidayRes":<%=holidayRes%>,
        "todayHistory":<%=todayHistory%>,
        "banner":<%=banner%>,
        "activity":<%=activity%>,
        "recommands":<%=recommands%>,
        "qqtc":<%=qqtc%>,
        "activityList":<%=activityList%>
    }
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
<title>发现</title>
<meta name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0"> 
<script>document.documentElement.style.webkitUserSelect='none';</script>
<meta name="format-detectionstyle" content="telephone=no"/>
<link href="/pages/ui-lib/css/ui-lib.css" rel="stylesheet">
<link href="/css/silde_s.css" rel="stylesheet">
<link href="/pages/found/style/found_new.css?20160415" rel="stylesheet">
<script>
    window.zhuge = window.zhuge || [];
    window.zhuge.methods = "_init debug identify track trackLink trackForm page".split(" ");
    window.zhuge.factory = function(b) {
        return function() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(b);
            window.zhuge.push(a);
            return window.zhuge
        }
    };
    for (var i = 0; i < window.zhuge.methods.length; i++) {
        var key = window.zhuge.methods[i];
        window.zhuge[key] = window.zhuge.factory(key)
    };
    window.zhuge.load = function(b, x) {
        if (!document.getElementById("zhuge-js")) {
            var a = document.createElement("script");
            var verDate = new Date();
            var verStr = verDate.getFullYear().toString() 
                + verDate.getMonth().toString() + verDate.getDate().toString();
            a.type = "text/javascript";
            a.id = "zhuge-js";
            a.async = !0;
            a.src = "https://zgsdk.zhugeio.com/zhuge-lastest.min.js?v=" + verStr;
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(a, c);
            window.zhuge._init(b, x)
        }
    };
    window.zhuge.load('eba2a244262e47c78989a1ea7764f391',{debug:false});
</script>
</head>
<body>
    <div id="VER" style="display: none;"></div>
    <div id="UID" style="display: none;"></div>
    <div id="MAC" style="display: none;"></div>
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js?20151016"></script>
    <script src="/js/lib/app.js?20151223"></script>
    <script src="/pages/found/js/function.js?20151119"></script>
    <script type="text/javascript" src="/js/lib/slide_s.js?20151016"></script>
    <script src="/pages/found/js/found_new.js?20160524"></script>

</body>
</html>
