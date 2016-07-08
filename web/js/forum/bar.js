/**
 * bar
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-12-03 13:42:36
 */

(function () {
	bar();
	function bar () {
		// if(initLocation()){
			initBase();
		// }

		/**
		 * 检测页面
		 */
		var url = window.location.href;
		var action = url.match(/\w+.html/);
		if(!action){
			return false;
		}

		/**
		 * 不同页面进行分流
		 */
		action = action[0].replace('.html', '')
		switch(action){
			case 'index': 
				$('#top_bar_con').html('发现广场');
				$('.search_btn').removeClass('none');
				break;

			case 'search':
				$('#top_bar_con').html('搜索');
				break;
			default:
				$('#top_bar_con').html(decodeURI(query('title')));
		}
	}
	function initBase () {
		temp = '\
			<div id="top_bar_box">\
				<a href="javascript:;" class="search_btn none"><span class="search_btn_icon"></span></a>\
		        <div id="top_bar">\
		            <div id="top_bar_con"></div>\
		        </div>\
		    </div>\
		';
		$('body').append(temp);
		$('.search_btn').on('tap', function () {
			callAction('search', {});
		});

		/**
		 * 不需要刷新按钮
		 */
		//<a href="javascript:;" class="return_btn"><span class="return_btn_icon"></span></a>\
		// $('.return_btn').on('tap', function () {
		// 	window.history.go(-1);
		// })
	}
	function initLocation () {
		/**
		 * 检测页面
		 */
		var url = window.location.href;
		var action = url.match(/\w+.html/);
		if(!action){
			window.location.href = 'http://www.365rili.com/pages/forum/index.html';
			return false;
		}
		if(history.length == 1 && action[0].replace('.html', '') != 'index'){
			window.location.href = 'http://www.365rili.com/pages/forum/index.html';
			return false;
		}
		return true;
	}
})();