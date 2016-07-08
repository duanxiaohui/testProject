(function($){
	// Generic calendar body
	// @param: date elem_id
	var config = {
		start_on_monday : false
	};
	/*var record = {
		elem_id : "",
		nav_date : new Date()
	};*/
	$.fn.init_cal = function(date,c_id){
		var elem_id = 'cal_content';
		generic_cal(date,elem_id);
		record.elem_id = elem_id;
		record.nav_date = date_part(date);
		$("#preMonth").click(function(){
			record.nav_date = add_date(record.nav_date,-1,"month");
			//generic_cal(record.nav_date,elem_id);
			$("#gridcontainer").changDate();
		});
		$("#nextMonth").click(function(){
			record.nav_date = add_date(record.nav_date,1,"month");
			//generic_cal(record.nav_date,elem_id);
			$("#gridcontainer").changDate();
		});
		$("#preYear").click(function(){
			record.nav_date = add_date(record.nav_date,-1,"year");
			//generic_cal(record.nav_date,elem_id);
			$("#gridcontainer").changDate();

		});
		$("#nextYear").click(function(){
			record.nav_date = add_date(record.nav_date,1,"year");
			//generic_cal(record.nav_date,elem_id);
			$("#gridcontainer").changDate();
		});
	};
	$.fn.changeNav = function(){
		generic_cal(record.nav_date,record.elem_id);
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
		var height=24,width=Math.floor(174/7);
		var str = new StringBuffer(),html = '';
		str.append('<table class="cal_table" id="cal_table"><thead class="cal_thead"><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead><tbody>');
		// 节假日和节气

		try{
			
		for (var i=0; i<rows; i++){
			str.append("<tr>");
				for (var j=0; j<7; j++){
					var date_detail = sd.getFullYear()+"-"+(sd.getMonth()+1)+"-"+sd.getDate();
					var s_m = sd.getMonth()+1,s_d =sd.getDate(), h_t = (s_m < 10? ('0' + s_m): s_m)+ (s_d < 10 ? ('0' + s_d) : s_d);
					
					
					str.append("<td day_v='").append(date_detail).append("' colNum=").append(j).append(" style='height:").append(height).append("px;");
					var color = "";
					if(j==0)
						str.append("");
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
					//if(sd.getDay()==0||sd.getDay()==6)
					//	week_c = 'cal_week';
					str.append("' class='").append(cls).append("' > ");
					//var cellIm = cellImage["d"+date_detail];
					str.append("<div class='cal_month_body ").append(week_c);
					/*if(cellIm)
					{
						str.append(" '  style='background-image:url(").append(cellIm.imageURL).append("); overflow:hidden;' title='").append(cellIm.imageDesc).append("'>");
					}else
					{*/
						str.append(" '  style='overflow:hidden;'>");
					//}
					
					
					str.append("<div class='cal_num_day'>").append(templates.month_day(sd)).append("</div></div></td>");
					sd=add_date(sd,1,"day");
				}
			str.append("</tr>");
		}
		}catch(e){
			alert(e.message);
		}
		str.append('</tbody></table>');
		
		$("#"+elem_id).html(str.toString());
		$("#yearCur").val(date_cal.getFullYear());
		$("#monthCur").val((date_cal.getMonth()+1).toString().leftpad(2));
		/*
		 *yang:确定弹出层的位置，c_height+m_top>410 位置应为 c_top : m_top - c_height; c_height+m_top <410   c_top : m_top +5
		 *     m_left - c_width > 0 c_left = m_left - c_width  else  c_left = m_left
		 *  暂时将pos.x默认为鼠标相对于日历的坐标
		 */
		 var colNum =0 ;
		$("#detailDialog").mouseover(function(ev){

		});
		$(".cal_num_day").hover(function(){   
			
			$(this).css({"backgroundColor":"yellow"});
		},function(){   
			
			$(this).css({"backgroundColor":""});
		});
		$("#cal_table td").click(function(){
			var st = $(this).attr("day_v");
			record.nav_date = cal365.templates.api_date(st);
			$("#gridcontainer").changDate();
			
		});
	
	};
	var templates = {
		month_day : function(date){
			var d = date || new Date();
			return d.getDate();
		}
	};
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
		
	// 通用方法
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
	function StringBuffer(){
		this._strings = new Array();
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