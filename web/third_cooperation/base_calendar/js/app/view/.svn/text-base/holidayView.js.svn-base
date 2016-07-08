/*
**	假日视图 liumingren 2015.6.9
*/
define(['zepto','data','amplify','util'],function($,_data,amplify,_util) {

	var festiArr =_data.festiArr;
	return {
		init:function() {
			this.renderHoliday();
			this.bindEvent();
		},
		renderHoliday: function () {
			var $solarTerms = $("#solar-holidays");
			var html = this.getHolidayHtml();
			$solarTerms.append(html);
		},
		getHolidayHtml:function (date) {
			var solarholiTemp = $("#solar-holidays").text();

			//根据模板生成节气列表
			return _util.format(solarholiTemp, festiArr);
		},
		bindEvent: function () {
			var $slayer = $('.solar_layer'),
				$vlayer = $('.vac_layer');
			//工具栏假期按钮
			$('.vacation_btn').on('tap', function(event) {
				$slayer.addClass('none');
				if($vlayer.hasClass("none")){
					$vlayer.removeClass('none');
				}else {
					$vlayer.addClass('none');
				}
			});

			//选择假日
			$("#solar-holidays li").on("tap", function (e) {
				var dateStr = $(this).attr("data-from"),
					date = new Date(dateStr);
				$vlayer.addClass("none");
				// 判断视图
				if($("#viewType").attr("data-type") == "week") {
					amplify.publish("ev:changeDateWeek",date);
				}else {
					amplify.publish("ev:changeDate",date);
				}
			});

			$(document).on("tap","body", function (e) {
				var $target = $(e.target);

				//点击页面其他处隐藏节气或假期页面
				if($target.is('.throttle_btn') || $target.is('.vacation_btn')) return;
				if(!$slayer.hasClass('none')) {
					$slayer.addClass('none');
				}

				if(!$vlayer.hasClass('none')) {
					$vlayer.addClass('none');
				}
			})
		}
	};

});
