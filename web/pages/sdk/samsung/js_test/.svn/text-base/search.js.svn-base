/**
 * search
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-01-05 11:18:28
 */

(function () {
	window._data = {
		'checkAliansBridgeTime': 0,
		'temp': '<li><a href="{$url}">{$title}</a></li>'
	};
	function init () {
		if(getBase()){
			(function () {
				$('#js-search').on('submit', searchForm)
				$('.search_con').on('input', function () {
					if($(this).val() == ''){
						$('.clear_input').removeClass('none').addClass('none');
					}
					else{
						$('.clear_input').removeClass('none');
					}
				}).val('');
				$('.clear_input').on('tap', function () {
					$('.search_con').val('').focus();
					$('.clear_input').removeClass('none').addClass('none');
				})
				$('.search_con').focus();
		    })();
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

	function searchForm () {
		var key = $('.search_con').val();
		if(key === ''){
			return callAction('search');
		}

		doSearch(key);
		$('.search_con').blur();
		return false;
	}

	function doSearch (key) {
		_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/coco/searchCalendarV3.do?type=hall_calendar&key=' + key));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/coco/searchCalendarV3.do',
			type: 'POST',
			dataType: 'json',
			data:{
				type:'hall_calendar',
				key:key
			},
            beforeSend: function () {
            	
            },
            complete: function () {
        		
            },
			success: function (datas) {
                if (datas.state !== 'ok') {
                	$('#js-result').html('');
                    return false;
                }

                parseCalendarList(datas.list);
			}
		});
	}

	function parseCalendarList (calendars) {
		var html = _fn.template(_data.temp, calendars, {
			url: function (o, p, c) {
				return 'http://hz.365rili.com/pages/sdk/samsung/schedule_list.html?calendarID=' + p.id;
			}
		});
		$('.search_results').removeClass('none');
		$('#js-result').html(html);
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