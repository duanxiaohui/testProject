(function(){
	var $form;
	function getForm(){
		if ($form) {
			/**
			 * 清理长编辑模式
			 */
			if ( $form.longMode ) {
				$form.schTitle.parents('dl').remove();
				$form.schTitle = $form.schDescription;
				$form.schTitle.propertychange(checkTitleLen);
				delete $form.longMode;
				delete $form.schDescription;
			}
		}
		else{
			var tmpl = '<div id="div_add_schedule" class="add_schedule_layer complete ui-shadow none"><!--complete simple--><a href="javascript:;" class="close_btn js_close"></a><h2></h2><div class="add_schedule_content"><form><input type="hidden" name="scheduleId" value=""/><dl class="e_clear"><dt>内容：</dt><dd><textarea name="schTitle"></textarea></dd></dl><dl class="e_clear"><dt>开始时间：</dt><dd><div class="timetype"><label><input type="checkbox" name="alldayEvent" checked="checked"/><span>全天</span></label><label><input type="checkbox" name="chk_lunar"/><span>农历</span></label></div><div class="data_box "><ul class="js_datepicker" style="float:left;"><li><input type="text" name="startTime"/></li><li class="none js_lunarPicker"><select name="dlt_from_year"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_month"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select><select name="dlt_from_date"><option value="1">初一</option><option value="2">初二</option><option value="3">初三</option><option value="4">初四</option><option value="5">初五</option><option value="6">初六</option><option value="7">初七</option><option value="8">初八</option><option value="9">初九</option><option value="10">初十</option><option value="11">十一</option><option value="12">十二</option><option value="13">十三</option><option value="14">十四</option><option value="15">十五</option><option value="16">十六</option><option value="17">十七</option><option value="18">十八</option><option value="19">十九</option><option value="20">二十</option><option value="21">廿一</option><option value="22">廿二</option><option value="23">廿三</option><option value="24">廿四</option><option value="25">廿五</option><option value="26">廿六</option><option value="27">廿七</option><option value="28">廿八</option><option value="29">廿九</option><option value="30">三十</option></select></li></ul>&nbsp;<div class="hour js_time none"><select name="dlt_start_hour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><span>时</span><select name="dlt_start_minute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select><span>分</span></div></div></dd></dl><div class="complete_time_calender"><dl class="e_clear"><dt>日历：</dt><dd><select name="calendarId"></select></dd></dl></div><div class="complete_content"><div class="complete_set s-no">'+
			'<dl class="e_clear"><dt>添加图片：</dt><dd><a href="javascript:void(0)" class="upload_image_link">本地上传</a><ddd id="image_thumb"></ddd></dd></dl>' +
			'<dl class="st1 e_clear"><dt>重复类型：</dt><dd><select><option mode="s-no" value="0">不重复</option><option mode="s-t" value="2">阶段日程</option><option mode="s-dy" value="1">按天</option><option mode="s-w" value="7">按周</option><option mode="s-m" value="31">按月</option><option mode="s-dy" value="365">按年</option><option mode="s-dwd" value="5">法定工作日</option></select></dd></dl><dl class="st2 e_clear"><dt>重复类型：</dt><dd><select><option mode="l-no" value="0">不重复</option><option mode="l-my" value="29">农历每月</option><option mode="l-my" value="354">农历每年</option></select></dd></dl><dl class="st3 e_clear"><dt>重复频率：</dt><dd>每<select name="repeatFrequency"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option></select><span class="js_rp_unit">周</span></dd></dl><dl class="st4 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_month"><label><input type="radio" name="rdo_repeat" checked="checked" value="month"/><span>一个月的某一天</span></label><label><input type="radio" name="rdo_repeat" value="week"/><span>一周的某一天</span></label></dd></dl><dl class="st5 e_clear"><dt>重复时间：</dt><dd class="repetition_time js_rp_week"><label><input type="checkbox" name="chk_rp_week" day="一" value="MON"/><span>一</span></label><label><input type="checkbox" name="chk_rp_week" day="二" value="TUE"/><span>二</span></label><label><input type="checkbox" name="chk_rp_week" day="三" value="WED"/><span>三</span></label><label><input type="checkbox" name="chk_rp_week" day="四" value="THU"/><span>四</span></label><label><input type="checkbox" name="chk_rp_week" day="五" value="FRI"/><span>五</span></label><label><input type="checkbox" name="chk_rp_week" day="六" value="SAT"/><span>六</span></label><label><input type="checkbox" name="chk_rp_week" day="日" value="SUN"/><span>日</span></label>&nbsp;<a href="javascript:;" class="js-work-day" title="只选择工作日">工作日</a>&nbsp;<a href="javascript:;" class="js-rest-day" title="只选择双休日">双休日</a></dd></dl><dl class="st6 e_clear"><dt>结束条件：</dt><dd class="end_data"><ul><li><label><input type="radio" name="rdo_repeat_cond" value="never" checked="checked"/><span>从不</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="times" id="rdo_repeat_cond_1"/><span>发生</span></label><input type="text" class="end_data_text1" name="repeatCount" value="20"/><label for="rdo_repeat_cond_1"><span>次后</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="date"/><span>在</span></label><input type="text" name="repeatStopTime" class="end_data_text2"/></li></ul></dd></dl>'+
			'<dl class="st8 e_clear"><dt>结束时间：</dt><dd class="end_time"><input type="text" name="endTime"/><div class="hour js_time"><select name="dlt_end_hour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><span>时</span><select name="dlt_end_minute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select><span>分</span></div></dd></dl>'+
			'<dl class="st7 e_clear"><dt>摘要：</dt><dd class="summary"></dd></dl>'+
			'<dl class="remind e_clear"><dt>提醒设置：</dt><dd><label class="remind_0"><input type="checkbox" value="0"/><span>正点</span></label><label class="remind_5"><input type="checkbox" value="5"/><span>5分前</span></label><label class="remind_10"><input type="checkbox" value="10"/><span>10分前</span></label><label class="remind_30"><input type="checkbox" value="30"/><span>30分前</span></label><label class="remind_60"><input type="checkbox" value="60"/><span>1小时前</span></label><label class="remind_today"><input type="checkbox" value="0"/><span>当天</span></label><label class="remind_1440"><input type="checkbox" value="1440"/><span>1天前</span></label><label class="remind_4320"><input type="checkbox" value="4320"/><span>3天前</span></label></dd></dl>'+
			'<dl class="e_clear"><dt>关联URL：</dt><dd><input type="text" size="50" name="linked_url"/></dd></dl><dl class="e_clear"><dt>地址：</dt><dd><input type="text" size="50" name="location"/><a class="js_map_address" href="javascript:void(0)">在地图上标记</a></dd></dl></div></div></form></div><div class="add_schedule_bottom"><a href="javascript:;" class="giveup_schedule_btn js_close">放弃</a><a href="javascript:;" class="create_schedule_btn js_save">保存</a><a href="javascript:;" class="simple_more">详细设置</a><div class="layer_arrow"><em class="arrow_1 ui-shadow"></em><em class="arrow_2 ui-shadow"></em><em class="arrow_3 ui-shadow"></em><em class="arrow_4 ui-shadow"></em><em class="arrow_5 ui-shadow"></em><em class="arrow_6 ui-shadow"></em><em class="arrow_7 ui-shadow"></em><em class="arrow_8 ui-shadow"></em><em class="arrow_9 ui-shadow"></em><em class="arrow_10 ui-shadow"></em><em class="arrow_11 ui-shadow"></em><em class="arrow_12 ui-shadow"></em></div></div></div>';
			
			$form = $(tmpl).appendTo('body');
			
			$form.find(':input[name]').each(function(){
				var $elem = $(this), name = $elem.attr('name');
				$form[name] = $form[name] ? $form[name].add($elem) : $elem;
			});
			$form.summary = $form.find('dd.summary');
			$form.liLunarPicker = $form.find('li.js_lunarPicker');
			$form.complete_set = $form.find('div.complete_set');
			$form.btnSave = $form.find('a.js_save');
			$form.mapAddressBtn = $form.find("a.js_map_address");
			
			var ALLTYPE = 's-no s-dy s-m s-w l-no l-my s-t s-dwd';
			
			$form.draggable({
				containment: 'body',
				handle: 'h2',
				cancel: 'a',
				cursor: "move",
				opacity: 0.85,
				drag: function(){
					if ($form.hasClass('simple')) {
						var $tb = $('#div_calendar_panel table.calendar_table'), cor = $tb.position();
						var pos = $form.find('div.layer_arrow em:last').offset();
						pos.top -= cor.top;
						pos.left -= cor.left;
						if (pos.top >= 0 && pos.left >= 0) {
							var width = $tb.width(), height = $tb.height(), uw = Math.floor(width / 7), uh = Math.floor(height / 6);
							var y = Math.floor(pos.left / uw), x = Math.floor(pos.top / uh);
							var $td = $tb.find('td').eq(x * 7 + y), date = $td.attr('date');
							$form.startTime.datepicker('setDate', date);
						}
					}
				}
			});

			/**
			 * 标题输入监听
			 */
			$form.schTitle.propertychange(checkTitleLen);


			$form.find('a.js_close').click(function(){
				$form.hide('fade');
				$("#image_upload_container").hide('fade');
				$form.removeData('fromTd');
				G.cldPanel.calendarPanel('cancelSelect');
			});
			//点击其他区域的时候隐藏窗口
			$("#div_calendar_list").add("#div_today").click(function(e){
				if(e.target.id !== $form.attr("id") && !$.contains($form[0], e.target)){
					$form.hide('fade');
					$("#image_upload_container").hide('fade');
					$form.removeData('fromTd');
					G.cldPanel.calendarPanel('cancelSelect');
				}
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
					$form.find(".remind_5 input").attr("checked", false);
					$form.find(".remind_10 input").attr("checked", false);
					$form.find(".remind_30 input").attr("checked", false);
					$form.find(".remind_60 input").attr("checked", false);
					if($form.find(".remind_0 input").attr("checked") == "checked"){
						$form.find(".remind_today input").attr("checked", "checked");						
					}
				}else{
					if($form.find(".remind_today input").attr("checked") == "checked"){
						$form.find(".remind_0 input").attr("checked", "checked");						
					}
				}
				summary();
			});
			
			$form.find(".upload_image_link").click(function(){
				$form.css("left","100px");
				$("#image_upload_container").imageCreator("show", $form.position().top);
			});
			
			$form.find(".complete_time_calender select").change(function() {
				var cid=$(this).val();
				var getPublicVal= G.cldList.calendarList('getPublic',cid);
				if(getPublicVal == "true"){
					$form.find(".remind").addClass("none");
					$form.find(".remind_today input").attr("checked", false);
				}else{
					$form.find(".remind").removeClass("none");
					$form.find(".remind_today input").attr("checked", "checked");
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
			
			$form.startTime.add($form.repeatStopTime).add($form.endTime).datepicker($.getDPOptions({
				onSelect: function(dateText, inst){
					summary();
				}
			}));
			
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
				//保存日程
				saveSchedule();
			});
		}
		window.setMapLocation = function(name, lng, lat){
			$("#baidu_map_div").remove();			
			$form.location.val(name + "@" + lng + "," + lat)
		}
		window.closeMapLocation = function(){
			$("#baidu_map_div").remove();
		}
		$form.mapAddressBtn.click(function(){
			var map = $("#baidu_map_div");
			if(!map[0]){
				map = $("<div id='baidu_map_div'><iframe src='" +
						"/baidumap.html'></iframe></div>").appendTo("body");
			}
			var address = $.trim($form.location.val());
			if(address == ""){
				map.find("iframe").attr("src", "/baidumap.html");
			}else{
				address = address.split("@")[0];
				map.find("iframe").attr("src", "/baidumap.html?address=" + address);				
			}
			map.show();
		});
		
		//获取所有日历名称
		$form.calendarId.html($.map(G.cldList.calendarList('getAllCalendarNames', true), function(o){ return '<option value="' + o.id + '">' + o.name + '</option>'; }).join(''));
		//TODO: 表单重置
		var Ccid=G.cldList.calendarList('getSelectedCalendarIDs')[0];
		var CgetPublicVal= G.cldList.calendarList('getPublic',Ccid);
		if(CgetPublicVal == "true"){
			$form.find(".remind").addClass("none");
			$form.find(".remind_today input").attr("checked", false);
		}else{
			$form.find(".remind").removeClass("none");
			$form.find(".remind_today input").attr("checked", "checked");
		}
		return $form;
	}
	/**
	 * 检测标题长度
	 */
	var titleLen = 25, maxLen = 1000;
	function checkTitleLen () {
		var _me = $(this);
		var _v = $.trim(_me.val());
		if( _v.length > maxLen ) {
			if( $form.longMode ) {
				$form.schTitle.addClass('tooLong');
				return;
			}
			$.alert('字数超过' + maxLen + '字，请切换至长文章编辑', {
				buttons: {
					'确定': function () {
						changeToLongMode()
						$(this).dialog("close");

					},
					'取消': function () {
						_me.val(_v.substr(0, maxLen));
						_me.focus();
						$(this).dialog("close");
					}
				}
			});
		}
		else{
			if( $form.longMode ) {
				$form.schTitle.removeClass('tooLong');
			}
		}
	}
	function changeToLongMode () {
		var _me = $form.schTitle;
		var _v = $.trim(_me.val());
		var Temp_v = _v.split(/\s/), _title = _desc = '', titleBox;

		if ( Temp_v[0].length > titleLen ) {
			_title = _v.substr(0, titleLen);
			_desc = _v;
		}
		else{
			_title = Temp_v.shift();
			/**
			 * 不能直接拼接数组，会删掉所有的换行
			 */
			_desc  = _v.substr(_title.length + 1);
		}

		//处理标题
		titleBox = $('<dl class="e_clear"><dt>标题：</dt><dd><input name="schTitle" style="width: 380px; padding: 3px;"></input></dd></dl>').insertBefore(_me.parents('dl'));
		$form.schTitle = titleBox.find('input[name=schTitle]');
		$form.schTitle.val(_title).propertychange(checkTitleLen);

		//处理正文
		_me.attr('name','schDescription');
		$form.schDescription = _me;
		$form.schDescription.val(_desc);
		$form.schDescription.unpropertychange(checkTitleLen);
		$form.schDescription.propertychange(function checkDescLen () {
			var maxLen = 3000;
			var _me = $(this);
			var _v = $.trim(_me.val());
			if( _v.length > maxLen ) {
				$form.schDescription.addClass('tooLong');
			}
			else{
				$form.schDescription.removeClass('tooLong');
			}
		});
		_me = null;

		$form.removeClass('simple complete').addClass('complete');

		$form.schDescription.focus();
		$form.longMode = true;
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
				365: '年',
				5:'法定工作日'
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
	function saveSchedule(){
		var isSimple = $form.hasClass('simple'), postData = {
			schTitle: $.trim($form.schTitle.val()),
			alldayEvent: $form.alldayEvent.is(':checked'),
			calendarId: $form.calendarId.val(),
			startTime: [($form.chk_lunar.is(':checked') ? formatDate($form.liLunarPicker.lunarPicker('getDate')) : formatDate($form.startTime.datepicker('getDate'))), ' ', $form.dlt_start_hour.val(), ':', $form.dlt_start_minute.val(), ':00'].join(''),
			timeZone: -(new Date()).getTimezoneOffset() / 60
		};

		var txt = $form.longMode ? '标题' : '内容';
		if (!postData.schTitle) {
			$.alert("请输入日程" + txt, {
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
			$.alert("日程" + txt + "字数不能超过1000，超出" + (postData.schTitle.length - 1000) + '字', {
				buttons: {
					'确定': function(){
						$(this).dialog("close");
						$form.schTitle.focus();
					}
				}
			});
			return;
		}

		/**
		 * 长编辑模式增加description处理
		 */
		if ( $form.longMode ) {
			postData['description'] = $.trim($form.schDescription.val());

			if ( postData['description'].length > 3000 ) {
				$.alert("日程内容字数不能超过3000，超出" + (postData['description'].length - 3000) + '字', {
					buttons: {
						'确定': function(){
							$(this).dialog("close");
							$form.schDescription.focus();
						}
					}
				});
				return;
			}
		}

		var before_minutes_array=[];
		$form.find(".remind label").each(function(){
            var $elem = $(this), $r = $elem.find('input'), $rvalue = $elem.find('input').val();
            if (!$elem.is(":visible")) {
                return;
            }
            if ($r.attr("checked")) {
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
			var dateRange = G.cldPanel.calendarPanel('getDateRange');
			var otherData = {
				repeatType: repeatType,
				calendarType: $form.chk_lunar.is(':checked') ? 'L' : 'S',
				before_minutes: before_minutes_array.join(","),
				fromDate: formatDate(dateRange.from),
				toDate: formatDate(dateRange.to),
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
		if(!$form.btnSave.loading('is'))
			$form.btnSave.loading('start');
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

		postData.updateV2Origin = '7';

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
					$form.hide('fade');
					$("#image_upload_container").hide('fade');
					G.cldPanel.calendarPanel('cancelSelect');
					postData.scheduleId && G.cldPanel.calendarPanel('deleteScheduleData', postData.scheduleId);
					G.cldPanel.calendarPanel('mergeScheduleData', data);
					G.cldPanel.calendarPanel('refresh');
					if(postData.before_minutes && postData.before_minutes != ""){
						notificationManager.refresh();
					}


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
					//同步桌面widget
					try {
						js365.runScriptDeskWnd('$("#div_calendar").webCalendar()');
					} catch (e) {
					}
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
	}
	
	
	$.widget('mxx.scheduleCreator', {
		options: {
			onOpen: $.noop
		},
		_create: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			$elem.click(function(evt){
				evt.preventDefault();
				evt.stopPropagation();
				self.showForm();
			});
		},
		showForm: function($tds, evt, scheduleContentStr){
			var self = this, $elem = $(this.element), opt = this.options;
			var strDate = $elem.attr('date'), sid = $elem.attr('sid');

			//显示ScheduleCreator时候先关闭Tips
			$(".schedule_set_layer").hide("fade");
			$(".schedule_layer").removeData("lastTip").hide("fade");
			self.$form = getForm();
			//init image Creator
			if($("#image_upload_container").length == 0){
				$("body").append('<div id="image_upload_container" class="add_photo_layer ui-shadow ui-draggable none"></div>');
			}
			$("#image_upload_container").imageCreator({saveSchedule:saveSchedule, pics:[]});
			$form.find("#image_thumb").empty();
			if (sid) {
				if (self.$form.hasClass('simple')) {
					self.$form.removeClass('simple').addClass('complete');
				}
				if (!self.$form.is(':visible')) {
					self.$form.show().position(self.auto ? {
						of: 'body',
						my: 'right',
						at: 'left',
						offset: '-20'
					} : {
						of: 'body'
					});
				}
			} else {
				if (!$tds || $tds.size() > 1) {
					var initData = this.getOptBySelected($tds);
					if (initData) {
						if (self.$form.hasClass('simple')) {
							self.$form.removeClass('simple').addClass('complete');
						}
						if (!self.$form.is(':visible')) {
							self.$form.show().position({
								of: 'body'
							});
						}
					} else { return $.alert('对不起，365日历暂不支持将您的选择创建为单个日程，请分别创建。'); }
				} else {
					var rowIndex = this.element.parent().prop('rowInex'), cellIndex = this.element.prop('cellIndex');
					self.$form.find('div.add_schedule_bottom')[cellIndex < 2 ? 'addClass' : 'removeClass']('schedule_arrow_left');
					self.$form.removeClass('complete').addClass('simple').show().position({
						collision: 'fit',
						my: cellIndex < 2 ? 'left middle' : "right middle",
						at: cellIndex < 2 ? 'right middle' : "left middle",
						of: $elem
					});
					self.$form.data('fromTd', $elem);
				}
			}
			opt.onOpen.apply($elem, []);
			self.loadData(sid, initData, scheduleContentStr);
		},
		loadData: function(sid, initData, scheduleContentStr){
			var self = this, $elem = $(this.element), opt = this.options;
			if (sid) {
				self.$form.find('h2').html('编辑日程');
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
							//get pics
							$.ajax({
								url:"/schedule/getpics.do",
								type:"post",
								dataType:"json",
								data:{
									calendarID:data.calendarId,
									scheduleUUID:data.uuid
								},
								success: function(imageData){
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
								}
							})
							
						}
					},
					error: function(){
					
					},
					dataType: 'json'
				});
			} else {
				self.$form.find('h2').html('添加日程');
				self.initForm($.extend({
					title: scheduleContentStr ? scheduleContentStr : '',
					id: '',
					allDayEvent: true,
					calendarType: 'S',
					startTime: +new Date($elem.attr('date').replace(/-/g, '/') + ' 09:00:00'),
					before_minutes: '0',
					repeatType: 0,
					calendarId: G.cldList.calendarList('getSelectedCalendarIDs')[0] || self.$form.calendarId.find('option:first').attr('value'),
					scheduleId: ''
				}, initData));
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
				$form.schTitle.val(htmlDecode(data.title));
				$form.alldayEvent.attr('checked', data.allDayEvent).triggerHandler('click');
				var sTime = new Date(data.startTime);
				var endTime = new Date(sTime.getTime() + 86400000);
				$form.startTime.datepicker('setDate', sTime);
				$form.endTime.datepicker('setDate', endTime);
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
				$form.calendarId.val(data.calendarId);
				
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

				/**
				 * 判断是否进入长编辑
				 */
				if ( data.description !== null && data.description !== '' && Object.prototype.toString.call(data.description) !== '[object Undefined]' ) {
					changeToLongMode();
					/**
					 * 需要重新设置title值
					 */
					$form.schTitle.val(data.title);
					$form.schDescription.val(data.description);
				}
			}
			//初始化的时候先把所有提醒置为false
			$form.find(".remind label input").attr("checked", false);
			if (data.alarm !== undefined) {
				if(data.alarm != ""){
					var alarm_ary = data.alarm.split(",");
					for(var i=0; i < alarm_ary.length; i++){
						var alarm_minutes = alarm_ary[i];
						$form.find(".remind_" + alarm_minutes + " input").attr("checked", "checked");
						if(alarm_minutes == 0){
							$form.find(".remind_today input").attr("checked", "checked");	
						}
					}	
				}
			}else if(data.id == ""){
				$form.find(".remind_today input").attr("checked", "checked");
				$form.find(".remind_0 input").attr("checked", "checked");
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
})();

$.widget('mxx.scheduleCopy', {
	options: {
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var tmpl = 	'<a href="javascript:;" class="close_btn js_close"></a><h2>复制日程到</h2>'+
					'<div class="calendar_list_container e_clear"></div>' +
					'<div class="schedule_bottom"><a href="javascript:;" class="js_save" sid="{sid}">保存</a></div>';
		$elem.html(tmpl).position({
			collision: 'fit',
			of:'body',
			at:'left top',
			my:'center top'
		});
		$elem.draggable({
			containment: 'body',
			handle: 'h2',
			cancel: 'a',
			cursor: "move",
			opacity: 0.85
		});
		$elem.find('a.js_close').click(function(){
			$elem.hide('fade');
		});
		
		$elem.find('a.js_save').click(function(){
			if($elem.find('.calendar_list_row input:checked').length == 0) {
			    $.alert('您没有选择目标日历！');
			    return;
			}
			$elem.find('.calendar_list_row input').each(function(){
				if($(this).prop("checked")){
					self._copySchedule($(this).attr("cld"));					
				}
			});
		});
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$.ajax({
			url: '/schedule/getRawScheduleByIdV2.do',
			type: 'post',
			data: {
				scheduleId: opt.sid
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
					var dateRange = G.cldPanel.calendarPanel('getDateRange');
					var startTime = new Date(data.startTime);
					var repeatStopTime=new Date(data.repeatStopTime);
					var postData = {
						schTitle:htmlDecode(data.title),
						alldayEvent:data.allDayEvent,
						calendarId:0,
						startTime: [formatDate(startTime), ' ', ('0' + startTime.getHours()).slice(-2), ":", ('0' + startTime.getMinutes()).slice(-2), ":00"].join(""),
						timeZone:-(new Date()).getTimezoneOffset() / 60,
						repeatType:data.repeatType,
						calendarType:data.calendarType,
						before_minutes:data.alarm,
						fromDate:formatDate(dateRange.from),
						toDate:formatDate(dateRange.to),
						duration:data.duration,
						repeatCount:data.repeatCount == 0 ? '' : data.repeatCount,
						repeatDay:data.repeatDay,
						repeatFrequency: data.repeatFrequency == 0 ? '' : data.repeatFrequency,
						repeatMonth:data.repeatMonth,
						repeatMonthDay:data.repeatMonthDay,
						repeatStopTime:[formatDate(repeatStopTime), ' ', ('0' + repeatStopTime.getHours()).slice(-2), ":", ('0' + repeatStopTime.getMinutes()).slice(-2), ":00"].join(""),
						scheduleId:'',
						linked_url:data.url,
						location:data.location
					};
					//判断description
					if ( data.description !== null && data.description !== '' && Object.prototype.toString.call(data.description) !== '[object Undefined]' ) {
						postData['description'] = data.description;
					}
					for(var i in postData){
						if(postData[i] == null){
							postData[i] = "";
						}
					}
					self.postData = postData;
					var cldNameAry = G.cldList.calendarList('getAllCalendarNames', true);
					$elem.find(".calendar_list_container").html($.map(cldNameAry, function(o,i){
						if(o.id == data.calendarId)
							return "";
						return "<div class='calendar_list_row'><input type='checkbox' cld='"+o.id+"'/><span>"+o.name+"</span></div>";
					}).join(""));
					$elem.show();
					
					//get pics
					$.ajax({
						url:"/schedule/getpics.do",
						type:"post",
						dataType:"json",
						data:{
							calendarID:data.calendarId,
							scheduleUUID:data.uuid
						},
						success: function(imageData){
							if(imageData.state == "ok"){
								var pics = [];
								for(var i in imageData.pics){
									var pic = imageData.pics[i];
									pics.push({
										pic:pic.pic,
										sequence:pic.sequence,
										source:"schedule_pics"
									});
								}
								self.postData.pics = JSON.stringify(pics);
							}
						}
					});					
				}
			},
			error: function(){
			
			},
			dataType: 'json'
		});		
	},
	_copySchedule: function(cid){
		var self = this, $elem = $(this.element), opt = this.options;
		self.postData.calendarId = cid;

		self.postData.updateV2Origin = '8';

		$.ajax({
			url: '/schedule/updateV2.do',
			type: 'post',
			dataType: 'json',
			data: self.postData,
			success: function(data){
				if (data.state == 'ok') {
					//$.alert('复制成功！');
					$elem.hide();
					G.cldPanel.calendarPanel('cancelSelect');
					G.cldPanel.calendarPanel('mergeScheduleData', data);
					G.cldPanel.calendarPanel('refresh');
					//复制日程后刷新提醒
					if(self.postData.before_minutes && self.postData.before_minutes != ""){
						notificationManager.refresh();
					}
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
			},
			error: function(data){
			}
		});
	}
});