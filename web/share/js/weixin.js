//provide winxin js protocol
//@author huangyi

(function(){
    var appId  = "wx41cd94597d2155a2";
    var link   = window.location.href.toString();
    if(window.location.href.indexOf('#') > 0){
        link = window.location.href.substr(0, window.location.href.indexOf('#'));
    }
    
    var imgUrl, title, desc;
    var fakeid = "";

    var onBridgeReady =  function () {
    try{
        if ("1" == "0"){
            WeixinJSBridge.call("hideOptionMenu");  
        }
        //jQuery("#post-user").click(function(){
        //  WeixinJSBridge.invoke('profile',{'username':'wxid_1970509702912','scene':'57'});
        //});
        // 发送给好友;
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid"      : appId,
                "img_url"    : imgUrl,
                "img_width"  : "72",
                "img_height" : "72",
                "link"       : link,
                "desc"       : desc ? desc.substr(0, 1024) : '',
                "title"      : title ? title.substr(0,512) : ''
            }, function(res) {report(link, fakeid, 1);
           });
        });
        
        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url"    : imgUrl,
                "img_width"  : "72",
                "img_height" : "72",
                "link"       : link,
                "desc"       : desc,
                "title"      : title + "\n" + desc
                }, function(res) {
            });    
        });

        // 分享到微博;
        var weiboContent = '';
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            WeixinJSBridge.invoke('shareWeibo',{
                "content" : desc +" 详情请点击 "+ link,
                "url"     : link 
                }, function(res) {report(link, fakeid, 3);
            });
        });

        // 分享到Facebook
        WeixinJSBridge.on('menu:share:facebook', function(argv){
            WeixinJSBridge.invoke('shareFB',{
                "img_url"    : imgUrl,
                "img_width"  : "72",
                "img_height" : "72",
                "link"       : link,
                "desc"       : desc ? desc.substr(0, 1024) : '',
                "title"      : title ? title.substr(0,512) : ''
                }, function(res) {} );
        });

        // 隐藏右上角的选项菜单入口;
        //WeixinJSBridge.call('hideOptionMenu');
    }catch(e){
    } 
    };
    var wxProtocol = {
        init: function(data){
            imgUrl = data.imgUrl;
            title = data.title;
            desc = data.desc;
                        
            if(document.addEventListener){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if(document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
            }    
        },
        initWithAlready: function (data) {
            imgUrl = data.imgUrl;
            title = data.title;
            desc = data.desc;
            onBridgeReady();
        }
    }
    window.wxProtocol = wxProtocol;
})();