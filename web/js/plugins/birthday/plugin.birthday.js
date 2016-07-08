(function(){
	$.calendarPlugin['birthday'] = function(){
		var $popup = $("#birthday_plug");
		if($popup.length == 0){
			var html = '<div class="birthday_plug ui-corner-all" id="birthday_plug"><div class="birthday_plug_title"><a class="close_plug" href="javascript:;" hidefocus="true"></a><h3>生日</h3><a class="add_birthday_btn" title="添加生日" href="javascript:;" hidefocus="true"></a></div><div class="birthday_plug_content e_clear"><div class="birthday_plug_content_left"><ul><li class="on" delta="0">全部</li><li delta="1">1月</li><li delta="2">2月</li>	<li delta="3">3月</li><li delta="4">4月</li><li delta="5">5月</li><li delta="6">6月</li><li delta="7">7月</li><li delta="8">8月</li><li delta="9">9月</li><li delta="10">10月</li><li delta="11">11月</li><li delta="12">12月</li></ul></div><div class="birthday_plug_content_right"><ul class="birthdayList"></ul></div></div></div>';
			$('<div class="ui-widget-overlay cal_plugin_overlay" id="birthday_plug_mask"></div>').appendTo('body');
			$popup = $(html).appendTo('body');
			$(window).on('resize', rePosition);
		}
		$popup.show('fade');
		$("#birthday_plug_mask").show("fade");
		rePosition();
		$popup.calendarPluginBirthday();
		
		function rePosition(){
			var docEl = document.documentElement;
			var docHeight = docEl.clientHeight;
			var docWidth = docEl.clientWidth;
			//resize height
			$popup.height(docHeight - 30);
			$popup.find('div.birthday_plug_content').height(docHeight - 30 - $popup.find('div.birthday_plug_title').outerHeight());
			$popup.find('div.birthday_plug_content_left').height(docHeight - 30 - $popup.find('div.birthday_plug_title').outerHeight()-20)
			$popup.find('div.birthday_plug_content_right').height(docHeight - 30 - $popup.find('div.birthday_plug_title').outerHeight())
			//resize width
			//default width:800px
			//default margin:60px
			$popup.width(docWidth - 60 > 800 ? 800 : docWidth - 60);
			$popup.position({
				of: document.documentElement
			});
		}
	};
	$.widget('dd.calendarPluginBirthday', {
		options: {},
		_create: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			self.$ulList = $elem.find('ul.birthdayList');
			self.editHtml = '<li class="default {className}" noteid="{id}">\
                	<div class="birthday_list">\
						<div class="birthday_name e_clear">\
							<span class="sex_type {sex_type}">{sex}</span><span class="constellation {constellation_type}">{constellation}</span><span class="zodiac {zodiac_type}">{zodiac}</span>\
							<h3 class="h3_name">{name}</h3><span class="diffTime {difftime_style}" title=""></span>\
						</div>\
						<div class="birthday_time"><span class="birthday_solar {Sigonore}">公历：<span class="year_txt {is_igonore_year}">{Syear}年</span>{Smonth}月{Sday}日</span><span class="birthday_lunar {Ligonore}">农历：<span class="year_txt {is_igonore_year}">{Lyear}年</span>{Lmonth}月{Lday}</span></div>\
						<div class="difftime_txt"><span class="{difftime_day_color}">{difftime_day_text}</span><span class="{difftime_day_style}">天后</span> <span class="{difftime_year_style}">{difftime_year}岁</span>生日   {difftime_month}月{difftime_date}日({difftime_week})</div>\
					</div>\
					<div class="birthday_operating">\
						<a href="javascript:;" class="edit_birthady_btn"></a>\
						<a href="javascript:;" class="del_birthady_btn"></a>\
					</div>\
                    <div class="birthday_edit">\
                    	<div class="e_clear">\
	                        <div class="birthday_name">\
	                            <span>姓名：</span>\
	                            <input type="text" class="input_name">\
	                            </input>\
	                        </div>\
	                        <div class="birthday_gender">\
	                            <span>性别：</span>\
	                            <label class="on">\
	                                <span class="checkbox"></span><span class="checkbox_boy checkbox_sex">男</span>\
	                            </label>\
	                            <label>\
	                                <span class="checkbox"></span><span class="checkbox_gril checkbox_sex">女</span>\
	                            </label>\
	                        </div>\
						</div>\
                        <div class="birthday_date e_clear">\
                            <div class="add_birthday_date">\
                                <span>出生日期：</span>\
								<label class="e_clear" id="lunar_checkbox"><span class="checkbox"></span><span>农历</span></label>\
                            </div>\
                            <div class="transform_lunar none">\
                            	<select class="create_year">\
                                </select>\
								<span>年</span>\
								<select class="create_month"></select>\
								<span>月</span>\
								<select class="create_day"></select>\
								<span class="">日</span>\
                            </div>\
							<div class="transform_solar">\
                            	<select class="create_year">\
                                </select>\
								<span>年</span>\
								<select class="create_month">\
                                </select>\
								<span>月</span>\
								<select class="create_day">\
                                </select>\
								<span class="">日</span>\
                            </div>\
							<div class="transform_solarlunar_txt">农历：2012年十二月廿一日</div>\
                        </div>\
                        <div class="phone_remind">\
                            <span>手机提醒：</span>\
                            <label>\
                                <span class="checkbox"></span><span class="remind_txt" alarms="1440">提前1天</span>\
                            </label>\
                            <label>\
                                <span class="checkbox"></span><span class="remind_txt" alarms="4320">提前3天</span>\
                            </label>\
                            <label class="on">\
                                <span class="checkbox"></span><span class="remind_txt" alarms="10080">提前1周</span>\
                            </label>\
                        </div>\
                        <div class="birthday_btn">\
                            <a href="javascript:;" class="save_birthday_btn">保存</a>\
                            <a href="javascript:;" class="cancel_birthday_btn">取消</a>\
                        </div>\
                    </div>\
                </li>';
			$elem.draggable({
				handle: 'div.birthday_plug_title',
				opacity: 0.65,
				cancel: "a",
				stop: function(evt, ui){
					if (ui.offset.left < 0 || ui.offset.top < 0) {
						$(this).css({
							left: Math.max(0, ui.offset.left),
							top: Math.max(0, ui.offset.top)
						});
					}
				}
			});
			$elem.find('a.close_plug').click(function(evt){
				evt.preventDefault();
				$elem.hide('fade');
				$('body > div.cal_plugin_overlay').hide("fade");
			});
			//月份选择的侧边栏
			$elem.find(".birthday_plug_content_left ul li").click(function(){
				$(this).parent().find(".on").removeClass("on");
				$(this).addClass("on");
				var month = $(this).attr("delta");
				if(month == 0){
					$elem.find(".birthdayList li").show();
				}else{
					var lis = $elem.find(".birthdayList li");
					for(var i =0; i< lis.length; i++){
						var li = lis.eq(i);
						if(li.hasClass("birth_empty") || li.hasClass("create"))
							continue;
						var noteid = li.attr("noteid");
						var m = self.birthdayMap[noteid].month;
						if(m == month){
							li.show();
						}else{
							li.hide();
						}
					}
				}
				self.birthdayEmpty();
			});
			
			$('li', self.$ulList).live('click', function(){
				var $li = $(this);
				if (!$li.hasClass('edit') && !$li.hasClass('birth_empty')) {
					$li.toggleClass('click');
				}
			});
			$('input,a', self.$ulList).live('click', function(evt){
				this.nodeName == 'A' && evt.preventDefault();
				evt.stopPropagation();
			});
			$elem.find('a.add_birthday_btn').click(function(evt){
				var currEditRow = self.$ulList.find('li.edit');
				if (currEditRow.size()) {
					if (currEditRow.hasClass('create')) {
						currEditRow.find('input.input_name').focus();
					} else {
						$.alert('请先保存或者取消当前正在编辑的生日事项！', {
							buttons: {
								'确定': function(){
									$(this).dialog("close");
								}
							}
						});
					}
				} else {
					var $li = $($.format(self.editHtml, {
						id: '',
						name: '',
						sex:'',
						className:'click edit create',
						birthday_type: '',
						is_igonore_year:'',
						alarms:'',
						year:'',
						month:'',
						day:''
					})).prependTo(self.$ulList);
					$li.find('input.input_name').focus();
					$li.find(".transform_solar").solarPicker();
					$li.find(".transform_lunar").birthdaylunarPicker().hide();
				}
			});
			
			//性别 custom checkbox
			$(".birthday_gender label",$elem).live('click',function(evt){
				if($(this).hasClass("on")){
					$(this).removeClass("on")
				}else {
					if($(".birthday_gender label").hasClass("on")){
						$(".birthday_gender label").removeClass("on");
					}
					$(this).addClass("on")
				}
			});
			//手机提醒 custom checkbox
			$(".phone_remind label",$elem).live('click',function(evt){
				if($(this).hasClass("on")){
					$(this).removeClass("on")
				}else {
					$(this).addClass("on")
				}
			});
			/*
			var lunar_checkbox = $(this).find(".add_birthday_date #lunar_checkbox");
			if(lunar_checkbox.hasClass("on")){
				$(".transform_lunar").removeClass("none").birthdaylunarPicker({
					date:new Date(),
					yearEnd: new Date().getFullYear()
				});
				$(".transform_solar").addClass("none");
			}else{
				$(".transform_solar").removeClass("none").solarPicker('setDate',new Date());
				$(".transform_lunar").addClass("none");
			}
			*/
			//农历和公历切换
			$(".add_birthday_date .checkbox").live("click", function(){
				var p = $(this).parent();
				p.toggleClass("on");
				if(p.attr("id") == "lunar_checkbox"){
					if(p.hasClass("on")){
						var solarSelectDate=$(".transform_solar").find("select.create_day").find("option:selected").attr("date").split("-");
						var dds= new Date();
						dds.setFullYear(solarSelectDate[0]);
						dds.setMonth(solarSelectDate[1]-1);
						dds.setDate(solarSelectDate[2]);
						$(".transform_lunar").removeClass("none").birthdaylunarPicker({
							date:dds,
							yearEnd: new Date().getFullYear()
						}).show();
	                    $(".transform_solar").addClass("none");
					}else{
						var lunarSelectDate=$(".transform_lunar").find("select.create_day").find("option:selected").attr("date").split("-");
						var dds= new Date();
						dds.setFullYear(lunarSelectDate[0]);
						dds.setMonth(parseInt(lunarSelectDate[1])-1);
						dds.setDate(lunarSelectDate[2]);
	                    $(".transform_solar").removeClass("none").solarPicker({date:dds});
	                    $(".transform_lunar").addClass("none");
					}
				}
			});
			
			//var starRequesting = false;
			//取消创建或者编辑
			$('a.cancel_birthday_btn', $elem).live('click', function(evt){
				var $li = $(this).parents('li');
				if ($li.hasClass('create')) {
					$li.slideUp(function(){
						$li.remove();
					});
				} else {
					$li.removeClass('click edit');
				}
			});
			//var saveRequesting = false;
			//保存
			$('a.save_birthday_btn', $elem).live('click', function(evt){
				var $li = $(this).parents('li');
				var $ta = $li.find('input.input_name');
				var content = $.trim($ta.val());
				if (!content) {
					$.alert('姓名不能为空！', {
						buttons: {
							'确定': function(){
								$(this).dialog("close");
								$ta.focus();
							}
						}
					});
					return;
				}
				if ($li.hasClass('create')) {
					var $c = self._generateBirthdayObject($li, $ta);
					self.post('/birthday/create.do', {
						birth:JSON.stringify($c)
					}, function(data){
						if (data.state=="ok") {
							self.$ulList.find('li.birth_empty').hide();
							self._renderNewBirth($li, $c, data);
						}else if(data.state=="wrongpass"){
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						}else{
                            $.alert('服务器繁忙，请稍后重试！');
						}
					}, '保存生日');
				} else {
					var noteId = $li.attr('noteid');
					var $d = self._generateBirthdayObject($li,$ta, noteId);
					self.post('/birthday/update.do', {
						birth:JSON.stringify($d)
					}, function(data){
						if (data.state=="ok") {
							data.id = noteId;
							self._renderNewBirth($li, $d, data);
						}else if(data.state=="wrongpass"){
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						}else{
							$.alert('服务器繁忙，请稍后重试！');
						}
					}, '编辑生日');
				}
			});
			$('a.edit_birthady_btn', $elem).live('click', function(evt){
				var $lnk = $(this), $li = $lnk.parents('li'), noteId = $li.attr('noteid');
				var datamap = self.birthdayMap[noteId];
				$li.addClass("edit");
				$li.find("input.input_name").val(htmlDecode(datamap.name));
				if(datamap.sex=="男"){
					$li.find("label").removeClass("on");
					$li.find(".checkbox_boy").parents("label").addClass("on");
				}else if(datamap.sex=="女"){
					$li.find("label").removeClass("on");
					$li.find(".checkbox_gril").parents("label").addClass("on");
				}else{
					$li.find("label").removeClass("on");
				}
				var year = datamap.Syear, month=parseInt(datamap.Smonth),day=parseInt(datamap.Sday),noneyear;
				var ds=new Date();
				ds.setFullYear(year);
				ds.setMonth(month-1);
				ds.setDate(day);
				if(datamap.year==0){
					year=new Date().getFullYear();
					noneyear=0;
					if(datamap.birthday_type == "L"){
						ds = getSolarDate(year, datamap.month, datamap.day);
					}else{
						ds = new Date();
						ds.setFullYear(year);
						ds.setMonth(month - 1);
						ds.setDate(day);
					}
				}else{
					noneyear=null;
				}
				if(datamap.birthday_type=="S"){
					$li.find('div.add_birthday_date #lunar_checkbox').removeClass("on");
					if($li.find('.transform_solar').hasClass("none")){
						$li.find('.transform_solar').removeClass("none");
					}
					$li.find(".transform_solar").solarPicker({date: ds ,noneyear:noneyear});
					$li.find('.transform_lunar').addClass("none");
					if(datamap.year == 0){
						$(".transform_solarlunar_txt").html('');
						$li.find('.transform_solar').solarPicker("hideYear");
					}
					
					
				}else{
					$li.find('div.add_birthday_date #lunar_checkbox').addClass("on");					
					if($li.find('.transform_lunar').hasClass("none")){
						$li.find('.transform_lunar').removeClass("none");
					}
					$li.find('.transform_lunar').birthdaylunarPicker({date:ds,noyear: noneyear});
					$li.find('.transform_solar').addClass("none");
					if(datamap.year == 0){
						$(".transform_solarlunar_txt").html('');
						$li.find('.transform_lunar').birthdaylunarPicker("hideYear");
					}
				}
				
				$.each(datamap.alarms, function(index){
					var alarmlen = $li.find(".phone_remind .remind_txt")
					alarmlen.each(function(){
						if ($(this).attr('alarms') == datamap.alarms[index].beforeMinutes) {
							$(this).parents('label').addClass("on");
						}
					})
				});
			});
			
			$('a.del_birthady_btn', $elem).live('click', function(evt){
				var $lnk = $(this), $li = $lnk.parents('li'), noteId = $li.attr('noteid');
				$.confirm('确定要删除该条生日吗？', {
					buttons: [{
						click: function(){
							var dialog = this;
							self.post('/birthday/remove.do', {
								id: parseInt(noteId)
							}, function(data){
								if (data.state=="ok") {
									$(dialog).dialog('close');
									$li.slideUp(function(){
										$li.remove();
										if (!self.$ulList.find('li').size()) {
											self.birthdayEmpty();
										}
									});
								}else if(data.state=="wrongpass"){
									$.alert('对不起，您的登录已经过期，请重新登录！', {
										buttons: {
											'确定': function(){
												location = '/account/login.do';
											}
										}
									});
								}
							}, '删除生日');
						}
					}]
				});
			});
		},
		_init: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			self.loadTodoData();	
		},
		_generateBirthdayObject : function($li,$ta, noteid){
			var self = this, $elem = $(this.element), opt = this.options;
			var is_igonore_year, year, month, day;
			var name=htmlDecode($ta.val());
            var sex = 2;

            if ($li.find('div.birthday_gender label.on').size()) {

                $li.find('div.birthday_gender label.on').find("span.checkbox_boy").size() ? sex = 0 : sex = 1;

            }

            var birthday_type;
            if($li.find('div.add_birthday_date #lunar_checkbox').hasClass("on")){
            	birthday_type = "L";
            }else{
            	birthday_type = "S";
            }

            var alarms = $.map($li.find('div.phone_remind label.on .remind_txt'),function(val, index){
				return {
					beforeMinutes: $(val).attr("alarms")
				};
			});
            if (birthday_type == "L") {

                year = $li.find('div.transform_lunar .create_year').find('option:selected').val();

                month = $li.find('div.transform_lunar .create_month').find('option:selected').val();

                day = $li.find('div.transform_lunar .create_day').find('option:selected').val();

                is_igonore_year = year == "none" ? 1 : 0;

            }

            else {

                year = $li.find('div.transform_solar .create_year').find('option:selected').val();

                month = $li.find('div.transform_solar .create_month').find('option:selected').val();

                day = $li.find('div.transform_solar .create_day').find('option:selected').val();

                is_igonore_year = year == "none" ? 1 : 0;

            }

            var re = /[a-zA-Z]/g;
			

            var $c = {

                name: name,

                sex: sex,

                birthday_type: birthday_type,

                year: year == "none" ? 0 : year,

                month: birthday_type == "S" ? parseInt(month) + 1 : month.replace(re,''),

                day: day,

                alarms: alarms,

                is_igonore_year: is_igonore_year

            };
			if(noteid)
				$c.id = noteid;
			return $c;
		},
		_renderNewBirth : function($li, $c, data){
			var self = this, $elem = $(this.element), opt = this.options;
			var tmpHtml = '<div class="birthday_name e_clear">\
									<span class="sex_type {sex_type}">{sex}</span><span class="constellation {constellation_type}">{constellation}</span><span class="zodiac {zodiac_type}">{zodiac}</span>\
									<h3 class="h3_name">{name}</h3><span class="diffTime {difftime_style}" title=""></span>\
								</div>\
								<div class="birthday_time"><span class="birthday_solar {Sigonore}">公历：<span class="year_txt {is_igonore_year}">{Syear}年</span>{Smonth}月{Sday}日</span><span class="birthday_lunar {Ligonore}">农历：<span class="year_txt {is_igonore_year}">{Lyear}年</span>{Lmonth}月{Lday}</span></div>\
								<div class="difftime_txt"><span class="{difftime_day_color}">{difftime_day_text}</span><span class="{difftime_day_style}">天后</span>   <span class="{difftime_year_style}">{difftime_year}岁</span>生日   {difftime_month}月{difftime_date}日({difftime_week})</div>' ;			
			$li.removeClass('edit').removeClass("create");
            $li.find('.sex_type').html($c.sex);
            var birthday_type;
            if($li.find('div.add_birthday_date #lunar_checkbox').hasClass("on")){
            	birthday_type = "L";
            }else{
            	birthday_type = "S";
            }
			
            if ($c.sex == 0) {

                $c.sex_type = "boy";

                $c.sex = "男";

            }

            else 

                if ($c.sex == 1) {

                    $c.sex_type = "girl";

                    $c.sex = "女";

                }

                else {

                    $c.sex = "";

                    $c.sex_type = "none";

                }

            if ($c.year == 0) {

				$c.difftime_year_style="none";

                $c.is_igonore_year = "none";

                $c.zodiac_type = "none";

                if (birthday_type == "S") {

                    $c.Sday = $c.day;

                    $c.Smonth = $c.month;

                    $c.constellation = self.constellation(parseInt($c.month), parseInt($c.day));

                    $c.Ligonore = "none";

                }

                else {

                    $c.Lday = Lunar.DB.dateCn[$c.day-1];

                    $c.Lmonth = (Lunar.DB.monthCn[(parseInt($c.month) + 1)%12]);

                    $c.constellation_type = "none";

                    $c.Sigonore = "none";

                }

            }

            else {

                $c.constellation_type = "";

                $c.zodiac_type = "";

                if ($c.birthday_type == "S") {

                    $c.Syear = $c.year;

                    $c.Smonth = $c.month;

                    $c.Sday = $c.day;

                    var ddd = new Date();

                    ddd.setFullYear($c.year, $c.month-1, $c.day);

                    $c.Lyear = lunar(ddd).gzYear;

                    $c.Lmonth = lunar(ddd).lMonth;

                    $c.Lday = lunar(ddd).lDate;

                    $c.zodiac = lunar(ddd).animal;

                    $c.constellation = self.constellation(parseInt($c.month), parseInt($c.day));
                    $c.Ligonore="none";

                }

                else {

                    var solardate = getSolarDate($c.year, $c.month, $c.day);

                    $c.Syear = solardate.getFullYear();

                    $c.Smonth = solardate.getMonth()+1;

                    $c.Sday = solardate.getDate();

                    $c.Lyear = lunar(solardate).gzYear;

                    $c.Lmonth = lunar(solardate).lMonth;

                    $c.Lday = lunar(solardate).lDate;

                    $c.zodiac = lunar(solardate).animal;

                    $c.constellation = self.constellation(parseInt($c.Smonth), parseInt($c.Sday));
                    $c.Sigonore = "none";

                }

            }

            var difftimeDayArry = self.difftimeDay($c.birthday_type, $c.year, $c.month, $c.day);

            $c.difftime_day = difftimeDayArry.day;

            $c.difftime_year = difftimeDayArry.year==0?difftimeDayArry.year+1:difftimeDayArry.year;

            $c.difftime_month = difftimeDayArry.month;

            $c.difftime_date = difftimeDayArry.days;
			
			$c.difftime_day_text= $c.difftime_day;


            if ($c.difftime_day <= 30) {
				$c.difftime_day_style="";
				$c.difftime_day_color=""
				if($c.difftime_day==1){
					$c.difftime_day_text="明天";
					$c.difftime_day_style="none";
					$c.difftime_day_color="txt_tom"
				}else if($c.difftime_day==2){
					$c.difftime_day_text="后天";
					$c.difftime_day_style="none";
					$c.difftime_day_color="txt_acq"
				}else{
					$c.difftime_day_text= $c.difftime_day;
				}
                $c.difftime_style = "red";
				

            }

            else 

                if ($c.difftime_day > 30 && $c.difftime_day <= 90) {

                    $c.difftime_style = "yellow";
					$c.difftime_day_style="";

                }

                else {

                    $c.difftime_style = "blue";
					$c.difftime_day_style="";

                }

            $c.difftime_week = difftimeDayArry.week;
			$li.attr('noteid', data.id);

            $li.find(".birthday_list").html($.format(tmpHtml, [$c]));
            if ($c.difftime_day == 0) {
                $li.find(".difftime_txt").addClass("txt_red").html("今天是"+$c.name+"的生日");
   			}
            if((typeof self.birthdayMap) == "undefined") {
                self.birthdayMap = {};

            }
            self.birthdayMap[data.id] = $c;

            self._sortNewBirthday($li, $c.difftime_day);

            var selected_month = $elem.find(".birthday_plug_content_left ul .on").attr("delta");

            if (selected_month != 0 && $c.month != selected_month) {

                $li.hide();

            }
		},
		loadTodoData: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			$elem.find(".birthday_plug_content_left ul li:first").click();
			self.post('/birthday/getList.do', {}, function(result){
				if (result.length) {
					self.birthdayMap = {};
					self.birthdayData = $.map(result, function(o){
						o.name = self.html_encode(self.html_decode(o.name));
						o.birthday_type = o.birthday_type.toUpperCase();
						if(o.sex==0){
							o.sex="男"
							o.sex_type="boy"
						}else if(o.sex==1){
							o.sex="女"
							o.sex_type="girl"
						}else{
							o.sex=""
							o.sex_type="none"
						}
						if(o.is_igonore_year==1){
							o.difftime_year_style="none";
							o.is_igonore_year="none";
							o.zodiac_type="none";
							if(o.birthday_type=="L"){
								o.constellation_type="none";
								o.Lday = Lunar.DB.dateCn[o.day-1];
                    			o.Lmonth = Lunar.DB.monthCn[(parseInt(o.month) + 1) % 12];
								o.Sigonore="none";
							}else{
								o.constellation=self.constellation(parseInt(o.month),parseInt(o.day));
								o.Smonth=o.month;
								o.Sday=o.day;
								o.Ligonore="none";
								
							}
						}else{
							o.constellation_type="";
							o.zodiac_type="";
							if(o.birthday_type=="S"){
								var ddd=new Date();
								ddd.setFullYear(o.year,o.month-1,o.day);
								var lunarData=lunar(ddd);
								o.Syear=o.year;
								o.Smonth=o.month;
								o.Sday=o.day;
								o.Lyear=lunarData.gzYear;
								o.Lmonth=lunarData.lMonth;
								o.Lday=lunarData.lDate;
								o.zodiac=lunarData.animal;
								o.constellation=self.constellation(parseInt(o.month),parseInt(o.day));
								o.Ligonore="none";
							}else{
								var solardate=getSolarDate(o.year,o.month,o.day);
								var conMonth=solardate.getMonth()+1, conDate=solardate.getDate();
								var lunarData=lunar(solardate);
								o.constellation=self.constellation(parseInt(conMonth),parseInt(conDate));
								o.Syear=solardate.getFullYear();
								o.Smonth=solardate.getMonth() + 1;
								o.Sday=solardate.getDate();
								o.Lyear=lunarData.gzYear;
								o.Lmonth=lunarData.lMonth;
								o.Lday=lunarData.lDate;
								o.zodiac=lunarData.animal;
								o.Sigonore="none";
							}
						}
						o.className="";
						var difftimeDayArry=self.difftimeDay(o.birthday_type,parseInt(o.year),parseInt(o.month),parseInt(o.day));
						o.difftime_day=difftimeDayArry.day;
						o.difftime_year=difftimeDayArry.year==0?difftimeDayArry.year+1:difftimeDayArry.year;
						o.difftime_month=difftimeDayArry.month;
						o.difftime_date=difftimeDayArry.days;
						o.difftime_day_text=o.difftime_day;
						if(o.difftime_day<=30){
							o.difftime_day_style="";
							o.difftime_day_color=""
							if(o.difftime_day==1){
									o.difftime_day_text="明天";
									o.difftime_day_style="none";
									o.difftime_day_color="txt_tom"
								}else if(o.difftime_day==2){
									o.difftime_day_text="后天";
									o.difftime_day_style="none";
									o.difftime_day_color="txt_acq"
								}else{
									o.difftime_day_text=o.difftime_day;
								}
				                o.difftime_style = "red";
								
							}else if(o.difftime_day>30 && o.difftime_day<=90){
								o.difftime_style="yellow";
								o.difftime_day_text=o.difftime_day;
								o.difftime_day_style = "";
							}else{
								o.difftime_style="blue";
								o.difftime_day_text=o.difftime_day;
								o.difftime_day_style = "";
							}
						o.difftime_week=difftimeDayArry.week;
						self.birthdayMap[o.id] = o;
						return  o; 
					});
					self.birthdayData = self.birthdayData.sort(function(a, b){
						return a.difftime_day - b.difftime_day;
					})
					self.$ulList.empty().html(($.format(self.editHtml, self.birthdayData)));
					
                    $.map(result, function(o){

                        if (o.difftime_day == 0) {

                            $elem.find(".difftime_txt").each(function(){
								if($(this).parent().parent().attr("noteid") == o.id){
									$(this).addClass("txt_red").html("今天是"+o.name+"的生日");
								}
							});

                        }

                    });
					
				} else {
					self.birthdayEmpty();
				}
			}, '获取生日列表数据');
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
		_sortNewBirthday : function($li, diffday){
			var self = this, $elem = $(this.element), opt = this.options;
			$li.remove();
			var li_ary = $elem.find(".birthdayList li");
			
			var flag = false;
			for(var i=0; i< li_ary.length;i++){
				var item = li_ary.eq(i);
				if(item.hasClass("birth_empty") || item.hasClass("create"))
					continue;
						
				var noteid = item.attr("noteid");
				var day = self.birthdayMap[noteid].difftime_day;
				if(diffday <= day){
					item.before($li);
					flag = true;
					break;
				}
			}
			if(!flag)
				$elem.find(".birthdayList").append($li);
		},
		sort: function(){
			this.$ulList.append(this.$ulList.find('li').toArray().sort(sortOperator));
		},
		birthdayEmpty: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			if(self.$ulList.find(".birth_empty").length == 0){
				self.$ulList.append('<li class="birth_empty"></li>');
			}
			var lis = self.$ulList.find("li");
			var flag = false;
			for(var i=0;i<lis.length;i++){
				var li = lis.eq(i);
				if(li.is(":visible") && !li.hasClass("birth_empty")){
					flag = true;
					break;	
				}
			}
			if(flag)			
				self.$ulList.find(".birth_empty").hide();
			else
				self.$ulList.find(".birth_empty").show();
		},
		constellation:function(month,day){
			var s;
			switch(month){
				case 1:
				if(day<=19){
					s = "摩羯";
				}else{
					s = "水瓶";
				}
				break;
				case 2:
				if(day<=18){
					s = "水瓶";
				}else{
					s = "双鱼";
				}
				break;
				case 3:
				if(day<=20){
					s = "双鱼";
				}else{
					s = "白羊";
				}
				break;
				case 4:
				if(day<=20){
					s = "白羊";
				}else{
					s = "金牛";
				}
				break;
				case 5:
				if(day<=20){
					s = "金牛";
				}else{
					s = "双子";
				}
				break;
				case 6:
				if(day<=21){
					s = "双子";
				}else{
					s = "巨蟹";
				}
				break;
				case 7:
				if(day<=22){
					s = "巨蟹";
				}else{
					s = "狮子";
				}
				break;
				case 8:
				if(day<=22){
					s = "狮子";
				}else{
					s = "处女";
				}
				break;
				case 9:
				if(day<=22){
					s = "处女";
				}else{
					s = "天秤";
				}
				break;
				case 10:
				if(day<=23){
					s = "天秤";
				}else{
					s = "天蝎";
				}
				break;
				case 11:
				if(day<=21){
					s = "天蝎";
				}else{
					s = "射手";
				}
				break;
				case 12:
				if(day<=21){
					s =  "射手";
				}else{
					s =  "摩羯";
				}
				break;
			}
			return s;
		},
		difftimeDay:function(birthday_type,year,month,day){
			var date = this.getNextBirthdays(birthday_type,year,month,day), nowDate=new Date();
			if(!date){
				return {};
			}
			if(birthday_type=="L"){
				nowDate.setHours(0);
				nowDate.setMinutes(0);
				nowDate.setSeconds(0);
				nowDate.setMilliseconds(0);
			}
			var second=date.getTime()-nowDate.getTime();
			var rs = {};
			rs.day = parseInt(second / 86400000);
			rs.year=this.difftimeYear(birthday_type,year,month,day);
			rs.month=date.getMonth()+1;
			rs.days=date.getDate();
			rs.week=["星期天","星期一","星期二","星期三","星期四","星期五","星期六"][date.getDay()];
			return rs;
		},
		getNextBirthdays:function(birthday_type,year,m,d){
			var date;
            var today = new Date(), todayY=today.getFullYear(),todayM=today.getMonth(),todayD=today.getDate();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
			year=year=="0"?todayY:year;
			if (birthday_type == "L") {
				if (leapMonth(year) == m && leapDays(year) >= d) {
					for (var y = year; y < 3051; y++) {
							date = getSolarDate(y, m, d, 0);
							if (date.getFullYear() > today.getFullYear() || (date.getFullYear() >= today.getFullYear() && date.getMonth()>=today.getMonth())||
							(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() >= today.getDate())) {
								break;
							}
						}
					}else{
						var ldateY=getSolarDate(todayY-1, m, d, 0), ldateN=getSolarDate(todayY, m, d, 0);
						var disnum=ldateY.getTime()-today.getTime(), disnumN=ldateN.getTime()-today.getTime();
						if(disnum>0){
							year=todayY-1;
						}else if(disnumN>=0){
							year=todayY;
						}else{
							year=todayY+1;
						}
						var ldate=getSolarDate(year, m, d, 0), ldatem=ldate.getMonth(), ldated=ldate.getDate();
						date=ldate;
					}
			}
			else {
				date = new Date();
				date.setMonth(m - 1,d);
				if (date.getMonth()<today.getMonth()||(date.getMonth() == today.getMonth() && date.getDate() < today.getDate()) ) {
					date.setFullYear(date.getFullYear() + 1);
				}
				if (m == 2 && d == 29) {
					for (var y = today.getFullYear();; y++) {
						if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
							date.setFullYear(y);
							date.setMonth(1);
							date.setDate(29);
							break;
						}
					}
				}
			}
			return date;

		},
		difftimeYear:function(birthday_type,year,month,day){
			var dyear , ldateY=getSolarDate(year, month, day, 0),nextY=this.getNextBirthdays(birthday_type,year,month,day);
			dyear=nextY.getFullYear()-ldateY.getFullYear();
			if(year==0){
				dyear=0;
			}
			return dyear;
		},
		html_encode: function(str){
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
		},
		html_decode: function(str){  
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
	});
})();