
var valentine = {
	config: {
		monHead: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		$s_year: $('.show').find('.select_year'),
		$s_month: $('.show').find('.select_month'),
		$s_day: $('.show').find('.select_day'),
		$show_results: $('.show_results'),
		$d_year: $('.dog').find('.select_year'),
		$d_month: $('.dog').find('.select_month'),
		$d_day: $('.dog').find('.select_day'),
		$dog_results: $('.dog_results'),
		beatRate: 0,
		content: '',
		img_path: '',
		flag: ''
	},
	// 初始化
	init: function() {
		if(getURLParameter('type')){
			jumpToSourc();
			return
		}
		valentine.initUI();
		valentine.bindEvents();
		var showbar = getURLParameter('showbar');
        if(showbar=="1"){
            $(".bar").show();
            $('body').height($(window).height()-43);
        }else{
             $(".bar").hide();
             $('html').css({"padding":"0","height":"100%"})
        }
	},
	// 初始化视图
	initUI: function() {
		valentine.createDate();
	},
	// 初始化日期
	createDate: function() {
		var y = (new Date()).getFullYear(),
			m = (new Date()).getMonth(),
			date = (new Date()).getDate();
	
		valentine.fillSelectYear(y);
		valentine.fillSelectMonth();
		var d = valentine.config.monHead[m];
		if(m == 1 && valentine.isRN(y)) d++; 
		valentine.fillSelectDays(d);

		valentine.defaultDisplayTime(y, m, date);
		valentine.defaultSelected(y, m+1, date);
	},
	// 填充选择框的默认值
	defaultSelected: function(y, m, date) {
		var yStr = 'option[value="' + y + '"]',
			mStr = 'option[value="' + m + '"]',
			dStr = 'option[value="' + date + '"]';

		$('#s_year').find(yStr).prop('selected', true);
		$('#s_month').find(mStr).prop('selected', true);
		$('#s_day').find(dStr).prop('selected', true);

		$('#d_year').find(yStr).prop('selected', true);
		$('#d_month').find(mStr).prop('selected', true);
		$('#d_day').find(dStr).prop('selected', true);
	},
	// 默认显示的时间
	defaultDisplayTime: function(y, m, date) {
		valentine.config.$s_year.find('.s_y_txt').text(y);
		valentine.config.$s_month.find('.s_m_txt').text(parseInt(m) + 1);
		valentine.config.$s_day.find('.s_d_txt').text(date);

		valentine.config.$d_year.find('.d_y_txt').text(y);
		valentine.config.$d_month.find('.d_m_txt').text(parseInt(m) + 1);
		valentine.config.$d_day.find('.d_d_txt').text(date);
	},
	// 判断是否是闰年
	isRN: function(year) {
        return (year%4 == 0 && year%100 != 0) || (year%400 == 0);
    },
    // 填充 年 下拉框数据
    fillSelectYear: function(y) {
    	var y_items = '';

    	for(var i=(y-55); i<(y+1); i++) {
			y_items += '<option value="' + i + '">' + i + '</option>\r\n';
		}

		$('#s_year').append(y_items);
		$('#d_year').append(y_items);
    },
    // 填充 月 下拉框数据
    fillSelectMonth: function() {
		var m_items = '';

    	for(var i=1; i<13; i++) {
			m_items += '<option value="' + i + '">' + i + '</option>\r\n';
		}

		$('#s_month').append(m_items);
		$('#d_month').append(m_items);
    },
    // 填充 日 下拉框数据
    fillSelectDays: function(d) {
    	var d_items = '';

    	for(var i=1; i<(d+1); i++) {
			d_items += '<option value="' + i + '">' + i + '</option>\r\n';
		}

		$('#s_day').empty();
		$('#d_day').empty();
		$('#s_day').append(d_items);
		$('#d_day').append(d_items);
    },
    // 计算相差天数
    calculateDays: function($ele, startDate, endDate) {
    	var days = parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 /24);

    	$ele.text(days);

    	return days;
    },
    // 计算并设置击败率（非单身）
    setCalculateBeatRateForShow: function(days) {
    	var rate = (days > 1829) ? '99.99%' : ((days / 1830) * 100).toFixed(2) + '%';

        valentine.config.$show_results.find('.s_rate').text(rate);
        return rate;
    },
    // 计算并设置击败率（单身）
    setCalculateBeatRateForDog: function(days) {
    	var rate = (days > 1094) ? '99.99%' : ((days / 1095) * 100).toFixed(2) + '%';

    	valentine.config.$dog_results.find('.d_rate').text(rate);

    	return rate;
    },
    //计算文字区域高度
    setHeight:function(){
		var results_tips_show = valentine.config.$show_results.find('.results_tips');
    	if(parseInt(results_tips_show.height()) == 38 || parseInt(results_tips_show.height()) == 24 || parseInt(results_tips_show.height()) == 21){
    		results_tips_show.css({"text-align":"center"});
    	}else{
    		results_tips_show.css({"text-align":"left"});
    	}
    	var results_tips_dog = valentine.config.$dog_results.find('.results_tips');
    	if(parseInt(results_tips_dog.height()) == 38 || parseInt(results_tips_dog.height()) == 24 || parseInt(results_tips_dog.height()) == 21 ){
    		results_tips_dog.css({"text-align":"center"});
    	}else{
    		results_tips_dog.css({"text-align":"left"});
    	}
    },
    // 温馨提示信息（非单身）
    showResultTips: function(days) {
    	var txt = '';

    	if(days >= 0 && days <= 30) {
    		txt = '革命刚刚成功，同志还需努力，且行且珍惜';
    	} else if(days >= 31 && days <= 100) {
    		txt = '你是风儿我是沙，你是哈蜜我是瓜，凑到一起萌萌哒';
    	} else if(days >= 101 && days <= 300) {
    		txt = '你是我的小呀小苹果儿，怎么爱你都不嫌多，春夏秋冬都一起过';
    	} else if(days >= 301 && days <= 600) {
    		txt = '恭喜你的长情指数打败强东哥和奶茶妹，身家数十亿不比你真爱无敌';
    	} else if(days >= 601 && days <= 1000) {
    		txt = '一定是你们的真爱感动上天，让2012的世界末日没有到来';
    	} else if(days >= 1001 && days <= 1829) {
    		txt = '两情若是久长时，该是两人成婚时，若是千呀年呀有造化，白首同心在眼前';
    	} else if(days >= 1830) {
    		txt = ' 送过鲜花钻戒房产证，跪过键盘主板搓衣板，进击吧，有情人';
    	}
    	 valentine.config.$show_results.find('.results_tips').text(txt);
    	 setTimeout(function () {
    	 	valentine.setHeight();
    	 },16)
    },
    // 温馨提示信息（单身）
    dogResultTips: function(days) {
    	var txt = '';

    	if(days >= 0 && days <= 30) {
    		txt = '天涯何处无芳草，何必单恋一枝花';
    	} else if(days >= 31 && days <= 100) {
    		txt = '知道你过得不好，我也就放心了';
    	} else if(days >= 101 && days <= 300) {
    		txt = '每天都玩连连看，消灭一对是一对';
    	} else if(days >= 301 && days <= 500) {
    		txt = '我单身我骄傲，我为祖国省橡胶，没人牵手，我就揣兜';
    	} else if(days >= 501 && days <= 700) {
    		txt = '天长地久，根本没有，海枯石烂，纯属扯淡';
    	} else if(days >= 701 && days <= 1094) {
    		txt = '一人吃饱，全家不饿，买房买车，自己嘚瑟';
    	} else if(days >= 1095) {
    		txt = '大河向东流呀，天下情侣都分手呀，嗳嘿嗳嘿让你秀，过完这节都分手呀';
    	}
    	valentine.config.$dog_results.find('.results_tips').text(txt);
    	setTimeout(function () {
    	 	valentine.setHeight();
    	 },16)    
    },
    // 分享功能
    shareJump: function() {
    	if(!valentine.config.type){
    		app.call({
	        	action: 'shareTo',
	        	params: [
	        		{
	        			name: 'shareString',
	        			value: JSON.stringify({
	        				title: '【单不单身，出来秀秀】',
	        				content: '全国单身汪和有情人等你来挑战！',
	        				link: window.location.href,
	        				image: 'http://www.365rili.com/pages/Valentine/images/single.jpg',
	        				isEvent: false
	        			})
	        		},
	        		{
	        			name: 'channel',
	        			value: 'wx'
	        		}
	        	],
	        	callback: function(data) {}
	        });
    	}
    	else{
    		var txt = '';
			var img = '';
			if(valentine.config.type == 'double'){
				txt = '我们在一起' + valentine.config.days + '天，击败了全国' + ((valentine.config.days > 1829) ? '99.99' : ((valentine.config.days / 1830) * 100).toFixed(2)) + '%的人';
				img = 'http://www.365rili.com/pages/Valentine/images/double.jpg';
			}
			else{
				txt = '我单身了' + valentine.config.days + '天，击败了全国' + ((valentine.config.days > 1094) ? '99.99' : ((valentine.config.days / 1095) * 100).toFixed(2)) + '%的人';
				img = 'http://www.365rili.com/pages/Valentine/images/single.jpg';
			}
			var link = 'http://www.365rili.com/pages/bd/Valentine/index.html?type=' + valentine.config.type + '&days=' + valentine.config.days;
			app.call({
	        	action: 'shareTo',
	        	params: [
	        		{
	        			name: 'shareString',
	        			value: JSON.stringify({
	        				title: txt,
	        				content: '全国单身汪和有情人等你来挑战！',
	        				link: link,
	        				image: img,
	        				isEvent: false
	        			})
	        		},
	        		{
	        			name: 'channel',
	        			value: 'wx'
	        		}
	        	],
	        	callback: function(data) {}
	        });
    	}
    	var host = window.location.host,
    		img_path = 'http://www.365rili.com/pages/Valentine/images/',
    		content = '',
    		flag = valentine.config.flag;
    	
    	if(flag == '') {
    		img_path += 'single.jpg';
	    	content = '高调秀恩爱还是单身最骄傲';
    	} else {
    		if(flag == 'double') {
	    		img_path += 'double.jpg';
	    		content = '跟我比长情？我打败了全国' + valentine.config.beatRate + '的情侣';
	    	} else {
	    		img_path += 'single.jpg';
	    		content = '跟我比逍遥？我打败了全国' + valentine.config.beatRate + '的单身汪';
	    	}
    	}
    	
    	app.call({
        	action: 'shareTo',
        	params: [
        		{
        			name: 'shareString',
        			value: JSON.stringify({
        				title: $('.bar_txt').text(),
        				content: content,
        				link: window.location.href,
        				image: img_path,
        				isEvent: false
        			})
        		},
        		{
        			name: 'channel',
        			value: 'wx'
        		}
        	],
        	callback: function(data) {}
        });
    },
    // 绑定事件
	bindEvents: function() {
		
		$('.share_btn').on('click', function() {
			valentine.shareJump();
		});
		
	
		if(app.getUa.weixin){
			$('.share_weinxin_btn').on('click', function () {
				$('.share_layer').fadeIn('fast');
			});
		}
		else{
			$('.share_weinxin_btn').on('click', function () {
				valentine.shareJump();
			});
		}

		$('.share_layer').on('click', function () {
			$(this).fadeOut('fast');
		})

		$('.show_btn').on('click', function() {
			$('.default').addClass('none');
			$('.show').removeClass('none');
		});

		$('.dog_btn').on('click', function() {
			$('.default').addClass('none');
			$('.dog').removeClass('none');
		});

		$('.show .submit_btn').on('click', function() {
			var yItem = $('#s_year').val(),
				mItem = $('#s_month').val(),
				dItem = $('#s_day').val(),
				startDate = new Date(yItem, mItem-1, dItem),
				endDate = new Date(),
				days = 0;

			if(startDate > endDate) {
				alert('不能选择当前以后的时间');
				return;
			}

			$('.show').addClass('none');
			$('.show_results').removeClass('none');

			days = valentine.calculateDays(valentine.config.$show_results.find('.s_together_day'), startDate, endDate);
			var rate = valentine.setCalculateBeatRateForShow(days);
			valentine.config.beatRate = rate;
			valentine.config.flag = 'double';
			valentine.showResultTips(days);
			wxLogic('double', days);
			valentine.config.days = days;
			valentine.config.type = type;
		});

		$('.dog .submit_btn').on('click', function() {
			var yItem = $('#d_year').val(),
				mItem = $('#d_month').val(),
				dItem = $('#d_day').val(),
				startDate = new Date(yItem, mItem-1, dItem),
				endDate = new Date(),
				days = 0;

			if(startDate > endDate) {
				alert('不能选择当前以后的时间');
				return;
			}

			$('.dog').addClass('none');
			$('.dog_results').removeClass('none');

			days = valentine.calculateDays(valentine.config.$dog_results.find('.d_together_day'), startDate, endDate);
			var rate = valentine.setCalculateBeatRateForDog(days);
			valentine.config.beatRate = rate;
			valentine.config.flag = 'single';
			valentine.dogResultTips(days);

			wxLogic('single', days);
			valentine.config.days = days;
			valentine.config.type = type;
		});

		$('.show_results .btn').on('click', function() {
			checkJump();
			var y = (new Date()).getFullYear(),
				m = (new Date()).getMonth(),
				date = (new Date()).getDate();

			valentine.defaultSelected(y, m+1, date);
			valentine.defaultDisplayTime(y, m, date);

			$('.show_results').addClass('none');
			$('.default').removeClass('none');
		});

		$('.dog_results .btn').on('click', function() {
			checkJump();
			var y = (new Date()).getFullYear(),
				m = (new Date()).getMonth(),
				date = (new Date()).getDate();

			valentine.defaultSelected(y, m+1, date);
			valentine.defaultDisplayTime(y, m, date);

			$('.dog_results').addClass('none');
			$('.default').removeClass('none');
		});
		
		$('#s_year, #d_year').on('change', function() {
			var year = $(this).val(),
				month = 0,
				day = 0;

			if(this.id == 's_year') {
				month = $('#s_month').val();
				day = $('#s_day').val();

			} else if(this.id == 'd_year') {
				month = $('#d_month').val();
				day = $('#s_day').val();
			}

			d = valentine.config.monHead[month-1]; 

			if(month == 2 && valentine.isRN(year)) d++;

			valentine.fillSelectDays(d);

			if(this.id == 's_year') {
				valentine.config.$s_year.find('.s_y_txt').text(year);
			} else if(this.id == 'd_year') {
				valentine.config.$d_year.find('.d_y_txt').text(year);
			}

			valentine.defaultSelected(year, month, day);
		});

		$('#s_month, #d_month').on('change', function() {
			var month = $(this).val(),
				year = 0,
				day = 0;

			if(this.id == 's_month') {
				year = $('#s_year').val();
				day = $('#s_day').val();
			} else if(this.id == 'd_month') {
				year = $('#d_year').val();
				day = $('#d_day').val();
			}

			d = valentine.config.monHead[month-1];

			if(month == 2 && valentine.isRN(year)) d++;

			valentine.fillSelectDays(d);

			if(this.id == 's_month') {
				valentine.config.$s_month.find('.s_m_txt').text(month);
			} else if(this.id == 'd_month') {
				valentine.config.$d_month.find('.d_m_txt').text(month);
			}

			valentine.defaultSelected(year, month, day);
		});

		$('#s_day, #d_day').on('change', function() {
			var day = $(this).val();

			if(this.id == 's_day') {
				valentine.config.$s_day.find('.s_d_txt').text(day);
			} else if(this.id == 'd_day') {
				valentine.config.$d_day.find('.d_d_txt').text(day);
			}
		});
	}
};
function wxLogic (type, days) {
	var txt = '';
	var img = '';
	if(type == 'double'){
		txt = '我们在一起' + days + '天，击败了全国' + ((days > 1829) ? '99.99' : ((days / 1830) * 100).toFixed(2)) + '%的人';
		img = 'http://www.365rili.com/pages/Valentine/images/double.jpg';
	}
	else{
		txt = '我单身了' + days + '天，击败了全国' + ((days > 1094) ? '99.99' : ((days / 1095) * 100).toFixed(2)) + '%的人';
		img = 'http://www.365rili.com/pages/Valentine/images/single.jpg';
	}
	wxProtocol.init(function(wx, link) {
		link = 'http://www.365rili.com/pages/bd/Valentine/index.html?type=' + type + '&days=' + days;
        wx.onMenuShareAppMessage({
            title: txt,
            desc: '全国单身汪和有情人等你来挑战！',
            link: link,
            imgUrl: img
        });
        wx.onMenuShareTimeline({
            title: '【'+txt+'】全国单身汪和有情人等你来挑战！',
            link: link,
            imgUrl: img
        }); 
    });
};
function checkJump () {
	if(getURLParameter('type')){
		window.location.href = 'http://www.365rili.com/pages/bd/Valentine/index.html';
	}
}
function jumpToSourc () {
	$('.share_weinxin_btn').hide();
	$('.btn').addClass('my_play');
	$('.default').addClass('none');
	var days = getURLParameter('days');
	valentine.bindEvents()
	if(getURLParameter('type') == 'double'){
		$('.show_results').removeClass('none');
		valentine.showResultTips(days);
		valentine.setCalculateBeatRateForShow(days)
		valentine.config.$show_results.find('.s_together_day').text(days);
	}
	else{
		$('.dog_results').removeClass('none');
		valentine.dogResultTips(days);
		valentine.setCalculateBeatRateForDog(days)
		valentine.config.$dog_results.find('.d_together_day').text(days);
	}
}
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
$(document).ready(function() {
	valentine.init();
});