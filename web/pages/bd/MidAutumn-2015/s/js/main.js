/**
 * 中秋节
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-09-11 14:08:57
 */
(function () {
	var q = {
		init: function () {
			if(!app.getUa.weixin){
				$('.share').on('tap', function () {
					app.call({
		                action: 'share',
		                params: [
		                    {
		                        name: 'shareString',
			        			value: JSON.stringify({
			        				title: '团圆请假单，让爱不缺席',
			        				content: '月常圆，人却不常团聚，这个中秋向家人递一份团圆请假单，让爱陪家人团圆。',
			        				link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/s/index.html',
			        				image: 'http://www.365rili.com/pages/bd/MidAutumn-2015/images/wx.jpg',
			        				isEvent: 'true'
			        			})
		                    }
		                ],
		                callBack: function (headers) {}
		            });
				});
			}
			else{
				$('.share').hide();
			}

            q.form();	
		},
		form: function () {
			$('.input').on('tap', q.showInput);
			$('.input input').on('blur', q.hideInput);

			var mpFrom = $('input[name="beginDate"]').mobipick({
				inputOrder: 'y m',
				dateFormat: "yyyy年MM月",
			});
			var mpTo   = $('input[name="endDate"]').mobipick({
				inputOrder: 'y m',
				dateFormat: "yyyy年MM月",
			});
			mpFrom.on( "change", function() {
				q.hideInput.call(this);
			});
			mpTo.on( "change", function() {
				q.hideInput.call(this);
			});

			$('.formBtn').on('tap', q.check);
		},
		check: function () {
			var to = $.trim($('input[name="to"]').val());
			var from = $.trim($('input[name="from"]').val());
			var job = $.trim($('input[name="job"]').val());
			var customer = $.trim($('input[name="customer"]').val());
			var beginDate = $.trim($('input[name="beginDate"]').val());
			var endDate = $.trim($('input[name="endDate"]').val());

			if(!to){
				alert('您还有未填写的信息哟~');
				return q.showInput.call($('input[name="to"]').parents('.input'));
			}
			if(!job){
				alert('您还有未填写的信息哟~');
				return q.showInput.call($('input[name="job"]').parents('.input'));
			}
			if(!customer){
				alert('您还有未填写的信息哟~');
				return q.showInput.call($('input[name="customer"]').parents('.input'));
			}
			if(!beginDate){
				alert('您还有未填写的信息哟~');
				return q.showInput.call($('input[name="beginDate"]').parents('.input'));
			}
			if(!endDate){
				alert('您还有未填写的信息哟~');
				return q.showInput.call($('input[name="endDate"]').parents('.input'));
			}
			if(!from){
				alert('您还有未填写的信息哟~');
				return q.showInput.call($('input[name="from"]').parents('.input'));
			}

			var start_time = new Date(endDate.replace('年', '\/').replace('月', '') + '/01 09:00:00');

			$.ajax({
				url: '/pages/bd/MidAutumn-2015/create.html?' + ['to=' + to, 'from=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&')
			});

			if(app.getUa.weixin){
				$.ajax({
					url: '/calendar/getCalendarListByUser.do',
					type: 'post',
					dataType: 'json',
					success: function (data) {
						for (var i = 0; i < data.length; i++) {
							if (data[i].is_primary == "true" && data[i].data_domain != 'google'){
								var postData = {
									schTitle : '耶，我要回家啦',
									alldayEvent : 'true',
									calendarId : data[i].id,
									startTime : (function (d) {
										return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + ['', d.getHours(), d.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1) + ':00';
									})(start_time),
									timeZone : 8,
									duration : 0,
									description : '我要说话算话，回家好好陪家人。',
									repeatType : 0,
									calendarType : 'S',
									before_minutes : 1440,
									fromDate : '1970-01-01',
									toDate : '1970-01-01',
									repeatCount : '',
									repeatDay : '',
									repeatFrequency : '',
									repeatMonth : '',
									repeatMonthDay : '',
									repeatStopTime : '',
									scheduleId : '',
									linked_url : '',
									location : '',
								};
								postData.updateV2Origin = '16';
								$.ajax({
									url: '/schedule/updateV2.do',
									data: postData,
									complete: function () {
										window.location.href = '/pages/bd/MidAutumn-2015/s/preview.html?' + ['to=' + to, 'from=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&');
									}
								});
								return;
							}
						};
					}
				});
			}
			else{
	            var scheduleJSON ={
	                schedule:{
	                    "startTime": start_time.getTime(),
	                    "duration": 0,
	                    "allDayEvent": true,
	                    "title" : "耶，我要回家啦",
	                    "description": "我要说话算话，回家好好陪家人。"
	                },
	                "alarms":[1440]
	            };
				app.call({
                    action: 'addSchedule',
                    params: [
                        {
                            name: 'scheduleJSON',
                            value: JSON.stringify(scheduleJSON)
                        }
                    ],
                    callBack: function (data) {
                    	window.location.href = '/pages/bd/MidAutumn-2015/s/preview.html?' + ['to=' + to, 'from=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&');
                    }
                });
			}
		},
		showInput: function () {
			var $this = $(this);
			$this.find('span').addClass('none');
			$this.find('input').removeClass('none').focus();
		},
		hideInput: function () {
			var $this = $(this).parents('.input');
			var txt = $.trim($this.find('input').val());
			$this.find('span').removeClass('none');
			$this.find('input').addClass('none');

			if(!txt){
				$this.find('span').html('如：' + $this.find('input').data('txt')).removeClass('c');
			}
			else{
				$this.find('span').html(txt).addClass('c');
			}
		}
	};
	$( document ).on( "pagecreate", function() {
		q.init();
	});
})();