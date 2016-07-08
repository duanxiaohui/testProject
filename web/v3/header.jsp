<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.User" %>
<%
	User u = (User)request.getAttribute("user");
%>
<style>
.username365 {color: #999;	text-decoration: none;}
.username365:hover{color: #666; text-decoration: underline;}
</style>
<div id="header">
	<a href="/"><img src="http://up2.365rili.com/v3/images/logo.png"></a>
	<% if(u!=null){%>
		<div style="float:right;margin-top:40px; margin-right:5px;">
			<a href="/main/calendar.do" class="username365">欢迎:&nbsp;<%=u.getUsername() %></a>
		</div>
	<%}%>
</div>