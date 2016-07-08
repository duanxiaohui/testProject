/**
 * split
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-06-09 10:23:49
 */

(function () {
	var datas = {
		'bamboo': [
			'较常见，平凡但不平庸，可药用，去火气平浮躁。',
			'寓意为节节高升，平安吉祥',
			'叶叶为多情，一叶才舒一叶生。自是相思抽不尽，却教风雨怨秋声'
		],
		'rice': [
			'香糯粘滑，是制作粽子的上等材料，将诺诺的祝福献给TA',
			'五谷之首，制作风味粽子全靠它，将最特别的祝福送给TA',
			'超黏滑，属于米中的502，可以牢牢的将你的祝福粘给TA'
		],
		'filling_txt':[
			{
				name: '钻戒',
				txt: '天哪！你的朋友给你包了一个“钻石”馅的粽子哎！',
			},
			{
				name: '金元宝',
				txt: '真是够意思，你的朋友居然包个“金元宝”馅的粽子给你！',
			},
			{
				name: '护身符',
				txt: '咪咪嘛嘛訇！你收到了一枚含有神奇咒语的护身符粽子哦！',
			},
			{
				name: '唐僧肉馅',
				txt: '你的朋友给你选的是“唐僧肉”馅，疗效你懂的！',
			},
			{
				name: '奔驰车钥匙',
				txt: '大手笔，你的朋友给你包了个“大奔”馅的粽子！',
			},
			{
				name: '随机馅',
				txt: '我懒，替我选一个',
			},
			{
				name: '蜜枣',
				txt: '你收到是蜜枣馅的粽子，今年定有喜事你会甜甜蜜蜜！',
			},
			{
				name: '貔貅',
				txt: '你的朋友送你“貔貅”馅的粽子，信我，近期你会发大财',
			},
			{
				name: '一坨便便',
				txt: '是的，你的朋友给你包了一个粽子，馅是“一坨便便”。',
			},
			{
				name: 'VISA黑卡',
				txt: '这绝对是真爱，粽子馅居然是一张无限刷的VISA黑卡！',
			}
		]
	};
	var bamboo = +app.query('s1');
	var rice = +app.query('s2');
	var filling = +app.query('s3');
	var zfy = app.query('s4');
	var name = app.query('s5');

	if(zfy){
		$('.zfy').html(zfy);
	}

	if(name){
		$('.tr').html('你的朋友：' + name);
	}

	$('.gift_bamboo_div').html('<img src="/pages/bd/dragonboat/images/mak/bamboo_'+(bamboo + 1)+'.png" alt="" width="100%"><p>'+datas.bamboo[bamboo]+'</p>');

	$('.gift_rice_div').html('<img src="/pages/bd/dragonboat/images/mak/rice_'+(rice + 1)+'.png" alt="" width="100%"><p>'+datas.rice[rice]+'</p>');

	$('.gift_filling_div').html('\
		<div class="gift_filling_imgdiv">\
			<img src="/pages/bd/dragonboat/images/split/'+(filling + 1)+'.png" alt="" height="100%">\
			<p>['+datas.filling_txt[filling].name+']'+datas.filling_txt[filling].txt+'</p>\
		</div>\
	');

	$('.replay_btn').on('tap', function () {
	    $.ajax({
	        url: '/operation/share.do?shareId=126&channel=open',
	        success: function () {
	        	window.location.href = 'http://www.365rili.com/pages/bd/dragonboat/'+window.location.pathname.split('/')[4]+'/index.html';
	        }
	    })
	})

	$('.gift_btn').on('tap', function () {
	    $.ajax({
	        url: '/operation/share.do?shareId=126&channel=open'
	    })
		$('.gift_title').addClass('fadeOutUp');
		setTimeout(function () {
			$('.gift_btn_div').addClass('fadeOutDown');
			setTimeout(function () {
				$('.gift_btn_div').remove();
			}, 500);
		}, 500);

		setTimeout(function () {
			$('.gift_box').css({
				'width': '65px',
				'height': ' 84px'
			});
			setTimeout( function () {
				$('.gift_box').addClass('round');
				$('.gift_bamboo, .gift_rice, .gift_filling').removeClass('none').each(function (i, o) {
					setTimeout(function () {
						$(o).addClass('bounceZoonIn');
					}, i * 150 + 200);
				});
				setTimeout(function () {
					$('.gift_show_div').css({
						'margin-bottom': '330px'
					});
					$('.gift_sentiment').show('slow');
					$('.replay_btn').removeClass('none');
				}, 600);
			}, 500);
		},1300);
	});
})();