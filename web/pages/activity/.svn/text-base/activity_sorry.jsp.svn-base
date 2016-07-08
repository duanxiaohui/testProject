<%@page import="com.rili.common.beans.Schedule"%>
<%@page import="com.rili.common.beans.Calendar365"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="com.rili.common.beans.EventPayTradeType"%>
<%@page import="com.rili.common.beans.EventPay"%>
<%@page contentType="text/html;charset=utf-8" %>
<%@page import="com.rili.common.beans.Event1" %>
<%
	Event1 event1 = (Event1) request.getAttribute("event1");
	boolean needPay = (Boolean) request.getAttribute("needPay");
	EventPay eventPay = null;
	EventPayTradeType eventPayTradeType = null;
	if(needPay) {
		eventPay = (EventPay) request.getAttribute("eventPay");
		eventPayTradeType = (EventPayTradeType) request.getAttribute("eventPayTradeType");
	}
	
	Schedule schedule = (Schedule) request.getAttribute("schedule");
	Calendar365 calendar365 = (Calendar365) request.getAttribute("calendar");
	String calendarLogo = (String) request.getAttribute("calendarLogo");
/* 	boolean isSubscribed = (Boolean) request.getAttribute("isSubscribed");
	boolean isLogined = (Boolean) request.getAttribute("isLogined"); */
	boolean isWeixin = (Boolean) request.getAttribute("isWeixin");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<link rel="stylesheet" type="text/css" href="/pages/activity/css/activity_sorry.css" media="screen" />
<script src="/js/lib/zepto.min.js"></script>
<script src="/js/lib/app.js"></script>
<title><%=schedule.getTitle() %></title>
</head>
<body>
<div class="main">
    <div class="sorry_container">
    	<img src="/pages/activity/images/sorry_icon.png" />
    	<h1>
    		对不起，本次活动名额已满<br />
    		小伙伴们下次早些参加哦~
    	</h1>
    </div>
    <div class="calendar_info_container">
    	<h1>
    		礼品提供方:
    	</h1>
    	<div class="calendar_info" >
    		<div class="calendar_info_icon">
				<img src="http://cocoimg.365rili.com/pic/default/<%=calendarLogo %>" />
			</div>
	    	<div class="calendar_info_content">
	    		<h2>
	    			<%=calendar365.getTitle() %>
	    		</h2>
	    		<h3>
	    			<%=calendar365.getDescription() %>
	    		</h3>
	    	</div>
	    	<div class="clear"></div>
    	</div>
    </div>
    <div class="btn">
        <a href="javascript:;" class="focus_btn"></a>
        <div class="tip">
        <%if(isWeixin) { %>
        	下载[365日历]，使用微信帐号登录，<br/>
        	每日新鲜活动不会错过。
        <%} else { %>
        	关注[<%=calendar365.getTitle() %>]日历,新鲜活动不会错过。
        <%} %>
        </div>
    </div>
</div>

<script>
	var G = {
		uuid:'<%=schedule.getUuid() %>',
		cid:<%=schedule.getCalendarId() %>
	};
	
	var isSubscribed = false;
	$(function() {
		$('.focus_btn').on('click', subscribe);
			
		if(app.getUa.weixin) {
			$('.focus_btn').html("查看更多活动信息");
			$('.focus_btn').show();
		} else if(app.getUa.androidCoco || app.getUa.ios) {
			getSubscribeStatus();
		} 
	});
	
	function getSubscribeStatus() {
		var url = "/event/isSubscribed.do";
		getTokenByCocoPay(url, function (header) {
	        $.ajax({
	            url: url,
	            headers : header,
	            type:"post",
	            data:{
	                eventId: <%=event1.getEventId()%>
				},
				success : function(data) {
					if (data.state == "ok") {
						if(data.isSubscribed) {
							$('.focus_btn').html("查看更多活动信息");
							isSubscribed = true;
						} else {
							$('.focus_btn').html("关注此日历");
						}
					} else {
						$('.focus_btn').html("查看更多活动信息");
					}
					$('.focus_btn').show();
				}
			});
		});
	}
	
	function subscribe() {
		app.open({
			ios:'coco://365rili.com/subscribe?calendarID=' + G.cid + '&calendarType=public' + (isSubscribed ? '' : '&action=join'),
			android:'coco://365rili.com/subscribe?calendarID=' + G.cid + (isSubscribed ? '' : '&action=join')
		},app.getUa.ios);
		
		if(app.getUa.weixin && typeof WeixinJSBridge != 'undefined') {
			WeixinJSBridge.call('closeWindow');
		}
	}
	
	function subscribe2() {
		if(app.getUa.weixin || isSubscribed) {
			app.open({
				ios:'coco://365rili.com/subscribe?calendarID=' + G.cid + '&calendarType=public' + (isSubscribed ? '' : '&action=join'),
				android:'coco://365rili.com/subscribe?calendarID=' + G.cid + (isSubscribed ? '' : '&action=join')
			},app.getUa.ios);
			
			if(app.getUa.weixin && typeof WeixinJSBridge != 'undefined') {
				WeixinJSBridge.call('closeWindow');
			}
		} else {
		
			var url = "/coco/subscribePublicCalendar.do";
			getTokenByCocoPay(url, function (header) {
		        $.ajax({
		            url: url,
		            headers : header,
		            type:"post",
		            data:{
		                calendarID: <%=calendar365.getId() %>
					},
					success : function(data) {
						if (data.state == "ok") {
							$('.focus_btn').html("查看更多活动信息");
							isSubscribed = true;
						}
						
						app.open({
							ios:'coco://365rili.com/subscribe?calendarID=' + G.cid + '&calendarType=public' + (isSubscribed ? '' : '&action=join'),
							android:'coco://365rili.com/subscribe?calendarID=' + G.cid + (isSubscribed ? '' : '&action=join')
						},app.getUa.ios);
					}
				});
			});
		}
	}
	
	function getTokenByCocoPay(url, callBack) {
		if(!app.getUa.androidCoco && app.getUa.weixin) {
			callBack({});
			return;
		}
		mar = setTimeout(function() {
			try {
				t = '';
				tSource = (new Base64()).decode(t);
				if (tSource.indexOf('%') == -1) {
					callBack({
						'Authorization' : 'Basic ' + t
					});
				} else {
					callBack({
						'x-365rili-key' : t
					});
				}
			} catch (e) {
				callBack({});
			} 
		}, 500); 
		
		try {
			app.call({
				action : 'getEncryptHeaders',
				params : [ {
					name : 'url',
					value : url
				} ],
				callback : function(headers) {
					try {
						clearTimeout(mar);
					} catch (e) {
					}
					headers = JSON.parse(headers);
					callBack(headers);
				}
			});
		} catch (e) {
			try {
				app.call({
					action : 'getToken',
					callBack : function(token) {
						try {
							clearTimeout(mar);
						} catch (e) {
						}
						headers = {
							'x-365rili-key' : token
						};
						callBack(headers);
					}
				});
			} catch (e) {
				
			}
		}
	}
	
	window._alert = function() {
		var title = "提示";
		var txt;
		var callback;
		
		if(arguments.length >= 2) {
			title = arguments[0];
			txt = arguments[1];
		} else {
			txt = arguments[0];
		}
		if(typeof arguments[2] != 'undefined') {
			callback = arguments[1];
		}
		$(document.body).dialog({
			title: title,
			content : txt,
			closeBtn : false,
			width : 270,
			buttons : {
				'好' : function() {
					this.close().destroy();
				}
			},
			close: callback
		});
	}
</script>
</body>
</html>