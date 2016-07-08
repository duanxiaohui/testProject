<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%
	String today = (String)request.getAttribute("today");
	String weekDay = (String)request.getAttribute("weekDay");
	List<Map<String, Object>> todays = (List<Map<String, Object>>)request.getAttribute("todays");
	List<Map<String, Object>> legals = (List<Map<String, Object>>)request.getAttribute("legals");
	List<Map<String, Object>> hots = (List<Map<String, Object>>)request.getAttribute("hots");
	List<Map<String, Object>> jieqis = (List<Map<String, Object>>)request.getAttribute("jieqis");	
	List<Map<String, Object>> memorials = (List<Map<String, Object>>)request.getAttribute("memorials");	
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0">
<title>节日节气</title>
<link rel="stylesheet" type="text/css" href="/css/footer.css" />
<link href="/pages/holiday_show/css/main.css" rel="stylesheet">
</head>
<body>
    <div class="today">
    	<div class="today_date">
    		<%=today %>
    		<p><%=weekDay %> 今天</p>
    	</div>
    	<%if(!todays.isEmpty()) {%>
    	<div class="today_holiday">
    		<ul>
    			<%for(Map<String, Object> map : todays) {%>
    			<li>
                    <a href="/holiday/detail.do?id=<%=map.get("id")%>">
        				<img src="<%=map.get("thumbPic")%>"/>
        				<span class="point"></span>
        				<p><%=map.get("name") %></p>
                    </a>
    			</li>
    			<%} %>
    		</ul>
    	</div>
    	<%} %>
    </div>
    <%if(!todays.isEmpty()) {%>
    <div class="line"></div>
    <%} %>
    <div class="other_holiday">
    	<%if(!legals.isEmpty()) {%>
    	<dl class="on">
    		<dt class="e_clear js-show">
				<div class="legal_icon"></div>
    			法定节假日
				<div class="arrow"></div>
    		</dt>
    		<dd>
    			<ul>
    				<%for(Map<String, Object> map : legals) {%>
    				<li class="e_clear">
    					<span class="day_num"><%=map.get("distance")%>天</span>
    					<span class="point"></span>
    					<p>
    						距<a href="/holiday/detail.do?id=<%=map.get("id")%>"><span class="holiday_txt"><%=map.get("name")%></span></a><span class="holiday_date"><%=map.get("day")%></span>
    					</p>
    				</li>
    				<%} %>
    			</ul>
    		</dd>
    	</dl>
    	<%} %>
    	<%if(!hots.isEmpty()) {%>
    	<dl>
    		<dt class="e_clear js-show">
				<div class="hot_icon"></div>
    			热门节日
				<div class="arrow"></div>
    		</dt>
    		<dd>
    			<ul>
    				<%for(Map<String, Object> map : hots) {%>
    				<li class="e_clear">
    					<span class="day_num"><%=map.get("distance")%>天</span>
    					<span class="point"></span>
    					<p>
    						距<a href="/holiday/detail.do?id=<%=map.get("id")%>"><span class="holiday_txt"><%=map.get("name")%></span></a><span class="holiday_date"><%=map.get("day")%></span>
    					</p>
    				</li>
    				<%} %>
    			</ul>
    		</dd>
    	</dl>
    	<%} %>
    	<%if(!jieqis.isEmpty()) {%>
		<dl>
    		<dt class="e_clear js-show">
				<div class="solar_icon"></div>
    			二十四节气
				<div class="arrow"></div>
    		</dt>
    		<dd>
    			<ul>
    				<%for(Map<String,Object> map : jieqis) {%>
    				<li class="e_clear">
    					<span class="day_num"><%=map.get("distance")%>天</span>
    					<span class="point"></span>
    					<p>
    						距<a href="/holiday/detail.do?id=<%=map.get("id")%>"><span class="holiday_txt"><%=map.get("name")%></span></a><span class="holiday_date"><%=map.get("day")%></span>
    					</p>
    				</li>
    				<%} %>
    			</ul>
    		</dd>
    	</dl>
    	<%} %>
    	<%if(!memorials.isEmpty()) {%>
		<dl>
    		<dt class="e_clear js-show">
				<div class="other_icon"></div>
    			其他节日
				<div class="arrow"></div>
    		</dt>
    		<dd>
    			<ul>
    				<%for(Map<String,Object> map : memorials) {%>
    				<li class="e_clear">
    					<span class="day_num"><%=map.get("distance")%>天</span>
    					<span class="point"></span>
    					<p>
    						距<a href="/holiday/detail.do?id=<%=map.get("id")%>"><span class="holiday_txt"><%=map.get("name")%></span></a><span class="holiday_date"><%=map.get("day")%></span>
    					</p>
    				</li>
    				<%} %>
    			</ul>
    		</dd>
    	</dl>
    	<%} %>
    </div>
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/app.js?20141205_2"></script>
    <script type="text/javascript" src="/js/lib/footer.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script>
    $('.js-show').on('tap', function () {
        var _this = $(this);
        _this.parents('dl').toggleClass('on');
    });
    function query (name, href) {
        var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
        href = href || location.href;
        if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    }
    (function () {
        if(query('client') == '0'){
            var a = document.getElementsByTagName('a');
            for (var i = 0; i < a.length; i++) {
                a[i].href += '&client=0';
            };

            wxProtocol.init(function (wx, link) {
                wx.onMenuShareAppMessage({
                    title: '365日历【全年节日大全】',
                    desc: '全年的法定节假日、热门节日、二十四节气以及上百个纪念日的来由与风俗详解！',
                    link: link,
                    imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
                });
                wx.onMenuShareTimeline({
                    title: '【节日大全】全年法定节假日、热门节日、节气、纪念日的来由与风俗详解！',
                    link: link,
                    imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
                }); 
            });

            footer.init({
                type: 'default',
                cocourl: {
                    ios: 'coco53://365rili.com',
                    android: 'coco://365rili.com'
                }
            });
            $('.other_holiday').css({
                'padding': '0px 20px 52px'
            });
        }
    })();
    </script>
</body>
</html>