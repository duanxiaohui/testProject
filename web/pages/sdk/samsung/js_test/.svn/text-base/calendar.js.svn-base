/**
 * calendar
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-01-04 15:56:19
 */

(function () {
	window._data = {
		'checkAliansBridgeTime': 0,
		'temp': '\
			<dl class="e_clear js-schedule" data-uuid="{$uuid}" data-cid="{$cid}" data-id="{$id}" data-title="{$title}">\
    			<dt class="{$hasLogo}"><img data-src="{$logo}" class="recommended_face"/></dt>\
    			<dd>\
    				<div class="activity_txt" style="width:{$width}px;">\
    					<h3>{$title}</h3>\
    					<p>{$description}</p>\
    				</div>\
    				<div class="time">{$td}</div>\
    			</dd>\
    		</dl>',
    	currDate: new Date
	};
	function init () {
		if(getBase()){
			_fn.getFocus();
			getCalendarInfo();
			getCalendarPic();
			getSchedules();
		}
	}
	function reInit () {
		/**
		 * 如果无法检测到AliansBridge，200毫秒后重新初始化，5次后放弃初始化；
		 */
		if(_data.checkAliansBridgeTime > 5){
			throw('无法获得AliansBridge');
			return false;
		}
		_data.checkAliansBridgeTime++;
		setTimeout(function () {
			init();
		},200);
	}
	function getBase () {
		var _key, _type, _focus;
		if(window.AliansBridge){
			_key = AliansBridge.getAccountName();
			_type = AliansBridge.getAccountType();

			if(!_type){
				return false;
			}

			_data.key = _key;
			_data.type = _type;

			return true;
		}
		else{
			reInit();
			return false;
		}
	}
	function getCalendarInfo () {
		var id = _fn.query('calendarId');
		_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/calendar/getPublicCalendarDetailById.do?id=' + id));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;

		$.ajax({
			url: 'http://hz.365rili.com/calendar/getPublicCalendarDetailById.do',
			data: {
				'id': id
			},
			headers: _headers,
			success: function (datas) {
				$('.js-calendarInfo').html(datas.desc);
				$('.title').html(datas.title);
				var focusStatus = Boolean(_data.focus[id]);
				var focusStr = focusStatus ? '退订' : '订阅';
				var title = datas.title;
				$('\
				    <div class="subscribe_btn" data-focus="'+focusStatus+'" data-id="'+id+'">\
				        <div class="subscribe_icon '+(focusStatus ? 'on' : '')+'"></div>\
				        <p>'+focusStr+'</p>\
				    </div>').appendTo('body').on('tap', function () {
				    	if(!_data.key){
							return AliansBridge.invokelogin();
						}
						var _this = $(this);
						var id = _this.data('id');
						var focusStatus = _this.data('focus');
						if(focusStatus){
							_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/third/unsubscribe.do?cid=' + id));
							_headers['365-coop-key'] = _data.key;
							_headers['365-coop-type'] = _data.type;
							$.ajax({
								url:'http://hz.365rili.com/third/unsubscribe.do',
								data:{
									cid: id
								},
								headers: _headers,
								success: function (datas) {
									if(datas.state == 'ok'){
										_this.find('.subscribe_icon').removeClass('on');
										_this.find('p').html('订阅');
										_this.attr('data-focus', false);
										AliansBridge.unsubscribe(JSON.stringify(datas));
									}
								},
								error: function () {
									
								}
							})
						}
						else{
							_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/third/subscribePublicCalendar.do?cid=' + id));
							_headers['365-coop-key'] = _data.key;
							_headers['365-coop-type'] = _data.type;
							$.ajax({
								url:'http://hz.365rili.com/third/subscribePublicCalendar.do',
								data:{
									cid: id
								},
								headers: _headers,
								success: function (datas) {
									if(datas.state == 'ok'){
										_this.find('.subscribe_icon').addClass('on');
										_this.find('p').html('退订');
										_this.attr('data-focus', true);
										AliansBridge.subscribe(JSON.stringify(datas));
									}
								},
								error: function () {
									
								}
							})
						}
				    });
			},
			error: function () {

			}
		});
	}

	function getCalendarPic () {
		var id = _fn.query('calendarId');
		_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/calendar/getPublicPicById.do?id=' + id));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/calendar/getPublicPicById.do',
			data: {
				'id': id
			},
			headers: _headers,
			success: function (datas) {
				if(datas.state !== 'ok'){
					return false;
				}
				window.bg = datas.background;
				var rotate = datas.rotate
				if(!rotate){
					return $('.schedule_img').html('<div class="public_image_container public_image_container_out"><ul class="public_image_container_ul"><li style="height:200px;"><img src="'+datas.background+'" alt="" width="100%"></li></ul></div>')
				}
				var simg = $('.schedule_img');
				var picBox = $('<div class="public_image_container public_image_container_out"><ul class="public_image_container_ul"></ul></div>');
				
				var pics = picBox.find('.public_image_container_ul');
				rotate.sort(function (a, b) {
					return a.sequence - b.sequence;
				})
				for (var i = 0; i < rotate.length; i++) {
					(function (action, url, photo) {
						switch (action) {
							case 1:
								$('<li style="height:200px;"><img src="'+photo+'" alt="" width="100%"></li>').appendTo(pics);
								break;
							case 2:
								$('<li style="height:200px;"><img src="'+photo+'" alt="" width="100%"></li>').appendTo(pics).on('tap', function () {
									_fn.callAction('schedule_list', {
										calendarId: url
									});
								});
								break;
							case 3:
								$('<li style="height:200px;"><img src="'+photo+'" alt="" width="100%"></li>').appendTo(pics).on('tap', function () {
									var ids = url.split(',');
									_fn.callAction('schedule_details', {
										cid: ids[0],
										uuid: ids[2]
									});
								});
								break;
							case 4:
								$('<li style="height:200px;"><img src="'+photo+'" alt="" width="100%"></li>').appendTo(pics).on('tap', function () {
									window.location.href = url;
								});
								break;
						}
					})(rotate[i].action, rotate[i].url, rotate[i].photo);
				};
				simg.append(picBox);
				if(rotate.length > 1){
					simg.append($('<div class="public_image_index"></div>'));
					var html = [];
					for (var i = 0; i < rotate.length; i++) {
						html.push('<span class="public_image_span"></span>');
					};
					$('.public_image_index').html(html.join(''));
					$('.public_image_span').eq(0).addClass('on');
				}
				simg.css('position', 'relative');
				var currentIndex = 0;
				var maxIndex = rotate.length;
				pics.Swipe(args(function(tPoint){
		            if(tPoint.direction == "left"){
		                if(currentIndex >= maxIndex - 1){
		                    return;
		                }
		                currentIndex ++;
		            }else if(tPoint.direction == "right"){
		                if(currentIndex <= 0)
		                    return;
		                currentIndex--;
		            }
		            simg.find('.public_image_span.on').removeClass('on');
		            simg.find('.public_image_span').eq(currentIndex).addClass('on');
		        }));
			},
			error: function () {

			}
		})
	}

	function getSchedules () {
		var id = _fn.query('calendarId');
		_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/schedule/listNextPhrase.do?id=' + id + '&fromDate=' + _fn.formatDate(_data.currDate)));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/schedule/listNextPhrase.do',
			data: {
				'calendarId': id,
				'fromDate': _fn.formatDate(_data.currDate)
			},
			headers: _headers,
			success: function (data) {
				if(data.state != 'ok') return;
		        if(data.schedules.schlist.length < 1) {
		            $('.schedule_more_btn').addClass("none_schedule").text('该日历还没安排日程或活动哦~');
		                var h = $('.head_content').css('height');
		                $('.head_content').css('height', $(window).height()-106);
		            return;
		        }

		        var finalArr = [];
		        var result = {};
		        var pic_path = data.schedules.pic_url;
		        var arr = data.schedules.schlist;
		        var filterArr = $.grep(arr, function(n, i) {
		            return _fn.formatDate(new Date(n.start)) >= _fn.formatDate(_data.currDate);

		        });

		        if(filterArr.length >= 5) {
		            finalArr = filterArr.slice(0, 5);
		        } else {
		            finalArr = filterArr;
		        }

		        //整合数据
		        $.map(finalArr, function(v, k) {
		            var date = new Date(v.start);
		            var dateStr = _fn.formatDate(date);
		            if(!result[dateStr]) {
		                result[dateStr] = [];
		            }
		            var tmp = {};
		            for(var prop in v) {
		                tmp[prop] = v[prop];
		            }
		            result[dateStr].push(tmp);
		        });

		        //渲染数据到页面上
		        $.each(result, function(k, v) {
		            var date = new Date(k);
		            var scheduleItem = $('<div class="schedule_day"></div>');
		            scheduleItem.append($('<div class="samsung_title_h4"><h4>' + getScheduleTitle(date) + '</h4></div>'));
		            scheduleItem.append($(_fn.template(_data.temp, v, {
		            	hasLogo: function (o, p, c) {
		            		if(!p.thumb){
		            			return 'none'
		            		}
		            		return ''
		            	},
		            	logo: function (o, p, c) {
		            		return pic_path + p.thumb
		            	},
		            	cid: function (o, p, c) {
		            		return id
		            	},
		            	width:function (o, p, c) {
		            		if(!p.thumb){
		            			return $('body').width() - 90;
		            		}
		            		return $('body').width() - 170;
		            	}
		            })));
		            $('.recommended_calendar_list').append(scheduleItem);
		        });
		        $('.js-schedule').on('tap', function () {
		        	var _this = $(this);
					_fn.callAction('schedule_details', {
						cid: _this.data('cid'),
						uuid: _this.data('uuid')
					})
		        })
		        parseImg();
			},
			error: function () {

			}
		})
	}

	function getDayOfWeek (date) {
        var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return arr[date.getDay()];
    }

    function getScheduleTitle (date) {
        var schedule_title = '';
        if(_fn.formatDate(date) == _fn.formatDate(_data.currDate)) {
            schedule_title = '今天 ' + (date.getMonth()+1) + '月' + date.getDate() + '日 ' + getDayOfWeek(date);
        } else {
            schedule_title = (date.getMonth()+1) + '月' + date.getDate() + '日 ' + getDayOfWeek(date);
        }
        return schedule_title;
    }

    function parseImg () {
    	var imgBoxs = $('.recommended_face');
    	for (var i = 0; i < imgBoxs.length; i++) {
    		loadImg($(imgBoxs[i]));
    	};
    }

    function loadImg ($o) {
    	var src = $o.attr('data-src');
    	var img = new Image;
    	img.o = $o;
    	img.onload = changeToImg;
    	img.src = src;
    }

    function changeToImg (){
    	var w = this.width;
    	var h = this.height;
    	if(w > h){
    		this.o.attr('height', '71');
    	}
    	else{
    		this.o.attr('width', '80');
    	}
    	this.o.attr('src', this.src);
    	delete this.o;
    }
    function args(success) {
        return {
            iniL: 30,
            iniT: 100,
            eCallback: function(tPoint, d){
            	var data = {};
                var _this = tPoint.self;
            	var _inner = _this.children(),
		            singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right')));
                
                if(!data.scroll && _this.hasClass('public_image_container_out')){
                    tPoint.total = _inner.length;
                    singleW = parseInt(_this.width());
                }
                var innerW = singleW * tPoint.total;
                var count = tPoint.count;

		        switch (tPoint.direction) {
		            case "left":
		                count -= (parseInt(-tPoint.mX / singleW) + 1)
		                break;
		            case "right":
		                count += (parseInt(tPoint.mX / singleW) + 1)
                        break;
                    default: break;
		        }

		        if (count >= 1) {
		            count = 0;
		        }
		        if (count <= -tPoint.total) {
		            count = (typeof _autoSlide != "undefined") ? 0 : -tPoint.total + 1;
		        }
		        var offset = count * innerW / tPoint.total;

                //判断右边界
                if((innerW + offset) < _inner.width()){
                    offset = - innerW + _inner.width() + parseInt(_inner.children().css('margin-right'));
                    //修复count
                    count = -(tPoint.total - parseInt(_inner.width() / singleW) - 1);
                }
		        

		        //判断左边界
		        if(innerW < _inner.width()){
		        	offset = 0;
		        	count = 0;
		        }

		        transformBox(_inner, offset, tPoint.speed, tPoint.has3d);
		        tPoint.setAttr("count", count);
		        tPoint.setAttr("offset", offset);

		        success && success(tPoint);
            },
            mCallback: function(tPoint) {
                var _this = tPoint.self,
                    _inner = _this.children(),
                    singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right'))),
                    innerW = singleW * tPoint.total;
                var offset = tPoint.mX + tPoint.offset;
                transformBox(_inner, offset, 0, tPoint.has3d);
            }
        }
        
    }

    function transformBox(obj, value, time, has3d) {
        var time = time ? time : 0;
        transl = has3d ? "translate3d(" + value + "px,0,0)" : "translate(" + value + "px,0)";
        obj.css({
            '-webkit-transform': transl,
            '-webkit-transition': time + 'ms linear'
        });
    }
	init();
})();