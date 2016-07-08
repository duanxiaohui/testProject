<%@ page contentType="text/html;charset=utf-8" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>成功绑定google账户</title>
<style type="text/css">
body{
	background:#FFFFFF;
	width:530px;
	height:346px;
	margin:0;
	padding:0;
}
.message{
	position:relative;
	width: 530px;
	padding-top:200px;
	height:97px;
	padding-bottom:49px;
	background: url("/images/cal365_default/bindsuccessbg.png") no-repeat scroll 0 0 transparent;
}
.synBtn{
	width:182px;
	height:38px;
	position:relative;
	margin-left:174px;
	background: url("/images/cal365_default/syncGoogleBtnbg.png") no-repeat scroll 0 0 transparent;
	cursor:pointer;
}
.progressBar{
	width:220px;
	height:19px;
	margin-top:40px;
	position:relative;
	margin-left:160px;
	display:none;
	background: url("/images/cal365_default/loading11.gif") no-repeat scroll 0 0 transparent;
}
.statu{
	width:272px;
	height:19px;
	margin-top:40px;
	position:relative;
	margin-left:134px;
	text-align: center;
	color: blue;
    font-size: 14px;
    display:none;
}
</style>
</head>
<body>
<div class="message">
	<div class="synBtn"></div>
	<div class="progressBar" ></div>
	<div class="statu"></div>
</div>
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/communicator.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	//$(".message").css("margin-top","100px");
	//$(".message").css("margin-left",Math.floor(($(window).width()-500)/2)+"px");
	$(".synBtn").click(function(){
		$(".statu").html("正在同步...");
		$(".statu").show()
		communicator.syncGoogleOnWeb(function(result){
			switch(result.state){
				case "ok":
					$(".statu").html("<a href='javascript:void(0);' onclick='window.close();'>同步完成！页面<span id='timer' style='color:red'></span>秒后将关闭</a>");
					tick(5);
					break;
				default:
					$(".statu").html("同步出错！");
					break;
			}
		});
	});
});
function tick(sec){
	$("#timer").html(sec);
	var intervalId=setInterval(function(){
		if(sec<1){
			clearInterval(intervalId);
			window.close();
			return;
		}
		sec-=1;
		$("#timer").html(sec);
	},1000);
}
</script>
</body>
</html>