<%@ page contentType="text/html;charset=utf-8" %>
<%
    String[] contractLines = (String[]) request.getAttribute("contractLines");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>报名须知</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<link href="/pages/activity/css/contract.css" rel="stylesheet">
    <link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.css">
    <link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.iOS7.css">
</head>
<body>
	<div class="contract">
		<div class="content">
		<%	for (String contractLine : contractLines) { %>
			<div><%=contractLine %></div>
		<% } %>
		</div>
		<div class="footer">
			<a href="javascript:;" class="accept_btn">同 意</a>
		</div>
	</div>
	
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/gmu/gmu.js"></script>
    <script src="/js/lib/app.js"></script>
	<script src="/pages/activity/js/contract.js?v=20141217"></script>
</body>
</html>