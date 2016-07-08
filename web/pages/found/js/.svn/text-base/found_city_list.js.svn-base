/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-23 10:55:28
 * @version $Id$
 */

(function  () {
	var _data = {};
	var found_city_list ={
		init:function () {
			found_city_list.bind();
			found_city_list.forMat();
		},
		bind:function () {
			$('body').on('tap','.found_city_list li',function () {
				openUrl.call(this);
			})
		},
		forMat:function () {
			if(_data.loc){
				_data.loc.latitude *= 1000000;
				_data.loc.longitude *= 1000000;
				_data.loc.latitude = parseInt(_data.loc.latitude);
				_data.loc.longitude = parseInt(_data.loc.longitude);
			}
				
			if(!_data.loc || _data.loc == '' || JSON.stringify(_data.loc) == '{}'){
				return '';
			}
			var tmpl ='<div class="found_city_list">\
							<ul></ul>\
						</div>';
			$('body').append(tmpl);
			_data.picList = [
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=5&classid2=2&classname=%E4%BA%A4%E5%8F%8B%E8%81%9A%E4%BC%9A&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/jiaoyou.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=8&classid2=2&classname=%E6%88%B7%E5%A4%96&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/huwai.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=7&classid2=2&classname=%E8%BF%90%E5%8A%A8&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/yundong.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=9&classid2=2&classname=%E8%AE%B2%E5%BA%A7&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/jiangzuo.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=6&classid2=2&classname=%E9%9F%B3%E4%B9%90&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/yinyue.jpg"}
				];
			// _data.picList = [
			// 		{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=5&classid2=2&classname=%E4%BA%A4%E5%8F%8B%E8%81%9A%E4%BC%9A&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/jiaoyou.jpg"},
			// 		{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=8&classid2=2&classname=%E6%88%B7%E5%A4%96&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/huwai.jpg"},
			// 		{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=7&classid2=2&classname=%E8%BF%90%E5%8A%A8&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/yundong.jpg"},
			// 		{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=9&classid2=2&classname=%E8%AE%B2%E5%BA%A7&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/jiangzuo.jpg"},
			// 		{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=6&classid2=2&classname=%E9%9F%B3%E4%B9%90&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/yinyue.jpg"}
			// 	];

			var html = template('<li data-url="{$jumpUrl}"><img src="{$pic}" width="100%"/></li>',_data.picList);
			$('.found_city_list ul').append(html);
		}
	}
	app.call({
		action:'getLocation',
		params: [],
		callBack: function (loc) {
			loc = loc || '{}';
			loc = JSON.parse(loc);

			_data.loc = loc;
			found_city_list.init();
		}
	});
})()