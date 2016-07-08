var tagList = new Array();			//tag列表
var contents = new Array();			//内
var categorie = new Array();		//分类
var topCategories = new Array();	//最顶层分类
var userCategories = new Array();	//用户的分类
var contentdata;					//内容
var inBlock = false;				//光标在block中
var inAction = false;				//光标在Action(半透明栏)中
var pathDeep = new Array(0);		//
var gridcontainerstate = "content";	//grid中的显示内容状态
var catepath = new Array();		//记录订阅内容路径
var catelistHeight = 0;				//记录最顶层的分类栏的高度，用于动画
var currentPopIndex = 0;			//正在弹出的detail在contents中的index
var isPoped = false;
var currentSubedCate = 0;			//当前选择的已经订阅的分类的编号，用于键盘控制Shift+J/K
var currentCity = 2;
var myDate = new Date();
var endDate = new Date();
var rightContentMargin = 0;
var lastClickElement = null;		//上一次点击的元素，此元素应可以显示内容
var allCategories;

setTimeZero(myDate);
$(function(){
    $(window).resize(function(){
		var page_content_w=document.documentElement.clientWidth - 100;
		$("#page_content").width(page_content_w-20);
		$("#gualiHeader").width(page_content_w-43);
		$("#page").width(page_content_w-255);
		if ( gridcontainerstate == "content" )
		{
			$("#cate-list").css({"height":"190px"});
			$('#gridcontainer').css({"height":$(window).height()-62+"px"});
			$('#close-pop').bind("click", function(){closeDetail();});
			$('#riliPage').css({"height":$('#page').height()+58+"px"});
			makeRecommandContentBlock();
			setDetailPosition();
		}
		//获得可以放的列数
		var container = $("#gridcontainer").width()-20;
		var listMount = Math.floor((container)/226);
		rightContentMargin = (container - 226*listMount)/2;
		$("#page_content").width(page_content_w-20-2*rightContentMargin-10);
		$("#gualiHeader").width(page_content_w-43-2*rightContentMargin-10);
		$("#page").width(page_content_w-255-2*rightContentMargin-10);
		$("#content-title").css({"marginLeft":12});
		$("#content-title").css({"marginRight":12});
		$("#gridcontainer-cate").css({"marginLeft":12});
		$("#gridcontainer-cate").css({"marginRight":12});
		/*$("#sub-content-list").css({"marginLeft":rightContentMargin});
		$("#sub-content-list").css({"marginRight":rightContentMargin});*/
	});
	var page_content_w=document.documentElement.clientWidth - 100;
	$("#page_content").width(page_content_w-20);
	$("#gualiHeader").width(page_content_w-43);
	$("#page").width(page_content_w-255);
//	getAllCategories();
	getTopCategories();
	getRecommandContents(1);
	setDetailPosition();
	getUserCate(1);
	$("#cate-list").css({"height":"190px"});
	$('#gridcontainer').css({"height":$(window).height()-52+"px"});
	$('#pop-detail-bar-close').bind("click", function(){closeDetail();});
	$('#riliPage').css({"height":$('#page').height()+58+"px"});
	//获得可以放的列数
	var container = $("#gridcontainer").width()-20;
	var listMount = Math.floor((container)/226);
	rightContentMargin = (container - 226*listMount)/2;
	$("#page_content").width(page_content_w-20-2*rightContentMargin-10);
	$("#gualiHeader").width(page_content_w-43-2*rightContentMargin-10);
	$("#page").width(page_content_w-255-2*rightContentMargin-10);
	$("#content-title").css({"marginLeft":12});
	$("#content-title").css({"marginRight":12});
	
	$("#gridcontainer-cate").css({"marginLeft":12});
	$("#gridcontainer-cate").css({"marginRight":12});
	/*$("#sub-content-list").css({"marginLeft":rightContentMargin});
	$("#sub-content-list").css({"marginRight":rightContentMargin});*/
	$('#timeSelectSelect').bind('click', function(){
		c.showMoreDay = true;
		tdate = new Date();
		c.show(getObjById('timeSeletcerInput'), tdate.getFullYear()+'-'+(tdate.getMonth()+1)+'-'+tdate.getDate(),this);
	});
	getAllCity();
	$('#timeSelectStr').text(getSelectTimeStr(myDate));
	var args=new Object();
	args['pop'] = 'false';
	args['subid'] = '-1';
    var query=location.search.substring(1);//获取查询串   
    var pairs=query.split("&");//在逗号处断开
    for( var i=0; i<pairs.length; i++)   
    {   
        var pos=pairs[i].indexOf('=');//查找name=value   
        if(pos==-1)
			continue;//如果没有找到就跳过   
        var argname = pairs[i].substring(0,pos);//提取name   
        var value=pairs[i].substring(pos+1);//提取value   
        args[argname] = unescape(value);//存为属性   
    }
   // alert(args['pop']+" "+args['subid']);
    if ( args['pop'] == 'true' && Number(args['subid']) > 0 )
	{
		//alert("subblock"+args['subid']);
		popDetail("subblock"+args['subid']);
	}
	$.hotkeys.add('esc', function(){
		closeDetail();
	});
	$.hotkeys.add('shift+j', function(){
		if ( currentSubedCate > 0 )
		{
			currentSubedCate--;
		}
		$('#subtag-cloud>:nth-child('+currentSubedCate+')').click();
	});
	$.hotkeys.add('shift+k', function(){
		if ( currentSubedCate < $('#subtag-cloud').children().length )
		{
			currentSubedCate++;
		}
		$('#subtag-cloud>:nth-child('+currentSubedCate+')').click();
	});
	$.hotkeys.add('left', function(){
		if ( isPoped )
		{
			popPrev();
		}
	});
	$.hotkeys.add('j', function(){
		if ( isPoped )
		{
			popPrev();
		}
	});
	$.hotkeys.add('right', function(){
		if ( isPoped )
		{
			popNext();
		}
	});
	$.hotkeys.add('k', function(){
		if ( isPoped )
		{
			popNext();
		}
	});
	$.hotkeys.add('o', function(){
		popDetail("subblock"+contents[currentPopIndex].id);
	});
	$.hotkeys.add('return', function(){
		if ( $('#cate-title-button').hasClass("unexpend") 
		|| $('#cate-title-button').hasClass("expend") )
		{
			expandcate();
			event.keyCode = 0;
			return false;
		}
	});
	$.hotkeys.add('+', function(){
		if ( $('#add-subscribe').hasClass('addsubscrib-button') )
		{
			$('#add-subscribe').click();
		}
		else if ( $('#add-subscribe').hasClass('subscribed-button') )
		{
			$('#add-subscribe').click();
		}
	});
	$.hotkeys.add('=', function(){
		if ( $('#add-subscribe').hasClass('addsubscrib-button') )
		{
			$('#add-subscribe').click();
		}
		else if ( $('#add-subscribe').hasClass('subscribed-button') )
		{
			$('#add-subscribe').click();
		}
	});
	$('body').bind('keydown', function(event){
		if ( event.keyCode == 187 )
		{
			if ( $('#add-subscribe').hasClass('addsubscrib-button') )
			{
				$('#add-subscribe').click();
			}
			else if ( $('#add-subscribe').hasClass('subscribed-button') )
			{
				$('#add-subscribe').click();
			}
		}
	});
	$.hotkeys.add('h', function(){
		if ( $('#pop-hint').hasClass('hintshow') )
		{
			$('#pop-hint').removeClass('hintshow');
			$('#pop-hint').addClass('hinthide');
		}
		else if ( $('#pop-hint').hasClass('hinthide') )
		{
			$('#pop-hint').removeClass('hinthide');
			$('#pop-hint').addClass('hintshow');
		}
	});
	$("#expand-button-cate").bind('click', function(){
		expandcate();
		return;
	});
	$("#expand-button-content").bind('click', function(){
		expandcate();
	});
	$('#pop-prev-button').bind('click', function(){
		popPrev();
	});
	$('#pop-next-button').bind('click', function(){
		popNext();
	});
	$('#prevDay').click('click', function(){
		realDate = new Date();
		setTimeZero(realDate);
		thedate = myDate.getDate();
		thedate--;
		contents = new Array();
		myDate.setDate(thedate);
		endDate = new Date(myDate);
		endDate.setDate(myDate.getDate()+1);
		$('#timeSelectStr').text(getSelectTimeStr(myDate));
		/*if ( $('#cate-title-button').hasClass("expend") )
		{
			expandcate();
		}*/
		//getRecommandContents(0);
		reDoLastClick();
		if (myDate.getTime() - realDate.getTime() == 0 ) 
		{
			$('#timeSelectToday').addClass('timeSelected');
			$('#timeSelectTomorrow').removeClass('timeSelected');
			$('#timeSelectWeekend').removeClass('timeSelected');
		}
		else if (myDate.getTime() - realDate.getTime() == 86400000 ) 
		{
			$('#timeSelectToday').removeClass('timeSelected');
			$('#timeSelectTomorrow').addClass('timeSelected');
			$('#timeSelectWeekend').removeClass('timeSelected');
		}
		else
		{
			$('#timeSelectToday').removeClass('timeSelected');
			$('#timeSelectTomorrow').removeClass('timeSelected');
			$('#timeSelectWeekend').removeClass('timeSelected');
		}
	});
	$('#nextDay').click('click', function(){
		realDate = new Date();
		setTimeZero(realDate);
		thedate = myDate.getDate();
		thedate++;
		myDate.setDate(thedate);
		setTimeZero(myDate);
		endDate = new Date(myDate);
		endDate.setDate(myDate.getDate()+1);
		setTimeZero(endDate);
		$('#timeSelectStr').text(getSelectTimeStr(myDate));
		contents = new Array();
		/*if ( $('#cate-title-button').hasClass("expend") )
		{
			expandcate();
		}*/
		//getRecommandContents(0);
		reDoLastClick();
		if (myDate.getTime() - realDate.getTime() == 0 )
		{
			$('#timeSelectToday').addClass('timeSelected');
			$('#timeSelectWeekend').removeClass('timeSelected');
			$('#timeSelectAll').removeClass('timeSelected');
		}
		else if (myDate.getTime() - realDate.getTime() == 86400000 ) 
		{
			$('#timeSelectToday').removeClass('timeSelected');
			$('#timeSelectWeekend').removeClass('timeSelected');
			$('#timeSelectAll').removeClass('timeSelected');
		}
		else
		{
			$('#timeSelectToday').removeClass('timeSelected');
			$('#timeSelectWeekend').removeClass('timeSelected');
			$('#timeSelectAll').removeClass('timeSelected');
		}
	});
	$('#timeSelectAll').bind('click', function(){
		realDate = new Date();
		setTimeZero(realDate);
		myDate = new Date(realDate);
		endDate = new Date(myDate);
		endDate.setDate(myDate.getDate()+6);
		s1=getSelectTimeStr(myDate);
		ss1 = s1.split(' ');
		s2=getSelectTimeStr(endDate);
		ss2 = s2.split(' ');
		$('#timeSelectStr').text(ss1[0]+"--"+ss2[0]);
		contents = new Array();
		/*if ( $('#cate-title-button').hasClass("expend") )
		{
			expandcate();
		}*/
		//getRecommandContents(0);
		reDoLastClick();
		$('#timeSelectToday').removeClass('timeSelected');
		$('#timeSelectWeekend').removeClass('timeSelected');
		$('#timeSelectAll').addClass('timeSelected');
	});
	$('#timeSelectToday').bind('click', function(){
		realDate = new Date();
		setTimeZero(realDate);
		myDate = new Date(realDate);
		endDate = new Date(myDate);
		endDate.setDate(myDate.getDate()+1);
		contents = new Array();
		/*if ( $('#cate-title-button').hasClass("expend") )
		{
			expandcate();
		}*/
		//getRecommandContents(0);
		reDoLastClick();
		$('#timeSelectToday').addClass('timeSelected');
		$('#timeSelectWeekend').removeClass('timeSelected');
		$('#timeSelectStr').text(getSelectTimeStr(myDate));
		$('#timeSelectAll').removeClass('timeSelected');
	});
	$('#timeSelectWeekend').bind('click', function(){
		realDate = new Date();
		setTimeZero(realDate);
		theDay = realDate.getDay();
		theDate = realDate.getDate();
		for ( ; theDay != 0 && theDay != 6; theDay++, theDay = theDay%7)
		{
			theDate++;
		}
		myDate.setDate(theDate);
		endDate = new Date(myDate);
		endDate.setDate(myDate.getDate()+1);
		str1 = getSelectTimeStr(myDate);
		str2 = getSelectTimeStr(endDate);
		strs1 = str1.split(' ');
		strs2 = str2.split(' ');
		$('#timeSelectStr').text(strs1[0]+"--"+strs2[0]);
		contents = new Array();
		/*if ( $('#cate-title-button').hasClass("expend") )
		{
			expandcate();
		}*/
		//getRecommandContents(0);
		reDoLastClick();
		if (myDate.getTime() - realDate.getTime() == 0 ) 
		{
			$('#timeSelectToday').addClass('timeSelected');
			$('#timeSelectAll').removeClass('timeSelected');
		}
		else if (myDate.getTime() - realDate.getTime() == 86400000 ) 
		{
			$('#timeSelectToday').removeClass('timeSelected');
			$('#timeSelectAll').removeClass('timeSelected');
		}
		$('#timeSelectToday').removeClass('timeSelected');
		$('#timeSelectWeekend').addClass('timeSelected');
		$('#timeSelectAll').removeClass('timeSelected');
	});
	$('#allsub-bar-text').bind('click', function(event){
		lastClickElement = $(event.target);
		showTimeSelect();
		contents = new Array();
		if ( $('#cate-title-button').hasClass('expend') )
		{
			expandcate();
		}
		getRecommandContents(1);
	});
});

//获得城市列表
function getAllCity()
{
	var apiUrl = "http://sub.365rili.com/subscribe/listCities.jsonp?callback=?";
	$.ajax({
		url: apiUrl,
		timeout: 30000,
		success: function(data){
			$.each(data, function(idx, item){
				if ( item.name == "MULTIPLE" || item.name == "DEFAULT" )
				{
					return;
				}
				$('#city-select').append("<option value="+item.id+">"+item.name+"</option>");
			});
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
		},
		error: function(e){
		},
		dataType: 'jsonp'
	});
	//连接城市选择select功能
	$('#city-select').bind('change', function(e){
		currentCity = $(e.target).val();
		getUserCate(0);
	});
	//$("#city-select option[text='"+remote_ip_info["province"]+"']").attr("selected", true);
}

//显示上一个
function popPrev()
{
	if ( currentPopIndex == 0 )
	{
		return ;
	}
	else
	{
		currentPopIndex--;
		popDetail("subblock"+contents[currentPopIndex].id);
	}
}

//显示下一个
function popNext()
{
	if ( currentPopIndex == contents.length - 1 )
	{
		return ;
	}
	else
	{
		currentPopIndex++;
		popDetail("subblock"+contents[currentPopIndex].id);
	}
}

//收缩展开分类栏
function expandcate()
{
	if ( $('#cate-title-button').hasClass("unexpend") )
	{
		$('#cate-title-button').removeClass("unexpend");
		$('#cate-title-button').addClass("expend");
		//$('#cate-title-button').attr("src","/sub_images/arrowup.png");
		$('#content-title-button').removeClass("unexpend");
		$('#content-title-button').addClass("expend");
		//$('#content-title-button').attr("src","/sub_images/arrowup.png");
		$('#gridcontainer-cate').css({"display":"block"});
		$('#gridcontainer-cate').animate({height:catelistHeight},Math.sqrt(catelistHeight*200));
		$('#gridcontainer-cate').animate({opacity:"1"}, 300, function(){
			$('#gridcontainer-cate').attr("style", "");
			$("#content-title").css({"marginLeft":12});
			$("#content-title").css({"marginRight":12});
			$("#gridcontainer-cate").css({"marginLeft":12});
			$("#gridcontainer-cate").css({"marginRight":12});
		});
	}
	else
	{
		$('#cate-title-button').removeClass("expend");
		$('#cate-title-button').addClass("unexpend");
		//$('#cate-title-button').attr("src","/sub_images/arrowdown.png");
		$('#content-title-button').removeClass("expend");
		$('#content-title-button').addClass("unexpend");
		//$('#content-title-button').attr("src","/sub_images/arrowdown.png");
		catelistHeight = $('#gridcontainer-cate').height();
		$('#gridcontainer-cate').animate({opacity:"0"},300);
		$('#gridcontainer-cate').animate({height:"0"},Math.sqrt(catelistHeight*200), function(){
			$('#gridcontainer-cate').css({"display":"none"});
		});
	}
}

//生成功能栏（半透明功能栏）代码
function makeAction()
{
	$('.sub-block').bind('mousemove', function(event){
		inBlock = true;
		//$("#y").text("ib");
		ele = $(event.target);
		while(1)
		{
			if ( ele.attr('class') == "sub-block" )
			{
				subid = ele.attr("id");
				break;
			}
			else 
			{
				ele = ele.parent();
			}
		}
		mouseX = event.clientX;
		mouseY = event.clientY;
		position = ele.offset();
		
		bartop = position.top - 60 - $(document).scrollTop();
		if ( bartop < 0 )
		{
			bartop = 0;
		}
		//alert(bartop);
		$("#subaction").css({"display":"block"});
		$("#subaction").css({"top":bartop+"px"});
		$("#subaction").css({"left":ele.offset().left-4+"px"});
		opacity = 1-(mouseY-bartop-60)/150+0.1;
		
		if ( opacity >= 1 )
		{
			opacity = 1;
		}
		else if ( opacity < 0 )
		{
			opacity = 0;
		}
		//$('#z').text(opacity);
		if ( bartop == 0 )
		{
			opacity = 1;
		}
		//$("#top").text(opacity);
		$("#subaction").css({"opacity":opacity});
	});
	$("#subaction").bind('mouseover', function(){
		//$("#x").text("ia");
		inAction = true;
		$("#subaction").css({"display":"block"});
		$("#subaction").css({"opacity":"1"});
	});
	$("#subaction").bind('mouseout', function(){
		inAction = false;
		if ( inBlock == false )
		{
			$("#subaction").css({"display":"none"});
		}
	});
	$('.sub-block').bind('mouseout', function(event){
		//$("#y").text("ob");
		inBlock = false;
		if ( inAction == false )
		{
			$("#subaction").css({"display":"none"});
		}
	});
	
}

function getUserCate(page)
{
	var apiUrl = "http://sub.365rili.com/subscribe/listCategoriesByUser.jsonp?sub_city_id="+currentCity+"&page="+page+"&callback=?";
	$.ajax({
		url: apiUrl,
		timeout: 30000,
		success: function(data){
			userCategories = data;
			qSort(userCategories, mycomp, myexchange, 'up');
			makeUserCateBlock();
			//alert(JSON.stringify(userCategories));
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
		},
		error: function(e){
		},
		dataType: 'jsonp'
	});
}

//获得推荐内容
function getRecommandContents(page)
{
    var apiUrl = "http://sub.365rili.com/subscribe/listContentByUser2.jsonp?starttime="+myDate.getTime()+"&endtime="+(myDate.getTime())+"&sub_city_id="+currentCity+"&page="+page+"&timestamp="+getCurrentTimeMillis()+"&callback=?";
	$.ajax({
		url: apiUrl,
		timeout: 30000,
		success: function(data){
			newcontents = data.content;
			var tags = data.tags;
			$.each(tags, function(idx, item){
				tagList[item.tag] = item.sortvalue;
			});
			contents = extend(contents, newcontents);
			//contentdata = {list:contents};
			//alert(JSON.stringify(data));
			$("#content-title-name").text("全部订阅");
			makeRecommandContentBlock();
			hideMessage();
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage("获取推荐内容");
		},
		error: function(e){
			alertMessage('发生错误');
		},
		dataType: 'jsonp'
	});
}

function getContents(id, page)
{
	var apiUrl = "http://sub.365rili.com/subscribe/listContentsByCategoryAndDate.jsonp?starttime="+myDate.getTime()+"&endtime="+endDate.getTime()+"&sub_city_id="+currentCity+"&sub_category_id="+id+"&f=1&page="+page;
	//alert(apiUrl);
	$.ajax({
		type: "GET",
		url: apiUrl,
		dataType: "jsonp",
		timeout: 30000,
		success: function(data) {
			newcontents = data.content;
			contents = extend(contents, newcontents);
			makeContentBlock();
			hideMessage();
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage("获取内容");
		},
		error: function(e){
			alertMessage('发生错误');
		}
	});
}

//获得最顶层分类
function getTopCategories()
{
	var apiUrl = "http://sub.365rili.com/subscribe/listCategories.jsonp?sub_city_id="+currentCity+"&page=1&parent_id=0&callback=?";
	$.ajax({
		url: apiUrl,
		dataType: "jsonp",
		timeout: 30000,
		success: function(data) {
			//alert(JSON.stringify(data));
			topCategories = data;
			makeLeftCateList();
			hideMessage();
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage("获取分类");
		},
		error: function(e){
			alertMessage('发生错误');
		}
	});
}

//生成用户订阅区域
function makeUserCateBlock()
{
	$("#subtag-cloud").empty();
	$.each(userCategories, function(idx, item){
		$("#subtag-cloud").append("<div class='subtag-cloud-item' id='subtag"+item.id+"'><a href='#' title='"+item.name+"'>"+item.name+"</a></div>");
		$("#subtag"+item.id).bind('click', {"id":item.id}, function(event){
			lastClickElement = $(event.target);
			$('.subtag-item-selected').removeClass('subtag-item-selected');
			$(event.target).addClass('subtag-item-selected');
			contents = new Array();
			if ( $('#cate-title-button').hasClass("unexpend") == false )
			{
				expandcate();
			}
			$('#add-subscribe').css({'display':'block'});
			setAsRemoveSub(event.data.id);
			$("#content-title-name").text(item.name);
			currentPopIndex = 0;
			myDate = new Date();
			endDate = new Date();
			endDate.setDate(myDate.getDate()+100);
			hideTimeSelect();
			$('#timeSelectToday').removeClass('timeSelected');
			$('#timeSelectTomorrow').removeClass('timeSelected');
			$('#timeSelectWeekend').removeClass('timeSelected');
			getContents(event.data.id, 1);
		});
	});
}

function hideTimeSelect()
{
	$('#timeSelect').animate(
				{opacity:"0", height: "0"}, 
				300, function(){
					$('#timeSelect').css({"display":"none"});
				});
}

function showTimeSelect()
{
	$('#timeSelect').css({"display":"block"});
	$('#timeSelect').animate(
				{opacity:"1", height: "30px"}, 
				300);
}

function contentComp(a, b)
{
	if ( tagList[a.tag] > tagList[b.tag] ) {
		return 1;
	}
	else if ( tagList[a.tag] == tagList[b.tag] ) {
		return 0;
	}
	else if ( tagList[a.tag] < tagList[b.tag] ) {
		return -1;
	}
}

function contentExange(array, i, j)
{
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

function cateNameTest( cateArray )
{
	if ( cateArray.length > 0 )
	{
		return cateArray[0].name +"'>"+ cateArray[0].name;
	}
	else
	{
		return "'>";
	}
}

//生成推荐block
function makeRecommandContentBlock()
{
	$("#gridcontainer").empty();
	$("#gridcontainer").append("<div class='sub-content-list' id='sub-content-list'></div>");
	
	

	var startdate = new Date();
	var enddate = new Date();
	qSort(contents, contentComp, contentExange, 'up');
	var insertingBigBlock;
	var currentParentID = -1;
	$.each(contents, function(idx, item){
		if ( currentParentID != tagList[item.tag] )
		{
			if ( typeof(isBaidu) != 'undefined' && item.tag == "优惠折扣" )
			{
				return true;
			}
			$("#gridcontainer").append("<div id='recommand-bigblock"+tagList[item.tag]+"' class='recommand-bigblock'> \
											<div id='content-title"+tagList[item.tag]+"' class='recommand-title'> \
												<div id='content-title-name"+tagList[item.tag]+"'></div> \
											</div> \
										</div>");
			currentParentID = tagList[item.tag];
			$('#content-title-name'+tagList[item.tag]).text(item.tag);
		}
		else if ( typeof(isBaidu) != 'undefined' && (item.title == "每日彩票" || item.title == "每日软件推荐"))
		{
			return true;
		}
		startdate.setTime(item.start_time);
		enddate.setTime(item.end_time);
		var block = "<div class='sub-block' id='subblock"+item.id+"' onselectstart='return false;'> \
							<div class='sub-block-content'> \
								<img class='sub-image' src='"+item.image+"'><div class='sub-block-timelike'>"
									+getTimeBlock(startdate, enddate)
									+"<div class='sub-block-cate'> \
										<div class='sub-block-like-div'>\
											<img class='sub-block-like-img' src='/sub_images/rss_like_small.png'/> \
											<div class='sub-block-like-count'>"+item.like_count+"</div> \
										</div>\
										<div class='clear'></div>\
										<div class='sub-block-info-name'>\
											<img class='sub-block-cate-img' src='/sub_images/rss_cate_small.png'/> \
											<div class='sub-block-cate-name' title='"+cateNameTest(item.categories)+"</div> \
										</div>\
									</div>\
								</div>\
							</div> \
							<div class='clear'></div> \
							<div class='sub-block-info'> \
								<div class='sub-block-name'>"+item.title+"</div> \
							</div> \
                        </div>";
		$('#recommand-bigblock'+tagList[item.tag]).append(block);
	});
	$("#content-title").css({"marginLeft":12});
	$("#content-title").css({"marginRight":12});
	$("#gridcontainer-cate").css({"marginLeft":12});
	$("#gridcontainer-cate").css({"marginRight":12});
	$('.sub-block').click(function(){
		popDetail(this.id);
	});
}

//生成内容block
function makeContentBlock()
{
	$("#gridcontainer").empty();
	$("#gridcontainer").append("<div class='sub-content-list' id='sub-content-list'></div>");

	var startdate = new Date();
	var enddate = new Date();
	$.each(contents, function(idx, item){
		startdate.setTime(item.start_time);
		enddate.setTime(item.end_time);
		var block = "<div class='sub-block' id='subblock"+item.id+"' onselectstart='return false;'> \
							<div class='sub-block-content'> \
								<img class='sub-image' src='"+item.image+"'><div class='sub-block-timelike'>"
									+getTimeBlock(startdate, enddate)
									+"<div class='sub-block-cate'> \
										<div class='sub-block-like-div'>\
											<img class='sub-block-like-img' src='/sub_images/rss_like_small.png'/> \
											<div class='sub-block-like-count'>"+item.like_count+"</div> \
										</div>\
										<div class='clear'></div>\
										<div class='sub-block-info-name'>\
											<img class='sub-block-cate-img' src='/sub_images/rss_cate_small.png'/> \
											<div class='sub-block-cate-name' title='"+item.categories[0].name+"'>"+item.categories[0].name+"</div> \
										</div>\
									</div>\
								</div>\
							</div> \
							<div class='clear'></div> \
							<div class='sub-block-info'> \
								<div class='sub-block-name'>"+(item.title).substring(0,20)+"</div> \
							</div> \
                        </div>";
		$("#sub-content-list").append(block);
	});
	$("#content-title").css({"marginLeft":12});
	$("#content-title").css({"marginRight":12});
	$("#gridcontainer-cate").css({"marginLeft":12});
	$("#gridcontainer-cate").css({"marginRight":12});
	$('.sub-block').click(function(){
		popDetail(this.id);
	});
	/*$("#calList").css({"height":$("#gridcontainer").height()});
	$("#calList").css({"background":"gray"});*/
	//makeAction();
}

//判断一个分类是否已经被订阅
function isSubscrbiedCate(id)
{
	for ( i = 0; i < userCategories.length; i++)
	{
		if ( userCategories[i].id == id )
		{
			return true;
		}
	}
	return false;
}

//生成左侧分类块
function makeLeftCateList()
{
	/*[{"id":2068,"name":"互联网","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2136,"name":"财经","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2060,"name":"艺术展","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2065,"name":"电影沙龙","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2067,"name":"乐队现场","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2147,"name":"夜店派对","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2099,"name":"时尚","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2102,"name":"汽车展","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2108,"name":"3C","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":true},{"id":2103,"name":"旅游","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2063,"name":"摄影","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":true},{"id":2064,"name":"读书","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":true},{"id":2066,"name":"公益","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":true},{"id":2100,"name":"美食","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2106,"name":"同志","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2138,"name":"交友","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2141,"name":"滑雪","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":true},{"id":2146,"name":"心理讲座","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2167,"name":"音乐节","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false},{"id":2148,"name":"其他","parent_id":2021,"description":"","icon":"","default_webview_id":13,"is_leaf":true,"is_subscribed":false}]*/
	$("#cate-list-item1").click(function(event){
		lastClickElement = $(event.target);
		getCategories(2021, 0);
		currentPopIndex = 0;
		$("#cate-title-name").text("全部内容-活动");
		getContentsOfNoneLeaf(2021);
		showTimeSelect();
		$("#add-subscribe").css({"display":"none"});
	});
	$("#cate-list-item2").click(function(event){
		lastClickElement = $(event.target);
		getCategories(1907, 0);
		currentPopIndex = 0;
		$("#cate-title-name").text("全部内容-体育");
		getContentsOfNoneLeaf(1907);
		showTimeSelect();
		$("#add-subscribe").css({"display":"none"});
	});
	$("#cate-list-item3").click(function(event){
		lastClickElement = $(event.target);
		getCategories(2, 0);
		currentPopIndex = 0;
		$("#cate-title-name").text("全部内容-演出");
		getContentsOfNoneLeaf(2);
		showTimeSelect();
		$("#add-subscribe").css({"display":"none"});
	});
	$("#cate-list-item0").click(function(event){
		lastClickElement = $(event.target);
		$("#add-subscribe").css({"display":"none"});
		$('#gridcontainer-cate').attr("style", "");
		$('#cate-title-button').removeClass("unexpend");
		$('#cate-title-button').addClass("expend");
		$("#content-title").css({"marginLeft":12});
		$("#content-title").css({"marginRight":12});
		$("#gridcontainer-cate").css({"marginLeft":12});
		$("#gridcontainer-cate").css({"marginRight":12});
		//$('#cate-title-button').attr("src","/sub_images/arrowup.png");
		$('#content-title-button').removeClass("unexpend");
		$('#content-title-button').addClass("expend");
		//$('#content-title-button').attr("src","/sub_images/arrowup.png");
		$('#expand-button-content').attr("style","");
		for ( var i = 3; i >= 0; i--)
		{
			$("#categorie-list"+i).remove();
		}
		$("#cate-content").append("<div class='categorie-list' id='categorie-list0'></div><div class='clear'></div>");
		$("#cate-title-name").text("全部内容-生活");
		getContentsOfNoneLeaf(-1);
		showTimeSelect();
		idArray = new Array(1921,2134,1910,1911,2173,1893,2207);
		nameArray = new Array('黄历', '节日', '24节气', '养生健康', '考试提醒', '星座', '每日团购');
		categorie = new Array();
		isleafArray = new Array(true, true, true, true, false, false, true);
		for ( var i = 0; i < 7; i++) 
		{
			categorie[i] = {is_subscribed:isSubscrbiedCate(idArray[i]), id:idArray[i]};
			var blockclass = "";
			if ( isleafArray[i] == true )
				blockclass = "categorie-block categorie-leaf";
			else
				blockclass = "categorie-block";
			var block = "<div id='categorie-block"+idArray[i]+"' class='"+blockclass+"'> \
							<span class>"+nameArray[i]+"</span> \
						</div>";
			$("#categorie-list0").append(block);
			if ( isleafArray[i] == false )
			{
				$("#categorie-block"+idArray[i]).bind('click', {id:idArray[i]}, function(event){
					contents = new Array();
					getContentsOfNoneLeaf(event.data.id);
					lastClickElement = $(event.target);
					for ( var i = 3; i >= 1; i--)
					{
						$("#categorie-list"+i).remove();
					}
					$(".categorie-active").removeClass("categorie-active");
					$("#categorie-block"+event.data.id).addClass("categorie-active");
					getCategories(event.data.id, 1);
				});
			}
			else
			{
				
				$("#categorie-block"+idArray[i]).bind('click', {id:idArray[i], name:nameArray[i], index:i}, function(event){
					$("#categorie-list0 .categorie-active").removeClass("categorie-active");
					$("#categorie-block"+event.data.id).addClass("categorie-active");
					lastClickElement = $(event.target);
					for ( var i = 3; i >= 1; i--)
					{
						$("#categorie-list"+i).remove();
					}
					contents = new Array();
					$("#gridcontainer").empty();
					gridcontainerstate = "content";
					$("#content-title-name").text(event.data.name);
					getContents(event.data.id, 1);
					$('#add-subscribe').unbind();
					var isTop = false;
					$('#add-subscribe').bind('click', {id:event.data.id, index:event.data.index, top:isTop}, function(){
						addSub(event.data.id, event.data.index, event.data.top);
					});
					$('#add-subscribe').css({'display':'block'});
					if ( isSubscrbiedCate(event.data.id) )
					{
						setAsRemoveSub(event.data.id, event.data.index, isTop);
					}
					else
					{
						setAsAddSub(event.data.id, event.data.index, isTop);
					}
				});
			}
		}
	});
	$("#cate-list-item4").click(function(event){
		lastClickElement = $(event.target);
		$("#add-subscribe").css({"display":"none"});
		$('#gridcontainer-cate').attr("style", "");
		$('#cate-title-button').removeClass("unexpend");
		$('#cate-title-button').addClass("expend");
		$("#content-title").css({"marginLeft":12});
		$("#content-title").css({"marginRight":12});
		$("#gridcontainer-cate").css({"marginLeft":12});
		$("#gridcontainer-cate").css({"marginRight":12});
		//$('#cate-title-button').attr("src","/sub_images/arrowup.png");
		$('#content-title-button').removeClass("unexpend");
		$('#content-title-button').addClass("expend");
		//$('#content-title-button').attr("src","/sub_images/arrowup.png");
		$('#expand-button-content').attr("style","");
		for ( var i = 3; i >= 0; i--)
		{
			$("#categorie-list"+i).remove();
		}
		$("#cate-content").append("<div class='categorie-list' id='categorie-list0'></div><div class='clear'></div>");
		$("#cate-title-name").text("全部内容-影讯");
		getContentsOfNoneLeaf(-2);
		showTimeSelect();
		idArray = new Array(2022, 2149);
		nameArray = new Array('美剧', '动漫');
		isleafArray = new Array(false, false);
		categorie = new Array();
		for ( var i = 0; i < 2; i++) 
		{
			categorie[i] = {is_subscribed:isSubscrbiedCate(idArray[i]), id:idArray[i]};
			var blockclass = "";
			if ( isleafArray[i] == true )
				blockclass = "categorie-block categorie-leaf";
			else
				blockclass = "categorie-block";
			var block = "<div id='categorie-block"+idArray[i]+"' class='"+blockclass+"'> \
							<span class>"+nameArray[i]+"</span> \
						</div>";
			$("#categorie-list0").append(block);
			if ( isleafArray[i] == false )
			{
				$("#categorie-block"+idArray[i]).bind('click', {id:idArray[i]}, function(event){
					$("#categorie-list0 .categorie-active").removeClass("categorie-active");
					$("#categorie-block"+event.data.id).addClass("categorie-active");
					contents = new Array();
					getContentsOfNoneLeaf(event.data.id);
					lastClickElement = $(event.target);
					for ( var i = 3; i >= 1; i--)
					{
						$("#categorie-list"+i).remove();
					}
					$(".categorie-active").removeClass("categorie-active");
					$("#categorie-block"+event.data.id).addClass("categorie-active");
					getCategories(event.data.id, 1);
				});
			}
			else
			{
				$("#categorie-block"+idArray[i]).bind('click', {id:idArray[i], name:nameArray[i], index:i}, function(event){
					$("#categorie-list0 .categorie-active").removeClass("categorie-active");
					$("#categorie-block"+event.data.id).addClass("categorie-active");
					lastClickElement = $(event.target);
					for ( var i = 3; i >= 1; i--)
					{
						$("#categorie-list"+i).remove();
					}
					contents = new Array();
					$("#gridcontainer").empty();
					gridcontainerstate = "content";
					$("#content-title-name").text(event.data.name);
					getContents(event.data.id, 1);
					$('#add-subscribe').unbind();
					var isTop = false;
					$('#add-subscribe').bind('click', {id:event.data.id, index:event.data.index, top:isTop}, function(){
						addSub(event.data.id, event.data.index, event.data.top);
					});
					$('#add-subscribe').css({'display':'block'});
					if ( isSubscrbiedCate(event.data.id) )
					{
						setAsRemoveSub(event.data.id, event.data.index, isTop);
					}
					else
					{
						setAsAddSub(event.data.id, event.data.index, isTop);
					}
				});
			}
		}
	});
	$('.cate-list-item').bind('click', function(e){
		$('.cate-list-item').removeClass('cate-list-itemSelect');
		$(e.target).addClass('cate-list-itemSelect');
	});
}

//获得分类树
function getAllCategories()
{
	var apiUrl = "http://sub.365rili.com/subscribe/listAllCate.jsonp?sub_city_id="+currentCity+"&callback=?";
	$.ajax({
		type: "GET",
		url: apiUrl,
		dataType: "jsonp",
		timeout: 30000,
		success: function(data) {
			allCategories = data;
			makeAllCategoriesBlock();
			hideMessage();
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage('获取分类');
		},
		error: function(e){
			alertMessage('发生错误');
		}
	});
}

//获得分类
function getCategories(parent, deep)
{
	var apiUrl = "http://sub.365rili.com/subscribe/listCategories.jsonp?sub_city_id="+currentCity+"&page=1&parent_id="+parent;
	$.ajax({
		type: "GET",
		url: apiUrl,
		dataType: "jsonp",
		timeout: 30000,
		success: function(data) {
			categorie = data;
			gridcontainerstate = "catelist";
			makeCategorieBlock(deep);
			hideMessage();
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage('获取分类');
		},
		error: function(e){
			alertMessage('发生错误');
		}
	});
}

function hotcomp(a, b) {
	if ( a.like_count > b.like_count ) {
		return 1;
	}
	else if ( a.like_count == b.like_count ) {
		return 0;
	}
	else if ( a.like_count < b.like_count ) {
		return -1;
	}
}

//获得非叶子节点的内容
function getContentsOfNoneLeaf(parent)
{
	//先获得所有子节点
	//var apiUrl = "http://sub.365rili.com/subscribe/listCategories.jsonp?sub_city_id="+currentCity+"&page=1&parent_id="+parent;
	var apiUrl = "http://sub.365rili.com/subscribe/getContentOfNoneLeaf.jsonp?sub_city_id="+currentCity+"&cate_id="+parent+"&page=0&starttime="+myDate.getTime()+"&endtime="+endDate.getTime()+"&callback=?";
	$.ajax({
		type: "GET",
		url: apiUrl,
		timeout: 30000,
		dataType: "jsonp",
		success: function(data) {
			//alert(JSON.stringify(data));
			qSort( data, hotcomp, myexchange, "down");
			contents = data;
			makeContentBlock();
			hideMessage();
			$('#content-title-name').text("");
	/*		contents = new Array();
			var canReturn = false;
			$.each(data, function(idx, item){
				if (item.is_leaf)
				{
					$("#content-title-name").text(item.name);
					getContents(item.id, 1);
					canReturn = true;
				}
			});
			if ( canReturn == false )
			{
				getContentsOfNoneLeaf(data[0].id);
			}*/
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage('获取内容');
		},
		error: function(e){
			alertMessage('发生错误');
		}
	});
}

//生成中间的分类块
function makeCategorieBlock(deep)
{
	if ( categorie.length == 0 )
	{
		return;
	}
	//$("#sub-content-list").empty();
	$('#gridcontainer-cate').attr("style", "");
	$('#cate-title-button').removeClass("unexpend");
	$('#cate-title-button').addClass("expend");
	$("#content-title").css({"marginLeft":12});
	$("#content-title").css({"marginRight":12});
	$("#gridcontainer-cate").css({"marginLeft":12});
	$("#gridcontainer-cate").css({"marginRight":12});
	//$('#cate-title-button').attr("src","/sub_images/arrowup.png");
	$('#content-title-button').removeClass("unexpend");
	$('#content-title-button').addClass("expend");
	//$('#content-title-button').attr("src","/sub_images/arrowup.png");
	$('#expand-button-content').attr("style","");
	for ( var i = 3; i >= deep; i--)
	{
		$("#categorie-list"+i).remove();
	}
	$("#cate-content").append("<div class='categorie-list' id='categorie-list"+deep+"'></div><div class='clear'></div>");

	$.each(categorie, function(idx, item){
		if ( typeof(isBaidu) != 'undefined' && (item.id == 2143 || item.id == 2172 || item.id == 2139) )
		{
			return true;
		}
		var blockclass = "";
		if ( item.is_leaf )
		{
			blockclass = "categorie-block categorie-leaf";
		}
		else
		{
			blockclass = "categorie-block";
		}
		var block = "<div id='categorie-block"+item.id+"' class='"+blockclass+"'> \
						<span class>"+item.name+"</span> \
					</div>";
		
		$("#categorie-list"+deep).append(block);
		if ( item.is_leaf == false )
		{
			$("#categorie-block"+item.id).bind('click', {id:item.id}, function(event){
				lastClickElement = $(event.target);
				$("#categorie-list"+deep+" .categorie-active").removeClass("categorie-active");
				$("#categorie-block"+event.data.id).addClass("categorie-active");
				getCategories(event.data.id, deep+1);
				getContentsOfNoneLeaf(event.data.id);
			});
		}
		else
		{
			$("#categorie-block"+item.id).bind('click', {id:item.id, name:item.name, index:idx}, function(event){
				$("#categorie-list"+deep+" .categorie-active").removeClass("categorie-active");
				$("#categorie-block"+event.data.id).addClass("categorie-active");
				lastClickElement = $(event.target);
				contents = new Array();
				$("#gridcontainer").empty();
				gridcontainerstate = "content";
				$("#content-title-name").text(event.data.name);
				getContents(event.data.id, 1);
				$('#add-subscribe').unbind();
				var isTop = false;
				$('#add-subscribe').bind('click', {id:event.data.id, index:event.data.index, top:isTop}, function(){
					addSub(event.data.id, event.data.index, event.data.top);
				});
				$('#add-subscribe').css({'display':'block'});
				if ( isSubscrbiedCate(event.data.id) )
				{
					setAsRemoveSub(event.data.id, event.data.index, isTop);
				}
				else
				{
					setAsAddSub(event.data.id, event.data.index, isTop);
				}
			});
		}
	});
}

var initem = false;
var inhover = false;

function makeAllCategoriesBlock()
{
	
	var topCate = allCategories.child;
	for ( i = 0; i < topCate.length; i++)
	{
		$('#cate-list').append("<table class='cate-list-hover' id='cate-list-hover"+i+"'></table>");
		$('#cate-list-item'+i).unbind();
		
		rowCate = topCate[i].child;
		for ( row = 0; row < rowCate.length; row++ )
		{
			blockCate = rowCate[row];
			$('#cate-list-hover'+i).append("<tr class='cate-list-hoverrow' id='cate-list-hoverrow-"+i+"-"+row+"'></tr>");
			$('#cate-list-hoverrow-'+i+'-'+row).append("<td class='cate-list-hover-rowname' id='cate-list-hover-item"+blockCate.data.id+"'>"+blockCate.data.name+"</td>");
			if ( blockCate.data.is_leaf )
			{
				$('#cate-list-hover-item'+blockCate.data.id).addClass('cate-list-hover-item-clickable');
				$('#cate-list-hover-item'+blockCate.data.id).bind('click', {id:blockCate.data.id}, function(e){
					lastClickElement = $(e.target);
					contents = new Array();
					$('.cate-list-item').css({'background':'#f9f9f9'});
					$('.cate-list-hover').css({'display':'none'});
					getContents(e.data.id, 1);
				});
			}
			$('#cate-list-hoverrow-'+i+'-'+row).append("<td class='cate-list-hover-itemlist' id='cate-list-hover-itemlist-"+i+"-"+row+"'></td>");
			for ( idx = 0; idx < blockCate.child.length; idx++)
			{
				$('#cate-list-hover-itemlist-'+i+'-'+row).append("<div class='cate-list-hover-item' id='cate-list-hover-item"+blockCate.child[idx].data.id+"'>"+blockCate.child[idx].data.name+"</div>");
				if ( blockCate.child[idx].data.is_leaf )
				{
					$('#cate-list-hover-item'+blockCate.child[idx].data.id).addClass('cate-list-hover-item-clickable');
					$('#cate-list-hover-item'+blockCate.child[idx].data.id).bind('click', {id:blockCate.child[idx].data.id}, function(e){
						lastClickElement = $(e.target);
						contents = new Array();
						$('.cate-list-item').css({'background':'#f9f9f9'});
						$('.cate-list-hover').css({'display':'none'});
						getContents(e.data.id, 1);
					});
				}
			}
		}
		$('#cate-list-item'+i).bind('mouseover', {idx:i}, function(e){
			initem = i+1;
			$('#cate-list-item'+e.data.idx).css({'background':'#eff2f4'});
			$('#cate-list-hover'+e.data.idx).css({'display':'block'});
		});
		$('#cate-list-item'+i).bind('mouseout', {idx:i}, function(e){
			initem = 0;
			if ( inhover == i+1 )
			{
				return;
			}
			$('#cate-list-item'+e.data.idx).css({'background':'#f9f9f9'});
			$('#cate-list-hover'+e.data.idx).css({'display':'none'});
		});
		$('#cate-list-hover'+i).bind('mouseover', {idx:i}, function(e){
			inhover = i+1;
			$('#cate-list-item'+e.data.idx).css({'background':'#eff2f4'});
			$('#cate-list-hover'+e.data.idx).css({'display':'block'});
		});
		$('#cate-list-hover'+i).bind('mouseout', {idx:i}, function(e){
			inhover = 0;
			if ( initem == i+1 )
			{
				return;
			}
			$('#cate-list-item'+e.data.idx).css({'background':'#f9f9f9'});
			$('#cate-list-hover'+e.data.idx).css({'display':'none'});
		});
	}
}

//弹出详细层
function popDetail(eleid)
{
	isPoped = true;
	id = eleid.substr(8);
	var apiUrl = "http://sub.365rili.com/subscribe/show_web_view.do?duplicate_ids=&p=web&v=0&cntid="+id+"&scroll=y";
	$.each(contents, function(idx, item){
		//alert(id);
		if ( item.id == id )
		{
			$('#pop-detail-bar-title').text(item.title);
			currentPopIndex = idx;
			return;
		}
	});
	
	$("#pop-action-sina").parent().hide();
	$("#pop-action-add").parent().hide();
	$('#pop-detail-frame').attr('src',"");
	$('#pop-detail-frame').attr('src',apiUrl);
	$('#pop-detail-frame').load(iframe_onload);
	
	$("#mask").css({"display":"block"});
	$("#sub-detail-pop").css({"display":"block"});
	$("#close-pop").css({"display":"block"});
	$("#popaction").css({"display":"block"});
}

//add by wuzhq start
	//添加日程、分享到微博     
function Tweet(url,title){
	this.url=url;
	this.title=title;
}
Tweet.prototype={
	target:'http://v.t.sina.com.cn/share/share.php',
	url:'',
	title:'',
	getTAdrs:function(){
		if(this.title.length==0)
			return '#';
		var a = new Array();
		a.push(this.target);
		a.push('?');
		if(this.url.length>0){
			a.push('url='+encodeURIComponent(this.url));
			a.push('&');
		}
		a.push('title='+encodeURIComponent(this.title))
		a.push('&');
		a.push('appkey=1848630227');
		return a.join('');
	}
};

function iframe_onload(){
	with(contents[currentPopIndex]){
		var d = new Date();
		d.setTime(start_time);
		var dateS = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" ;
		var t = new Tweet("http://sub.365rili.com/subcontent/"+id, "我用#365日历 #分享了活动：" + dateS + " " + title);
		$("#pop-action-sina").parent().attr("href",t.getTAdrs());
		$("#pop-action-add").click(function(){
			addSch(title,
				"http://sub.365rili.com/subcontent/"+id,
				start_time,
				end_time,
				function(result){
					if(result!=null && result.length>0)
						alert("添加成功！");
				});
		});
	}
	$("#pop-action-sina").parent().show();
	$("#pop-action-add").parent().show();
}

String.prototype.leftpad = function(len, str) {
    if (!str) {
        str = '0';
    }

    var s = '';
    for (var i = 0; i < len - this.length; i++) {
        s += str;
    }
    return s + this;
};

function getDateSimpleFormat(date) {
    return date.getFullYear().toString() +"-"+
    	(date.getMonth() + 1).toString().leftpad(2)+"-"+
    	date.getDate().toString().leftpad(2)+" "+
    	date.getHours().toString().leftpad(2)+":"+
    	date.getMinutes().toString().leftpad(2)+":" +
    	date.getSeconds().toString().leftpad(2); // 返回yyyy-MM-dd hh:mm:ss格式的字符串
}

function addSch(title,url,start_time,end_time,callback){
	var param={};
	param['schTitle'] = title;
	param['url'] = url;
    param['alldayEvent'] = false;
    var date = new Date();
    date.setTime(parseInt(start_time));
    param['startTime'] = getDateSimpleFormat(date);
    param['duration'] = (parseInt(end_time)-parseInt(start_time))/1000;
    param['timeZone'] = - (new Date()).getTimezoneOffset() / 60;
	$.ajax({
        url: '/schedule/update.do', 
        data: param,
        type: 'post',
        dataType: 'json',
        success: callback
    });
}

//关闭详细层
function closeDetail()
{
	isPoped = false;
	$("#mask").css({"display":"none"});
	$("#sub-detail-pop").css({"display":"none"});
	$("#close-pop").css({"display":"none"});
	$("#popaction").css({"display":"none"});
}

//设置详细层的位置
function setDetailPosition()
{
	//设置详细框的位置
	$("#sub-detail-pop").css({"top":"25px"});
	$("#sub-detail-pop").css({"left":($(window).width()-560)/2+"px"});
	$("#sub-detail-pop").css({"height":$(window).height()-60+"px"});
	$("#pop-detail-frame").css({"height":$(window).height()-180+"px"});
	$("#popaction").css({"left":($(window).width()-680)/2+440+"px"});
	$("#popaction").css({"top":($(window).height()-100)+"px"});
	//设置hint的位置
	$('#pop-hint').css({'top':"30px"});
	$('#pop-hint').css({'left':($(window).width()-290)/2+"px"});
	//设置alert的位置
	$('#pop-notify').css({'left':($(window).width()-150)/2+"px"});
	$('#pop-notify').css({'top':'0px'});
}

//获得日期字符串
function get365YMString(date)
{
	return date.getFullYear()+"/"+(date.getMonth()+1);
}

function get365MDString(date)
{
	m = date.getMonth()+1;
	d = date.getDate();
	if ( m < 10 )
	{
		m = "0"+m;
	}
	if ( d < 10 )
	{
		d = "0"+d;
	}
	return m+"/"+d;
}

//获得时间字符串
function get365TimeString(date)
{
	if ( date.getHours()=="0"&& date.getMinutes() =="0" )
	{
		return "";
	}
	return date.getHours()+":"+date.getMinutes();
}

//获得当前毫秒
function getCurrentTimeMillis()
{
	return myDate.getTime();
}

//获得header验证头
function MakeCheckHeaderValue(url)
{
	var l = getCurrentTimeMillis();
	return l+","+$.md5(l+""+url);
}

//连接json数据
function extend(a, b){
	//alert(b.length);
	$.each(b, function(idx, item){
		a.push(item);
	});
	return a;
}

function getScreenPosition(o)
{
    var temp={};
    temp.left=temp.right=temp.top=temp.bottom=0;
    var oWidth=o.offsetWith,oHeight=o.offsetheight;
    while(o!=document.body)
    {
        temp.left+=o.offsetLeft;
        temp.top+=o.offsetTop;
        var border=parseInt(o.offsetParent.currentStyle.borderWidth);
        if(border)
        {
            temp.left+=border;
            temp.top+=border;
        }
        o=o.offsetParent;
    }
    temp.right=temp.left+oWidth;
    temp.bottom=temp.top+temp.oHeight;
    return temp;
}

//添加关注
function addSub(cateid, cateindex, isTop)
{
	var apiUrl = "http://sub.365rili.com/subscribe/subscribe.jsonp?sub_category_id="+cateid+"&callback=?";
	$.ajax({
		type: "GET",
		url: apiUrl,
		dataType: "jsonp",
		timeout: 30000,
		success: function(data) {
			//alert(JSON.stringify(data));
			if (data.result)
			{
				getUserCate(1);
				setAsRemoveSub(cateid);
				alertMessage('已经关注');
				if ( isTop )
				{
					topCategories[cateindex].is_subscribed = true;
				}
				else
				{
					categorie[cateindex].is_subscribed = true;
				}
				return;
			}
			alertMessage('发生错误');
		},
		error: function(data)
		{
			alertMessage('发生错误');
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage('关注中');
		}
	});
}

//添加关注
function removeSub(cateid, cateindex, isTop)
{
	var apiUrl = "http://sub.365rili.com/subscribe/unsubscribe.jsonp?sub_category_id="+cateid+"&callback=?";;
	$.ajax({
		type: "GET",
		url: apiUrl,
		dataType: "jsonp",
		timeout: 30000,
		success: function(data) {
			if (data.result)
			{
				getUserCate(1);
				setAsAddSub(cateid);
				alertMessage('已经取消关注');
				if ( isTop )
				{
					topCategories[cateindex].is_subscribed = false;
				}
				else
				{
					categorie[cateindex].is_subscribed = false;
				}
				return;
			}
			alertMessage('发生错误');
		},
		error: function(data)
		{
			alertMessage('发生错误');
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("LKJ8FD9FD345lkj3", MakeCheckHeaderValue(apiUrl));
			popMessage('取消关注中');
		}
	});
}

//将关注按钮设置为添加关注状态	分类的id，分类的序号，是否是顶层分类
function setAsAddSub(cateid, cateindex, isTop)
{
	$('#add-subscribe').text("关注");
	$('#add-subscribe').removeClass('subscribed-button');
	$('#add-subscribe').addClass('addsubscrib-button');
	$('#add-subscribe').unbind();
	$('#add-subscribe').bind('click', {id:cateid, index:cateindex, top:isTop}, function(event){
		addSub(event.data.id, event.data.index, event.data.top);
	});
}

//将关注按钮设置为取消关注状态
function setAsRemoveSub(cateid, cateindex, isTop)
{
	$('#add-subscribe').text("已关注");
	$('#add-subscribe').removeClass('addsubscrib-button');
	$('#add-subscribe').addClass('subscribed-button');
	$('#add-subscribe').unbind();
	$('#add-subscribe').bind('mouseover', function(){$('#add-subscribe').text("取消关注");});
	$('#add-subscribe').bind('mouseout', function(){$('#add-subscribe').text("已关注");});
	$('#add-subscribe').bind('click', {id:cateid, index:cateindex, top:isTop}, function(event){
		removeSub(event.data.id, event.data.index, event.data.top);
	});
}

function isSubscrbied(cateid)
{
	var isSubed = false;
	$.each(categorie, function(idx, item){
		if (  item.id == cateid )
		{
			if ( item.is_subscribed )
			{
				isSubed = true;
			}
			return;
		}
	});
	return isSubed;
}

//弹出消息
function popMessage(text)
{
	$('#pop-notify').text(text);
	$('#pop-notify').css({'display':'block'});
}

//收回消息
function hideMessage()
{
	$('#pop-notify').text('');
	$('#pop-notify').css({'display':'none'});
}

//保持弹出消息一段时间
function alertMessage(text)
{
	$('#pop-notify').text(text);
	$('#pop-notify').css({'display':'block'});
	setTimeout("hideMessage()", 1000);
}

//生成时间方格
function getTimeBlock(start, end)
{
	var starttime = start.getTime();
	var endtime = end.getTime();
	var day = (endtime - starttime)/86400000;
	var block = "<div class='time-block'>";
	if ( day > 1 )
	{
		block += "<div class='time-top-bar'>";
		block += start.getFullYear();
		block += "</div>";
		block += "<div class='time-md-block'>"
		block += get365MDString(start);
		block += "</div>";
		block += "<div style='text-align: center;text-align: -moz-center !important; font-size: 13px;'>至</div>";
		block += "<div class='time-md-block'>"
		block += get365MDString(end);
		block += "</div>";
	}
	else
	{
		block += "<div class='time-top-bar'>";
		switch ( start.getDay() )
		{
		case 0:
			block += "星期日";
			break;
		case 1:
			block += "星期一";
			break;
		case 2:
			block += "星期二";
			break;
		case 3:
			block += "星期三";
			break;
		case 4:
			block += "星期四";
			break;
		case 5:
			block += "星期五";
			break;
		case 6:
			block += "星期六";
			break;
		}
		block += "</div>";
		block += "<div class='time-year-block'>";
		block += start.getFullYear();
		block += "</div>";
		block += "<div class='time-md-block'>";
		block += get365MDString(start);
		block += "</div>";
		if ( start.getHours()== "0" && start.getMinutes() == "0" )
		{
			block += "<div class='time-time-bar'>"
			block += get365TimeString(start);
			block += "</div>";
		}
	}
	block += "</div>";
	return block;
}

function getSelectTimeStr(date)
{
	day = date.getDay();
	month = date.getMonth()+1;
	theDate = date.getDate();
	switch (day)
	{
	case 0:
		day = "星期日";
		break;
	case 1:
		day = "星期一";
		break;
	case 2:
		day = "星期二";
		break;
	case 3:
		day = "星期三";
		break;
	case 4:
		day = "星期四";
		break;
	case 5:
		day = "星期五";
		break;
	case 6:
		day = "星期六";
		break;
	}
	if ( theDate < 10 )
	{
		theDate = "0"+""+theDate;
	}
	if ( month < 10 )
	{
		month = "0"+""+month;
	}
	return month+"/"+theDate+" "+day;
}

function setTimeZero(date)
{
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
}

var ar = new Array(5,9,3,1,8,4,2,7);

//qSort(ar, mycomp, myexchange, 'up');

function mycomp(a, b) {
	if ( a.name.length > b.name.length ) {
		return 1;
	}
	else if ( a.name.length == b.name.length ) {
		return 0;
	}
	else if ( a.name.length < b.name.length ) {
		return -1;
	}
}

function myexchange(array, i, j) {
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

function qSort( array, comp, exchange, dir)
{
	if ( dir == 'up' )
	{
		quickSortUp(array, comp, exchange, 0, array.length - 1);
	}
	else if ( dir == 'down' )
	{
		quickSortDown(array, comp, exchange, 0, array.length - 1);
	}
}

function quickSortUp( array, comp, exchange, left, right)
{
	if ( right > left )
	{
		var i = left, j = right;
		var target = 0;
		while( i < j )
		{
			if ( comp(array[i], array[j]) > 0 )
			{
				exchange(array, i, j);
				target = 1-target;
				if ( target == 0 )
				{
					j--;
				}
				else
				{
					i++;
				}
			}
			else if ( target == 0 )
			{
				j--;
			}
			else
			{
				i++;
			}
		}
		quickSortUp( array, comp, exchange, left, i-1);
		quickSortUp( array, comp, exchange, j+1, right);
	}
}

function quickSortDown( array, comp, exchange, left, right)
{
	if ( right > left )
	{
		var i = left, j = right;
		var target = 0;
		while( i < j )
		{
			if ( comp(array[i], array[j]) < 0 )
			{
				exchange(array, i, j);
				target = 1-target;
				if ( target == 0 )
				{
					j--;
				}
				else
				{
					i++;
				}
			}
			else if ( target == 0 )
			{
				j--;
			}
			else
			{
				i++;
			}
		}
		quickSortUp( array, comp, exchange, left, i-1);
		quickSortUp( array, comp, exchange, j+1, right);
	}
}

function showSelectedDateContent()
{
	setTimeout(function(){
		contents = new Array();
		/*if ( $('#cate-title-button').hasClass("expend") )
		{
			expandcate();
		}*/
		//getRecommandContents(0);
		reDoLastClick();
		$('#timeSelectToday').removeClass('timeSelected');
		$('#timeSelectWeekend').removeClass('timeSelected');
		$('#timeSelectAll').removeClass('timeSelected');
		$('#timeSelectStr').text(getSelectTimeStr(myDate));
	}, 200);
}

function reDoLastClick()
{
	if ( lastClickElement != null )
	{
		lastClickElement.click();
	}
	else
	{
		getRecommandContents(1);
	}
}

function HSVtoRGB(h, s, v)  
{  
  var f, p, q, t;
  s = s/100.0;
  if( s == 0 ) { // achromatic (grey)  
    return new Array(v,v,v);   
  }
  h /= 60.0;      // sector 0 to 5
  i = Math.floor( h );
  f = h - i;      // factorial part of h  
  p = Math.floor(v * ( 1 - s )/100.0*255.0);
  q = Math.floor(v * ( 1 - s * f )/100.0*255.0);
  t = Math.floor(v * ( 1 - s * ( 1 - f ) )/100.0*255.0);
  v = Math.floor(v/100.0*255.0);
  switch( i ) {
    case 0:  
      return "rgb("+v+","+t+","+p+")";
    case 1:  
      return "rgb("+q+","+v+","+p+")";
    case 2:  
      return "rgb("+p+","+v+","+t+")";
    case 3:  
      return "rgb("+p+","+q+","+v+")";
    case 4:  
      return "rgb("+t+","+p+","+v+")";
    default:
      return "rgb("+v+","+p+","+q+")";
  }
}
