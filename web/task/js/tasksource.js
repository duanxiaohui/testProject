(function () {

	var tasks = app.query('tasks'),
		date = app.query('date'),
		nick = app.query('nick'),
		keep = app.query('keep'),
		average = app.query('average'),
		source = app.query('source').split(','),
		title = app.query('title'),
		content = app.query('content'),
		link = app.query('link'),
		image = app.query('image');

	$.ajax({
		url: '/task/scoreDetail.do',
		data: {
			id: tasks
		},
		type: 'get',
		dataType: 'json',
		success: function (data) {
			var task = data.scores[0];
			if(!task){
				return;
			}

			setInfo(data);
			setProgress(task.total_num, task.today_check_num);
		}
	});

	function setInfo (data) {
		$('<div class="top"><img src="'+ data.pic +'" width="100%" alt="" /><div class="title"><h1>'+ data.title +'</h1><em>'+ data.des +'</em></div></div>').prependTo('.main');

		var link = window.location.href;

		$('<p>' + (nick ? nick : 'Ta') + ' 坚持了'+ keep +'天，人均坚持'+ average +'天<br>两周内成绩记录</p>').prependTo('.keep');

		var beginDate = new Date(date.replace(/-/g, '/'));
		// beginDate.setDate(beginDate.getDate() - beginDate.getDay() - 7 + 1);

		var _s = {};
		for (var i = 0; i < source.length; i++) {
			_s[source[i]] = 1;
		};

		var html = ['<table><tr>'];
		for (var i = 0; i < 14; i++, beginDate.setDate(beginDate.getDate() + 1)) {
			if(i == 7){
				html[html.length] = '</tr><tr>';
			}

			html[html.length] = '<td'+ (_s[i] ? ' class="on"' : '') +'><i></i><em><span>'+ ('-' + (beginDate.getMonth() + 1) + '-' + beginDate.getDate()).replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1) +'</span></em></td>';
		};

		html[html.length] = '</tr></table>';

		$(html.join('')).appendTo('.keep');

		$.ajax({
			url: '/task/getShareInfo.do',
			data: {
				id: tasks
			},
			dataType: 'json',
			success: function (_data) {
				if(!app.version){
					footer.init({
						cocourl:{
							ios:'coco://365rili.com/task?id='+ app.query('tasks') +'&url=' + encodeURIComponent(data.url),
							android:'coco://365rili.com/task?id='+ app.query('tasks') +'&url=' + encodeURIComponent(data.url)
						}
					});

					app.getUa.weixin && wxProtocol.init(function (wx, link) {
			            wx.onMenuShareAppMessage({
			                title: _data.title,
			                desc: _data.content,
			                imgUrl: _data.image
			            });
			            wx.onMenuShareTimeline({
			                title: _data.title,
			                imgUrl: _data.image
			            });
			        });
				}
			}
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
			$('.progress_out').width((check / total * 10000) + '%');
			var progressWidth = $('.total').width();
			var overNum = $('.overNum');
			var overNumWidth = overNum.width();
			var overNumPosstion = (check / total * progressWidth);
			if(progressWidth - overNumPosstion > overNumWidth){
				$('.overNum').css('left', overNumPosstion + 17 + 'px');
			}
			else{
				$('.overNum').css('right', progressWidth - overNumPosstion + 10 + 'px').addClass('rightPos');
			}
		},200)
	}
})();