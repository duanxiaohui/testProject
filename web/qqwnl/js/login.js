$(document).ready(function()
{
	calendarHandler.init();
	makeCal.init();
	
	var param= window.location.search;
    param = param.substring(1);
    var params = {};
    
    params["param"] = param;
    
    qplus.user.getNick(function(result){
    	if(typeof result.nick != 'undifined'){
    		var nick;
    		nick = params["nick"] = result.nick;
    		$.ajax({
	    		type: 'post',
		        data: params,
		        url: '/qplus/login.do',
		        success: function(e) {
					if(e.state == "ok"){
						$("#365riliUserName").show().html(nick);
						var currentDate = new Date();
						calendarHandler.init(e.cid);
						makeCal.pareData(currentDate);
						makeCal.showCal();
						makeCal.makeHuangli(currentDate);
					}else{
						alert(e.state);
					}
		        },
		        dataType: 'json'
	    	});
    	}
    });
});
