/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-16 11:09:29
 * @version $Id$
 */
(function () {
	var current_page = 0;
	var found_active = {
	init:function () {
		var tmpl = '<div class="topic_list">\
				    	<ul></ul>\
				    </div>';
		$('body').prepend(tmpl);
		found_active.getDate();
		found_active.bind();
	},
	getDate:function () {
		$.ajax({
			url:'/discover/getRecommandEvent.do',
			type:'post',
			dataType:'json',
			data:{
				sinceId:current_page,
				n:+new Date()
			},
			success:function (data) {
				console.log(data.recommand);
				if(data.state == "ok"){
					var html = template('{$recommand}',data,{
						recommand:function (o , p , d, i) {
							return template('<li data-url="{$url}" action="{$action}"><img src="'+p.pic_path+'{$photo}" width="100%"/></li>',o
							);
						}
					});
					current_page = data.sinceId;
					$('ul').append(html);
				}
				if(data.isEnd){
					found_active.hidemore()
				}
				else{
					found_active.more()
				}
			}
		})	
	},
	more:function () {
		var tmpl = '<div class="topic_btn"><a href="javascript:;" class="more_btn cld-ui-corner-all-5">加载更多</a></div>';
		$('.more_btn').remove();
		$('.topic_list').append(tmpl);
	},
	hidemore:function () {
		$('.more_btn').remove();
	},
	bind:function () {
		$('body').on('tap','.more_btn',found_active.getDate);
		$('body').on('tap','.topic_list li',function  () {
			openUrl.call(this);
		})
	}
}
found_active.init();
})()
