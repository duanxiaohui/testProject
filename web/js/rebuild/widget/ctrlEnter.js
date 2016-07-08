define([
	'rebuild/base/common'
], function(c) {
	$.widget("mxx.ctrlEnter", {
		options: {
			action: null,
			noCtrl: false
		},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			$elem.keypress(function(evt) {
				if ((opt.noCtrl && !evt.ctrlKey || evt.ctrlKey) && (evt.which == 13 || evt.which == 10)) {
					if ($.isFunction(opt.action)) {
						opt.action = $.proxy(opt.action, this)()
					} else {
						$(opt.action).triggerHandler('click');
					}
				}
			});
		}
	});
})