$(function () {
	var father = {
		init:function () {
			var title,url,desc;
			this.setUI();
			this.bindEvent();
			this.clientOpen();
			title = "父亲节|定制你对父亲的爱";
			desc  = "来，一起写下，这未曾说出口的爱";
			url = location.href.split("?")[0];
			// this.setShareBtn(title,url,desc);
			this.share();
		},
		setUI:function () {
			var content = this.getURLParameter("content")||"每次电话，你都说：你妈想你了…其实我知道，是你在挂念我;每次我想说:想你…却不好意思。今天我把爱写进这卡片：爸，我想你…",
				name = this.getURLParameter("name")||"女儿",
				$content = $("#t-content"),
				$name = $("#t-name");
			$content.val(content);
			$name.text(name);
		},
		bindEvent:function () {
			var self = this;
			$("#custom-btn").on("click",function(){
				$(".share").addClass("none");
				$(".make").removeClass("none");
			})
			$("textarea.t-content").on("input", function () {
		        var t = $(this),textval = t.val();
		        if (textval.length > 60) {
		            t.val(textval.substr(0,60));
		        }
		    });
		    $("#make-submit").on("click",function (e) {
		    	var content = $("#m-content").val(),
		    		name = $("#m-name").val();
		    	if(content.length == 0) {
		    		alert("内容不能为空！");
		    	}else if(name.length == 0){
		    		alert("署名不能为空！")
		    	}else {
		    		self.setFinalPage(content,name);
		    	}
		    })
		},
		clientOpen:function(){
			if(father.getURLParameter('isShowBar') == 1){
				$('body').addClass('weixin');
			}
			if(location.href.indexOf("hot") != -1 && !this.getUa.weixin ){
				$('.client_share_btn').show();
			}
		},
		getURLParameter:function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		},
		setFinalPage:function (content,name) {
			$(".make").addClass("none");
			$(".final").removeClass("none");
			$("#f-content").text(content);
			if(this.getUa.weixin) {
				$(".final .msg").removeClass("none");
			} else {
				$("#share-btn").removeClass("none");
			}
			$("#f-name").html(name);
			this.share(content,name, '给我人生中的第一个男人','我对你的爱，一直都在，在心里，在这张卡片里')
		},
	    postShare:function () {
	    	var channel;
	    	if (location.href.indexOf("weixin/") != -1) {
          		channel = "weixin";
			} else if(location.href.indexOf("plaza") != -1) {
				channel = "plaza";
			} else if(location.href.indexOf("hot") != -1) {
				channel = "hot";
			}
	        $.get('/operation/share.do?shareId=130&channel=' + channel);
	    },
	    setShareBtn:function (title,url,desc) {
	    	var self = this;
	    	wxProtocol.init(function (wx, link) {
	                wx.onMenuShareAppMessage({
	                    title: title,
	                    desc: desc,
	                    link: url,
	                    imgUrl: "http://www.365rili.com/pages/bd/fathers_day/images/wx.jpg",
	                    success:function () {
	                                self.postShare();
	                            }
	                });
	                wx.onMenuShareTimeline({
	                    title: title,
	                    link: url,
	                    imgUrl: "http://www.365rili.com/pages/bd/fathers_day/images/wx.jpg",
	                    success:function () {
	                                self.postShare();
	                            }
	                });
	            });
	    },
		share:function (content,name, title, desc) {
			var self = this;
			var title = title || "父亲节|定制你对父亲的爱",
				desc = desc || "来，一起写下，这未曾说出口的爱";
			var url = location.href.replace(location.search, "").replace("#rd","");
			if(content) {
				url += "?content="+encodeURI(content);
			}
			if(name) {
				url += "&name="+encodeURI(name);
			}
			if(this.getUa.weixin) {
				this.setShareBtn(title,url,desc);
	        }else {
				$(".share-t-r").removeClass("none");
	        	$("#share-btn,.share-t-r,.bar_share_btn").on("click",function () {
	        		try{
		                $.ajax({
		                    url:'http://www.365rili.com/tmpmessage/shared.do',
		                    data:{
		                        id: '42',
		                        target: "father's Day"
		                    },
		                    success:function(){
		                        self.postShare();
		                        app.call({
		                            action: 'share',
		                            params: [
		                                {
		                                    name: 'shareString',
		                                    value: JSON.stringify({
		                                        title: title,
		                                        content: desc,
		                                        link: url,
		                                        image: 'http://www.365rili.com/pages/bd/fathers_day/images/wx.jpg',
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
	        	})

	        }
		},
		getUa:(function(){
			//根据useragent判断当前的设备类型
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";
			var bIsWeibo = sUserAgent.match(/weibo/i) == "weibo";
			var bIsqq = sUserAgent.match(/qq/i) == "qq";
			var bIsIosCoco = sUserAgent.match(/ios-coco/i) == "ios-coco";
			var bIsAndroidCoco = sUserAgent.match(/android-coco/i) == "android-coco";
			return {
				ipad: bIsIpad,
				iphone: bIsIphoneOs,
				android:bIsAndroid,
				weibo: bIsWeibo,
				weixin: bIsWeixin,
				qq: bIsqq,
				ios: bIsIphoneOs || bIsIpad,
				iosCoco: bIsIosCoco,
				androidCoco: bIsAndroidCoco,
				coco: bIsIosCoco || bIsAndroidCoco
			}
		})()
	};
	father.init();

})