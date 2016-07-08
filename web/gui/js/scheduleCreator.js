
	var $form;
	var _calendarId = null;
	var _cldDataList = null;
	function getForm(date_param){
		if (!$form) {
			//var tmpl = '<div id="div_add_schedule" class="add_schedule_layer complete ui-shadow none"><!--complete simple--><a href="javascript:;" class="close_btn js_close"></a><h2></h2><div class="add_schedule_content"><form><input type="hidden" name="scheduleId" value=""/><dl class="e_clear"><dt>内容：</dt><dd><textarea name="schTitle"></textarea></dd></dl><dl class="e_clear"><dt>时间：</dt><dd><div class="timetype"><label><input type="checkbox" name="alldayEvent" checked="checked"/><span>全天</span></label><label><input type="checkbox" name="chk_lunar"/><span>农历</span></label></div><div class="data_box "><ul class="js_datepicker" style="float:left;"><li><input type="text" name="startTime"/></li><li class="none js_lunarPicker"><select name="dlt_from_year"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_month"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_date"><option value="1">初一</option><option value="2">初二</option><option value="3">初三</option><option value="4">初四</option><option value="5">初五</option><option value="6">初六</option><option value="7">初七</option><option value="8">初八</option><option value="9">初九</option><option value="10">初十</option><option value="11">十一</option><option value="12">十二</option><option value="13">十三</option><option value="14">十四</option><option value="15">十五</option><option value="16">十六</option><option value="17">十七</option><option value="18">十八</option><option value="19">十九</option><option value="20">二十</option><option value="21">廿一</option><option value="22">廿二</option><option value="23">廿三</option><option value="24">廿四</option><option value="25">廿五</option><option value="26">廿六</option><option value="27">廿七</option><option value="28">廿八</option><option value="29">廿九</option><option value="30">三十</option></select></li></ul>&nbsp;<div class="hour js_time none"><select name="dlt_start_hour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><span>时</span><select name="dlt_start_minute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select><span>分</span></div></div></dd></dl><div class="complete_time_calender"><dl class="e_clear"><dt>日历：</dt><dd><select name="calendarId"></select></dd></dl></div><div class="complete_content"><div class="complete_set s-no"><dl class="st1 e_clear"><dt>重复类型：</dt><dd><select><option mode="s-no" value="0">不重复</option><option mode="s-dy" value="1">按天</option><option mode="s-w" value="7">按周</option><option mode="s-m" value="31">按月</option><option mode="s-dy" value="365">按年</option></select></dd></dl><dl class="st2 e_clear"><dt>重复类型：</dt><dd><select><option mode="l-no" value="0">不重复</option><option mode="l-my" value="29">农历每月</option><option mode="l-my" value="354">农历每年</option></select></dd></dl><dl class="st3 e_clear"><dt>重复频率：</dt><dd>每<select name="repeatFrequency"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option></select><span class="js_rp_unit">周</span></dd></dl><dl class="st4 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_month"><label><input type="radio" name="rdo_repeat" checked="checked" value="month"/><span>一个月的某一天</span></label><label><input type="radio" name="rdo_repeat" value="week"/><span>一周的某一天</span></label></dd></dl><dl class="st5 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_week"><label><input type="checkbox" name="chk_rp_week" day="一" value="MON"/><span>一</span></label><label><input type="checkbox" name="chk_rp_week" day="二" value="TUE"/><span>二</span></label><label><input type="checkbox" name="chk_rp_week" day="三" value="WED"/><span>三</span></label><label><input type="checkbox" name="chk_rp_week" day="四" value="THU"/><span>四</span></label><label><input type="checkbox" name="chk_rp_week" day="五" value="FRI"/><span>五</span></label><label><input type="checkbox" name="chk_rp_week" day="六" value="SAT"/><span>六</span></label><label><input type="checkbox" name="chk_rp_week" day="日" value="SUN"/><span>日</span></label>&nbsp;<a href="javascript:;" class="js-work-day" title="只选择工作日">工作日</a>&nbsp;<a href="javascript:;" class="js-rest-day" title="只选择双休日">双休日</a></dd></dl><dl class="st6 e_clear"><dt>结束条件：</dt><dd class="end_data"><ul><li><label><input type="radio" name="rdo_repeat_cond" value="never" checked="checked"/><span>从不</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="times" id="rdo_repeat_cond_1"/><span>发生</span></label><input type="text" class="end_data_text1" name="repeatCount" value="20"/><label for="rdo_repeat_cond_1"><span>次后</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="date"/><span>在</span></label><input type="text" name="repeatStopTime" class="end_data_text2"/></li></ul></dd></dl><dl class="st7 e_clear"><dt>摘要：</dt><dd class="summary"></dd></dl><dl class="e_clear"><dt>提醒设置：</dt><dd><select name="before_minutes"><option value="">无提醒</option><option value="0">正点</option><option value="5">5分前</option><option value="10">10分前</option><option value="30">30分前</option><option value="60">1小时前</option><option value="1440">1天前</option><option value="4320">3天前</option></select></dd></dl><dl class="e_clear"><dt>关联URL：</dt><dd><input type="text" size="50" name="linked_url"/></dd></dl><dl class="e_clear"><dt>地址：</dt><dd><input type="text" size="50" name="location"/></dd></dl></div></div></form></div><div class="add_schedule_bottom"><a href="javascript:;" class="giveup_schedule_btn js_close">放弃</a><a href="javascript:;" class="create_schedule_btn js_save">保存</a><a href="javascript:;" class="simple_more">详细设置</a><div class="layer_arrow"><em class="arrow_1 ui-shadow"></em><em class="arrow_2 ui-shadow"></em><em class="arrow_3 ui-shadow"></em><em class="arrow_4 ui-shadow"></em><em class="arrow_5 ui-shadow"></em><em class="arrow_6 ui-shadow"></em><em class="arrow_7 ui-shadow"></em><em class="arrow_8 ui-shadow"></em><em class="arrow_9 ui-shadow"></em><em class="arrow_10 ui-shadow"></em><em class="arrow_11 ui-shadow"></em><em class="arrow_12 ui-shadow"></em></div></div></div>';
			$form = $("#div_add_schedule");
			
			$form.find(':input[name]').each(function(){
				var $elem = $(this), name = $elem.attr('name');
				$form[name] = $form[name] ? $form[name].add($elem) : $elem;
			});
			$form.summary = $form.find('dd.summary');
			$form.liLunarPicker = $form.find('li.js_lunarPicker');
			$form.complete_set = $form.find('div.complete_set');
			$form.btnSave = $form.find('a.add_schedule_bottom');
			$form.schTitle.focus();
			$form.find('select[name=before_minutes]').val(0);

			
			var ALLTYPE = 's-no s-dy s-m s-w l-no l-my s-dwd';
			
			//点击其他区域的时候隐藏窗口
			$("#div_calendar_list").add("#div_today").click(function(e){
				if(e.target.id !== $form.attr("id") && !$.contains($form[0], e.target)){
					$form.hide('fade');
					$form.removeData('fromTd');
					G.cldPanel.calendarPanel('cancelSelect');	
				}
			});
			$form.alldayEvent.click(function(evt){
				$form.find('div.js_time')[this.checked ? 'addClass' : 'removeClass']('none');
				if (this.checked) {
					$form.dlt_start_hour.val('09');
					$form.dlt_start_minute.val('00');
				}
				summary();
			});
			$form.calendarId.change(function() {
				var cid=$(this).val();
				var getPublicVal= getPublic(cid);
				if(getPublicVal == "true"){
					$form.find(".remind_view").addClass("none");
				}else{
					$form.find(".remind_view").removeClass("none");
				}
			});
			$form.chk_lunar.click(function(evt){
				//隐藏公历，显示农历
				var $li = $form.find('ul.js_datepicker li').hide().eq(+this.checked).show();
				//计算公历对应的农历日期
				if (this.checked) {
					var $dlts = $li.find('select'), strDate = formatDate($form.startTime.datepicker('getDate')), d = new Date(strDate.replace(/-/g, '/'));
					$form.liLunarPicker.lunarPicker('setDate', d);
				} else {
					$form.startTime.datepicker('setDate', $form.liLunarPicker.lunarPicker('getDate'));
				}
				//切换公农历设置类型
				var $div = $form.complete_set.removeClass(ALLTYPE);
				$div.find('dl select').eq(+this.checked).change();
				summary();
			});
			
			$form.complete_set.find('dl.st1 select, dl.st2 select').change(function(){
				var $opt = $('option:selected', this), cname = $opt.attr('mode'), text = $opt.text();
				if(cname == "s-no"){
					clientProtocol.resizeWnd(6, 510, 365);
					Global_height = 365;
				}
				else if(cname == "s-dy"){
					clientProtocol.resizeWnd(6, 510, 525);
					Global_height = 525;					
				}
				else if(cname == "s-w"){
					clientProtocol.resizeWnd(6, 510, 560);
					Global_height = 560;					
				}
				else if(cname == "s-m"){
					clientProtocol.resizeWnd(6, 510, 560);
					Global_height = 560;
				}
				else if(cname == "s-dy"){
					clientProtocol.resizeWnd(6, 510, 525);
					Global_height = 525;
				}else if(cname == "l-no"){
					clientProtocol.resizeWnd(6, 510, 365);
					Global_height = 365;	
				}else if(cname == "l-my"){
					clientProtocol.resizeWnd(6, 510, 530);
					Global_height = 530;
				}else if(cname == "s-dwd"){
					clientProtocol.resizeWnd(6, 510, 480);
					Global_height = 480;
				}

				$form.complete_set.removeClass(ALLTYPE).addClass(cname);
				//设置重复单位
				if ('年月周天'.indexOf(text = text.charAt(text.length - 1)) > -1) {
					$form.find('span.js_rp_unit').text(text);
				}
				summary();
			});
			
			$form.chk_rp_week.click(function(){
				summary();
			});
			
			$form.rdo_repeat.click(function(){
				summary();
			});
			
			$form.repeatFrequency.change(function(){
				summary();
			});
			
			$form.liLunarPicker.lunarPicker({
				onChange: function(solar, lunarYear, lunarMonth, lunarDate){
					$form.startTime.datepicker('setDate', solar);
					summary();
				}
			});
			
			$form.startTime.add($form.repeatStopTime).datepicker($.getDPOptions({
				onSelect: function(dateText, inst){
					summary();
				}
			}));
			$form.startTime.datepicker('setDate', date_param);

			$form.repeatCount.input({
				onInput: function(val){
					summary();
				}
			});
			
			$form.rdo_repeat_cond.click(function(){
				$(this).parents('li').find('input[type="text"]').focus().select();
				summary();
			});
			
			$form.find('a.simple_more').click(function(evt){
				evt.preventDefault();
				$form.removeClass('simple').addClass('complete').position({
					of: 'body'
				});
				//$form.draggable('enable');
				$form.schTitle.focus();
			});
			
			$form.find('a.js-work-day, a.js-rest-day').click(function(evt){
				evt.preventDefault();
				$form.chk_rp_week.attr('checked', false);
				($(this).hasClass('js-work-day') ? $form.chk_rp_week.slice(0, 5) : $form.chk_rp_week.slice(-2)).attr('checked', true);
				summary();
			});
			
			$form.btnSave.loading();
			$form.btnSave.click(function(evt){
				if (evt.isImmediatePropagationStopped() || $form.btnSave.loading('is')) { return false; }
				evt.preventDefault();
				var isSimple = $form.hasClass('simple'), postData = {
					schTitle: $.trim($form.schTitle.val()),
					alldayEvent: $form.alldayEvent.is(':checked'),
					calendarId: $form.calendarId.val(),
					startTime: [($form.chk_lunar.is(':checked') ? formatDate($form.liLunarPicker.lunarPicker('getDate')) : formatDate($form.startTime.datepicker('getDate'))), ' ', $form.dlt_start_hour.val(), ':', $form.dlt_start_minute.val(), ':00'].join(''),
					timeZone: -(new Date()).getTimezoneOffset() / 60
				};
				if (!postData.schTitle) {
					$.alert("请输入日程内容", {
						buttons: {
							'确定': function(){
								$(this).dialog("close");
								$form.schTitle.focus();
							}
						}
					});
					return;
				}
				if (postData.schTitle.length > 1000) {
					$.alert("日程字数不能超过1000，超出" + (postData.schTitle.length - 1000) + '字', {
						buttons: {
							'确定': function(){
								$(this).dialog("close");
								$form.schTitle.focus();
							}
						}
					});
					return;
				}
				if (!isSimple) {
					var repeatType = $form.complete_set.find('dl select:visible').val() - 0;
					var from = new Date();
					var to = new Date();
					var otherData = {
						repeatType: repeatType,
						calendarType: $form.chk_lunar.is(':checked') ? 'L' : 'S',
						before_minutes: $form.before_minutes.val(),
						duration: 0,
						repeatCount: '',
						repeatDay: '',
						repeatFrequency: '',
						repeatMonth: '',
						repeatMonthDay: '',
						repeatStopTime: '',
						fromDate: formatDate(from),
						toDate: formatDate(to),
						scheduleId: $form.scheduleId.val()
					};
					if (repeatType != 0) {
						otherData.repeatFrequency = $form.repeatFrequency.val();
						var $rdoEnd = $form.rdo_repeat_cond.filter(':checked'), endVal = $rdoEnd.val();
						if (endVal == 'date') {
							var stime = $form.repeatStopTime.val();
							if (!stime || !/^\d{4}-\d{2}-\d{2}$/.test(stime)) {
								$form.repeatStopTime.val('');
								$.alert("请选择结束日期", {
									buttons: {
										'确定': function(){
											$(this).dialog("close");
											$form.repeatStopTime.focus();
										}
									}
								});
								return;
							}
							otherData.repeatStopTime = stime + ' 00:00:00';
						} else if (endVal == 'times') {
							var stime = parseInt($form.repeatCount.val());
							if (isNaN(stime)) {
								$.alert("请选择结束次数", {
									buttons: {
										'确定': function(){
											$(this).dialog("close");
											$form.repeatCount.val(20).focus().select();
										}
									}
								});
								return;
							}
							otherData.repeatCount = stime;
						}
					}
					var url = $.trim($form.linked_url.val());
					if (/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/.test(url) || url === "") {
						otherData.linked_url = url;
					} else {
						$.alert("系统不支持您输入的url地址，请重新输入", {
							buttons: {
								'确定': function(){
									$(this).dialog("close");
									$form.linked_url.focus().select();
								}
							}
						});
						return;
					}
					otherData.location = $.trim($form.location.val());
					switch (repeatType) {
						case 7:
							otherData.repeatDay = $form.chk_rp_week.filter(':checked').map(function(){ return $(this).val(); }).get().join(':');
							if (!otherData.repeatDay) {
								$.alert("请选择重复时间", {
									buttons: {
										'确定': function(){
											$(this).dialog("close");
										}
									}
								});
								return;
							}
							break;
						case 31:
							var type = $form.rdo_repeat.filter(':checked').val(), d = $form.startTime.datepicker('getDate');
							if (type == 'month') {
								otherData.repeatMonthDay = d.getDate();
							} else {
								otherData.repeatDay = Math.ceil(d.getDate() / 7) + 'SUN MON TUE WED THU FRI SAT'.split(' ')[d.getDay()]
							}
							break;
						case 365:
							var d = $form.startTime.datepicker('getDate');
							otherData.repeatMonth = d.getMonth();
							otherData.repeatMonthDay = d.getDate();
							break;
						case 29:
							otherData.repeatMonthDay = $form.liLunarPicker.lunarPicker('getLunarInfo').date
							break;
						case 354:
							var d = $form.startTime.datepicker('getDate'), l = lunar(d);
							otherData.repeatMonth = l.monthIndex;
							otherData.repeatMonthDay = l.dateIndex + 1;
							break;
						default:
							break;
					}
					postData = $.extend(postData, otherData);
				}

				postData.updateV2Origin = '1';
				
				$form.btnSave.loading('start');
				$.ajax({
					url: '/schedule/updateV2.do',
					type: 'post',
					dataType: 'json',
					data: postData,
					success: function(data){
						$form.btnSave.loading('end');
						$form.find(':input').attr('disabled', false);
						//{"cid":51972177,"schlist":[{"id":51562287,"start_time":"2012-11-01 09:00:00","text":"get up","duration":0,"allday_event":true,"cid":51972177,"repeat_type":1}],"emailList":"meixuexiang@gmail.com","weiboList":" @鍾欣桐","state":"ok"}
						if (data.state == 'ok') {
							//刷新所有的界面
							try{
								js365.runScriptMainWnd("location.reload()");								
							}catch(e){								
							}
							
							$.alert('保存成功',{
								buttons: {
									'确定': function(){
										clientProtocol.closeWnd(6);
									}
								}
							});
							$(".ui-dialog-titlebar-close").hide()

							
						} else if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						} else {
							//{"state":"failed"}
						}
						try {
							js365.downAlarms();
						} catch (e) {
						}
					},
					error: function(data){
						$form.btnSave.loading('end');
					}
				});
				
			});
		}
		//获取所有日历名称
		$.ajax({
			url: '/calendar/getCalendarListByUser.do',
			type: 'post',
			dataType: 'json',
			success: function(data){
				_cldDataList = data;
				$form.calendarId.html(
						$.map(data, function(o){ 
							if(o.access_type == 2 || o.access_type == 3)
							return '<option value="' + o.id + '">' + o.title + '</option>'; 
						}).join(''));
				
				if(_calendarId != null){
					$form.calendarId.val(_calendarId);
					//PC版 workaround
					//需要判断下 data.calendarId在select中是否存在，如果不存在则选择第一个日历
					if($form.calendarId.find("option[value="+_calendarId+"]").size() == 0){
						$form.calendarId.val($form.calendarId.find("option").val());
					}
				}
				var cidParam=$form.calendarId.val();
				var getPublicVal= getPublic(cidParam);
				if(getPublicVal == "true"){
					$form.find(".remind_view").addClass("none");
				}else{
					$form.find(".remind_view").removeClass("none");
				}

			}
		});
		
		return $form;
	}
	function getPublic(cid){
		for (var o, i = 0, l = _cldDataList.length; i < l; i++) {
			o = _cldDataList[i];
			if (o.id == cid) { return o.is_public; }
		}
		return null;
	}
	
	function summary(){
		var arText = [];
		var rpType = $form.complete_set.find('dl select:visible').val() - 0;
		if (rpType) {
			var isLunar = $form.chk_lunar.get(0).checked;
			arText.push(isLunar ? '农历' : '公历');
			var rpTimes = $form.repeatFrequency.val() - 0;
			var unit = {
				1: '天',
				7: '周',
				29: '月',
				31: '月',
				354: '年',
				365: '年',
				5:"法定工作日"
			}[rpType];
			if(rpType != 5){
				arText.push((rpTimes == 1 ? '每' : ('每隔' + rpTimes)) + unit);				
			}else{
				arText.push(unit);				
			}
			if (rpType == 7) {
				var arDays = $form.chk_rp_week.filter(':checked').map(function(){
					return $(this).attr('day');
				}).get();
				if (arDays.length) {
					arText.push('周' + arDays.join('、'));
				}
			} else if (rpType == 31) {
				var type = $form.rdo_repeat.filter(':checked').val(), d = $form.startTime.datepicker('getDate'), strDate = formatDate(d);
				if (type == 'month') {
					arText.push('每月第' + d.getDate() + '天');
				} else {
					arText.push('第' + Math.ceil(d.getDate() / 7) + '个周' + '日一二三四五六'.split('')[d.getDay()]);
				}
			} else if (rpType == 365) {
				var d = $form.startTime.datepicker('getDate'), strDate = formatDate(d);
				arText.push('在' + (d.getMonth() + 1) + '月' + d.getDate() + '日');
			} else if (rpType == 29) {
				var lunarInfo = $form.liLunarPicker.lunarPicker('getLunarInfo');
				arText.push(lunarInfo.cnDate);
			} else if (rpType == 354) {
				var lunarInfo = $form.liLunarPicker.lunarPicker('getLunarInfo');
				arText.push(lunarInfo.cnMonth + lunarInfo.cnDate);
			}
			var $rdoEnd = $form.rdo_repeat_cond.filter(':checked'), endVal = $rdoEnd.val();
			if (endVal == 'date') {
				arText.push('直到' + $form.repeatStopTime.val() + '结束');
			} else if (endVal == 'times') {
				arText.push('重复' + $form.repeatCount.val() + '次后结束');
			} else {
				arText.push('永不结束');
			}
			$form.summary.html($.map(arText, function(t){ return ['<span>', t, '</span>'].join(''); }).join(''));
		}
	}
	
	$.widget('mxx.scheduleCreator', {
		options: {
			onOpen: $.noop
		},
		_create: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			self.showForm(opt.selDate, opt.sid);
		},
		showForm: function(date, sid){
			var self = this, $elem = $(this.element), opt = this.options;
						
			self.$form = getForm(date);
			self.loadData(sid);
		},
		loadData: function(sid){
			var self = this, $elem = $(this.element), opt = this.options;
			if (sid) {
				self.$form.find('h2').html('编辑日程');
				self.$form.find(".add_schedule_bottom").html("保存");
				$.ajax({
					url: '/schedule/getRawScheduleByIdV2.do',
					type: 'post',
					data: {
						scheduleId: sid
					},
					success: function(data){
						if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						} else {
							self.initForm(data);
						}
					},
					error: function(){
					
					},
					dataType: 'json'
				});
			} else {
				self.$form.find('h2').html('添加日程');
				self.$form.find(".add_schedule_bottom").html("添加");
			}
		},
		getOptBySelected: function($tds){
			if (!$tds || $tds.size() == 1) { return {
				repeatType: 0
			}; } else {
				//两个日期相同的为按月重复
				var arDate = $tds.map(function(){
					return new Date($(this).attr('date').replace(/-/g, '/'));
				}).get();
				var tmp = [];
				$.each(arDate, function(i, d){
					i = d.getDate();
					if (i != tmp[0]) {
						tmp.push(i);
					}
				});
				if (tmp.length == 1) { return {
					repeatType: 31,
					repeatFrequency: 1,
					repeatCount: arDate.length
				}; }
				
				//按周重复
				var arDay = $.map(arDate, function(d, i){ return d.getDay(); });
				if (/^(\d+?)\1+$/.test(arDay.join(''))) {
					var days = RegExp.$1.split(''), arVal = 'SUN MON TUE WED THU FRI SAT'.split(' ');
					days = $.map(days, function(day){
						return arVal[day]
					});
					tmp = [];
					for (var i = 0, len = days.length, l = arDate.length / len; i < l; i++) {
						tmp.push(+arDate[i * len]);
					}
					if ($.isProgression(tmp)) { return {
						repeatType: 7,
						repeatFrequency: (tmp[1] - tmp[0]) / (1000 * 3600 * 24 * 7),
						repeatDay: days.join(':'),
						repeatCount: arDay.length
					}; }
				}
				
				//等差数列为按日重复
				tmp = $.map(arDate, function(d, i){ return +d; });
				if ($.isProgression(tmp)) { return {
					repeatType: 1,
					repeatFrequency: (tmp[1] - tmp[0]) / (1000 * 3600 * 24),
					repeatCount: tmp.length
				}; }
				
				return null;
			}
		},
		initForm: function(data){
			var self = this, $elem = $(this.element), opt = this.options;
			var $form = self.$form, $repeatType = $form.complete_set.find('dl select');
			if (data.id !== undefined) {
				$form.scheduleId.val(data.id);
				$form.schTitle.val(data.title);
				$form.alldayEvent.attr('checked', data.allDayEvent).triggerHandler('click');
				var sTime = new Date(data.startTime);
				$form.startTime.datepicker('setDate', sTime);
				
				$form.chk_lunar.attr('checked', data.calendarType == 'L').triggerHandler('click');				
				$form.dlt_start_hour.val(('0' + sTime.getHours()).slice(-2));
				$form.dlt_start_minute.val(('0' + sTime.getMinutes()).slice(-2));
				if (data.calendarType == 'L') {
					$form.liLunarPicker.lunarPicker('setDate', sTime);
					$repeatType = $repeatType.eq(1);
				} else {
					$form.startTime.datepicker('setDate', sTime);
					$repeatType = $repeatType.eq(0);
				}
				
				$repeatType.val(data.repeatType);
				_calendarId = data.calendarId;
				$form.calendarId.val(data.calendarId);
				//PC版 workaround
				//需要判断下 data.calendarId在select中是否存在，如果不存在则选择第一个日历
				if($form.calendarId.find("option[value="+data.calendarId+"]").size() == 0){
					$form.calendarId.val($form.calendarId.find("option").val());
				}
				var cidParam=$form.calendarId.val();
				var getPublicVal= getPublic(cidParam);
				if(getPublicVal == "true"){
					$form.find(".remind_view").addClass("none");
				}else{
					$form.find(".remind_view").removeClass("none");
				}
				
				if (data.repeatType != 0) {
					$form.repeatFrequency.val(data.repeatFrequency);
					if (data.repeatStopTime) {
						$form.rdo_repeat_cond.eq(2).attr('checked', true);
						$form.repeatStopTime.val(formatDate(new Date(data.repeatStopTime)));
					} else if (data.repeatCount) {
						$form.rdo_repeat_cond.eq(1).attr('checked', true);
						$form.repeatCount.val(data.repeatCount);
					} else {
						$form.rdo_repeat_cond.eq(0).attr('checked', true);
					}
				}
				
				switch (data.repeatType) {
					case 7:
						$form.chk_rp_week.each(function(_, $chk){
							$chk = $(this);
							$chk.attr('checked', data.repeatDay.indexOf($chk.val()) > -1);
						});
						break;
					case 31:
						$form.rdo_repeat.eq(!!data.repeatDay).attr('checked', true).click();
						break;
					default:
						break;
				}
				$form.linked_url.val(data.url || '');
				$form.location.val(data.location || '');
			}
			if (data.alarm !== undefined) {
				$form.before_minutes.val(data.alarm);
			}
			$form.schTitle.focus();
			$repeatType.change();
			
			if (this.auto) {
				this.onBeforeSave.call(this, $form);
				$form.find(':input').attr('disabled', true);
				$form.btnSave.click();
				this.auto = false;
				this.onBeforeSave = $.noop;
			}
		},
		autoSave: function(onBeforeSave){
			this.auto = true;
			this.onBeforeSave = onBeforeSave;
		}
	});

	var Global_height = 365;
	$(function(){
		init(6,510);
		var date = new Date();
		if(location.href.indexOf("timestamp") != -1){
			var timestamp = getURLParameter("timestamp");
			date.setTime(timestamp);
		}
		var sid = getURLParameter("sid");
		$("#div_add_schedule").scheduleCreator({selDate:date, sid:sid});
	});
	
	
	function init(id, width){
		$(".close_btn").click(function(){
			if(typeof js365 != "undefined")
				js365.closeWnd(id);
			else
				alert("close");
		});
		$(".min_btn").click(function(){
			if(typeof js365 != "undefined")
				js365.hideWnd(id);
			else
				alert("hide");
		});
		//拖动
		var oriX, oriY;
		var sw = screen.availWidth, sh = screen.availHeight;
		if(typeof js365 != "undefined"){
			oriX = parseInt(js365.getposWndX(id));
			oriY = parseInt(js365.getposWndY(id));
		}
		var draging = false, startX, startY;
		$(document).mousedown(function(evt){
			var name = evt.target.nodeName;
			if (evt.button == 0 && name != 'A' && name != "TEXTAREA"
				&& name != "SELECT" && name != "OPTION") {
				draging = true;
				startX = evt.pageX;
				startY = evt.pageY;
				js365.setCaptureWnd(id);
			}
		}).mousemove(function(evt){
			if (draging == true) {
				var deltaX = evt.pageX - startX, deltaY = evt.pageY - startY;
				oriX = Math.min(oriX + deltaX, sw - width);
				oriY = Math.min(oriY + deltaY, sh - Global_height);
				js365.moveWnd(id, oriX, oriY);
			}
		}).mouseup(function(evt){
			if (draging) {
				draging = false;
				js365.releaseCapture();
			}
		});
		
		typeof js365 != "undefined" && disableSelectAndRightClick();

	}
	
	
	function getURLParameter(name) {
	    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}


	
	
	
	
	
	
	
	
	
	