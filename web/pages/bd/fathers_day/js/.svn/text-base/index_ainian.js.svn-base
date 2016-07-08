$(function () {
	var father = {
		init:function () {
			var title,url,desc;
			this.setUI();
			this.bindEvent();

			title = "父亲节|定制你对父亲的爱";
			desc  = "来，一起写下，这未曾说出口的爱";
			url = location.href.split("?")[0];
			this.setShareBtn(title,url,desc);
		},
		setUI:function () {
			var content = this.getURLParameter("content")||"虽然，那个雨天，没有你接我回家…虽然，无数次，想到缺席我人生的你，都会痛哭…但你如同那些绵延的爱与念，一直珍藏在我的心。",
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
		getURLParameter:function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		},
		setFinalPage:function (content,name) {
			$(".make").addClass("none");
			$(".final").removeClass("none");
			$("#f-content").text(content);
			if(this.getUa.weixin) {
				$(".final .msg").removeClass("none");
			} else if(this.getUa.iosCoco || this.getUa.androidCoco) {
				$("#share-btn").removeClass("none");
			}
			$("#f-name").html(name);
			this.share(content,name)
		},
	    postShare:function () {
	        $.get('/operation/share.do?shareId=130&channel=weixin_v2');
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
		share:function (content,name) {
			var self = this;
			var title = "对那个缺席我人生男人的爱与念",
				desc = "那个缺席我人生的男人，在我的心中一直都在";
			var url = location.href.replace(location.search, "").replace("#rd","");
			url += "?content="+(encodeURI(content)||"null");
			url += "&name="+(encodeURI(name)||"null");
			if(this.getUa.weixin) {
	            this.setShareBtn(title,url,desc);
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