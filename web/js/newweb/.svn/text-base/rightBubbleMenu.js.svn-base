(function(){
	var $menu;
	function getMenu(){
		if (!$menu) {
			$menu = $(['<div class="create_schedule_list_layer none"><ul></ul><div class="layer_arrow_left">', $.map(new Array(10), function(_, i){
				return ['<em class="arrow_', '"></em>'].join(i + 1);
			}).reverse().join(''), '</div></div>'].join('')).appendTo('body');
			
			$menu.click(function(evt){
				closeMenu();
			});
			$('body').bind('click', closeMenu);
		}
		return $menu;
	}
	
	function closeMenu(evt){
		if ($menu && $menu.is(':visible')) {
			$menu.hide('fade');
		}
	}
	
	$.widget('mxx.rightBubbleMenu', {
		options: {
			buttons: [],
			stopPropagation: false
		},
		_create: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			
			$elem.click(function(evt){
				evt.preventDefault();
				opt.stopPropagation && evt.stopPropagation();
				var offset = $elem.offset(), t = offset.top, l = offset.left, $menu = getMenu(), $ul = $menu.find('ul');
				
				$ul.empty().html($.format('<li><a href="javascript:;">{text}</a></li>', opt.buttons));
				$ul.find('li').each(function(i, li){
					var $li = $(li), method = opt.buttons[i].onclick;
					$.isFunction(method) ? $li.click($.proxy(method, $elem)) : $li[method]($.extend(opt.buttons[i].params, {
						target: $elem
					}));
				});
				if(opt.buttons.length > 0){
					$menu.css({
						top: t - 20 + Math.floor($elem.height() / 2),
						left: l + $elem.width() + 10
					}).show('fade');					
				}
			});
		}
	});
	
})();
