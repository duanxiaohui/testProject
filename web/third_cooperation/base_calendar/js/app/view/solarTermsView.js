/*
**	节气视图 liumingren 2015.6.5
*/
define(['zepto','amplify','util','solartermsInfo'],function($,amplify,_util,sti) {

	return {
		init:function() {
			this.renderSolarterm();
			this.bindEvent();
		},
		renderSolarterm: function () {
			var $solarTerms = $("#solar-terms");
			var html = this.getTermHtml();
			$solarTerms.append(html);
		},
		getTermHtml:function (date) {
			var solartermTemp = $("#solar-terms").text();
			var dateInfoAry = sti.init();

			//根据模板生成节气列表
			return _util.format(solartermTemp, dateInfoAry);
		},
		bindEvent: function () {
			var $slayer = $('.solar_layer'),
				$vlayer = $('.vac_layer');
			//工具栏节气按钮
			$('.throttle_btn').on('tap', function(event) {

				$vlayer.addClass('none');
				if($slayer.hasClass("none")){
					$slayer.removeClass('none');
				}else {
					$slayer.addClass('none');
				}

			});

			//选择节气
			$("#solar-terms li").on("tap", function (e) {
				var dateStr = $(this).attr("data-date"),
					date = new Date(dateStr);
				$slayer.addClass("none");
				if($("#viewType").attr("data-type") == "week") {
					amplify.publish("ev:changeDateWeek",date);
				}else{
					amplify.publish("ev:changeDate",date);
				}
			});

		}
	};

});
