/*
**	monthView
*/
define(function(require, exports, module) {
	var Calendar = require("../../model/calendarObject");
	var dateInfo = require("../../model/dateInfo");
	var $util	 = require("../../common/util");
	var $scheduleCreateView = require("../common/scheduleCreateView");
	var $scheduleData = require("../../model/scheduleData");
	
	module.exports = MonthView;
	
	//local variable
	var containerHtml = "<div class='month_box'>"+
							"<div class='month_box_button e_clear'>"+
								"<div class='year_month_div'><span class='sp_year'>2013</span>年<span class='sp_month'>12</span>月</div>" +
								"<div class='month_next_prev'><a href='javascript:void(0)' class='lnk_prev'></a><a href='javascript:void(0)' class='lnk_next'></a></div>" + 
								"<a href='javascript:void(0)' class='lnk_today'>回今天</a>" +
								"<a href='javascript:void(0)' class='lnk_refresh'>刷新</a>" +
							"</div>"+
						"<table class='month_table'></table></div>";
	var headHtml = '<thead><tr><th class="weekday">周一</th><th class="weekday">周二</th><th class="weekday">周三</th><th class="weekday">周四</th><th class="weekday">周五</th>'+
							'<th class="weekend">周六</th><th class="weekend">周日</th></tr></thead>';
	var headHtmlSundayFirst;
	var templateTd = 	'{rowStart}<td class="{monthClass} day_box_td" date="{date}">'+
						'<dl class="day_box"><dt class="e_clear">'+
						'<span style="color:#{color}" title="{lunar}" class="lunar-text">{lunar}</span>'+
						'<span class="solar-text">{solar}</span>{todaytext}{vocationtext}{worktext}</dt>'+
						'<dd class="task_more"></dd></dl></td>{rowEnd}';
	
	var templateSchedule = '<dd stime="{start_time}" rtype="{repeat_type}" cid="{cid}" sid="{id}" access_type="{access_type}" allday_event="{allday_event}"'+
							' pics="{pic_str}" class="task ui-corner-all jsc-{cid}" cont="{text}" location="{location}" url="{url}"><div class="spheric ui-corner-all-16">'+
							'</div><p class="task_text" title="{time}&nbsp;{text}">{time}&nbsp;{encodeText}</p></dd>';	
	var tmplMore = '<div class="schedule_list_layer ui-shadow none"><dl><dt><a href="javascript:;" class="close_btn"></a><span></span></dt></dl><dl style="max-height:400px;_height:400px;overflow:auto;"></dl></div>';

	function MonthView(container, loadSchedule){
		var self = this;
		self.container = container;
		self.loadSchedule = loadSchedule;
		self.container.html(containerHtml);
		self.monthTable  = container.find(".month_table");
		self.spYear      = container.find(".sp_year");
		self.spMonth     = container.find(".sp_month");
		self.lnkToday    = container.find(".lnk_today");
		self.prevBtn     = container.find(".lnk_prev");
		self.nextBtn     = container.find(".lnk_next");
		self.currentDate = new Date();
		//event
		self.initEvent();
		//init schedule create view
		$scheduleCreateView.init(function(data, sid){
			$scheduleData.onCreated(data, sid, function(data){
				self.renderSchedule(data);
			});
		}, {
			openID: G.openID,
			openKey: G.openKey,
			groupOpenID: G.groupOpenID,
			pf: G.pf,
			appID: G.appID
		});
	}
	
	MonthView.prototype.initEvent = function(){
		var self = this;
		//year mousewheel
		self.spYear.mousewheel(function(evt, delta){
			var year = self.spYear.html() - 0, month = self.spMonth.html() - 0;
			self.currentDate = new Date(year + delta, month - 1, 1);
			self.render();
		});
		//month mousewheel
		self.spMonth.mousewheel(function(evt, delta){
			self[delta < 0 ? 'prevBtn' : 'nextBtn'].click();
		});
		//上一个月
		self.prevBtn.click(function(){
			self.currentDate.setDate(0);
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				self.currentDate.setDate(today.getDate());
			}else{
				self.currentDate.setDate(1);				
			}
			self.render();
		});
		//下一个月
		self.nextBtn.click(function(){
			self.currentDate.setDate(32);
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				self.currentDate.setDate(today.getDate());
			}else{
				self.currentDate.setDate(1);				
			}
			self.render();
		});
		//回今天
		self.lnkToday.click(function(){
			var today = new Date();
			self.currentDate = today;
			self.render();
		});
		self.container.find(".lnk_refresh").click(function(){
			location.reload();
		});
	}
	
	MonthView.prototype.render = function(){
		var self = this;
		var cld = new Calendar(this.currentDate);
		var startDate = cld.getCalendarFirstDate();
		if($util.isToday(self.currentDate)){
			self.lnkToday.hide();
		}else{
			self.lnkToday.show();
		}
		self.spYear.html(this.currentDate.getFullYear());
		var month = this.currentDate.getMonth() + 1;
		month = ("0" + month).slice(-2);
		self.spMonth.html(month);
		
		var dateInfoAry = dateInfo.getMonthViewDateInfo(startDate, this.currentDate.getMonth());
		var rowsHtml = $util.format(templateTd, dateInfoAry);
		self.monthTable.html([headHtml, '<tbody>', rowsHtml, '</tbody>'].join(''));
		
		var dateStr = $util.formatDate(this.currentDate);
		self.monthTable.find('td[date="' + dateStr + '"]').addClass("on");
		//日历格子点击事件
		self.monthTable.find(".day_box_td").click(function(){
			var $elem = $(this);
			var dateStr = $elem.attr("date");
			var d = new Date(dateStr);
			self.closeTip();
			self.createSchedule(d);
			
		});
		var fromDate = cld.getCalendarFirstDate();
		var toDate = new Date(startDate);
		self.fromDate = fromDate;
		self.toDate   = toDate;
		//获取schedule数据
		self.loadSchedule(fromDate, toDate, function(data){
			self.renderSchedule(data);
		});
		self.selectable();
		self.moreTask();
	}
	
	MonthView.prototype.renderSchedule = function(data){
		var self = this;
		var $tasks = $('#notexist'), $dls = $('#notexist');
		self.monthTable.find("dl dd").hide().filter('.task').remove();
		$.each(data, function(d, ar){
			var $td = self.monthTable.find('td[date="' + d + '"]'), $dl = $td.find('dl'), cellIndex = $td.prop('cellIndex'), $dds = $($.map(ar, function(o, i){
				return $util.format(templateSchedule, o);
			}).sort().join('')).attr('cellIndex', cellIndex);
			$dl.find('dd.task_more').before($dds);
			$tasks = $tasks.add($dds);
			$dls = $dls.add($dl);
		});
		self.tip($tasks);
		self.fixSize($dls);
	}
	
	MonthView.prototype.fixSize = function($dls){
		var $tasks = $dls.find('dd.task');
		if ($tasks.size()) {
			var $dl = $dls.first(), tdHeight, dlHeight, available, nVisible;
			var dtHeight = $dl.find('dt').outerHeight(), ddHeight = $tasks.first().outerHeight();
			$tasks.hide();
			$dls.each(function(i, dl){
				var $dl = $(dl), $dds = $dl.find('dd.task'), $more = $dl.find('dd.task_more').hide(), numShow;
				if (i % 6 == 0) {
					tdHeight = $dl.parent().height();
					dlHeight = $dl.height();
					available = Math.max(0, dlHeight - dtHeight);
					nVisible = Math.floor(available / ddHeight);
				}
				
				if ($dds.size() > nVisible) {
					if (nVisible < 1) {
						$more.html('还有' + $dds.size() + '个日程…').show();
					} else {
						$dds.slice(0, numShow = Math.max(0, nVisible - 1)).show();
						$more.html('还有' + ($dds.size() - numShow) + '个日程…').show();
					}
				} else {
					$dds.show();
				}
			});
		}
	}
	
	MonthView.prototype.closeTip = function(){
		var self = this;
		self.$tip.hide();
		$("#tip_mask").remove();
	}
	
	MonthView.prototype.tip = function($els){
		var self = this;
		if (!self.$tip) {
			self.$tip = $('<div class="schedule_layer ui-shadow none"></div>').appendTo('body');
			self.$tip.click(function(evt){
				var $lnk = $(evt.target);
				if ($lnk.hasClass('js_delete')) {
					self.delSchedule($lnk);
				} else if ($lnk.hasClass('close_btn')) {
					self.closeTip();
				} else if($lnk.hasClass('js_detail')) {
					var sid = $lnk.attr("sid");
					self.closeTip();
					self.createSchedule(new Date(), sid);
					
				}
			});
			/*
			self.$tip.css({
				position: "absolute",
				width: "500px",
				height: "480px",
				top: "100px",
				background: "#fff",
				left: "50%",
				"margin-left": "-250px",
				"z-index":501
			});*/
			
			self.$tip.draggable({
				containment: 'body',
				handle: 'h2',
				cancel: 'a',
				cursor: "move",
				opacity: 0.85
			});
		}
		self.$tip.hide();
		
		//点击其他区域的时候隐藏窗口
		$("#div_calendar_list").add("#div_today").click(function(e){
			self.$tip.hide();
			$("#tip_mask").remove();
		});
		
		var tmpl = '<a href="javascript:;" class="close_btn"></a><h2>{calendarName}</h2><div class="schedule_content"><p class="schedule_time"><span>时间：</span>{datetime}</p>\
		<div class="content_div" style="max-height:400px;"><div><span>内容：</span><div class="schedule_txt">{content}</div></div></div></div><div class="schedule_bottom{editable}"><a href="javascript:;" class="js_delete" sid="{sid}">删除</a><i>|</i><a href="javascript:;" sid="{sid}" date={date} class="js_detail">详细设置</a></div>\
			<div class="layer_arrow"><em class="arrow_1 ui-shadow"></em><em class="arrow_2 ui-shadow"></em><em class="arrow_3 ui-shadow"></em><em class="arrow_4 ui-shadow"></em><em class="arrow_5 ui-shadow"></em>\
			<em class="arrow_6 ui-shadow"></em><em class="arrow_7 ui-shadow"></em><em class="arrow_8 ui-shadow"></em><em class="arrow_9 ui-shadow"></em><em class="arrow_10 ui-shadow"></em>\
			<em class="arrow_11 ui-shadow"></em><em class="arrow_12 ui-shadow"></em></div>';
		
		$els.click(function(evt, isOutSight){
			evt.stopPropagation();
			//打开Tips时关闭ScheduleCreator
			$("#div_add_schedule").hide("fade");
			var $el = $(this), cid = $el.attr('cid'), access_type = $el.attr('access_type'), allday_event = $el.attr('allday_event'), cellIndex = $el.attr('cellIndex');
			var pic_str = $el.attr("pics");
			var stime = $el.attr('stime'), sdate = $el.attr('stime').split(' ')[0], t;
			if (self.$tip.data('lastTip') == this && self.$tip.is(':visible')) {
				self.$tip.hide('fade');
			} else {
				self.$tip.html($util.format(tmpl, {
					calendarName: G.title, //TODO G.title
					datetime: allday_event == 'true' ? sdate + ' 全天' : $el.attr('stime'),
					content:$el.attr('cont').replace(/\n/g,'<br/>'),
					//content: (t = $el.attr('cont')).length > 100 ? t.slice(0, 97) + '…' : t,
					sid: $el.attr('sid'),
					date: sdate,
					editable: access_type == 2 || access_type == 3 ? '' : ' none'
				})).show('fade');
				//$('<div style="z-index: 500;width: 100%;height: 100%;overflow: hidden;-webkit-user-select: none;" class="ui-widget-overlay" id="tip_mask"></div>').appendTo("body");
				//return;
				self.$tip[cellIndex < 2 ? 'addClass' : 'removeClass']('schedule_arrow_left');
				
				//url
				var url = $el.attr("url");
				if(url != "{url}"){
					var div = $("<div class='tip_url_div'><span>详细链接：</span><a href='"+url+"' target='_blank'>"+url+"</a></div>");
					self.$tip.find(".schedule_content").append(div);
				}
				//location
				var location = $el.attr("location");
				if(location != "{location}"){
					var location_url;
					var location_name = location;
					if(location.indexOf("@") != -1){
						var locationAry = location.split("@");
						location_url = "http://api.map.baidu.com/marker?location="+locationAry[1]+"&title="+locationAry[0]+"&content="+locationAry[0]+"&output=html";
						location_name = locationAry[0];
					}else{
						location_url = "http://api.map.baidu.com/geocoder?address="+location+"&output=html&src=365rili";
					}
					var div = $("<div class='tip_location_div'><span>地址：</span><a href='"+location_url+"' target='_blank'>"+location_name+"</a></div>");
					self.$tip.find(".schedule_content").append(div);
				}
				
				//显示图片
				if(pic_str != ""){
					var pic_ary = pic_str.split(",");
					var div = $("<div class='image_div'><dl><dt>图片：</dt><dd class='schedule_pic_content'></dd></dl></div>");
					for(var i in pic_ary){
						var img = $("<img src='http://cocoimg.365rili.com/schedule_pics/default/"+pic_ary[i]+"' class='image_item none'/>");
						img[0].onload = function(){
							$(this).attr("ori-width", this.width);
							$(this).attr("ori-height", this.height);
							$(this).css({width:"32px",height:"32px"});
							$(this).show();
						}
						div.append(img);
					}
					self.$tip.find(".schedule_content").append(div);
					//点击显示大图
					div.find(".image_item").click(function(){
						var big_image_canvas = $("#big_image_canvas");
						var path = $(this).attr("src");
						var width = $(this).attr("ori-width");
						var height = $(this).attr("ori-height");
						if(big_image_canvas.length == 0){
							big_image_canvas = $("<div id='big_image_canvas'>").appendTo("body");
						}
						width =  width >  $(window).width() - 200 ? $(window).width() - 200 : width;
						height = height > $(window).height() - 200 ? $(window).height() - 200 : height;
						var style = "width:" + (width-50) + "px;height:" + (height-60) + "px;" + "margin:auto;display:block;"
						big_image_canvas.html("<img src='"+path+"' style='"+style+"'/>");
						big_image_canvas.dialog({
							modal:true,
							title:"显示大图",
							width: width,
							height: height
						});
					});
				}
				self.$tip.position(isOutSight ? {
					of: 'body',
					my: 'right',
					at: 'left',
					offset: '-20'
				} : {
					collision: 'fit',
					my: cellIndex < 2 ? 'left top' : "right top",
					at: cellIndex < 2 ? 'right top' : "left top",
					offset: '0 -28px',
					of: this
				}).data('lastTip', this);

				self.$tip.find(".content_div").jScrollPane();
			}
		});
	}
	MonthView.prototype.moreTask = function(){
		var self = this;
		if (!self.moreTip) {
			self.moreTip = $(tmplMore).appendTo('body');
			self.moreTip.resizable({
				minWidth: 165,
				minHeight: 60,
				resize: function(event, ui){
					var height = ui.size.height;
					ui.element.find('dl:last').height(height - ui.element.find('dl:first').height());
				}
			});
			self.moreTip.find('a.close_btn').click(function(){
				self.moreTip.hide('fade');
			});
		}
		self.moreTip.hide();
		self.monthTable.find('dd.task_more').click(function(evt){
			evt.stopPropagation();
			var $more = $(this), $dl = $more.parent(), $td = $dl.parent(), $tasks = $dl.find('dd.task').clone().show(), d = $td.attr('date').split('-'), date = new Date(d.join('/'));
			self.moreTip.find('dt span').html([date.getFullYear(), '年', date.getMonth() + 1, '月', date.getDate(), '日 星期', '日一二三四五六'.split('')[date.getDay()]].join(''));
			self.moreTip.find('dl:last').attr('date', $util.formatDate(date)).find('dd.task').remove().end().append($tasks).end().width(Math.max($td.width() * 1.5, 165)).css('height', 'auto').show().position({
				of: $td,
				my: 'left top',
				at: 'left top',
				collision: 'fit'
			});
			self.tip($tasks);
			$tasks.filter('[access_type!="1"]').draggable({
				helper: 'clone',
				appendTo: 'body',
				//containment: self.mainTable,
				scope: 'schedule',
				opacity: 0.65,
				zIndex: 9999,
				start: function(evt, ui){
					ui.helper.width($(this).width());
				}
			});
		});
	}
	MonthView.prototype.delSchedule = function($lnk){
		var self = this;
		var sid = $lnk.attr('sid');
		$.confirm('确定要删除这个日程吗？', {
			buttons: [{
				text: "删除",
				click: function(){
					var dialog = this;
					$.getJSON('/schedule/delete.do?scheduleId=' + sid, function(data){
						if (data == true) {
							$(dialog).dialog("close");
							$(self.$tip.data('lastTip')).remove();
							self.$tip.hide();
							$("#tip_mask").remove();
							$scheduleData.onRemoved(sid, function(data){
								self.renderSchedule(data);								
							});
						} else if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新打开此应用！');
						}
					});
				}
			}, {
				text: "取消",
				click: function(){
					$(this).dialog("close");
				}
			}]
		});
	}
	MonthView.prototype.selectable = function(){
		var self = this;
		self.monthTable.find('tbody').selectable({
			filter: 'td',
			cancel: 'dd',
			selecting: function(evt, ui){
				$(ui.selecting).addClass('selected');
			},
			unselecting: function(evt, ui){
				$(ui.unselecting).removeClass('selected');
			},
			stop: function(evt, ui){
				var $tds = self.monthTable.find('tbody td.selected');
				if ($tds.size()) {
					var dateStr = $tds.first().attr("date");
					self.closeTip();
					self.createSchedule(new Date(dateStr), undefined, $tds);
				}
			}
		});
	}
	MonthView.prototype.show = function(){
		this.container.show();
	}
	MonthView.prototype.hide = function(){
		this.container.hide();
		this.moreTip.hide();
	}
	
	MonthView.prototype.createSchedule = function(date, sid, $tds){
		var self = this;
		//G.accessType
		if(G.accessType == 2 || G.accessType == 3){
			$scheduleCreateView.show({
				from:self.fromDate,
				to:self.toDate
			}, date, sid, $tds);			
		}
	}
});
