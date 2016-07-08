var render={
	cover:function(){
		var html = '<div class="cover"></div>';
		$("body").append(html);
		return $(".cover")[0];
	},
	removeCover:function(){
		$(".cover").remove();
	},
	googleSync:function(){
		var top=Math.floor(($(window).height()-100)/2);
		var left=Math.floor(($(window).width()-100)/2); 
		var html='<img class="loading" style="top:#top#;left:#left#" src="/images/cal365_default/loading.gif"/>';
		html=html.replace(/#top#/,top+"px");
		html=html.replace(/#left#/,left+"px");
		$("#rili365").append(html);
		return $(".loading")[0]
	},
	removeGoogleSync:function(){
		$(".loading").remove();
	},
	showTip:function(message){
		if($(".fixed-tip").length>0){
			$(".fixed-tip").html(message);
			$(".fixed-tip").show();
			return;
		}
		$("#rili365").append($('<div class="fixed-tip">'+message+'</div>'));
	},
	hideTip:function(){
		if($(".fixed-tip").length>0){
			$(".fixed-tip").fadeOut(2000);
		}
	},
	popupMenu:function(left,top,googleAccount){
		var html = '<div id="moreCal_popupMenu" class="popup-menu" style="left:#left#;top:#top#;" >'+
					  '<a href="/main/creater.do">创建日历(小组日历)</a>';
			if(!googleAccount || googleAccount==""){
				html+='<a id="bindGoogleLink" style="cursor:pointer;">绑定google账号</a>';
			}else{
				html+='<a id="syncGoogleLink" style="cursor:pointer;">同步google日历</a>'+
					  '<a id="unbindGoogleLink" style="cursor:pointer;">解除绑定：'+$("#googleAccount").val()+'</a>';
			}
		html+=     '</div>';
		html=html.replace(/#left#/,(left)+"px");
		html=html.replace(/#top#/,(top+14)+"px");
		$("body").append(html);
	},
	// Outlook Sync
	popupMenuV2:function(left,top,googleAccount,outlookAccount){
		var html = '<div id="moreCal_popupMenu" class="popup-menu" style="left:#left#;top:#top#;" >'+
						'<a href="/main/creater.do">创建日历(小组日历)</a>';
			if(!googleAccount || googleAccount==""){
				html+='<a id="bindGoogleLink" style="cursor:pointer;">绑定google账号</a>';
			}else{
				html+='<a id="syncGoogleLink" style="cursor:pointer;">同步google日历</a>'+
					  '<a id="unbindGoogleLink" style="cursor:pointer;">解除绑定：'+$("#googleAccount").val()+'</a>';
			}
			
			if(!outlookAccount || outlookAccount==""){
				html+='<a href="/outlook/bind-parm.do">绑定outlook账号</a>';
			}else{
				html+='<a id="syncOutlookLink" style="cursor:pointer;">同步outlook日历</a>'+
					'<a id="unbindOutlookLink" style="cursor:pointer;">解除绑定outlook账号</a>';
			}
			
		html+=     '</div>';
		html=html.replace(/#left#/,(left)+"px");
		html=html.replace(/#top#/,(top+14)+"px");
		$("body").append(html);
	},
	removePopupMenu:function(){
		if($("#moreCal_popupMenu").length>0){
    		$("#moreCal_popupMenu").remove();
    	}
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