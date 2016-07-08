(function () {

	var shareWord = {
		'北京': '早7：00至晚20：00，五环以内道路（不含五环）禁止行驶。（车牌尾号为字母的以0为准）',
		'成都': '早7:30至晚20:00，二环路（含二环高架和底层道路）和三环路（含）之间区域所有道路。（车牌尾号为字母的以最后一位数字为准）',
		'杭州': '早7:00至早9:00，下午16:30至下午18:30。（车牌尾号为字母的以最后一位数字为准）',
		'贵阳': '早7:00至晚20:00，一环以内（含），一环路指由北京路、宝山路、市南路、解放路、浣沙路、枣山路及其合围成的道路。（车牌尾号为字母的以0为准）',
		'长春': '早6:00至晚20:00，人民广场，人民大街的新发路至卫星广场段、吉林大路的亚泰大街至东环城路段以及自由大路的新民广场至环城路段。（车牌尾号为字母的以4为准）',
		'天津': '早7：00点至早9：00，下午16：00至19：00点，禁止外埠牌照机动车在外环线（不含）以内道路通行，7时至19时，禁止货运机动车在外环线上通行。（车牌尾号为字母的以0为准）',
		'南昌': '早7：00至晚9：00，洪城路、抚河南路等多处路段限行，点击查看详情（车牌尾号为字母的以最后一位数字为准）。'
	}
	function showContent () {
		$('.detail').on('tap', '.showContent .content, .showContent a', function () {
			$('.content').addClass('show');
			$('.showContent a').html('收起');
			$('.showContent').addClass('hideContent').removeClass('showContent');
			$('.detail').off('tap');
			$('.detail').on('tap', '.hideContent .content, .hideContent a', function () {
				$('.content').removeClass('show');
				$('.hideContent a').html('展开');
				$('.hideContent').addClass('showContent').removeClass('hideContent');
				$('.detail').off('tap');
				showContent();
			})
		});
	}

	var wxWord = '';
	var todayLimit = G[0];
	if(todayLimit.category == 0){
		if(todayLimit.number[0] == -1){
			$('.limit-main').addClass('noLimit');
			$('.num1 span').html('不');
			$('.num2 span').html('限');	
			wxWord = '';
		}
		else{
			if(todayLimit.number.length == 1){
				$('.limit-main').addClass('single');
				$('.num1 span').html(todayLimit.number[0]);
				wxWord = todayLimit.number[0];
			}
			else{
				$('.num1 span').html(todayLimit.number[0]);
				$('.num2 span').html(todayLimit.number[1]);
				wxWord = todayLimit.number.join('和');
			}			
		}
	}
	else{
		if(todayLimit.number[0] == 1){
			$('.num1 span').html('单');
			wxWord = '单号';
		}
		else{
			$('.num1 span').html('双');
			wxWord = '双号';
		}
		$('.num2 span').html('号');	
	}

	//明日限行<em class="n_1"></em><em class="n_6"></em><span>/</span>后天限行<em class="n_6"></em><em class="n_0"></em>
	$('.otherInfo').html('明天' + setOtherLimitInfo(G[1]) + '<span>/</span>' + '后天' + setOtherLimitInfo(G[2]));

	function setOtherLimitInfo (data) {
		if(data.category == 0){
			if(data.number[0] == -1){
				return '不限行';
			}
			else{
				if(data.number.length == 1){
					return '<em class="n_'+data.number[0]+'"></em>';
				}
				else{
					return '<em class="n_'+data.number[0]+'"></em><em class="n_'+data.number[1]+'"></em>'
				}
			}
		}
		else{
			if(data.number[0] == 1){
				return '单号限行'
			}
			else{
				return '双号限行'
			}
		}
	}
	var shownDate = new Date(G[0].time.replace(/-/g, '\/'));
	var todayDate = new Date();
	todayDate.setHours(0,0,0,0);
	if(+shownDate == +todayDate){
		$('.date').html('今天 ' + (function () {
			return todayDate.getMonth() + 1 + '-' + todayDate.getDate() + ' 星期' + ['天','一','二','三','四','五','六'][todayDate.getDay()];
		})());
	}
	else{
		$('.date').html((function () {
			return shownDate.getMonth() + 1 + '月' + shownDate.getDate() + '日 星期' + ['天','一','二','三','四','五','六'][shownDate.getDay()];
		})());
	}

	setBaseSize();
	window.onresize = setBaseSize;

	$('.wa').removeClass('wa');

	function setBaseSize () {
		$('.info').css('font-size', $('body').width() + 'px');
	}

	if(app.version){
		app.call({
		    action: 'setShareContent',
		    params: [
		        {
		            name: 'shareString',
		            value: JSON.stringify({
		                'title': '今日尾号限行',
		                'content': city + '今日' + (wxWord ? ('限行' + wxWord) : '不限行') + '，' + shareWord[city],
		                'link': window.location.href,
		                'image': 'http://www.365rili.com/pages/limitline/images/wx.jpg'
		            })
		        }
		    ],
		    callBack: null
		})
	}
	else{
		wxProtocol.init(function (wx, link) {
			wx.onMenuShareAppMessage({
		        title: '今日尾号限行',
		        desc:  city + '今日' + (wxWord ? ('限行' + wxWord) : '不限行') + '，' + shareWord[city],
				imgUrl: 'http://www.365rili.com/pages/limitline/images/wx.jpg'
		    });
		    wx.onMenuShareTimeline({
		        title: city + '今日' + (wxWord ? ('限行' + wxWord) : '不限行') + '，' + shareWord[city],
				imgUrl: 'http://www.365rili.com/pages/limitline/images/wx.jpg'
		    });
		});
	}

	specialDesc && $('<p class="specialDesc"></p>').html(specialDesc).prependTo('.content');

	showContent();
})();