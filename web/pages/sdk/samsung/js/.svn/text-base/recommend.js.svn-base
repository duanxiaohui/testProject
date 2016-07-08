/**
 * recommend
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-01-04 10:56:36
 */

(function () {
	window._data = {
		'checkAliansBridgeTime': 0,
		'temp_list': '\
			<div class="div_list"><dl class="e_clear js-calendar active_ce0" data-id="{$id}" data-title="{$title}">\
    			<dt><img data-src="{$logo}" class="recommended_face"/></dt>\
    			<dd class="">\
    				<div class="recommended_calendar_h3">\
    					<h3>{$title}</h3>\
    					<p>{$description}</p>\
    				</div>\
    			</dd>\
    		</dl>\
			{$focus}</div>\
    		',
    	'temp_biger': '<a href="{$url}"><img src="{$photo}" alt="" width="100%"></a>',
	    'temp_small': '<li><a href="{$url}"><img src="{$photo}" alt="" width="100%"></a></li>'
	};
	function init () {
		if(getBase()){
			// getBanner();
			_fn.getFocus();
			// _data.focus = {};
			getCalendarList();
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
			// _data.key = "dfs";
			// _data.type = "coolpad";
			// return true;
			reInit();
			return false;
		}
	}

	function getBanner () {
		_headers =JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/calendar/getHallPicById.do'));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/calendar/getHallPicById.do',
			headers: _headers,
			success: function (datas) {
				if(datas.state !== 'ok'){
					return false
				}
				var banners = datas.rotate;
				banners.sort(function(a, b){
					return a.seq - b.seq;
				});
				var biger = _fn.template(_data['temp_biger'], banners.shift(), {
					url: function (o, p, c) {
						switch (p.action) {
				            case 1 :
				                url = p.url;
				                break;
				            case 2 :
				                url = 'http://hz.365rili.com/pages/sdk/samsung/schedule_list.html?calendarID=' + p.url;
				                break;
				            case 3 :
				                var uuid, cid;
				                var ids = p.url.split(',');
				                cid = ids[0];
				                uuid = ids[1];
				                url = 'http://hz.365rili.com/pages/sdk/samsung/schedule_details.html?uuid='+uuid+'&cid='+cid;
				                break;
				        }
				        return url
					}
				});
				var small = _fn.template(_data['temp_small'], banners, {
					url: function (o, p, c) {
						switch (p.action) {
				            case 1 :
				                url = p.url;
				                break;
				            case 2 :
				                url = 'http://hz.365rili.com/pages/sdk/samsung/schedule_list.html?calendarID=' + p.url;
				                break;
				            case 3 :
				                var uuid, cid;
				                var ids = p.url.split(',');
				                cid = ids[0];
				                uuid = ids[1];
				                url = 'http://hz.365rili.com/pages/sdk/samsung/schedule_details.html?uuid='+uuid+'&cid='+cid;
				                break;
				        }
				        return url
					}
				});
				$('.recommended_top').html(biger);
				$('.recommended_three ul').html(small);
			},
			error: function () {

			}
		});
	}

	function getCalendarList () {
		_headers =JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/calendar/getHallCalendars.do?categoryId=' + 1));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/calendar/getHallCalendars.do',
			data: {
				'categoryId': 1
			},
			headers: _headers,
			success: function (datas) {
				var pic_path = datas['pic_path'];
				var calendars = datas.data[0].calendars;
				calendars.sort(function(a, b){
					return a.seq - b.seq;
				});
				var html = _fn.template(_data['temp_list'], calendars, {
					logo: function (o, p, c) {
						if(!o){
							return ''
						}
						else{
							return pic_path + o;
						}
					},
					focus: function (o, p, c) {
						if(_data.focus[p.id]){
							return '<a href="javascript:;" class="focus_btn on js-focus" data-focus="true" data-id="'+p.id+'" data-title="'+p.title+'" data-logo="'+pic_path+p.logo+'"><div></div><b>退订</b></a>'
						}
						else{	
							return '<a href="javascript:;" class="focus_btn js-focus" data-focus="false" data-id="'+p.id+'" data-title="'+p.title+'" data-logo="'+pic_path+p.logo+'"><div></div><b>订阅</b></a>'
						}
					}
				});

				$('.recommended_calendar_list').html(html);

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