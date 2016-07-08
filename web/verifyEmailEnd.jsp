<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title></title>
</head>
<body>
<script type="text/javascript">
	var state = '<%= (String) request.getAttribute("state") %>';
	if(state == 'ok'){
		alert('您的邮箱已通过验证！');
	}else{
		alert('验证失败，请重试');
	}
	window.location.href = 'http://www.365rili.com/account/manage.do';
</script>
</body>
</html>
