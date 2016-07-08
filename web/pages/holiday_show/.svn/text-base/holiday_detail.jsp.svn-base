<%@ page contentType="text/html;charset=utf-8" %>
<%
	String name = (String)request.getAttribute("name");
	String content = (String)request.getAttribute("content");
	String[] contentLines = (String[])request.getAttribute("contentLines");
	String mainPic = (String)request.getAttribute("mainPic");
	String day = (String)request.getAttribute("day");
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
    <div class="holiday_info">
    	<div class="holiday_info_img">
    		<img src="<%=mainPic %>" alt="" width="100%">
    	</div>
    	<div class="holiday_info_txt">
    		<h3><%=day %>  <%=name %></h3>
            <div class="content">
    		<%for (String line : contentLines) {%>
    		<p><%=line%></p>
    		<%} %>
            </div>
    	</div>
    </div>
    <div class="holiday_info_btn">
    	<a href="javascript:;" class="share_btn">分享</a>
    	<a href="javascript:;" class="view_all">查看全部节日</a>
    </div>

    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/app.js?20141205_2"></script>
    <script type="text/javascript" src="/js/lib/footer.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script>
        function query (name, href) {
            var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
            href = href || location.href;
            if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
            return "";
        }
        (function () {

            if(query('client') == '0'){
                $('.holiday_info_btn').addClass('isnotclient');

                wxProtocol.init(function (wx, link) {
                    var content = (function(){/*<%=content%>*/}).toString();
                    content = content.substring(content.indexOf("/*") + 2,content.lastIndexOf("*/"));
                    wx.onMenuShareAppMessage({
                        title: '【<%=name %>】',
                        desc: content.substr(0, 256),
                        link: link,
                        imgUrl: '<%=mainPic %>',
                    });
                    wx.onMenuShareTimeline({
                        title: '【<%=name %>】' + content.substr(0, 256),
                        link: link,
                        imgUrl: '<%=mainPic %>',
                    }); 
                });

                footer.init({
                    type: 'default',
                    cocourl: {
                        ios: 'coco53://365rili.com',
                        android: 'coco://365rili.com'
                    }
                });
                $('.holiday_info_btn').css({
                    'padding': '20px 20px 72px'
                });
            }

            $('.view_all').on('tap', function () {
                var date = new Date;
                window.location.href = '/holiday/index.do?day=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + (query('client') == '0' ? '&client=0' : '');
            });

            $('.share_btn').on('tap', function () {
                var content = (function(){/*<%=content%>*/}).toString();
                app.call({
                    action: 'share',
                    params: [
                        {
                            name: 'shareString',
                            value: JSON.stringify({
                                title: '【<%=name %>】',
                                content: content.substring(content.indexOf("/*") + 2,content.lastIndexOf("*/")).substr(0, 256),
                                link: window.location.href + '&client=0',
                                image: '<%=mainPic %>'
                            })
                        }
                    ],
                    callBack: function (headers) {}
                });
            });
        })();
    </script>
</body>
</html>