define([
	'rebuild/base/common',
], function(c) {
	$.widget('mxx.input', {
		options: {
			onInput: $.noop
		},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var prevValue = $elem.val(),
				onValueChange = function(evt) {
					var value = $.trim($elem.val());
					if (prevValue != value) {
						opt.onInput.call($elem, value);
						prevValue = value;
					}
				};
			$elem.keyup(onValueChange).change(onValueChange).on('dropend', onValueChange);
		}
	});
});