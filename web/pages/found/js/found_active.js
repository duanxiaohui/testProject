/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-14 10:52:39
 * @version $Id$
 */
(function () {
	var found_active = {
	init:function () {
		var citycode = app.query('citycode');
		var tmpl = '<div class="active_list">\
				    	<ul>{$categorys}</ul>\
				    </div>';
		$.ajax({
			url:'/activity/categoryList.do',
			type:'post',
			dataType:'json',
			data:{
				citycode:citycode
			},
			success:function (data) {
				console.log(data.categorys);
				if(data.state == "ok"){
					var html = template(tmpl,data,{
						categorys:function (o , p , d, i) {
							console.log(o);
							return template('<li data-url="http://www.365rili.com/pages/found/found_active_lists.html?citycode='+citycode+'&listid={$id}"><img src="'+p.pic_prefix+'{$picture}" width="100%"/></li>',o
							);
						}
					});
					$('body').append(html);
					found_active.bind();
				}
			},
			error:function () {
				console.log(1);
			}
		})
	},
	bind:function () {
		$('body').on('tap','.active_list li',function  () {
			openUrl.call(this);
		})
	}
}
found_active.init();
})()
