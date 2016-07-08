define([
	'rebuild/base/common'
], function() {
	$.calendarPlugin = {};
	$.widget('mxx.calendarPlugin', {
		options: {},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var requesting = false;

			$elem.click(function() {
				var $lnk = $(this),
					jspath = $lnk.attr('jspath'),
					pluginName = $lnk.attr('pluginname');
				if (!requesting) {
					if (jspath != 'loaded') {
						requesting = true;
						$.getScript(jspath, function() {
							$lnk.attr('jspath', 'loaded');
							requesting = false;
							$.calendarPlugin[pluginName].call($lnk);
						});
					} else {
						$.calendarPlugin[pluginName].call($lnk);
					}
				}
			});
		}
	});

})