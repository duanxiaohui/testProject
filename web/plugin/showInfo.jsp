<%@ page contentType="text/html;charset=utf-8" %>
<HTML>
	<%
	String href = (String)request.getAttribute("href");
	String content = (String)request.getAttribute("content");
	String username = (String)request.getAttribute("username");
	%>
	<link href="plugin.css" type="text/css" rel="stylesheet">
	<script src="/js/jquery/jquery-1.6.1.min.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){
          var today = new Date();
		  var y = today.getFullYear();
		  var m = today.getMonth();
		  var d = today.getDate();
		  $("#year").get(0).selectedIndex=y-1949;
		  $("#month").get(0).selectedIndex=m;
		  $("#date").get(0).selectedIndex=d-1;
    });

	function showAllDay()
	{
		if($('#det_allday')[0].checked)
		{
			$('#detail_time').hide();
		}
		else
		{
			$('#detail_time').show();
		}
	}

	function doSubmit()
	{
		var m = Number($("#month").val())+1;
		if(m<10) m = '0'+m;

		var sch = {};

		sch.schTitle = $('#scheduleContent').val();
		sch.alldayEvent = $('#det_allday')[0].checked;
		if(sch.alldayEvent) 
		{
			sch.startTime = $("#year").val()+'-'+m+'-'+$("#date").val()+' '+'09:00:00';
		} 
		else 
		{
			var hour = Number($("#det_from_time_hour").val()); 
			if(hour<10) hour = '0'+hour;
			var min = Number($("#det_from_time_min").val());
			if(min<10) min = '0'+min;
			sch.startTime = $("#year").val()+'-'+m+'-'+$("#date").val()+' '+hour+':'+min+':00';
		}
		sch['timeZone'] =  - (new Date()).getTimezoneOffset() / 60;
		sch.url = $('#updateWebsite')[0].href;

		$.ajax({
			url:'/schedule/update.do',
			type:'post',
			data: sch,
			dataType:'json',
			success: function(result) {
				alert('保存成功');
				window.location = '/plugin/closePlugin.html';
			},
			error: function()
			{
				alert('保存数据错误');
			}
		});
	}
	</script>
	<body style="border:0px;padding:0px;margin:0px">
		<div id="plugin_main">
            <div class="plugin-dialog-hd plugin-dialog-hd-closable">
                <span class="plugin-dialog-title"><img align="absmiddle" alt="图片"  src="/plugin/logo.gif"> 日程助手 </span>
				<span class="plugin-dialog-username" onclick="window.location='/plugin/closePlugin.html'" style="cursor:pointer"><%=username%></span>
				<span class="plugin-dialog-close" onclick="window.location='/plugin/closePlugin.html'" style="cursor:pointer">关闭</span>
            </div>
			<div id="content" class="plugin-dialog-bd">
                <form  onsubmit="return false;" method="POST" id="userLoginForm" class="plugin-dialog-form">
					<input type="hidden" name="alldayEvent"/>
					<input type="hidden" name="startTime"/>
					<input type="hidden" name="schTitle"/>
					<input type="hidden" name="timeZone"/>

                    <div class="row plugin-dialog-error" style="display:none">
                        <div class="row-hd"></div>
                        <div class="row-bd">
                        <span name="infoDiv" id="infoDiv" class="plugin-dialog-highlight">&nbsp;&nbsp;</span>
                        </div>
                    </div>

					<div class="row">
                        <div class="row-hd"><label for="pass">日&nbsp;&nbsp;期</label></div>
                        <div class="row-bd">

                            <div style="float:left;font-size: 10px;">
                                <select id="year">
                                <%for(int i = 1949; i < 2049; ++i) { %>
                                    <option value="<%=i%>"><%=i %>年</option>
                                <%} %>
                                </select>
                                <select id="month">
                                    <option value="0">一月</option>
                                    <option value="1">二月</option>
                                    <option value="2">三月</option>
                                    <option value="3">四月</option>
                                    <option value="4">五月</option>
                                    <option value="5">六月</option>
                                    <option value="6">七月</option>
                                    <option value="7">八月</option>
                                    <option value="8">九月</option>
                                    <option value="9">十月</option>
                                    <option value="10">十一月</option>
                                    <option value="11">十二月</option>
                                </select>
								 <select id="date">
                                    <option value="1">1号</option>
                                    <option value="2">2号</option>
                                    <option value="3">3号</option>
                                    <option value="4">4号</option>
                                    <option value="5">5号</option>
                                    <option value="6">6号</option>
                                    <option value="7">7号</option>
                                    <option value="8">8号</option>
                                    <option value="9">9号</option>
                                    <option value="10">10号</option>
                                    <option value="11">11号</option>
                                    <option value="12">12号</option>
                                    <option value="13">13号</option>
                                    <option value="14">14号</option>
                                    <option value="15">15号</option>
                                    <option value="16">16号</option>
                                    <option value="17">17号</option>
                                    <option value="18">18号</option>
                                    <option value="19">19号</option>
                                    <option value="20">20号</option>
                                    <option value="21">21号</option>
                                    <option value="22">22号</option>
                                    <option value="23">23号</option>
                                    <option value="24">24号</option>
                                    <option value="25">25号</option>
                                    <option value="26">26号</option>
                                    <option value="27">27号</option>
                                    <option value="28">28号</option>
                                    <option value="29">29号</option>
                                    <option value="30">30号</option>
									<option value="31">31号</option>
                                </select>
                            </div>
							<div style="float:left;">
								<input id="det_allday" type="checkbox" onclick="showAllDay()" checked/>全天
							</div>
	                        <div style="clear:both;"></div>

                        </div>
                    </div>

					<div class="row" id="detail_time">
                        <div class="row-hd"><label for="pass">时&nbsp;&nbsp;间</label></div>
                        <div class="row-bd">
                             <span class="det_time_part">
								<select id="det_from_time_hour">
								<%
								for(int i = 0; i < 24; ++i) { %>
									<option value="<%= i %>"><%= i %></option>
								<%}%>
								</select>时
								<select id="det_from_time_min">
								<%
								for(int i = 0; i < 60; ++i) { %>
									<option value="<%= i %>"><%= i %></option>
								<%}%>
								</select>分
							</span>
                        </div>
                    </div>
                   
                    <div class="row">
                        <div class="row-hd"><label for="pass">内&nbsp;&nbsp;容</label></div>
                        <div class="row-bd" >
                            <textarea id="scheduleContent" style="font-size:12px;width:280px;height:60px"  class="plugin-dialog-text"><%=content%></textarea>
                        </div>
                    </div>

					 <div class="row">
                        <div class="row-hd"><label for="user">网&nbsp;&nbsp;址</label></div>
                        <div class="row-bd">
							<a id="updateWebsite" name="website" href="<%=href%>" target="_blank">
								<script>
								var href="<%=href%>";
								if(href.length>30)
									href=href.substr(0,30)+"...";
								document.write(href);
								</script>
							</a>
                        </div>
                    </div>

                    <div class="row btns-row">
                        <input type="submit" value="提 交"  class="plugin-dialog-btn" onclick="doSubmit()">  
						<input type="button"  value="取 消" class="plugin-dialog-btn" onclick="window.location='/plugin/closePlugin.html'">
                     </div>
                </form>
            </div>
			<div class="plugin-dialog-ft"> </div>
        </div>
        <script src="//www.365rili.com/js/lib/app.js"></script>
	</body>
</HTML>
 
