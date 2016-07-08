/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2014-11-18 15:13:06
 * @version 1.0
 */

(function () {
	var arg = {
		type:'publicSchedule',
		cocourl:'coco://365rili.com',
		url:''
	};
	window.footer = {
		init: function (opt) {
			footer.getCss({
				href: 'http://www.365rili.com/css/footer.css',
				datas: opt,
				callback: function (opt) {
					footer.parseArg(opt)
					footer.appendHTML();
					footer.bindEvent();
				}
			});
		},
		parseArg: function (opt) {
			for(var i in opt){
				arg[i] = opt[i];
			}
		},
		appendHTML: function () {
			var text;
			var type = arg.type;
			var tmpl = $('<div class="___footer"><div class="footer_content"><a href="javascript:;" class="del_footer"></a><a href="javascript:;" class="footer_down_btn">立即下载</a><div class="footer_txt"><h3></h3><p class="footer_txt_b"></p></div></div></div>');
			switch(type){
				case 'publicSchedule':
					text = "动动指尖 规划时间";
					break;
				case 'publicCalendar':
					text = "发现更多有趣的行程";
					break;
				case 'groupSchedule':
					text = "群体任务，让团队步调一致";
					break;
				case 'groupCalendar':
					text = "群体任务，让团队步调一致";
					break;
				case 'activitySchedule':
					text = "发现更多有趣的活动";
					break;
				case 'activityCalendar':
					text = "发现更多有趣的活动";
					break;
				case 'personalSchedule':
					text = "和小伙伴们共享日程";
					break;
				case 'calendarProject':
					text = "发现更多有趣的日历";
					break;
				case 'task':
					text = "添加任务，享受精彩生活";
					break;
				case 'default':
					text = "1亿人都在使用的日历";
					break;
			}

			if(type == 'task'){
				tmpl.find('.footer_txt h3').html('习惯就是力量');
			}
			else{
				tmpl.find('.footer_txt h3').html('下载365日历');
			}
			tmpl.find('.footer_txt_b').html(text);
			$("body").append(tmpl);
		},
		getURLParameter:function(name) {
	    	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		},

		bindEvent: function () {
			var btn = $('.footer_down_btn');
			var del_btn = $('.del_footer');
			var kupai = footer.getURLParameter("merchants");
			btn.on('click', function(){
				//增加酷派 最美天气 URL识别
				if(kupai == "kupai"){
					if(app.getUa.ios){
						location.href = 'http://itunes.apple.com/cn/app/365ri-li-xin-ban/id642101382?ls=1&mt=8';
					}
					else{
						location.href = "http://d2.365rili.com/dl/android/exchange/coco_zuimei.apk";
					}
				}
				app.open(arg.cocourl,app.getUa.ios,arg.callback)
			});
			del_btn.on('click',function () {
				$('.___footer').fadeOut(function () {
					arg = null;
					delete window.footer;
					$('link[href^="http://www.365rili.com/css/footer.css"]').remove();
					$('script[src^="http://www.365rili.com/js/lib/footer.js"]').remove();
					$(this).remove();
				});
			})
		},
		getCss: function(opt) {
	        var link, href = opt.href || '',
	            datas = opt.datas || null,
	            callback = opt.callback || function() {};
	        var link = document.createElement('link');
	        link.href = href + '?' + (new Date).getTime();
	        link.rel = 'stylesheet';
	        var checkLink = function() {
	            var _t = false;
	            try {
	                if (link.sheet && link.sheet.cssRules.length > 0)
	                    _t = true;
	                else if (link.styleSheet && link.styleSheet.cssText.length > 0)
	                    _t = true;
	                else if (link.innerHTML && link.innerHTML.length > 0)
	                    _t = true;
	            } catch (ex) {
	                if (ex.name && ex.name == 'NS_ERROR_DOM_SECURITY_ERR')
	                    _t = true;
	            }
	            if (t) {
	                clearInterval(t);
	                callback(datas);
	            }
	        }

	        $(link).appendTo('head');
	        checkLink();
	        var t = setInterval(checkLink, 200);
	    }

	};
})();

