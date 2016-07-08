<%@ page contentType="text/html;charset=utf-8" %>
<style>
#add-btn{
	display:block;
	width:215px;
	height:59px;
	margin:0 0 5px 20px;
	background:url(images/assistant/fav-other.png) no-repeat center top;
	font-size:0;
	overflow:hidden;
}
#sidetitle {
	padding: 15px;
	font-family:"Arial","微软雅黑","方正准圆简体";
	font-size: 20px;
	color: #666;
}
.arrow {
	display: none;
	position: absolute;
	right: 350px;
	top: 0px;
	z-index: 2;
}
</style>
	<div class="arrow"><img src="images/assistant/arrow.png" height="510" /></div>
			<div id="stepbystep">
				<div id="sidetitle">设置日程助手</div>
				<div class="stepcell">
					<div class="stepcellin">
						<div class="sc_num"><img src="images/assistant/num_1.png"></div>
					  <div class="sc_txt">如果浏览器没显示“书签工具栏”，需打开Firefox浏览器的书签工具栏。
					  	右击网址栏下的空白处，再点击“书签工具栏”。</div>
						<div class="sc_pic"><img src="images/assistant/firefox1.jpg"></div>
					</div>
				</div>
				<div class="stepcell">
					<div class="stepcellin">
						<div class="sc_num"><img src="images/assistant/num_2.png"></div>
					  <div class="sc_txt">用鼠标直接将下面的按钮拖拽到浏览器的书签栏。</div>
						<div id="mvBtn" class="sc_pic">
							<a href="javascript:(function(){CLIP_HOST='http://www.365rili.com/plugin/';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=CLIP_HOST+'addPlugin.js';x.charset='utf-8';document.getElementsByTagName('head')[0].appendChild(x);}catch(e){alert(e);}})();" onclick="alert('请把我拖拽到Firefox的书签工具栏'); return false;" id="add-btn">日程助手</a>
						</div>
					</div>
				</div>
				<div class="stepcell">
					<div class="stepcellin">
						<div class="sc_num"><img src="images/assistant/num_3.png"></div>
					  <div class="sc_txt">在任意网站看到喜欢的内容，选中文字，再点击书签工具栏中的“日程助手”即可。</div>
						<div class="sc_pic"><img src="images/assistant/firefox2.jpg"></div>
					</div>
				</div>
			</div>
<script>
$(document).ready(function(){
	$(".arrow").show().css("left", $("#mvBtn").position().left+$("#mvBtn").width()-100);
	$(window).resize(function(){
		$(".arrow").css("left", $("#mvBtn").position().left+$("#mvBtn").width()-100);
	});
});
</script>