<%@ page contentType="text/html;charset=utf-8" %>
<%
	String toType = (String)request.getAttribute("toType");
	String nongli = (String)request.getAttribute("nongli");
	String gongli = (String)request.getAttribute("gongli");
	String ganzhi = (String)request.getAttribute("ganzhi");
	String annimal_icon = (String)request.getAttribute("annimal-icon");
	String yi = (String)request.getAttribute("yi");
	String ji = (String)request.getAttribute("ji");
	String chong = (String)request.getAttribute("chong");
	String sha = (String)request.getAttribute("sha");
	String taishen = (String)request.getAttribute("taishen");
	String shichen = (String)request.getAttribute("shichen");
%>	
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>黄历分享</title>
<link href="/shareweibo/style/index.css" rel="stylesheet" type="text/css" />

</head>
<body>
<div class="main">
	<div class="top"></div>
	<div class="watermark"></div>
	<div class="content <%=toType%>"><!--otaku loli pro company-->
		<div class="al_date">
			<h3><%=nongli%></h3>
			<div class="al_date_content <%=annimal_icon%>"><!--zodiac_ji-->
				<p class="c_red"><%=gongli %></p>
				<p class="c_ede7db"><%=ganzhi %></p>
			</div>
		</div>
		<div class="yi">
		<%if(toType.equalsIgnoreCase("otaku") || toType.equalsIgnoreCase("loli") ) { %>
			<h3>今天可以做这些：</h3>
		<%} %>	
			<%=yi %>
		</div>
		<div class="ji">
		<%if(toType.equalsIgnoreCase("otaku") || toType.equalsIgnoreCase("loli") ) { %>
			<h3>最好不要做这些：</h3>
		<%} %>	
			<%=ji %>
		</div>
		<div class="almanac_more">
			<p>冲：<%=chong %></p>
			<p>煞：<%=sha %></p>
			<p>胎神：<%=taishen %></p>
		<%if(shichen != null && shichen.length() > 0) { %>
			<p>好时辰：<%=shichen %></p>
		<%} %>	
		</div>
		<a href="javascript:;" class="share_btn"></a>
	</div>
</div>
</body>
</html>
