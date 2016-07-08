/**
 * custom
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-05-18 15:47:07
 */
//http://www.365rili.com/pages/bd/520yj/weixin/custom.html?yj=y&words=sdfa&name=b%20ds&img=http%3A%2F%2Fcocoimg.365rili.com%2Fcampaign%2F520%2F6ea643ca-7f90-4866-be7d-48d39700412e.jpg
(function () {
	var yj = app.query('yj');
	var words = app.query('words');
	var name = app.query('name');
	var type = app.query('type');
	var img = app.query('img');
	var c = app.query('c');

	if(yj == ''){
		yj = '静静的爱你';
		words = '今日本不是什么节日，我只是想借这个美丽的日期，说些什么。如果你也想做这样一件事，点击“我要定制”就好了';
		name = '365日历';
		type = 'y';
	}

	if(c == 'user'){
		if(app.getUa.weixin){
			$('.custom_btn').hide();
		}
		$('.custom_btn').addClass('share_control').html('我要分享');
	}

	$('.bar_txt').html(yj);
	document.title = yj

	$('.custom_yj').html('<span class="yj_icon">'+(type == 'y' ? '宜' : '忌')+'</span>' + yj);

	$('.custom_txt').html(words);
	name && $('.custom_signature').html('------' + name);

	if(img){
		$('<img src="'+img+'" alt="" class="custom_img">').insertBefore('.lunar_data');
	}
	else{

		$('<img src="/pages/bd/520yj/images/normal.png" alt="" class="custom_img">').insertBefore('.lunar_data');
	}

	$('.custom_btn').on('click', function () {
		if($(this).hasClass('share_control')) return;
		$.ajax({
    		url:'/operation/share.do',
    		data: {
    			shareId: 101,
    			channel: 'weixin'
    		},
    		success: function () {
    			window.location.href = 'http://www.365rili.com/pages/bd/520yj/'+window.location.pathname.split('/')[4]+'/index.html';
    		}
    	});
	});

	function getChannel () {
		return channel = window.location.pathname.split('/')[4];
	}

	var url = 'http://www.365rili.com/pages/bd/520yj/weixin/custom.html?type=' + type + '&yj=' + yj;

	if(words != ''){
		url += '&words=' + words;
	}
	if(name != ''){
		url += '&name=' + name;
	}
	if(img){
		url += '&img=' + img;
	}

	if(app.getUa.weixin){
		wxProtocol.init({
			imgUrl: 'http://www.365rili.com/pages/bd/520yj/images/share' + (type == 'y' ? 'y' : 'j') + '.png',
			title: yj,
			desc: '',
			link: url,
			success: function () {
				$.ajax({
					url: '/operation/share.do?shareId=100&channel=weixin'
				});
			}
		});
	}

	if(getChannel() == 'plaza'){
		$('.bar').show();
		$('body').addClass('plaza');

		$('.bar').show();
		$('body').addClass('plaza');
		$('.share_btn, .share_control').on('click', function () {
			$.ajax({
				url: '/operation/share.do?shareId=100&channel=plaza'
			});
	        app.call({
	            action: 'share',
	            params: [
	                {
	                    name: 'shareString',
	        			value: JSON.stringify({
	        				title: yj,
	        				content: '',
	        				link: url,
	        				image: 'http://www.365rili.com/pages/bd/520yj/images/share' + (type == 'y' ? 'y' : 'j') + '.png',
	        				isEvent: 'true'
	        			})
	                }
	            ],
	            callBack: function (headers) {}
	        });
		})
	}
	else if(getChannel() == 'hotevent'){
		$('.share_control').on('click', function () {
			$.ajax({
                url:'http://www.365rili.com/tmpmessage/shared.do',
                data:{
                    id: '75',
                    target: '520yj'
                },
                success: function (datas) {
                    if(datas.state != 'ok'){
                        return false;
                    }
                    $.ajax({
						url: '/operation/share.do?shareId=100&channel=hot'
					});
                    app.call({
                        action: 'share',
                        params: [
                            {
                                name: 'shareString',
			        			value: JSON.stringify({
			        				title: yj,
			        				content: '',
			        				link: url,
	        						image: 'http://www.365rili.com/pages/bd/520yj/images/share' + (type == 'y' ? 'y' : 'j') + '.png',
			        				isEvent: 'true'
			        			})
                            }
                        ],
                        callBack: function (headers) {}
                    });
                },
                error: function () {

                }
            });
		});
	}

	
})();