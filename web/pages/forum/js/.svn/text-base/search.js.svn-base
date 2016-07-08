var search = {
	version: 0,
	config: {
		focusData: [],
        calendarTmpl: '<% _.each(items, function(item) { %>\
				        		<dl class="e_clear" data-id="<%= item.id %>">\
					                <dt style="background-image:url(<%= item.logo %>)"></dt>\
					                <dd>\
					                    <div class="focus"><div class="focus_icon" data-id="<%= item.id %>" data-status="unsubscribe"></div><p>关注</p></div>\
					                    <h3><%= item.title %></h3>\
					                    <p><%= item.desc %></p>\
					                    <span class="focus_num"><%= item.userCount %>人关注</span>\
					                </dd>\
					            </dl>\
			        		<% }); %>',
		scheduleTmpl: ' <% _.each(items, function(item) { %>\
							<dl class="e_clear" data-id="<%= item.id %>" data-cid="<%= item.cid %>" data-uuid="<%= item.uuid %>" data-image="<%= item.thumb %>">\
		                        <dt style="background-image:url(<%= item.thumb %>)"></dt>\
		                        <dd>\
		                            <h3><%= item.title %></h3>\
		                            <p class="time"><%= item.td %></p>\
		                            <p class="address"><%= item.location %></p>\
		                        </dd>\
		                    </dl>\
						<% }); %>',
		eventTmpl: '<% _.each(items, function(item) { %>\
						<dl class="e_clear" data-id="<%= item.id %>" data-cid="<%= item.cid %>" data-uuid="<%= item.uuid %>" data-image="<%= item.thumb %>">\
	                        <dt style="background-image:url(<%= item.thumb %>)"></dt>\
	                        <dd>\
	                            <h3><%= item.title %></h3>\
	                            <p class="time"><%= item.td %></p>\
	                            <p class="address"><%= item.location %></p>\
	                            <span class="focus_num"><%= item.enrollStr %></span>\
	                        </dd>\
	                    </dl>\
					<% }); %>'
	},

	init: function() {
		var url = window.location.href,
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

		search.bindEvents();
		checkIosVersion();
		$('#queryContent').focus()
		/**
		 * 检测版本号，5.3以下有部分操作
		 */
		function checkIosVersion () {
			var sUserAgent = navigator.userAgent.toLowerCase();
			var len = sUserAgent.length, index;
					
			if(app.getUa.ios) {
				index = sUserAgent.indexOf('ios-coco');

			} else {
				index = sUserAgent.indexOf('android-coco');
			}

			if(index > -1) {
				var s = sUserAgent.substring(index, len),
					arr = s.split('|');

				parseVersion(arr);
			}
		}

		function parseVersion (arr) {
			var version = 0;

			$.each(arr, function(k, v) {
				if(/5./i.test(v)) {
					search.version = parseFloat(v);
					return;
				}
			});
		}
	},

	parseFocus: function() {
		var o = null,
		    focusArr = search.config.focusData;

		for(var i=0; i<focusArr.length; i++) {
			o = $('.focus_icon[data-id="' + focusArr[i] + '"]');
			if(o) {
				o.data('status', 'subscribe').addClass('on');
				o.next('p').text('已关注');
			}
		}
	},

	bindEvents: function() {
		//搜索
		$('#searchForm').on('submit', function() {
			var keyWords = $('#queryContent').val();

			if($.trim(keyWords) === '') return false;
			
			search.getSearchContent(keyWords);
			$('#queryContent').blur();

			return false;
		});
		//加载更多
		$('#calendarMore, #eventMore, #scheduleMore').on('click', function() {
			var id = this.id,
			    tmplName = id.substring(0, id.length-4),
			    $a = $(this),
			    arr = $a.data('more'),
				template = _.template(search.config[tmplName + 'Tmpl']);

			$a.parent().find('dl').remove();
			$a.before(template({items: arr}));

			if(tmplName == 'calendar') {
				search.setCalendarDesc();
			}
			if(tmplName == 'event') {
				search.setTitle($('#searchEvent dd'));
			}
			if(tmplName == 'schedule') {
				search.setTitle($('#searchSchedule dd'));
			}
			search.checkImageExist();
       		search.checkLocationExist();
       		search.parseFocus();
       		$(this).hide();
		});
		//搜索内容展开关闭
		$('#calendarArrow, #eventArrow, #scheduleArrow').on('click', function() {
			var $h2 = $(this).parent(),
				$list = $h2.next('div');

			search.toggleItems($list, $h2);
		});
		//关注日历(跳转到客户端)
		$('body').on('click', 'div.focus_icon', function() {
			var $focus = $(this),
				calendarId = $focus.data('id'),
				status = $focus.data('status') == 'unsubscribe' ? 'subscribe' : 'unsubscribe';

			showFocusLoading('#searchCalendar');
			callCoCo(status, {calendarID: calendarId});
		});
		//点击进入(日历)客户端
		$('#searchCalendar').on('click', 'dl', function(event) {
			if($(event.target).is('.focus_icon')) return;
			var calendarId = $(this).data('id');

			callCoCo('openCalendar', {calendarID: calendarId});
		});
		//点击进入(日程)客户端
		$('#searchSchedule').on('click', 'dl', function(event) {
			var scheduleId = $(this).data('id'),
				cid = $(this).data('cid'),
				scheduleUuid = $(this).data('uuid');

			callCoCo('schedule', {cid: cid, scheduleUuid: scheduleUuid});
		});
		//点击进入(活动)客户端
		$('#searchEvent').on('click', 'dl', function(event) {
			var scheduleId = $(this).data('id'),
				cid = $(this).data('cid'),
				scheduleUuid = $(this).data('uuid');

			callCoCo('schedule', {cid: cid, scheduleUuid: scheduleUuid});
		});

/**
 * ios回把文本框下拉的问题，补丁，没有完美解决
 */
		if(app.getUa.ios){

			//修复focus时回到顶部
			$('#queryContent').on('focus', function () {
					var t = parseInt(document.body.scrollTop);
		            var h = parseInt(document.body.scrollHeight);
		            $('<div id="searchMask" style="height:100%;position:absolute;width:100%;background:#fff;z-index:10;top:0;"></div>').appendTo('.search_content');
		            this.setAttribute('data-st', t);
		            document.body.scrollTop = 0;
		            $('.square_bar')[0].style.position = 'absolute';
		            $('.square_bar')[0].style.top = '0px';
		            $('.search_input')[0].style.position = 'absolute';
		            $('.search_input')[0].style.top = '41px';
		            document.body.style.overflow = 'hidden';
		            document.body.style.height = '100%';
		            document.documentElement.style.overflow = 'hidden';
		            document.documentElement.style.height = '100%';
			});
			$('#queryContent').on('blur', function () {
		        $(document.documentElement).css({
		            height:'auto',
		            overflow:'visible',
		            '-webkit-overflow-scrolling' : 'touch'
		        });
		        $(document.body).css({
		            height:'auto',
		            overflow:'visible',
		            '-webkit-overflow-scrolling' : 'touch'
		        }).scrollTop($(this).data('st'));
				$('.square_bar').css({
					'position': 'fixed',
					'top':'0px',
				});
				$('.search_input').css({
					'position': 'fixed',
					'top':'41px',
				})
				$('#searchMask').remove()
			});

		}
	},
	//展开关闭搜索内容
	toggleItems: function($list, $iconParent) {
		if($list.css('display') == 'none') {
			$list.css('display', 'block');
			$iconParent.removeClass().addClass('on');
		} else {
			$list.css('display', 'none');
			$iconParent.removeClass();
		}
	},
	//搜索之前清除上一次搜索数据
	removeData: function() {
		$('#searchCalendar dl').remove();
		$('#searchEvent dl').remove();
		$('#searchSchedule dl').remove();
	},
	//获取搜索内容
	getSearchContent: function(keyWords) {
		search.removeData();
		search.searchCalendar(keyWords);
		if(search.version >= 5.3){
			search.searchSchedule(keyWords);
			search.searchEvent(keyWords);
		}
	},
	//搜索获取日历内容
	searchCalendar: function(keyWords) {
		$.ajax({
			url: '/search/searchPublicCalendar.do',
			type: 'POST',
			dataType: 'json',
			data: {
				key: keyWords
			},
			headers: getHeaders(),
			success: function(calendarData) {
				if(calendarData.state !== 'ok') return; 
				search.parseCalendar(calendarData);
			}
		});
	},
	//解析日历内容
	parseCalendar: function(calendarData) {
		var hTemplate = _.template(search.config.calendarTmpl)
            $dls = null;
        search.splitData($('.sq_calendar_list'), calendarData, hTemplate);

        $dls = $('.search_results').find('dl');
        if($dls.length < 1) {
        	var $search_results = $('.search_results'),
        		$no_result = $('.no_result');

        	$search_results.show();
        	$no_result.removeClass('none').css({
        		'height': $(window).height()-93,
        		'line-height': ($(window).height()-93) + 'px'
        	});
        	return;
        }else if($dls.length == 1) {
        	$('.no_result').addClass('none');
        	$('#calendarMore').hide();
        	$('#searchCalendar').find('dl').addClass('noborder');
        } else {
        	$('.no_result').addClass('none');
        }

        $('.search_calendar_results').removeClass('none');

        search.setCalendarDesc();
        search.setTitle($('#searchSchedule dd'));
        search.setTitle($('#searchEvent dd'));
       	search.checkImageExist();
       	// search.checkLocationExist();
       	search.parseFocus();
	},
	//搜索获取日程内容
	searchSchedule: function(keyWords) {
		$.ajax({
			url: '/search/searchSchedule.do',
			type: 'POST',
			dataType: 'json',
			data: {
				key: keyWords
			},
			headers: getHeaders(),
			success: function(scheduleData) {
				if(scheduleData.state !== 'ok') return; 
				search.parseSchedule(scheduleData);
			}
		});
	},
	//解析日程内容
	parseSchedule: function(scheduleData) {
		var sTmpl = _.template(search.config.scheduleTmpl),
            $dls = null;

        search.splitData($('#searchSchedule'), scheduleData, sTmpl);

        $dls = $('.search_results').find('dl');
        if($dls.length < 1) {
        	var $search_results = $('.search_results'),
        		$no_result = $('.no_result');

        	$search_results.show();
        	$no_result.removeClass('none').css({
        		'height': $(window).height()-93,
        		'line-height': ($(window).height()-93) + 'px'
        	});
        	return;
        } else if($dls.length == 1) {
        	$('.no_result').addClass('none');
        	$('#scheduleMore').hide();
        } else {
        	$('.no_result').addClass('none');
        }
        $('.search_schedule_results').removeClass('none');

        // search.setCalendarDesc();
        search.setTitle($('#searchSchedule dd'));
        // search.setTitle($('#searchEvent dd'));
       	search.checkImageExist();
       	search.checkLocationExist();
       	// search.parseFocus();
	},
	//搜索获取活动内容
	searchEvent: function(keyWords) {
		$.ajax({
			url: '/search/searchEvent.do',
			type: 'POST',
			dataType: 'json',
			data: {
				key: keyWords
			},
			headers: getHeaders(),
			success: function(eventData) {
				if(eventData.state !== 'ok') return; 
				search.parseEvent(eventData);
			}
		});
	},
	//解析活动内容
	parseEvent: function(eventData) {
		var eTmpl = _.template(search.config.eventTmpl),
            $dls = null;
        search.splitData($('#searchEvent'), eventData, eTmpl);

        $dls = $('.search_results').find('dl');
        if($dls.length < 1) {
        	var $search_results = $('.search_results'),
        		$no_result = $('.no_result');

        	$search_results.show();
        	$no_result.removeClass('none').css({
        		'height': $(window).height()-93,
        		'line-height': ($(window).height()-93) + 'px'
        	});
        	return;
        } else if($dls.length == 1) {
        	$('.no_result').addClass('none');
        	$('#eventMore').hide();
        } else {
        	$('.no_result').addClass('none');
        }
        $('.search_event_results').removeClass('none');

        // search.setCalendarDesc();
        // search.setTitle($('#searchSchedule dd'));
        search.setTitle($('#searchEvent dd'));
       	search.checkImageExist();
       	search.checkLocationExist();
       	// search.parseFocus();
	},
	//解析数据
	splitData: function($ele, data, template) {
		if(data.list.length < 1) {
			$ele.parent().hide();
			return;
		} else {
			$ele.parent().show();
		}

		var $a = $ele.find('a');

        if(data.list.length > 2) {
    		var arr = data.list,
    		    newArr = arr.slice(0, 2);

    		$a.before(template({items: newArr}));
    		$a.data('more', JSON.stringify(arr));
    		$a.show();
    	} else {
    		$a.before(template({items: data.list}));
    		$a.data('more', JSON.stringify(data.list));
    	}
	},
	//设置日历描述内容，如果超两行做截字处理
	setCalendarDesc: function() {
        var $p_list = $('#searchCalendar dd').find('p');

        $p_list.each(function() {
        	var $p = $(this);
        	while($p.height() > 42) {
        		$p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...'));
        	}
        });
	},
	//设置日程和活动标题内容，如果超过两行做截字处理
	setTitle: function($ele) {
		var $h3_list = $ele.find('h3');

		$h3_list.each(function() {
			var $h3 = $(this);
			while($h3.height() > 35) {
        		$h3.text($h3.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...'));
        	}
		});
	},
	//检查图片是否存在，不存在内容左移
	checkImageExist: function() {
		$('#searchSchedule').find('dl').each(function(k, v) {
			var imgStr = $(this).data('image');
			if(imgStr == '') {
				$(this).addClass('noimg');
			}
		});
		$('#searchEvent').find('dl').each(function(k, v) {
			var imgStr = $(this).data('image');
			if(imgStr == '') {
				$(this).addClass('noimg');
			}
		});
	},
	//如果地理位置不存在就不显示 
	checkLocationExist: function() {
		$('.address').each(function(k, v) {
			var txt = $(this).text();
			if(txt == '') {
				$(this).addClass('none');
			}
		});
	}

};

$(document).ready(function() {
	search.init();
});

function init () {
	search.config.focusData = window.data || [];
}

