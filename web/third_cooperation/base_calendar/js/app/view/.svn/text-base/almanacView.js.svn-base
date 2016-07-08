/*
**	万年历视图 liumingren 2015.6.2
*/
define(['zepto','amplify','almanacInfo'],function($,amplify,ai) {

	return {
		init:function(date) {
			date = date || new Date();
			this.renderalmanac(date);
			this.bindEvent();
		},
		renderalmanac:function (date) {
			var theDate = $(".lunar_data_txt"),
				almanac = $(".almanac_data_txt"),lunarDate;

			//插入农历数据
			lunarDate = ai.getAlmanacInfo(date);
			theDate.html(lunarDate.tdText);
			almanac.html(lunarDate.amText);

			//插入宜忌数据
			amplify.subscribe("get:yiji", function (d) {
				$(".almanac_yiji").find(".yi").html(d.yi)
					.siblings(".ji").html(d.ji);
			})
		},
		bindEvent: function () {
			var self = this;
			//切换日
			amplify.subscribe("ev:changeDate", function (d) {
				//切换农历到今天
				self.renderalmanac(d);
			})
			amplify.subscribe("ev:changeDateWeek", function (d) {
				//切换农历到今天
				self.renderalmanac(d);
			})

		}
	};

});
