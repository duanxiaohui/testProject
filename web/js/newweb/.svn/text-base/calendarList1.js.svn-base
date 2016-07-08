$.widget('mxx.calendarList', {
	options: {},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		//当前已有日历使用过的颜色
		self.usedColors = {};
		
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
		
		//点击加号按钮显示操作菜单
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
			$.loading();
			$li.parent().find(".on").removeClass("on");
			$li.addClass('on');
			//$icon.css('background-color', $icon.hasClass('on') ? $icon.attr('lightcolor') : '#ffffff');
			self.recordSelectedCalendar();
			//async load calendar panel
			setTimeout(function(){
				G.cldPanel.calendarPanel('refresh');				
			}, 0);
		}).live('mouseenter', function(evt){
			$('a.arrow', this).stop(true, true).show('fade');
		}).live('mouseleave', function(evt){
			var $btn = $('a.arrow', this);
			if (!($btn.data('bubbleMenu') && $btn.data('bubbleMenu').filter(':visible').size())) {
				$btn.stop(true, true).hide('fade');
			}
		});
		
		$('#lnk_left_switcher').click(function(){
			$elem.toggleClass("my_calendar_leftnone");
			$elem.hasClass('my_calendar_leftnone') && $elem.find('dl.palug_nav').find('dd').show().end().find('a.js_cldname').addClass('open');
			$(this).toggleClass("hidden_bg");
		});
		
		$elem.find(".calendar_ary_btn").live('click', function(evt){
			evt.preventDefault();
			evt.stopPropagation();
			var tmpl = '<li><label><span class="schedule_set_icon" style="background:{color}"></span>'+
						'<span class="schedule_set_title" title="{title}">{title}</span><input type="checkbox" {checked} cid="{id}"></label></li>';
			$(".schedule_set_layer ul").html($.format(tmpl, $.map(self.cldListData, function(o){
				if(o.selectedInAry){
					o.checked = "checked='checked'";
				}else{
					o.checked = "";
				}
				return o;
			})));
			$(".schedule_set_layer").show("fade");
			var $h=$(window).height()-180;
			$(".schedule_set_layer ul").css("max-height",$h);
		});
		$(".schedule_set_layer").click(function(evt){
			evt.stopPropagation();
		});
		$(".schedule_set_layer .save_ary").click(function(evt){
			var selectedInAryCount = 0;
			$(".schedule_set_layer ul li input").each(function(i,o){
				var cid = $(this).attr("cid");
				var selectedInAry = $(this).prop("checked");
				if(selectedInAry){
					selectedInAryCount++;
				}
				$.each(self.cldListData, function(i, o){
					if(o.id == cid){
						o.selectedInAry = selectedInAry;
					}
				});
			});
			$("#sp_multi_calendar").html("集合("+selectedInAryCount+")");
			self.recordSelectedCalendarIDs();
			G.cldPanel.calendarPanel('refresh');
			$(".schedule_set_layer").hide("fade");
		});
		$('body').bind('click', function(evt){
			var $menu = $(".schedule_set_layer");			
			if ($menu && $menu.is(':visible')) {
				$menu.hide('fade');
			}
		});
		$elem.find("dl.palug_nav ul li a").calendarPlugin();
	},
	_init: function(newCldId){
		var self = this, $elem = $(this.element), opt = this.options;
		
		//获取日历列表数据
		$.ajax({
			url: '/calendar/getCalendarListByUser.do',
			type: 'post',
			dataType: 'json',
			success: function(data){
				self.cldListData = data;
				self.cldListData.sort(function(a, b){
					var a_accessType = parseInt(a.access_type);
					var b_accessType = parseInt(b.access_type);
					var a_cid = parseInt(a.id);
					var b_cid = parseInt(b.id);
					//先判断是否是主日历
					if(a.is_primary == "true" && a.data_domain != "google"){
						return -1;
					}else if(b.is_primary == "true" && b.data_domain != "google"){
						return 1;
					}
					//判断是否是google日历
					if(a.data_domain == "google" && b.data_domain != "google"){
						return -1;
					}else if(b.data_domain == "google" && a.data_domain != "google"){
						return 1;
					}
					if(a_accessType != b_accessType){
						return b_accessType - a_accessType;
					}
					return a_cid - b_cid;
				});
				self._renderList(newCldId);
			}
		});
	},
	init: function(newCldId){
		this._init(newCldId);
	},
	_renderList: function(newCldId){
		var self = this, $elem = $(this.element), opt = this.options;
		var selectedCalendarId = $.cookie('selectedCalendarId' + G.currUser.id);
		var ckCldIDs = $.cookie('selectedClds' + G.currUser.id), ids;
		try {
			ids = $.parseJSON(ckCldIDs || '[]');
		} catch (e) {
			ids = [];
		}
		if (newCldId) {
			ids.push(newCldId);
		}
		var tmpl = '<li title="{title}" class="e_clear{selected}" cldID="{id}"><a href="javascript:;" class="arrow {calendar_purview_icon}  none" ' + 
				'cldID="{id}" cldName="{title}" isprimary="{is_primary}"  ispublic="{is_public}" datadomain="{data_domain}">'+
				'</a><div class="checkbox ui-corner-all-16 iepng" cldID="{id}" cldName="{title}" lightcolor="{lightcolor}" '+
				'style="border-color:{color}; background-color:{bgcolor};"></div><span class="my_calendar_nav_txt">{title}</span></li>';
		
		var classOn = selectedCalendarId == -1 ? " on" : "";
		
		self.oPermissions = {};
		var selectedInAryCount = 0;
		var html = $.format(tmpl, $.map(self.cldListData, function(o, i){
			self.oPermissions[o.id] = o.access_type;
			o.selected = (selectedCalendarId == null  && i == 0)|| selectedCalendarId == o.id ? ' on' : '';
			var hsl = rgbToHsl(o.color), h = hsl[0], s = hsl[1];
			o.lightcolor = hslToRgb.call(null, h, s, 0.70);
			o.bgcolor = o.lightcolor;
			o.selectedInAry = ckCldIDs == null || $.inArray(parseInt(o.id, 10), ids) > -1 ? true : false;
			if(o.selectedInAry){
				selectedInAryCount ++;
			}
			o.calendar_purview_icon = o.access_type=="3" ? 'my_calendar_nav_set' : 'my_calendar_nav_set1';
			if(o.data_domain == "google"){
				o.calendar_purview_icon = "";
			}
			return self.usedColors[String(o.color).toLowerCase()] = o;
		}));
		var htmlHeader = '<li class="e_clear'+classOn+'" cldID="-1"><a href="javascript:;" class="my_calendar_nav_set calendar_ary_btn"></a><span id="sp_multi_calendar" class="my_calendar_nav_txt">集合('+selectedInAryCount+')</span></li>';
		$elem.find('dl.my_calendar_nav ul').html(htmlHeader+ html);
		//如果当前没有任何一个日历选中，则默认选中我的日历，并且recordCalendarId
		if($elem.find('dl.my_calendar_nav ul li.on').size() == 0){
			$elem.find('dl.my_calendar_nav ul li').eq(1).addClass("on");
		}		
		self.setScroll();
		self.recordSelectedCalendar();
		self._makeBubbleMenu();
		G.cldPanel.calendarPanel('refresh');
	},
	setScroll: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var $calNav = $elem.find('dl.my_calendar_nav > dd'), windowH=$(window).height()-190;
		if ($calNav.data('jsp')) {
			if ($calNav.is(':visible')) {
				$calNav.data('jsp').reinitialise();
				//判断如果不需要滚动条了，销毁jScrollPane
				if($calNav.data('jsp').getContentHeight() <= windowH){
					$calNav.data('jsp').destroy();
					
				}
			} else {
				$calNav.slideToggle(function(){
					$calNav.data('jsp').reinitialise();
					if($calNav.data('jsp').getContentHeight() <= windowH){
						$calNav.data('jsp').destroy();
					}
					//.scrollTo(0, 9999)
				})
			}
		} else{
			$calNav.css("height", "");
			var height = $calNav.height()
			if(height > windowH){
				$calNav.height(windowH);
				$calNav.jScrollPane();
			}
		}
	},
	_makeBubbleMenu: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		var mEdit = {
			text: '编辑日历',
			onclick: 'calendarCreator'
		}, mDel = {
			text: '删除日历',
			onclick: function(evt){
				var cldID = $(this).attr('cldID'), name = $(this).attr('cldName');
				$.confirm('确定要删除这个日历吗？', {
					buttons: [{
						text: "删除",
						click: function(){
							$(this).dialog("close");
							self._deleteCalendar(cldID);
						}
					}, {
						text: "取消",
						click: function(){
							$(this).dialog("close");
						}
					}]
				});
			}
		}, mOnly = {
			text: '只显示此日历',
			onclick: function(evt){
				var cldID = $(this).attr('cldID');
				self.showOnly(cldID);
			}
		}, mRevoke = {
			text: '取消订阅',
			onclick: function(evt){
				var cldID = $(this).attr('cldID'), name = $(this).attr('cldName');
				$.confirm('确认取消订阅这个日历吗？', {
					buttons: [{
						text: "确定",
						click: function(){
							$(this).dialog("close");
							self._revokeCalendar(cldID);
						}
					}]
				});
			}
		}, mMessage = {
			text: '发送消息',
			onclick: 'msgCreator'
		};
		
		$elem.find("a.arrow").each(function(){
			var $lnk = $(this), isPrimary = $lnk.attr('isprimary') == 'true', id = $lnk.attr('cldID'), dm = $lnk.attr('datadomain'), permit = self.oPermissions[id];
			var isPublic = $lnk.attr('ispublic') == 'true';
			$lnk.rightBubbleMenu({
				stopPropagation: true,
				onClose: function(evt){
					this.hide('fade');
				},
				buttons: (permit == 1 || permit == 2 || dm == 'google' ? [] : isPrimary ? [mEdit] : [mEdit, mDel]).concat(dm == 'google' || isPrimary ? [] : [mRevoke]).concat(isPublic && permit == 3? [mMessage] : [])
			});
		});
	},
	showOnly: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		var $divs = $elem.find('.my_calendar_nav li div').removeClass('on').css('background-color', '#ffffff');
		var $curr = $divs.filter('[cldID="' + cldID + '"]');
		$curr.addClass('on').css('background-color', $curr.attr('lightcolor'));
		self.recordSelectedCalendar();
		G.cldPanel.calendarPanel('refresh');
	},
	selCalendarByID: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		var $div = $elem.find('.my_calendar_nav li div[cldID="' + cldID + '"]');
		if(!$div.hasClass('on')){
			$div.addClass('on').css('background-color', $div.attr('lightcolor'));
		}
	},
	_deleteCalendar: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		//删除日历
		$.ajax({
			url: '/main/calendarManager/delete.do',
			type: 'post',
			dataType: 'json',
			data: 'calendarId=' + cldID,
			success: function(data){
				if (data === true) {
					self._init();
					notificationManager.refresh();
				} else if (data.state == 'wrongpass') {
					$.alert('对不起，您的登录已经过期，请重新登录！', {
						buttons: {
							'确定': function(){
								location = '/account/login.do';
							}
						}
					});
				} else if (data == false) {
					$.alert('对不起，您没有删除该日历的权限！');
				}
			}
		});
	},
	_revokeCalendar: function(cldID){
		var self = this, $elem = $(this.element), opt = this.options;
		$.ajax({
			type: 'post',
			url: '/main/calendarManager/revoke.do',
			data: {
				calendarId: cldID
			},
			success: function(data){
				if (data === true) {
					self._init();
					notificationManager.refresh();
				} else if (data.state == 'wrongpass') {
					$.alert('对不起，您的登录已经过期，请重新登录！', {
						buttons: {
							'确定': function(){
								location = '/account/login.do';
							}
						}
					});
				} else {
				
				}
			},
			dataType: 'json'
		});
	},
	recordSelectedCalendar: function(){
		//记录当前选中的日历ID
		var self = this, $elem = $(this.element), opt = this.options;
		var $els = $elem.find('dl.my_calendar_nav ul li.on');
		var selectedId = $els.size() ? $els.attr('cldID') : "null";
		$.cookie('selectedCalendarId' + G.currUser.id, selectedId, {
			expires: 365
		});
	},
	recordSelectedCalendarIDs: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var clds = $.map(self.cldListData, function(o){
			if(o.selectedInAry){
				return parseInt(o.id);
			}
		});
		$.cookie('selectedClds' + G.currUser.id, JSON.stringify(clds || []), {
			expires: 365
		});
	},
	getSelectedCalendarIDs: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var $els = $elem.find('dl.my_calendar_nav ul li.on');
		if($els.attr("cldID") == -1){
			return $.map(self.cldListData, function(o){
				if(o.selectedInAry)
					return parseInt(o.id);
			});
		}else{
			return $els.size() ? $els.map(function(){
				return parseInt($(this).attr('cldID'));
			}).get() : null;			
		}
	},
	getAllCalendarNames: function(noReadOnly){
		var self = this, $elem = $(this.element), opt = this.options;
		var rslt = [];
		if (self.cldListData) {
			$.each(self.cldListData, function(i, o){
				if (!noReadOnly || self.oPermissions[o.id] != 1) {
					//rslt[o.title] = o.id;
					rslt.push({
						id: o.id,
						name: o.title
					});
				}
			});
		}
		return rslt;
	},
	getNameById: function(cid){
		var self = this, $elem = $(this.element), opt = this.options;
		for (var o, i = 0, l = self.cldListData.length; i < l; i++) {
			o = self.cldListData[i];
			if (o.id == cid) { return o.title; }
		}
		return null;
	},
	setColor: function($container, prefix){
		var self = this, $elem = $(this.element), opt = this.options;
		if (self.cldListData) {
			$.each(self.cldListData, function(i, o){
				var $elems = $container.find(prefix + o.id).hide();
				var hsl = rgbToHsl(o.color), h = hsl[0], s = hsl[1], l = hsl[2];
				$elems.css({
					backgroundColor: hslToRgb.call(null, h, s, 0.96),
					borderColor: o.color
				});
				$elems.find('div.spheric').css({
					backgroundColor: hslToRgb.call(null, h, s, 0.80),
					borderColor: o.color
				});
				$elems.show();
			});
		}
	},
	getUsedColors: function(){
		return this.usedColors;
	},
	getPermissionsMap: function(){
		return this.oPermissions;
	},
	getPublic:function(cid){
		var self = this, $elem = $(this.element), opt = this.options;
		for (var o, i = 0, l = self.cldListData.length; i < l; i++) {
			o = self.cldListData[i];
			if (o.id == cid) { return o.is_public; }
		}
		return null;
	}
});
