/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-16 16:49:06
 * @version $Id$
 */
(function () {
	var found_topic = {
		init:function () {
			$('.found_topic_list li').click(function () {
				var ids = $(this).data('cid'),
				 uuid = $(this).data('uuid'),
				 locationUrl = $(this).data('url');
				 if(locationUrl){
				 	if(app.getUa.weixin){
				 		window.location.href=locationUrl;
				 	}else{
				 		openUrl.call(this);
				 	}
				 }else{
				 	app.open('coco://365rili.com/schedule?scheduleUuid=' + uuid + '&cid=' +ids , app.getUa.ios);
				 }
			});
			//分享数据
			var title = $('title').text();
			var content = $('.found_topic_txt').find('p').text();
			var image = $($('.found_topic_top')[0]).find('img')[0].src;

			if(!app.getUa.weixin){
		        var shareData ={
		            "title": title,
		            "content": content,
		            "link":window.location.href,
		            "image": image
		        }
		        try{
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
		        }catch(e){}
		    }else{
		    	footer.init({
		            type: 'publicSchedule',
		            cocourl: 'coco://365rili.com'
		        });
		    }
		}

	}
	found_topic.init();
})()


			 
		