define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/widget/schedule'
], function(c, cp) {
	var INSTANCE = null;

	$.widget('mxx.allTask', {
		options: {
			schedules: [],
			date: new Date
		},
		_create: function () {
			var self = this;

			//存在其他菜单，注销
			if(INSTANCE !== null){
				INSTANCE.destroy();
				INSTANCE = null;
			}

			self.allTaskTemplate = '<div class="schedule_list_layer ui-shadow none"><dl><dt><a href="javascript:;" class="close_btn"></a><span></span></dt></dl><dl style="max-height:400px;_height:400px;overflow:auto;"></dl></div>';
			self.template = '<dd primary="{primary}" class="task jsc-{cid}" style="border-color:{color}; background-color:{bgc}"><div class="spheric ui-corner-all-16" style="border-color:{color}; background-color:{sbgc}"></div><p class="task_text {completed}" title="{time}&nbsp;{text}">{time}&nbsp;{text}</p></dd>';

			//UI
			self._buildUI();

			//Logic
			self._bindLogic();

			INSTANCE = self;
		},

		destroy: function () {
			var self = this, $dom = self.$dom;
			try{
				//注销事件
				$dom.off('.allTask');
				$('body').off('.allTask');

				$dom.fadeOut('fast', function () {
					//清除dom
					$dom.remove();
				})
			}catch(e){}

			INSTANCE = null;

			//注销组件
			$.Widget.prototype.destroy.call( self );
		},

		_buildUI: function () {
			var self = this, $elem = $(self.element), schedules = self.options.schedules, date = self.options.date;
			var $dom = self.$dom = $(self.allTaskTemplate).appendTo('body');

			var html = [];
			for (var i = 0, l = schedules.length; i < l; i++) {
				schedules[i].completed = schedules[i].completed ? 'iscompleted' : '';
				html.push($.format(self.template, schedules[i]));
			};

			$dom.find('dl:last').html(html);
			$dom.find('dt span').html([
				date.getFullYear(), '年',
				date.getMonth() + 1, '月',
				date.getDate(), '日 星期',
				['日','一','二','三','四','五','六'][date.getDay()]
			].join(''));

			$dom
				.resizable({
					minWidth: 165,
					minHeight: 60,
					resize: function(event, ui) {
						var height = ui.size.height;
						ui.element.find('dl:last').height(height - ui.element.find('dl:first').height());
					}
				})
				.position({
					of: $elem,
					my: 'left top',
					at: 'left top',
					collision: 'fit'
				})
				.css({
					width: Math.max($dom.width() * 1.5, 165),
					height: 'auto'
				})
				.fadeIn('fast');
		},

		_bindLogic: function () {
			var self = this, $dom = self.$dom
			var _closePanel = function () {
				self.destroy();
			};
			
			//绑定注销事件
			$dom
				.on('click.allTask', 'a.close_btn', _closePanel)
				.on('click.allTask', function (e) {
					e.stopPropagation();
				})
			//绑定任务查看事件
				.on('click.allTask', '.task', self._showSchedule)
				;
			$('body').on('click.allTask', _closePanel);
		},

		_showSchedule: function () {
			var elem = $(this);
			var schedule = cp.getScheduleByPrimary(elem.attr('primary'));
			elem.schedule({
				schedule: schedule
			});
		}
	});
});