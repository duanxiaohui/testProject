var topCategory = {

	config: {
		focusData: [],
		itemTmpl: '<% _.each(items, function(item) { %>\
						<dl class="e_clear" data-id="<%= item.id %>">\
				            <dt style="background-image:url(<%= item.pic_path %><%= item.logo %>)"></dt>\
				            <dd>\
				                <div class="focus"><div class="focus_icon" data-id="<%= item.id %>" data-status="unsubscribe"></div><p>关注</p></div>\
				                <h3><%= item.title %></h3>\
				                <p><%= item.description %></p>\
				                <span class="focus_num"><%= item.subCount %>人关注</span>\
				            </dd>\
				        </dl>\
				   <% }); %>'
	},
	//初始化
	init: function() {
		document.body.style.webkitUserSelect = 'none';

		var url = window.location.href,
		    num = url.indexOf('categoryId'),
		    categoryId = 0,
		    titleIdx = url.indexOf('title'),
		    title = '',
		    qMark = url.indexOf('?'),
		    p_address = '';

		p_address = (qMark != -1 ? url.substring(0, qMark) : url);
		
		app.call({
			action: 'howToBack',
			params: [{
				name: 'how',
				value: 'back'
			}],
			callback: function() {}
		});
		
		categoryId = num > -1 ? getQueryString('categoryId') : 0;
		title = titleIdx > -1 ? getQueryString('title') : 0;

		topCategory.bindEvents();
		topCategory.getHallCalendarsByType(categoryId);
		/**
		 * 张路
		 * 2015-1-11
		 * 修复了fixed的问题，所以这里需要改class，而且不能用js设定宽度
		 */
		// $('.square_bar_inner').text(title);
	},

	parseFocus: function() {
		var o = null,
		    focusArr = topCategory.config.focusData;

		for(var i=0; i<focusArr.length; i++) {
			o = $('.focus_icon[data-id="' + focusArr[i] + '"]');
			if(o) {
				o.data('status', 'subscribe').addClass('on');
				o.next('p').text('已关注');
			}
		}
	},

	bindEvents: function() {
		var myTimeout = null;
		//关注日历(跳转到客户端)
		$('body').on('click', 'div.focus_icon', function() {
			var $focus = $(this),
				calendarId = $focus.data('id'),
				status = $focus.data('status') == 'unsubscribe' ? 'subscribe' : 'unsubscribe';

			showFocusLoading('.sq_calendar_list');
			callCoCo(status, {calendarID: calendarId});
		});
		//跳转到推荐图片页面
		$('#recommendation').on('click', function() {
			window.location.href = 'index.html';
		});
		$('.search_btn').on('click', function() {
			window.location.href = 'search_new.html';
		});
		window.openStatus = false;
		//点击进入(日历)客户端
		$('.sq_calendar_list').on('click', 'dl', function(event) {
			if($(event.target).is('.focus_icon')) return;
			if(openStatus) return;

			var calendarId = $(this).data('id');

			callCoCo('openCalendar', {calendarID: calendarId});
			openStatus = true;
			setTimeout(function () {
				openStatus = false;
			}, 1000);
			//callCoCo('openCalendar', {calendarID: calendarId});
		});
		$(window).on('scroll', function() {
			window.name = document.body.scrollTop || document.documentElement.scrollTop;
		});
	},
	//获取一级分类下的日历列表
	getHallCalendarsByType: function(categoryId) {
		$.ajax({
			url: '/calendar/getHallCalendars.do',
			type: 'POST',
			dataType: 'json',
			data: {
				categoryId: categoryId
			},
			headers: getHeaders(),
			success: function(result) {
				if(result.state !== 'ok') return; 
				topCategory.parseCalendars(result);
			}
		});
	},
	//解析一级分类日历列表数据
	parseCalendars: function(result) {
		if(result.data.length < 1) return;
		var pic_path = result.pic_path,
		    data = result.data[0].calendars,
		    template = _.template(topCategory.config.itemTmpl);

		/**
		 * 对日历进行排序
		 */
		data.sort(function (a, b) {
			return a.seq - b.seq;
		});
		$.each(data, function(k, v) {
			v.pic_path = pic_path;
		});

		$.each(data, function(k, v) {
			if(v.logo == null) {
				v.pic_path = '/images/forum/';
				v.logo = 'default.png';
			}
		});

		$('.sq_calendar_list').html(template({items: data}));
		setScrollTo('list');
		topCategory.parseFocus();
	}

};

$(document).ready(function() {
	topCategory.init();
});
function init() {
	topCategory.config.focusData = window.data || [];
	topCategory.parseFocus();
}