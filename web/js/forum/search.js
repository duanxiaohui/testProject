/**
 * search
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-07 11:40:08
 */

(function () {
	var colors = [
		'ff7575',
		'00aeef',
		'aedc55',
		'ffd800',
		'16c48d',
		'ea943f',
		'56dbff',
		'd37ed4',
		'94a4b2',
		'76bdfc',
		'ffa0d8'
	];
	var usedColors = {round:1,count:0};

	function loadTags () {

        var headers = {};
        if(app.getUa.android){
            headers['coco-ua'] = 'android';
        }
		$.ajax({
			url: '/calendar/getHotTags.do',
			type: 'GET',
			dataType: 'json',
			headers:headers,
			success: function (datas) {
				datas = [
					'春运购票提醒',
					'电影',
					'动漫',
					'足球球队',
					'星座运势',
					'历史上的今天',
					'节日大全',
					'美剧',
					'NBA赛程',
					'新车'
				]
				parseTags(datas);
			}
		});
	}

	function parseTags (tags) {
		var html = [];
		var color = null;
		var colorLenght = colors.length;
		for (var i = 0; i < tags.length; i++) {
			color = getColorByRandom();
			html.push('<a href="javascript:;" class="search_tag c_' + color + '" data-tag="' + tags[i] + '">' + tags[i] + '</a>');
		};
		var searchBox = $('.search_tag_list');
		searchBox[0].innerHTML = html.join('');
		searchBox.css('opacity', '1');
		$('.tag_loading').css('opacity', 0);
		setTimeout(function () {
			$('.tag_loading').remove();
		},600);
	}

	function getColorByRandom () {
		var color = colors[parseInt(random(0,11))];
		if(!usedColors[color]){
			usedColors[color] = 0;
		}
		if(usedColors[color] > usedColors.round){
			return getColorByRandom();
		}
		usedColors[color]++;
		usedColors.count++;
		usedColors.round = parseInt(usedColors.count / colors.length);
		return color;
	}

	function search (e) {
		var key = $(this).attr('data-tag');
		$('.search_con').val(key);
		searchForm();
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
		$.ajax({
			url: 'http://www.365rili.com/coco/searchCalendarV3.do',
			type: 'POST',
			dataType: 'json',
			data:{
				type:'hall_calendar',
				key:key
			},
            beforeSend: function () {
            	$('<div class="loadmore" style="display: none;">加载中...<div class="icon_loadmore"></div></div>').insertAfter('.content').show();
            },
            complete: function () {
        		setTimeout(function () {
        			$('.loadmore').fadeOut(100, function () {
	        			$(this).remove();
	        		});
        		},500);
            },
			success: function (datas) {
                if (datas.state !== 'ok') {
                	$('.content')[0].innerHTML = '';
                    return false;
                }

                parseCalendarList(datas.list, '');
			}
		});
	}

	function random (n, m) {
        return Math.random() * (m - n) + n
    }

    (function () {
		$('.search_tag_list').on('tap', 'a', search)
		$('.search').on('submit', searchForm);
    })();

	loadTags();
})();