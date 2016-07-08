//绑定登陆按钮事件
$("#bd_login").click(function(){
	bd_loginOrAuth();
});
//检查用户的登陆情况（登陆百度，登陆365都算作是登陆状体）
function checkLogin()
{
	var p = window.location.search.toString();
	//获取url中获取参数bd_user、bd_sig
	var bd_user = (function(){
		var result = /bd_user=(\d+)/.exec(p);
		if(result != null && result.length == 2){
			return result[1];
		}else{
			return '0';
		}
	})();
	var bd_sig = (function(){
		var result = /bd_sig=(\w+)&?/.exec(p);
		if(result != null && result.length  == 2){
			return result[1];
		}else{
			return '';
		}
	})();
	$.ajax({
         url: 'http://www.365rili.com/baidu/checkLogin.jsonp?bd_user='+bd_user+'&bd_sig='+bd_sig,
         dataType:"jsonp",
         jsonp:"callback",
         success:function(result){
				if(result.login){
					login(result.cid, result.username);
				}
         }
    });
//         
	// $.ajax({
    // type: 'get',
    // url: 'http://local.365rili.com/baidu/checkLogin.do?bd_user='+bd_user+'&bd_sig='+bd_sig,
    // success: function(result) {
    	// alert(result);
		// if(result.login){
			// login(result.cid, result.username);
		// }
    // },
    // dataType: 'json'
	// });
}
function login(cid, username)
{
	$("#bd_login").hide();
	$("#365riliUserName").html(username).show();
	var currentDate = new Date();
	calendarHandler.init(cid);
	makeCal.pareData(currentDate);
	makeCal.showCal();
	makeCal.makeHuangli(currentDate);
	gotoFestival();
}
//点击登陆按钮
function bd_loginOrAuth(){
	var callback_url = "http://www.365rili.com";//window.location.protocol  + "//" + window.location.host;
	var url = "https://openapi.baidu.com/oauth/2.0/authorize?response_type=code" +
				"&client_id=X34MNvmqSF32ZZFlDDVQHH2x" + 
				"&redirect_uri=" + callback_url + "/baidu/callbackBAE.do" +
				"&display=dialog";
	var cover = render.cover(),
	    ifr = render.loadIframe(url,363,500);
	$(cover).attr("title","点击关闭").click(function(){
		$(ifr).remove();
		$(cover).remove();
	});
	window.removeIframe=function(){
		$(ifr).remove();
		$(cover).remove();
		checkLogin();
	};
}
//检查用户的登陆状态
checkLogin();

var render={
	cover:function(){
		var html = '<div class="cover"></div>';
		$("body").append(html);
		return $(".cover")[0];
	},
	removeCover:function(){
		$(".cover").remove();
	},
	loadIframe:function(url,height,width){
		var top=Math.floor(($(window).height()-height)/2);
		var left=Math.floor(($(window).width()-width)/2);
		var iframe = '<iframe src="'+url+'" height="'+height+'px" width="'+width+'px" scrolling="no" style="position:absolute;top:'+top+'px;left:'+left+'px;z-index:2000;background-color:#FFFFFF;border: 0px none;" />';
		$("body").append(iframe);
		return document.body.lastChild;
	},
	popupWin:function(url,name,height,width){
		var top=Math.floor(($(window).height()-height)/2);
		var left=Math.floor(($(window).width()-width)/2);
		return window.open(url,name,"height="+height+",width="+width+",top="+top+",left="+left+",toolbar=no,menubar=no,scrollbars=no,location=no,resizable=yes,status=no")
	}
}