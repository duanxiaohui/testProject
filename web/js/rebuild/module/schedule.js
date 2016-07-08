/**
 * schedule for newOpen
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-09-02 17:29:19
 */

define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
],function (c, cp) {
	var _data = {};
	var _ex = {
		template: {
			content: '\
				<div class="activity_info_top">\
		   			<div class="activity_info_cover">\
		   				<img src="" id="js-face" alt="">\
		   			</div>\
		   			<div class="activity_info_top_txt">\
		   				<h3>{$title}</h3>\
		   				<p class="blue">时间：{$time}</p>\
		   				{$location}\
		   			</div>\
		   		</div>\
		   		<div class="activity_info_txt">\
		   			<h3>日程详情</h3>\
		   			<div class="txt_content">\
						<p>{$description}</p>\
		   				{$url}\
		   			</div>\
		   		</div>\
		   		<div class="activity_info_img">\
		   			<h3>日程图片 <span id="js-imgNum"></span></h3>\
		   			<ul class="e_clear" id="js-imglist"></ul>\
		   		</div>',
		   		image: '<li><a href="{$pic_url}{$pic}" rel="img"><img src="{$pic_url}{$pic}" width="60" height="60"/></a></li>'
		},
		loadSchedule: function () {
			var sid = query('id');
			if(sid == ''){
				return _ex.noScheduleId();
			}
			$.ajax({
				url: '/schedule/getRawScheduleByIdV2.do',
				type: 'post',
				data: {
					scheduleId: sid
				},
				success: function(data) {
					if(!data){ 
				        $.alert('对不起，该日程已被删除，请您刷新页面！', {
				            buttons: {
				                '确定': function() {
				                    window.location.reload();
				                }
				            }
				        });
				        return;
					}
					else if (data.state == 'wrongpass') {
						return amplify.publish('loginTimeout')
					} else {
						data['description'] = data['description'].replace(/\n/g, '<br/>');
						_ex.showData(data);
						//get pics
						$.ajax({
							url: "/schedule/getpics.do",
							type: "post",
							dataType: "json",
							data: {
								calendarID: data.calendarId,
								scheduleUUID: data.uuid
							},
							success: function(imageData) {
								_ex.showImage(imageData);
							}
						})

					}
				},
				error: function() {

				},
				dataType: 'json'
			});
		},
		noScheduleId: function () {
			console.log('没有日程id');
		},
		showData: function (data) {
			var html = template(_ex.template.content, data,{
				url: function (o, p) {
					return o ? '<p class="blue">链接：<a href="'+o+'" target="_blank">'+o+'</a></p>' : '';
				},
				location: function (o, p) {
					return o ? '<p class="blue">地点：' + o + '</p>' : '';
				}
			});
			$('#js-activity_detail').html(html);
		},
		showImage: function (data) {
			$('#js-imgNum').html('共' + data.pics.length + '张');
			$('#js-imglist').html(template(_ex.template.image, data.pics,{
				'pic_url': function (o, p) {
					return data.pic_url;
				}
			}));
			$('#js-face').attr('src', data.pic_url + data.pics[0].pic)
			$('#js-imglist a').lightbox({
				fitToScreen: true,
				fileLoadingImage: '/images/lightbox/loading.gif',
				fileBottomNavCloseImage: '/images/lightbox/closelabel.gif',
			});
		}
	}

	amplify.subscribe('initApp', _ex.loadSchedule);
});