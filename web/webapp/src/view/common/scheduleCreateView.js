/*
**	scheduleCreateView
*/
define(function(require, exports, module) {
	require("./lunarPicker");
	require("./dialog");
	require("./imageView");
	var $schedule = require("../../server/schedule");
	var $util = require("../../common/util");
	var $progressDialog = require("./progressDialogView");
	
	var self = {};
	module.exports = self;
	
	
	var tmpl = '<div id="div_add_schedule" class="add_schedule_layer complete none"><!--complete simple--><a href="javascript:;" class="close_btn js_close"></a><h2>添加日程</h2><div class="add_schedule_content"><form><input type="hidden" name="scheduleId" value=""/><dl class="e_clear"><dt>内容：</dt><dd><textarea name="schTitle"></textarea></dd></dl><dl class="e_clear"><dt>开始时间：</dt><dd><div class="timetype"><label><input type="checkbox" name="alldayEvent" checked="checked" class="allday_event"/><span>全天</span></label><label><input type="checkbox" name="chk_lunar"/><span>农历</span></label></div><div class="data_box "><ul class="js_datepicker" style="float:left;"><li><input type="text" name="startTime"/></li><li class="none js_lunarPicker"><select name="dlt_from_year"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_month"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_date"><option value="1">初一</option><option value="2">初二</option><option value="3">初三</option><option value="4">初四</option><option value="5">初五</option><option value="6">初六</option><option value="7">初七</option><option value="8">初八</option><option value="9">初九</option><option value="10">初十</option><option value="11">十一</option><option value="12">十二</option><option value="13">十三</option><option value="14">十四</option><option value="15">十五</option><option value="16">十六</option><option value="17">十七</option><option value="18">十八</option><option value="19">十九</option><option value="20">二十</option><option value="21">廿一</option><option value="22">廿二</option><option value="23">廿三</option><option value="24">廿四</option><option value="25">廿五</option><option value="26">廿六</option><option value="27">廿七</option><option value="28">廿八</option><option value="29">廿九</option><option value="30">三十</option></select></li></ul>&nbsp;<div class="hour js_time none"><select name="dlt_start_hour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><span>时</span><select name="dlt_start_minute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select><span>分</span></div></div></dd></dl>'+
	//'<div class="complete_time_calender"><dl class="e_clear"><dt>日历：</dt><dd><select name="calendarId"></select></dd></dl></div>'+
	'<div class="complete_content"><div class="complete_set s-no">'+
	'<dl class="e_clear"><dt>添加图片：</dt><dd><a href="javascript:void(0)" class="upload_image_link">本地上传</a><ddd id="image_thumb"></ddd></dd></dl>' +
	'<dl class="st1 e_clear"><dt>重复类型：</dt><dd><select><option mode="s-no" value="0">不重复</option><option mode="s-t" value="2">阶段日程</option><option mode="s-dy" value="1">按天</option><option mode="s-w" value="7">按周</option><option mode="s-m" value="31">按月</option><option mode="s-dy" value="365">按年</option></select></dd></dl><dl class="st2 e_clear"><dt>重复类型：</dt><dd><select><option mode="l-no" value="0">不重复</option><option mode="l-my" value="29">农历每月</option><option mode="l-my" value="354">农历每年</option></select></dd></dl><dl class="st3 e_clear"><dt>重复频率：</dt><dd>每<select name="repeatFrequency"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option></select><span class="js_rp_unit">周</span></dd></dl><dl class="st4 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_month"><label><input type="radio" name="rdo_repeat" checked="checked" value="month"/><span>一个月的某一天</span></label><label><input type="radio" name="rdo_repeat" value="week"/><span>一周的某一天</span></label></dd></dl><dl class="st5 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_week"><label><input type="checkbox" name="chk_rp_week" day="一" value="MON"/><span>一</span></label><label><input type="checkbox" name="chk_rp_week" day="二" value="TUE"/><span>二</span></label><label><input type="checkbox" name="chk_rp_week" day="三" value="WED"/><span>三</span></label><label><input type="checkbox" name="chk_rp_week" day="四" value="THU"/><span>四</span></label><label><input type="checkbox" name="chk_rp_week" day="五" value="FRI"/><span>五</span></label><label><input type="checkbox" name="chk_rp_week" day="六" value="SAT"/><span>六</span></label><label><input type="checkbox" name="chk_rp_week" day="日" value="SUN"/><span>日</span></label>&nbsp;<a href="javascript:;" class="js-work-day" title="只选择工作日">工作日</a>&nbsp;<a href="javascript:;" class="js-rest-day" title="只选择双休日">双休日</a></dd></dl><dl class="st6 e_clear"><dt>结束条件：</dt><dd class="end_data"><ul><li><label><input type="radio" name="rdo_repeat_cond" value="never" checked="checked"/><span>从不</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="times" id="rdo_repeat_cond_1"/><span>发生</span></label><input type="text" class="end_data_text1" name="repeatCount" value="20"/><label for="rdo_repeat_cond_1"><span>次后</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="date"/><span>在</span></label><input type="text" name="repeatStopTime" class="end_data_text2"/></li></ul></dd></dl>'+
	'<dl class="st8 e_clear"><dt>结束时间：</dt><dd class="end_time"><input type="text" name="endTime"/><div class="hour js_time"><select name="dlt_end_hour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><span>时</span><select name="dlt_end_minute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select><span>分</span></div></dd></dl>'+
	'<dl class="st7 e_clear"><dt>摘要：</dt><dd class="summary"></dd></dl>'+
	'<dl class="remind e_clear rToday"><dt>提醒设置：</dt><dd><label class="remind_0"><input type="checkbox" value="0"/><span>正点</span></label><label class="remind_5"><input type="checkbox" value="5"/><span>5分前</span></label><label class="remind_10"><input type="checkbox" value="10"/><span>10分前</span></label><label class="remind_30"><input type="checkbox" value="30"/><span>30分前</span></label><label class="remind_60"><input type="checkbox" value="60"/><span>1小时前</span></label><label class="remind_today"><input type="checkbox" value="0"/><span>当天</span></label><label class="remind_1440"><input type="checkbox" value="1440"/><span>1天前</span></label><label class="remind_4320"><input type="checkbox" value="4320"/><span>3天前</span></label></dd></dl>'+
	'<dl class="e_clear"><dt>关联URL：</dt><dd><input type="text" size="50" name="linked_url"/></dd></dl><dl class="e_clear"><dt>地址：</dt><dd><input type="text" size="50" name="location"/></dd></dl></div></div></form></div><div class="add_schedule_bottom"><a href="javascript:;" class="giveup_schedule_btn js_close">放弃</a><a href="javascript:;" class="create_schedule_btn js_save">保存</a><a href="javascript:;" class="simple_more">详细设置</a><div class="layer_arrow"><em class="arrow_1 ui-shadow"></em><em class="arrow_2 ui-shadow"></em><em class="arrow_3 ui-shadow"></em><em class="arrow_4 ui-shadow"></em><em class="arrow_5 ui-shadow"></em><em class="arrow_6 ui-shadow"></em><em class="arrow_7 ui-shadow"></em><em class="arrow_8 ui-shadow"></em><em class="arrow_9 ui-shadow"></em><em class="arrow_10 ui-shadow"></em><em class="arrow_11 ui-shadow"></em><em class="arrow_12 ui-shadow"></em></div></div></div>';
	var tmplMask = '<div style="z-index: 500;width: 100%;height: 100%;overflow: hidden;-webkit-user-select: none;" class="ui-widget-overlay"></div>';
	
	var $form;
	var $mask;
	var imageContainer = $("#image_upload_container");
	
	function init(onScheduleCreated, option){
		//日程创建成功 callback
		self.onScheduleCreated = onScheduleCreated;
		self.option = option;
		$form = $(tmpl).appendTo('body');
		$mask = $(tmplMask).appendTo('body');
		$form.hide();
		$mask.hide();
		//创建所有的input对象
		$form.find(':input[name]').each(function(){
			var $elem = $(this), name = $elem.attr('name');
			$form[name] = $form[name] ? $form[name].add($elem) : $elem;
		});
		$form.summary = $form.find('dd.summary');
		$form.liLunarPicker = $form.find('li.js_lunarPicker');
		$form.complete_set = $form.find('div.complete_set');
		$form.btnSave = $form.find('a.js_save');
		$form.mapAddressBtn = $form.find("a.js_map_address");
		
		initSelect();
		var ALLTYPE = 's-no s-dy s-m s-w l-no l-my s-t';
		
		//TODO: 内容要限制字数
		$form.find('a.js_close').click(function(){
			close();
			//$form.hide('fade');
			//$mask.hide('fade');
			//$("#image_upload_container").hide('fade');
			//$form.removeData('fromTd');
			//G.cldPanel.calendarPanel('cancelSelect');
		});
		$form.alldayEvent.click(function(evt){
			$form.find('div.js_time')[this.checked ? 'addClass' : 'removeClass']('none');
			//设置提醒项
			$form.find('dl.remind')[this.checked ? 'addClass' : 'removeClass']('rToday');
			if (this.checked) {
				$form.dlt_start_hour.val('09');
				$form.dlt_start_minute.val('00');
				$form.dlt_end_hour.val('09');
				$form.dlt_end_minute.val('00');
				$form.find(".remind_5 input").prop("checked", false);
				$form.find(".remind_10 input").prop("checked", false);
				$form.find(".remind_30 input").prop("checked", false);
				$form.find(".remind_60 input").prop("checked", false);
				if($form.find(".remind_0 input").prop("checked")){
					$form.find(".remind_today input").prop("checked", true);						
				}
			}else{
				if($form.find(".remind_today input").prop("checked")){
					$form.find(".remind_0 input").prop("checked", true);						
				}
			}
			summary();
		});
		//上传图片
		$form.find(".upload_image_link").click(function(){
			$form.addClass("div_add_schedule_image");
			imageContainer.imageCreator("show", $form.position().top);
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
		
		$form.startTime.add($form.repeatStopTime).add($form.endTime).datepicker(getDPOptions({
			onSelect: function(dateText, inst){
				summary();
			}
		}));
		/*
		$form.repeatCount.input({
			onInput: function(val){
				summary();
			}
		});
		*/
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
			$form.chk_rp_week.prop('checked', false);
			($(this).hasClass('js-work-day') ? $form.chk_rp_week.slice(0, 5) : $form.chk_rp_week.slice(-2)).prop('checked', true);
			summary();
		});
		
		//$form.btnSave.loading();
		$form.btnSave.click(function(evt){
			if (evt.isImmediatePropagationStopped() ) { return false; }
			evt.preventDefault();
			//保存日程
			saveSchedule();
		});		
	}
	//fuck tencent
	function initSelect(){
		if(!$().selecter)
			return;
		$form.complete_set.find('dl.st1 select').selecter();
		$form.complete_set.find('dl.st2 select').selecter();
		$form.dlt_start_hour.selecter();
		$form.dlt_start_minute.selecter();
		$form.dlt_end_hour.selecter();
		$form.dlt_end_minute.selecter();
		$form.repeatFrequency.selecter();
	}
	
	//显示摘要
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
				365: '年'
			}[rpType];
			arText.push((rpTimes == 1 ? '每' : ('每隔' + rpTimes)) + unit);
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
	
	function saveSchedule(){
		var calendarId;
		//TODO G.cid
		if(typeof(G) == "undefined"){
			calendarId = self.cid
		}else{
			calendarId = G.cid;
		}
		var isSimple = $form.hasClass('simple'), postData = {
			schTitle: $.trim($form.schTitle.val()),
			alldayEvent: $form.alldayEvent.is(':checked'),
			calendarId: calendarId,
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
		var before_minutes_array=[];
		$form.find(".remind label").each(function(){
            var $elem = $(this), $r = $elem.find('input'), $rvalue = $elem.find('input').val();
            if (!$elem.is(":visible")) {
                return;
            }
            if ($r.prop("checked")) {
                before_minutes_array.push($rvalue);
            }
		})
		
		
		if (!isSimple) {
			var repeatType = $form.complete_set.find('dl select:visible').val() - 0;
			var duration = 0;
			//判断是否是阶段日程
			if(repeatType == 2){
				repeatType = 0;
				var startTime = new Date(postData.startTime.replace(/-/g, '/'));
				var endTime = [formatDate($form.endTime.datepicker("getDate")), " ",  $form.dlt_end_hour.val(), ':', $form.dlt_end_minute.val(), ':00'].join('').replace(/-/g, '/');
				endTime = new Date(endTime);
				duration = (endTime.getTime() - startTime.getTime()) / 1000;
				if(duration < 0){
					$.alert("结束时间不能晚于开始时间", {
						buttons: {
							'确定': function(){
								$(this).dialog("close");
							}
						}
					});
					return;
				}
			}
			var otherData = {
				repeatType: repeatType,
				calendarType: $form.chk_lunar.is(':checked') ? 'L' : 'S',
				before_minutes: before_minutes_array.join(","),
				fromDate: formatDate(self.dateRange.from),
				toDate: formatDate(self.dateRange.to),
				duration: duration,
				repeatCount: '',
				repeatDay: '',
				repeatFrequency: '',
				repeatMonth: '',
				repeatMonthDay: '',
				repeatStopTime: '',
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
		$progressDialog.show("正在为您保存日程...");
		if(!isSimple){
			
			if($("#image_upload_container").imageCreator("shouldUploadImage")){
				$("#image_upload_container").imageCreator("uploadImage");
				return;
			}else{
				var imageList = $("#image_upload_container").imageCreator("getImageList");
				if(imageList.length > 0){
					postData.pics = JSON.stringify(imageList);
				}
			}
		}
		
		
		$schedule.updateV2(postData, function(data){
			$form.find(':input').attr('disabled', false);
			if (data.state == 'ok') {
				if(postData.scheduleId == "" && self.option){
					var sid = data.schlist && data.schlist[0] && data.schlist[0].id;
					$schedule.setRedhot(self.option, sid);
				}
				self.onScheduleCreated(data, postData.scheduleId);
				close();
				$progressDialog.close();
				
				//G.cldPanel.calendarPanel('cancelSelect');
				//postData.scheduleId && G.cldPanel.calendarPanel('deleteScheduleData', postData.scheduleId);
				//G.cldPanel.calendarPanel('mergeScheduleData', data);
				//G.cldPanel.calendarPanel('refresh');
				
				var notice = [];
				if (data.emailList) {
					notice.push("发送邮件提醒给(" + data.emailList + ")");
				}
				if (data.weiboList) {
					notice.push("发送微博提醒给(" + data.weiboList + ")");
				}
				if (notice.length) {
					notice.unshift('您的一些小组日历成员还没有注册365日历，<br/>需要通过如下方式通知TA们这条日程吗？');
					$.confirm(notice.join('<br/>'), {
						width: 400,
						buttons: [{
							text: "通知",
							click: function(){
								var dialog = this;
								$.ajax({
									type: 'post',
									data: {
										cid: data.cid,
										scheduleId: data.schlist[0].id
									},
									url: '/schedule/sendNotice.do',
									success: function(result){
										if (result.state == "ok") {
											$.alert("发送提醒成功！", {
												buttons: {
													'确定': function(){
														$(dialog).dialog('close');
														$(this).dialog('close');
													}
												}
											});
										} else {
											$.alert("发送提醒失败！");
										}
									},
									dataType: 'json'
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
			} else if (data.state == 'wrongpass') {
				$.alert('对不起，您的登录已经过期，请重新打开应用！');
				$progressDialog.close();
			} else {
				//{"state":"failed"}
				$.alert('对不起，保存日历出错啦');
				$progressDialog.close();
			}	
		}, function(error){
			//$form.btnSave.loading('end');
			$progressDialog.close();
		});
	}
	
	function formatDate(date){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	} 
	
	
	function getDPOptions(opt){
		return $.extend({
			closeText: '关闭',
			prevText: '&#x3C;上月',
			nextText: '下月&#x3E;',
			currentText: '今天',
			monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
			dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
			weekHeader: '周',
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: '年'
		}, opt)
	}
	function loadData(sid, currentDate, initData, scheduleContentStr){
		var self = this;
		if (sid) {
			$form.find('h2').html('编辑日程');
			$schedule.getRawScheduleByIdV2(sid, function(data){
				if(data.state == 'wrongpass') {
					$.alert('对不起，您的登录已经过期，请重新打开本应用');
				} else {
					initForm(data);
					//get pics
					$schedule.getpics(data, function(imageData){
						if(imageData.state == "ok"){
							$("#image_upload_container").imageCreator({
								saveSchedule:saveSchedule,
								pics: imageData.pics,
								pic_url: imageData.pic_url
							});
							$form.find("#image_thumb").html($.map(imageData.pics, function(o, index){
								return "<img src='"+imageData.pic_url + o.pic+"' style='width:32px;height:32px;margin-left:5px;'/>";
							}).join(""));
						}
					});					
				}
			});
		} else {
			$form.find('h2').html('添加日程');
			initForm($.extend({
				title: scheduleContentStr ? scheduleContentStr : '',
				id: '',
				allDayEvent: true,
				calendarType: 'S',
				startTime: currentDate,
				before_minutes: '0',
				repeatType: 0,
				//calendarId: G.cldList.calendarList('getSelectedCalendarIDs')[0] || self.$form.calendarId.find('option:first').attr('value'),
				scheduleId: ''
			}, initData));
		}
	}
	function initForm(data){
		var $repeatType = $form.complete_set.find('dl select');
		if (data.id !== undefined) {
			$form.scheduleId.val(data.id);
			$form.schTitle.val($util.decodeHtml(data.title));
			$form.alldayEvent.prop('checked', data.allDayEvent).triggerHandler('click');
			var sTime = new Date(data.startTime);
			var endTime = new Date(sTime.getTime() + 86400000);
			$form.startTime.datepicker('setDate', sTime);
			$form.endTime.datepicker('setDate', endTime);
			$form.chk_lunar.prop('checked', data.calendarType == 'L').triggerHandler('click');
			$form.dlt_start_hour.val(('0' + sTime.getHours()).slice(-2));
			$form.dlt_start_minute.val(('0' + sTime.getMinutes()).slice(-2));
			
			$().selecter && $form.dlt_start_hour.change();
			$().selecter && $form.dlt_start_minute.change();

			if (data.calendarType == 'L') {
				$form.liLunarPicker.lunarPicker('setDate', sTime);
				$repeatType = $repeatType.eq(1);
			} else {
				$form.startTime.datepicker('setDate', sTime);
				$repeatType = $repeatType.eq(0);
			}
			
			$repeatType.val(data.repeatType);
			//$form.calendarId.val(data.calendarId);
			
			if (data.repeatType != 0) {
				$form.repeatFrequency.val(data.repeatFrequency);
				if (data.repeatStopTime) {
					$form.rdo_repeat_cond.eq(2).prop('checked', true);
					$form.repeatStopTime.val(formatDate(new Date(data.repeatStopTime)));
				} else if (data.repeatCount) {
					$form.rdo_repeat_cond.eq(1).prop('checked', true);
					$form.repeatCount.val(data.repeatCount);
				} else {
					$form.rdo_repeat_cond.eq(0).prop('checked', true);
				}
			}
			
			if(data.duration > 0){
				var endTime = new Date(sTime.getTime() + data.duration * 1000);
				$repeatType.val(2);
				$form.endTime.datepicker('setDate', endTime);
				$form.dlt_end_hour.val(('0' + endTime.getHours()).slice(-2));
				$form.dlt_end_minute.val(('0' + endTime.getMinutes()).slice(-2));
			}
			
			switch (data.repeatType) {
				case 7:
					$form.chk_rp_week.each(function(_, $chk){
						$chk = $(this);
						$chk.prop('checked', data.repeatDay.indexOf($chk.val()) > -1);
					});
					break;
				case 31:
					$form.rdo_repeat.eq(!!data.repeatDay).prop('checked', true).click();
					break;
				default:
					break;
			}
			$form.linked_url.val(data.url || '');
			$form.location.val(data.location || '');
		}
		//初始化的时候先把所有提醒置为false
		$form.find(".remind label input").prop("checked", false);
		if (data.alarm !== undefined) {
			if(data.alarm != ""){
				var alarm_ary = data.alarm.split(",");
				for(var i=0; i < alarm_ary.length; i++){
					var alarm_minutes = alarm_ary[i];
					$form.find(".remind_" + alarm_minutes + " input").prop("checked", true);
					if(alarm_minutes == 0){
						$form.find(".remind_today input").prop("checked", true);	
					}
				}	
			}
		}else if(data.id == ""){
			$form.find(".remind_today input").prop("checked", true);
			$form.find(".remind_0 input").prop("checked", true);
		}
		
		$form.schTitle.focus();
		$repeatType.change();
		/*
		if (this.auto) {
			this.onBeforeSave.call(this, $form);
			$form.find(':input').attr('disabled', true);
			$form.btnSave.click();
			this.auto = false;
			this.onBeforeSave = $.noop;
		}
		*/
		$form.find("#image_thumb").empty();
		imageContainer.imageCreator({saveSchedule:saveSchedule, pics:[]});
	}
	function show(dateRange, currentDate, sid, $tds, cid){
		var initData;
		self.cid = cid;
		if($tds){
			initData = getOptBySelected($tds);
		}
		loadData(sid, currentDate, initData);
		self.dateRange = dateRange;
		open();
	}
	
	function open(){
		$form.show();
		$mask.css("height", document.body.scrollHeight + "px").show();
	}
	
	
	function close(){
		$form.hide();
		$form.removeClass("div_add_schedule_image");
		$mask.hide("fade");
		imageContainer.hide("fade");
		$form.removeData('fromTd');
		//TODO workaround
		$(".day_box_td ").removeClass("selected")

	}
	function getOptBySelected($tds){
		if (!$tds || $tds.size() == 1) { 
			return {repeatType: 0}; 
		} else {
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
				if ($util.isProgression(tmp)) { return {
					repeatType: 7,
					repeatFrequency: (tmp[1] - tmp[0]) / (1000 * 3600 * 24 * 7),
					repeatDay: days.join(':'),
					repeatCount: arDay.length
				}; }
			}
			
			//等差数列为按日重复
			tmp = $.map(arDate, function(d, i){ return +d; });
			if ($util.isProgression(tmp)) { return {
				repeatType: 1,
				repeatFrequency: (tmp[1] - tmp[0]) / (1000 * 3600 * 24),
				repeatCount: tmp.length
			}; }
			
			return null;
		}
	}
	
	function addNotice(dateRange, s, cid){
		var postData = {
			schTitle: s.text,
			alldayEvent: s.allday_event,
			calendarId: cid,
			startTime: s.start_time,
			timeZone: -(new Date()).getTimezoneOffset() / 60,
			repeatType: 0,
			calendarType: 'S',
			before_minutes: '',
			fromDate: formatDate(dateRange.from),
			toDate: formatDate(dateRange.to),
			duration: s.duration,
			repeatCount: '',
			repeatDay: '',
			repeatFrequency: '',
			repeatMonth: '',
			repeatMonthDay: '',
			repeatStopTime: '',
			scheduleId: '',
			linked_url: '',
			location: ''
		};
		if(s.url){
			postData.linked_url = s.url;
		}
		if(s.location){
			postData.location = s.location;
		}
		$progressDialog.show("添加提醒...");
		$schedule.updateV2(postData, function(data){
			if (data.state == 'ok') {
				$progressDialog.close();
				$.alert('添加提醒成功');
			} else if (data.state == 'wrongpass') {
				$.alert('对不起，您的登录已经过期，请重新打开应用！');
				$progressDialog.close();
			} else {
				//{"state":"failed"}
				$.alert('对不起，保存日历出错啦');
				$progressDialog.close();
			}	
		}, function(error){
			$progressDialog.close();
		});
	}
	
	function createFirstSchedule(title, cid, render){
		var date = new Date();
		var postData = {
			schTitle: title + "日历建好了，大家可以在这里发布活动，记录群内大事。\n本日历由365日历提供，如使用中遇到任何问题，可以加QQ群92767096联系365日历客服。",
			alldayEvent: true,
			calendarId: cid,
			startTime: $util.formatDateTime(date),
			timeZone: -(date).getTimezoneOffset() / 60,
			repeatType: 0,
			calendarType: 'S',
			before_minutes: '',
			fromDate: formatDate(date),
			toDate: formatDate(date),
			duration: 0,
			repeatCount: '',
			repeatDay: '',
			repeatFrequency: '',
			repeatMonth: '',
			repeatMonthDay: '',
			repeatStopTime: '',
			scheduleId: '',
			linked_url: '',
			location: ''
		};
		$schedule.updateV2(postData, function(data){
			if(data.state == "ok"){
				if(postData.scheduleId == "" && self.option){
					var sid = data.schlist && data.schlist[0] && data.schlist[0].id;
					$schedule.setRedhot(self.option, sid);
				}
			}
			render(data);
		});
	}
	
	//exports method
	self.init = init;
	self.show = show;
	self.addNotice = addNotice;
	self.createFirstSchedule = createFirstSchedule;
});
