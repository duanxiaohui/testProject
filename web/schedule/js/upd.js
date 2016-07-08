	$(function(){
		//根据useragent判断当前的设备类型
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";
		var bIscoco = sUserAgent.match(/android coco/i) == "android coco";
		if(bIsIpad || bIsIphoneOs){
			$("#header").hide();
		}
		$.ajax({
			url:"/schedule/updlist_data.do",
			type:"post",
			dataType:"json",
			data:{
				c:getURLParameter("c"),
				s:getURLParameter("s")
			},
			success: function(data){
				data.sort(function(a, b){
					var a_start = new Date(a.start_time);
					var b_start = new Date(b.start_time);
					if(a.allday_event){
						a_start.setHours(0);
						a_start.setMinutes(0);
						a_start.setSeconds(0);
					}
					if(b.allday_event){
						b_start.setHours(0);
						b_start.setMinutes(0);
						b_start.setSeconds(0);
					}
					return a_start.getTime() - b_start.getTime();
				});
				$("#header_count").html(data.length);
				renderSchedule(data);
				$(".schedule_list_container").each(function(){
					var $elem = $(this);
					if($elem.find(".schedule_list").height() > 126){
						$elem.append('<a href="javascript:;" class="btn">更多</a>');
						$elem.find(".schedule_list").addClass("ht");
					}
				});
				$(".schedule_list_container").click(function(){
					if($(this).find(".schedule_list").hasClass("ht")){
						$(this).find(".schedule_list").removeClass("ht");
						$(this).find(".btn").text("收起");
					}else{
						$(this).find(".schedule_list").addClass("ht");
						$(this).find(".btn").text("更多");
					}
				});
				$(".schedule_link").click(function(e){
					e.stopPropagation();
				});
						
			}
		});		
	});
	
	function renderSchedule(schedules){
		var container = $("#schedule_container"),day,daynum,week;
		for(var i in schedules){
			var item = schedules[i];
			var start = "";
			var date=new Date(), schedulesDatenum=item.start_time.split(" ")[0],y=parseInt(schedulesDatenum.split("-")[0],10),m=parseInt(schedulesDatenum.split("-")[1],10)-1,d=parseInt(schedulesDatenum.split("-")[2],10),schedulesDate=new Date();
			schedulesDate.setFullYear(y);
			schedulesDate.setMonth(m,d);
			schedulesDate.setDate(d);
			var second=schedulesDate.getTime()-date.getTime();
			daynum= parseInt(second / 86400000);
			week='+'+["星期天","星期一","星期二","星期三","星期四","星期五","星期六"][schedulesDate.getDay()]
			if(daynum==0){day="+今天";}
			if(daynum>0){
				if(daynum==1){
					day="+明天";
				}else{
					day='+'+daynum+'天后';
				}
			}
			if(daynum<0){
				if(daynum==-1){
					day="+昨天";
				}else if(daynum==-2){
					day="+前天";
				}else{
					day='+'+Math.abs(daynum)+'天前';
				}
			}
			if(item.allday_event){
				start = item.start_time.split(" ")[0] + week + day;
			}else{
				start = item.start_time.substr(0, item.start_time.lastIndexOf(":")) + week + day;
			}
			var satartArray=start.replace(/-/g, "/").split('+');
			container.append('<div class="date_title">'+ satartArray[0] +'<span class="">'+satartArray[1]+'</span><span class="">'+satartArray[2]+'</span></div>');
			var htmlStr = '<div class="schedule_list_container"><div class="schedule_list">'+ html_encode(html_decode(item.text));
			if(item.url){
				htmlStr += '<a class="schedule_link" href="' + item.url + '">'+item.url+'</a>';
			}
			htmlStr += '</div></div>';
			container.append(htmlStr);
		}
		
	}
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
function html_encode(str){
	var s = "";  
	if (str.length == 0) return "";  
	s = str.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");  
	s = s.replace(/>/g, "&gt;");  
	s = s.replace(/ /g, "&nbsp;");  
	s = s.replace(/\'/g, "&#39;");  
	s = s.replace(/\"/g, "&quot;");  
	s = s.replace(/\n/g, "<br>");  
	return s;  
}
function html_decode(str)  
{  
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&amp;/g, "&");  
		s = s.replace(/&lt;/g, "<");  
		s = s.replace(/&gt;/g, ">");  
		s = s.replace(/&nbsp;/g, " ");  
		s = s.replace(/&#39;/g, "\'"); 
		s = s.replace(/&quot;/g, "\"");
		s = s.replace(/<br>/g, "\n");
		return s;  
}