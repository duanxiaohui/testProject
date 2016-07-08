(function () {
	var _data = {};

	$('#today').on('tap', function () {
		date = new Date();
		getHuangli();
	});
	$('#next').on('tap', function () {
		date.setDate(date.getDate() + 1);
		getHuangli();
	});
	$('#prev').on('tap', function () {
		date.setDate(date.getDate() - 1);
		getHuangli();
	});

	if(window.name){
		date = new Date(JSON.parse(window.name).date);
	}
	else if(query('date')){
		date = new Date(query('date').replace(/-/g, '/'));
	}
	else{
		return back()
	}

	getHuangli();
	function query (name, href) {
        var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
        href = href || location.href;
        if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return ""
    }
	function getHuangli () {

		var dataUrl = '/third_cooperation/qqgroup/yjdata/' + [date.getFullYear(), date.getMonth() + 1].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').replace(/-/g, '') + '.json';

		var dateString = parseDateString(date);

		var today = new Date();
		var todayString = parseDateString(today);

		if(todayString === dateString){
			document.getElementById('today').style.display = 'none';
		}
		else{
			document.getElementById('today').style.display = 'block';
		}

		var huangli = _data[dateString];

		if(!huangli){
			$.ajax({
				url: dataUrl,
				success: function (res) {
					_data = res;
					return getHuangli();
				},
				dataType: 'json',
				error: back
			});
		}
		else{
			init(huangli);
		}
		wxProtocol.init({
			title: '今日黄历',
			imgUrl: 'http://www.365rili.com/images/144.png',
			desc: '查询吉日，查看宜忌，诸神方位，时辰吉凶',
		});

	}

	function parseDateString (date) {
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').replace(/-/g, '');
	}

	function init (huangli) {
		var tmpl = document.getElementById('js-tmpl');
		var main = document.getElementById('main') || document.createElement('div');
		main.id = 'main';
		document.body.appendChild(main);
		
		main.innerHTML = template(tmpl.innerHTML, huangli, {
			lunar: lunar(date),
			date: date.getDate(),
			gongli: function (o) {
				return o.split('月')[0] + '月'
			},
			nongli: function (o, p, d) {
				var lunar = d.lunar;
				var num = ['零','一','二','三','四','五','六','七','八','九','十'];
				return [
					date.getFullYear().toString().split('').map(function (o) {
						return num[o];
					}).join(''),
					'年 ',
					d.lunar.lMonth == '十一' ? '冬' : d.lunar.lMonth == '十二' ? '腊' : d.lunar.lMonth,
					'月',
					d.lunar.isBigMonth ? '(大)' : '(小)',
					d.lunar.lDate,
					d.lunar.term ? ' 今日' + d.lunar.term : ''
				].join('');
			},
			ganzhi: function (o, p, d) {
				return [d.lunar.gzYear + '年', d.lunar.gzMonth + '月', d.lunar.gzDate + '日'].join(' ')
			},
			yi:function (o) {
				return o.split(' ').map(function (o) {
					return '<span>' + o + '</span>';
				}).join('');
			},
			ji:function (o) {
				return o.split(' ').map(function (o) {
					return '<span>' + o + '</span>';
				}).join('');
			},
			shichen: function (o, p) {
				var _caishen = p.cai.split('');
				var _xishen = p.xi.split('');
				var _jishi = parseInt(p.jishi).toString(2).split('');
				var defLen = 12 - _jishi.length;
				for (var i = 0; i < defLen; i++) {
					_jishi.unshift(0);
				};
				var html = ['<table class="time"><tr><th width="130">时辰</th><th>财神</th><th>喜神</th><th>吉时</th></tr>'];

				var pos = '正北 东北 正东 南北 正南 西南 正西 西北'.split(' ');
				var js = '凶吉'.split('');

				var timeBegin = '23 01 03 05 07 09 11 13 15 17 19 21'.split(' ');
				var timeEnd = '00 02 04 06 08 10 12 14 16 18 20 22'.split(' ');

				for (var i = 0; i < 12; i++) {
					html.push('\
						<tr>\
							<td>子时<span>' + timeBegin[i] + ':00-' + timeEnd[i] + ':59</span></td>\
							<td>' + pos[_caishen[i] - 1] + '</td>\
							<td>' + pos[_xishen[i] - 1] + '</td>\
							<td>' + js[_jishi[i]] + '</td>\
						</tr>\
					');
				};

				return html.push('</table>') && html.join('');
			}
		});

		main.style.display = 'block';
	}

	function back() {
		alert('无法显示该日黄历');
		date = new Date();
		getHuangli();
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
})();