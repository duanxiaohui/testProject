//@author 	huangyi
//@require 	jquery
//@desp protocol between web page and pc client
//	id|webpage map
//	1	main window
//	2	widget window
//	3	almanac.html
//	4	news.html
//  5	list widget window
//	6	creator_schedule
//  7   schedule_detailed
//  8   creator_todo
var clientProtocol = {
	createWnd:function(id, url, width, height){
		var host = "http://pc.365rili.com";
		if(typeof js365 != "undefined")
			js365.createWnd(id, host + url , width, height);
		else
			window.open(url);
	},
	runScript:function(id, script){
		if(typeof js365 != "undefined")
			js365.runScriptWnd(id, script);
	},
	init:function(id, width, height){
		$(".close_btn").click(function(){
			if(typeof js365 != "undefined")
				js365.closeWnd(id);
			else
				alert("close");
		});
		$(".min_btn").click(function(){
			if(typeof js365 != "undefined")
				js365.hideWnd(id);
			else
				alert("hide");
		});
		//拖动
		var oriX, oriY;
		var sw = screen.availWidth, sh = screen.availHeight;
		if(typeof js365 != "undefined"){
			oriX = parseInt(js365.getposWndX(id));
			oriY = parseInt(js365.getposWndY(id));
		}
		var draging = false, startX, startY;
		$(document).mousedown(function(evt){
			var name = evt.target.nodeName;
			if (evt.button == 0 && name != 'A' && name != "TEXTAREA") {
				draging = true;
				startX = evt.pageX;
				startY = evt.pageY;
				if(typeof js365 != "undefined"){
					js365.setCaptureWnd(id);
					oriX = parseInt(js365.getposWndX(id));
					oriY = parseInt(js365.getposWndY(id));
				}
			}
		}).mousemove(function(evt){
			if (draging == true) {
				var deltaX = evt.pageX - startX, deltaY = evt.pageY - startY;
				oriX = Math.min(oriX + deltaX, sw - width);
				oriY = Math.min(oriY + deltaY, sh - height);
				if(typeof js365 != "undefined")
					js365.moveWnd(id, oriX, oriY);
			}
		}).mouseup(function(evt){
			if (draging) {
				draging = false;
				if(typeof js365 != "undefined")
					js365.releaseCapture();
			}
		});
	},
	moveWnd:function(id, oriX, oriY){
		if(typeof js365 != "undefined")
			js365.moveWnd(id, oriX, oriY);		
	},
	setStyle:function(id, style){
		if(typeof js365 != "undefined")
			js365.setWndStyle(id, style);	
	},
	getStyle:function(id){
		if(typeof js365 != "undefined")
			return js365.getWndStyle(id);	
	},
	resizeWnd:function(id, width, height){
		if(typeof js365 != "undefined")
			js365.resizeWnd(id, width, height);		
	},
	closeWnd:function(id){
		if(typeof js365 != "undefined")
			js365.closeWnd(id);

	}
	
}

function disableSelectAndRightClick(){
	document.oncontextmenu = function(e){
		if(e.target.nodeName != "TEXTAREA" && e.target.nodeName != "INPUT")
			window.event.returnValue = false;
	};
	document.ondragstart = function(){ window.event.returnValue = false;};
	document.onselectstart = function(){ window.event.returnValue = false;};
}