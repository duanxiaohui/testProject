<%@ page contentType="text/html;charset=utf-8" %>
<%
	Integer calendarID = (Integer) request.getAttribute("calendarID");
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	java.util.Date currentTime = new java.util.Date();
	String currDate = formatter.format(currentTime);
	Boolean isSpecial = (Boolean) request.getAttribute("special_dl");
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta id="viewport" name="viewport" content="width=320;width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
    <meta content="telephone=no" name="format-detection">
    <title>365日历</title>
    <link href="/share/style/share.css" rel="stylesheet" media="screen">
    <link href="/share/style/share_clendar.css" rel="stylesheet" media="screen">
    <link href="/pages/client_calendar_h5/css/silde_s.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" type="text/css" href="/css/footer.css" />


    <script type="text/javascript">
        var G = {
            currDate: new Date("<%=currDate%>"),
            cid: <%=calendarID%>,
            isSpecial:<%=isSpecial%>
        };
    </script>
</head>
<body>
    <div class="sc_main">
        <div class="header">
            <div class="head_content">
                <div class="icon"><img width="100"/></div>
                <h3></h3>
                <p class="cares none">关注者 <span></span></p>
                <div class="clendar_info"></div>
                <p class="recent">近期日程</p>
            </div>
        </div>

        <div class="schedule_list">
        </div>
        <a href="javascript:;" class="schedule_more_btn" style="display:none;">查看更多日程</a>
    </div>
 <!--    <div class="share_footer">
        <a href="javascript:;" class="down_btn">立即使用</a>
        <div class="logo"><a href="javascript:;"></a></div>
        <p>公众日历-发现更多有趣日程</p>
    </div> -->

    <div class="ss_main none">

    </div>

    <div class="mask none"></div>
    <div class="tips_layer none">
        <h3></h3>
        <p></p>
        <a href="javascript:;" class="layer_btn">立即使用</a>
    </div>
    <script type="text/javascript" src="/js/lib/zepto.min.js"></script>
    <script type="text/javascript" src="/js/lib/zepto.cookie.js"></script>
    <script type="text/javascript" src="/js/lib/zTouch.js"></script>
    <script type="text/javascript" src="/share/js/scheduleShare.js?20141224"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script type="text/javascript" src="/js/lib/slide_s.js?20141114"></script>
    <script type="text/javascript" src="/share/js/schedule_public_calendar.js?20141205"></script>
    <script type="text/javascript" src="/js/lib/footer.js"></script>
    <script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
    <script>
        $(function() {
            footer.init({
                type:'publicCalendar',
                cocourl:{
                    ios:'coco://365rili.com/subscribe?calendarID='+G.cid + '&calendarType=public',
                    android:'coco://365rili.com/subscribe?calendarID='+G.cid
                }
            });
        })
    </script>
</body>
</html>