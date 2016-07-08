define([
	'rebuild/base/common'
], function() {
	$.widget('mxx.loading', {
		options: {
			speed: 500
		},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			this.loadingTimer = null;
			this.oriText = $elem.text();
			$elem.click(function(evt) {
				$elem.hasClass('loading') && evt.stopImmediatePropagation();
			});
		},
		start: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options,
				i = 0,
				str = '...';
			$elem.addClass('loading');
			this.loadingTimer = setInterval(function() {
				$elem.html(self.oriText + str.slice(0, i++ % 3 + 1));
			}, opt.speed);
		},
		end: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options,
				i = 1;
			$elem.removeClass('loading');
			clearInterval(this.loadingTimer);
			$elem.html(self.oriText);
		},
		is: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			return $elem.hasClass('loading');
		}
	});
})