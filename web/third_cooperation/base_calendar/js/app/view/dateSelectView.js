/*
**	选择日期 liumingren 2015.6.3
*/
define(['zepto','amplify', 'monthView', 'weekView', 'util'],function($, amplify, _mv, _wv, util) {
	var _data = {
		viewType: 'month'
	};
	return {
		init:function() {
			this.renderSelect();
			this.bindEvent();
		},
		renderSelect:function () {

			var selectData = $('.select_date h4'),
				date = new Date();

			m = date.getMonth() + 1;
			d = date.getDate();

			window.chooseDate = new Date(date);

			selectData.html(date.getFullYear() + '.' +(m<10?"0":"") + m);
			$('#select_month').val(date.getFullYear() + '-' + ((m<10?"0":"") + m) + '-' + ((d<10?"0":"") + d));

			// var selectYear = $(".select_year"),
			// 	selectMonth = $("select_moth"),
			// 	date = new Date();
			// y = y||date.getFullYear();
			// m = m||date.getMonth();

			// //设置年及年列表
			// var years = $.map(new Array(21),function (_,i) {
			// 	var year = date.getFullYear()-10+i;
			// 	return "<option value='"+year+"' "+ (y==year&&"selected") +">"+year+"</option>";
			// }),months = $.map(new Array(12), function (_,i) {
			// 	var month = i+1;
			// 	return "<option value='"+month+"' "+ (m==i&&"selected") +">"+month+"</option>";
			// });

			// $(".select_year").find("h4").html(y);
			// $("#s_year").html(years.join(""));

			// $(".select_moth").find("h4").html(m+1);
			// $("#s_month").html(months.join(""));
		},
		bindEvent: function () {
			var self = this;

			//选择日期
			util.change($("#select_month"), function (e) {
				if(this.value == ''){
					var d = new Date();
					this.value = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
				}
				var date = new Date(this.value.replace(/-/g, '/'));

				_data.viewType == 'week' ? amplify.publish("ev:changeDateWeek",date) : amplify.publish("ev:changeDate",date);
			});

			//回到今天
			$(document).on("tap",".today_btn", function () {
				var d = new Date();
				// 判断视图
				if($("#viewType").attr("data-type") == "week") {
					amplify.publish("ev:changeDateWeek",d);
				}else{
					amplify.publish("ev:changeDate",d);
				}

			});

			//切换月视图和周视图
			$(document).on("tap","#viewType", function () {
				var viewType = $("#viewType").attr("data-type");

				var mDate = $("#select_month").val().replace(/-/g,"/"),
					d = window.chooseDate ? new Date(window.chooseDate) : new Date(mDate);
					var pix = $("#viewType").html().substr(1);

				if(viewType == "week") {
					var monthFirst = false;
					if(!_mv.status){
						_mv.init(true, new Date(d));
					}

					$("#viewType").attr("data-type","month");

					amplify.publish('ev:viewTypeChanged', 'month');
					_data.viewType = 'month';

					$("#viewType").html("周" + pix);
					$("#calendar_panel").removeClass("none");
					$("#calendar_panel_week").addClass("none");

					!monthFirst && amplify.publish("ev:changeMonth",d);
					amplify.publish("ev:changeDate",d);
				}else {
					var weekfirst = false;

					if(!_wv.status){
						weekfirst = true;
						_wv.init(true, new Date(d));
					}
					$("#viewType").attr("data-type","week");

					amplify.publish('ev:viewTypeChanged', 'week');
					_data.viewType = 'week';

					$("#viewType").html("月" + pix);
					$("#calendar_panel_week").removeClass("none");
					$("#calendar_panel").addClass("none");

					!weekfirst && amplify.publish("ev:changeWeek",d);
					amplify.publish("ev:changeDateWeek",d);
				}
				$('.logo').css('position', 'static');
				$('.schedule_list').height('auto')
				if($('.schedule_list dl').length){
					$('.schedule_list').removeClass('noschedule');
					//有日程的情况下需要修补高度
					setTimeout(function () {
						var wh = $(window).height();
						var ch = $('.calendar_main').height();
						if(wh - ch - 46 > $('.schedule_list').height()){
							$('.schedule_list').height(wh - ch - 56);
						}
					}, 0);

				}
				else if(_data.viewType == 'week'){
					$('.logo').css({
						'position': 'absolute',
						'bottom': '0'
					});
				}
			});

			amplify.subscribe('ev:viewTypeChanged', function (d) {
				_data.viewType = d;
			})

			amplify.subscribe('over:changeDate', function (d) {
				var _d = new Date(d);
				_d.setHours(0,0,0,0);
				var now = new Date();
				now.setHours(0,0,0,0);
				if(_d.getTime() == now.getTime()){
					$('.today_btn').hide()
				}
				else{
					$('.today_btn').show()
				}
			})
			//切换年时切换选中项
			// amplify.subscribe("ev:changeYear", function (date) {

			// 	var y = date.getFullYear();
			// 	if(y != $("#s_year").val()){
			// 		$("#s_year").val(y);
			// 	}
			// 	$(".select_year").find("h4").html(y);

			// });
			var changeMonthSel = function (date) {
				var y = date.getFullYear(),
					m = date.getMonth()+1,
					d = date.getDate();
				var selectDate = $("#select_month").val(),sA,sY,sM;
				if(selectDate) {
					sA = selectDate.split("-");
					sY = sA[0];
					sM= sA[1];
				}
				window.chooseDate = new Date(date);
				// if(m != sM || y != sY){
					var dateString = y+"-"+((m<10?"0":"") + m) + '-' + ((d<10?"0":"") + d);
					$("#select_month").val(dateString);
					$(".select_date").find("h4").html(y+"."+(m<10?"0":"")+m);
					// if(_data.viewType == 'month'){
					// 	$(".select_date").find("h4").html(y+"."+(m<10?"0":"")+m);
					// }
					// else{
					// 	$(".select_date").find("h4").html((m<10?"0":"")+m + '月 第' + util.getWeekNum(date) + '周');
					// }
				// }
			}
			//切换月时切换选中项
			amplify.subscribe("ev:changeMonth, ev:changeDateMonth", function (date) {
				changeMonthSel(date);
			});
			//周视图切换周时切换选中项
			amplify.subscribe("ev:changeMonthWeek", function (date) {
				changeMonthSel(date);
			});
		}
	};

});
