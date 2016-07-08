/**
 * loadframe
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-10-23 14:17:15
 */

(function () {
	var fn = {
		getQuery: function(name) {
	        var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
	        var href = location.href;
	        if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	        return ""
	    },
	    splitUrl: function(url) {
	        var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	        url = url || location.href;
	        var arr = parse_url.exec(url);
	        return {
	            scheme: arr[1],
	            slash: arr[2],
	            host: arr[3],
	            port: arr[4] || 80,
	            path: arr[5],
	            query: arr[6],
	            hash: arr[7]
	        }
	    },
	    getDomain: function(host) {
	    	host = host || window.location.hostname;
	        var hostname = host.split('.');
	        var l = hostname.length;
	        if (l <= 2) {
	            return host
	        };
	        var domain = "";
	        for (var i = 1; i < l - 1; i++) {
	            domain += hostname[i] + "."
	        }
	        return domain + hostname[l - 1]
	    }
	};

	var logic = {
		loadNum:0,
		url:'',
		checkDomain: function () {
			var _url = fn.getQuery('url');
			var _split = fn.splitUrl(_url);
		    var _host = _split['host'];
		    var _domain = fn.getDomain(_host);

		    var host = window.location.hostname;
		    var domain = fn.getDomain();

		    if(_host == host){
		    	logic.getResource(_url, _split);
		    }
		    else if(_domain == domain){
		    	logic.getResourceCross(_url);
		    }
		    else{
		    	logic.getResourceOtherOrigin(_url);
		    }
		    logic.url = _url;
		},
		checkLoadNum: function () {
			logic.loadNum--;
			console.log(logic.loadNum);
			if(logic.loadNum == 0){
				logic.ready();
			}
		},
		ready: function () {
			// $('#box').on('load', function () {
			// 	var $win = $(window), iframe = this;
			//     //解决iso系统iframe没有滚动条的bug
			//     if(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
			//         var $wrap = $("<div/>").addClass("mobile-devices-wrap");
			// 		$wrap.css({
			//             "width":  $win.width(),
			//             "height": $win.height(),
			//             '-webkit-overflow-scrolling':'touch',
			//             'overflow':'auto'
			//         });
			//         $(iframe.contentDocument.body).wrapAll($wrap);
			//         $win.on("resize", function(){
			//             $(iframe.contentDocument.body).find(".mobile-devices-wrap").css({
			//                 "width":  $win.width(),
			//                 "height": $win.height()
			//             });
			//         });
			//     }
			// 	$(this).fadeIn();
			// }).attr('src', logic.url)
			$('.container').fadeOut(function () {
				window.location.href = logic.url;
			});
		},
		getCssLink: function (txt, split) {
			var reg = /href=".*\.css[^"]*"/g;
			var cssList = txt.match(reg);
			var path = split['path'].split('/');
			path.length--;
			path = path.join('/');
			path = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port']+ '/' + path + '/';
			var pathByDomain = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port'];
			var source = null;
			var url = null;
			logic.loadNum += cssList.length;
			for (var i = 0; i < cssList.length; i++) {
				source = cssList[i];
				source = source.substr(6, source.length - 7);
				if(source.charAt(0) == '/'){
					url = pathByDomain + source;
				}
				else if(/^https?:\/\//.test(source)){
					url = source;
				}
				else{
					url = path + source;
				}
				logic.getCss(url, fn.splitUrl(url));
			};
		},
		getCss: function (url, split) {
			$.ajax({
				url: url,
				success: function (data) {
					logic.getImageLink(data, split);
					logic.checkLoadNum();
				}
			});
		},
		getImageLink: function (txt, split) {
			var reg = /url\([^\)]*\)/g;
			var imgList = txt.match(reg);
			imgList = imgList || [];
			var path = split['path'].split('/');
			path.length--;
			path = path.join('/');
			path = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port']+ '/' + path + '/';
			var pathByDomain = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port'];
			var source = null;
			var url = null;
			logic.loadNum += imgList.length;
			for (var i = 0; i < imgList.length; i++) {
				source = imgList[i];
				source = source.substr(4, source.length - 5);
				if(source.charAt(0) == '/'){
					url = pathByDomain + source;
				}
				else if(/^https?:\/\//.test(source)){
					url = source;
				}
				else{
					url = path + source;
				}
				logic.getImg(url);
			};
		},
		getImgLinkByPage: function (txt, split) {
			var reg = /<img[^src="]*src="[^"]*"/g;
			var imgList = txt.match(reg);
			imgList = imgList || [];
			var path = split['path'].split('/');
			path.length--;
			path = path.join('/');
			path = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port']+ '/' + path + '/';
			var pathByDomain = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port'];
			var source = null;
			var url = null;
			logic.loadNum += imgList.length;
			for (var i = 0; i < imgList.length; i++) {
				source = imgList[i];
				source = source.split('"')[1];
				if(source.charAt(0) == '/'){
					url = pathByDomain + source;
				}
				else if(/^https?:\/\//.test(source)){
					url = source;
				}
				else{
					url = path + source;
				}
				logic.getImg(url);
			};
		},
		getImg: function (url) {
			var img = new Image;
			img.onload = function () {
				logic.checkLoadNum();
				img = null;
			}
			img.src = url;
		},
		getJsLink: function (txt, split) {
			var reg = /src=".*\.js[^"]*"/g;
			var jsList = txt.match(reg);
			var path = split['path'].split('/');
			path.length--;
			path = path.join('/');
			path = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port']+ '/' + path + '/';
			var pathByDomain = split['scheme'] + ':' + split['slash'] + split['host'] + ':' +split['port'];
			var source = null;
			var url = null;
			logic.loadNum += jsList.length;
			for (var i = 0; i < jsList.length; i++) {
				source = jsList[i];
				source = source.substr(5, source.length - 6);
				if(source.charAt(0) == '/'){
					url = pathByDomain + source;
				}
				else if(/^https?:\/\//.test(source)){
					url = source;
				}
				else{
					url = path + source;
				}
				logic.getJs(url);
			};
		},
		getJs: function (url) {
			$.ajax({
				url: url,
				success: function (data) {
					logic.checkLoadNum();
				}
			});
		},
		getResource: function (url, split) {
			$.ajax({
				url: url,
				success: function (data) {
					logic.getCssLink(data, split);
					logic.getJsLink(data, split);
					logic.getImgLinkByPage(data, split);
				}
			});
		}
	};

	logic.checkDomain();
})();