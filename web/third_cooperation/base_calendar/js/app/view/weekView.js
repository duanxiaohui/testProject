/*
**	周视图 liumingren 2015.7.27
*/
define(['zepto','util','weekInfo'],function($,_util,_wi) {

	return {
		dom:$("#calendar_panel_week"),
		template:$(".week-temp").html(),
		listdom:$(".calendar_grid_list_week"),
		monthdomWidth: $(".calendar_grid_list_week").width()||$(".calendar_grid_list").width(),
		status: false,
		init:function() {

			var initDate = arguments[1];
			var date = initDate ? new Date(initDate) : new Date();
			this.isNotScroll = arguments[0];
			this.initUI();
			this.bindEvent();

			amplify.publish("ev:changeWeek",date);

			this.status = true;
		},
		initUI: function () {
			var width =  this.monthdomWidth,
				height = this.listdom.height();

				this.dom.addClass('calePanl-wp');
				if(!this.isNotScroll){
					this.dom.width(width*3);
					this.listdom.addClass('calePanl-page calePanl-dir-h').width(width);
				}

			this.dom.css({'-webkit-transform':'translateX' + '(' + -width + 'px)','transform':'translateX' + '(' + -width + 'px)'});
		},
		renderWeek:function (date) {
			var cldPanel = $("#js-week-panel");
			var rowsHtml = this.getMonthHtml(date);

			//计算第几周	
			var dataWeek = date.getFullYear() + '/' + _util.getWeekNum(date);

			cldPanel.attr("data-week",dataWeek);
			cldPanel.find("li").remove();
			cldPanel.append(rowsHtml);

			amplify.publish("ev:changeDateWeek",new Date(date));

			this.dom.css({'-webkit-transform':'translateX' + '(' + -this.monthdomWidth + 'px)','transform':'translateX' + '(' + -this.monthdomWidth + 'px)'});
			!this.isNotScroll && amplify.publish("load:renderWeekOther",new Date(date));
			amplify.publish('over:renderWeek', new Date(date));
		},
		renderWeekOther: function (date) {
			var datePrev = new Date(),
				dateNext = new Date(),
				rowsHtmlPrev,rowsHtmlNext;
			datePrev.setFullYear(date.getFullYear());
			dateNext.setYear(date.getFullYear());
			datePrev.setMonth(date.getMonth());
			dateNext.setMonth(date.getMonth());
			datePrev.setDate(date.getDate()-7);
			dateNext.setDate(date.getDate()+7);
			rowsHtmlPrev = this.getMonthHtml(datePrev);
			rowsHtmlNext = this.getMonthHtml(dateNext);

			$("#js-week-panel_prev,#js-week-panel_next").find("li").remove();
			$("#js-week-panel_prev").append(rowsHtmlPrev)
				.siblings("#js-week-panel_next").append(rowsHtmlNext);
		},
		getMonthHtml: function (date) {
			//创建新的时间
			var cld = new _wi.WeekDate(date),
				startDate = cld.getCalendarSundayFirstDate(),//得到当前视图第一天
				dateInfoAry = _wi.getWeekViewDateInfo(startDate,date.getMonth()),
				monthTemp = $("#week-temp").text();// 获得模板

			//根据模板生成日期列表
			return _util.format(monthTemp, dateInfoAry);
		},
		moveTo: function(next, anim) {
			var self = this,
				domList0 = this.listdom.eq(0),
				domList1 = this.listdom.eq(1),
				domList2 = this.listdom.eq(2),
				moveWidth = -next * $("#js-week-panel").width(),
				month,date;

			//是否过渡动画
			if (anim) {
				this.dom.addClass('anim');
			} else {
				this.dom.removeClass('anim');
			}
			//解除绑定事件
			this.dom.off('webkitAnimationEnd webkitTransitionEnd');
			this.dom.css({'-webkit-transform':'translateX(' + moveWidth + 'px)','transform':'translateX' + '(' + moveWidth + 'px)'});

			//更新月份列表
			if( next == 0 ) {
				date = new Date(domList1.find("li").eq(0).attr("data-date"));
				date.setDate(date.getDate()-7);

			}else if( next == 2 ) {
				date = new Date(domList1.find("li").eq(0).attr("data-date"));
				date.setDate(date.getDate()+7);
			}else {
				return false;
			}
			this.dom.on('webkitAnimationEnd webkitTransitionEnd',function(e) {
				self.dom.removeClass('anim');
				amplify.publish("ev:changeWeek",date);
				amplify.publish("ev:changeMonthWeek",date);
			});
		},
		bindEvent: function () {
			var self = this;

			//切换周
			amplify.subscribe("ev:changeWeek", function (date) {
				self.renderWeek(date);
			});
			//切换日
			amplify.subscribe("ev:changeDateWeek", function (d) {
				var y = d.getFullYear(),
					m = d.getMonth()+1,
					w = _util.getWeekNum(d);

				var selectDate = $("#js-week-panel").data('week'),sA,sY,sW;
				if(selectDate) {
					sA = selectDate.split("/");
					sY = sA[0];
					sW= sA[1];
				}

				window.chooseDate = new Date(d);
				amplify.publish("ev:changeMonthWeek",d);

				//这里不可以每次都初始化周视图，需要做边界判断
				if( (sW && w != sW) || (sY && y != sY)){
					self.renderWeek(d);
				}

				//当前选中项样式
				var dateStr = [y, m, d.getDate()].join('\/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
				$("#js-week-panel li").each(function (i,_) {
					var $_ = $(_);
					$_.removeClass("ondate");
					if($_.attr("data-date") == dateStr) {
						$_.addClass("ondate");
					}
				});

				amplify.publish('over:changeDate', new Date(d));

			});

			//加载完其他之后加载上月下月
			amplify.subscribe("load:renderWeekOther", function (date) {
				self.renderWeekOther(date);
			});

			//为每日绑定点击事件
			$(document).on("tap", ".calendar_grid_list_week > li" , function (e) {
				var d =$(this).attr("data-date"),
					date = new Date(d);
					window.chooseDate = new Date(d);
				amplify.publish("ev:changeDateWeek",date);
			});

			if(!this.isNotScroll){
				//绑定滑动事件
				$(document).on('touchstart', ".calendar_panel_week ul" , function(e) {

					self.startX = e.targetTouches[0].pageX;
				});
				$(document).on('touchend', ".calendar_panel_week ul" , function(e) {

					var sub = e.changedTouches[0].pageX - self.startX;
					var der = (sub > 30 || sub < -30) ? sub > 0 ? -1 : 1 : 0;
					self.moveTo($(this).index()+der, true);
				});
			}
		}
	};
});
