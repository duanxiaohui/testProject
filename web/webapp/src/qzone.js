define(function(require,exports, module) {
	var $calendarHallView    = require("./view/qzone/hallViewController");
	var $calendarCollectView = require("./view/qzone/collectViewController");
	var $fusion = require("./server/fusion");
	
	//test qzone api
	$("#reminder_btn").click(function(){
		fusion2.dialog.remind
		({
		  title : "该收菜了",
		  begin : Math.round(new Date().getTime() / 1000) + 120,
		  key : 200,
		  type : 200,
		  showtime : true,
		  context : "remind",
		  onSuccess : function (opt) { alert("发送成功: " + fusion.JSON.stringify(opt)); },
		  onCancel : function (opt) { alert("用户取消: " + fusion.JSON.stringify(opt)); },
		  onClose : function (opt) { alert("浮层关闭: " + fusion.JSON.stringify(opt)); },
		  onError : function (opt) { alert("发生错误: " + fusion.JSON.stringify(opt)); }
		});
	});
	$("#addfriend_btn").click(function(){
		fusion2.dialog.addPal (
				{
				    openid : "313C55BA18C30A441082B617D89803C9", 

				    context : "addPal_12345", 

				    onSuccess : function (opt) 
				    { alert(fusion.JSON.stringify(opt)); },

				    onCancel : function (opt) 
				    { alert("Cancelled: " + opt.context); }, 

				    onClose : function (opt) 
				    { alert("Closed") }
				})
	});
	$("#sendstory_btn").click(function(){
		fusion2.dialog.sendStory
		({
		  title :"我的星佳城市升级了！",

		  img:"http://app24341.qzoneapp.com/app24341/feed_clown.png",

		  summary :"2011年全球游戏巨制《星佳城市》—自由发展农工商，铺路盖楼有理想，全球玩家都在玩，快来星佳做市长！",

		  msg:"我的星佳城市已经升到80级了，快来一起当市长吧！",

		  button :"获取能量",

		  source :"ref=story&act=default",

		  context:"send-story-12345",

		  onShown : function (opt) 
		  {  
		      alert("Shown");  
		  },

		  onSuccess : function (opt) 
		  {  
		      // opt.context：可选。opt.context为调用该接口时的context透传参数，以识别请求
		      alert("Succeeded: " + opt.context);  
		  },

		  onCancel : function (opt) 
		  {  
		      // opt.context：可选。opt.context为调用该接口时的context透传参数，以识别请求
		      alert("Cancelled: " + opt.context);  
		  },

		  onClose : function (opt) 
		  {  
		      alert("Closed"); 
		  }
		});
	});
	$("#set_height_btn").click(function(){
		var height = $("#height_input").val();
		fusion2.canvas.setHeight
		({
		  height : parseInt(height)
		});
	});
	
	$calendarHallView.init($(".calendar_hall"));
	$calendarCollectView.init($(".calendar_collect"));
	if(location.href.indexOf("#collectView") > -1){
		showCollectView();
	}else{
		showHallView();
	}
	
	
	$(".nav-list li").click(function(){
		if($(this).hasClass("on")){
			return;
		}
		$(".nav-list li").removeClass("on");
		$(this).addClass("on");
		if($(this).hasClass("nav_list_hall")){
			$calendarHallView.container.show();
			$calendarCollectView.container.hide();
			location.href = "#hallView";
		}else{
			$calendarHallView.container.hide();
			$calendarCollectView.container.show();
			location.href = "#collectView";
		}		
	});
	
	$(".calendar_more_btn").click(function(){
		showHallView();
		location.href = "#hallView";
	});
	$(".mycalendar_collect").click(function(){
		showCollectView();
		location.href = "#collectView";
	});
	//hash change event 
	//for fake page redirect
	window.addEventListener("hashchange", function(e){
		if(e.newURL.indexOf("#") == -1 || e.newURL.indexOf("#hallView") > -1){
			showHallView();
		}else if(e.newURL.indexOf("#collectView") > -1){
			showCollectView();
		}		
	}, false);
	
	function showHallView(){
		$calendarHallView.container.show();
		$calendarCollectView.container.hide();
		$(".calendar_hall_scrollpane").show();	
		$(".calendar_collect_scrollpane").hide();
		$(".mycalendar_collect").removeClass("on");
		$(".calendar_more_btn").addClass("on");
		$calendarHallView.show("list");
		$(".header").slideUp(500)
		$fusion.resize();
	}
	function showCollectView(){
		$calendarHallView.container.hide();
		$calendarCollectView.container.show();
		$(".calendar_hall_scrollpane").hide();
		$(".calendar_collect_scrollpane").show();			

		$(".mycalendar_collect").addClass("on");
		$(".calendar_more_btn").removeClass("on");
		$calendarCollectView.refresh();
		$(".header").slideDown(500)
		$fusion.resize();
	}
});