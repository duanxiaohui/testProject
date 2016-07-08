
var forum = {
	//模板
	config: {

		citysTmpl: '<% _.each(items, function(item) { %>\
        				<li data-code="<%= item.code %>" data-city="<%= item.city %>"><%= item.city %></li>\
    				<% }); %>',

		categoriesTmpl: '<% _.each(items, function(item) { %>\
					        <dl class="sports e_clear" data-id="<%= item.id %>" data-title="<%= item.long_title %>">\
					            <dt><div class="list_icon" style="background-image:url(<%= item.pic_path %><%= item.background_img %>)"></div></dt>\
					            <dd>\
					            <span class="arrow"></span>\
					             <%= item.long_title %>\
					            </dd>\
					        </dl>\
					    <% }); %>',

		recommendTmpl: '<% _.each(items, function(item) { %>\
        					<li class="none" data-action="<%= item.action %>" data-url="<%= item.url %>"><img data-src="<%= item.pic_path %><%= item.photo %>" alt=""></li>\
    					<% }); %>',

		recommendTmplNormal: '<li data-action="{$action}" data-url="{$url}"><img src="{$pic_path}{$photo}" alt=""></li>'

	},
	//初始化
	init: function() {
		var url = window.location.href,
		    num = url.indexOf('city_code'),
		    name = url.indexOf('city_name'),
		    city_code = 0,
		    city_name = '全国',
		    qMark = url.indexOf('?'),
		    p_address = '';

		p_address = (qMark != -1 ? url.substring(0, qMark) : url);

		if(url.indexOf('city_select') > -1) {
	 		app.call({
				action: 'howToBack',
				params: [{
					name: 'how',
					value: 'back'
				}],
				callback: function() {}
			});
	 	} else {
	 		app.call({
				action: 'howToBack',
				params: [{
					name: 'how',
					value: 'quit'
				}],
				callback: function() {}
			});
	 	}

		forum.bindEvents();

		if($.fn.cookie('city_code') != '' && $.fn.cookie('city_code') != null ) {
        	city_code = $.fn.cookie('city_code');
        } else {
        	city_code = num > -1 ? getQueryString('city_code') : 0;
        }

		if(url.indexOf('index') > -1) {
        	forum.getRecommandEventByCity(city_code);
        }

		if(url.indexOf('city_select') > -1) {
			forum.getCitys();
		}

		if(url.indexOf('classification') > -1) {
			forum.getCategories();	
		}

        if($.fn.cookie('city_name') != '' && $.fn.cookie('city_name') != null) {
			city_name = $.fn.cookie('city_name');
        } else {
        	city_name = name > -1 ? getQueryString('city_name') : '全国';
        }
		
		$('.city_box').text(city_name);
	},
	//绑定事件
	bindEvents: function() {
		$(window).on('scroll', function() {
			window.name = document.body.scrollTop || document.documentElement.scrollTop;
		});
		//跳转到城市列表页面
		$('.city_box').on('click', function() {
			window.location.href = 'city_select.html';
		});
		//跳转到推荐图片页面
		$('#recommendation').on('click', function() {
			window.location.href = 'index.html';
		});
		//跳转到一级分类页面
		$('#classification').on('click', function() {
			window.location.href = 'list.html?categoryId=1&title=%E7%B2%BE%E5%93%81%E6%8E%A8%E8%8D%90';
		});
		//城市列表页面跳转到首页推荐图片页面
		$('.city_list').on('click', 'li', function() {
			var city_code = $(this).data('code'),
			    city_name = $(this).data('city');

			$.fn.cookie('city_code', city_code, { expires: 1000 });
			$.fn.cookie('city_name', city_name, { expires: 1000 });
			window.location.href = 'index.html?city_code=' + city_code + '&city_name=' + city_name;
		});
		//跳转到搜索页面
		/**
		 * ios5.3审核，隐藏收藏按钮
		 */
		if(app.getUa.ios){
		 	var sUserAgent = navigator.userAgent.toLowerCase();
		 	var len = sUserAgent.length,
		 		index = sUserAgent.indexOf('ios-coco');
		 	if(index > -1) {
		 		var s = sUserAgent.substring(index, len),
		 			arr = s.split('|');
		 		var version = 0;
		 		$.each(arr, function(k, v) {
		 			if(/5\./i.test(v)) {
		 				version = parseFloat(v);
		 				return
		 			}
		 		});
		 		if(version >= 5.7) {
		 			// $('.search_btn').hide();
		 		}
		 	}
		}
		$('.search_btn').on('click', function() {
			window.location.href = 'search_new.html';
		});
		//点击推荐图片跳转页面(客户端或者URL或者进入图片)
		$('.square_recommended_content ul').on('click', 'li', function() {
			var $ele = $(this),
			    action = $(this).data('action'),
			    url = $(this).data('url');

			forum.parseAction($ele, action, url);
		});
		//跳转某个一级分类页面下的日历页面
		$('.classification_list').on('click', 'dl', function() {
			var categoryId = $(this).data('id'),
				title = $(this).data('title');

			window.location.href = 'list.html?categoryId=' + categoryId + '&title=' + title;
		});
	},
	//解析推荐页面跳转逻辑
	//1: 打开图片  2:打开url中的native日历,此时url为日历的id  3:打开url中的native日程,此时url为日程id  4:打开url页面
	parseAction: function($ele, action, url) {
		var $img = $ele.find('img'),
			pic_path = $img.attr('src');

		if(action == 1) {
			window.location.href = pic_path;
		} else if(action == 2) {
			callCoCo('openCalendar', {calendarID: url});
		} else if(action == 3) {
			var arr = url.split(','),
				cid = arr[0],
				scheduleUuid = arr[2];

			callCoCo('schedule', {cid: cid, scheduleUuid: scheduleUuid});
		} else if(action == 4) {
			try {
				AliansBridge.howToBack('back');
			} catch(e) {

			}
			window.location.href = url;
		}
	},
	//获取城市列表
	getCitys: function() {
		$.ajax({
			url: '/event/citys.do',
			type: 'POST',
			dataType: 'json',
			headers: getHeaders(),
			success: function(data) {
				if(data.state !== 'ok') return; 
				forum.parseCitys(data);
			}
		});
	},
	//解析城市列表数据
	parseCitys: function(data) {
		var template = _.template(forum.config.citysTmpl);

		$('.city_list ul').append(template({items: data.citys}));
	},
	//获取一级分类
	getCategories: function() {
		$.ajax({
			url: '/calendar/getCategories.do',
			type: 'POST',
			dataType: 'json',
			headers: getHeaders(),
			success: function(data) {
				if(data.state !== 'ok') return; 
				forum.parseCategories(data);
			}
		});
	},
	//解析一级分类数据
	parseCategories: function(data) {
		if(data.categories.length < 1) return;
		data.categories.sort(function (a, b) {
			return a.sequence - b.sequence;
		})
		var pic_path = data.pic_path,
			data = data.categories,
			template = _.template(forum.config.categoriesTmpl);
		
		$.each(data, function(k, v) {
			v.pic_path = pic_path;
		});

		$('.classification_list').html(template({items: data}));
	},
	//获取推荐图片
	getRecommandEventByCity: function(city_code) {
		$.ajax({
			url: '/calendar/getRecommandEventByCity.do',
			type: 'POST',
			dataType: 'json',
			data: {
				city: city_code,
				type: '365rili'
			},
			headers: getHeaders(),
			success: function(data) {
				if(data.state !== 'ok') return; 
				forum.parseRecommandEventByCity(data);
			}
		});
	},
	//解析推荐图片数据
	parseRecommandEventByCity: function(data) {
		if(data.recommand.length < 1) return;

		var pic_path = data.pic_path,
			data = data.recommand;
			// template = _.template(forum.config.recommendTmpl);
		
		$.each(data, function(k, v) {
			v.pic_path = pic_path;
		});
		
		
		$('.square_recommended_content ul').html(templateNormal(forum.config.recommendTmplNormal, data));


		//页面返回到上次滚动的位置
	    setScrollTo('index');
		//ios5.3以下不支持打开日程，屏蔽
		if(app.getUa.ios){
			var sUserAgent = navigator.userAgent.toLowerCase();
			var len = sUserAgent.length,
				index = sUserAgent.indexOf('ios-coco');
			if(index > -1) {
				var s = sUserAgent.substring(index, len),
					arr = s.split('|');
				var version = 0;
				$.each(arr, function(k, v) {
					if(/5\./i.test(v)) {
						version = parseFloat(v);
						return
					}
				});
				if(version < 5.3) {
					$('li[data-action="3"]').hide();
				}
			}
		}
		// forum.loadImgs();
		//forum.setImgSizeScale();
	},
	//设置图片比例
	setImgSizeScale: function() {
		var $imgs = $('.square_recommended_content').find('img');

		$imgs.each(function() {
			var $img = $(this),
				$width = $img.width(),
				$height = $img.height();

			if($width > $height) {
				$img.css('height', '100%');
			} else {
				$img.css('width', '100%');
			}
		});
	},

	loadImgs: function() {
		var $imgs = $('.square_recommended_content').find('img');

		$imgs.each(function() {
			var img = $(this),
			    _img = new Image();
			_img.onload = function() {
				var _image = this;
				img.attr('src', _image.src);
				img.parents('li').removeClass('none');
			};

			_img.src = img.attr('data-src');
		});
	}

};


function copyTo (ce, e) {
    for (var i in ce) {
        if (typeof i === 'undefined') continue;
        if (typeof ce[i] == 'object') {
            e[i] = {};
            if (ce[i] instanceof Array) e[i] = [];
            copyTo(ce[i], e[i]);
            continue;
        }
        e[i] = ce[i];
    }
}
function apply (object, config, defaults) {
    if (defaults) {
        apply(object, defaults);
    }
    if (object && config && typeof config === 'object') {
        var i, j;

        for (i in config) {
            object[i] = config[i];
        }
    }

    return object
}
function typeOf (o) {
    return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
}
function templateNormal (s,o,defaults, index) {
	index = index || 0;
    if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
    var _html = [];
    defaults = defaults || {};
    if(typeOf(o) === 'array'){
        for (var i = 0, len = o.length; i < len; i++) {
            _html.push(templateNormal(s, o[i], defaults, i));
        };
    }else{
        var __o = {};
        copyTo(o, __o);
        apply(__o, defaults);
        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o, index) : (o[_o] || __o[_o] || '');
        }));
    }
    return _html.join('');
}

$(document).ready(function() {
	forum.init();
});