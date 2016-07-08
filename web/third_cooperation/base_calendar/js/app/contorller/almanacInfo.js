define(['zepto','util','lunar','amplify'],function($,util,_lunar,amplify) {

	// 格式化益忌字符串
	function formatYijiString(ar){
		ar = ar.sort(function(a, b){
			return a.length - b.length;
		});
		var arRslt = [], t;
		$.each(ar, function(i, s){
			if (s.length > 3) {
				arRslt.push(s);
			} else {
				if (!arRslt.length || arRslt[arRslt.length - 1].length > 3) {
					arRslt.push(s);
				} else {
					arRslt[arRslt.length - 1] += ' ' + s
				}
			}
			if (arRslt.length > 4) {
				return false;
			}
		});
		return arRslt.slice(0, 4).join(' ');
	}

	return {
		init: function () {
			getAlmanacInfo();
		},
		getAlmanacInfo: function (date) {
			date = date || new Date();
			// 获得农历信息
			var l = _lunar.lunar(date),
				y = date.getFullYear(),m = date.getMonth()+1,d = date.getDate(),
				tdText = [],amText = [],yiText = [],jiText = [];

			m = m<10?"0"+m:m;
			d = d<10?"0"+d:d;
			tdText.push(y,"年",m,"月",d,"日 星期",l.cnDay," 农历 ",l.lMonth,"月",l.lDate);
			amText.push(l.gzYear,"年 ","【",l.animal,"年】 ",l.gzMonth,"月 ",l.gzDate,"日");

			//获得宜忌信息
			this.getYijiData(y,m,d);

			return {
				tdText:tdText.join(""),
				amText:amText.join("")
			}
		},
		getYijiData: function (y,m,d) {
			var url = 'http://baidu365.duapp.com/wannianlibaidu/js/huangli/hl' + y + '.js';
			util.getScript(url, function () {
				var data = HuangLi['y' + y]['d'+m+d],
					yi = data.y.replace(/^\.|\.$/g, '').split('.'),
					ji = data.j.replace(/^\.|\.$/g, '').split('.');

				var yiString = formatYijiString(yi),
					jiString = formatYijiString(ji);

				amplify.publish("get:yiji",{
					yi:yiString,
					ji:jiString
				});
			})
		}
	};
});