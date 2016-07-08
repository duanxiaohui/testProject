/*
**	main calendarListView
*/
define(function(require, exports, module) {
	var $cData = require('../../server/calendarController');
	var $util  = require('../../common/util');
	var $colorUtil = require('../../common/colorUtil');
	
	var self = {};
	module.exports = self;
	
	//当前已有日历使用过的颜色
	self.usedColors = {};
	self.container = $("#div_calendar_list");
	
	function init(){
		initEvent();
		
		render();
	}
	
	function render(){
		$cData.getCalendarListByUser(function(data){
			self.cldListData = data;
			renderList();
		});
	}
	
	function renderList(newCldId){
		var ckCldIDs = $util.cookie('selectedClds' + G.currUser.id), ids;
		try {
			ids = $.parseJSON(ckCldIDs || '[]');
		} catch (e) {
			ids = [];
		}
		if (newCldId) {
			ids.push(newCldId);
		}
		var tmpl = '<li title="{title}" class="e_clear"><a href="javascript:;" class="arrow my_calendar_nav_set none" ' + 
				'cldID="{id}" cldName="{title}" isprimary="{is_primary}"  ispublic="{is_public}" datadomain="{data_domain}">'+
				'</a><div class="checkbox ui-corner-all-16 iepng{selected}" cldID="{id}" cldName="{title}" lightcolor="{lightcolor}" '+
				'style="border-color:{color}; background-color:{bgcolor};"></div><span class="my_calendar_nav_txt">{title}</span></li>';
		self.oPermissions = {};
		var html = $util.format(tmpl, $.map(self.cldListData, function(o){
			self.oPermissions[o.id] = o.access_type;
			o.selected = ckCldIDs == null || $.inArray(parseInt(o.id, 10), ids) > -1 ? ' on' : '';
			var hsl = $colorUtil.rgbToHsl(o.color), h = hsl[0], s = hsl[1];
			o.lightcolor = $colorUtil.hslToRgb.call(null, h, s, 0.70);
			o.bgcolor = o.selected ? o.lightcolor : '#ffffff';
			return o;
			//return self.usedColors[String(o.color).toLowerCase()] = o;
		}));
		self.container.find('dl.my_calendar_nav ul').html(html);
		//self.setScroll();
		//self.recordSelectedCalendarIDs();
		//self._makeBubbleMenu();
		
		//G.cldPanel.calendarPanel('refresh');
	}
	
	function initEvent(){
		var $elem = self.container;
		var $btn = $elem.find(".my_calendar_nav a.left_create_schedule_btn");
		$elem.find(".my_calendar_nav").mouseenter(function(evt){
			$btn.stop(true, true).show('fade');
		}).mouseleave(function(){
			if (!($btn.data('bubbleMenu') && $btn.data('bubbleMenu').filter(':visible').size())) {
				$btn.stop(true, true).hide('fade');
			}
		});
		
		//点击展开或者折叠子项
		$elem.find("dl.my_calendar_nav dt,dl.group_calendar_nav dt,dl.palug_nav dt").click(function(evt){
			$('a.js_cldname', this).toggleClass('open');
			if ($(this).next().find('li').size()) {
				$(this).next().stop(true, true).slideToggle();
			}
		});
		
		/*点击加号按钮显示操作菜单
		$elem.find(".my_calendar_nav dt a.left_create_schedule_btn").rightBubbleMenu({
			stopPropagation: true,
			onClose: function(evt){
				this.hide('fade');
			},
			buttons: [{
				text: '新建日历',
				onclick: 'calendarCreator'
			}, {
				text: G.googleID ? '解除绑定：' + G.googleID : '绑定Google日历',
				onclick: function(evt){
					if (G.googleID) {
						$.confirm('确定要解除与Google帐号的绑定吗？', {
							buttons: [{
								click: function(){
									var dialog = this;
									$.ajax({
										type: 'post',
										url: '/removeGoogleBind-web.do',
										success: function(rslt){
											if (rslt.state == 'ok') {
												location.reload();
												$(dialog).dialog('close');
											} else {
											
											}
										},
										dataType: 'json'
									});
								}
							}]
						});
					} else {
						var instWin = open('http://when.365rili.com/google-account-bind-web.do', 'bindGoogleAnd365', 'width=347,height=530');
						var intervalId = setInterval(function(){
							if (instWin.closed) {
								clearInterval(intervalId);
								location.reload();
							}
						}, 100);
					}
				}
			}].concat(G.googleID ? [{
				text: '同步Google日历',
				onclick: function(){
					$.loading();
					$.ajax({
						url: '/syncGoogle-web.do',
						type: 'post',
						data: {},
						dataType: 'json',
						success: function(result){
							if (result.state == "ok") {
								location.reload();
							} else {
								$.loading.close();
								$.alert("同步出错！");
							}
						}
					});
				}
			}] : [])
		});
		
		//点击列表子项，切换选中状态。 经过时显示更多操作按钮
		$('.my_calendar_nav li, .group_calendar_nav li', $elem).live('click', function(evt){
			var $li = $(this), $icon = $li.find('div');
			$icon.toggleClass('on');
			$icon.css('background-color', $icon.hasClass('on') ? $icon.attr('lightcolor') : '#ffffff');
			self.recordSelectedCalendarIDs();
			G.cldPanel.calendarPanel('refresh');
		}).live('mouseenter', function(evt){
			$('a.arrow', this).stop(true, true).show('fade');
		}).live('mouseleave', function(evt){
			var $btn = $('a.arrow', this);
			if (!($btn.data('bubbleMenu') && $btn.data('bubbleMenu').filter(':visible').size())) {
				$btn.stop(true, true).hide('fade');
			}
		});
		*/
		$('#lnk_left_switcher').click(function(){
			$elem.toggleClass("my_calendar_leftnone");
			$elem.hasClass('my_calendar_leftnone') && $elem.find('dl.palug_nav').find('dd').show().end().find('a.js_cldname').addClass('open');
			$(this).toggleClass("hidden_bg");
		});
	}
	//exports method
	self.init = init;
});
