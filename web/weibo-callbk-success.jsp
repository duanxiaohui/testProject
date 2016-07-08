<%@ page contentType="text/html;charset=utf-8" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
</head>
<% Object weiboAuth= request.getAttribute("weiboAuth"); %>
<% Object qqtAuth= request.getAttribute("qqtAuth"); %>
<% Object qqzAuth= request.getAttribute("qqzAuth"); %>
<% Object weixinAuth= request.getAttribute("weixinAuth"); %>
<% Object url= request.getAttribute("url"); %>
<body>
<script type="text/javascript">
var weiboAuth="";
<% if(weiboAuth!=null){ %>
weiboAuth="<%= (String)weiboAuth %>"
<% } %>
var qqtAuth="";
<% if(qqtAuth!=null){ %>
qqtAuth="<%= (String)qqtAuth %>"
<% } %>
var qqzAuth="";
<% if(qqzAuth!=null){ %>
qqzAuth="<%= (String)qqzAuth %>"
<% } %>
var weixinAuth="";
<% if(weixinAuth!=null){ %>
weixinAuth="<%= (String)weixinAuth %>"
<% } %>

if(weixinAuth !== ''){
	window.location.href = "<%= (String)url %>";
}
</script>
</body>
</html>