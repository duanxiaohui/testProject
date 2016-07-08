/**
 * subscribe
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-01-04 18:48:00
 */

(function () {
	window._data = {
		'checkAliansBridgeTime': 0,
		'temp': '\
			<div class="div_list"><dl class="e_clear js-calendar active_ce0" data-id="{$id}" data-title="{$title}">\
    			<dt><img data-src="{$background}" class="recommended_face"/></dt>\
    			<dd>\
    				<div class="recommended_calendar_h3">\
    					<h3>{$title}</h3>\
    					<p>{$description}</p>\
    				</div>\
    			</dd>\
    		</dl>\
    		<a href="javascript:;" class="focus_btn on js-focus" data-focus="true" data-id="{$id}" data-title="{$title}" data-logo="{$background}"><div></div><b>退订</b></a></div>'
	};
	function init () {
		if(getBase()){
			getSubscribes();
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
			if(!_key){
				AliansBridge.invokelogin();
			}
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

	function getSubscribes () {
		_headers =JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/calendar/listSubscribeCalendars.do'));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/calendar/listSubscribeCalendars.do',
			dataType:'json',
			headers: _headers,
			success: function (datas) {
				var calendars = datas.calendars;
				var html = _fn.template(_data.temp, calendars, {
					background: function (o, p, c) {
						if(!o){
							return 'http://hz.365rili.com/pages/sdk/samsung/images/noImg.gif'
						}
						return o
					}
				});
				if(!calendars){
					$(".footer_copy").hide();
					$(".recommended_calendar_list").html("<div class='no_subscribe'>你还没有订阅日历，请先去订阅。</div>");
					var h = $(window).height();
					$(".no_subscribe").css({"line-height": (h-82)+"px"});
				}else{
					$('.recommended_calendar_list').html(html).on('tap', '.js-classification', function (e) {
							var _this = $(this);
							_fn.callAction('calendar', {
								categorie: _this.data('id'),
								title: _this.data('title')
							})
						});
				}
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