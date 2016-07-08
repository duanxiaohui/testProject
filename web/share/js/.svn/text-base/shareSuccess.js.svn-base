/**
 * shareSuccess
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-01-07 15:58:56
 */

(function () {

	var cid = query('cid');
	var uuid = query('uuid');
	var url = query('url');

	init();

	function init () {
		getSchedule();
		bindLogic()
	}

	function bindLogic (_cid, _uuid, _url) {
		_cid = _cid || cid;
		_uuid = _uuid || uuid;
		_url = _url || url;

		if(query('isappinstalled') != 1){
			$('.down_scheduel_btn').html('下载365日历');
		}
		else{
			$('.down_client_tips').hide();
			$('.down_scheduel_btn').html('打开365日历');
			$('.add_schedule_btn').css('padding-top', 0);
		}
		$('.down_scheduel_btn').on('tap', function () {
			app.open({
				ios:'coco://365rili.com/schedule?scheduleUuid='+_uuid+'&cid='+_cid+'&action=weixin',
				android:'coco://365rili.com/?action=weixin'
			},app.getUa.ios,null,true);
		});
		$('.suc_schedule_more_content').on('tap', '.remaining_schedule_num', function () {
			app.open({
				ios:'coco://365rili.com/schedule?scheduleUuid='+_uuid+'&cid='+_cid+'&action=weixin',
				android:'coco://365rili.com/?action=weixin'
			},app.getUa.ios,null,true);
		})
	}

	function getSchedule (_cid, _uuid, _url) {
		_cid = _cid || cid;
		_uuid = _uuid || uuid;
		_url = _url || url;

		$.ajax({
			url: 'http://www.365rili.com/schedule/getRecentFollowSchedules.do',
			data: {
				cid: _cid,
				uuid: _uuid
			},
			success: function (datas) {
				if(datas.state !== 'ok'){
					return false
				}
				parseView(datas);
			},
			error: function () {

			}
		})
	}

	function parseView (datas) {
		var schedule = datas.schedule;
		var otherSchedule = datas.more;

		//图片
		if(schedule.thumb){
			$('.single_schedule_img').html('<img src="'+schedule.thumb+'" alt="" height="130">').removeClass('none');
		}

		//标题
		$('.single_schedule_title').html('<span>日程：</span>' + schedule.title);

		//时间
		var date = new Date(schedule.start);
		$('.single_schedule_time').html('<span>时间：</span>' + formatDate(date) + ' ' + ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()] + (schedule.all ? ' 全天' : ''));

		//更多日程
		if(otherSchedule.length){
			var w = $('body').width() - 63;
			$('.suc_schedule_more').removeClass('none');
			$('.suc_schedule_more_content').html(_fn.template('\
			<a href="javascript:;"><dl class="e_clear">\
				<dt>\
					{$start}\
				</dt>\
				<dd>\
					<span class="suc_time">{$all}</span>\
					<p>{$title}</p>\
				</dd>\
			</dl></a>', otherSchedule, {
				title: function (o, p, c) {
					var p = $('<p style="width: ' + w + 'px; font-size: 14px;"></p>')
					p.appendTo('body');
					var i = o.length;
					var needPoint = false;
					var t;
					while(i >= 0){
						t = o.substr(0, i)
						p.html(needPoint ? t + '...' : t);
						if(p.height() <= 36){
							p.remove();
							return needPoint ? t + '...' : t
						}
						else{
							needPoint = true;
						}
						i--;
					}
				},
				all: function (o, p, c) {
					return p.all ? '全天' : p.td
				},
				start: function (o, p, c) {
					var date = new Date(o);
					var ym = date.getFullYear() + '.' + (date.getMonth() + 1)
					var d = date.getDate()
					return '<div class="suc_year_moth">' + ym + '</div><div class="suc_data">' + d + '</div>'
				}
			}) + '<div class="remaining_schedule_num">还有更多日程，立即使用365日历查看</div>');
		}
	}

	function formatDate(date){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	}

	function query (name, href) {
	    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
	    href = href || location.href;
	    if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	    return "";
	}

	var _fn = {
		query: function (name, href) {
		    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
		    href = href || location.href;
		    if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
		    return "";
		},

		copyTo: function  (ce, e) {
		    for (var i in ce) {
		        if (typeof i === 'undefined') continue;
		        if (typeof ce[i] == 'object') {
		            e[i] = {};
		    if (ce[i] instanceof Array) e[i] = [];
		            _fn.copyTo(ce[i], e[i]);
		            continue;
		        }
		        e[i] = ce[i];
		    }
		},

		apply: function  (object, config, defaults) {
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
		},

		typeOf: function  (o) {
		    return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
		},

		template: function (s,o,defaults) {
		    if(_fn.typeOf(s) === 'undefined' || _fn.typeOf(o) === 'undefined') return '';
		    var _html = [];
		    defaults = defaults || {};
		    if(_fn.typeOf(o) === 'array'){
		        for (var i = 0, len = o.length; i < len; i++) {
		            _html.push(_fn.template(s, o[i],defaults));
		        };
		    }else{
		        var __o = {};
		        _fn.copyTo(o, __o);
		        _fn.apply(__o, defaults);
		        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
		            return _fn.typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o) : (o[_o] || __o[_o] || '');
		        }));
		    }
		    return _html.join('');
		}
	}
})();