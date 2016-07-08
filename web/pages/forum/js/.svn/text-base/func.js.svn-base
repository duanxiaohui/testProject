
function getHeaders() {
	var headers = {},
			cocoua = '',
			ua = navigator.userAgent;

	if(app.getUa.android) {
		ua = ua.split('Android-coco')[1];
		if(ua) {
			cocoua = 'Android-coco' + ua;
		} else {
			cocoua = 'Android';
		}
	} else if(app.getUa.ios) {
		ua = ua.split('iOS-coco')[1];
		if(ua) {
			cocoua = 'iOS-coco' + ua;
		} else {
			cocoua = 'iOS';
		}
	}
	headers['coco-ua'] = cocoua;

	return headers;
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
		r = window.location.search.substr(1).match(reg);
		
	if(r != null) {
		return decodeURI(r[2]);
	}

	return null;
}

function setScrollTo(pageName) {
	var url = window.location.href;
    if(url.indexOf(pageName) > -1) {
    	if(window.name != '') {
    		$('body').scrollTop(window.name);
    	}
    }
}

function showFocusLoading(ele) {
	var st = $('body').scrollTop();

	$('html').css('overflow', 'hidden');
    $('body').scrollTop(st);
	$('<div class="tag_loading"><div class="circle"></div><div class="circle1"></div></div>').appendTo(ele);
}

function hideFocusLoading() {
	var st = $('body').scrollTop();

    $('html').css('overflow', '');
    $('body').scrollTop(st);
	$('.tag_loading').remove();
}

function callCoCo(action, data) {
	if(!action) return false;
	data = data || {};
	app.open('coco://365rili.com/' + action + '?' + $.param(data), app.getUa.ios, function() {});
}

window.subscribeCallBack = function(calendarId) {
	var $focusIcon = $('.focus_icon[data-id="' + calendarId + '"]'),
		$p = $focusIcon.next('p');

	$focusIcon.data('status', 'subscribe').addClass('on');
	$p.text('已关注');

	hideFocusLoading();
};

window.unsubscribeCallBack = function(calendarId) {
	var $focusIcon = $('.focus_icon[data-id="' + calendarId + '"]'),
		$p = $focusIcon.next('p');

	$focusIcon.data('status', 'unsubscribe').removeClass('on');
	$p.text('关注');

	hideFocusLoading();
};


$(function() {
	var $w = window.screen.width;
	// $(".search_input").css("width",$w-24);
});
