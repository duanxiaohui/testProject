;;;(function(global, undefined){

    function addSheet(cssCode){ 
        var doc,cssCode; 
        if(arguments.length == 1){ 
            doc = document; 
            cssCode = arguments[0] 
        }else if(arguments.length == 2){ 
            doc = arguments[0]; 
            cssCode = arguments[1]; 
        }else{ 
            alert("addSheet函数最多接受两个参数!"); 
        } 
        if(!+"\v1"){//新增功能，用户只需输入W3C的透明样式，它会自动转换成IE的透明滤镜 
            var t = cssCode.match(/opacity:(\d?\.?\d+);/); 
            if(t!= null){ 
                cssCode = cssCode.replace(t[0], "filter:alpha(opacity="+ parseFloat(t[1]) * 100+");"); 
            } 
        } 
        cssCode = cssCode + "\n";//增加末尾的换行符，方便在firebug下的查看。 
        var headElement = doc.getElementsByTagName("head")[0]; 
        var styleElements = headElement.getElementsByTagName("style"); 
        if(styleElements.length == 0){//如果不存在style元素则创建 
            if(doc.createStyleSheet){ //ie 
                doc.createStyleSheet(); 
            }else{ 
                var tempStyleElement = doc.createElement('style');//w3c 
                tempStyleElement.setAttribute("type", "text/css"); 
                headElement.appendChild(tempStyleElement); 
            } 
        } 
        var styleElement = styleElements[0]; 
        var media = styleElement.getAttribute("media"); 
        if(media != null && !/screen/.test(media.toLowerCase()) ){ 
            styleElement.setAttribute("media","screen"); 
        } 
        if(styleElement.styleSheet){ //ie 
            styleElement.styleSheet.cssText += cssCode;//添加新的内部样式 
        }else if(doc.getBoxObjectFor){ 
            styleElement.innerHTML += cssCode;//火狐支持直接innerHTML添加样式表字串 
        }else{ 
            styleElement.appendChild(doc.createTextNode(cssCode)) 
        } 
    }


	var jsrc = [
            'http://www.hao123.com/js/common/homelink-arg.js',
            'http://www.hao123.com/js/common/tongji.js',
		    'http://www.hao123.com/js/common/favorite.js?v=1',
            'http://www.hao123.com/js/common/erji-addin.js'
		    /*,'http://www.hao123.com/js/common/login.js'*/
        ],
        utf8s = [false,true,true,true],
		len = jsrc.length,
		temp = null,
		h = document.getElementsByTagName('head')[0];
        if(!h) h = document.getElementsByTagName("script")[0].parentNode;
    //callbacks in need
    global._LOGIN_JS_LOAD_ = function(obj){
        obj.login.init();
    };
    (function(){
        addSheet("#user-entry a{margin-left:6px;}");
    })();
	
	if(len == 0){
		
		return;
	};

    var dt = (parseInt((+new Date())/2.592e8,10));
	for(var i = 0;i < len;i ++){
		
		temp = document.createElement('script');
		temp.type = 'text/javascript';
        if(utf8s[i]) temp.charset="utf-8";
        var src = jsrc[i];
        src+=(src.indexOf("?")>-1 ? "&" : "?")+"d="+dt+".js";
		temp.src = src;
		if(h) h.appendChild(temp);
	};

    var uls = document.getElementsByTagName("ul");
    for(var ulsi = 0; ulsi < uls.length; ulsi++){
        var lnas = uls[ulsi].getElementsByTagName("a");
        for(var j = 0; j < lnas.length; j++){
            if(lnas[j].innerHTML == "\u4F53\u80B2\u8D5B\u4E8B"){
                var pn = lnas[j].parentNode;
                pn.className = pn.className + " new";
                pn.insertBefore(document.createElement("span"),pn.firstChild);
            }
        }
    }

})(window);