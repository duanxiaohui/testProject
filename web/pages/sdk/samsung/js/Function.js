/**
 * Function
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-12-30 18:19:33
 */

(function () {
	window._fn = {
		query: function (name, href) {
		    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
		    href = href || location.href;
		    if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
		    return "";
		},

		copyTo: function  (ce, e) {
		    for (var i in ce) {
		        if (typeof i === 'undefined') continue;
		        if (typeof ce[i] == 'object') {
		            e[i] = {};
		            if (ce[i] instanceof Array) e[i] = [];
		            _fn.copyTo(ce[i], e[i]);
		            continue;
		        }
		        e[i] = ce[i];
		    }
		},

		apply: function  (object, config, defaults) {
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
		},

		typeOf: function  (o) {
		    return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
		},

		template: function (s,o,defaults) {
		    if(_fn.typeOf(s) === 'undefined' || _fn.typeOf(o) === 'undefined') return '';
		    var _html = [];
		    defaults = defaults || {};
		    if(_fn.typeOf(o) === 'array'){
		        for (var i = 0, len = o.length; i < len; i++) {
		            _html.push(_fn.template(s, o[i],defaults));
		        };
		    }else{
		        var __o = {};
		        _fn.copyTo(o, __o);
		        _fn.apply(__o, defaults);
		        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
		            return _fn.typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o) : (o[_o] || __o[_o] || '');
		        }));
		    }
		    return _html.join('');
		},
		callAction: function (action, data) {
		    if(!action) return false;
		    if(JSON.stringify(data) == '{}'){
		        data = null;
		    }
		    window.location.href = encodeURI('http://hz.365rili.com/pages/sdk/samsung/'+action+'.html' + (data ? '?' +$.param(data) : ''));
		},
		jumpCalendar: function (event) {
			var target = $(event.target);
			if(target.hasClass('js-focus')){
				return false;
			}
			var id = $(this).data('id');
			_fn.callAction('schedule_list', {
				calendarId: id
			});

			return false;
		},
		focusCalendar: function (event) {
			if(!_data.key){
				return AliansBridge.invokelogin();
			}
			var _this = $(this);
			var id = _this.data('id');
			var title = _this.data('title');
			var bg = _this.data('logo');
			var focusStatus = _this.data('focus');
			if(focusStatus){
				_headers = JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/third/unsubscribe.do?cid=' + id));
				_headers['365-coop-key'] = _data.key;
				_headers['365-coop-type'] = _data.type;
				$.ajax({
					url:'http://hz.365rili.com/third/unsubscribe.do',
					data:{
						cid: id
					},
					dataType:'json',
					headers: _headers,
					success: function (datas) {
						if(datas.state == 'ok'){
							//如果是订阅模块删除整个dl
							if(_this.parents(".subscribe").length != 0){
								_this.parents("div.div_list").remove();
								var listH = $(".div_list").length;
								if(listH == 0){
									$(".recommended_calendar_list").html("<div class='no_subscribe'>你还没有订阅日历，请先去订阅</div>");
									$(".footer_copy").hide();
								}
							}
							_this.removeClass('on');
							_this.html('<div></div><b>订阅</b>');
							_this.attr('data-focus', false)
							AliansBridge.unsubscribe(JSON.stringify(datas));
						}
					},
					error: function () {
						
					}
				})
			}
			else{
				_headers =JSON.parse(AliansBridge.getEncryptHeaders('http://hz.365rili.com/third/subscribePublicCalendar.do?cid=' + id));
				_headers['365-coop-key'] = _data.key;
				_headers['365-coop-type'] = _data.type;
				$.ajax({
					url:'http://hz.365rili.com/third/subscribePublicCalendar.do',
					data:{
						cid: id
					},
					headers: _headers,
					success: function (datas) {
						if(datas.state == 'ok'){
							_this.addClass('on');
							_this.html('<div></div><b>退订</b>');
							_this.attr('data-focus', true)
							AliansBridge.subscribe(JSON.stringify(datas));
						}
					},
					error: function () {
						
					}
				})
			}

			return false;
		},
		formatDate: function(date, isTime) {
			if(isTime){
				return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
			}
	        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	    },
	    getFocus: function () {
	    	var _focus = AliansBridge.getCalendars().split(',');
	    	_data.focus = {};
	    	for (var i = 0; i < _focus.length; i++) {
	    		_data.focus[_focus[i]] = 1;
	    	};
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
    			
	    	});
	    	$('body').on('touchend',function (e){
    			try {
    				//判断滑动的距离 如果前后都不超过5 就在对象本身 增加Class
    				var diff = e.changedTouches[0].pageY - startY;
	    			var generateClass = /active_([^\s]*)/g.exec(newClass)[1];
		    		if(diff < 5 && diff > -5){
		    			self.addClass(generateClass);
		    		}else{
	    				self.removeClass(generateClass);
		    		}
    			} catch(e) {

				}
	    	}); 
	    	$('body').on('longTap',function(){
	    		clearTimeout(window.tm);
	    		window.tm = setTimeout(stouchend, 10)
	    	});
	    	$('body').on('touchmove',function (){
	    		clearTimeout(window.clareClass);
	    		clearTimeout(window.tm);
	    		window.tm = setTimeout(stouchend, 10)
	    	});

	    	window.stouchend =function(){
	    		var t = $('[class*="active_"]');
	    		t.forEach(function(o){
	    			var tClass = o.className;
	    			var generateClass = /active_([^\s]*)/g.exec(tClass)[1];
	    			$(o).removeClass(generateClass);
	    		})
	    	}
	    }
	};

	$('body').on('touchstart', '.js-calendar',function(e){
			if(e.srcElement.className == 'js-focus'){
				return ;
			}
	});
	// $('.body').on('touchend', '.js-calendar',function(){
	// 		$(this).removeClass("on")
	// });
	$('.recommended_calendar_list').on('tap', '.js-focus', _fn.focusCalendar);
	$('.recommended_calendar_list').on('keyup', '.js-focus', function(event){
		if(event.keyCode == "13"){
			_fn.focusCalendar.call(event.target, event);
		}

	});



	$('.recommended_calendar_list').on('tap', '.js-calendar', _fn.jumpCalendar);

	/*
		
    <div class="sdk_loading">
        <div class="blue"></div>
        <div class="red"></div>
        <div class="black"></div>
        <div class="green"></div>
    </div>

	 */
	_fn.html_active();

})();