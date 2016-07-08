<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%> 
<div id="page_header" style="position:relative;background:url('/images/cal365_default/header_bg.png') repeat-x;height:32px;margin:0px;">
		    	<div class="logo"><a href="/" onfocus="this.blur();"></a></div>
		    	<div class="page_header_active">
		    	<% String header_active_type = request.getParameter("header_active_type");  %>
				<a href='/'><div class='page_header_active_item'>首页</div></a>
				<a href='http://bbs.365rili.com' target="_blank"><div class='page_header_active_item'>论坛</div></a>
		    	<% if ( header_active_type.equals("0") ){ %>
					<!-- a href='/main/calendar.do'><div class='page_header_active_item page_header_active_item_selected'>日历</div></a>
					<a href='/main/subscribe.do'><div class='page_header_active_item'>活动</div></a -->
				<% }else if ( header_active_type.equals("1") ){ %>
					<!-- a href='/main/calendar.do'><div class='page_header_active_item'>日历</div></a>
					<a href='/main/subscribe.do'><div class='page_header_active_item page_header_active_item_selected'>活动</div></a -->
				<% } %>
		    	</div>
		    	<div id="noticeArea" style="color:white; position: absolute;left: 80%; margin: 5px;"></div>
	            <div class="righttoolbar">
	            	<span onclick="$('#fd_content').val('');showDialog('feedback');" style="cursor:pointer;color:red;text-decoration:underline;">
	            		意见反馈!
	            	</span>
	            	<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
	            </div>
</div><script type="text/javascript" src="/js/dialog.js"></script>
<script type="text/javascript" src="/js/feedback.js"></script>
<link rel="stylesheet" type="text/css" href="/css/cal365_default/dialog.css" />

<div id="drag-lasso-container" class="drag-lasso-container" style="z-index: 10; display: none;"><div class="drag-lasso">&nbsp;</div></div>
	<!--用户反馈报告-->
	<div class="window_big" id="feedback_dlg">
	  <div class="window_big_head" style="width:585px;">
	    	<p>意见反馈</p><img class="window_delete" src="/images/index/delete.gif" onclick="hideDlg()" />
	  </div>
		<div class="window_big_body">
			<div style="margin: 10px;">
				<form>
					<textarea style="width:416px;height:57px;" id="fd_content"></textarea>
					<input type="button" value="提交" style="float:right;" onclick="submitFeedback('fd_content');"/>
					<input type="reset" value="清空" style="float:right;"/>	
				</form>
			</div>
	    </div>
	
	    <div class="window_big_bottom"></div>
	</div>
	<!--用户反馈报告-->
	
	<!--绑定邮箱提醒 1：没绑定google 也没有填写邮箱 -->
	<div class="wide_window_big" style="width:600px;" id="email_1_dlg">
	  <div class="wide_window_big_head"    style="width:585px;">
	    	<p>提醒</p><img class="window_delete" src="/images/index/delete.gif" onclick="hideDlg()" />
	  </div>
		<div class="wide_window_big_body"  style="width:600px;">
			<div style="padding: 10px 15px 15px;" style="width:600px;">
				<p id="email_dlg_message" style="width:600px;">
					绑定邮箱有助于您完成找回密码等操作，为了您的账号安全，建议您填写并验证邮箱。&nbsp;&nbsp;
					<a href="/account/manage.do" target="_blank">去填写</a>
				</p>
			</div>
	    </div>
	
	    <div class="wide_window_big_bottom"  style="width:600px;"></div>
	</div>
	<!--绑定邮箱提醒 2：没绑定google 填写的邮箱没有经过验证 -->
	<div class="wide_window_big" style="width:600px;" id="email_2_dlg">
	  <div class="wide_window_big_head"  style="width:585px;">
	    	<p>提醒</p><img class="window_delete" src="/images/index/delete.gif" onclick="hideDlg()" />
	  </div>
		<div class="wide_window_big_body"  style="width:600px;">
			<div style="padding: 10px 15px 15px;">
				<p id="email_dlg_message" style="width:600px;">
					绑定邮箱有助于您完成找回密码等操作，为了您的账号安全，建议您填写并验证邮箱。&nbsp;&nbsp;
					<a href="/account/manage.do" target="_blank">去验证</a>
				</p>
			</div>
	    </div>
	
	    <div class="wide_window_big_bottom"  style="width:600px;"></div>
	</div>
	<!--绑定邮箱提醒 3：绑定过google 没填写邮箱或邮箱没有经过验证 -->
	<div class="wide_window_big" style="width:600px;" id="email_3_dlg">
	  <div class="wide_window_big_head"  style="width:585px;">
	    	<p>提醒</p><img class="window_delete" src="/images/index/delete.gif" onclick="hideDlg()" />
	  </div>
		<div class="wide_window_big_body"  style="width:600px;">
			<div style="padding: 10px 15px 15px;">
				<p id="email_dlg_message">
					设置账号邮箱有助于您完成找回密码等操作，您已绑定<span id='googleId_dlg'></span><br />是否将其设为默认邮箱。&nbsp;&nbsp;
					<a href="/account/setGoogleAsDefaultEmail.do" target="_blank">确定</a>&nbsp;&nbsp;
					或&nbsp;&nbsp;<a href="/account/manage.do" target="_blank">绑定其他邮箱</a>
				</p>
			</div>
	    </div>
	
	    <div class="wide_window_big_bottom"  style="width:600px;"></div>
	</div>
	
	<div id="dialogShadow" class="shadow" style="height:2000px;" title="点击关闭对话框"  onclick="hideDlg()"></div>
