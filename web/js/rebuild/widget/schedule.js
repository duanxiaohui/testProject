define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/widget/scheduleCreator',
	'rebuild/widget/scheduleCopy'
], function(c, cp, scheduleCreator, scheduleCopy) {
	var INSTANCE = null;

	$.widget('mxx.schedule', {
		options: {
			schedule: null
		},
		_create: function () {
			var self = this;

			//存在其他菜单，注销
			if(INSTANCE !== null){
				INSTANCE.destroy();
				INSTANCE = null;
			}

			self.template = '\
					<div class="schedule_layer ui-shadow none {scheduleMode}">\
						<a href="javascript:;" class="close_btn"></a>\
						<h2>{calendarName}</h2>\
						<div class="schedule_content">\
							<div class="schedule_title">\
								<p>{datetime}</p>\
							</div>\
							<div class="schedule_content_txt">\
								{image}\
								<div class="txt_box">{content}</div>\
								<div class="followed"></div>\
							</div>\
							{url}\
							{location}\
							{editable}\
						</div>\
					</div>';
			self.editTemplate = '\
							<div class="schedule_bottom">\
								<a href="javascript:;" class="js_copy">复制日程</a><i>|</i><a href="javascript:;" class="js_delete">删除</a><i>|</i><a href="javascript:;" class="js_detail">编辑日程</a>\
							</div>';
			self.deleteTemplate = '\
							<div class="schedule_bottom">\
								<a href="javascript:;" class="js_delete">删除</a>\
							</div>';
			//UI
			self._buildUI();

			//Logic
			self._bindLogic();

			//获取参与者
			self._getFollow();

			INSTANCE = self;
		},

		destroy: function () {
			var self = this, $dom = self.$dom;
			try{
				//注销事件
				$dom.off('.schedule');
				$('body').off('.schedule');

				$dom.fadeOut('fast', function () {
					//清除dom
					$dom.remove();
				})
			}catch(e){}

			INSTANCE = null;

			//注销组件
			$.Widget.prototype.destroy.call( self );
			amplify.unsubscribe('createSchedule');
		},

		_buildUI: function () {
			var self = this, $elem = $(this.element), schedule = self.options.schedule;
			var calendar = cp.getCalendarById(schedule.cid);
			var scheduleDate = schedule.start_time.split(' ')[0];

			//设置填充数据
			var fillData = {};
			//基础信息
			fillData['calendarName'] = calendar.title,
			fillData['datetime'] = [scheduleDate, schedule.time].join(' ');
			fillData['content'] = schedule.text.replace(/\n/g, '<br/>');
			fillData['sid'] = schedule.id;
			fillData['date'] = scheduleDate;
			fillData['scheduleMode'] = 'small_schedule_box';
			fillData['editable'] = '';
			fillData['url'] = '';
			fillData['location'] = '';
			fillData['image'] = '';

			//判断日程展示模式
			if(schedule.text.length > 500){
				fillData['scheduleMode'] = 'big_schedule_box';
			}

			//判断编辑权限
			if(calendar.access_type == 2 || calendar.access_type == 3){
				if(parseInt(schedule.index_type) == 91 || parseInt(schedule.index_type) == 92 || parseInt(schedule.index_type) == 93 || parseInt(schedule.index_type) == 95){
					fillData['editable'] = $.format(self.deleteTemplate, schedule);
				}
				else{
					fillData['editable'] = $.format(self.editTemplate, schedule);
				}
				// if(G.currUser.id == schedule.owner_id){
				// 	fillData['editable'] = $.format(self.editTemplate, schedule);
				// }else if(calendar.access_type == 3){
				// 	fillData['editable'] = $.format(self.deleteTemplate, schedule);
				// }
			}

			//显示详细连接
			if (schedule.url) {
				fillData['url'] = '<div class="tip_url_div"><span>详细链接：</span><a href="{url}" target="_blank">{url}</a></div>'.replace(/\{url\}/g, schedule.url);
			}

			//显示地图
			var locationAry, location_url, location_name, location = schedule.location;
			if(location){
				//有名字
				if(location.indexOf('@') != -1){
					var locationAry = location.split("@");
					location_url = 'http://api.map.baidu.com/marker?location={locationAry1}&title={locationAry0}&content={locationAry0}&output=html'
									.replace(/\{locationAry0\}/g, locationAry[0])
									.replace(/\{locationAry1\}/g, locationAry[1]);
					if(!locationAry[0]){
						location_name = location;
					}
					else{
						location_name = locationAry[0];
					}
				}
				//无名字
				else{
					location_url = "http://api.map.baidu.com/geocoder?address={location}&output=html&src=365rili"
									.replace(/\{location\}/g, location);
					location_name = location;
				}

				fillData['location'] = '<div class="tip_location_div"><span>地址：</span><a href="{location_url}" target="_blank">{location_name}</a></div>'
										.replace(/\{location_url\}/g, location_url)
										.replace(/\{location_name\}/g, location_name);
			}

			//显示图片
			var pics = schedule.pics, pics_html = [];
			//<img src="http://cocoimg.365rili.com/schedule_pics/default/{pics}" class="image_item" />
			if(pics){
				if(pics.length === 1){
					pics_html.push('<div class="image_div one_pic">\
									<a href="http://cocoimg.365rili.com/schedule_pics/default/{pics}" rel="img"></a>\
									</div>'.replace(/\{pics\}/g, pics[0].pic));
				}
				else{
					pics_html.push('<div class="image_div" style="padding: 0 15px;">');
					for (var i = 0, l = pics.length; i < l; i++) {
						pics_html.push('<a href="http://cocoimg.365rili.com/schedule_pics/default/{pics}" rel="img"><img src="http://cocoimg.365rili.com/schedule_pics/default/{pics}" class="image_item" style="width:50px;height:50px;"/></a>'.replace(/\{pics\}/g, pics[i].pic));
					};
					pics_html.push('</div>');
				}
			}
			fillData['image'] = pics_html.join('');

			//填充
			if(schedule.completed == 'iscompleted'){
				fillData.datetime += '<span style="color:#000;">【已完成】</span>'
			}
			var $dom = self.$dom = $($.format(self.template, fillData)).appendTo('body');

			//设置定位信息
			var posOpt = {collision: 'fit'};

			//判断左右位置
			if($elem.parents('td').attr('cellindex') < 2){
				posOpt.my = 'left top';
				posOpt.at = 'right top';
			}
			else{
				posOpt.my = 'right top';
				posOpt.at = 'left top';
			}

			posOpt.offset = '0 -28px';
			posOpt.of = $elem;

			//渲染
			$dom
				.position(posOpt)
				.fadeIn('fast');

			self._chechheight();

			//单张图片重新渲染定位
			if(pics && pics.length === 1){
				var img = new Image();

				img.onload = function () {
					img.className = 'image_item';
					$dom.find('.one_pic a').append(img);

					self._chechheight();
					
					$dom.position(posOpt);

					img = null;
				};

				img.src = 'http://cocoimg.365rili.com/schedule_pics/default/' + pics[0].pic;
			}

			//拖动
			$dom.draggable({
				containment: 'body',
				handle: 'h2',
				cancel: 'a',
				cursor: "move",
				opacity: 0.85
			});
		},

		_chechheight: function () {
			var $dom = this.$dom;
			//检测高度
			var windowHeight = $(window).height();
			if($dom.height() > windowHeight){
				$dom.find('.schedule_content_txt').height(windowHeight - 150).jScrollPane();
			}
		},

		_bindLogic: function () {
			var self = this, $dom = self.$dom
			var _closePanel = function () {
				self.destroy();
			};

			//绑定图片放大显示
			$dom.find('.image_div a').lightbox({
				fitToScreen: true
			});

			//绑定注销事件
			$dom
				.on('click.schedule', 'a.close_btn', _closePanel)
				.on('click.schedule', function (e) {
					e.stopPropagation();
				})
			//绑定删除事件
				.on('click.schedule', '.js_delete', function () {
					self._deleteSchedule();
				})
			//绑定编辑事件
				.on('click.schedule', '.js_detail', function () {
					self._editSchedule();
				})
			//绑定复制事件
				.on('click.schedule', '.js_copy', function(){
					self._copySchedule();
				})
				;
			$('body').on('click.schedule', _closePanel);

			amplify.publish('openSchedule');
			amplify.subscribe('createSchedule', _closePanel);
		},

		_deleteSchedule: function () {
			var self = this, schedule = self.options.schedule;
			var sid = schedule.id;
			var cid = schedule.cid;
			var date = schedule.date;

			//TODO: 整理代码
			$.confirm('确定要删除这个日程吗？', {
				buttons: [{
					text: "删除",
					click: function(e) {
						var _this = this;

						$.getJSON('/schedule/delete.do?scheduleId=' + sid, function(data) {
							if (data == true) {
								$(_this).dialog("close");
								amplify.publish('scheduleDeleted', {'sid': sid});
							} else if (data.state == 'wrongpass') {
								amplify.publish('loginTimeout');
							}

						});
					}
				}, {
					text: "取消",
					click: function(e) {
						$(this).dialog("close");
					}
				}]
			});
		},

		_editSchedule: function () {
			var self = this, schedule = self.options.schedule;
			scheduleCreator.showForm(undefined, schedule.id);
		},

		_copySchedule: function () {
			var self = this, schedule = self.options.schedule;
			scheduleCopy.showForm(schedule.id);
		},

		_getFollow: function () {
			var self = this, schedule = self.options.schedule;
			if(cp.getCalendarById(schedule.cid)['is_primary'] != 'true'){
				return;
			}
			if(parseInt(schedule.index_type) != 94 && parseInt(schedule.index_type) != 95){
				return;
			}
			$.ajax({
	            url: '/schedule/getFollowers.do',
	            type: 'post',
	            dataType: 'json',
	            data: {
	                cid: schedule.cid,
	                uuid: schedule.uuid
	            },
	            success: function(data) {
	                if(data.state != 'ok') return;
	                var follow = data.followers;
	                var str = [];
	                for (var i = 0; i < follow.length; i++) {
	                	str.push(follow[i].n);
	                };
	                console.log(data)
	                follow.length && self.$dom.find('.followed').html(str.join('，') + ' 参与该日程').show();
	            }
	        });
		}
	});

});