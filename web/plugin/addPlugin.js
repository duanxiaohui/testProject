String.prototype.trim=function() 
{ 
    return this.replace(/(^\s*)|(\s*$)/g,""); 
} 

function HTMLEncode(str) {           
	var result = "";      
	var len = str.length;

	var ua = navigator.userAgent.toLowerCase();
	var IEVer= /msie/.test(ua)?parseFloat(ua.match(/msie ([\d.]+)/)[1]):false;

	if (IEVer >= 8){
		for (var i = 0; i < len; i++) {  
			result += (str.charCodeAt(i) + " ");
		}
	} else {
		var arr = [];
		for (var i = 0; i < len; i++) {        	
			arr[i] = str.charCodeAt(i);
		}
		result = arr.join(" ");       
		arr = null;
	}    

	return result;
}


var Plugin=Plugin||{};
Plugin= {
    'href':"",
    'selectText':"",
	'requestCount':1,
	'REQUEST_COUNT':10,
    'getContent':function(){
        var selecter;
        if(window.getSelection){
            selecter=window.getSelection().toString(); 
        }else{
            selecter=document.selection.createRange().text; 
        }
        if(selecter==null||selecter.trim()==""){
            selecter=document.getElementsByTagName("title")[0].innerHTML;
        }
        this.selectText=selecter;
		 try {
    	this.href = window.location.href;
    }catch(e) {
    	this.href = "";    	
    }
    },
    'browser': (function() {
        return {
            'isIE': (navigator.appVersion.indexOf("MSIE", 0) != -1),
            'isIE6': (navigator.appVersion.indexOf("MSIE 6", 0) != -1),
            'isSafari': (navigator.appVersion.indexOf("WebKit", 0) != -1),
            'isFirefox': (navigator.userAgent.indexOf("Firefox", 0) != -1),
            'isIpad': (navigator.userAgent.indexOf("WebKit") > 0 && 
            navigator.userAgent.indexOf("iPad") > 0),
            'isIphone': (navigator.userAgent.indexOf("WebKit") > 0 && 
            navigator.userAgent.indexOf("iPhone") > 0),
            'isChrome': (navigator.userAgent.indexOf("WebKit") > 0 && 
            navigator.userAgent.indexOf("Chrome") > 0)
        }
    })(),
    'init':function(){
        var body=window.document.body;
		if(document.getElementById("plugin_365rili")){
			var outer=document.getElementById("plugin_365rili");
			outer.innerHTML="";
		}else{
        var outer=Plugin.mkel('div',body);
        outer.id='plugin_365rili';
		}
        if(Plugin.browser.isIE6){
            outer.style.cssText='position:absolute;bottom:auto;top:expression(eval(document.documentElement.scrollTop)); padding-bottom: 10px; font: 12px/100% arial,sans-serif; color: rgb(51, 51, 51); width: 420px; top: 0px; z-index: 100000; margin: 10px; right: 0px;height:270px;';
        }else{
            outer.style.cssText=' position: fixed; padding-bottom: 10px; font: 12px/100% arial,sans-serif; color: rgb(51, 51, 51); width: 420px; top: 0px; z-index: 100000; margin: 10px; right: 0px;';
        }
        var content=Plugin.mkel('div',outer);
        content.style.cssText="width:400px;padding:5px;background-color:rgba(92,184,229,.5)!important;background:#5cb8e5;border-radius:5px;box-shadow:0 0 2px #5cb8e5;	-khtml-border-radius:5px;-webkit-border-radius:5px;-webkit-box-shadow:0 0 2px #5cb8e5;-moz-border-radius:5px;-moz-box-shadow:0 0 2px #5cb8e5;";
        var view =Plugin.mkel('div',content);
		view.style.cssText="";
		if (Plugin.browser.isIE) {
    	  view.style.cssText = "height:270px;width:398px;border:1px solid #5cb8e5;";
      } else {
    	  view.style.cssText = "height:258px;width:398px;border:1px solid #5cb8e5;";
      }   
		view.innerHTML='<iframe id="contentFrame" name="contentFrame" width="100%" height="100%" frameborder="0" scrolling="no"  style="width:100%;height:100%;border:0px"  border="0" onload="Plugin.frameHandler(event);"></iframe>';
        this.viewDiv=view;
		view.style.display='none';
		var loadDiv=Plugin.mkel('div',content);
		

      if (Plugin.browser.isIE) {
    	  loadDiv.style.cssText = "height:270px;398px;background:#fff;border:1px solid #5cb8e5;";    	  
      } else {
    	  loadDiv.style.cssText = "height:258px;398px;background:#fff;border:1px solid #5cb8e5;";    	 
      }      
     
      loadDiv.innerHTML = '<div id="_YNoteLoaddingTips" name="_YNoteLoaddingTips" style="position:absolute;z-index:9999;top:50%;left:50%;width:180px;margin:-12px 0 0 -91px;font-weight:bold;text-align:center;line-height:22px;border:1px solid #fff999;background-color:rgba(255,249,153,.9)!important;background:#fff999;border-radius:5px;-khtml-border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;">Loading…</div>';     
      loadDiv.name = "plugin_loadview";
      loadDiv.id = "plugin_loadview";
      this.loadView = loadDiv;
	  loadDiv.style.display = "block";
		var formDiv=Plugin.mkel('div',outer);
        var form=Plugin.mkel('form',formDiv);
        Plugin.extend(form,{
            'id':'contentForm',
            'name':'contentForm',
            'action':'http://www.365rili.com/plugin/getInfo.do',
            'target':'contentFrame', 
            'method':'POST'
        });
        Plugin.extend(formDiv.style,{
              'display':'none'
          });   
       var formHtml='<input type="text" value="" id="plugin_365rili_href" name="plugin_365rili_href"><input type="text" value="" id="plugin_365rili_content" name="plugin_365rili_content"><input type="text" value="" id="plugin_365rili_charset" name="plugin_365rili_charset">';   
       form.innerHTML=formHtml;
	  
       document.getElementById('plugin_365rili_href').value=this.href;
       document.getElementById('plugin_365rili_content').value=HTMLEncode(this.selectText);
	   var charset=Plugin.getCharSet();
	   charset=charset.indexOf("utf")>=0?"utf-8":"gb2312";
       document.getElementById('plugin_365rili_charset').value=charset;
       form.submit();
	   //loadDiv.style.display = "none";
    },
	'frameHandler':function(){
		Plugin.requestCount++;
		Plugin.loadView.style.display = "none";
        Plugin.viewDiv.style.display = "block";
		if (Plugin.requestCount >=Plugin.REQUEST_COUNT) {
        document.getElementById("plugin_365rili").style.display = "none";
		document.getElementById("plugin_365rili").innerHTML = "";
        return;
      }
	},
    'addEvent':function(el,evt,fn) {
        if (Plugin.browser.isIE) {
            el.attachEvent('on'+evt,fn);
        }
        else {
            el.addEventListener(evt,fn,false);
        }
    },
    'mkel' : function(html,parent) {
        try {
            var o = window.document.createElement(html);
            if (parent)
                parent.appendChild(o);
            return o;
        }
        catch(e) {
            return false;
        }
    },
    'extend' : function(obj,ex,rep) {
        if (typeof ex != "object") {
            return false;
        }
        for(var key in ex) {
            if ( typeof obj[key] != "undefined") {
                if (!rep) {
                    obj[key] = ex[key];
                }
                else {
                    obj[key] = [obj[key],ex[key]];
                }
            }
            else {
                obj[key] = ex[key];
            }
        }
    },
    'getCharSet' : function() {
        if (Plugin.browser.isIE) {
            return document.charset.toLowerCase();
        }
        else {
            return document.characterSet.toLowerCase();
        }
    }            
};
(function(){
    Plugin.getContent();
    Plugin.init();
    Plugin.addEvent(document.getElementById("plugin_closeBtn"),"click",function(){
        document.getElementById("plugin").style.display="none";
        return false;
    });
})();
