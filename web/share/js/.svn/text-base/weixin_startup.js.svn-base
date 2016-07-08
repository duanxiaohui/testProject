//provide winxin js protocol
//@author huangyi
function html_decode(str)  
{  
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&amp;/g, "&");  
		s = s.replace(/&lt;/g, "<");  
		s = s.replace(/&gt;/g, ">");  
		s = s.replace(/&nbsp;/g, " ");  
		s = s.replace(/&#39;/g, "\'");  
		s = s.replace(/&quot;/g, "\"");  
		s = s.replace(/<br>/g, "\n");  
		return s;  
}
(function(){
	var onBridgeReady =  function () {
	try{
		var appId  = "wx41cd94597d2155a2";
		var imgUrl = "http://www.365rili.com/share/images/start/intro_9.png";
		var link   = location.href;
		var title  = html_decode("365日历");
		var desc   = html_decode("告诉你,在很久很久以前...");
		var titleDesc = html_decode("<365日历>告诉你,在很久很久以前...");
        var fakeid = "";
        desc = desc || link;
        if(!imgUrl ||imgUrl == ""){
        	imgUrl = "http://www.365rili.com/share/images/logo_72x72.png";
        }
        if ("1" == "0"){
        	WeixinJSBridge.call("hideOptionMenu");  
        }
        //jQuery("#post-user").click(function(){
        //	WeixinJSBridge.invoke('profile',{'username':'wxid_1970509702912','scene':'57'});
        //});

        // 发送给好友; 
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage',{
        		"appid"      : appId,
        		"img_url"    : imgUrl,
        		"img_width"  : "482",
        		"img_height" : "802",
        		"link"       : link,
        		"desc"       : desc,
        		"title"      : title
        	}, function(res) {});
        });
        
        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv){
        	WeixinJSBridge.invoke('shareTimeline',{
        		"img_url"    : imgUrl,
        		"img_width"  : "482",
        		"img_height" : "802",
        		"link"       : link,
        		"desc"       : titleDesc,
        		"title"      : titleDesc
        		}, function(res) {
            });    
        });

        // 分享到微博;
        var weiboContent = '';
        WeixinJSBridge.on('menu:share:weibo', function(argv){
        	WeixinJSBridge.invoke('shareWeibo',{
        		"content" : titleDesc +" 详情请点击 "+ link,
        		"url"     : link 
        		}, function(res) {});
        });

        // 分享到Facebook
        WeixinJSBridge.on('menu:share:facebook', function(argv){
        	WeixinJSBridge.invoke('shareFB',{
        		"img_url"    : imgUrl,
        		"img_width"  : "72",
        		"img_height" : "72",
        		"link"       : link,
        		"desc"       : desc,
        		"title"      : title
        		}, function(res) {} );
        });

        // 隐藏右上角的选项菜单入口;
        //WeixinJSBridge.call('hideOptionMenu');
	}catch(e){
		
	} 
	};
    if(document.addEventListener){
    	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if(document.attachEvent){
          document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    }
})();