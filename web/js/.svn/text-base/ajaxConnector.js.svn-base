 Mask = new function(){
  this.maskDiv = null;
  this.loadingDiv = null;
  

  this.createMask = function(){
    var maskStr = '<div id="loading" style="position:absolute;left:30%;top:30%;z-index:1001;display:none"><img src="img/loading.gif"></div><div id="mask" style="background:white;position:absolute;left:0;top:0;z-index:1000;display:none;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=10);"></div>';
    //document.body.insertAdjacentHTML("BeforeEnd", maskStr);
    this.maskDiv = document.getElementById("mask");
    this.loadingDiv = document.getElementById("loading");
  }
  
  this.show = function(){
  	/*
    try{
      if(this.maskDiv == null)
        this.createMask();  
      this.maskDiv.style.display = '';
      this.loadingDiv.style.display = '';
      this.maskDiv.style.width = document.body.scrollWidth;
      this.maskDiv.style.height = document.body.scrollHeight;
    }catch(error){};
    */
  }
  
  this.hide = function(){
  	/*
    try{
      if(this.maskDiv == null)
        this.createMask();
      this.maskDiv.style.display = 'none';
      this.loadingDiv.style.display = 'none';
    }catch(error){};
    */
  }
}


function createXmlhttp(){
  var xmlhttp=null;
  if(window.XMLHttpRequest){
	  xmlhttp = new XMLHttpRequest();
	  if (xmlhttp.overrideMimeType){
	    xmlhttp.overrideMimeType("text/xml");
	  }
  }
  else if(window.ActiveXObject){
	  try{
	    xmlhttp = new  ActiveXObject("Msxml2.XMLHTTP");
	  }catch(e){
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }
  }
  if(!xmlhttp){
    window.alert("Your browser not support XMLHttpRequest!");
  }
  return xmlhttp;
}

//start------------------------????????*/
/*
surl : ???url
params : ????????
callback : ??????????
failCallback : ??????????
noMask : ?????Mask?????true?????false?????????mask
sync : ???????????true?????????false???????????
*/
function postData(surl,params,callback,failCallback,noMask,sync){
  //window.alert(surl+"\n"+callback);
  if(!sync)async=true;else async=false;
  if(!noMask)Mask.show();
	var xmlhttp;
	xmlhttp = createXmlhttp();
	xmlhttp.open("POST", surl, async); 
	//如果是异步
	if(async){
    xmlhttp.onreadystatechange= function(){
      if (xmlhttp.readyState == 4){
        if(xmlhttp.status == 200 || xmlhttp.status == 304){
          callback(xmlhttp);
        }
        else{
          if(failCallback){
            try{failCallback(xmlhttp,params)}catch(error){};
          }
          else{
            //window.alert("Error loading page\n"+ xmlhttp.status +":"+ xmlhttp.statusText);
          }
        }
        if(!noMask)Mask.hide();
      }
    };
  }
  xmlhttp.setRequestHeader("Content-Length",params?params.length:0); 
  xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send(encodeURI(params));
	if(sync){
    if (xmlhttp.readyState == 4){
      if(xmlhttp.status == 200 || xmlhttp.status == 304){
        callback(xmlhttp);
      }
      else{
        if(failCallback){
          try{failCallback(xmlhttp)}catch(error){};
        }
        else{
          window.alert("Error loading page\n"+ xmlhttp.status +":"+ xmlhttp.statusText);
        }
      }
      if(!noMask){Mask.hide();}
    }
	}
}


function getData(surl,params,callback,failCallback,noMask,sync){
  //window.alert(surl);
  if(!sync)async=true;else async=false;
  if(!noMask)Mask.show();
	var xmlhttp;
	xmlhttp = createXmlhttp();
	xmlhttp.open("GET", surl, async); 
  xmlhttp.setRequestHeader("If-Modified-Since","Last-Modified");
	if(async){
    xmlhttp.onreadystatechange= function(){
      if (xmlhttp.readyState == 4){
        if(xmlhttp.status == 200 || xmlhttp.status == 304){
          callback(xmlhttp);
        }
        else{
          if(failCallback){
            try{failCallback(xmlhttp,params)}catch(error){};
          }
          else{
            //window.alert("Error loading page\n"+ xmlhttp.status +":"+ xmlhttp.statusText);
          }
        }
        if(!noMask)Mask.hide();
      }
    };
  }
	xmlhttp.send(null);
	//???????
	if(sync){
    if (xmlhttp.readyState == 4){
      if(xmlhttp.status == 200 || xmlhttp.status == 304){
        callback(xmlhttp);
      }
      else{
        if(failCallback){
          try{failCallback(xmlhttp)}catch(error){};
        }
        else{
          window.alert("Error loading page\n"+ xmlhttp.status +":"+ xmlhttp.statusText);
        }
      }
      if(!noMask){Mask.hide();}
    }
	}
}

//同步获取url内容
function getUrlContent(surl){
  //window.alert("get:"+surl);
	var xmlhttp = createXmlhttp();
	var rsContent = null;
	xmlhttp.open("GET", surl, false); 
	xmlhttp.setRequestHeader("If-Modified-Since","Last-Modified");
	xmlhttp.send(null);
  if(xmlhttp.readyState == 4){
    if(xmlhttp.status == 200 || xmlhttp.status == 304){
      rsContent = xmlhttp.responseText;


/*
      var lastModified = xmlhttp.getResponseHeader("Last-Modified");
      xmlhttp.abort();
      xmlhttp = null;      
      
      var xmlhttp2 = createXmlhttp();
      xmlhttp2.open("GET", surl, false); 
      xmlhttp2.setRequestHeader("If-Modified-Since",lastModified);
      xmlhttp2.send(null);
      if(xmlhttp2.readyState == 4){
        if(xmlhttp2.status == 200){
          window.alert("need reget: "+ surl+"\nold:"+lastModified+"\nnew:"+xmlhttp2.getResponseHeader("Last-Modified"));
          rsContent = xmlhttp2.responseText;
        }
      }

*/      
      return rsContent;
      //callback(xmlhttp);
    }
    else{
      return null;
    }
  }
}
//end-------------------*/
