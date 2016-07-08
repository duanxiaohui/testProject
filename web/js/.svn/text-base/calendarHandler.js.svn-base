var calendarHandler = {
	cldMap : {},
	selected : {},
	putCld : function(cldObj) {
		this.cldMap[cldObj.id] = cldObj;
	},
	getCld : function(cid) {
		return this.cldMap[cid];
	},
	getCalendarInfo : function(callback){
		$.ajax(
			{
                url: '/calendar/getCalendarListByUser.do',
                async: false,
                type: 'post',
                dataType: 'json',
                data: {},
                success: function(result) {
				   calendarHandler.cldMap = {};

                   for(var i=0;i<result.length;i++)
				   {
					   var cObj = result[i];
						if(cObj.color=="") //XXX 若返回数据中没有颜色信息则随机一个
						{
							cObj.color = utils.getRandomColor().value;
						}
						calendarHandler.putCld(cObj);
				   }
				   calendarHandler.showCalendarList();
				   if(callback)
				   callback();
                }
            }	
		);
	},
	getSelectedArray : function(){
		var selCld = [],j=0;
		for(var i in calendarHandler.selected)
		{
			selCld[j] = i;
			j++;
		}
		return selCld;
	},
	showCalendarList : function(){
		//alert(0);
		try{
		 var instance = tplMgr.getInstance("calListTpl_cal");
		 //alert(instance.GetView(calendarHandler.cldMap));
		 $("#calendarList").html(instance.GetView(calendarHandler.cldMap));
		 
		 calendarHandler.initCalCheck();
		 calendarHandler.addSelectEvent();
		}catch(e){
			alert(e.message);
		}
		
	},
	addSelectEvent : function(){
		$(".calPart").click(function(event){
			if($(event.target).hasClass("editCalendarBtn")){
				return;
			}
			var className = $(this).find(":first-child").attr("class");
			var cid = $(this).attr("cid");
			if(className == 'checkCalN') // ԭ��״̬Ϊδѡ��,���֮��Ϊѡ��״̬
			{
				calendarHandler.selectCld(cid);
				calendarHandler.addToCookie(cid);
				$(this).find(":first-child").removeClass("checkCalN").addClass("checkCalY");
				$("#gridcontainer").drawSch();
			}
			else
			{
				if(className== 'checkCalY')
				{
					
					$(this).find(":first-child").removeClass("checkCalY").addClass("checkCalN");
					calendarHandler.unselectCld(cid);
					calendarHandler.removeFromCookie(cid);
				}
			}
			$("#gridcontainer").changDate();
		});
	},
	initCalCheck : function(){
		 var select = calendarHandler.getCookieSelected();
		 calendarHandler.clearSelected();
		 if(select==null)
		 {
			var cid= [];
			for(var j in calendarHandler.cldMap)
			{
				var cld = calendarHandler.cldMap[j];
				if(cld.is_primary=='true')
				{
					cid.push(cld.id);
				}
			}
			for(var i=0; i<cid.length; i++){
				calendarHandler.selectCld(cid[i]);
				calendarHandler.addToCookie(cid[i]);
				$(".calPart").filter("div[cid="+cid[i]+"]").find(":first-child").removeClass("checkCalN").addClass("checkCalY");
			}
		 }else
		 {
			for(var i=0;i<select.length;i++)
			{
				calendarHandler.selectCld(select[i]);
				$(".calPart").filter("div[cid="+select[i]+"]").find(":first-child").removeClass("checkCalN").addClass("checkCalY");
			}
		 }
	},
	isSelected : function(cid) {
		return typeof this.selected[cid] != 'undefined';
	},
	clearSelected : function() {
		this.selected = {};
	},
	selectCld : function(cid) {
		this.selected[cid] = {};
	},
	unselectCld : function(cid) {
		this.selected[cid] = null;
		delete this.selected[cid];
	},
	getCookieSelected : function() {
		var cookie = $.cookie('selectedClds' + curUser.id);
		
		var selectedClds;
		try {
			eval('selectedClds = ' + cookie);
			if(selectedClds) {
    			for(var i = selectedClds.length; i >= 0; --i) {
    			    if(!calendarHandler.cldMap[selectedClds[i]]) {
    			        calendarHandler.removeFromCookie(selectedClds[i]);
    			        selectedClds.splice(i, 1);
    			    }
    			}
			}
		} catch (e) {
			selectedClds = [];
		}
		return selectedClds;
	},
	clearCookie : function() {
		$.cookie('selectedClds' + curUser.id, '', {
					expires : -1
				});
	},
	addToCookie : function(cid) {
		var cookie = $.cookie('selectedClds' + curUser.id);
		var selectedClds;
		try {
			eval('selectedClds = ' + cookie);
			var flag = true;
			for (var i in selectedClds) {
				if (selectedClds[i] == cid) {
					flag = false;
					break;
				}
			}
			if (flag) {
				selectedClds.push(cid);
			}
		} catch (e) {
			selectedClds = [cid];
		}
		$.cookie('selectedClds' + curUser.id, JSON.stringify(selectedClds), {
					expires : 365
				});
	},
	removeFromCookie : function(cid) {
		var cookie = $.cookie('selectedClds' + curUser.id);
		var selectedClds;
		try {
			eval('selectedClds = ' + cookie);
			var index = -1;
			for (var i in selectedClds) {
				if (selectedClds[i] == cid) {
					index = i;
					break;
				}
			}
			if (index >= 0) {
				selectedClds.splice(index, 1);
			}
		} catch (e) {
			selectedClds = [];
		}
		$.cookie('selectedClds' + curUser.id, JSON.stringify(selectedClds), {
					expires : 365
				});
	}
};