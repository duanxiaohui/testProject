<%@ page contentType="text/html;charset=utf-8" %>
<%
    Long cid = (Long)request.getAttribute("cid");
    Long sid = (Long)request.getAttribute("sid");
    String uuid = (String)request.getAttribute("uuid");
    Boolean bell = (Boolean)request.getAttribute("on");
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta id="viewport" name="viewport" content="width=320;width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0"> 
    
    <title>365日历</title>
    <link href="/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet"/>
    <link href="/pages/client_calendar_h5/css/main.css?t=20140412" rel="stylesheet"/>
    <link href="/pages/client_calendar_h5/css/silde_s.css?t=20140412" rel="stylesheet"/>
    <script type="text/javascript">
        var G = {
            cid: '<%=cid%>',
            sid: '<%=sid%>',
            uuid: '<%=uuid%>',
            bell: '<%=bell%>'
        };
    </script>
</head>
<body>
        <div class="bg"></div>
        <div class="bg_mask"></div>
        <div class="calendar_content none">
            <div class="title">
                <div class="share_btn"></div>
                <div class="return_btn"></div>
                <h2></h2>
            </div>
            <div class="title_bg">
            </div>
            <div class="pic">
            </div>
            <div class="main">
                <h3></h3>
                <div class="btn e_clear">
                    <a href="javascript:;"><span class="remind_icon"></span><span class="btn_txt"></span></a>
                </div>
                <div class="time"></div>
                <div class="address"></div>
                <div class="txt">
                </div>
                <div class="url">
                    查看详情<a href="">http://wwww.365rili.com</a>
                </div>
                <div class="comments">
                    <h3>全部评论</h3>
                    <div class="comments_content">
                        <ul>
                        </ul>
                        <a href="javascript" class="view_all_comments">查看全部评论</a>
                    </div>
                    <a href="javascript:;" class="enter_calendar">进入该日历</a>
                </div>
            </div>
        </div>
    <input type="hidden" id="UID" value="">
    <input type="hidden" id="TOKEN" value="">
    <input type="hidden" id="MAC" value="">
    <input type="hidden" id="VER" value="">
    <script type="text/javascript" src="/js/lib/zepto.min.js"></script>
    <script type="text/javascript" src="/js/lib/zTouch.js"></script>
    <script type="text/javascript" src="/js/lib/slide_s.js?20141114"></script>
    <script type="text/javascript" src="/pages/client_calendar_h5/js/calendar_public.js"></script>
</body>
</html>