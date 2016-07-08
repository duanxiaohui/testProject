<%@ page contentType="text/html;charset=utf-8" %>
<!--
			<div id="mainmenu">
				<div id="login" class="mainmenu">
					<a href="/account/login.do"><span></span></a>
				</div>
				<div id="wnl" class="mainmenu">
					<a href="http://www.365rili.com/wannianli/wannianli.html" target="_blank"><span></span></a>
				</div>
				<div id="mnone" class="mainmenu"><img src="images/none.gif"></div>
				<div id="feedback" class="mainmenu">
					<a href="javascript:showFAQ();"><span></span></a>
				</div>
			</div>
			<div id="secmenu">
				<div id="future" class="smcell">
					<a href="index.jsp?p=future"><span></span></a>
				</div>
				<div id="mstone" class="smcell">
					<a href="milestone/index.htm" target="_blank"><span></span></a>
				</div>
				<div id="" class="smcell"></div>
				<div id="support" class="smcell"><a href=""><span></span></a></div>
				<div id="" class="smcell"></div>
				<div id="sevice" class="smcell"><a href=""><span></span></a></div>
				<div id="job" class="smcell"><a href=""><span></span></a></div>
				<div id="contact" class="smcell"><a href=""><span></span></a></div>
				<div id="" class="smcell"></div>
				<div id="privcy" class="smcell"><a href=""><span></span></a></div>
				<div id="qa" class="smcell">
					<a href="index.jsp?p=q_a"><span></span></a>
				</div>
				<div id="" class="smcell"></div>
			</div>
-->
<%@ page import="com.rili.common.beans.User" %>
<%
	User u = (User)request.getAttribute("user");
%>
<div id="mainmenu">
<table width="280" border="0" cellspacing="0" cellpadding="0" height="1">
<tr>
<% if(u!=null){%>
	<td id="myCal"><a href="/main/calendar.do" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image7','','http://up2.365rili.com/v3/images/menu/menu_myC_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/menu_myC.jpg" name="Image7" width="140" height="130" border="0" id="Image7" /></a><a id="logoutLink" href="/account/logout.do" class="menuText">退出</a></td>
<% }else{ %>
	<td id="logReg"><a href="/account/login.do" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image7','','http://up2.365rili.com/v3/images/menu/menu_logon_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/menu_logon.jpg" name="Image7" width="140" height="130" border="0" id="Image7" /></a><a id="regLink" href="/account/login.do?page=register" class="menuText">注册</a></td>
<% } %> 
	<td><a href="javascript:showDialog('wnl');" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image6','','http://up2.365rili.com/v3/images/menu/menu_calender_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/menu_calender.jpg" name="Image6" width="140" height="130" border="0" id="Image6" /></a></td>
</tr>
<tr>
	<td></td>
	<td><a href="javascript:showDialog('feedback')" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image8','','http://up2.365rili.com/v3/images/menu/menu_feed_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/menu_feed.jpg" name="Image8" width="140" height="130" border="0" id="Image8" /></a></td>
</tr>
</table>
<table width="280" border="0" cellspacing="0" cellpadding="0" height="1">
<tr>
	<td><a href="?p=future" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image9','','http://up2.365rili.com/v3/images/menu/chal_future_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_future.jpg" name="Image9" width="70" height="65" border="0" id="Image9" /></a></td>
	<td><a href="v3/milestone/index.htm" target="_blank" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image10','','http://up2.365rili.com/v3/images/menu/chal_mstone_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_mstone.jpg" name="Image10" width="70" height="65" border="0" id="Image10" /></a></td>
	<td>&nbsp;</td>
	<td><a href="javascript:alert('在线支持QQ群：92767096');" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image11','','http://up2.365rili.com/v3/images/menu/chal_support_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_support.jpg" name="Image11" width="70" height="65" border="0" id="Image11" /></a></td>
</tr>
<tr>
	<td>&nbsp;</td>
	<td><a href="?p=service" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image12','','http://up2.365rili.com/v3/images/menu/chal_sev_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_sev.jpg" name="Image12" width="70" height="65" border="0" id="Image12" /></a></td>
	<td><a href="?p=job" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image13','','http://up2.365rili.com/v3/images/menu/chal_job_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_job.jpg" name="Image13" width="70" height="65" border="0" id="Image13" /></a></td>
	<td><a href="?p=contact" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image14','','http://up2.365rili.com/v3/images/menu/chal_cont_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_cont.jpg" name="Image14" width="70" height="65" border="0" id="Image14" /></a></td>
</tr>
<tr>
	<td>&nbsp;</td>
	<td><a href="?p=privacy" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image15','','http://up2.365rili.com/v3/images/menu/chal_priv_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_priv.jpg" name="Image15" width="70" height="65" border="0" id="Image15" /></a></td>
	<td><a href="?p=qa" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('Image16','','http://up2.365rili.com/v3/images/menu/chal_qa_h.jpg',1)"><img src="http://up2.365rili.com/v3/images/menu/chal_qa.jpg" name="Image16" width="70" height="65" border="0" id="Image16" /></a></td>
	<td>&nbsp;</td>
</tr>
</table>
</div>