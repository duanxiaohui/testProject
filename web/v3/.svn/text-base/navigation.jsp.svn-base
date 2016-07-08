<%@ page contentType="text/html;charset=utf-8" %>
<style>
#client {
		position:relative; 
		float:left; 
		width: 742px; 
		height: auto; 
		border:1px solid #d3d3d3; 
		z-index:200; 
}
.navigation {
	z-index:200; 
	width:742px; 
	height:50px; 
	padding:0px; 
	font-size:12px; 
	background-color: #fff;
	border-top:1px solid #d3d3d3;
	border-left:1px solid #d3d3d3;
	border-right:1px solid #d3d3d3;
	color:#999;
}
.navigation div {padding:12px;}
.navigation, .navigation a{
	font-size:12px;
	color:#999;
	text-decoration: none;
	text-shadow:#fff 1px 1px 0;
}
.navigation a:hover{
	color:#666;
	text-decoration: underline;
}
</style>
<%
	String cpName = "";
	String curPage = request.getParameter("p").trim();
	if(curPage.equals("future")) cpName = "公司远景";
	else if(curPage.equals("update")) cpName = "每日更新";
	else if(curPage.equals("qa")) cpName = "常见问题";
	else if(curPage.equals("contact")) cpName = "联系我们";
	else if(curPage.equals("job")) cpName = "加入我们";
	else if(curPage.equals("service")) cpName = "服务条款";
	else if(curPage.equals("privacy")) cpName = "隐私条款";
	else if(curPage.length() >= 4){
		if(curPage.substring(0,4).equals("news")) cpName = "新闻公告";
	}
%>
<div class="navigation">
	<div>
	当前位置：<a href="/">首页</a> >> <%=cpName%>
	</div>
</div>
