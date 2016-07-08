/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-15 15:37:26
 * @version $Id$
 */

(function () {
	var _data = {};
	var found_active_details = {

		init:function () {
			switch(G.linkurl_category){
				case '3':
				window.location.href = G.linkurl;
				$('.found_active_btn').hide();
				break;
				case '0':
				found_active_details.addScheduleTxt();
				break;
				case '1':
				case '2':
				found_active_details.setBtn();
				break;
			}
			found_active_details.setTop();
			found_active_details.setInfoList();
			found_active_details.setHtml();
			found_active_details.setTips();
			found_active_details.bind();
			found_active_details.shareDate();
		},
		bind:function () {
			$('.found_active_btn').on('tap',function () {
				if(+G.linkurl_category == 1 || +G.linkurl_category == 2){
					window.location.href=G.linkurl
				}
				if(+G.linkurl_category == 0){
					found_active_details.addSchedule();
				}
			})
		},
		setTop:function () {
			$('.found_active_top').find('img').attr('src',G.banner)
		},
		setInfoList:function () {
			var starttime = new Date(+G.starttime) ;
			var endtime = new Date(+G.endtime);
			_data.duration = (endtime - starttime)/1000;
			var startTimeStr = found_active_details.parseDateAllDay(starttime);
			var endTimeStr = found_active_details.parseDateAllDay(endtime);
			var timeTxt = '';

			if(starttime.getFullYear() == endtime.getFullYear()){
				timeTxt = startTimeStr + '-' + endTimeStr.substr(5);
			}else{
				timeTxt = startTimeStr + '-'+ endTimeStr;
			}

			if(starttime.getTime() == endtime.getTime()){
				timeTxt = startTimeStr
			}
			$('.found_active_list').find('h3').text(G.title);
			$('.found_active_detail_address').text(G.address);
			$('.found_active_detail_time').html(timeTxt);
			$('.found_active_detail_fee').html(G.fee);
			$('.found_active_url').html(G.comefrom)
		},
		setHtml:function () {
			var w = $('body').width();
			var html = G.detailHtml.replace(/(<[^\s\>\/]+)[^>]*/img, function (a,b) {
		    		var o = a.match(/src[^\s]+/);
		    	return b + (o ? ' width="'+w+'" ' + o[0] : '');
		    })
		    
			$('.found_active_formatHtml').html(html);
			// $('.found_active_formatHtml img').css({
			// 	"width":"100%"
			// })
		},
		setTips:function () {
			if(G.tips.length == 0){
				$('.found_active_tips').hide();
				return false;
			}
			var tipStr = ''
			for (var i = 0; i < G.tips.length; i++) {
				tipStr += '<li>'+G.tips[i].tip + '</li>';
			};
			$('.found_active_tips ul').append(tipStr);
		},
		setBtn:function () {
			$('.found_active_btn').text(G.linkurl_category == "1" ? "购买" :"预定");
		},
		addScheduleTxt:function () {
			$('.found_active_btn').text('添加日程');
		},
		addSchedule:function () {
			var scheduleJSON ={
                schedule:{
                    "startTime":G.starttime,
                    "allDayEvent": true,
                    "title" : G.title,
                    "duration" :_data.duration,
                    "description":''

                },
                "alarms":[0]
            };
            app.call({
                action: 'addSchedule',
                params: [
                    {
                        name: 'scheduleJSON',
                        value: JSON.stringify(scheduleJSON)
                    }
                    ],
                    callBack: function (data) {
                    	//安卓缓存重新发布一遍
                        if(data.indexOf('-') > 0){
                            plug.alert('','日程添加成功','',true)
                        }else{
                            plug.alert('','服务器繁忙,请稍后重试','',true)

                        }
                    }
            })
		},
		parseDateAllDay:function (d) {
			return d.getFullYear() +'年'+ (d.getMonth() + 1) +'月'+ d.getDate()+'日';
		},
		shareDate:function () {
			var title = G.title;
			var content = $('.found_active_formatHtml p:first').text();
			var image = $('.found_active_top img:first')[0].src;

			if(!app.getUa.weixin){
		        var shareData ={
		            "title": title,
		            "content": content,
		            "link":window.location.href.replace('\?needMore=true' ,''),
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
		    	$('.found_active_btn').hide().remove();
		        footer.init({
		            type: 'publicSchedule',
		            cocourl: 'coco://365rili.com'
		        });

		        wxProtocol.init(function (wx, link) {
		            wx.onMenuShareAppMessage({
		                title: title,
		                desc: content,
		                imgUrl: image
		            });
		            wx.onMenuShareTimeline({
		                title: title,
		                imgUrl: image
		            });
		        });
		    }
		}
	}
	found_active_details.init();
})()