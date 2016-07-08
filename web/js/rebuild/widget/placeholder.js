define([
	'rebuild/base/common'
], function(c) {
	$.widget('mxx.placeholder', {
		options: {
			attr: 'placeholder',
			holdingClass: 'holding',
			value: ''
		},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			this.holdText = $elem.attr(opt.attr);
			if (!$.browser.msie) {
				return;
			}
			$elem.focus(function(evt) {
				var val = $elem.val();
				if (val == '' || val == self.holdText) {
					$elem.val('');
				}
				$elem.removeClass(opt.holdingClass);
			}).on('drop', function(evt) {
				var val = $elem.val();
				if (val == '' || val == self.holdText) {
					$elem.val('');
				}
			}).blur(function(evt) {
				var val = $elem.val();
				if (val == '' || val == self.holdText) {
					$elem.val(self.holdText).addClass(opt.holdingClass);
				} else {
					$elem.removeClass(opt.holdingClass);
				}
			}).blur();
		},
		val: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			return $elem.val() == this.holdText ? '' : $elem.val();
		}
	})
})