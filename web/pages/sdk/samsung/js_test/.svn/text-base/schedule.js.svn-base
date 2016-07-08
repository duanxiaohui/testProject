/**
 * schedule
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-01-04 17:32:39
 */

(function () {
	window._data = {
		'checkAliansBridgeTime': 0
	};
	function init () {
		if(getBase()){
			getSchedule();
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

	function getSchedule () {
		var id = _fn.query('id');
		var cid = _fn.query('cid');
		var uuid = _fn.query('uuid');
		_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/schedule/getRawPubScheduleById.do?uuid=' + uuid + '&cid=' + cid));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/schedule/getRawPubScheduleById.do',
			data: {
                'uuid': uuid,
                'cid': cid
			},
			headers: _headers,
			success: function (datas) {
				if(datas.state == 'ok'){
					_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/schedule/m-getpics.do?calendarID=' + cid + '&scheduleUUID=' + uuid));
					_headers['365-coop-key'] = _data.key;
					_headers['365-coop-type'] = _data.type;
                    $.ajax({
                        url: 'http://hz.365rili.com/schedule/m-getpics.do',
                        dataType: 'json',
						headers: _headers,
                        data: {
                            calendarID: cid,
                            scheduleUUID: uuid
                        },
                        success: function(data) {
                            if(data.state == 'ok'){
                                var pic_arr = [];
                                $.each(data.pics, function(_, o) {
                                    pic_arr.push(data.pic_url + o.pic);
                                });
                                var pics = pic_arr.join(',');

                                datas.s.pics = pics;
                                $('.title').html(datas.s.calendar.title);
                                renderSchedule(datas.s);
                            }
                        }
                    });
                }
			},
			error: function () {

			}
		})
	}

	function renderSchedule (schedule) {
		// return
		var scheduleBox = $('.schedule_details_conetnt');
		var td = new Date(schedule.startTime);
		scheduleBox.append($('<div class="schedule_title">'+schedule.title+'</div>'));
		scheduleBox.append($('\
			<div class="schedule_time">\
	            <div class="samsung_title_h4">\
	                <h4>时间</h4>\
	            </div>\
	            <p>' + _fn.formatDate(td) + ' ' + getDayOfWeek(td) + (schedule.allDayEvent ? ' 全天' : '') + '</p>\
	        </div>'));
		if(schedule.description){
			scheduleBox.append($('\
		        <div class="schedule_txt">\
		            <div class="samsung_title_h4">\
		                <h4>简介</h4>\
		            </div>\
		            <div class="schedule_txt_content">' + schedule.description + '</div>\
		        </div>'));
		}

		if(schedule.url != "" && schedule.url != "null" && schedule.url != null){
	        scheduleBox.append('\
	        	<div class="schedule_url url_address">\
		            <a href="'+schedule.url+'">查看详情</a>\
		        </div>');
		}

		if(schedule.location != "" && schedule.location != "null" && schedule.location != null){
			var address = '',
	            index = schedule.location.indexOf("@");
	        if(index > 0){
	            address = schedule.location.substr(0, index);
	        } else {
	            address = schedule.location;
	        }
	        var url = ['http://api.map.baidu.com/geocoder?address=', encodeURIComponent(address), '&output=html&src=365rili|365rili'].join('');
	        scheduleBox.append('\
	        	<div class="schedule_url url_address">\
		            <a href="'+url+'">'+address+'</a>\
		        </div>');
		}
		var pics = schedule.pics;

		if(schedule.pics !== "" && schedule.pics !== "null"){
			$(".schedule_details_focus").Slide({
				pics: pics
			});
		}

        //界面原因，需要补上脚部
        scheduleBox.append($('<div class="footer_copy"></div>'));
	}

	function getDayOfWeek (date) {
        var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return arr[date.getDay()];
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
	init();
})();