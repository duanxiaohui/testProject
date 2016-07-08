/**
 * Function
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-07 15:02:15
 */



function callAction (action, data) {
    if(!action) return false;
    $('.content').hide();
    if(JSON.stringify(data) == '{}'){
        data = null;
    }
    window.location.href = encodeURI('http://www.365rili.com/pages/forum/'+action+'.html' + (data ? '?' +$.param(data) : ''));
}

function callCoCo (action, data) {
    if(!action) return false;
    data = data || {};
    app.open('coco://365rili.com/'+action+'?'+$.param(data), app.getUa.ios, function () {});
}

function query(name, href) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
    href = href || location.href;
    if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
}

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
function template (s,o,defaults) {
    if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
    var _html = [];
    defaults = defaults || {};
    if(typeOf(o) === 'array'){
        for (var i = 0, len = o.length; i < len; i++) {
            _html.push(template(s, o[i],defaults));
        };
    }else{
        var __o = {};
        copyTo(o, __o);
        apply(__o, defaults);
        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o) : (o[_o] || __o[_o] || '');
        }));
    }
    return _html.join('');
}

//绑定关注日历
(function () {
	function focusCalendar (e) {
		var _this = $(this);
		var calendarId = _this.attr('data-id');
		var focus = _this.attr('data-status') === 'unsubscribe' ? 'subscribe' : 'unsubscribe'

		showFocusLoading();
		callCoCo(focus, {
			calendarID: calendarId
		});
	}

	function showFocusLoading () {
        var st = $('body').scrollTop();
		$('html').css('overflow','hidden');
        $('body').scrollTop(st);
		$('<div class="tag_loading"><div class="circle"></div><div class="circle1"></div></div>').appendTo('.content');
	}

	function hideFocusLoading () {
        var st = $('body').scrollTop();
        $('html').css('overflow','');
        $('body').scrollTop(st);
		$('.tag_loading').remove();
	}
	window.hideFocusLoading = hideFocusLoading;
    window.showFocusLoading = showFocusLoading;

	window.subscribeCallBack = function (calendarId) {
		$('.js-list_focus[data-id="'+calendarId+'"]')
			.attr('data-status', 'subscribe')
			.addClass('list_focus_cancel')
		;
		hideFocusLoading();
	}

	window.unsubscribeCallBack = function (calendarId) {
		$('.js-list_focus[data-id="'+calendarId+'"]')
			.attr('data-status', 'unsubscribe')
			.removeClass('list_focus_cancel')
		;
		hideFocusLoading();
	}
	$('.content').on('tap', '.js-list_focus', focusCalendar);
})();