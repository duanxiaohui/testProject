function browserCheck(){
	if ($.browser.msie) {
		var ver = parseInt($.browser.version);
		if (ver < 8) {
			var text = ver < 7 ? '对不起，您使用的网页浏览器版本非常古老，<br/>不仅无法使用365日历的部分功能，而且还会错过其它网站的精彩体验，<br/>强烈建议您升级您的浏览器！<br/><a href="http://www.ie6countdown.com/" target="_blank" style="color:blue">看看正在消失的IE6浏览器</a>' : '尊敬的365日历用户，您想体验更好用的、更快的、更酷的365日历产品吗？请升级您的网页浏览器！'
			$.confirm(text, {
				width: 500,
				buttons: [{
					text: '马上升级',
					click: function(){
						open('http://www.microsoft.com/zh-cn/download/ie.aspx?q=internet+explorer');
						$(this).dialog("close");
					}
				}, {
					text: '下次再说',
					click: function(){
						$(this).dialog("close");
					}
				}]
			});
		}
	}
}

$(function($){
	var cid = G.cid;
	if(cid){
		G.cldPanel = $('#div_calendar_panel');
		G.cldPanel.calendarPanel({cid:cid});
		renderCalendarExtend();
	}
	browserCheck();
});

function renderCalendarExtend(){
	$(".calendar_title").html(G.title);
	$(".footer_calendar_title").html(G.title);
	//$(".calendar_icon").attr("src", G.bgu);
	
}


function getCalendarExtend(cid){
	$.ajax({
		url:"/coco/single/getCalendarWithExtend.do",
		type:"post",
		dataType:"json",
		data:{
			calendarID:cid
		},
		success:function(data){
			if(data.state == "ok"){
				G.calendarData = data;
				G.title = G.calendarData.calendar.title;
				G.color = G.calendarData.calendar.color;
				$(".calendar_title").html(data.calendar.title);
				$(".footer_calendar_title").html(data.calendar.title);
				var img = data.extend.theme.bgu;
				$(".calendar_icon").attr("src", img);
				
			}
		}
	})
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}