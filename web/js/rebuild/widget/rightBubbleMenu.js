/**
 * 该插件仅允许出现一个，考虑是否抛出全局变量供其他组件注销
 * 暂时只实现了内部注销 INSTANCE
 */

define([
	'rebuild/base/common'
], function(c) {

	var INSTANCE = null;

	$.widget('mxx.rightBubbleMenu', {
		options: {
			buttons: [],
			stopPropagation: false
		},
		_create: function() {
			var self = this, opt = this.options;

			//无按钮，直接注销
			if(opt.buttons.length == 0){
				return self.destroy();
			}

			//存在其他菜单，注销
			if(INSTANCE !== null){
				INSTANCE.destroy();
				INSTANCE = null;
			}

			//UI
			self._buildMenu();

			//Logic
			self._bindLogic();

			INSTANCE = self;
		},
		destroy: function (target) {
			var self = this, $menu = self.menu;
			try{
				//注销事件
				$menu.off('.rightBubbleMenu');
				$('body').off('.rightBubbleMenu');
				amplify.unsubscribe('closeRightBubbleMenu', target);
				$menu.fadeOut('fast', function () {
					//清除dom
					$menu.remove();
				})
			}catch(e){}

			INSTANCE = null;

			//注销组件
			$.Widget.prototype.destroy.call( self );
		},
		_buildMenu: function() {
			var self = this, opt = self.options;
			window.self = self;
			//构建dom
			var html = '\
						<div class="create_schedule_list_layer none">\
							<ul>{list}</ul>\
							<div class="layer_arrow_left">\
								<em class="arrow_10"></em><em class="arrow_9"></em><em class="arrow_8"></em><em class="arrow_7"></em><em class="arrow_6"></em><em class="arrow_5"></em><em class="arrow_4"></em><em class="arrow_3"></em><em class="arrow_2"></em><em class="arrow_1"></em>\
							</div>\
						<div class="layer_arrow_left">';
			var list = $.format('<li i="{INDEX}"><a href="javascript:;">{text}</a></li>', opt.buttons);
			var $menu = self.menu = $($.format(html, {'list':list})).appendTo('body');

			var _closeMenu = function () {
				self.destroy(_closeMenu)
			};
			//绑定注销事件
			$menu.on('click.rightBubbleMenu', _closeMenu);
			$('body').on('click.rightBubbleMenu', _closeMenu);
			amplify.subscribe("closeRightBubbleMenu", _closeMenu);

			//显示
			var $elem = $(this.element);
			var offset = $elem.offset();
			$menu.css({
				top: offset.top - 20 + Math.floor($elem.height() / 2),
				left: offset.left + $elem.width() + 10
			}).fadeIn('fast');
		},
		_bindLogic: function () {
			var self = this, opt = self.options, $elem = $(this.element);

			//绑定List逻辑
			self.menu.on('click.rightBubbleMenu', 'li', function () {
				var $li = $(this), i = $li.attr('i'), method = opt.buttons[i].onclick;
				if ($.isFunction(method)) {
					//调用方法
					method.call($elem);
				} else {
					//调用组件
					$li[method]($.extend(opt.buttons[i].params, {
						target: $elem
					}));
				}
			});
		}
	});

})