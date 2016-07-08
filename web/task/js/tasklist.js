(function () {
	var ids = app.query('id');
	var keeps = app.query('keep');
	var n = app.query('n');

	var _id = ids.split(',');
	var _keep = keeps.split(',');
	var id = {};
	var sum = 0;

	for (var i = _id.length - 1; i >= 0; i--) {
		sum += id[_id[i]] = +_keep[i];
	};

	document.title = n + '的任务单';

	$('.title').append($('<p>累计任务<em>'+_id.length+'</em>项 / 累计坚持<em>'+sum+'</em>天</p>'))

	$.ajax({
		url: '/task/list.do',
		data: {
			ids: ids
		},
		dataType: 'json',
		success: function (data) {
			var html = template(
			'\
			<div class="task" data-id="{$id}" data-url="{$url}">\
				<em>{$keep}<span>天</span></em>\
				<img src="{$pic}" alt="">\
				<div>\
					<p class="title">{$title}</p>\
					<p class="info">{$total_num}人参与 / 人均坚持{$average_insist_days}天</p>\
				</div>\
			</div>\
			', data.data, {
				keep: function (o, p, d, i) {
					return id[p.id];
				}
			});

			$('.tasks').html(html).on('tap', '.task', function () {
				var id = $(this).data('id');
				var url = $(this).data('url');
				app.open('coco://365rili.com/task?id='+ id +'&url=' + encodeURIComponent(url),app.getUa.ios);
			});
		}
	})

	footer.init({
		type:'task',
		cocourl:{
			ios:'coco://365rili.com/task',
			android:'coco://365rili.com/task'
		}
	});

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
	function template (s,o,defaults, index) {
	    index = index || 0;
	    if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
	    var _html = [];
	    defaults = defaults || {};
	    if(typeOf(o) === 'array'){
	        for (var i = 0, len = o.length; i < len; i++) {
	            _html.push(template(s, o[i], defaults, i));
	        };
	    }else{
	        var __o = {};
	        copyTo(o, __o);
	        apply(__o, defaults);
	        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
	            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o, index) : (o[_o] || __o[_o] || '');
	        }));
	    }
	    return _html.join('');
	}
})();