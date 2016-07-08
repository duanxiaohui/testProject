/**
 * @Author:yangzeming
 * 
 */
var HuangLi = {};
function showDetailBox(){
	$("#detailDialog").fadeIn(150);
}
var pResizeTimer = null;
(function($){
	// Generic calendar body
	// @param: date elem_id
	var config = {
		start_on_monday : true
	};
	var record = {
		elem_id : "",
		nav_date : new Date()
	};
	var cal_content='<div class="cal_header" id="cal_header"><div id="festival_sel" ><span style="color:#dedede;font-size:14px;margin-left:20px;line-height:28px;">节&nbsp;日&nbsp;安&nbsp;排</span><div id="festival_sel_btn"></div></div><div class="lunar_Info" id="lunar_Info"></div><div class="cal_today_btn"></div><div style="clear:both"></div><div id="day_select" class="day_select"><ul><li class="prev_btn" id="prev_btn"></li><li class="cal_year" id="cal_year">year</li><li id="sel_btn" class="sel_btn">	</li><li class="cal_month" m_v="0">1月</li><li class="cal_month" m_v="1">2月</li><li class="cal_month" m_v="2">3月</li><li class="cal_month" m_v="3">4月</li><li class="cal_month" m_v="4">5月</li><li class="cal_month" m_v="5">6月</li><li class="cal_month" m_v="6">7月</li><li class="cal_month" m_v="7">8月</li><li class="cal_month" m_v="8">9月</li><li class="cal_month" m_v="9">10月</li><li class="cal_month" m_v="10">11月</li><li class="cal_month" m_v="11">12月</li><li class="next_btn" id="next_btn">		</li></ul></div></div><div class="cal_content" id="cal_content"></div><div id="open_sel_div"></div><div id="festival_sel_div"></div>';
	var detail_dialog = '<div id="detailDialog"><div id="detail_header"></div><div  id="leftContent"></div><div id="rightContent"><div id="hl_yi"><div class="hl_yi"></div><div id="hl_yi_detail"></div></div><div style="clear:both;"></div><div id="hl_ji"><div class="hl_ji"></div><div id="hl_ji_detail"></div></div><div style="clear:both"></div></div><div id="detail_footer"></div></div>';

	$.fn.init_cal = function(date,c_id){
		$("#"+c_id).html(cal_content);
		$("#"+c_id).append(detail_dialog);
		var elem_id = 'cal_content';
		generic_cal(date,elem_id);
		record.elem_id = elem_id;
		record.nav_date = date_part(date);
		$("#cal_header>.cal_today_btn").click(function(){
			record.nav_date = date_part(new Date());
			generic_cal(record.nav_date,elem_id);
		});
		$("#day_select .cal_month").each(function(){
			$(this).click(function(){
				record.nav_date.setMonth($(this).attr("m_v"));
				generic_cal(record.nav_date,elem_id);
			});
		});
		$("#prev_btn").click(function(){
			record.nav_date = add_date(record.nav_date,-1,"month");
			generic_cal(record.nav_date,elem_id);
		});
		$("#next_btn").click(function(){
			record.nav_date = add_date(record.nav_date,1,"month");
			generic_cal(record.nav_date,elem_id);
		});
		$("#sel_btn,#cal_year").click(function(){
			templates.mousedown_hide_ele("open_sel_div");
			$("#open_sel_div").show();
		});
		$("#festival_sel").click(function(){
			templates.mousedown_hide_ele("festival_sel_div");
			$("#festival_sel_div").show();
		});
		templates.init_sel_year();
		templates.init_sel_festival();
		$(document).mouseleave(function(ev){
			clearTimeout(pResizeTimer);
			$("#detailDialog").hide();
		});
		$("#"+c_id).mouseleave(function(ev){
			clearTimeout(pResizeTimer);
			$("#detailDialog").hide();
		});
		
	};
	

	var generic_cal = function(date,elem_id){
		var date_cal = date || new Date();
		var cd=new Date();
		date_cal = date_part(date_cal);
		date_part(cd);
		var dd = start_date(date_cal);
		var ed = add_date(dd,1,"month");
		var sd = week_start(dd);
		var rows=Math.ceil((ed.valueOf()-sd.valueOf())/(60*60*24*1000*7));
		var height=(Math.round(1 / rows * 1000000) / 10000)*357/100,width = 638/7;
		var str = new StringBuffer(),html = '';
		str.append('<table class="cal_table" id="cal_table"><thead class="cal_thead"><tr><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th style="border:0px;">星期日</th></tr></thead><tbody>');
		// 节假日和节气

		try{
		//var image = "url(BD_images/calendarBg_"+rows+".png)";
		//$(".cal_content").css("background",image);
		for (var i=0; i<rows; i++){
			str.append("<tr>");
				for (var j=0; j<7; j++){
					var date_detail = sd.getFullYear()+"-"+(sd.getMonth()+1)+"-"+sd.getDate();
					var s_m = sd.getMonth()+1,s_d =sd.getDate(), h_t = (s_m < 10? ('0' + s_m): s_m)+''+ (s_d < 10 ? ('0' + s_d) : s_d);
					var workT="";
					try{
						var work_T = worktime["y"+sd.getFullYear()];
						
						if(work_T)
							workT = work_T["d"+h_t];
					}catch(e)
					{}
					str.append("<td day_v='").append(date_detail).append("' colNum=").append(j).append(" style='height:").append(height).append("px;width:").append(width).append("px;");
					var color = "";
					var l_d = templates.lunar_Info(sd);
					color = l_d.color;
					if(j==0)
						str.append("border-left:0px;");
					var cls = "",week_c = "";
					if (sd<dd)
					{
						cls='cal_before';
						color="";
					}
					else if (sd>=ed)
					{
						cls='cal_after';
						color = "";
					}
					else if (sd.valueOf()==cd.valueOf())
						cls='cal_now';
					if(sd.getDay()==0||sd.getDay()==6)
						week_c = 'cal_week';
					str.append("' class='").append(cls).append("' > ");
					//var cellIm = cellImage["d"+date_detail];
					str.append("<div class='cal_month_body ").append(week_c);
					/*if(cellIm)
					{
						str.append(" '  style='background-image:url(").append(cellIm.imageURL).append("); overflow:hidden;' title='").append(cellIm.imageDesc).append("'>");
					}else
					{*/
						str.append(" '  style='overflow:hidden;'>").append('<div class="grid_bg" style="display:none;z-index:0;width:95%;height:96%;position:relative;left:2px;top:1px;"></div>');
					//}
					
					if(workT)
					{
						var classN = "";
						if(workT.w=="上班")
							classN = "workN";
						else
							classN = "rest";
						str.append("<div class='").append(classN).append("'>").append(workT.w).append("</div>");
					}
					//临时调整节气
					switch(date_detail){
						case '2011-11-22':l_d.l_day='廿七';color="";break;
						case '2011-11-23':l_d.l_day='小雪';color="#32CD32";break;
						case '2012-1-1'  :l_d.l_day='元旦';color:"#46BAEC";break;
						case '2012-1-20':l_d.l_day='廿七';color="";break;
						case '2012-1-21':l_d.l_day='大寒';color="#32CD32";break;
					}
					str.append("<div class='cal_num_day'>").append(templates.month_day(sd)).append("</div><div class='cal_lunar_day' style='color:").append(color).append("'>").append(l_d.l_day).append('</div></div></td>');
					sd=add_date(sd,1,"day");
				}
			str.append("</tr>");
		}
		}catch(e){
			alert(e.message);
		}
		str.append('</tbody></table>');
		
		$("#"+elem_id).html(str.toString());
		$("#cal_year").html(date_cal.getFullYear());
		$("#day_select .cal_month").each(function(){
			$(this).removeClass("month_selected");
			if($(this).attr("m_v")==date_cal.getMonth())
			{
				$(this).addClass("month_selected");
			}
		});
		$("#lunar_Info").html(templates.lunar_year(date_cal));
		/*
		 *yang:确定弹出层的位置，c_height+m_top>410 位置应为 c_top : m_top - c_height; c_height+m_top <410   c_top : m_top +5
		 *     m_left - c_width > 0 c_left = m_left - c_width  else  c_left = m_left
		 *  暂时将pos.x默认为鼠标相对于日历的坐标
		 */
		 var colNum =0 ;
		$("#detailDialog").mouseover(function(ev){
			clearTimeout(pResizeTimer);
			var pos = utils.getMousePosition(ev);
			var c_height = $("#detailDialog").height();
					var c_width =  $("#detailDialog").width();
					var c_top=0,c_left=0;
					if(pos.y+c_height>=410)
					{
						c_top = pos.y-c_height-5;
					}
					else
					{
						c_top = pos.y+5;
					}
					var pos_x = colNum*width+Math.ceil(width/2)+20;
					if(pos_x-c_width>0)
					{
						c_left = pos_x - c_width+60;
					}
					else
					{
						if(pos_x+c_width>740)
						{
							c_left = 740-c_width-25;
						}
						else
						{
							c_left=pos_x-30;
						}
					}
					$("#detailDialog").hide();
					$("#detailDialog").css({"top":c_top,"left":c_left});
					pResizeTimer = setTimeout('showDetailBox()', 400);
		});
		$("#cal_table td").each(function(){   
			$(this).hover(
				function(ev){
					clearTimeout(pResizeTimer);
					var day = $(this).attr('day_v');
					hl_Dialog.generic_Content(day);
					var pos = utils.getMousePosition(ev);
			//		$(".cal_month_body").removeClass("grid_bg");
			//		$(this).find(".cal_month_body").addClass("grid_bg");
				//$("#grid_bg_info").remove();
			
				//	$(this).find(".cal_month_body").prepend('<div id="grid_bg_info" style="z-index:0;width:95%;height:96%;position:relative;left:2px;top:1px;"></div>');
					var c_height = $("#detailDialog").height();
					var c_width =  $("#detailDialog").width();
					var c_top=0,c_left=0;
					var p_l = 0,p_t = 0;  // 0 ：表示框在鼠标上面 1表示下  p_l :  0 表示框在鼠标左边  1表示左
					if(pos.y+c_height>=410)
					{
						c_top = pos.y-c_height-5;
						p_t = 0;
					}
					else
					{
						p_t = 1;
						c_top = pos.y+5;
					}
					var col_num = Number($(this).attr("colNum"));
					 colNum =col_num;
					var pos_x = col_num*width+Math.ceil(width/2)+20;
					if(pos_x-c_width>0)
					{
						c_left = pos_x - c_width+60;
						p_l=0;
					}
					else
					{
						if(pos_x+c_width>740)
						{
							c_left = 740-c_width-25;
							p_l=1;
						}
						else
						{
							c_left=pos_x-30;
							p_l=1;
						}
					}
					hl_Dialog.setPosition(p_l,p_t);
					var position = $("#detailDialog").position();
					$("#detailDialog").hide();
					$("#detailDialog").css({"top":c_top,"left":c_left});
					pResizeTimer = setTimeout('showDetailBox()', 400);
					var $THIS = $(this);
					setTimeout(function(){
									$(".grid_bg").hide();
									$THIS.find(".cal_month_body").children().filter(".grid_bg").show();
						},1)
				},
				function(ev){
					//var 
					/*for(var i in ev)
					{
						alert(i+"---"+ev[i]);
					}*/
					clearTimeout(pResizeTimer);
					var pos = utils.getMousePosition(ev);
					if(typeof ev.toElement !='undefined'){
						var te = ev.toElement;
						if(te.id=="detailDialog"||te.id=="leftContent"||te.id=="rightContent"||te.id=="detail_header"|| te.id=="detail_footer")
						{
							
							
							
						}else
						{
							//$(this).find(".cal_month_body").removeClass("grid_bg");
						$(this).find(".cal_month_body").children().filter(".grid_bg").hide();
							$("#detailDialog").hide();
							
						}
					}
					else
					{
						var tar = ev.relatedTarget;
						
						if(tar.id=="detailDialog"||tar.id=="leftContent"||tar.id=="rightContent"||tar.id=="detail_header"|| tar.id=="detail_footer")
						{
							
							
						}
						else
						{
							//$(this).find(".cal_month_body").removeClass("grid_bg");
							$(this).find(".cal_month_body").children().filter(".grid_bg").hide();
				//$("#grid_bg_info").remove();
						//console.log(0);
							$("#detailDialog").hide();
							
						}
					}
					//$("#detailDialog").hide();
				}
			);
			
		});
	
	};

	var hl_Dialog = {
		generic_Content : function(date){
			var d = date.split("-");
			var day = new Date(d[0],(d[1]-1),d[2],0,0,0,0);
			
			// add huangli left content
			var html = new StringBuffer();
			var info = templates.lunar_Info_detail(day);
			var info_f =  templates.lunar_Info(day);
			switch(date){
				case '2011-11-22':info_f.l_day_full='';break;
				case '2011-11-23':info_f.l_day_full='小雪';break;
				case '2012-1-1'  :info_f.l_day_full='元旦';break;
				case '2012-1-20' :info_f.l_day_full='';break;
				case '2012-1-21' :info_f.l_day_full='大寒';break;
				case '2012-1-22' :info_f.l_day_full='除夕';break;
				case '2012-1-23' :info_f.l_day_full='春节';break;
			}
			//console.log(date+":"+info_f.l_day_full);
			html.append('<div class="hl_num_left">').append(d[2]).append('</div><div class="header_right"><div class="hl_dayInfo">')
				.append(d[0]+'年'+d[1]+'月'+d[2]+'日').append(' 星期'+numToWeek(day.getDay())).append('</div>').append('<div class="detail_lunar">').append(info.lunar).append(' '+info.y_Info).append('</div></div><div style="clear:both;padding-left:80px;padding-right:4px;line-height:15px;color:red;">').append(info_f.l_day_full).append("</div>");//<div class="hl_week">').append('</div>');
			$("#leftContent").html(html.toString());
			var hl_h = new StringBuffer();
			
			hl_h.append('<div class="hl_h_lunar">').append(info.lunar).append('</div><div class="hl_h_lunar_detail">').append(info.y_Info).append('</div>');
			//$("#hl_header").html(hl_h.toString());
			$("#hl_yi_detail").html(info.huangliY);
			$("#hl_ji_detail").html(info.huangliJ);
		
		},
		// 设置detail框的箭头方向
		setPosition : function(p_l,p_t){  // p_t: 0表示框在鼠标上面 1表示下  p_l :  0 表示框在鼠标左边  1表示左
			$("#detail_header").removeClass();	
			$("#detail_footer").removeClass();	
			
			if(p_l==0&&p_t==1)   // 表示框在鼠标左下方
			{
				$("#detail_header").addClass("detail_top_right");
				$("#detail_footer").addClass("detail_down_normal");
			}
			if(p_l==0&&p_t==0)  // 左上
			{
				$("#detail_header").addClass("detail_top_normal");
				$("#detail_footer").addClass("detail_down_right");
			}
			if(p_l==1&&p_t==0)  // 右上
			{
				$("#detail_header").addClass("detail_top_normal");
				$("#detail_footer").addClass("detail_down_left");
			}
			if(p_l==1&&p_t==1)  // 右下
			{
				$("#detail_header").addClass("detail_top_left");
				$("#detail_footer").addClass("detail_down_normal");
			}
		
		}
	};
	///	<summary>
	///		This method is internal.
	///	</summary>
	/// <private />
	function StringBuffer(){
		this._strings = new Array();
	};
	var templates = {
		month_day : function(date){
			var d = date || new Date();
			return d.getDate();
		},
		lunar_Info : function(date){
			
			var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
			var day = date.getDate();
			var cld_day = cld[day - 1];
			var lunar_detail = {
				l_day : "",
				l_month : "",
				l_day_full:""
			};
			lunar_detail.l_day = cDay(cld_day.lDay);
			lunar_detail.l_month = cld_day.lMonth;
			lunar_detail.color = "";
			var s,s2;
			s=cld_day.lunarFestival;
			  if(s.length>0) { // 农历节日
				if(s.length>6)
				{
					s2 = s.toString();
					s = s.substr(0, 4)+'...';
				 }
				lunar_detail.color = "#32CD32";
			  }
			  else { // 廿四节气
				s=cld_day.solarTerms;
				s2=s.toString();
				//节气例外
	            var key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	            
	            if(typeof this.SolarTermException[key] != 'undefined'){
	            	s = s2 = this.SolarTermException[key];
	            }
				if(s.length>0){
					  lunar_detail.color = "#32CD32";             
					  if((s =='清明')||(s =='芒种')||(s =='夏至')||(s =='冬至')){
						lunar_detail.color = "#32CD32";
						if(s =='清明') s = '清明节';
					  }             
				}
				else 
				{ // 公历节日
					  s=cld_day.solarFestival;
					  s2 = s.toString();
					  if(s.length>0) {
						if(s.length>6)
						  {
							
							s = s.substr(0, 4)+'..';
						  }
						lunar_detail.color = "#46BAEC";
					  }
				}
			  }
			  if(s.length>0)
			  {
				  lunar_detail.l_day = s;
				  lunar_detail.l_day_full = s2;
			  }
			//var info = templates.getChinaNum(lunar_detail.l_month)+"月"+lunar_detail.l_day;
			 
			//var info = lunar_detail.l_day;
			return lunar_detail;
		},
		//节气例外调整
		SolarTermException : {
			"2012-5-20":"小满",	"2012-5-21":"",
			"2012-12-6":"",		"2012-12-7":"大雪",
			"2013-2-3":"",		"2013-2-4":"立春",
			"2013-7-22":"大暑",	"2013-7-23":"",
			"2013-12-21":"",	"2013-12-22":"冬至",
			"2014-3-5":"",		"2014-3-6":"惊蛰",
			"2015-1-5":"",		"2015-1-6":"小寒",
			"2016-6-6":"",		"2016-6-7":"大雪",
			"2017-7-22":"大暑",	"2017-7-23":"",
			"2017-12-21":"",	"2017-12-22":"冬至",
			"2018-2-18":"",		"2018-2-19":"雨水",
			"2018-3-20":"",		"2018-3-21":"春分",
			"2019-2-4":"立春",	"2019-2-5":"",
			"2019-6-21":"夏至",	"2019-6-22":"",
			"2020-7-6":"小暑",	"2020-7-7":"",
			"2020-8-22":"处暑",	"2020-8-23":"",
			"2020-12-6":"",		"2020-12-7":"大雪"
		},
		lunar_Info_detail : function(date){
			
			var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
			var year = date.getFullYear();
			var day = date.getDate();
			var cld_day = cld[day - 1];
			var festival=[];
			var info = {
				lunar:"",
				y_Info:"",
				huangliY:"无",
				huangliJ:"无"
			};
			info.lunar = '农历' + (cld_day.isLeap ? '闰 ' : '')+templates.getChinaNum(cld_day.lMonth)+"月"+ cDay(cld_day.lDay);
			info.y_Info = cld_day.cYear + '年 '+ cld_day.cMonth + '月 ' + cld_day.cDay + '日';
			try {
				if(year>2009&&year<2013) // 杨
				{
							if (eval("HuangLi.y" + year) == null) {
								var filename="http://www.365rili.com/js/huangli/"+year+".js";
								$.getScript(filename,function(){
									var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
										+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));

									info.huangliY = hl.y;
									info.huangliJ = hl.j;
								
								}); 
							}
							else
							{
								var hl = eval('HuangLi.y'+ year+ '.d'+ (cld_day.sMonth < 10? ('0' + cld_day.sMonth): cld_day.sMonth)
										+ (cld_day.sDay < 10 ? ('0' + cld_day.sDay) : cld_day.sDay));
								info.huangliY = hl.y;
								info.huangliJ = hl.j;
								
							}
							
				}
				else
				{
					
				}
				
			} catch (e) {
				alert(e.message);
			}
			
			
			return info;
		},
		lunar_year : function(date){

			var l_year = date.getFullYear()+'年'+(date.getMonth()+1)+'月 '+cyclical(date.getFullYear() - 1900 + 36) + '年【'+ Animals[(date.getFullYear() - 4) % 12] + '年】';
			return l_year;
		},
		getChinaNum :function(Num) {
			var monthEn;
			switch(Num){
				case 1 : monthEn = "一";break;
				case 2 : monthEn = "二";break;
				case 3 : monthEn = "三";break;
				case 4 : monthEn = "四";break;
				case 5 : monthEn = "五";break;
				case 6 : monthEn = "六";break;
				case 7 : monthEn = "七";break;
				case 8 : monthEn = "八";break;
				case 9 : monthEn = "九";break;
				case 10 : monthEn = "十";break;
				case 11 : monthEn = "十一";break;
				case 12 : monthEn = "腊";break;
			}
			return monthEn;
		},
		init_sel_festival : function(){
				var festival_m = festival_main;
				if(festival_main)
				{
					var str = new StringBuffer();
					str.append('<div id="festival_sel_body">');
					for(var i in festival_main){
							str.append('<div date="'+i).append('">').append(festival_main[i]+'</div>');
					}
					str.append('</div>');	
				}
				$("#festival_sel_div").html(str.toString());
				$("#festival_sel_body>div").each(function(){
					$(this).click(function(){
						var y = $(this).attr("date").split("_");
						
						record.nav_date.setFullYear(y[0]);
						record.nav_date.setMonth(Number(y[1])-1);
						generic_cal(record.nav_date,record.elem_id);
						$("#festival_sel_div").hide();
					});
					$(this).hover(function(){
						$(this).addClass("year_bg");
					},
					function(){
						$(this).removeClass("year_bg");
					});
			});
		},
		init_sel_year : function(){
			var str = new StringBuffer();
			str.append('<div id="sel_body">');
			for(var i=1900;i<2050;i++)
			{
				str.append('<div>').append(i).append('</div>');
			}
			str.append('</div>');
			
			// 设置日期选择的初始位置
			var scroll_top = record.nav_date.getFullYear()-1900;
			
			//$("#sel_body").attr("scrollTop",scroll_top*div_height);
			$("#open_sel_div").html(str.toString());
			//var div_height = $("#sel_body>div").height();
			$("#sel_body>div").each(function(){
				$(this).click(function(){
					var y = $(this).html();
					record.nav_date.setFullYear(y);
					generic_cal(record.nav_date,record.elem_id);
					$("#open_sel_div").hide();
				});
				$(this).hover(function(){
					$(this).addClass("year_bg");
				},
				function(){
					$(this).removeClass("year_bg");
				});
			});

		},
		mousedown_hide_ele : function(id){

			$(document).bind("mousedown."+id, function(r) {
				var p = r.target;
				var q = document.getElementById(id);
			
				while (true) {
						if (p == q) {
							return true
						} else {
							if (p == document) {
								$(document).unbind("mousedown."+id);
								$("#"+id).hide();
									return false
								} else {
									p = $(p).parent()[0]
								}
							}
						}
				});
		}
	};
	function numToWeek(inStr){
		switch (inStr) {
			case 1:
				return '一';
			case 2:
				return '二';
			case 3:
				return '三';
			case 4:
				return '四';
			case 5:
				return '五';
			case 6:
				return '六';
			case 0:
				return '日';
		}
	}
	var utils = {
		getEvent : function(ev) {
			return window.event ? window.event : (ev ? ev : null);
		},
		getMousePosition : function(ev) {
			var evt = this.getEvent(ev);
			if (evt.pageX || evt.pageY) {
				return {
					x : evt.pageX,
					y : evt.pageY
				};
			}
			return {
				x : evt.clientX + document.documentElement.scrollLeft
						- document.documentElement.clientLeft,
				y : evt.clientY + document.documentElement.scrollTop
						- document.documentElement.clientTop
			};
		}
	};
	var cacheMgr = {
		cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
		getCld : function(year, month) {
			var key = getMonthKey(year, month);
			var cld = this.cldCache[key];
			if (typeof cld == 'undefined') {
				cld = new calendar(year, month);
				this.cldCache[key] = cld;
			}
			return cld;
		}
	}
	function getMonthKey(year, month) { // 传入的month为0-11的数值
			return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
	}
	var date_part = function(date){
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);	
		return date;
	};
	String.prototype.leftpad = function(len, str){
		if (!str) {
			str = '0';
		}
		
		var s = '';
		for (var i = 0; i < len - this.length; i++) {
			s += str;
		}
		return s + this;
	};
	var week_start = function(date){
			var shift=date.getDay();
			if (config.start_on_monday){
				if (shift==0) shift=6
				else shift--;
			}
			return date_part(add_date(date,-1*shift,"day"));
	};
	var add_date = function(date,inc,mode){
		var ndate=new Date(date.valueOf());
		switch(mode){
			case "day": ndate.setDate(ndate.getDate()+inc); break;
			case "week": ndate.setDate(ndate.getDate()+7*inc); break;
			case "month": ndate.setMonth(ndate.getMonth()+inc); break;
			case "year": ndate.setYear(ndate.getFullYear()+inc); break;
			case "hour": ndate.setHours(ndate.getHours()+inc); break;
			case "minute": ndate.setMinutes(ndate.getMinutes()+inc); break;
			default:
				return new Date();
		}
		return ndate;
	};
	var start_date = function(date){
		date.setDate(1);
		return date_part(date);
	};
	StringBuffer.prototype.append = function(str){
		this._strings.push(str);
		return this;
	};
	StringBuffer.prototype.toString = function(){
		var str = arguments.length == 0 ? '' : arguments[0];
		return this._strings.join(str);
	};

}
)(jQuery);
