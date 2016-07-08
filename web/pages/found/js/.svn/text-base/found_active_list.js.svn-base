/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-14 16:34:09
 * @version $Id$
 */
(function () {
	var cityCode = app.query('citycode'),
				listId = app.query('listid');
	var found_active_list = {
		current_page:0,
		tmpl:{
			body: '\
		<div class="found_active_lists">\
	    	<ul></ul>\
	    </div>',
	    	datas:'<li class="cld-ui-corner-all-5" data-url="http://www.365rili.com/activity/detail.do?id={$id}">\
    			<div class="img_div cld-ui-corner-all-5"><img src="{$banner}" width="100%" class="cld-ui-corner-all-5"/></div>\
    			<div class="txt_div cld-ui-corner-bl-5 cld-ui-corner-br-5">\
    				<h3>{$title}</h3>\
    				<p>{$starttime} {$address}</p>\
    			</div>\
    		</li>'
    	},
		init:function () {
			$('body').prepend(found_active_list.tmpl.body);
			found_active_list.getDate();
			found_active_list.bind();
		},
		getDate:function () {
			$.ajax({
				url:"/activity/activityList.do",
				type:"post",
				dataType:"json",
				data:{
					citycode:cityCode,
					category:listId,
					sinceId:found_active_list.current_page
				},
				success:function (data) {
					if(data.state == "ok"){
						document.title = data.title;
						if(app.getUa.ios){
							app.call({
								action:'titleChanged'
							})
						}
						if((data.datas == '' || data.datas.length == 0) && data.sinceId == 0 ){
							var html = '<li class="no_div"><div class="no_img"></div><p class="no_txt">该城市暂无活动,尽情期待</p></li>'
						}else{
							var html = template(found_active_list.tmpl.datas,data.datas,{
								starttime:function (o,p,d,i) {
									return o.split(' ')[0];
								}
							});	
						}
						found_active_list.current_page = data.sinceId;
						$('ul').append(html);
						var wh = $(window).height();
						$('no_div').height(wh);
					}
					if(data.isEnd){
						found_active_list.hidemore()
					}
					else{
						found_active_list.more()
					}
				}
			})
		},
		more:function () {
			var tmpl = '<a href="javascript:;" class="more_btn cld-ui-corner-all-5">加载更多</a>';
			$('.more_btn').remove();
			$('.found_active_lists').append(tmpl);
		},
		hidemore:function () {
			$('.more_btn').remove();
		},
		bind:function () {
			$('body').on('tap','.more_btn',found_active_list.getDate);
			$('body').on('tap','.found_active_lists li',function () {
					openUrl.call(this);
			})

		}
	}
	found_active_list.init();
})()