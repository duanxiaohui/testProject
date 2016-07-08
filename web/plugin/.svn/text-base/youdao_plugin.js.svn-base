/*
 * @todo change the method of geting selection content
 * @todo fixed the bug when no body exists
 */
/*--default configration start {{*/
var YWebClipperConfiguration = {
  'logEnabled' : false /*debug in firefox*/ ,  
  'clipperBaseURL' : 'http://note.youdao.com/yws' ,//TODO:replace with static url  
  'clipperUploadApp' : '/mapi/wcp?method=putfile&keyfrom=wcp',
  'clipperClipType' : 'OnlyHTML',
   /*all elements created by this js add this to their id transparent*/
  'clipperDomPrefix' : '_YNote',
  'loadingHTML' : '<div id="_YNoteLoaddingTips" name="_YNoteLoaddingTips" style="position:absolute;z-index:9999;top:50%;left:50%;width:180px;margin:-12px 0 0 -91px;font-weight:bold;text-align:center;line-height:22px;border:1px solid #fff999;background-color:rgba(255,249,153,.9)!important;background:#fff999;border-radius:5px;-khtml-border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;">正在加载中，请稍候…</div>',
  'clipperFormFields':[
    ['title','text','tl'],
    ['path','text','p'],
    ['content','area','bs'],
    //['name','text','name'],
    ['source','text','src'],
    ['fullPageClipper','text','fpc'],
    ['userid','text','userid'],
    ['len','text','len'],
    ['charset','text','cs']
  ],
  /*Wrapper Container's Style; changed to cssText*/
 'clipperStyle':'position:fixed;padding-bottom:10px;font:12px/100% arial,sans-serif;color:#333; width: 420px; ',
 'clipperStyleIE':'position:absolute;padding-bottom:10px;font:12px/100% arial,sans-serif;color:#333; width: 420px; ',
  
 'styleMerge' : {
    'margin':['margin-top','margin-right','margin-bottom','margin-left'],
    'padding':['padding-top','padding-right','padding-bottom','padding-left'],
    //'font':['font-style','font-variant','font-weight','font-size','line-height','font-family'],
    'list-style':['list-style-type','list-style-position','list-style-image'],
    'border':['border-bottom']
  },
  'formatTag' : {
    'br':null,
    'p':null,
    'img':null
  },
  'styleQuote' : {
    'font-family' : true
  },
  /*All item in keep section will be fetched to server*/
  'clipperFilterStyles': {
    'keep':{
      //"*": [ "font-size","font-style","font-weight","font-family","line-height","margin","padding","color","text-align","float","overflow","width","height"],
      "*": [ "font-size","font-style","font-weight","font-family",'color'],
      //"img": ["width", "height"],
      //"img": ["width", "height"],
      //"li": ["list-style", "margin", "padding"],
      "li": ["list-style"],
      //"b":["margin","padding"],
      //"ul": ["list-style", "margin", "padding"],
      "ul": ["list-style"]
      //"dl": ["margin-left", "padding"],
      //"dt": ["margin", "padding"],
      //"form": ["height", "width", "margin", "padding"],
      //"form": ["height", "width"]
      //"body":["margin","padding","text-align"]
    },
    'remove':{
    
    },
    'default' : {
        
    }
  },
  'clipperFilterAttributes': {
    'keep':{
    
    },
    'remove':{
      "style" : null,
      "class" : null,
      "classname":null,
      "id" : null,
      "onclick": null,
      "onsubmit": null,
      "onmouseover": null,
      "onmouseout": null,
      "onmousedown":null,
      "onpaste" : null,
      "contenteditable":null,
      "designmode":null,
      "onload":null,
      "for":null,
      "method":null,
      "tabindex":null     
    } 
  },
  'filterElements':{
    'keep':{
    
    },
    'remove':{
      "style" : null,
      "script" : null,
      "input" : null,
      "select" : null,
      "option" : null,
      "textarea" : null,
      "button":null,
      "object":null, //remove flash/applets,etc.
      "applet":null,
      "embed":null      
    }
  },
  'listNodes' : {
    "ul" : null,
    "ol" : null
  },
  'selfCloseTag' : {
    "base" : null,
    "basefont" : null,
    "frame" : null,
    "link" : null,
    "meta" : null,
    "area" : null,
    "br" : null,
    "col" : null,
    "hr" : null,
    "img" : null,
    "input" : null,
    "param" : null
  }, 
  'translateTagName' : {
    "body" : "div",
    "form" : "div",
    "strong":"span",
    "h1" : "span"
  },
  'names':{
    'FrameName' : 'YNoteForm'+Math.floor(Math.random(10000)),
    'FormName' : 'YNoteForm'+Math.floor(Math.random(10000))
  }
};
/*}}--configuration end--*/

/*
 * @author
 * @project web_clipper
 * @package webClipper.core
 * @description
 * @version
 */
(function() {
  /**
   * @ helper functions
   */
  if (typeof Function.prototype.inherit != "function") {
    Function.prototype.inherit = function(baseClass) {
      if (typeof baseClass == "function") {
        this.prototype = new baseClass();
        this.prototype.parent = baseClass();
        this.prototype.constructor = this;
      }
    };
  }
  /* not use now,will be used for i18n*/
  var _t = function(text) {
    return text;
  };
  /*
   * @package CommonUtils
   */
  var OldYNote = null;
  var doc = window.document;
  
  if (typeof YNote != "undefined") {
    OldYNote = YNote;
  }
  YNote = {};
  YNote.Common = {
    'browser': (function() {
      return {
        'isIE': (navigator.appVersion.indexOf("MSIE", 0) != -1),
        'isSafari': (navigator.appVersion.indexOf("WebKit", 0) != -1),
        'isFirefox': (navigator.userAgent.indexOf("Firefox", 0) != -1),
        'isIpad': (navigator.userAgent.indexOf("WebKit") > 0 && 
                   navigator.userAgent.indexOf("iPad") > 0),
        'isIphone': (navigator.userAgent.indexOf("WebKit") > 0 && 
                     navigator.userAgent.indexOf("iPhone") > 0),
        'isChrome': (navigator.userAgent.indexOf("WebKit") > 0 && 
                     navigator.userAgent.indexOf("Chrome") > 0)
      }
    })()
    ,
    'trim' : function(str) {
      if (typeof str != "string") {
        return str;
      }
      else {
        return str.replace(/^\s+/,'').replace(/\s+$/,'');
      }
    }
    ,
    'getCssText' : function(style) {
    
    }
    ,
    'check163Auth' : function(content) {
        
    }
    ,
    'configuration':function() {
      return {
        'load' : function() {
        
        },
        'reload' : function() {
        
        },
        /*function prototype : function(newConfiguration) {}*/
        'addConfigurationChangeListener':function(fn) {
        
        },
        'removeConfigurationChangeListener':function(fn) {
        
        }
      };
    }
    ,
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
    }     
    ,
    'el' : function(id) {
      return doc.getElementById(id);
    }
    ,
    /*Create new dom element and append it to parent if exists or document.body*/
    'mkel' : function(html,parent) {
      /*
      parent = parent?parent:document.body;
      if (!parent.nodeType || parent.nodeType != 1) {
        parent = doc.body;
      }*/
      try {
        var o = doc.createElement(html);
        if (parent)
        	parent.appendChild(o);
        return o;
      }
      catch(e) {
        return false;
      }
    }
    ,
    'addEvent':function(el,evt,fn) {
      if (!el.nodeType || el.nodeType != 1) {
        return false;
      }
      if (YNote.Common.browser.isIE) {
        el.attachEvent('on'+evt,fn);
      }
      else {
        el.addEventListener(evt,fn,false);
      }
    }
    ,
    'deleteEvent':function(el,evt,fn) {
      if (!el.nodeType || el.nodeType != 1) {
        return false;
      }
      if (YNote.Common.browser.isIE) {
        el.detachEvent('on'+evt,fn);
      }
      else {
        el.removeEventListener(evt,fn,false);
      }
    },
    'wrapperEvent':function(e) {
      var ev = {
        'target':(YNote.Common.browser.isIE?e.srcElement:e.target),
        'offsetX':(YNote.Common.browser.isIE?e.offsetX:e.layerX),
        'offsetY':(YNote.Common.browser.isIE?e.offsetY:e.layerY),
        'x':(YNote.Common.browser.isIE?e.x:e.pageX),
        'y':(YNote.Common.browser.isIE?e.y:e.pageY)
      };
      return ev;
    }
    ,
    'enableDrag' : function(el) {
      var win = window;
      if (typeof el == "string") {
        el = YNote.Common.el(el);
      }
      if (el.nodeType && el.nodeType == 1 && el.tagName.toLowercase() == 'div') {
        el.style.position = 'absolute';
        YNote.Common.addEvent(el,'mousedown',function(event) {
          if (typeof win.YNoteDragObject == "undefined" || win.YNoteDragObject == null ) {
            var evt = YNote.Common.wrapperEvent(event);
            win.YNoteDragObject = {
              'element':evt.target,
              'startX':evt.offsetX,
              'startY':evt.offsetY
            };
          }
          else {
            return false;
          }
        });        
        if (typeof win.YNoteDragObject == "undefined") {
          YNote.Common.addEvent(win.document,'mouseup',function(event){
            if (win.YNoteDragObject != null) {
              win.YNoteDragObject = null;
            }
          });
          YNote.Common.addEvent(win.document,'mousemove',function(event) {
            if (typeof win.YNoteDragObject == "undefined" || win.YNoteDragObject == null) {
              return;
            }
            var evt = YNote.Common.wrapperEvent(event);
            win.YNoteDragObject.element.style.left = (evt.x - win.YNoteDragObject.startX ) + 'px';
            win.YNoteDragObject.element.style.top = (evt.y - win.YNoteDragObject.startY ) + 'px';
          });
        }        
      }
    }
    ,
    'log' : function(mess) {
      if (!YWebClipperConfiguration.logEnabled) {
        return false;
      }
      if (typeof console == 'undefined') {
        console = (function() {
          var logPanel = doc.createElement('div');
          logPanel.style.cssText = "width:100%;height:500px;border:1pt solid "
                         +"black;position:absolute;left:0px;top:800px";
          logPanel.innerHTML = '<textarea style="width:100%;'
                         +'height:450px" id="console_log"></textarea>';
          doc.body.appendChild(logPanel);
          return {
            'log':function(str) {
              doc.getElementById('console_log').value+=str+'\n';
            }
          };
        })();
      }
      if (typeof console.log == "undefined") {
        return;
      }
      console.log(mess);
    }
    ,
    'Dom' : {
      'appendHTMLToIframe' : function(iframe,html) {
        if (iframe.tagName && iframe.tagName.toLowerCase() == "iframe") {
          var doc = iframe.contentWindow.document;
          try {
            doc.open();
            doc.write(html);
            doc.close();
          }
          catch(e) {
            YNode.Common.log('append HTML to [iframe:'+iframe.name+'] ERROR!');
          }
        }
      }
    }
    ,
    'getCharSet' : function() {
        if (YNote.Common.browser.isIE) {
            return document.charset.toLowerCase();
        }
        else {
            return document.characterSet.toLowerCase();
        }
    }        
    ,
    'HTMLEncode':function(str) {           
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
    ,
    'unicodeEncode':function(str) {
      var result = "";
      if (typeof str == 'string') {
        for (var i=0; i<str.length; i++) {
          var c = str.charCodeAt(i);
          if (c > 127) {
            result += "&#" + c + ";";
          } else {
            result += str.charAt(i);
          }
        }
      }
      return result;
    }
  };
  
  
  
  /*
   * @prototype YNoteEventInterface
   * @description BaseClass
   */
   
  YNote.EventInterface = function() {
    
  };
  YNote.Common.extend(YNote.EventInterface.prototype,{
      'addEventListener':function(eventType,fn) {
      
      },
      'removeEventListener':function(eventType,fn) {
      
      },
      'executeEvent':function(eventType) {
      
      },
      'fireEvent':function(eventType) {
      
      },
      'events':{}
    });
  
  /*
   * @package
   * @class YNote.StyleUtil
   * @description
   */
  YNote.StyleUtil = function() {
  
  };
  
  YNote.Common.extend(YNote.StyleUtil.prototype,  {
    'styleForNode' : function(node,parentNode) {
      //TODO refine
      this.cssNameMap = {};
      if (node && node.nodeType && node.nodeType ==1) {
        var styles = null;
        if (YNote.Common.browser.isIE) {          
          styles = node.currentStyle;
        }
        else {
          styles = window.getComputedStyle(node,null);
        }
               
        var keepStyles = YWebClipperConfiguration.clipperFilterStyles.keep;
        var nodeStyles = null;
        if (typeof keepStyles[node.tagName.toLowerCase()] == "undefined") {
          nodeStyles = keepStyles['*'];
        } 
        else {
          nodeStyles = keepStyles[node.tagName.toLowerCase()];
        }
        var str = '';
        var cssArray = {};
        var mergedStyle = YWebClipperConfiguration.styleMerge;
        for(var i = 0;i < nodeStyles.length;i++) {
          if (YNote.Common.browser.isIE) {
            var cssName = nodeStyles[i];
            if (mergedStyle[cssName]) {
              cssArray[cssName] = this.getCompoundCssString(cssName,styles);
            } else {
              cssName = this.cssName2ScriptName(nodeStyles[i]);
              if (!(/#000000|none|auto|visible|arial/i.test(""+styles[cssName])))
            	  cssArray[cssName] = (""+styles[cssName]).replace(/"/g,"'");
            }
          } else {
            var cssName = nodeStyles[i];
            if (mergedStyle[cssName]) {
              cssArray[cssName] = this.getCompoundCssString(cssName,styles);
            }
            else {
              var t = styles.getPropertyCSSValue(cssName);
              if(t != null){
            	  if (!(/#000000|none|auto|visible|arial/i.test(t.cssText)))
            		  cssArray[cssName] = t.cssText.replace(/"/g,"'");
              }
            }
          }
        }
        this.cssArray = cssArray;
        return this.getStyleString(cssArray);
        
      }
      else {
        return '';
      }
    },   
    'getStyleString' : function(cssArray) {
    	
        var str = '';
        var ckey = '';
        for(var key in cssArray) {
          if (cssArray[key].length != 0) {
            if (YNote.Common.browser.isIE) {
                ckey = (typeof this.cssNameMap[key] != "undefined"&&this.cssNameMap[key].length > 0)?this.cssNameMap[key]:key;
            }
            else {
                ckey = key;
            }
            str += ckey+':'+cssArray[key]+';'
          }
        }
        return str;
    },
    'getCompoundCssString' : function(cssName,styles) {
      var mergedStyle = YWebClipperConfiguration.styleMerge;
      var str = '';
      for(var i=0;i<mergedStyle[cssName].length;i++) {
        if (YNote.Common.browser.isIE) {
          var name = this.cssName2ScriptName(mergedStyle[cssName][i]);
          str+=styles[name]+" ";
        }
        else {
          str+=styles.getPropertyCSSValue(mergedStyle[cssName][i]).cssText+" ";
        }
      }
      str = str.substring(0,str.length-1);
      if (/(0px ?){4}|(auto ?){4}/i.test(str))
    	  return "";
      else
    	  return str;      
    },
    'cssName2ScriptName' : function(cssName) {
      if (typeof cssName == "string" && cssName.indexOf('-') > 0) {
        var names = cssName.split('-');
        var scriptName = names[0];
        for(var i=1;i<names.length;i++) {
          scriptName += names[i].substring(0,1).toUpperCase()+names[i].substring(1);
        }
        this.cssNameMap[scriptName] = cssName;
        return scriptName;
      }
      else if (typeof cssName == 'string'){
        if (cssName == "float") {
            return "styleFloat";
        }
        else {
            return cssName;
        }
      }
      else {
        return '';
      }
    },
    'mergeDefaultCssValue' : function() {
        
    }
  });
  /*
   * @class YNote.Clipper
   * @description 
   * @attributes:clipper,
   */
  YNote.Clipper = function() {
    this.content = null;
    this.title = null;
    
    try {
    	this.source = window.location.href;
    }catch(e) {
    	this.source = "";    	
    }
    this.type = null;
    this.selector = new YNote.Selection();
    this.init();
  };
  //constants
  YNote.Common.extend(YNote.Clipper, {
    // NORMAL
    "CLASS_INIT":0,
    "CLIPPING":1,
    "CLIPPED":2,
    "UPLOADING_FILE":3,
    "UPLOADED_FILE":4,
    "UPLOADING_INFO":5,
    "UPLOADING_INFO":6,
    "START_LOGIN":7,
    "DONE":8,
    // ERROR
    "ERROR_CLIP":10001,
    "ERROR_UPLOAD_FILE":10002,
    "ERROR_UPLOAD_INFO":10003,
    "ERROR_UPLOAD_LOGIN":10004,
    "ERROR_NO_BODY":10005,
    //max count of request
    "CEIL_OF_REQUEST" :{"COUNT":10} //login + relogin(6) + send file
  });
  YNote.Common.extend(YNote.Clipper.prototype,{
    'close' : function() {    	
        this.wrapper.style.display = "none";        
        this.deleteFrame();
        this.state = YNote.Clipper.DONE;        
        
    },
    'clipContent':function() {
      //--default cliping event handler
      this.state = YNote.Clipper.CLIPPING;
      var starttime = new Date().getTime();      
      //document.getElementById('_YNoteLoaddingTips').innerHTML = "正在加载中，请稍后...";//"正在获取所选内容";
      this.loadingView.style.display = 'block';            
           
      try {
    	  document.getElementById(YWebClipperConfiguration.clipperDomPrefix+'ContentForm'+'fullPageClipper').value = "true";    
    	     
	      this.getSelection();      
	      var doc = document;
	      if (this.hasSelection()) {
	        YNote.Common.log('has selection');
	        this.range = this.selector.getSelectionRange();       
	        this.content = this.getSelectedContent();
	        this.state = YNote.Clipper.CLIPPED;
	        //set webclipper to true
	        document.getElementById(YWebClipperConfiguration.clipperDomPrefix+'ContentForm'+'fullPageClipper').value = "false";    
	        return this.content;
	      }
	      else if (doc.body) {
	        YNote.Common.log('no selection!');
	        this.content = this.getNodeText(doc.body);        
	        this.state = YNote.Clipper.CLIPPED;
	        return this.content;
	      }
	      else {
	        YNote.Common.log("No Body!");
	        document.getElementById('_YNoteLoaddingTips').innerHTML = '抱歉，由于页面设置，无法获取所选内容';
	        this.state = YNote.Clipper.ERROR_NO_BODY;
	        return "";
	      }
	      //--default cliped event handler
	      this.state = YNote.Clipper.CLIPPED; 
	      var endtime = new Date().getTime();
	      YNote.Common.log("Got Content, time: " + (endtime-starttime));
      } catch(e) {    	 
    	  try {
    		  document.getElementById('_YNoteLoaddingTips').innerHTML = '抱歉，由于页面设置，整页抓取失败，请选择部分内容后重试';        		  
    	  } catch (e2) {
    		  alert ("抱歉，由于页面设置，页面抓取失败!");    		  
    	  }
      }      
    },
    'hasSelection' : function() {
      if (typeof this.selection != "undefined" && this.selection !=null && (typeof this.selection.getRangeAt == "function" || typeof this.selection.createRange == "object" || typeof this.selection.createRange == "function")) {
        if (typeof this.selection.rangeCount != "undefined" && this.selection.rangeCount < 1) {
          return false;
        }
        else if (typeof this.selection.createRange == "function" || typeof this.selection.createRange == "object"){
         try {
          if (this.selection.type.toLowerCase() != "text" || this.selection.createRange().htmlText=='') {
            return false;
          }
          }catch(e) {return false;}
        }
        else if (typeof this.selection.getRangeAt == "function"){
          try {
            var range = this.selection.getRangeAt(0);
            if ((range.startContainer == range.endContainer && range.startOffset == range.endOffset)) {
              return false;
            }
          }
          catch(e) {
            return true;
          }
        }
        return true;
      }
      return false;
    },
    'getSelection' : function() {
      this.selection = this.selector.getSelection();
    },        
    'submit':function() {      
      // --default submiting handler
      this.state = YNote.Clipper.UPLOADING_FILE;      
      this.loadingView.style.display = "block";
      
      //document.getElementById('_YNoteLoaddingTips').innerHTML = '正在上传内容.....'; 
      // --default submiting handler --
      this.fillForm();      
      this.form.submit();
      // --default submited handler --      
    },
    'getClipID':function() {
      return '/wcp'+(new Date().getTime())+Math.floor(Math.random()*1000);
    },
    'getHiddenForm':function() {
      var o = YNote.Common.mkel('form');
      o.innerHTML = '';
      return o;
    },
    'rangeIntersectsNode' : function(node) {
        if (!YNote.Common.browser.isIE) {
          if (this.range) {
            var nodeRange = node.ownerDocument.createRange();
            try {
              nodeRange.selectNode(node);
            }
            catch (e) {
              nodeRange.selectNodeContents(node);
            }
          
            return this.range.compareBoundaryPoints(Range.START_TO_END, nodeRange) == 1 
              && this.range.compareBoundaryPoints(Range.END_TO_START, nodeRange) == -1;
          }
          return false;
        }
        else {
            
            if (this.range) {
                if (node.nodeType == 1) {
                    var oRange = node.ownerDocument.body.createTextRange();
                    oRange.moveToElementText(node);
                    return oRange.compareEndPoints("StartToEnd",this.range) == -1 && oRange.compareEndPoints("EndToStart",this.range) == 1;
                }
                else {
                    return true;
                }
            }
            return false;
        }
    },
    'changeNodeName' : function(node) {
      var trans = YWebClipperConfiguration.translateTagName;
      if (typeof trans[node.tagName.toLowerCase()] != 'undefined') {
        return trans[node.tagName.toLowerCase()];
      }
      return node.tagName.toLowerCase();
    },
    'isListNode' : function(node) {
      var listnodes = YWebClipperConfiguration.listNodes;
      return (node && node.nodeType == 1 && typeof listnodes[node.nodeName.toLowerCase()] != 'undefined');
    },
    'withAttribute' : function(attr) {
      var removeAttributes = YWebClipperConfiguration.clipperFilterAttributes.remove;
      return (typeof attr == 'string' && typeof removeAttributes[attr.toLowerCase()] == 'undefined');
    },
    'getNodeAttributesString' : function(node) {
      //TODO user array.join?
      var str = "";
      var attrs = node.attributes; 
    
      if (attrs != null) {
        for ( var i = 0; i < attrs.length; i++) {          
          var a = attrs[i].nodeName.toLowerCase();
          var v = attrs[i].nodeValue;
          if (a == "href" || a=="src") {
            // delete javascript link
            if (v.toLowerCase().indexOf("javascript:") == 0 || v.indexOf("#") == 0) {
                v="";
            }
            // replace URL
            else {
                v = this.replaceURL(v);
            }
          } else if (a == "target" && v == "_blank") {
        	  continue; //default target ignored
          }
          if (this.withAttribute(a) && typeof v=="string" && v.length > 0) {
        	str += attrs[i].nodeName + '=' + '"' + v.toString() + '" ';
          }//if
          
        }//for
       
      }//if
      
      return str.replace(/\s+$/, "");
    },
    'isCloseTag' : function(node) {
      return (node && typeof YWebClipperConfiguration.selfCloseTag[node.nodeName.toLowerCase()] != 'undefined');
    },
    'isNodeVisible' : function(node) {
      if (node.nodeType) {
        var display = "";
        // check Style
        if (YNote.Common.browser.isIE) {
            if (node.currentStyle != null && node.currentStyle['display'] == "none") {//需要add对node.currentStyle 判断
                return false;
            }
        }
        else {
            try {
                if (window.getComputedStyle(node,null).getPropertyCSSValue("display").cssText == "none") {
                    return false;
                }
            }
            catch(e) {
                return false;
            }
        }
        // format control tag 
        config = YWebClipperConfiguration;
        // check Child nodes
        if (node.nodeType == 3) {
            if (node.nodeValue || node.nodeValue.length == 0) {
                return false;
            }
        }
        if (node.nodeType == 1 && typeof config.formatTag[node.tagName.toLowerCase()] == "undefined") {
            // no child
            if (YNote.Common.trim(node.innerHTML).length == 0)  {
                return false;
            }
        }
        return true;
      }
      else {
        return false;
      }
    },
    'keepNode' : function(node) {
      if (node) {    	
        if (node.nodeType == 3) {
          return true;
        } 
        else if (node.nodeType == 1) {
          if (node.nodeName.indexOf('#') == 0 || !this.isNodeVisible(node)) {
            return false;
          }
          var removeElements = YWebClipperConfiguration.filterElements.remove;
          return (typeof removeElements[node.nodeName.toLowerCase()] == 'undefined');
        }
      }
      return false;
    },
    'replaceURL' : function(url) {
    	//TODO 对rbase和base进行缓存以避免每次都计算
        if (!window.location) {
            return url;
        }
        var match = null;
        url = YNote.Common.trim(url);
        var host = window.location.host;
        var proto  = window.location.protocol;
        var base = window.location.href.split("?")[0].split('#')[0];
        base = base.substr(0,base.lastIndexOf('/'))+"/";
        rbase = proto+"//"+host;
        if ((match = url.match(/^(https?):/i)) != null) {
            return url;
        }
        else {
            if (url.indexOf("/") == 0) {
                return rbase+url;
            }
            else {
                return base+url;
            }
        }
    },
    'getNodeText' : function(node, parentNode) {
      var str = "";
      
      var  s = node;
      while (s != document.body) {
        if (s == this.wrapper) {
            return str;
        }
         
        if(s == null)
        	return str;
        
        s = s.parentNode;
      } 
      if (this.range && !this.rangeIntersectsNode(node)) {
        return str;
      }
      if (!this.keepNode(node)) {
        return str;
      }
     
      // Text node
      if (node.nodeType == 3) { 
        if (this.range) {
          if (this.range.startContainer == node && this.range.startContainer == this.range.endContainer) {
            str += node.nodeValue.substring(this.range.startOffset, this.range.endOffset);
          } 
          else if (this.range.startContainer == node) {
            str += node.nodeValue.substring(this.range.startOffset);
          } 
          else if (this.range.endContainer == node) {
            str += node.nodeValue.substring(0,this.range.endOffset);
          } 
          else if (this.range.commonAncestorContainer != node) {
            str += node.nodeValue;
          }
        } 
        else {
          str += node.nodeValue;
        }
      } 
      // element node
      else if (node.nodeType == 1) {        
        if (this.range && this.range.commonAncestorContainer == node && this.range.startContainer != this.range.commonAncestorContainer && !this.isListNode(node)) {
        	
        } 
        else {
          
          var changedNodeName = this.changeNodeName(node);
          str += "<" + changedNodeName;        
          // include attrs
          var attrStr = this.getNodeAttributesString(node);
         
          if (attrStr.length > 0)
            str += " " + attrStr;
          // include style
          
          if (this.styleUtil) {
            var nodeStyleString = this.styleUtil.styleForNode(node, parentNode);
            
            if (nodeStyleString != null && nodeStyleString.length != 0) {
              str += " style=\"" + nodeStyleString + "\"";
            } 
          }
          
          if (!node.hasChildNodes() && this.isCloseTag(node)) {
            str += "/>";
          } 
          else {
            str += ">";
          }
        }
                
        // all children
        if (node.tagName.toLowerCase() != "iframe" && node.hasChildNodes()) {
          var children = node.childNodes;
          for ( var j = 0; j < children.length; j++) {
            var child = children[j];
            if (child != null && child.nodeType > 0 && child.nodeName && child.nodeName.toLowerCase() != 'script' && child.nodeName.toLowerCase() != 'iframe') {
              var childStr = this.getNodeText(child, node);
              if (childStr && childStr.length > 0)
                str += childStr;
            }
          }
        }
        
        if (this.range && this.range.commonAncestorContainer == node && !this.isListNode(node)) {
        } 
        else if (node.hasChildNodes() || !this.isCloseTag(node)) {
          str += "</" + changedNodeName + ">";
        }
      }
      return str;
    },
    'getSelectedContent':function() {
      
      if (this.hasSelection()) {    	
        if (YNote.Common.browser.isIE) {         
          YNote.Common.log(this.selection.htmlText);
          if (this.selection.htmlText) {
            this.content = this.selection.htmlText;            
            return this.selection.htmlText;
          }
          else {
            this.content = this.getNodeText(this.getRangeContainer(this.range));           
            return this.content;
            //this.content = this.selection.createRange().htmlText;
            //return this.selection.createRange().htmlText;
          }
        }
        else {
          var range = this.selector.getSelectionRange();
          var content = '';
          content = this.getNodeText(range.commonAncestorContainer);
          if (content == '') {
            YNote.Common.log('Get Selected ERROR!');
          }
          return content;
        }
      }
    },
    'getRangeContainer' : function(textRange) {
        if (!textRange) {
            return document.body;
        }
        var node = textRange.parentElement();
        var nodeRect = node.getBoundingClientRect();
        var rangeRect = textRange.getBoundingClientRect();
        //YNote.Common.log(nodeRect.top);
        while(nodeRect.top > rangeRect.top || nodeRect.bottom <rangeRect.bottom) {
            node = node.parentNode;
            nodeRect = node.getBoundingClientRect();
        }
        return node;
    },
    'initFrame' : function() {
       
       var config = YWebClipperConfiguration;
       this.view.innerHTML = '<iframe width="100%" height="100%" border="0" frameborder="0" src="javascript:document.write(\'\');" style="width:100%;height:100%;border:0px"  id="'
    	   					+ config.clipperDomPrefix + 'ContentFrame'
       					    + '" name="'+config.clipperDomPrefix + 'ContentFrame' 
       					    + '" onload="_ynote_app_instance.frameHandler(event);" style="border:0px" scrolling ="no"></iframe>';
    },
    'deleteFrame' : function() {
        this.view.innerHTML = '';
    },
    'scroll2Top' : function() {
    	var result = 0;
    	
    	try {
    		var win = window;    	
    		var pageOffset = win.pageYOffset ? win.pageYOffset : 0;    	
    		var docele =  win.document.documentElement ? win.document.documentElement.scrollTop: 0;
    		var bd = win.document.body ? win.document.body.scrollTop : 0;   
    		result = this.filterResults(pageOffset,docele,bd);
    	} catch(e) {
    	   result = 0;
        }
    	
    	return result;
    },
    'filterResults' : function(n_win, n_docel, n_body) {
    	var n_result = n_win ? n_win : 0;
    	if (n_docel && (!n_result || (n_result > n_docel)))
    	   n_result = n_docel;
    	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
    },
    /*this function only call in object create*/
    'init':function() {
      // set style util
      YNote.Common.log("Init Clipper Class");           
      
      this.styleUtil = new YNote.StyleUtil();
      this.path = this.getClipID();
      this.requestCount = 0;
      /*
       state: 0--class init; 1--clipping content; 2--clipped content; 3--uploading ; 4-- uploaded file ; 5--uploading info ; 6--uploaded info; 7--begin login;8--done;
      */
      this.state = YNote.Clipper.CLASS_INIT;
      // set config
      var config = YWebClipperConfiguration;
      
      // before insert ,delete the old ones
      var divname = "ydNoteWebClipper";
      var c = doc.getElementById(divname);
      if(c != null && c.parentNode != null){
    	  
    	  c.parentNode.removeChild(c);
      }
      
      var wrapper = YNote.Common.mkel('div');     
      wrapper.id = divname;
      wrapper.name = divname;
      // wrapper's default styles and attributes      
      if (YNote.Common.browser.isIE) {
        wrapper.style.cssText = config.clipperStyleIE;
        wrapper.style.top = "" + this.scroll2Top() + "px";
      }
      else {
        wrapper.style.cssText = config.clipperStyle;
        wrapper.style.top =  "0px";
      }      
      wrapper.style.zIndex = 100000;
      wrapper.style.margin = "10px";
      wrapper.style.right =  "0px";       
      this.wrapper = wrapper;            
 
      var dialogDiv = YNote.Common.mkel('div',wrapper);
      dialogDiv.style.cssText = "width:400px;padding:5px;background-color:rgba(92,184,229,.5)!important;background:#5cb8e5;border-radius:5px;box-shadow:0 0 2px #5cb8e5;	-khtml-border-radius:5px;-webkit-border-radius:5px;-webkit-box-shadow:0 0 2px #5cb8e5;-moz-border-radius:5px;-moz-box-shadow:0 0 2px #5cb8e5;";
      dialogDiv.id = "ydNoteWebClipper-New";
      dialogDiv.className = "ydnwc-dialog";    
     
      // iframe and wrapper div   
      var viewDiv = YNote.Common.mkel('div',dialogDiv);
      viewDiv.id = "ydNoteWebClipper_view";
      viewDiv.name = "ydNoteWebClipper_view";
      if (YNote.Common.browser.isIE) {
    	  viewDiv.style.cssText = "height:270px;width:398px;border:1px solid #5cb8e5;";
      } else {
    	  viewDiv.style.cssText = "height:258px;width:398px;border:1px solid #5cb8e5;";
      }     
     
      YNote.Common.extend(viewDiv.style,{
        'display':'none'
      });
      
      this.view = viewDiv;
      this.initFrame();
      
      // hidden form and wrapper div
      var formContainer = YNote.Common.mkel('div',wrapper);      
      var form = YNote.Common.mkel('form',formContainer);
      // default attributes and style;
      YNote.Common.extend(form,{
        'id':config.clipperDomPrefix+'ContentForm',
        'name':config.clipperDomPrefix+'ContentForm',
        'action':config.clipperBaseURL+config.clipperUploadApp,
        'target':config.clipperDomPrefix+'ContentFrame', 
        'enctype':"multipart/form-data",
        'encoding':"multipart/form-data",//for IE
        'method':'POST'
      });
      YNote.Common.extend(formContainer.style,{
        'display':'none'
      });
      // insert form children
      // get HTML text
      var formInnerHTML = "";
      var fields = config.clipperFormFields;
      for (var i=0;i<fields.length;i++) {
        if (fields[i][1] == "text") {
          formInnerHTML += '<input type="text" name="'+fields[i][2]+'" id="'+config.clipperDomPrefix+'ContentForm'+fields[i][0]+'" value=""/>';
        }
        if (fields[i][1] == "area") {
          formInnerHTML += '<textarea name="'+fields[i][2]+'" id="'+config.clipperDomPrefix+'ContentForm'+fields[i][0]+'"></textarea>';
        }
      }
     
      form.innerHTML = formInnerHTML;
      this.form = form;
      // loading div
      div = YNote.Common.mkel('div',dialogDiv);
      if (YNote.Common.browser.isIE) {
    	  div.style.cssText = "height:270px;398px;background:#fff;border:1px solid #5cb8e5;";    	  
      } else {
    	  div.style.cssText = "height:258px;398px;background:#fff;border:1px solid #5cb8e5;";    	 
      }      
     
      div.innerHTML = config.loadingHTML;     
      div.style.display = "none";
      div.name = "ydNoteWebClipper_loadview";
      div.id = "ydNoteWebClipper_loadview";
      this.loadingView = div;
      window.document.body.appendChild(wrapper);
   },
    //set selection,range,content and other attributes to default value
    'reset': function() {
      YNote.Common.log("Call Reset!");
      this.selection = null;
      this.range = null;
      this.title = null;
      this.content = null;
      this.state = 0;
      this.requestCount = 0;
      this.path = this.getClipID();
      this.wrapper.style.display="";
      if (this.view.innerHTML.length > 10) {
        this.deleteFrame();
      }
      this.initFrame();
    },
    'fillForm' : function() {
      YNote.Common.log("Enter fillForm");
     
      var doc = document;
      var config = YWebClipperConfiguration;
      this.title = doc.title;
      this.content = this.content.replace(/[\r\n]/g,'');
     
      doc.getElementById(config.clipperDomPrefix+'ContentForm'+'path').value = this.path;    
      doc.getElementById(config.clipperDomPrefix+'ContentForm'+'content').value = YNote.Common.HTMLEncode(this.content); //just encode content       
      doc.getElementById(config.clipperDomPrefix+'ContentForm'+'source').value = YNote.Common.HTMLEncode(this.source);
      doc.getElementById(config.clipperDomPrefix+'ContentForm'+'title').value = YNote.Common.HTMLEncode(this.title);      
      doc.getElementById(config.clipperDomPrefix+'ContentForm'+'len').value = this.content.length;//YNote.Common.BytesLength
    }
  });
  
  /*
   * @class YNote.Selection
   */
  YNote.Selection = function() {};
  YNote.Common.extend(YNote.Selection.prototype,{
    // get selection from top window
    'getSelection' : function() {
      
      var win = window;
      var doc = win.document;
      if (YNote.Common.browser.isIE) {
        this.selection = document.selection;
      }
      else {
        this.selection = win.getSelection();
      }
      
      if (!this.hasSelection()) {
        this.getNestedRange(win);        
      }
      else {
        this.selectionParentWindow = win;
      }
      return this.selection;
    },
    'hasSelection' : function() {
      YNote.Common.log("Enter hasSelection");
      if (typeof this.selection.createRange == "function") {
        if (this.selection.createRange().htmlText=='') {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        if (this.selection.rangeCount == 0) {
          return false;
        }
        else {
          return true;
        }
      }
    },
    // get selection in iframe and frame
    'getNestedRange':function(win) {
    	YNote.Common.log("Enter getNestedRange");
        var doc = document;
        var frames = null;
        if (!doc) {
          frames = win.frames;
        }
        else {
          frames = document.getElementsByTagName('iframe');
        }
        if (!frames || frames == null || frames.length == 0) {
          return false;
        }
       
        for(var i=0;i < frames.length;i++) {
          var w = frames[i].contentWindow;
          
          try {
              w.document;
              if (frames[i].clientWidth <= 10|| frames[i].clientHeight <= 10) {
                continue;
              }
          }
          catch(e) {
            continue;
          }
          try {
	          var sel = (typeof w.getSelection == "function") ? w.getSelection():w.document.selection;
	          
	          if (typeof sel.createRange == "function"|| typeof sel.getRangeAt == "function") {
	            this.selection = sel;
	            this.selectionparentWindow = w;
	            return true;
	          }
	          else {        	
	            if (this.getNestedRange(w)) {
	              return true;
	            }//if
	          }//else
          } catch (e) {
        	  continue; // 
          }
        }//for
        
        YNote.Common.log("getNestedRange over");
    },
    'getSelectionRange': function() {
      YNote.Common.log("Enter get getSelectionRange");
      this.getSelection();
      if (!this.selection) {
        return false;
      }
      if (YNote.Common.browser.isIE) {
        this.range = this.selection.createRange();
      }
      else {
        //YNote.Common.log(this.range);
        this.range = this.selection.getRangeAt(0);
      }
      if (YNote.Common.browser.isIE) {
        if (this.range) {
            this.range.commonAncestorContainer = this.range.parentElement();
            //get start container
            YNote.Common.log("Enter get range block");
            var _range = this.range.duplicate();
            _range.collapse(true);
            var rangeInfo = this.getContainerForIE(_range);
            this.range.startContainer = rangeInfo['el'];
            this.range.startOffset  = rangeInfo['offset'];
            var _range2 = this.range.duplicate();
            _range2.collapse(false);
            rangeInfo = this.getContainerForIE(_range2);
            this.range.endContainer = rangeInfo['el'];
            this.range.endOffset = rangeInfo['offset'];
        }//if this.range
      }//
      return this.range;
    },
    'getAncestor' : function(nodeA,nodeB) {
        
    },
    'getContainerForIE' : function(textRange) {
        var element = textRange.parentElement();
        var range = element.ownerDocument.body.createTextRange();
        range.moveToElementText(element);
        range.setEndPoint("EndToStart", textRange);
        var rangeLength = range.text.length;

        // Choose Direction
        if(rangeLength < element.innerText.length / 2) {
            var direction = 1;
            var node = element.firstChild;
        }
        else {
            direction = -1;
            node = element.lastChild;
            range.moveToElementText(element);
            range.setEndPoint("StartToStart", textRange);
            rangeLength = range.text.length;
        }

        // Loop through child nodes
        while(node) {
            switch(node.nodeType) {
                case 3:
                    nodeLength = node.data.length;
                    if(nodeLength < rangeLength) {
                        var difference = rangeLength - nodeLength;
                        if(direction == 1) range.moveStart("character", difference);
                        else range.moveEnd("character", -difference);
                        rangeLength = difference;
                    }
                    else {
                        if(direction == 1) return {node: node, offset: rangeLength};
                        else return {'el': node, 'offset': nodeLength - rangeLength};
                    }
                    break;

                case 1:
                    nodeLength = node.innerText.length;
                    if(direction == 1) range.moveStart("character", nodeLength);
                    else range.moveEnd("character", -nodeLength);
                    rangeLength = rangeLength - nodeLength;
                    break;
            }
            if(direction == 1) node = node.nextSibling;
            else node = node.previousSibling;
        }
        return {'el': element, 'offset': 0};
    },
    'getSelectionHTMLText' : function() {
      this.getSelectionRange();
      if (!this.range) {
        return false;
      }
      else {
        if (YNote.Common.browser.isIE) {
          return this.range.htmlText;
        }
        else {
          // get the content in clipper Class
          return "";
        }
      }
    }
  });
  
  /*
   * @class YNote.ClipperManager
   */   
  YNote.ClipperManager = function() {
    this.init();
  };
  YNote.Common.extend(YNote.ClipperManager.prototype,{
    'run':function() {
      YNote.Common.log("start run..");
      if (!this.checkEnv()) {
        YNote.Common.log("check Env false");
        return false;
      }
      // run app
      YNote.Common.log("manager run");
      this.clipper.reset();
      this.clipper.wrapper.display="";
     
      this.clipper.clipContent();
      
      if (this.clipper.state != YNote.Clipper.CLIPPED) {
        return;
      }
      YNote.Common.log("manager clip end");
      this.clipper.submit();
    },
    'submit':function() {         
      if (this.clipper.state == YNote.Clipper.CLIPPED) {
    	YNote.Common.log('Do clipper.submit'); 
        this.clipper.submit();
      }
      else {
        YNote.Common.log('ERROR! clipper state error');
      }
      
    },
    'init':function() {
      this.clipper = new YNote.Clipper();
    },
    /*check if the webpage is a valid page*/
    'checkEnv':function() {
    var doc = window.document;
        if (!doc) {
          return false;
        }
        if (!doc.body) {
          return false;
        }
       YNote.Common.log(this.clipper.state);
        if (this.clipper.state > 0 && this.clipper.state < 100) {
            if (this.clipper.state != YNote.Clipper.DONE) {
              return false;
            }
        }
        return true;
    }
  });
  /*Entry Class*/
  YNote.App = function() {
  
  };
  YNote.App.prototype = {
    'run':function() {
        YNote.Common.log("YNote Run...");
        if (typeof this.clipperManager == "undefined") {
          try {
        	  this.clipperManager = new YNote.ClipperManager();
          } catch(e){
        	  YNote.Common.log("Exception:" + e);
          }
        }
        this.clipperManager.run();
    },
    'frameHandler' : function(event) {
      YNote.Common.log("Enter framehandler ");
      
      var ev = YNote.Common.wrapperEvent(event);
      //enter framehandler before manager inited
      if (!this.clipperManager || (typeof this.clipperManager == "undefined") ) {
    	  return
      }
      
      var clipper = this.clipperManager.clipper;
      var frame = ev.target;
      var config = YWebClipperConfiguration;
      clipper.requestCount++;
      if (clipper.requestCount >= YNote.Clipper.CEIL_OF_REQUEST.COUNT) {
        YNote.Common.log(YNote.Clipper.CEIL_OF_REQUEST.COUNT);
        clipper.close();
        return;
      }
      YNote.Common.log("CALL FRAMEHANDLER :The State is " + clipper.state);     
       
      switch(this.clipperManager.clipper.state) {
        // upload content
        case YNote.Clipper.UPLOADING_FILE :
        //directly to done state  
        	clipper.view.style.display = "";
			clipper.loadingView.style.display = "none";
			clipper.state = YNote.Clipper.DONE;

			break;            
      }// switch
   }//
  
  };
  // Load Library
  if (true) {
    YNote.Common.log("------------------");
    var hLoop = null;
    var loopFunc = function() {
      YNote.Common.log("enter loopFunc:");
      if ((document.readyState == "complete" || document.readyState == 'loaded' || document.readyState == 'interactive') && document.body) {
        //YNote.Common.log(document.readyState);
        window._ynote_app_load = true;
        window._ynote_app_instance = new YNote.App();
        _ynote_app_instance.run();
        clearTimeout(hLoop);
      }
      else {
        hLoop = setTimeout(loopFunc,300);
      }
    };
    hLoop = setTimeout(loopFunc,300);
  }  
  //YNote = OldYNote;
})();