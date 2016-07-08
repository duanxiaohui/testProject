<%@ page contentType="text/html;charset=utf-8" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" />
<title>365日历-QQ空间日历</title>
<link rel="stylesheet" type="text/css" href="/webapp/assets/style/base.css" />
<link rel="stylesheet" type="text/css" href="/webapp/assets/style/qzone.css?v=2014040401" />
<link rel="stylesheet" type="text/css" href="/css/jquery-ui-1.9.2.custom.min.css" />
<style>[ng-cloak] { display: none; }</style>
</head>
<body ng-app="365_calendar" >
	<div class="wrapper app-calendar" ng-controller='QzoneController' ng-cloak>
		<div class="app-calendar-inner">
			<div class="content" id="subscribed_calendar" ng-show="viewType=='collect'">
				<div class="header">
					<div class="header_left">
						<div class="calendar_daybox">
							<div class='year_month_div'><span class='sp_year'>{{scheduleModel.selectedDateItem.year}}</span>年<span class='sp_month'>{{scheduleModel.selectedDateItem.month+1}}</span>月</div>
							<div class='solar_text'>{{scheduleModel.selectedDateItem.solar}}</div>
							<div class='lunar_text'>{{scheduleModel.selectedDateItem.lunarStr}}</div>
							<div class='daymatter_text'>{{scheduleModel.selectedDateItem.daymatter}}</div>
							<a href='javascript:void(0)' class='lnk_today' ng-click="returnToday()" ng-hide="scheduleModel.selectedDateItem.isToday">回今天</a>
						</div>
					</div>
					<div class="header_right">
						<div class="calendar_month_view">
							<ul class="month_table_header e_clear">
								<li ng-repeat="item in monthHeaderItems">{{item.weekNum}}</li>
							</ul>
							<ul class="month_table_content e_clear">
								<li ng-class='{month_befor:item.isMonthBefore,month_after:item.isMonthAfter,on:item.selected}' ng-repeat="item in scheduleModel.monthRows" ng-click="scheduleModel.selectDateItem(item)">
									<div class='schedule_solar'>{{item.solar}}</div>
									<div class='schedule_icon'>
										<img ng-class="{schedule_imgshow:item.schedules.length}" ng-src='{{calendarModel.selected.extend.theme.mu}}'/>
									</div>
								</li>
							</ul>
							<div class='month_next_prev'>
								<a href='javascript:void(0)' class='lnk_prev' ng-click="monthChanged(-1)">上个月</a>
								<a href='javascript:void(0)' class='lnk_next' ng-click="monthChanged(1)">下个月</a></div>
						</div>
					</div>
				</div>
				<div class="content_left">
					<div class="left_btn_box">
						<a href="javascript:void(0)" class="calendar_more_btn" ng-click="switchView('hall')">更多日历</a>
						<a href="javascript:void(0)" class="mycalendar_collect">我的收藏</a>
					</div>
					<div class="calendar_collect_scrollpane" style="overflow-x:hidden;overflow-y:auto;">
						<ul class="calendar_collect_list">
							<li ng-repeat="calendar in calendarModel.calendars" class='collect_list_item' title='{{calendar.title}}' 
								ng-class="{on:calendar.selected}" ng-click="selectCalendar(calendar)">
								<span>{{calendar.title}}</span>
							</li>
						</ul>
					</div>
					<a href="http://itunes.apple.com/cn/app/365ri-li-xin-ban/id642101382?ls=1&mt=8" class="down_ios_btn" target="_blank">下载iPhone版</a>
					<a href="http://d2.365rili.com/coco.apk" class="down_android_btn">下载Android版</a>
					<a href="http://www.365rili.com" target="_blank" class="calendar_365"></a>
				</div>
				<div class="content_right">
					<div class="calendar_collect">
						<div class="calendar_theme_wrapper" style="background-image:url({{calendarModel.selected.extend.theme.bgu}})">
							<div class='calendar_btn'>
								<a href='javascript:void(0)' class='share_calendar_btn' ng-click="share('calendar', calendarModel.selected)" ng-show="calendarModel.selected" 
								ng-style="{color:calendarModel.selected.titleColor}">分享此日历</a>
								<a href='javascript:void(0)' class='add_schedule_btn' ng-click="showScheduleCreator()" 
									ng-show="calendarModel.selected.access_type==2||calendarModel.selected.access_type==3" 
									ng-style="{color:calendarModel.selected.titleColor}">添加日程</a>
								<a href='javascript:void(0)' class='unsubscribe_btn' ng-show="calendarModel.selected.access_type==1" 
									ng-click="unsubscribeCalendar(calendarModel.selected)" ng-style="{color:calendarModel.selected.titleColor}">取消收藏</a>
							</div>
							<ul class='schedule_list'>
								<li ng-repeat="schedule in scheduleModel.selectedDateItem.schedules" class='schedule_item' ng-click="showTip(schedule)">
									<div class='schedule_txt'>
										{{schedule.timeStr}}{{schedule.text}}
									</div>
									<div class="schedule_pic">
										<img ng-repeat="item in schedule.pics" ng-show="$index<3" ng-src="{{'http://cocoimg.365rili.com/schedule_pics/default/'+item.pic}}" width="100"/>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="content" id="more_calendar" ng-show="viewType=='hall_list'||viewType=='hall_panel'">
				<div class="return_box">
					<span>更多日历</span>
				</div>
				<div class="more_calendar_left">
					<div class="return_btn"><a href="javascript:;" ng-click="switchView('collect')">&lt;返回</a></div>
					<div class="calendar_hall_scrollpane">
						<ul class="calendar_hall_category">
							<li ng-repeat="category in categoryModel.category" class='hall_category_item' ng-class='{on:category.selected}' ng-click="selectCategory(category);">
								<span class='category_link'>{{category.title}}</span>
							</li>
						</ul>
					</div>
					<a href="http://itunes.apple.com/cn/app/365ri-li-xin-ban/id642101382?ls=1&mt=8" class="down_ios_btn" target="_blank">下载iPhone版</a>
					<a href="http://d2.365rili.com/coco.apk" class="down_android_btn">下载Android版</a>
					<a href="http://www.365rili.com" target="_blank" class="calendar_365"></a>
				</div>
				<div class="content_right">
					<div class="calendar_hall">
						<ul  class="calendar_hall_list" ng-show="viewType=='hall_list'">
							<li class='hall_item' ng-repeat="calendar in categoryModel.publicCalendars" ng-click="showPublicCalendar(calendar)">
								<div class='e_clear'>
									<div class='hall_item_right ui-corner-all-5'>
										<div class='img_shadow hall_item_image'>
											<div class='img_div'><img ng-src='{{calendar.background_img}}' /></div>
										</div>
									</div>
									<div class='hall_item_left'>
										<h3>{{calendar.title}}</h3>
										<div class="hall_item_desc">{{calendar.desc}}</div>
										<div class='hall_item_button'>
											<a href='javascript:;' class='hall_share' ng-click="share('calendar', calendar, $event)">分享</a>
											<a href='javascript:;' class='hall_subscribe {subscribe_class}' ng-class='{on:calendar.is_subscribed!=0}' cid='{id}' 
												ng-click="subscribeCalendar(calendar, $event)">
												<span ng-show="calendar.is_subscribed != 0">已收藏</span>
												<span ng-show="calendar.is_subscribed == 0">收藏</span>
											</a>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div class="calendar_hall_panel" ng-show="viewType=='hall_panel'">
							<div class="hall_top_view">
								<div class="hall_image_div">
									<img class="hall_top_img" ng-src="{{selectedPublicCalendar.background_img_original}}"/>
								</div>
								<div class="hall_top_right">
									<div class="hall_top_title">{{selectedPublicCalendar.title}}</div>
									<div class="hall_top_desc">{{selectedPublicCalendar.desc}}</div>
									<div class="hall_top_btn e_clear">
										<a href="javascript:;" class="collect_calendar_btn" ng-class="{on:selectedPublicCalendar.is_subscribed!=0}"
											ng-click="subscribeCalendar(selectedPublicCalendar, $event)">
											<span ng-show="selectedPublicCalendar.is_subscribed!=0">已收藏</span>
											<span ng-show="selectedPublicCalendar.is_subscribed==0">收藏</span>
										</a>
										<a href="javascript:;" class="share_calendar_btn" ng-click="share('calendar', selectedPublicCalendar)">分享</a>
									</div>
								</div>
							</div>
							<div class="hall_panel_view">
								<h3>近期日程</h3>
								<ul class="public_schedule_list">
									<li class='public_schedule_item' ng-repeat="schedule in publicScheduleData">
										<div class='glance_schedule_txt' ng-click="showTip(schedule)">{{schedule.time}}{{schedule.text}}</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="content" id="recommend_calendar" ng-show="viewType=='recommend'">
				<div class="recommend_calendar_header">精品日历推荐</div>
				<div class="recommend_calendar_content">
					<ul class="e_clear">
						<li ng-repeat="calendar in categoryModel.publicCalendars" class="recommend_item">
							<div class="item_box">
								<div class="recommend_img_wrapper">
									<img ng-src="{{calendar.background_img}}" class="recommend_img" ng-click="!$first && toggleCalendarSubscribe(calendar)"/>
								</div>
								<span class="recommend_title">{{calendar.title}}</span>
							</div>
							<div class="recommend_subscribe">
								<span>收藏</span>
								<div class="recommend_checkbox" ng-class="{nocheck:$first,on:calendar.is_subscribed != 0 && !$first}" ng-click="!$first && toggleCalendarSubscribe(calendar)"></div>
							</div>
						</li>
					</ul>
				</div>
				<div class="recommend_calendar_footer">
					<a ng-click="subscribeRecommend()" href="javascript:;">确定</a>
				</div>
			</div>
			<div ng-controller="ScheduleTip" ng-show="show">
				<div class="schedule_tip_layer" >
					<div class="schedule_tip_content">
						<a href="javascript:;" class="close_btn" ng-click="show=false">关闭</a>
						<p class="schedule_time">{{schedule.datetime}}</p>
						<p class="schedule_lunar_time">{{schedule.lunartime}}</p>
						<div class="schedule_txt_content" ng-style="heightStyle">
						<div class="image_div">
							<img ng-repeat="item in schedule.pics" ng-src="{{'http://cocoimg.365rili.com/schedule_pics/default/'+item.pic}}"/>
						</div>
						<div class="content_div">
							<p ng-repeat="content in schedule.contents track by $index">{{content}}</p>
						</div>
						<div class="tip_url_div {{schedule.url_class}}"><span>详细链接：</span><a ng-href="{{schedule.url}}" target="_blank">{{schedule.url}}</a></div>
						<div class="tip_location_div {{schedule.location_class}}"><span>地址：</span><a href="{location_url}" target="_blank">{{schedule.location_name}}</a></div>
						</div>
						<div class="schedule_bottom">
							<a href="javascript:;" class="js_delete" ng-show="schedule.access_type==2||schedule.access_type==3" ng-click="deleteSchedule(schedule)">删除</a>
							<a href="javascript:;" class="js_detail" ng-show="schedule.access_type==2||schedule.access_type==3" ng-click="editSchedule(schedule)">编辑</a>
							<a href="javascript:;" class="js_addnotice" ng-show="schedule.access_type==1 && false" >添加提醒</a>
							<a href="javascript:;" class="js_share" ng-click="shareSchedule(schedule)">分享</a>
						</div>
					</div>
				</div>
				<div style="z-index: 500;width: 100%;height:{{scrollHeight}};overflow: hidden;-webkit-user-select: none;" class="ui-widget-overlay"></div>
			</div>
			<div ng-controller="ScheduleCreator" ng-show="show">
				<div id="div_add_schedule" class="add_schedule_layer complete">
					<a href="javascript:;" class="close_btn js_close" ng-click="show=false"></a>
					<h2>添加日程</h2>
					<div class="add_schedule_content">
						<form>
							<input type="hidden" name="scheduleId" ng-model="schedule.scheduleId"/>
							<dl class="e_clear">
								<dt>内容：</dt>
								<dd>
									<textarea name="schTitle" ng-model="schedule.schTitle"></textarea>
								</dd>
							</dl>
							<dl class="e_clear">
								<dt>开始时间：</dt>
								<dd>
									<div class="timetype">
										<label>
											<input type="checkbox" name="alldayEvent" class="allday_event" ng-model="schedule.alldayEvent" ng-change="alldayEventChanged()"/>
											<span>全天</span>
										</label>
										<label>
											<input type="checkbox" name="calendarType" ng-model="schedule.calendarType" ng-true-value="L" ng-false-value="S" />
											<span>农历</span>
										</label>
									</div>
									<div class="data_box">
										<ul class="js_datepicker" style="float:left;">
											<li ng-show="schedule.calendarType == 'S'">
												<input ui-date name="startTime" ng-model="schedule.startTime"/>
											</li>
											<li class="js_lunarPicker" ng-show="schedule.calendarType == 'L'">
												<select name="dlt_from_year" ng-model="lunar_year">
													<option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option>
												</select>
												<select name="dlt_from_month" ng-model="lunar_month">
													<option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option>
												</select>
												<select name="dlt_from_date" ng-model="lunar_date">
													<option value="1">初一</option><option value="2">初二</option><option value="3">初三</option><option value="4">初四</option><option value="5">初五</option><option value="6">初六</option><option value="7">初七</option><option value="8">初八</option><option value="9">初九</option><option value="10">初十</option><option value="11">十一</option><option value="12">十二</option><option value="13">十三</option><option value="14">十四</option><option value="15">十五</option><option value="16">十六</option><option value="17">十七</option><option value="18">十八</option><option value="19">十九</option><option value="20">二十</option><option value="21">廿一</option><option value="22">廿二</option><option value="23">廿三</option><option value="24">廿四</option><option value="25">廿五</option><option value="26">廿六</option><option value="27">廿七</option><option value="28">廿八</option><option value="29">廿九</option><option value="30">三十</option>
												</select>
											</li>
										</ul>
										<div class="hour js_time" ng-hide="schedule.alldayEvent">
											<select name="dlt_start_hour" ng-model="schedule.startHour">
												<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option>
											</select>
											<span>时</span>
											<select name="dlt_start_minute" ng-model="schedule.startMinute">
												<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option>
											</select>
											<span>分</span>
										</div>
									</div>
								</dd>
							</dl>
							<div class="complete_content">
								<div class="complete_set">
									<!--  <dl class="e_clear"><dt>添加图片：</dt><dd><a href="javascript:void(0)" class="upload_image_link">本地上传</a><ddd id="image_thumb"></ddd></dd></dl> -->
									<dl class="st1 e_clear" ng-show="schedule.calendarType == 'S'">
										<dt>重复类型：</dt>
										<dd>
											<select ng-model="schedule.repeatType">
												<option mode="s-no" value="0">不重复</option>
												<option mode="s-t" value="2">阶段日程</option>
												<option mode="s-dy" value="1">按天</option>
												<option mode="s-w" value="7">按周</option>
												<option mode="s-m" value="31">按月</option>
												<option mode="s-dy" value="365">按年</option>
											</select>
										</dd>
									</dl>
									<dl class="st2 e_clear" ng-show="schedule.calendarType == 'L'">
										<dt>重复类型：</dt>
										<dd>
											<select ng-model="schedule.repeatType">
												<option mode="l-no" value="0">不重复</option>
												<option mode="l-my" value="29">农历每月</option>
												<option mode="l-my" value="354">农历每年</option>
											</select>
										</dd>
									</dl>
									<dl class="st3 e_clear" ng-hide="schedule.repeatType==0||schedule.repeatType==2">
										<dt>重复频率：</dt>
										<dd>每
											<select name="repeatFrequency" ng-model="schedule.repeatFrequency">
												<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option>
											</select>
											<span ng-show="schedule.repeatType==1">天</span>
											<span ng-show="schedule.repeatType==7">周</span>
											<span ng-show="schedule.repeatType==31||schedule.repeatType==29">月</span>
											<span ng-show="schedule.repeatType==365||schedule.repeatType==354">年</span>
										</dd>
									</dl>
									<dl class="st4 e_clear" ng-show="schedule.repeatType==31">
										<dt>重复时间：</dt>
										<dd class="repetition_time js_rp_month">
											<label>
												<input type="radio" name="rdo_repeat" checked="checked" value="month"/>
												<span>一个月的某一天</span>
											</label>
											<label>
												<input type="radio" name="rdo_repeat" value="week"/>
												<span>一周的某一天</span>
											</label>
										</dd>
									</dl>
									<dl class="st5 e_clear" ng-show="schedule.repeatType==7">
										<dt>重复时间：</dt><dd class="repetition_time js_rp_week"><label><input type="checkbox" name="chk_rp_week" day="一" value="MON"/><span>一</span></label><label><input type="checkbox" name="chk_rp_week" day="二" value="TUE"/><span>二</span></label><label><input type="checkbox" name="chk_rp_week" day="三" value="WED"/><span>三</span></label><label><input type="checkbox" name="chk_rp_week" day="四" value="THU"/><span>四</span></label><label><input type="checkbox" name="chk_rp_week" day="五" value="FRI"/><span>五</span></label><label><input type="checkbox" name="chk_rp_week" day="六" value="SAT"/><span>六</span></label><label><input type="checkbox" name="chk_rp_week" day="日" value="SUN"/><span>日</span></label>&nbsp;<a href="javascript:;" class="js-work-day" title="只选择工作日">工作日</a>&nbsp;<a href="javascript:;" class="js-rest-day" title="只选择双休日">双休日</a></dd></dl>
									<dl class="st6 e_clear" ng-hide="schedule.repeatType==0||schedule.repeatType==2">
										<dt>结束条件：</dt>
										<dd class="end_data"><ul><li><label><input type="radio" name="rdo_repeat_cond" value="never" checked="checked"/><span>从不</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="times" id="rdo_repeat_cond_1"/><span>发生</span></label><input type="text" class="end_data_text1" name="repeatCount" value="20"/><label for="rdo_repeat_cond_1"><span>次后</span></label></li><li><label><input type="radio" name="rdo_repeat_cond" value="date"/><span>在</span></label><input type="text" name="repeatStopTime" class="end_data_text2"/></li></ul>
										</dd>
									</dl>
									<!--<dl class="st7 e_clear"><dt>摘要：</dt><dd class="summary"></dd></dl>-->
									<dl class="st8 e_clear" ng-show="schedule.repeatType==2">
										<dt>结束时间：</dt>
										<dd class="end_time">
											<input type="text" name="endTime"/>
											<div class="hour js_time" ng-hide="schedule.alldayEvent">
												<select name="dlt_end_hour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09" selected="selected">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>
												<span>时</span>
												<select name="dlt_end_minute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>
												<span>分</span>
											</div>
										</dd>
									</dl>
									<dl class="remind e_clear rToday"><dt>提醒设置：</dt><dd><label class="remind_0"><input type="checkbox" value="0"/><span>正点</span></label><label class="remind_5"><input type="checkbox" value="5"/><span>5分前</span></label><label class="remind_10"><input type="checkbox" value="10"/><span>10分前</span></label><label class="remind_30"><input type="checkbox" value="30"/><span>30分前</span></label><label class="remind_60"><input type="checkbox" value="60"/><span>1小时前</span></label><label class="remind_today"><input type="checkbox" value="0"/><span>当天</span></label><label class="remind_1440"><input type="checkbox" value="1440"/><span>1天前</span></label><label class="remind_4320"><input type="checkbox" value="4320"/><span>3天前</span></label></dd></dl>
									<dl class="e_clear"><dt>关联URL：</dt><dd><input type="text" size="50" name="linked_url" ng-model="schedule.url"/></dd></dl><dl class="e_clear"><dt>地址：</dt><dd><input type="text" size="50" name="location" ng-model="schedule.location"/></dd></dl>
								</div>
							</div>
						</form>
					</div>
					<div class="add_schedule_bottom">
						<a href="javascript:;" class="giveup_schedule_btn js_close" ng-click="show=false">放弃</a>
						<a href="javascript:;" class="create_schedule_btn js_save" ng-click="addSchedule(schedule)">保存</a>
						<a href="javascript:;" class="simple_more">详细设置</a>
						<div class="layer_arrow">
							<em class="arrow_1 ui-shadow"></em>
							<em class="arrow_2 ui-shadow"></em>
							<em class="arrow_3 ui-shadow"></em>
							<em class="arrow_4 ui-shadow"></em>
							<em class="arrow_5 ui-shadow"></em>
							<em class="arrow_6 ui-shadow"></em>
							<em class="arrow_7 ui-shadow"></em>
							<em class="arrow_8 ui-shadow"></em>
							<em class="arrow_9 ui-shadow"></em>
							<em class="arrow_10 ui-shadow"></em>
							<em class="arrow_11 ui-shadow"></em>
							<em class="arrow_12 ui-shadow"></em>
						</div>
					</div>
				</div>
				<div style="z-index: 500;width: 100%;height:{{scrollHeight}};overflow: hidden;-webkit-user-select: none;" class="ui-widget-overlay"></div>
			</div>
			<div ng-controller="ShareViewController" ng-show="show">
				<div class='share_dialog' style="z-index:601;">
					<a ng-href='{{url}}' target='_blank' ng-click="show=false">点击此处分享</a>
				</div>
				<div ng-click="show=false;" style="z-index: 600;width: 100%;height:{{scrollHeight}};overflow: hidden;-webkit-user-select: none;" class="ui-widget-overlay"></div>
			</div>
		</div>
		<div ng-show="viewType=='collect'&&!hideMaskView">
			<div class="mask_bg"></div>
			<div class="mask_data_box">
				<div class="mask_data">9</div>
			</div>
			<div class="mask_title">
				<div class="mask_title_txt">
					<p>点这里可以切换日期哦！</p>
					<a href="javascript:;" class="mask_title_btn" ng-click="hideMaskViewClicked()">知道了</a>
				</div>
			</div>
		</div>
	</div>
<script src="/webapp/sea-modules/seajs/seajs/2.1.1/sea.js?+jquery"></script>
<script src="/webapp/sea-modules/jqueryui/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript" src="/js/app/bower_components/angular/angular.js"></script>
<script type="text/javascript" src="/js/app/bower_components/angular-ui-date/src/date.js"></script>
<script type="text/javascript" src="/js/newweb/common.js"></script>
<script type="text/javascript" src="/js/newweb/solarAndLunar.js"></script>
<script type="text/javascript" src="/js/newweb/json2.js"></script>
<script type="text/javascript" src="/js/angular/controller/qzone.js"></script>
<script type="text/javascript" src="/js/angular/model/calendarModel.js"></script>
<script type="text/javascript" src="/js/angular/model/scheduleModel.js"></script>
<script type="text/javascript" charset="utf-8" src="http://fusion.qq.com/fusion_loader?appid=100296108&platform=qzone"></script>
</body>
</html>