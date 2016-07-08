/**
 * calendarList
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-12-30 19:01:19
 */

(function () {
	window._data = {
		'checkAliansBridgeTime': 0,
		'temp': '\
			<dl class="e_clear js-calendar" data-id="{$id}" data-title="{$title}">\
    			<dt><img data-src="{$logo}" class="recommended_face"/></dt>\
    			<dd>\
    				{$focus}\
    				<div class="recommended_calendar_h3">\
    					<h3>{$title}</h3>\
    					<p>{$description}</p>\
    				</div>\
    			</dd>\
    		</dl>'
	};
	function init () {
		if(getBase()){
			_fn.getFocus();
			getCalendarList();
			$('.title').html(decodeURIComponent(_fn.query('title')));
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
	function getCalendarList () {
		var id = _fn.query('category');
		_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/calendar/getHallCalendars.do?id=' + id));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/calendar/getHallCalendars.do',
			data: {
				'categoryId': id
			},
			headers: _headers,
			success: function (datas) {
				var pic_path = datas['pic_path'];
				var calendars = datas.data[0].calendars;
				calendars.sort(function(a, b){
					return a.seq - b.seq;
				});
				var html = _fn.template(_data.temp, calendars, {
					logo: function (o, p, c) {
						if(!o){
							return 'http://hz.365rili.com/pages/sdk/samsung/images/noImg.gif'
						}
						else{
							return pic_path + o;
						}
					},
					focus: function (o, p, c) {
						if(_data.focus[p.id]){
							return '<a href="javascript:;" class="on js-focus" data-focus="true" data-id="'+p.id+'" data-title="'+p.title+'" data-logo="'+pic_path+p.logo+'">退订</a>'
						}
						else{
							return '<a href="javascript:;" class="js-focus" data-focus="false" data-id="'+p.id+'" data-title="'+p.title+'" data-logo="'+pic_path+p.logo+'">订阅</a>'
						}
					},
					description: function (o, p, c) {
						return o ? o : ''
					}
				});

				$('.recommended_calendar_list').html(html).on('tap', '.js-classification', function (e) {
					var _this = $(this);
					_fn.callAction('calendar', {
						categorie: _this.data('id'),
						title: _this.data('title')
					})
				});

				parseImg();
			},
			error: function () {

			}
		});
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
    		this.o.attr('height', '50');
    	}
    	else{
    		this.o.attr('width', '80');
    	}
    	this.o.attr('src', this.src);
    	delete this.o;
    }
	init();
})();