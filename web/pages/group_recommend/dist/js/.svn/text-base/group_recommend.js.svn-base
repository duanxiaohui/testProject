/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-09-22 10:48:43
 * @version $Id$
 */

(function () {
	window.group = {
		init:function () {
			// $('.first_sign_btn').attr('href', 'javascript:group.openUrl()')
			$('body').on('click', '[data-url]', group.openUrl);
			// $('body').on('tap', '[open-url]', group.openApp);
			group.handleDom();
			$(".rule_list").on('click',function () {
				
			})
			$('.third_list dl').each(function () {
				$(this).on('click',group.openApp);
			});
			group.html_active();
		},
		handleDom:function () {
			var w = $(document.body).width();
			var liw = $('.first_privilege li').width();
			var ml = parseInt((w - parseInt(w*0.16) - liw*3)/2) - 1;
			if(liw < 100){	
				$('.first_privilege li').find('p').each(function (i) {
				$(this).css({
						"margin-left":-($(this).width() * .7) + "px"
					})
				})
				$('.first_privilege li').find('h4').each(function (i) {
					$(this).css({
						"margin-left":-($(this).width() * .7) + "px"
					})
				})
			}

			$('.first_privilege ul').css({
				"margin-left":-ml + "px"
			});
			$('.first_privilege li').css({
				"margin-left":ml + "px"
			});
			var sml = (w - 48*4)/4;
			$('.second_process ul').css({
				"margin-left":-sml + "px"
			});
			$('.second_process li').css({
				"margin-left":sml + "px"
			});
			
			$('.second_process li').each(function () {
				$(this).click(function () {
					var index = $(this).index();
					$('.second_process li').removeClass('on');
					$(this).addClass("on")
					$('.second_process_div').find("div").hide();
					$('.second_process_div').find("div").eq(index).show();
				})
			})
			$('.second_process li').eq(0).click();
		},
		openUrl: function () {
			var url = $(this).data('url');
			if(app.getUa.weixin){
				window.location.href = url
			}else{
				/*
				旧版不支持
				 */
				var mar = setTimeout(function () {
					window.location.href = url;
				}, 500);
				// app.call({
				// 	action: 'openUrlWithNewActivity',
				// 	params: [
				// 		{
				// 			name: 'url',
				// 			value: url
				// 		},
				// 		{
				// 			name: 'isInnerWebview',
				// 			value: true
				// 		}
				// 	],
				// 	callBack: function () {
				// 		clearTimeout(mar)
				// 	}
				// });
			}
		},
		openApp:function () {
			var url = $(this).attr('open-url');
			app.open(url,app.getUa.ios);
		},
		html_active: function(){
	    	var startY,endY,newClass,self;
	    	$('body').on('touchstart', '[class*="active_"]', 
    		function (e){
    			newClass = this.className;
    			//'sports e_clear active_ce0 js-classification'
    			 var generateClass = /active_([^\s]*)/g.exec(newClass)[1];
    			 // var self = $(this);
    			 // setTimeout(function(){
    			 // 	self.addClass(generateClass);
    			 // },500)
    			 self = $(this);
    			 startY = e.targetTouches[0].pageY;
    			 //滑动时延迟3秒增加class 防止滑动时出现active状态
    			 window.clareClass=setTimeout(function(){
    			 	self.addClass(generateClass);
    			 },300)
    			 window.reClass=setTimeout(function(){
    			 	self.removeClass(generateClass);
    			 },400)

    			
	    	});
	    }
	};
	group.init();

})()