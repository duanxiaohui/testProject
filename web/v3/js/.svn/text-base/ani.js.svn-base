$(document).ready(function(){
	//初始化自动播放
	var mainnavplay = new autoNav();
	mainnavplay.init( { obj:$("#MainNav"), btn:$(".ctrlbtn") } );
});

var autoNav = function() {
    this.obj = null;
    this.timespan = 5000;	// 设置自动播放的间隔，毫秒
    this.btn = { };
    this.timer = null;
    this.current = 0;
    this.count = 0;
    this.direction = "y";
    this.singlewidth = 0;
    this.singleheight = 0;
};
autoNav.prototype.init = function(h){
	var $this = this;
	h = h || {};
	if (typeof(h.obj) != "undefined") this.obj = $(h.obj); else return;
	if (typeof(h.timespan) != "undefined") this.timespan = h.timespan;
	if (typeof(h.btn) != "undefined") this.btn = h.btn;
	if (typeof(h.direction) != "undefined") this.direction = h.direction;
	this.count = this.obj.children().length;
	this.singlewidth = this.obj.children().eq(0).width();
	this.singleheight = this.obj.children().eq(0).height();
	this.btn.eq(this.current).addClass("on");
	this.obj.css({'position':'absolute'}).parent().css({'position':'relative'});
	//$(this.obj).hover(function(){$this.stop()},function(){$this.start()});
	//$(this.btn).hover(function(){$this.stop()},function(){$this.start()});
	$(".mainBox").hover(function(){$this.stop()},function(){$this.start()});
	$.each($(this.btn), function(i,o){
		$(o).click(function(){
			$this.goto(i);
			$.each($($this.btn), function(i,o){
				$(o).first().html("<img src='http://up2.365rili.com/v3/images/index/btn"+(i+1)+".jpg'>");
			});
			$(this).first().html("<img src='http://up2.365rili.com/v3/images/index/btnC"+(i+1)+".jpg'>");
		});
	});
    this.start();
}
autoNav.prototype.play = function(){
	$this = this;
    this.current+=1;
    if(this.current==this.count) this.current=0;
    $.each($(this.btn), function(i,o){
    	$(o).first().html("<img src='http://up2.365rili.com/v3/images/index/btn"+(i+1)+".jpg'>");
    });
    $this.animate();
    this.btn.eq(this.current).first().html("<img src='http://up2.365rili.com/v3/images/index/btnC"+(this.current+1)+".jpg'>");
};

autoNav.prototype.animate = function(){
    //switch(getRandom(6))
	switch(7)
    {
    	case 1:
			this.obj.css({display:'none'});
	    	this.obj.css({top:-this.singleheight*this.current+'px'});
		   	this.obj.fadeIn("slow");
		   	break;
		case 2:
		   	this.obj.fadeOut("slow");
	    	this.obj.css({top:-this.singleheight*this.current+'px'});
		   	this.obj.slideDown("slow");
		   	break;
		case 3:   	
			this.obj.css({display:'none'});
	    	this.obj.css({top:-this.singleheight*this.current+'px'});
		   	this.obj.fadeIn("slow");
		   	break;
		case 4:
	    	this.obj.css({top:-this.singleheight*this.current+'px'});
	    	this.obj.fadeOut("fast");
		   	this.obj.fadeIn("slow");
		   	break;
	   	case 5:
			this.obj.animate({top:-this.singleheight*this.current+'px'});
			break;
	   	case 6:
//	   		this.obj.fadeOut("fast");
			this.obj.hide();
			this.obj.css({top:-this.singleheight*this.current+'px'});
	   		this.obj.children().eq(this.current).css({width:'9px', height:'9px'});
			this.obj.show();
	   		this.obj.children().eq(this.current).animate({width:this.singlewidth, height:this.singleheight});
			break;
	   	case 7:	// 由左向右推
			this.obj.hide();
			this.obj.css({top:-this.singleheight*this.current+'px'});
	   		this.obj.children().eq(this.current).css({width:'2px'});
			this.obj.show();
	   		this.obj.children().eq(this.current).animate({width:this.singlewidth});
			break;
    }
	this.btn.eq(this.current).addClass("on").siblings().removeClass("on");
};

autoNav.prototype.start = function(){
    $this = this;
    this.timer = setInterval(function(){$this.play()},$this.timespan);
};
autoNav.prototype.stop = function(){
    clearInterval(this.timer);
};
autoNav.prototype.stopat = function(i){
    clearInterval(this.timer);
    this.goto(i);
};
autoNav.prototype.goto = function(i){
	$this = this;
    if(i>this.count) return;
    this.current=i;
    $this.animate();
};

// 随机数生成器
function getRandom(n){return Math.floor(Math.random()*n+1)}