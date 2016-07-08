define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol'
], function(c, cp) {
	_data = {
		mar: 0,
		date: null
	}
	_ex = {
		init: function () {
			_ex.clock();
		},

		updateGCurrDate: function () {
			_ex.clock();

			//缓存当前时间
			_data.date = new Date(+G.currDate);

			//更新到下一秒
			G.currDate.setSeconds(G.currDate.getSeconds() + 1);

			//判断是否夸天
			if(G.currDate.getDate() !== _data.date.getDate()){
				amplify.publish('AcrossTheDay');
			}
		},

		clock: function () {
			clearTimeout(_data.mar);
			_data.mar = setTimeout(_ex.updateGCurrDate, 1000);
		}
	};

	amplify.subscribe('initApp', _ex.init);
});