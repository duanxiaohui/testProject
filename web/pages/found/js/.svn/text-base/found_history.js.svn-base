/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-21 17:08:48
 * @version $Id$
 */

(function () {
	// if(G.today.indexOf('-') > 0){
	// 	_date = G.today
	// }else{
	// 	_date = app.query('date')
	// }
	_date = G.today.indexOf('-') > 0 ? G.today : app.query('date');
	console.log(_date);
	var today_history ={
		tmpl:{
			body: '<div class="found_history">\
				<div class="found_history_top">\
					<div class="found_history_img">\
						<img src="" alt="" width="100%"/>\
						<div class="found_history_date">\
							<div class="found_history_month"></div><span>月</span>\
							<div class="found_history_day"></div><span>日</span>\
						</div>\
					</div>\
					<h2></h2>\
					<div class="found_history_txt"></div>\
				</div>\
				<div class="found_history_list">\
					<ul></ul>\
				</div>\
		    	<div class="found_history_footer"></div>\
		    	<div class="found_history_edit"></div>\
		    </div>',
	    	datas:'<li>\
				<h3>{$title}</h3>\
				{$content}\
			</li>'
		},
		init:function () {
			today_history.ajaxDate();
			today_history.shareFun();
		},
		ajaxDate:function () {
			$('body').prepend(today_history.tmpl.body);
			$('.found_history_img').find('img').attr('src',G.prefix+G.picture);
			$('.found_history_month').text(_date.split('-')[1]);
			$('.found_history_day').text(_date.split('-')[2]);
			$('.found_history_top h2').html(G.title);
			$('.found_history_txt').html(G.content);
			$('.found_history_edit').html('编辑/'+G.author);
			var html = template(today_history.tmpl.datas,JSON.parse(G.datalist));
			$('.found_history_list ul').append(html);
		},
		shareFun:function () {
			var shareData ={
	            "title":$('.found_history_top h2').text(),
	            "content":$('.found_history_txt').text(),
	            "link":window.location.href,
	            "image":G.prefix+G.picture
	        };
	        if(app.version){
	        	 app.call({
		            action: 'setShareContent',
		            params: [
		                {
		                    name: 'shareString',
		                    value: JSON.stringify(shareData)
		                }
		                ],
		            callBack: null
		        })
	        }
	        if(app.getUa.weixin){
	        	$('body').css({
		    		"paddingBttom":35 + 'px'
		    	});
	        	footer.init({
		            type: 'publicSchedule',
		            cocourl: 'coco://365rili.com'
		        });

		        wxProtocol.init(function (wx, link) {
		            wx.onMenuShareAppMessage({
		                title: shareData.title,
		                desc: shareData.content,
		                imgUrl: shareData.image
		            });
		            wx.onMenuShareTimeline({
		                title: shareData.title,
		                imgUrl: shareData.image
		            });
		        });
	        }
		}

	}
	today_history.init()
})()