/**
 * classification
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-12-30 17:52:03
 */

(function () {
	window._data = {
		'checkAliansBridgeTime': 0,
		'temp': '\
			<dl class="sports e_clear active_ce0 js-classification" data-id="{$id}" data-title="{$long_title}">\
	            <dt><div class="list_icon" {$background_img}></div></dt>\
	            <dd>\
	                <span class="arrow"></span>\
	                 {$long_title}\
	            </dd>\
	        </dl>'
	};
	function init () {
		if(getBase()){
			getCategories();
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
	function getCategories () {
		_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/calendar/getCategories.do'));
		_headers['365-coop-key'] = _data.key;
		_headers['365-coop-type'] = _data.type;
		$.ajax({
			url: 'http://hz.365rili.com/calendar/getCategories.do',
			type:'post',
			data:{
				coopType : 'coolpad'
			},
			headers: _headers,
			success: function (datas) {
				var pic_path = datas.pic_path;
				datas.categories.sort(function (a, b) {
					return a.sequence - b.sequence;
				})
				var html = _fn.template(_data.temp, datas.categories, {
					'background_img': function (o, p, c) {
						if(!o){
							return 'style="background-image: url()"'
						}
						else{
							return 'style="background-image: url(' + pic_path + o + ')"';
						}
					}
				});
				$('.classification_list').html(html).on('tap', '.js-classification', function (e) {
					var _this = $(this);
					_fn.callAction('calendar_list', {
						category: _this.data('id'),
						title: _this.data('title')
					})
				});
			},
			error: function () {

			}
		});
	}
	init();
})();