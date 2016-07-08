var ult = {
    i: 1,
    data: {
        ult: [],
        superult: ""
    },
    num: 0,
    userName:"",
    dataText: [
        "即使是烂大街的小苹果，<br>我妈也能跳出独特韵味，<br>谁说我妈不是舞蹈家?",
        "那个比你小的 xxx 都结婚啦！ <br>你怎么样了？...不是我逼你...",
        "有一种做饭好吃叫我妈做饭好吃<br>山珍海味也比不过我妈做的饭",
        "不管多乱的狗窝，只要有我妈在 <br>2小时之内变天堂。",
        "虽然我妈很多事都需要我提醒<br>但是我的生日她总能记清<br><span class='err'>(下载365日历，再也不要错过妈妈生日)</span>",
        "不见时各种记挂想念，<br>见面3天后折磨得你怀疑是否亲生，<br>临走时又泪眼婆娑 ",
        "一说就停不下来，听的脑袋爆炸<br>听不到时却又无比想念",
        "微信转发各种食品安全、致癌猝死贴<br>生怕你一不小心伤了身体"
    ],
    dataTextSmall: [
        "即使是烂大街的小苹果，我妈也能跳出独特韵味，谁说我妈不是舞蹈家?",
        "那个比你小的 xxx 都结婚啦！ 你怎么样了？...不是我逼你...",
        "有一种做饭好吃叫我妈做饭好吃山珍海味也比不过我妈做的饭",
        "不管多乱的狗窝，只要有我妈在 2小时之内变天堂。",
        "虽然我妈很多事都需要我提醒但是我的生日她总能记清<br><span class='err'>(下载365日历，再也不要错过妈妈生日)</span>",
        "不见时各种记挂想念，见面3天后折磨得你怀疑是否亲生，临走时又泪眼婆娑 ",
        "一说就停不下来，听的脑袋爆炸听不到时却又无比想念",
        "微信转发各种食品安全、致癌猝死贴生怕你一不小心伤了身体"
    ],
    dataListText: {
        "ult1": "广场舞 - 根本停不下来 ~",
        "ult2": "狂逼婚 - 有事没事逼一逼",
        "ult3": "厨艺棒 - 做成啥样都好吃",
        "ult4": "整理癖 - 狗窝瞬间变天堂",
        "ult5": "记生日 - 孩子生日最重要",
        "ult6": "不说爱 - 一见不到就想念",
        "ult7": "碎碎念 - 从早到晚说不停",
        "ult8": "转发控 - 生怕你坏了身体"
        //            "none": "哎！只能说我妈<br><span>够特殊！</span>"
    },
    shareText: "我老妈的大招",
    url: window.location.href,
    source: "null",
    init: function () {
        //获取url参数
        ult.getPRM();

        ult.hasUser = ult.isAuth();
        //是大招页并且无用户信息获取授权
        if(!ult.hasUser && !ult.pageType){
            var url = location.href.replace(location.search, "") + "?source="+ult.source+"&op=1";
            //获取授权
            if (ult.isWeixin() || ult.source == "hot" || ult.source == "plaza") {
                ult.getAuth(url);
            }

        }

        //获取昵称
        //ult.getUserName();

        //设定样式
        ult.setUI();
        //绑定事件
        ult.bindEvent();

        ult.setShareBtn();

        //预加载图片
        ult.j = 1;
        ult.loadImg();

    },
    bindEvent: function () {
        //选择大招
        $(".ult-type a.a-normal").click(function () {
            if(!ult.swType){
                ult.switchUI($(this));
//                ult.setShareBtn();
            }

        });

        //超级大招剩余字数
        $("#super-ta").on("input", function () {
            var t = $(this),textval = t.val();
            if (textval.length > 100) {
                t.val(textval.substr(0,100));
            }
            $(".super-msg span").text(100 - t.val().length);
        });

        //超级大招
        $(".ult-type a.a-super").click(function () {

            var isWeixin = ult.isWeixin();
            if($(this).attr("data-type") == "0"){
                ult.data.superult = "";
            }else {
                ult.data.superult = $("#super-ta").val() || "";
            }

            $(".normal,.super").hide();
            $("#banner img").attr("src",isWeixin ? "../images/banner_wx.jpg" : "../images/banner.jpg");
            $("#footer").hide();
            $("#footer-share").show();
            if( isWeixin ) {
                $(".footer").hide();
                $(".coop-out-365").show();
                $(".coop-in-365").hide();
            }
            $(".share").show();

            //微信隐藏分享按钮
            if(ult.isWeixin()||ult.source == "weixin"||ult.source == "chelun") {
                $(".share-btn").hide();
            }
            ult.sharePage();
        });
//        $(".coop-app a").on("click",function (e) {
////            e.preventDefault();
//        })
        $("#submit-img").on("click", function () {
            //我也要测
            if ($(this).attr("data-type") == "replay") {
                ult.replay();
            } else if($(this).attr("data-type") == "share") {//分享
                ult.callShare();
            }
        });

        //右上分享
        $(".share-btn-rt").on("click",function () {
            ult.callShare();
        });

        //拉手推广
        $(".coop-app a").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            ult.postShare("94",ult.source);
            if(e.target) {
                window.location.href = e.target;
            }
        });
    },
    setUI: function () {//设置样式
        $(".con-header,.con-footer").height(function () {
            return $(".container").width() * 34 / 520;
        });

        //判断来源
        if(ult.source == "weixin") {
            $(".share-btn-rt").hide();
        } else if (ult.source == "hot") {
            if(!ult.isWeixin()){
                $(".share-btn-rt").show();
            }
        } else if(ult.source == "plaza") {

        } else if(ult.source == "chelun") {
            $(".share-btn-rt").hide();
        } else {

        }

        //小屏幕去掉折行
        if($(window).width() < 319){
            ult.dataText.length = 0;
            ult.dataText = ult.dataTextSmall;
        }
        //判断显示页面
        if (ult.data.ult.length > 0 || ult.data.superult.length > 0 || ult.spec) {
            $(".normal,.super").hide();
            $("#banner img").attr("src",ult.isWeixin() ? "../images/banner_wx.jpg" : "../images/banner.jpg");
            $(".share").show();
            $("#submit-img").attr({
                "src": "../images/btn-ido.png",
                "data-type": "replay"
            });

            ult.sharePage();
        }
    },
    switchUI:function (_this) {
        ult.swType = 1;
        ult.t = _this;
        if (_this.attr("data-type") == "1") {
            ult.data.ult.push(_this.attr("data-ult"));
        }

        _this.find(".sub-img").addClass("hide");
        _this.find(".sub-img-ac").removeClass("hide");

        setTimeout(ult.switchSubBtn,200);
        //切换下一页
        if (ult.i++ < 8) {
            setTimeout(ult.switch,450);
            //ult.switch();
        } else {
            $(".container.normal").hide();
            $(".container.super").show();
        }
    },
    loadImg:function () {
        if(ult.j < 9) {
            $("<img />").attr("src","../images/ult_title_" + ult.j + ".jpg").hide().appendTo("html");
            $("<img />").attr("src","../images/ult_img_" + ult.j + ".jpg").hide().appendTo("html");
            ult.j++;
            ult.loadImg();
        }
    },
    switch: function () {
        //大招页切换
        var imgTit = $(".normal .ult-title-img");
        if(ult.i==5){
            imgTit.width(imgTit.width()*17/15);
        }else if(ult.i==7){
            imgTit.width(imgTit.width()*15/17);
        }
        imgTit.attr("src", "../images/ult_title_" + ult.i + ".jpg");
        $(".ult-img").attr("src", "../images/ult_img_" + ult.i + ".jpg");
        $("p.ult-cont").html(ult.dataText[ult.i - 1]);
        $(".ult-type a").eq(0).attr("data-ult", "ult" + ult.i);
        $(".ult-type a").eq(1).attr("data-ult", "ult" + ult.i);
        ult.swType = 0;
    },
    switchSubBtn:function () {
        ult.t.find(".sub-img-ac").addClass("hide");
        ult.t.find(".sub-img").removeClass("hide");
    },
    sharePage: function () {
        var data = ult.data;
        //我妈大招数
        ult.num = data.ult.length;

        if (data.superult) {
            $(".super-text-p").text(data.superult);
            $(".stunt").show();
        }

        if (data.ult) {
            var i = 0;
            for (i; i < data.ult.length; i++) {
                var u = data.ult[i];
                $("#ult-list").append("<li>" + ult.dataListText[u] + "</li>");
            }
        }

        if (data.superult === "" && data.ult.length === 0) {
            $(".con-content").children().hide();
            $(".no-ult-super").show();
        }
        if (data.superult && data.ult.length === 0) {
            $("#ult-list").append("8个大招逊毙了吧！<br>我妈用的是<span class='font-18'>特技</span>！");
        }

        var userName = ult.userName||"我";
        if(ult.num == 0) {
            ult.shareText = "["+userName+"]老妈的大招";
        }else if(ult.num > 0 && ult.num <= 8){
            ult.shareText = "["+userName+"]老妈的"+ult.num+"个大招";
        }

        ult.setShareBtn();

        setTimeout(ult.setLink,2000);
    },
    setLink:function () {
        var link = {
            "changba":"http://changba.com/d",
            "chelun":"http://common.auto98.com/tool/getResult/?tooltype=jumpurl&wx=aHR0cDovL3VtMC5jbi8xWEphMW4v&iosu=aHR0cDovL3VtMC5jbi8yUGV0UVQ=&adru=aHR0cDovL3VtMC5jbi8ydGxONFcv&ohu=aHR0cDovL3VtMC5jbi8ydGxONFcv",
            "douguo":"http://android.myapp.com/myapp/detail.htm?apkName=com.douguo.recipe",
            "pptv":"http://a.app.qq.com/o/simple.jsp?pkgname=com.pplive.androidphone",
            "helijia":"http://helijia.com"
        };
        $.each($(".coop-app a"),function () {
            var app = $(this).attr("data-type");
            if(link[app]) {
                $(this).attr("href",link[app]);
            }
        })
//        $(".coop-app a").click(function (e) {
//            e.preventDefault();
//            var app = $(this).attr("data-type");
//            
//            if(link[app] && $(".share").css("display") == "block"){
//                window.location.href = link[app];
//            }
//            
//        })
    },
    getPRM: function () {
        //计算url参数
        var url = location.search, str;
        if (url.indexOf("?") != -1) {
            str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var rpm = strs[i].split("=");
                if(rpm[1] == "null" || rpm[1] == ""){
                    continue;
                } else if (rpm[0] == "user") {
                    //调取昵称
                    ult.user = rpm[1]||"0";
                } else if (rpm[0] == "ult") {
                    //大招
                    ult.data.ult = rpm[1].split("_");
                } else if (rpm[0] == "superult") {
                    //超级大招
                    ult.data.superult = decodeURI(rpm[1]);
                } else if (rpm[0] == "source") {
                    //来源
                    ult.source = rpm[1];
                } else if (rpm[0] == "spec") {
                    //都没填
                    ult.spec = rpm[1];
                } else if (rpm[0] == "op") {
                    //是否op
                    ult.op = rpm[1];
                }
                //else if ( rpm[0] == "typeN") {
                //    ult.typeN = rpm[1];
                //}
            }
            ult.pageType = (ult.data.ult.length > 0 || ult.data.superult.length > 0 || ult.spec) ? 1 : 0;
        }
        if (location.href.indexOf("douguo") != -1) {
            ult.source = "douguo";
        }
    },
    callShare: function () {
        var url = ult.getUrl(),
            shareText = ult.shareText;
        //365客户端调用分享
        if(ult.source === "hot" || ult.source === "plaza"){
            try{
                $.ajax({
                    url:'http://www.365rili.com/tmpmessage/shared.do',
                    data:{
                        id: '42',
                        target: "Mother's Day"
                    },
                    success:function(){
                        ult.postShare("93",ult.source);
                        app.call({
                            action: 'share',
                            params: [
                                {
                                    name: 'shareString',
                                    value: JSON.stringify({
                                        title: shareText,
                                        content: "老妈们的8大招，看你妈中几招？",
                                        link: url,
                                        image: 'http://www.365rili.com/pages/bd/mothers_day_150429/images/wx.jpg',
                                        isEvent: 'true'
                                    })
                                }
                            ],
                            callBack: function () {

                            }
                        });
                    }
                });
            }catch(e){
                console.log(e.message);
            }

        } else if(ult.source === "pptv" && ppsdk) {
            //pptv客户端调用分享
            ppsdk.config({
                api:[],
                signature:"",
                debug:true
            })
            ppsdk.ready(function () {

                //pptv客户端调用分享
                ppsdk.share({
                    shareText:shareData.title,
                    shareURL:shareData.link,
                    shareImgURL:shareData.imgUrl,
                    success:function (rspData) {
                        ult.postShare("93",ult.source);
                    },
                    error:function (errCode,msg) {

                    },
                    cancel:function () {

                    }
                });
            })
        } else if(ult.source === "douguo") {
            huodong_id  = '111';//活动ID
            share_app   = "WXTimelineLink";
            share_text  = ult.shareText;//分享文案
            document.title  =share_text;
            share_img   = "http://www.365rili.com/pages/bd/mothers_day_150429/images/wx.jpg";//分享图片
            share_id    = 2;//分享ID
            share_url   = url;//分享链接

//            //DouguoJSBridge.jsApi.getUserInfo(get_user_info_callback);
            DouguoJSBridge.jsApi.getDevice(get_device_callback);//不需要登录时

        }
    },
    replay: function () {
        var url = location.href.replace(location.search, "").replace("#rd","") +"?source="+ult.source;

        if(ult.hasUser){
            window.location.href = url;
        }else {
            //如果是365客户端手动跳转
            if (ult.getAuth(url)) {
                window.location.href = url;
            }
        }
        //获取授权
        //ult.getAuth(url,1);
    },
    isWeixin:function () {
        //根据useragent判断是否微信
        var sUserAgent = navigator.userAgent.toLowerCase();
        return sUserAgent.match(/micromessenger/i) == "micromessenger";
    },
    getUrl:function () {
        //生成带参数的url
        var url = location.href.replace(location.search, "").replace("#rd","") + "?source="+ult.source+"&ult=",data = ult.data.ult;
        ult.data.ult.length > 0 ? url += ult.data.ult.join("_") : url += "null";
        if(ult.data.superult.length > 0) {
            url += "&superult=" + (encodeURI(ult.data.superult)||"null");
        }
        if(ult.data.superult === "" && ult.data.ult.length === 0) {
            url += "&spec=true";
        }
        return url;
    },
    setShareBtn:function () {
        //微信分享信息
        var url = ult.getUrl();
        if (ult.isWeixin() || ult.source === "weixin") {
            wxProtocol.init(function (wx, link) {
                wx.onMenuShareAppMessage({
                    title: ult.shareText,
                    desc: "母亲节，老妈们的8个大招，看你妈妈中了几招？",
                    link: url,
                    imgUrl: "http://www.365rili.com/pages/bd/mothers_day_150429/images/wx.jpg",
                    success:function () {
                        ult.postShare("93",ult.source)
                    }
                });
                wx.onMenuShareTimeline({
                    title: ult.shareText,
                    link: url,
                    imgUrl: "http://www.365rili.com/pages/bd/mothers_day_150429/images/wx.jpg",
                    success:function () {
                        ult.postShare("93",ult.source)
                    }
                });
            });
        } else if(ult.source === "chelun"){
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 发送给好友
                WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                    WeixinJSBridge.invoke('sendAppMessage', {
                        "img_url": "http://www.365rili.com/pages/bd/mothers_day_150429/images/wx.jpg",
                        "link": url,
                        "desc": "母亲节，老妈们的8个大招，看你妈妈中了几招？",
                        "title": ult.shareText
                    }, function (res) {
//                        _report('send_msg', res.err_msg);
                    });
                });
                // 分享到朋友圈
                WeixinJSBridge.on('menu:share:timeline', function (argv) {
                    WeixinJSBridge.invoke('shareTimeline', {
                        "img_url": "http://www.365rili.com/pages/bd/mothers_day_150429/images/wx.jpg",
                        "link": url,
                        "desc": "母亲节，老妈们的8个大招，看你妈妈中了几招？",
                        "title": ult.shareText
                    }, function (res) {
//                        _report('timeline', res.err_msg);
                    });
                });

            }, false);

        } else if(ult.source === "pptv") {
            //
        } else if(ult.source === "douguo") {

        }
    },
    postShare:function (shareId,channel) {
        $.get('/operation/share.do?shareId='+shareId+'&channel=' + channel);
    },
    isAuth:function () {//
        var bool;
        var url = "http://www.365rili.com/account/getPersonalDetail.do";
        if (ult.isWeixin()) {
            $.ajax({
                type:"GET",
                url: "http://www.365rili.com/account/getPersonalDetail.do",
                async:false,
                success:function (data) {

                    if(typeof data == "string") {
                        data = JSON.parse(data);
                    };
                    if (data.state == "wrongpass") {
                        bool = false;
                    }else {

                        ult.userName = data.user.nickOrName;
                        bool = true;
                    }
                }
            })
        }else if (ult.source == "hot" || ult.source == "plaza") {
            //ult.headers = headers;
            ult.getToken(url,ult.getUserNameCoCo);
        } else {
            bool = true;
        }

        return bool;
    },
    getAuth:function (url,redo) {

        //获取授权
        if(ult.isWeixin()){
            window.location.href = "http://www.365rili.com/wx/login.do?redURL=" +
            encodeURIComponent(url.replace("#rd","")+"&user=1");
            return 0;
        }
        else if (ult.source =="plaza" ||ult.source =="hot") {
            //var shareUrl = 'http://www.365rili.com/account/getPersonalDetail.do';
            //ult.getToken(shareUrl,ult.getUserNameCoCo);
            return 1;
        }
    },
    //getUserName:function () {//获取昵称
    //    if(ult.user) {
    //        $.get("http://www.365rili.com/account/getPersonalDetail.do",function (data) {
    //            ult.userName = data.user.nickOrName;
    //        });
    //    } else if(ult.data.ult.length <= 0 && ult.data.superult.length <= 0 && !ult.spec && ult.op !=1 ) {
    //        ult.getAuth(location.href.replace(location.search, "") + "?source="+ult.source+"&op=1");
    //    }else if(ult.typeN == "1") {
    //        ult.getAuth(location.href.replace(location.search, "") + "?source="+ult.source+"&op=1");
    //    }
    //},
    getUserNameCoCo:function (shareUrl,header) {
        $.ajax({
            url:shareUrl,
            headers: header,
            success:function (data) {
                ult.userName = data.user.nickOrName;
            }
        });
        //if(redo) window.location.href = url.replace("#rd","")+"&user=1";
    },
    getToken: function (url, callBack) {
        try{
            app.call({
                action: 'getEncryptHeaders',
                params: [
                    {
                        name: 'url',
                        value: url
                    }
                ],
                callback: function (headers) {
                    headers = JSON.parse(headers);
                    callBack(url,headers);
                }
            });
        }
        catch(e){
            try{
                app.call({
                    action: 'getToken',
                    callBack: function (token) {
                        var headers = {
                            'x-365rili-key': token
                        };
                        callBack(url,headers);
                    }
                });
            }
            catch(e){}
        }
    }
}