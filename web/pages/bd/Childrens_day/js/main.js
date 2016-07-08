/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2015-05-27 10:14:44
 * @version 1.0
 */

$(function () {
	var h = $(window).height();
	var url = window.location.href;
	var channel = url.split("/");
	if(channel[6] == "plaza"){
		$(".start").height(h - 48);
	}else{
		$(".start").height(h);
	}
	$(".share_btn").on('tap' , share);
	$(".bar_share_btn").on('tap' , share);

	if(!app.getUa.weixin){
		showStart();
	}else{
		$(".wrapper").show();
	}
	if(app.getUa.weixin){
		$('.down_btn').css({
			"display":"inline-block"
		})
	}
	if(getURLParameter('isShowBar') == 1){
		$(".bar").show();
		$('html').css({
			"padding-top":"48px"
		});
	}else{
		$('html').css({
			"padding-top":"0px"
		});
	}
	$('.down_btn').on('tap', function () {
			postShare(117,'weixin');
			app.open('coco://365rili.com',app.getUa.ios,'');
		})

	function showShadow () {
		$('.share_bg').height(h).show();
		
	}
	$('.share_bg').on('tap',function(){
			$(this).hide();
	})
	function share () {
		if(!app.getUa.weixin && channel[6] == "hot"){
			$.ajax({
                url:'http://www.365rili.com/tmpmessage/shared.do',
                data:{
                    id: '42',
                    target: "Children's Day"
                },
                success:function(){
                    postShare(116,channel[6]);
                    app.call({
                        action: 'share',
                        params: [
                            {
                                name: 'shareString',
                                value: JSON.stringify({
                                    title: "雷翻了，科技大佬们的罕见童年照",
                                    content: "你见过乔布斯和盖茨童年时的样子吗？雷翻了，科技大佬们的罕见童年照",
                                    link: 'http://www.365rili.com/pages/bd/Childrens_day/' + channel[6] +'/index.html',
                                    image: 'http://www.365rili.com/pages/bd/Childrens_day/images/share_icon.jpg',
                                    isEvent: 'true'
                                })
                            }
                        ],
                        callBack: function () {

                        }
                    });
                }
            });
		}else if(!app.getUa.weixin && channel[6] == "plaza"){
			postShare(116,channel[6]);
            app.call({
                action: 'share',
                params: [
                    {
                        name: 'shareString',
                        value: JSON.stringify({
                            title: "雷翻了，科技大佬们的罕见童年照",
                            content: "你见过乔布斯和盖茨童年时的样子吗？雷翻了，科技大佬们的罕见童年照",
                            link: 'http://www.365rili.com/pages/bd/Childrens_day/' + channel[6] +'/index.html',
                            image: 'http://www.365rili.com/pages/bd/Childrens_day/images/share_icon.jpg',
                            isEvent: 'true'
                        })
                    }
                ],
                callBack: function () {

                }
            });

		}else if(app.getUa.weixin){
			showShadow();
		}
	}

	function postShare(shareId,channel) {
        $.get('/operation/share.do?shareId='+shareId+'&channel=' + channel);
    }

    if(!app.getUa.weixin && app.getUa.android){
		window.onblur= function(){
			$('audio')[0].pause();
			$('.music').removeClass('active').removeClass('stop').addClass('stop');
			window.onfocus = function () {
				$('audio')[0].play();
				$('.music').removeClass('active').removeClass('stop').addClass('active');
				window.onfocus = function(){};
			}
		};

		
	    var hidden, state, visibilityChange;
	    if (typeof document.hidden !== 'undefined') {
	      hidden = 'hidden';
	      visibilityChange = 'visibilitychange';
	      state = 'visibilityState';
	    } else if (typeof document.mozHidden !== 'undefined') {
	      hidden = 'mozHidden';
	      visibilityChange = 'mozvisibilitychange';
	      state = 'mozVisibilityState';
	    } else if (typeof document.msHidden !== 'undefined') {
	      hidden = 'msHidden';
	      visibilityChange = 'msvisibilitychange';
	      state = 'msVisibilityState';
	    } else if (typeof document.webkitHidden !== 'undefined') {
	      hidden = 'webkitHidden';
	      visibilityChange = 'webkitvisibilitychange';
	      state = 'webkitVisibilityState';
	    }
	    document.addEventListener(visibilityChange, function(e) {
	    	if(document[hidden]){
	    		$('audio')[0].pause();
	    		$('.music').removeClass('active').removeClass('stop').addClass('stop');
	    	}
	    	else{
				$('audio')[0].play();
				$('.music').removeClass('active').removeClass('stop').addClass('active');
	    	}
	    }, false);
	}
	function showStart(){
		$(".start").show();
		$('.start_btn').on('tap', function () {
			$('audio')[0].play();
			$(".start").remove();
			$(".wrapper").show();
		})
	}
    loadMp3('/pages/bd/Childrens_day/mp3/m.mp3');
	function loadMp3 (src) {
		if(!app.getUa.weixin && app.getUa.android){
			$('<audio preload><source src="'+src+'" /></audio>').appendTo('body');//.on('canplaythrough', setMp3);
		}
		else{
			$('<audio loop preload><source src="'+src+'" /></audio>').appendTo('body');//.on('canplaythrough', setMp3);
		}
		setMp3();
	}
	var isplay = false;
	function setMp3 () {
		document.addEventListener("WeixinJSBridgeReady", function () {
	        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
	        	if(isplay){
	        		return;
	        	}
	        	isplay = true;
				$('audio')[0].play();
	        });
	    }, false);	
	    try{
	    	WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
	        	if(isplay){
	        		return;
	        	}
	        	isplay = true;
				$('audio')[0].play();
	        });
	    }
	    catch(e){}

		// $('audio')[0].play();
		$('.music').on('tap', playOrPaused);
		// $('.music').addClass('go');
	}

	function playOrPaused(){
		$('.music').removeClass('active');
		setTimeout(function () {
			$('.music').addClass('active')
		}, 0)
		var audio = $('audio')[0];
		var _this = $(this);
		if(audio.paused){
			_this.removeClass('stop');
			audio.play();
			return;
		}
		_this.addClass('stop');
		audio.pause();
	}

	function getURLParameter(name) {
	    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}

})