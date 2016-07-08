var isDesktop = true;
var appKey = '0a4107ab27aa0f8a388d483f9a3d12c4';
var current_user;

$(document).ready(function()
{
	calendarHandler.init();
	makeCal.init();
	//make calendar show in middel of baidu canvas
	var width=document.body.clientWidth;
	if(width>750){
		var left = Math.floor((document.body.clientWidth-750)/2);
		$("#middle").css("left",left+"px");
	}
	$("#qh_login").click(login);
	
	//初始化O360.Connect
	if (O360.Connect.init(appKey, '0.5')) {
        O360.Connect.getUser('dealWithUser');
    }else{
    	isDesktop = false;
    	checkLogin();
    }
});

function login(){
	if(isDesktop){
		O360.Connect.login('dealWithUser');
	}else{
		window.location = 'https://openapi.360.cn/oauth2/authorize?client_id=0a4107ab27aa0f8a388d483f9a3d12c4&response_type=code&redirect_uri=http://www.365rili.com/qh360/callback.do&scope=basic&state=webauth&display=desktop';
	}
}

function dealWithUser(user) {
    if (user != null && user != '') {
        current_user = user;
        login365rili();
    }
}
function login365rili(){
	if(typeof current_user != 'undefined'){
		$.ajax({
			type: 'post',
			data: current_user,
			url: '/qh360/login.do',
			success: function(result){
				if(result.state = 'ok'){
					$("#365riliUserName").show().html(result.name);
					$("#qh_login").hide();
					var currentDate = new Date();
					calendarHandler.init(result.cid);
					makeCal.pareData(currentDate);
					makeCal.showCal();
					makeCal.makeHuangli(currentDate);
				}
			},
			dataType: 'json'
		});
	}
}

function checkLogin(){
	$.ajax({
        type: 'post',
        data: {},
        url: '/qh360/checkLogin.do',
        success: function(result) {
			if(result.state == 'ok'){
				$("#365riliUserName").show().html(result.name);
				$("#qh_login").hide();
				var currentDate = new Date();
				calendarHandler.init(result.cid);
				makeCal.pareData(currentDate);
				makeCal.showCal();
				makeCal.makeHuangli(currentDate);
			}else{
    			
			}
        },
        dataType: 'json'
    });
}