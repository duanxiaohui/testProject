$(function(){
	clientProtocol.init(7, 260, 300);
	typeof js365 != "undefined" && disableSelectAndRightClick();
	var content = getURLParameter("content");
	content = decodeURIComponent(content);
	content = html_encode(content);
	var calendarTitle = getURLParameter("title");
	calendarTitle = decodeURIComponent(calendarTitle);
	calendarTitle = html_encode(calendarTitle);
	var strDate = getURLParameter("date");
	var sid = getURLParameter("sid");
	
	renderSchedule(calendarTitle, content, strDate);
	
	$(".add_schedule_btn").click(function(){
		clientProtocol.createWnd(6, "/gui/creator_schedule.html?sid=" + sid, 510, 370);
		clientProtocol.setStyle(6, 1);
		clientProtocol.closeWnd(7);
	});
	$(".del_schedule_btn").click(function(evt){
		evt.preventDefault();
		//删除日历
		$.confirm('确定要删除该日程吗？',{
						buttons: [{
							text: '确定',
							click: function(){
								$.ajax({
								url: '/schedule/delete.do',
								type: 'post',
								dataType: 'json',
								data:{
									scheduleId:sid
								},
								success: function(data){
									if (data === true) {
										$.alert("日程删除成功",{
											buttons: {
												'确定': function(){
													clientProtocol.closeWnd(7);
														try{
															js365.runScriptMainWnd("location.reload();");
														}catch(e){
															
														}
												}
											},
											width:150
										});
									} else if (data.state == 'wrongpass') {
										$.alert('对不起，您的登录已经过期，请重新登录！', {
											buttons: {
												'确定': function(){
													location = '/account/login.do';
												}
											},
											width:150
										});
									} else if (data == false) {
										$.alert('对不起，您没有删除该日历的权限！',{width:150});
									}
								}
							});
						}
					}, {
						text: '取消'
					}],
					width:150
					
		}
		
		);
		
	});
	
	$.ajax({
		url:"/schedule/getRawScheduleByIdV2.do",
		type:"POST",
		dataType:"json",
		data:{
			scheduleId:sid
		},
		success:function(data){
			if(data){
				if(data.location){
					$("#address_p").html("地址：" + data.location);
				}
				if(data.url){
					$("#url_p").html("详细连接: <a href='"+data.url+"' target='_blank'>"+data.url+"</a>" );
				}				
			}else{
				$(".add_schedule_btn").hide();
				$(".del_schedule_btn").hide();
				$(".schedule_detailed_content").css({height:269,"border-bottom":"1px solid #ddd"});
				$(".schedule_detailed_content").jScrollPane();	
			}
		}
	})
});

function getURLParameter(name) {
    return decodeURIComponent(
    			(new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')
    		)
    		||null;
    
}

function renderSchedule(calendarTitle, content, strDate){
	$("#datetime_p").html("时间：" + strDate);
	$("#calendar_title").html(calendarTitle);
	$("#content_p").html(content);
	$(".schedule_detailed_content").jScrollPane();	
}

function formatDateString(formatDate, allday){
	var yyyy = formatDate.getFullYear();  
	var m = formatDate.getMonth() + 1;  
	var mm = m < 10 ? "0" + m : m;  
	var d = formatDate.getDate();  
	var dd = d < 10 ? "0" + d : d;  
	   
	var h = formatDate.getHours();  
	var hh = h < 10 ? "0" + h : h;  
	var n = formatDate.getMinutes();  
	var nn = n < 10 ? "0" + n : n;  
	var s = formatDate.getSeconds();  
	var ss = s < 10 ? "0" + s : s;
	
	if(allday)
		return yyyy + "-" + mm + "-" + dd + " 全天";
	else
		return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + nn + ":" + ss; 
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
	s = s.replace(/\n/g, "<br/>");  
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

