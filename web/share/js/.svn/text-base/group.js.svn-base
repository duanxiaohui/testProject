/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2014-10-25 10:49:18
 * @version 1.0
 */
/**
 * share
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2015-08-20 17:57:00
 * @version 1.0
 */
$(function () {
	var group = {
		init:function () {
			group.render();
		},
		render:function () {
			$.ajax({
				url: '/calendar/getShareInfo.do?key='+G.key +"&t="+ new Date(),
				type: 'post',
				dataType: 'json',
				success: function(data){
				// 	{
				// 	"userCount": 6,
				// 	"calendarDesc": "俺家的",
				// 	"calendarType": 0,
				// 	"calendarID": 200990533,
				// 	"bgu": "http://cocoimg.365rili.com/pic/default/330feb45-cab4-4a58-a8b7-ee365ebafe4c.jpg!small480",
				// 	"is_member": false,
				// 	"state": "ok",
				// 	"userList": [{
				// 		"header_url": "http://tp2.sinaimg.cn/2118218477/50/0/1",
				// 		"name": "漂亮姐姐小跟班钱"
				// 	}, {
				// 		"name": "佳缘"
				// 	}, {
				// 		"header_url": "http://cocoimg.365rili.com/avatar/default/750d4b3d-4a2a-43d3-820c-6a3af57dbb55.jpg",
				// 		"name": "天天小开心"
				// 	}, {
				// 		"name": "向蕊"
				// 	}, {
				// 		"header_url": "http://wx.qlogo.cn/mmopen/EapkVzoStUaCVYicZtneeiaibAAMzWRTEicrLRNhHvbmQPyhqd7hGlp4lMUsnDBe9oHiaFlRNecIG0PdNmMj57TDhSpZymUqKaiabK/0",
				// 		"name": "张明臣"
				// 	}],
				// 	"is_login": false,
				// 	"calendarName": "向蕊家的日历"
				// }
					is_login=data.is_login;
					is_member=data.is_member;
					calendarid=data.calendarID;
					var bgu = data.bgu ? data.bgu : "/share/images/group_bg.jpg";
					var logo = data.logo ? data.logo :"/share/images/group_avtvar.png"
					var divTmpl = '<div class="group_bg" style="background-image:url('+bgu+')">\
						    		<div class="calendar_icon" style="background-image:url(' + logo + ')"></div>\
						    	</div>\
						    	<div class="group_content">\
						    		<h3>'+data.calendarName+'</h3>\
						    		<p class="number">群成员（'+data.userCount+'人）</p>\
						    		<p>'+data.calendarDesc+'</p>\
						    		<a href="javascript:;" class="group_btn">下载365日历 立即加入</a>\
						    	</div>';
					$(".group_main").append(divTmpl);
					group.bindEvent();
				}
			})
		},
		bindEvent:function () {
			$(".group_main").on("tap",".group_btn", function(evt){
				if(G.isExpire){
					return;
				}
				if(is_login){
					app.open({
						ios:'coco://365rili.com/calendar?cid='+calendarid+'&key='+G.key+'&action=join',
						android:'coco://365rili.com/calendar?cid='+calendarid+'&key='+G.key+'&action=join'
					// },app.getUa.ios,function(){
					// 	if(is_member){
					// 		location.href = '/share/calendar_group_list.jsp?calendarID='+calendarid;
					// 	}
					// 	else{
					// 		location.href = "/calendar/joinRedirect.do?key=" + G.key;
					// 	}
					})
				}else{
					if(app.getUa.weixin){
						app.open({
							ios:'coco://365rili.com/calendar?cid='+calendarid+'&key='+G.key+'&action=join',
							android:'coco://365rili.com/calendar?cid='+calendarid+'&key='+G.key+'&action=join'
						})
					}else{
						app.open({
							ios:'coco://365rili.com/calendar?cid='+calendarid+'&key='+G.key+'&action=join',
							android:'coco://365rili.com/calendar?cid='+calendarid+'&key='+G.key+'&action=join'
						})
					}
				}
			});
		}

	}
	group.init();
})
