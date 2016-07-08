define([
	'zepto',
	'util',
	'wx',
	'wxProtocol',
	'/js/lib/DatePicker_1/DateTimePicker.js'
],function ($, util,wx,wxProtocol) {
	var _startDate = new Date();
	_startDate.setHours(_startDate.getHours() + 1, 0, 0);
	window.schedules = '';
	window.__data = {};

	function GetCookie(name) {
        var value = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    value = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return value
    }
    function deleteCookie (name, path, domain) {
        if (GetCookie(name)) {
            document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
        }
    }

	function showGuide () {
		$('\
			<div class="guide">\
				<img class="g1" src="/third_cooperation/qqgroup/images/guide4.jpg" alt="" />\
			</div>').appendTo('body');
		$('.guide img').on('tap', function () {
			$(this).fadeOut(function () {
				$(this).remove();
				if(!$('.guide img').length){
					$('.scheduleMain').removeClass('none');
					$('.guide').remove();
					deleteCookie('firstAccess');
				}
			});
		});

		$.ajax({url: '/mobile-qqun/accessCreatePage.do'});
	}
	(function () {
		var wx_url = window.location.href;
		$.ajax({
			url:'/account/getPersonalDetail.do',
			dataType:"json",
			success:function (data) {
				if(data.state == 'unknown' || data.state == 'wrongpass'){
					window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(wx_url);	
				}else{
					exp.create();
				}
			},
			error:function (data) {
				console.log(data);
			}
		})
	})()

	var exp = {
		create: function (schedule) {
			wxProtocol.init(function (wx) {
				wx.hideOptionMenu();
			});
			var firstAccess = GetCookie('notAccessCreatePage') == '1';
			if(firstAccess){
				$('.scheduleMain').addClass('none');
				showGuide();
			}
			var today = new Date();
			$('.scheduleMain').html('<form id="createScheduleForm" onsubmit="return false;">\
	    		<div class="panel scheduleIconSet">\
	    			<textarea rows=1 type="text" placeholder="请输入日程" class="schtitle" id="title"></textarea>\
	    		</div>\
	    		<div class="panel e_clear">\
	    			<div class="checkBox">\
	    				<input id="allday" class="ios7CBox" type="checkbox">\
	    			</div>\
	    			<label for="allday">是否创建全天日程</label>\
	    			<div class="line"></div>\
					<div class="beginDate setDate">\
						<label for="beginDate">开始时间</label>\
						<em></em>\
						<input type="text" data-field="datetime" readonly id="beginDate">\
					</div>\
					<div class="endDate setDate">\
						<label>结束时间</label>\
						<em></em>\
						<input type="text" data-field="datetime" readonly id="endDate">\
					</div>\
	    		</div>\
	    		<div class="panel">\
	    			<p class="tip tpTip">提醒<span class="tipState">展开</span></p>\
	    			<div class="line"></div>\
	    			<div class="timePoint nall e_clear">\
	    				<span class="nopoint" data-point="-1">不提醒</span><span class="point allday" data-point="0">正点</span><span class="point noAllday" data-point="10">10分钟前</span><span class="point allday" data-point="1440">1天前</span><span class="point noAllday" data-point="5">5分钟前</span><span class="point noAllday" data-point="30">30分钟前</span><span class="point noAllday" data-point="60">1小时前</span><span class="point allday" data-point="4320">3天前</span>\
	    			</div>\
	    			<div class="timePointTxt">\
	    				<p class="noTPT">未设置任何提醒</p>\
	    			</div>\
	    		</div>\
	    		<div class="panel">\
	    			<p class="tip reTip"><em>不重复</em><span class="tipState"></span></p>\
	    			<div class="repeatSet e_clear">\
	    				<div class="line reLine"></div>\
	    				<div>\
	    					<span class="point" data-point="0">不重复</span><span class="point" data-point="1">每天</span><span class="point" data-point="7">每周(周'+['日','一','二','三','四','五','六'][today.getDay()]+')</span><span class="point" data-point="31">每月('+today.getDate()+'日)</span><span class="point" data-point="365">每年('+(today.getMonth()+1)+'月'+today.getDate()+'日)</span>\
	    				</div>\
	    			</div>\
	    		</div>\
	    		<div class="saveBtn control btn">\
	    			<button type="submit">保存日程</button>\
	    			<p class="save_btn_tips">提示:体验完整功能,请下载365日历APP</p>\
	    		</div>\
	    		<p class="wx_tips none">提示：微信暂不支持修改以下内容，请使用365日历APP</p>\
	    		<div class="disabled_div"></div>\
	    	</form>');
			$('.timePoint').on('tap', '.point', setTimePoint);
			$('.repeatSet').on('tap', '.point', setRepeat);
			$('.scheduleIconSet a').on('tap', setIcon);
			$('.tpTip').on('tap', changeTipmePoint);
			$('.reTip').on('tap', function () {
				$(this).parent().toggleClass('show');
			});

			// $("<div id='dtBox'></div>").appendTo('body').DateTimePicker({
			// 	init: function () {
			// 		__data.dtBegin = this;
			// 	},
			// 	settingValueOfElement: function (sInputValue, dDateTime, oInputElement) {
			// 		setBEDate(sInputValue, 'beginDate');
			// 		$('#endDate').data('min', sInputValue);

			// 		if($('.endDate em').html() == '尚未设置'){
			// 			var valueSplit = +sInputValue.slice(11,13) + 1;
			// 			var timeSplitend = sInputValue.split(' ')[1].split(':')[1];
			// 			sInputValueStr = sInputValue.split(' ')[0] + ' '+ valueSplit + ':'+timeSplitend;
			// 			// $('#endDate').val(sInputValue);
			// 		}
			// 	},
			// 	dateTimeFormat: 'yyyy-MM-dd hh:mm',
			// 	parentElement: ".beginDate",
			// 	titleContentDateTime: '设置开始时间',
			// 	buttonsToDisplay: ["HeaderCloseButton", "SetButton"],
			// 	setButtonContent: '确定'
			// });

			// $("<div id='dtBox1'></div>").appendTo('body').DateTimePicker({
			// 	init: function () {
			// 		__data.dtEnd = this;
			// 	},
			// 	settingValueOfElement: function (sInputValue, dDateTime, oInputElement) {
			// 		setBEDate(sInputValue, 'endDate');
			// 		$('#beginDate').data('max', sInputValue);
			// 		if(sInputValue == ''){
			// 			if($('#allday').prop('checked')){
			// 				$(oInputElement).val($('#beginDate').val());
			// 			}
			// 			else{
			// 				var beginDate = new Date($('#beginDate').val().replace(/-/g, '/'));
			// 				beginDate.setHours(beginDate.getHours() + 1);
			// 				$(oInputElement).val(__data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', beginDate));
			// 			}
			// 		}
			// 	},
			// 	buttonClicked: function (bType, input) {
			// 		if(bType == 'CLEAR'){
			// 			setBEDate('', 'endDate');
			// 			$('#beginDate').data('max', '');
			// 		}
			// 	},
			// 	dateTimeFormat: 'yyyy-MM-dd hh:mm',
			// 	parentElement: ".endDate",
			// 	titleContentDateTime: '设置结束时间',
			// 	buttonsToDisplay: ["HeaderCloseButton", "SetButton", "ClearButton"],
			// 	setButtonContent: '确定'
			// });
			// 
			$("<div id='dtBox'></div>").appendTo('body').DateTimePicker({
				init: function () {
					__data.dtBegin = this;
				},
				settingValueOfElement: function (sInputValue, dDateTime, oInputElement) {
					setBEDate(sInputValue, 'beginDate');
					if($('#allday').prop('checked')){
						$('#endDate').data('min', (function (_bd) {
							var t = new Date(_bd);
							return __data.dtBegin.getDateTimeStringInFormat('date', 'yyyy-MM-dd', new Date(t.setDate(t.getDate() + 1)))
						})(sInputValue));
					}
					else{
						$('#endDate').data('min', (function (_bd) {
							var t = new Date(_bd);
							return __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', new Date(t.setMinutes(t.getMinutes() + 1)))
						})(sInputValue));
					}

					if($('.endDate em').html() == '尚未设置'){
						var valueSplit = +sInputValue.slice(11,13) + 1;
						var timeSplitend = sInputValue.split(' ')[1].split(':')[1];
						sInputValueStr = sInputValue.split(' ')[0] + ' '+ valueSplit + ':'+timeSplitend;
						$('#endDate').val(sInputValueStr);
					}
				},
				dateTimeFormat: 'yyyy-MM-dd hh:mm',
				parentElement: ".beginDate",
				titleContentDateTime: '设置开始时间',
				buttonsToDisplay: ["HeaderCloseButton", "SetButton"],
				setButtonContent: '确定'
			});

			$("<div id='dtBox1'></div>").appendTo('body').DateTimePicker({
				init: function () {
					__data.dtEnd = this;
				},
				settingValueOfElement: function (sInputValue, dDateTime, oInputElement) {
					setBEDate(sInputValue, 'endDate');

					if($('#allday').prop('checked')){
						$('#beginDate').data('max', (function (_bd) {
							var t = new Date(_bd);
							return __data.dtBegin.getDateTimeStringInFormat('date', 'yyyy-MM-dd', new Date(t.setDate(t.getDate() - 1)))
						})(sInputValue));
					}
					else{
						$('#beginDate').data('max', (function (_bd) {
							var t = new Date(_bd);
							return __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', new Date(t.setMinutes(t.getMinutes() - 1)))
						})(sInputValue));
					}


					if(sInputValue == ''){
						if($('#allday').prop('checked')){
							$(oInputElement).val($('#beginDate').val());
						}
						else{
							var beginDate = new Date($('#beginDate').val().replace(/-/g, '/'));
							beginDate.setHours(beginDate.getHours() + 1);
							$(oInputElement).val(__data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', beginDate));
						}
					}
				},
				buttonClicked: function (bType, input) {
					if(bType == 'CLEAR'){
						setBEDate('', 'endDate');
						$('#beginDate').data('max', '');
					}
				},
				dateTimeFormat: 'yyyy-MM-dd hh:mm',
				parentElement: ".endDate",
				titleContentDateTime: '设置结束时间',
				buttonsToDisplay: ["HeaderCloseButton", "SetButton", "ClearButton"],
				setButtonContent: '确定'
			});


			$('.nopoint').on('tap', cancelTP);

			$('#allday').on('change', function () {
				if(this.checked){
					var beginDate = $('#beginDate').val();
					var endDate = $('#endDate').val();

					$('#beginDate').data('field', 'date');
					$('#endDate').data('field', 'date');
					var endDateStr = ''
					if(endDate.indexOf('T')>-1){
						endDateStr = endDate.split('T')[0];
					}else{
						endDateStr = endDate.split(' ')[0];
					}
					var beginDateStr = beginDate.split(' ')[0];

					$('#beginDate').val(beginDateStr);
					setBEDate(beginDateStr, 'beginDate');
					if($('.endDate em').html() == '尚未设置'){
						$('#endDate').val(beginDateStr);
						setBEDate('', 'endDate');
					}
					else{
						if(endDateStr == beginDateStr){
							var t = new Date(endDateStr.replace(/-/gi, '\/'));
							t.setDate(t.getDate() + 1);
							endDateStr = __data.dtBegin.getDateTimeStringInFormat('date', 'yyyy-MM-dd',t);
						}
						$('#endDate').val(endDateStr);
						setBEDate(endDateStr, 'endDate');
						$('#beginDate').data('max', (function (_bd) {
							var t = new Date(_bd);
							return __data.dtBegin.getDateTimeStringInFormat('date', 'yyyy-MM-dd', new Date(t.setDate(t.getDate() - 1)))
						})(endDateStr));
					}
					$('#endDate').data('min', (function (_bd) {
						var t = new Date(_bd);
						return __data.dtBegin.getDateTimeStringInFormat('date', 'yyyy-MM-dd', new Date(t.setDate(t.getDate() + 1)))
					})(beginDateStr));

					$('.noAllday').addClass('none');
					$('.noAllday.on').each(function (i, o) {
						setTimePoint.call($(o));
					});
					$('.allday.on').each(function (i, o) {
						setTimePoint.call($(o));
						setTimePoint.call($(o));
					});
					
					$('.timePoint .point[data-point="0"]').hasClass('on') || setTimePoint.call($('.timePoint .point[data-point="0"]'));
					$('.tipState').addClass('none');
					$('.tpTip').off('tap', changeTipmePoint);
					$('.tpTip').parent().removeClass('show');
					$('.tipState').html('展开');
					$('.timePoint').addClass('all');
					$('.timePoint').removeClass('nall');
				}
				else{
					var _beginDate = new Date();
					_beginDate.setHours(_beginDate.getHours() + 1, 0, 0);

					var _endDate = new Date(_beginDate);
					_endDate.setHours(_endDate.getHours() + 1, 0, 0);

					var beginDate = $('#beginDate').val();
					var beginDateStr = beginDate + ' ' + parseDateHMS(_beginDate);
					var endDate = $('#endDate').val();
					var endDateStr = endDate + ' ' + parseDateHMS(_endDate);

					$('#beginDate').data('field', 'datetime').val(beginDateStr);
					$('#endDate').data('field', 'datetime').val(endDateStr).data('min', (function (_bd) {
						var t = new Date(_bd);
							return __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', new Date(t.setMinutes(t.getMinutes() + 1)))
					})(beginDateStr));
					if($('.endDate em').html() == '尚未设置'){
						endDateStr = '';
						$('#beginDate').data('max', '')
					}
					else{
						$('#beginDate').data('max', (function (_bd) {
							var t = new Date(_bd);
								return __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', new Date(t.setMinutes(t.getMinutes() - 1)))
						})(endDateStr));
					}

					setBEDate(beginDateStr, 'beginDate');
					setBEDate(endDateStr, 'endDate');

					$('.noAllday').removeClass('none');
					$('.on').each(function (i, o) {
						setTimePoint.call($(o));
						setTimePoint.call($(o));
					});

					$('.tipState').removeClass('none');
					$('.tpTip').on('tap', changeTipmePoint)
					if($('.timePoint .point[data-point="4320"]').hasClass('on')){
						$('.tpTip').parent().addClass('show');
						$('.tipState').html('收起');
					}
					$('.timePoint').removeClass('all');
					$('.timePoint').addClass('nall');
				}
			});
			
			$('#title').on('input', checkHeight);

			var cid = util.query('cid');
			var uuid = util.query('uuid');
			var sid = util.query('sid');
			if(cid && uuid){
				$.ajax({
					url:'/schedule/getWeixinSchedule.do',
					data:{
						cid:cid,
						uuid:uuid
					},
					type:'post',
					success:function (data) {
						window.schedules = data.schedule;
						init();
					}
				})
			}else{
				init();
			}

			$('#createScheduleForm').on('submit', createSchedule);
			function checkDate (o) {
				o = o || $('#beginDate')[0];
				var bDate = new Date($('#beginDate').val().replace(/-/g,'/'));
				var eDate = new Date($('#endDate').val().replace(/-/g,'/').replace(/T/g,' '));
				if(eDate <= bDate){
					plug.alert('','结束时间不能早于或等于开始时间');
					if(o.type == 'datetime-local'){
						var endDate = new Date($('#beginDate').val().replace(/-/g, '/').replace('T', ' '));
						endDate.setHours(endDate.getHours() + 1, 0, 0);

						var endDateStr = parseDate(endDate);
						$('#endDate').val(endDateStr);
						setBEDate(endDateStr, 'endDate');
					}
					else{
						var endDate = new Date($('#beginDate').val().replace(/-/g, '/').replace('T', ' '));
						endDate.setHours(endDate.getHours() + 1, 0, 0);

						var endDateStr = parseDate(endDate);
						$('#endDate').val(endDateStr);
						setBEDate(endDateStr, 'endDate');
					}
					$(o).blur();
					return false;
				}
				if(eDate - bDate.setYear(bDate.getFullYear() + 50) > 0){
					plug.alert('','结束时间不能大于开始时间50年');
					if(o.type == 'datetime-local'){
						var endDate = new Date($('#beginDate').val().replace(/-/g, '/').replace('T', ' '));
						endDate.setHours(endDate.getHours() + 1, 0, 0);

						var endDateStr = parseDate(endDate);
						$('#endDate').val(endDateStr);
						setBEDate(endDateStr, 'endDate');
					}
					else{
						var endDate = new Date($('#beginDate').val().replace(/-/g, '/').replace('T', ' '));
						endDate.setHours(endDate.getHours() + 1, 0, 0);

						var endDateStr = parseDate(endDate);
						$('#endDate').val(endDateStr);
						setBEDate(endDateStr, 'endDate');
					}
					$(o).blur();
					return false;
				}

				return true;
			}
			function createSchedule () {
				window.isCheckData = true;
				$('.saveBtn button').attr('disabled', true);

				var data = {
					schTitle : '',
					alldayEvent : '',
					// calendarId : '',
					startTime : '',
					duration : '',
					before_minutes : '',
					scheduleId : '',
				};
				if(schedules){
					data.scheduleId = schedules.id;
					// data.calendarId = schedule.calendarId;
				}
				else{
					// data.calendarId = cid;
				}

				data.schTitle = $.trim($('#title').val());

				var tpdom = $('.timePoint .on');
				if(tpdom.length == 1 && tpdom.hasClass('nopoint')){
					data.before_minutes = '';
				}
				else{
					var tp = [];
					tpdom.each(function (i, o) {
						tp.push($(o).data('point')).toString();
					});
					data.before_minutes = tp.join(',');
				}

				data.fromDate = '1970-01-01';
				data.toDate = '1970-01-01';

				var beginDate = new Date($('#beginDate').val().replace('T', ' ').replace(/-/g, '/'));
				data.startTime = parseDateNormal(beginDate) + ':00';

				var endDate = $('#endDate').val();
				if($('.endDate em').html() == '尚未设置'){
					data.duration = 0;
				}
				else{
					endDate = new Date(endDate.replace(/-/g, '/').replace(/T/g,' '));
					data.duration = (endDate.getTime() - beginDate.getTime()) / 1000;
				}
				data.alldayEvent = $('#allday').prop('checked').toString();
				if(data.alldayEvent == 'true'){
					beginDate.setHours(9);
					data.startTime = parseDateNormal(beginDate) + ':00';
				}

				if(data.schTitle == ''){
					plug.alert('','请填写日程内容');
					$('.saveBtn button').prop('disabled', false);
					return false;
				}

				var repeatType = $('.repeatSet .on').data('point');
				data.repeatType = repeatType;
				data.repeatFrequency = 1;
				switch(repeatType){
					case 0:
					case 1:
						data.repeatDay = '';
						data.repeatMonth = '';
						data.repeatMonthDay = '';
						break;
					case 7:
						data.repeatDay = 'SUN MON TUE WED THU FRI SAT'.split(' ')[beginDate.getDay()];
						data.repeatMonth = '';
						data.repeatMonthDay = '';
						break;
					case 31:
						data.repeatDay = '';
						data.repeatMonth = '';
						data.repeatMonthDay = beginDate.getDate();
						break;
					case 365:
						data.repeatDay = '';
						data.repeatMonth = beginDate.getMonth();
						data.repeatMonthDay = beginDate.getDate();
						break;
				}

				data.extend = data.extend || {};
				data.extend.point = $('.scheduleIconSet a.on').data('icon');
				data.extend.point || (delete data.extend.point);

				data.extend = JSON.stringify(data.extend);

				if(!checkDate()){
					$('.saveBtn button').prop('disabled', false);
					return false;
				}
				data.repeatStopTime = '';
				data.repeatCount = '';

				$('.saveBtn button').html('保存中...');
				$.ajax({
					url: '/schedule/wxUpdate.do',
					data: data,
					type: 'post',
					success: function (_data) {
						if(_data.state == 'ok'){
							if(!schedules){
								window.location = 'http://www.365rili.com/pages/wx_schedule/schedule.html?data-sid='+ _data.sid + '&uuid=' + _data.uuid +'&cid=' + _data.calendarId;
							}else{
								history.back()
							}
							
						}else{
							plug.alert('','日程保存失败');
						}
						$('.saveBtn button').prop('disabled', false).html('保存日程');
					},
					error: function () {
						plug.alert('','日程保存失败');
						$('.saveBtn button').prop('disabled', false).html('保存日程');
					}
				});
			}

			function init () {
				if(schedules){
					document.title = '日程编辑';
					var title = schedules.title || schedules.schTitle;
					title = title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"")
					checkHeight.call($('#title').val(title)[0]);

					var beginDate;
					if(typeof schedules.startTime == 'number'){
						beginDate = new Date(schedules.startTime);
					}
					else{
						beginDate = new Date(schedules.startTime.replace(/-/g, '/'));
					}

					var beginDateStr = __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', beginDate);
					$('#beginDate').val(beginDateStr);
					$('#endDate').val(__data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', (function () {
						var e = new Date(beginDate);
						e.setHours(e.getHours() + 1);
						return e;
					})()))
					setBEDate(beginDateStr, 'beginDate');

					var endDateStr = '';
					if(schedules.duration){
						var endDate = new Date(beginDate.getTime() + schedules.duration * 1000);
						endDateStr = __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', endDate);
						$('#endDate').val(endDateStr);
					}
					setBEDate(endDateStr, 'endDate');

					$('#endDate').data('min', (function (_bd) {
						var t = new Date(_bd);
						return __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', new Date(t.setMinutes(t.getMinutes() + 1)))
					})(beginDate));

					schedule.alldayEvent = schedule.alldayEvent || schedule.allDayEvent;
					schedule.alldayEvent = schedule.alldayEvent.toString() == 'true';

					if(schedules.alldayEvent){
						$('#allday').prop('checked', schedules.alldayEvent);

						var beginDate;
						if(typeof schedules.startTime == 'number'){
							beginDate = new Date(schedules.startTime);
						}
						else{
							beginDate = new Date(schedules.startTime.replace(/-/g, '/'));
						}

						var endDate = parseDate(new Date(beginDate.getTime() + schedules.duration * 1000)).split('T')[0];
						beginDate = parseDate(beginDate).split('T')[0];
						
						$('#beginDate').data('field', 'date');
						$('#endDate').data('field', 'date');

						$('#beginDate').val(beginDate);
						$('#endDate').val(endDate);
						setBEDate(beginDate, 'beginDate');

						setBEDate(endDate, 'endDate');
						if(!schedules.duration){
							setBEDate('', 'endDate');
						}

						$('#endDate').data('min', (function (_bd) {
							var t = new Date(_bd);
							return __data.dtBegin.getDateTimeStringInFormat('date', 'yyyy-MM-dd', new Date(t.setDate(t.getDate() + 1)))
						})(new Date(beginDate)));

						$('.tipState').addClass('none');
						$('.tpTip').off('tap', changeTipmePoint).parent().removeClass('show');
						$('.timePoint').addClass('all').removeClass('nall');
						$('.noAllday').addClass('none');
					}

					var tp = schedules.before_minutes || schedules.alarm || '';
					tp = tp.toString();
					if(tp == ''){
						cancelTP();
					}
					else{
						tp = tp.split(',');
						for (var i = 0; i < tp.length; i++) {
							setTimePoint.call($('.point[data-point="'+tp[i]+'"]'));
						};
						if(!schedules.alldayEvent){
							$('.tpTip .tipState').html('收起');
							$('.tpTip, .reTip').parent().addClass('show');
							$('.timePoint').addClass('nall').removeClass('all');
						}
					}

					schedules.extend && (schedules.extend = JSON.parse(schedules.extend));
					$('.schedulesIconSet a[data-icon="'+schedules.extend.point+'"]').addClass('on');

					var repeatType = schedules.repeatType;
					setRepeat.call($('.repeatSet .point[data-point="'+repeatType+'"]'));

					refreshRepeat();

					/*不可编辑部分*/
					if(schedules.description || schedules.extend.pics ||schedules.location ||schedules.url||schedules.extend.category){
						$('.wx_tips').removeClass('none');
					}
					if(schedules.description){
						$('.disabled_div').append('<div class="disabled_des">'+schedules.description+'</div>');
					}
					if(schedules.extend.pics){
						var imgStr = ''
						for (var i = 0; i < schedules.extend.pics.length; i++) {
							imgStr += '<li><img src="http://cocoimg.365rili.com/schedule_pics/default/'+schedules.extend.pics[i]+'"/></li>';
						};
						var imgTmpl = '<div class="disabled_schedule_pic"><ul class="e_clear">'+imgStr+'</ul></div>'
						$('.disabled_div').append(imgTmpl);

						$(".disabled_schedule_pic img").on('load',function(){
						 	var w = $(window).width() - 24;
							var imgW = (w - 20)/3;
							$(this).css({
								"width": imgW + "px",
								"height": imgW + "px"
							});
							$(".disabled_schedule_pic li").css({
								"width": imgW + "px",
								"height": imgW + "px"

							});
						});
					}
					if(schedules.location){
						$('.disabled_div').append('<div class="disabled_schedule_address">'+schedules.location.split('@')[0]+'</div>');
					}
					if(schedules.url){
						$('.disabled_div').append('<div class="disabled_schedule_url">'+schedules.url+'</div>');
					}
					if(schedules.extend.category){
						$('.disabled_div').append('<div class="disabled_schedule_tag">'+schedules.extend.category+'</div>');
					}
					if(!schedules.extend.category){
						$('.disabled_schedule_url').css({
							"border":0
						})
					}
				}
				else{
					var beginDate = new Date();
					beginDate.setHours(beginDate.getHours(), 0, 0);

					var endDate = new Date();
					var endDateStrs = endDate.setHours(endDate.getHours() + 1, 0, 0);

					var endDateStrss =  __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', new Date(endDateStrs));
					var beginDateStr = __data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', new Date(beginDate));
					$('#beginDate').val(beginDateStr);
					$('#endDate').val(__data.dtBegin.getDateTimeStringInFormat('datetime', 'yyyy-MM-dd hh:mm', (function () {
						var e = new Date(beginDate);
						e.setHours(e.getHours() + 1);
						return e;
					})()))
					setBEDate(beginDateStr, 'beginDate');

					//默认不设置结束时间
					setBEDate('', 'endDate');
					$('#endDate').data('min', endDateStrss);

					setTimePoint.call($('.timePoint .point[data-point="10"]'));
					setRepeat.call($('.repeatSet .point:first'));
				}

			}

			function checkHeight () {
				if(this.value.length > 1000){
					this.value = this.value.substr(0, 1000);
				}
				var _val = this.value.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
				var $input = $(this);
				if($.trim(this.value).length <= 0){
					this.value = '';
					return $input.height(21);
				}
				var box = $('<div class="checkheight"></div>');
				box.css({
					width: $input.width(),
					'line-height': $input.css('line-height'),
					'font-size': $input.css('font-size'),
					'word-break': 'break-all',
					'font-family': 'Microsoft YaHei',
					'overflow': 'hidden'

				});
				var s = this.value.replace(/&/g, "&amp;");
				s = s.replace(/</g, "&lt;");  
		  		s = s.replace(/>/g, "&gt;");  
		  		s = s.replace(/ /g, "&nbsp;");  
		  		s = s.replace(/\'/g, "&#39;");  
		  		s = s.replace(/\"/g, "&quot;");  
				box.html(s.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>'));
				box.appendTo('body');
				var height = box.height() - 1;
				var brleng = box.html().split('<br>');
				if(brleng.length >= 2){
					height += 21;
				}
				box.remove();

				//修正最小高度
				if(height < 63){
					// height = 63;
				}

				if($input.height() != height){
					$input.height(height);
				}
			}

			function changeTipmePoint () {
				var parent = $(this).parent();
				var tipWord = $('.tpTip .tipState');
				if(parent.hasClass('show')){
					parent.removeClass('show');
					tipWord.html('展开');
				}
				else{
					parent.addClass('show');
					tipWord.html('收起');
				}
			}

			function setBEDate (date, be) {
				if(!date){
					return $('.' + be + ' em').html('尚未设置');
				}
				date = date.replace('T', ' ');
				$('.' + be + ' em').html(date);
			}

			function setRepeat () {
				var o = $(this);
				
				if(o.hasClass('on')){
					$('.repeatSet .point').removeClass('on');
					return setRepeat.call($('.repeatSet .point')[0]);
				}
				else{
					$('.repeatSet .point').removeClass('on');
					o.addClass('on');
				}

				var wording = $(this).html().replace(/[\(\)]/g, '');
				wording += (wording == '不重复' ? '' : ' 重复');
				$('.reTip em').html(wording);
			}

			function setIcon () {
				var _this = $(this);
				if(_this.data('icon') == 0){
					return plug.alert('','更多日程标识正在积极准备中，<br />敬请期待～');
				}
				$('.scheduleIconSet a').removeClass('on');
				_this.addClass('on');
			}

			function refreshRepeat () {
				var today = new Date($('#beginDate').val().replace('T', ' ').replace(/-/g, '/'));
				var spans = $('.repeatSet span');
				spans.eq(2).html('每周(周'+	['日','一','二','三','四','五','六'][today.getDay()]+')');
				spans.eq(3).html('每月('+today.getDate()+'日)');
				spans.eq(4).html('每年('+(today.getMonth()+1)+'月'+today.getDate()+'日)');

				var wording = $('.repeatSet .on').html().replace(/[\(\)]/g, '');
				wording += (wording == '不重复' ? '' : ' 重复');
				$('.reTip em').html(wording);
			}

			window.refreshRepeat = refreshRepeat;

			function setTimePoint () {
				var o = $(this);
				if(o.hasClass('on')){
					o.removeClass('on');
				}
				else{
					o.addClass('on');
				}
				$('.nopoint').removeClass('on')

				var beginDate = new Date($('#beginDate').val().replace('T', ' ').replace(/-/g, '/'));

				var tpdom = $('.timePoint .on');
				var html = [];
				var isAllday = $('#allday').prop('checked');
				tpdom.each(function (i, o) {
					var timePoint = $(o).data('point');
					var tpDate = new Date(beginDate);
					tpDate.setMinutes(beginDate.getMinutes() - timePoint);
					var str = '';

					switch (timePoint.toString()) {
						case '0': 
							str = '正点';
							break;
						case '5': 
							str = '提前5分钟';
							break;
						case '10': 
							str = '提前10分钟';
							break;
						case '30': 
							str = '提前30分钟';
							break;
						case '60': 
							str = '提前1小时';
							break;
						case '1440': 
							str = '提前1天';
							break;
						case '4320': 
							str = '提前3天';
					}
					html.push('<p data-point="'+timePoint+'">' + str + '提醒：<span>' + (!isAllday ? parseDateNormal(tpDate) : (parseDateAllDay(tpDate) +' 09:00')) + '</span></p>');
				});
				$('.timePointTxt').html(html.join(''));
				if(html.length == 0){
					cancelTP();
				}
			}

			function cancelTP () {
				$('.timePoint .on').removeClass('on');
				$('.nopoint').addClass('on')
				$('.timePointTxt').html('<p class="noTPT">未设置任何提醒</p>');
			}

			function getTXPointValue (timePoint) {
				
			}

			function parseDate (d) {
				return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + 'T' + ['', d.getHours(), d.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1);
			}

			function parseDateHMS (d) {
				return ['', d.getHours(), d.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1);
			}
			
			function parseDateNormal (d) {
				return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + ['', d.getHours(), d.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1);
			}
			
			function parseDateAllDay (d) {
				return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
			}

		}
	}


	function getCookie (name) {
        var value = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    value = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return value
    }

    return exp;
});