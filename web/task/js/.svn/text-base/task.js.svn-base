(function () {
	$.ajax({
		url: '/task/scoreDetail.do',
		data: {
			id: app.query('tasks')
		},
		type: 'get',
		dataType: 'json',
		success: function (data) {
			var task = data.scores[0];
			if(!task){
				return;
			}
			if(!app.version){
				$.ajax({
					url: '/task/getShareInfo.do',
					data: {
						id: app.query('tasks')
					},
					dataType: 'json',
					success: function (_data) {
						setShare(_data)
					}
				}); 
				
				footer.init({
					cocourl:'coco://365rili.com/task?id='+ app.query('tasks') +'&url=' + encodeURIComponent(data.url)
				});
			}
			setInfo(data);
			setProgress(task.total_num, task.today_check_num);
		}
	});

	function setInfo (data) {
		$('<div class="top"><img src="'+ data.pic +'" width="100%" alt="" /><div class="title"><h1>'+ data.title +'</h1><em>'+ data.des +'</em></div></div>').prependTo('.main');

		var title = '和我一起坚持这个任务吧';
		var content = data.des;
		var link = window.location.href;
		if(app.version){
	        try{
	            app.call({
	                action: 'setShareContent',
	                params: [
	                    {
	                        name: 'shareString',
	                        value: JSON.stringify({
					            "title": title,
					            "content": content,
					            "link": link,
					            "image": data.pic
					        })
	                    }
	                ],
	                callBack: null
	            })
	        }catch(e){}
		}
	}
	function setShare (data) {
		app.getUa.weixin && wxProtocol.init(function (wx, link) {

            wx.onMenuShareAppMessage({
                title: title,
                desc: content,
                imgUrl: data.image
            });
            wx.onMenuShareTimeline({
                title: content,
                imgUrl: data.image
            });
        });
	}

	function setProgress (total, check) {
		$('\
		<div class="info">\
			<p class="overNum"><img src="http://www.365rili.com/task/images/taskIcon.png" alt="">今天<span class="check_num">'+ check +'</span>人标记完成</p>\
			<div class="total">\
				<div class="progress_out"><div class="progress"></div></div>\
			</div>\
			<div class="info-label">\
				<span>任务统计</span>\
				<span class="total_num_info"><span class="total_num">'+ total +'</span>人添加</span>\
			</div>\
		</div>').insertAfter('.contain');
		$('.progress').width($('.total').width());
		setTimeout(function () {
			$('.progress_out').width((check / total * 100) + '%');
			var progressWidth = $('.total').width();
			var overNum = $('.overNum');
			var overNumWidth = overNum.width();
			var overNumPosstion = (check / total * progressWidth);
			if(progressWidth - overNumPosstion > overNumWidth){
				$('.overNum').css('left', overNumPosstion + 17 + 'px');
			}
			else{
				$('.overNum').css({
					'right': progressWidth - overNumPosstion + 10 + 'px',
					left: 'auto'
				}).addClass('rightPos');
			}
		},200)
	}
})();