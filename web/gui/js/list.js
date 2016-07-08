//Global Variable
var isLogin = false;
var calendarList;	//当前用户的日历列表	
var scheduleList;	//当前要显示的日程列表
var updateBySelf = false; //自行获取数据

//init list function
$(function(){
	// clientProtocol.init(5, 360, 472);
	var styleId = clientProtocol.getStyle(5);
	if(styleId){
		$(".set_widget_style[val='"+styleId+"']").addClass("on");
	}
	
	$(".set_widget_btn").click(function(){
		if($(".set_widget_box").is(":visible"))
			$(".set_widget_box").hide("fade");
		else
			$(".set_widget_box").show("fade");
	})
	$(".set_widget_style").click(function(){
		if($(this).hasClass("on")){
			$(".set_widget_box").hide("fade");
			return;
		}
		$(".set_widget_box .on").removeClass("on");
		$(this).addClass("on");
		var val = $(this).attr("val");
		clientProtocol.setStyle(5, parseInt(val));
		$(".set_widget_box").hide("fade");
	});
	
	if(location.href.indexOf("reload=true") == -1){
		var oriX = screen.availWidth - 920;
		var oriY = 120;
		clientProtocol.moveWnd(5, oriX, oriY);
	}
		$('.new_list_content').height(472 - 111).jScrollPane();
		$('.todo_list_content').height(472 - 111).jScrollPane();
	if(typeof js365 != "undefined"){
		pcDraggableResizeable();
		disableSelectAndRightClick();
	}
	$(".new_list").widgetList();
	$(".todo_list_content").calendarPluginTodo();
	if($.cookie("yy_widget_list") == "todo"){
		$(".st_list_tab li").eq(0).removeClass("on");
		$(".st_list_tab li").eq(1).addClass("on");
		$(".schedule_box").addClass("todo_box");
	}
	//swich tab
	$(".st_list_tab li").click(function(){
		if($(this).hasClass("on"))
			return;
		$(".st_list_tab li").removeClass("on");
		$(this).addClass("on");
		var tag = $(this).attr("tag");
		if(tag == "schedule"){
			$(".schedule_box").removeClass("todo_box");	
			$.cookie("yy_widget_list", "list", {
				expires: 365
			});
		}else{
			$(".schedule_box").addClass("todo_box");
			$(".todo_list_content").jScrollPane();
			$.cookie("yy_widget_list", "todo", {
				expires: 365
			});
		}
	});	
});

$.widget('meixx.widgetList', {
	options: {
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		$elem.find(".add_schedule_btn").click(function(){
			var date = new Date();
			var strDate = [date.getFullYear(), date.getMonth()+1, date.getDate()].join("/");
			self._addSchduleOnMain(strDate);
		});
		
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//原代码
//		if(typeof opt.cldIDs != "undefined")
//			self.cldIDs = opt.cldIDs;
//		self._showDateInfo();
//		self._loadScheduleData();
		
		/**
		 * calendarList和scheduleList都由主日历传过来
		 */
		if(typeof opt.calendarList != "undefined") {
			calendarList = opt.calendarList;
		}
		
		if(typeof opt.scheduleList != "undefined") {
//			scheduleList = opt.scheduleList;
			scheduleList = JSON.parse(decodeURI(opt.scheduleList));
		}
		
		if(typeof opt.cldIDs != "undefined") {
			self.cldIDs = opt.cldIDs;
		}
		
		if(typeof opt.updateBySelf != "undefined") {
			updateBySelf = opt.updateBySelf;
		}
		
		self._showDateInfo();
		
		if(typeof calendarList == "undefined") {
			return;
		} else if(updateBySelf) {
			self._loadScheduleData();
		} else {
			self._loadPassedScheduleData();
		}
		
	},
	_showDateInfo: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var d = new Date();
		var l = lunar(d);
		var week_ary = ["周日","周一","周二","周三","周四","周五","周六"];
		$elem.find(".solar_date").html(d.getDate());
		$elem.find(".week_day").html(week_ary[d.getDay()]);
		$elem.find(".lunar_date").html(l.lMonth + "月" + l.lDate);
		$elem.find(".solar_year_month").html(d.getFullYear() + "." + (d.getMonth()+1));
	},
	_showScheduleInfo: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		if (self.sdata) {
			var now_timestamp = self._getCurrentDate().getTime();			
			var arHtml = [];
			var templateHtml = "<dl class='e_clear' sid='{id}' cid='{cid}' datetime='{start_time}' content='{content}' calendarTitle='{calendarTitle}' allday='{allday}'><dt>{date}</dt><dd><p class='time'>{timess}</p>{text}</dd></dl>";
			$.each(self.sdata, function(_, o){
				//{"id":158,"start_time":"2013-04-29 09:00:00","text":"每周单数工作日","duration":0,"allday_event":true,"cid":11,"repeat_type":7}
				var d = new Date();
				var date_ary = o.start_time.split(' ')[0].split("-");
				var monthStr = date_ary[1];
				if(monthStr[0] == "0")
					monthStr = parseInt(monthStr[1])
				else
					monthStr = parseInt(monthStr);
				d.setFullYear(date_ary[0]);
				d.setMonth(monthStr - 1, date_ary[2]);
				d.setDate(date_ary[2]);
				var dateStr = formatDate(d).substr(5).replace("-", "/");
				var d_timestamp = d.getTime();
				if(d_timestamp >= now_timestamp && d_timestamp < now_timestamp + 86400000){
					dateStr = "今天";
				}else if(d_timestamp >= now_timestamp+86400000 && d_timestamp < now_timestamp + 86400000*2){
					dateStr = "明天";
				}else if(d_timestamp >= now_timestamp+86400000*2 && d_timestamp < now_timestamp + 86400000*3){
					dateStr = "后天";
				}
				arHtml.push($.format(templateHtml, {
					id: o.id,
					text: html_encode(html_decode(o.text)).replace(/\n/g,'<br/>'),
					content:html_encode(html_decode(o.text)),
					cid: o.cid,
					color: self.colors[o.cid],
					start_time: o.start_time,
					timess:o.allday_event?'全天':o.start_time.split(' ')[1].substr(0,5),
					date:dateStr,
					allday:o.allday_event? "yes":"no",
					calendarTitle: o.calendarTitle
				}));
			});
			$elem.find("#schedule_list").html(arHtml.join(""));
			
			var click_progress = false;
			$elem.find("#schedule_list dl").click(function(){
				if(click_progress)
					return;
				var $dl = $(this);
				var sid = $dl.attr('sid');
				var cid = $dl.attr('cid');
				var strDate = $dl.attr('datetime');
				var content = $dl.attr('content');
				var calendarTitle = $dl.attr("calendarTitle");
				var allday = $dl.attr("allday");
				self._showScheduleOnMain(strDate, content, calendarTitle, allday, sid);
				click_progress = true;
				setTimeout(function(){
					click_progress = false;
				}, 300);
			});
			$elem.find(".new_list_content").data('jsp').reinitialise();

			//$('#div_schedules').data('jsp').reinitialise();
		}
	},
	_getCurrentDate: function(){
		var date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	},
	// 原加载日程的方法
	_loadScheduleData_old: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.sdata = {};
		self.colors = {};
		self.calendarMap = {};
		$.ajax({
			url: '/calendar/getCalendarListByUser.do',
			type: 'post',
			dataType: 'json',
			success: function(data){				
				if (data.state == 'wrongpass') {
					$("#schedule_list").html(
						"<p  style='margin:20px;'>您还没有登录，<br/>请您先<a href='javascript:void(0)' onclick='mainToLogin(); return false;'>登录</a></p>");
					isLogin = false;
				} else {
					isLogin = true;
					var fromDate = self._getCurrentDate();
					var toDate = new Date(fromDate.getTime() + 86400 * 1000 * 7);
					
					$.ajax({
						url: '/schedule/list.do',
						type: 'post',
						dataType: 'json',
						cache: false,
						data: {
							fromDate: formatDate(fromDate),
							toDate: formatDate(toDate),
							timeZone: -fromDate.getTimezoneOffset() / 60,
							calendarId: $.map(data, function(o){
								self.colors[o.id] = o.color;
								self.calendarMap[o.id] = o.title;
								return o.id;
							}).join(',')
						},
						success: function(sdata){
							//console.log(sdata);
							self.sdata = [];
							function getDateFromStr(str){
								var d = new Date();
								try{
									var ary = str.split(" ");
									var month = ary[0].split("-")[1];
									if(month.indexOf("0") == 0)
										month = parseInt(month.substr(1));
									else
										month = parseInt(month);
									d.setFullYear(ary[0].split("-")[0]);
									d.setMonth(month - 1);
									d.setDate(ary[0].split("-")[2]);
									
									d.setHours(ary[1].split(":")[0]);
									d.setMinutes(ary[1].split(":")[1]);
									d.setSeconds(ary[1].split(":")[2]);
									return d;
								}catch(e){
									return new Date(str);
								}
							}
							$.each(sdata, function(index, cal){
								if(typeof self.cldIDs != "undefined" && self.cldIDs.indexOf(cal.cid) == -1)
									return;
								$.each(cal.schlist, function(i, o){
									o.calendarTitle = self.calendarMap[cal.cid];
									/**
									 * 前端不展开
									 */
									// if(o.duration > 0){
									// 	var start = getDateFromStr(o.start_time);
									// 	var end = new Date(start.getTime() + o.duration*1000);
									// 	var today = self._getCurrentDate();
									// 	var today_end = new Date(today.getTime() + 86400000 * 6);
									// 	if(start >= today){
									// 		self.sdata.push(o);
									// 	}else{
									// 		start = new Date(today.getTime() - 86400000);
									// 	}
									// 	for(var i=new Date(start.getTime() + 86400000); i<=end && i <= today_end; i=new Date(i.getTime()+86400000)){
									// 		var clonedObj = {};
									// 		$.extend(clonedObj,o);
									// 		clonedObj.start_time = formatDate(i) + " 09:00:00";
									// 		clonedObj.allday_event = true;
									// 		self.sdata.push(clonedObj);
									// 	}
									// }else{
									// 	self.sdata.push(o);
									// }

									self.sdata.push(o);
								});
								
								self.sdata.sort(function(a, b){
									var a_date = getDateFromStr(a.start_time);
									var b_date = getDateFromStr(b.start_time);
									return a_date.getTime() - b_date.getTime();
								});

								
							});
							self._showScheduleInfo();
						}
					});
				}
			}
		});
	},
	//只加载日程
	_loadScheduleData: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.sdata = {};
		self.colors = {};
		self.calendarMap = {};
		var fromDate = self._getCurrentDate();
		var toDate = new Date(fromDate.getTime() + 86400 * 1000 * 7);
		
		if (typeof(js365) != "undefined" && js365.isLogin() == 'no') {
			isLogin = false;
			opt.cancelBubble || mainToLogin();
			return;
		} else {
			isLogin = true;
		}
		
		$.ajax({
			url: '/schedule/list.do',
			type: 'post',
			dataType: 'json',
			cache: false,
			data: {
				fromDate: formatDate(fromDate),
				toDate: formatDate(toDate),
				timeZone: -fromDate.getTimezoneOffset() / 60,
				calendarId: $.map(calendarList, function(o){
					self.colors[o.id] = o.color;
					self.calendarMap[o.id] = o.title;
					return o.id;
				}).join(',')
			},
			success: function(sdata){
				//console.log(sdata);
				self.sdata = [];
				//edited by Xiaoqi 增加“全天”日程判断，全天日程当做从0点开始
				function getDateFromStr(str, allday){
					var d = new Date();
					try{
						var ary = str.split(" ");
						var month = ary[0].split("-")[1];
						if(month.indexOf("0") == 0)
							month = parseInt(month.substr(1));
						else
							month = parseInt(month);
						d.setFullYear(ary[0].split("-")[0]);
						d.setMonth(month - 1);
						d.setDate(ary[0].split("-")[2]);
						
						if(allday) {
							d.setHours(0);
							d.setMinutes(0);
							d.setSeconds(0);
						} else {
							d.setHours(ary[1].split(":")[0]);
							d.setMinutes(ary[1].split(":")[1]);
							d.setSeconds(ary[1].split(":")[2]);
						}
						return d;
					}catch(e){
						return new Date(str);
					}
				};
				$.each(sdata, function(index, cal){
					if(typeof self.cldIDs != "undefined" && self.cldIDs.indexOf(cal.cid) == -1)
						return;
					$.each(cal.schlist, function(i, o){
						o.calendarTitle = self.calendarMap[cal.cid];
						self.sdata.push(o);
					});
					
					self.sdata.sort(function(a, b){
						var a_date = getDateFromStr(a.start_time, a.allday_event);
						var b_date = getDateFromStr(b.start_time, b.allday_event);
						return a_date.getTime() - b_date.getTime();
					});
				});
				

				self._showScheduleInfo();
			}
		});
	},
	// added by Xiaoqi 加载由其他窗体推送的数据
	_loadPassedScheduleData: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.sdata = {};
		self.colors = {};
		self.calendarMap = {};
		
		if (typeof(js365) != "undefined" && js365.isLogin() == 'no') {
			isLogin = false;
			opt.cancelBubble || mainToLogin();
			return;
		} else {
			isLogin = true;
		}
		
		$.map(calendarList, function(o){
			self.colors[o.id] = o.color;
			self.calendarMap[o.id] = o.title;
			return o.id;
		});

		sdata = scheduleList;
		self.sdata = [];
		$.each(sdata, function(i, o) {
			o.calendarTitle = self.calendarMap[o.cid];
			self.sdata.push(o);
		});
		
		function getDateFromStr(str, allday){
			var d = new Date();
			try{
				var ary = str.split(" ");
				var month = ary[0].split("-")[1];
				if(month.indexOf("0") == 0)
					month = parseInt(month.substr(1));
				else
					month = parseInt(month);
				d.setFullYear(ary[0].split("-")[0]);
				d.setMonth(month - 1);
				d.setDate(ary[0].split("-")[2]);
				
				if(allday) {
					d.setHours(0);
					d.setMinutes(0);
					d.setSeconds(0);
				} else {
					d.setHours(ary[1].split(":")[0]);
					d.setMinutes(ary[1].split(":")[1]);
					d.setSeconds(ary[1].split(":")[2]);
				}
				return d;
			}catch(e){
				return new Date(str);
			}
		};
		
		self.sdata.sort(function(a, b){
			var a_date = getDateFromStr(a.start_time, a.allday_event);
			var b_date = getDateFromStr(b.start_time, b.allday_event);
			return a_date.getTime() - b_date.getTime();
		});
		
		self._showScheduleInfo();
	},
	_addSchduleOnMain: function(strDate){
		if(isLogin){
			clientProtocol.createWnd(6, "/gui/creator_schedule.html", 510, 370);
			clientProtocol.setStyle(6, 1);			
		}else{
			js365.showMainWnd();
		}
	},
	_showScheduleOnMain: function(strDate, content, calendarTitle, allday, sid){
		if(allday == "yes"){
			strDate = strDate.split(" ")[0] + " 全天";
		}
		var urlAry = ["/gui/schedule_detailed.html", "?date=", strDate, "&content=", encodeURIComponent(content), "&title=", encodeURIComponent(calendarTitle), "&sid=", sid];
		clientProtocol.createWnd(7, urlAry.join(""), 260, 300);
		clientProtocol.setStyle(7, 1);
	}
});

function mainToLogin(){
	if(typeof js365 != "undefined"){
		js365.showMainWnd();
		js365.runScriptMainWnd('if(location.href.indexOf("/account/login.do") < 0) location.href="/account/login.do"');
	}
}


function disableSelectAndRightClick(){
	document.oncontextmenu = function(e){
		if(e.target.nodeName != "TEXTAREA" && e.target.nodeName != "INPUT")
			window.event.returnValue = false;
	};
	document.ondragstart = function(){ window.event.returnValue = false;};
	document.onselectstart = function(){ window.event.returnValue = false;};
}

function html_encode(str){
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");  
		s = s.replace(/>/g, "&gt;");  
		s = s.replace(/ /g, "&nbsp;");  
		s = s.replace(/\'/g, "&#39;");  
		s = s.replace(/\"/g, "&quot;");  
		//s = s.replace(/\n/g, "<br>");  
		return s;  
}

function html_decode(str)  
{  
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&amp;/g, "&");  
		s = s.replace(/&lt;/g, "<");  
		s = s.replace(/&gt;/g, ">");  
		s = s.replace(/&nbsp;/g, " ");  
		s = s.replace(/&#39;/g, "\'");  
		s = s.replace(/&quot;/g, "\"");  
		//s = s.replace(/<br>/g, "\n");  
		return s;  
}


$.widget('mxx.calendarPluginTodo', {
	options: {},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.$ulList = $elem.find('#todo_list');
		//self.editHtml = '<li noteid="{id}" class="default e_clear{className}"><div class="cut_off_date"><input type="text" readonly="readonly" value="{deadline}"/></div><div class="todo_btn"><a hidefocus="true" href="javascript:;" class="todo_cancel_btn">取消</a><a hidefocus="true" href="javascript:;" class="todo_save_btn">保存</a></div><div class="todo_operating"><a hidefocus="true" href="javascript:;" class="todo_complete" title="{titlemark}"></a><a hidefocus="true" href="javascript:;" class="todo_del" title="删除"></a><a hidefocus="true" href="javascript:;" class="todo_edit" title="编辑"></a></div><a hidefocus="true" href="javascript:;" class="star{priority}"></a><div class="todo_text">{title}</div><textarea class="edit_textarea" ori="{title}">{title}</textarea></li>';
		self.editHtml = '<dl noteid="{id}" class="{className} e_clear"><dt><a hidefocus="true" href="javascript:;" class="star{priority}"></a></dt>'+
						'<dd><div class="todo_txt">{title}</div><div class="start_time"><input type="text" readonly="readonly" value="{deadline}"/></div><div class="todo_operating_btn">' +
						'<a hidefocus="true" href="javascript:;" class="todo_complete" title="{titlemark}"></a>' +
						'<a hidefocus="true" href="javascript:;" class="todo_del" title="删除"></a>'+
						'<a hidefocus="true" href="javascript:;" class="todo_edit" title="编辑"></a></div></dd></dl>';
		
		//event
		$('input,a', self.$ulList).live('click', function(evt){
			this.nodeName == 'A' && evt.preventDefault();
			evt.stopPropagation();
		});
		$('a.add_todo_btn').click(function(evt){
			clientProtocol.createWnd(8, "/gui/creator_todo.html", 510, 367);
			clientProtocol.setStyle(8, 1);
		});
		var starRequesting = false;
		$('a.star', $elem).live('click', function(evt){
			var $lnk = $(this), $li = $lnk.parents('dl'), noteId = $li.attr('noteid');
			if (!$li.hasClass('create')) {
				if (!starRequesting) {
					starRequesting = true;
					var priority = !$lnk.hasClass('staron');
					$lnk.toggleClass('staron');
					self.post('/todo/updatePriority.do', {
						noteId: parseInt(noteId),
						priority: priority
					}, function(result){
						starRequesting = false;
						self.sort();
					}, '设置待办重要性');
				}
			} else {
				$lnk.toggleClass('staron');
			}
		});
		$('a.todo_cancel_btn', $elem).live('click', function(evt){
			var $li = $(this).parents('li');
			if ($li.hasClass('create')) {
				$li.slideUp(function(){
					$li.remove();
				});
			} else {
				$li.removeClass('click todo_edit');
			}
		});
		var saveRequesting = false;
		$('a.todo_save_btn', $elem).live('click', function(evt){
			
		});
		$('a.todo_edit', $elem).live('click', function(evt){
			var $lnk = $(this), $li = $lnk.parents('dl'), noteId = $li.attr('noteid');
			var title = html_decode($li.find(".todo_txt").html());
			//title = title.replace(/<br>/g, "\n");
			var deadline = $li.find(".start_time input").val();
			var star = $li.find(".star").hasClass("staron");
			var urlAry = ["/gui/creator_todo.html", "?noteid=", noteId, "&deadline=", deadline, "&star=", star];
			clientProtocol.createWnd(8, urlAry.join(""), 510, 367);
			clientProtocol.setStyle(8, 1);
			//workaround
			setTimeout(function(){
				clientProtocol.runScript(8, "setTitle('"+title+"')");				
			},100);
		});
		//删除待办
		$('a.todo_del', $elem).live('click', function(evt){
			var $lnk = $(this), $li = $lnk.parents('dl'), noteId = $li.attr('noteid');
			$.confirm('确定要解除该条待办吗？', {
				buttons: [{
					click: function(){
						var dialog = this;
						self.post('/todo/delete.do', {
							noteId: parseInt(noteId)
						}, function(rslt){
							if (rslt) {
								$(dialog).dialog('close');
								$li.slideUp(function(){
									$li.remove();
									$(".todo_list_content").jScrollPane();
									if (!self.$ulList.find('dl').size()) {
										self.todoEmpty();
									}
								});
							}
						}, '删除待办');
					}
				}]
			});
		});
		//标记完成
		var completeRequesting = false;
		$('a.todo_complete', $elem).live('click', function(evt){
			var $lnk = $(this), $li = $lnk.parents('dl'), noteId = $li.attr('noteid');
			if (!completeRequesting) {
				completeRequesting = true;
				var state = !$li.hasClass('com');
				$li.toggleClass('com');
				self.post('/todo/updateState.do', {
					noteId: parseInt(noteId),
					state: +state
				}, function(result){
					completeRequesting = false;
					$lnk.attr('title', state ? '标识为未完成': '标识为已完成')
					self.sort();
				}, '更新待办状态');
			}
		});
	},
	_init:function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.loadTodoData();
	},
	loadTodoData: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.post('/todo/findAll.do', {}, function(result){
			if (result.length) {
				self.$ulList.empty().html($.format(self.editHtml, $.map(result.sort(sortOperator), function(o){
					o.className = o.state ? ' com' : '';
					o.deadline = '截止日期  ' + (o.deadline ? formatDate(new Date(o.deadline)) : '不限');
					o.priority = o.priority ? ' staron' : '';
					o.titlemark = o.state ? '标识为未完成' : '标识为已完成';
					o.title=o.title.replace(/\n/g,'<br/>');
					return o;
				})));
				self.$ulList.find('div.start_time input').datepicker($.getDPOptions({
					minDate: 0,
					onSelect: function(dateText, inst){
						inst.input.val('截止日期  ' + dateText);
						self.post('/todo/updateDeadline.do', {
							noteId: parseInt(inst.input.parents('dl').attr('noteid')),
							deadlinestr: dateText
						}, function(result){
							self.sort();
						}, '更新待办截止日期');
					}
				}));
				if($.cookie("yy_widget_list") == "todo"){
					$(".schedule_box").addClass("todo_box");
					$(".todo_list_content").jScrollPane();
				}
			} else {
				self.todoEmpty();
			}
		}, '获取待办列表数据');
	},
	post: function(url, data, success, errorText){
		if (!$.loading.is()) {
			$.loading();
			$.ajax({
				url: url,
				type: 'post',
				dataType: 'json',
				data: data,
				success: function(data){
					$.loading.close();
					$.isFunction(success) && success(data);
				},
				error: function(xhr, textStatus, errorThrown){
					$.loading.close();
					$.alert(errorText + '时出现错误:' + textStatus + ':' + errorThrown);
				}
			});
		}
	},
	sort: function(){
		this.$ulList.append(this.$ulList.find('dl').toArray().sort(sortOperator));
	},
	todoEmpty: function(){
		this.$ulList.empty().html('<li class="todo_empty">好记性不如烂笔头，有什么待办的事，就记下来吧！</li>');
	}
});

$(".close_btn").click(function(){
	if(typeof js365 != "undefined")
		js365.closeWnd(5);
	else
		alert("close");
});

function sortOperator(a, b){
	if (a.nodeName) {
		a = getSortOperatorParam($(a));
		b = getSortOperatorParam($(b));
	}
	return a.state - b.state || b.priority - a.priority || (a.deadline || Number.MAX_VALUE) - (b.deadline || Number.MAX_VALUE) || b.id - a.id;
}

function getSortOperatorParam($elem, t){
	return {
		state: $elem.hasClass('com'),
		priority: $elem.find('a.star').hasClass('staron'),
		deadline: (t = $elem.find('div.start_time input').val().split('  ')[1]) && /^\d{4}-\d{2}-\d{2}$/.test(t) ? +new Date(t.split('-').join('/')) : 0,
		id: +$elem.attr('noteid')
	};
}
function pcDraggableResizeable(){
	try {
        var sw = screen.availWidth, sh = screen.availHeight, w = 364, h = Math.min(sh, 472);
        var oriX, oriY, oriWidth, oriHeight;
        oriX = (sw - w) / 2;
        oriY = (sh - h) / 2;
        var draging = false, startX, startY;
        $(document).mousedown(function(evt){
        	var name = evt.target.nodeName;
        	if (js365.isMaximized() != 'true' && evt.button == 0 && ($('.new_list_top').find(evt.target).size() || $('.new_list_top').filter(evt.target).size()) && name != 'A') {
        		draging = true;
        		startX = evt.pageX;
        		startY = evt.pageY;
        		js365.setCaptureWnd(5);
        	}
        }).mousemove(function(evt){
        	if (draging == true) {
        		var deltaX = evt.pageX - startX, deltaY = evt.pageY - startY;
        		$(this).css('cursor', 'move');
        		js365.moveWnd(5, oriX += deltaX, oriY += deltaY);
        	}
        }).mouseup(function(evt){
        	evt.stopPropagation();
        	draging = false;
        	$(this).css('cursor', 'auto');
        	js365.releaseCapture();
        });
        
		function resizable(){
			$('#div_border').resizable({
				minWidth: 364,
				minHeight: Math.min(sh, 472),
				start: function(){
					js365.setCaptureWnd(5);
				},
				resize: function(event, ui){
					var width = ui.size.width, height = ui.size.height;
					js365.resizeWnd(5, w = width, h = height);
					$('.new_list_content').height(height - 111).jScrollPane();
					$('.todo_list_content').height(height - 111).jScrollPane();
				},
				stop: function(){
					$('#div_border').css('width', '100%').css('height', '100%');
					js365.releaseCapture();
				}
			});
		}
		resizable();
	} catch (ex) {
	}
}