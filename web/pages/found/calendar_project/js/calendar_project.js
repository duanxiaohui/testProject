/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-10-22 10:22:57
 * @version $Id$
 */
(function () {
	var calendar_pro = {
		init:function () {
			$('.pro_list').click(function () {

				var ids = $(this).data('cid'),
				 uuid = $(this).data('uuid'),
				 locationUrl = $(this).data('url');
				 if(locationUrl){
				 	if(app.getUa.weixin){
				 		window.location.href=locationUrl;
				 	}else{
				 		app.open('coco://365rili.com/schedule?scheduleUuid=' + uuid + '&cid=' +ids , app.getUa.ios);
				 	}
				 	
				 }else{
				 	app.open('coco://365rili.com/schedule?scheduleUuid=' + uuid + '&cid=' +ids , app.getUa.ios);
				 }
			});
			//分享数据
			var title = $('title').text();
			var content = $('.pro_dec').text();
			var image = $($('.pro_top')[0]).find('img')[0].src;

			console.log(title);
			console.log(content);
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
		    }
		}

	}
	calendar_pro.init();
})()
