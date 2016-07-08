var KSeparator = "_";
function CalendarSets(){
	/*
	 * 日历的id;如果id==-1,则表示新建日历
	 */
	this.id=-1;
	this.name="";
	this.isPublic = false;
	this.desc="";
	this.color="#00C8AB";
	this.isprimary="false";
	/*
	 * 日历分享用户列表
	 */
	this.share=null;
};
CalendarSets.prototype={
	/*
	 * 添加分享用户
	 */
	addShare:function(userid,power){
		if(!this.share){
			this.share=new Array();
		}
		this.share.push({userid:userid,power:power});
	},
	/*
	 * 根据userid找到分享数组下标
	 */
	findShareIndex:function(userid){
		if(!this.share){
			return -1;
		}
		var index=-1;
		for(var i=0;i<this.share.length;i++){
			if(this.share[i].userid==userid){
				index=i;
				break;
			}
		}
		return index;
	},
	/*
	 * 删除分享用户
	 */
	removeShare:function(userid){
		var index=this.findShareIndex(userid);
		if(index!=-1){
			this.share.splice(index,1);
		}
	},
	/*
	 * 设置用户权限
	 */
	updateSharePower:function(userid,power){
		var index=this.findShareIndex(userid);
		if(index!=-1){
			this.share[index].power=power;
		}
	},
	save:function(){
		if(this.name==null || this.name==""){
			alert("请填写日历名称！")
			return;
		}
		var shareArray = new Array();
		if(this.share!=null && this.share.length>0){
			for(var i=0;i<this.share.length;i++){
				var share = new Object();
				var ids = this.share[i].userid.split(KSeparator);
				share.accountType = ids[0];
				share.accountId = ids[1];
				share.accessType = this.share[i].power;
				// weibo邀请，提交screen name
				if(this.share[i].userid.indexOf('-200')>=0) {
					share.accountName = findScreenName(ids[1]);
				}
				// Email邀请，提交email address
				if(this.share[i].userid.indexOf('-300')>=0) {
					share.accountId = -1;
					share.accountName = findEmail(ids[1]);
				}
				shareArray.push(share);
			}
		}
		var share = JSON.stringify(shareArray);
		//debug
		//alert("name:"+this.name+",color:"+this.color+",share:"+share);
		var publicSetting={isPublic:this.isPublic};
		if(this.isPublic){
			if(this.desc != null){
				publicSetting.desc=this.desc;
			}
		}
		ajaxSubmit.create(this.name,this.color,share,JSON.stringify(publicSetting),function(result){
			if(result.state == "ok"){
				addToCookie(result.calendarId);
				gotoMainPage();
			}
		});
	}
}

function Difference(calendarSets){
	this.calendarSets=calendarSets;
	this.difference={
		name:null,
		isPublic:calendarSets.isPublic,
		desc:null,
		color:null,
		updatePower:null,
		addShare:null,
		deleShare:null
	};
	this.checkName=function(newName){
		if(this.calendarSets.name != newName){
			this.difference.name=newName;
		}else{
			if(this.difference.name){
				this.difference.name=null;
			}
		}
	}
	this.checkIsPublic=function(newIsPublic){
		this.difference.isPublic=newIsPublic;
	}
	this.checkDesc=function(newDesc){
		if(this.calendarSets.desc != newDesc){
			this.difference.desc=newDesc;
		}else{
			if(this.difference.desc){
				this.difference.desc=null;
			}
		}
	}
	this.checkColor=function(newColor){
		if(this.calendarSets.color != newColor){
			this.difference.color=newColor;
		}else{
			if(this.difference.color){
				this.difference.color=null;
			}
		}
	}
	this.checkUpdatePower=function(userid,newPower){
		var index = this.calendarSets.findShareIndex(userid);
		//如果在原始用户列表中
		if(index != -1){
			if(this.calendarSets.share[index].power != newPower){
				if(!this.difference.updatePower){
					this.difference.updatePower=new Array();
				}
				var flag=true;
				for(var i=0;i<this.difference.updatePower.length;i++){
					if(this.difference.updatePower[i].userid==userid){
						this.difference.updatePower[i].power=newPower;
						flag=false;
						break;
					}
				}
				if(flag){
					this.difference.updatePower.push({userid:userid,power:newPower});
				}
			}else{
				if(this.difference.updatePower){
					for(var i=0;i<this.difference.updatePower.length;i++){
						if(this.difference.updatePower[i].userid==userid){
							this.difference.updatePower.splice(i,1);
							break;
						}
					}
				}
			}
		}else{//检查是否在新添加的用户列表中
			for(var i=0;i<this.difference.addShare.length;i++){
				if(this.difference.addShare[i].userid==userid){
					this.difference.addShare[i].power=newPower;	
				}
			}
		}
	}
	this.checkAddShare=function(userid,power){
		//如果是当前删除的用户，则从deleShare移除并检查其权限的修改
		var flag=true;
		if(this.difference.deleShare){
			for(var i=0;i<this.difference.deleShare.length;i++){
				if(this.difference.deleShare[i]==userid){
					this.difference.deleShare.splice(i,1);
					this.checkUpdatePower(userid,power);
					flag=false;
					break;
				}
			}
		}
		if(flag){
			if(!this.difference.addShare){
				this.difference.addShare=new Array();
			}
			this.difference.addShare.push({userid:userid,power:power});
		}
	}
	this.checkDeleShare=function(userid){
		//如果是当前添加的用户，则addShare移除即可
		var flag=true;
		if(this.difference.addShare){
			for(var i=0;i<this.difference.addShare.length;i++){
				if(this.difference.addShare[i].userid==userid){
					this.difference.addShare.splice(i,1);
					flag=false;
					break;
				}
			}
		}
		if(flag){
			if(this.difference.updatePower){
				for(var i=0;i<this.difference.updatePower.length;i++){
					if(this.difference.updatePower[i].userid==userid){
						this.difference.updatePower.splice(i,1);
						break;
					}
				}
			}
			if(!this.difference.deleShare){
				this.difference.deleShare=new Array();
			}
			this.difference.deleShare.push(userid);
		}
	}
	this.save=function(){
		var name="",color="",updatePower,addShare,deleShare,publicSetting;
		
		if(this.difference.name!=null){
			if(this.difference.name==""){
				alert("日历名称不可为空！");
				return;
			}else{
				name=this.difference.name;
			}
		}
		//alert("name:"+name);
		if(this.difference.color!=null){
			color=this.difference.color;
		}
		//alert("color:"+color);
		
		publicSetting={isPublic:this.difference.isPublic};
		if(this.difference.isPublic){
			if(this.difference.desc != null){
				publicSetting.desc=this.difference.desc;
			}
		}
		
		function getArrayString(arr, type){
			var shareArray = new Array();
			if(arr!=null && arr.length>0){
				for(var i=0;i<arr.length;i++){
					var share = new Object();
					var ids = arr[i].userid.split("_");
					share.accountType = ids[0];
					share.accountId = ids[1];
					share.accessType = arr[i].power;
					// weibo邀请，提交screen name
					if(arr[i].userid.indexOf('-200')>=0) {
						share.accountName = findScreenName(ids[1]);
					}
					// Email邀请，提交email address
					if(arr[i].userid.indexOf('-300')>=0 && type=="A") {
						share.accountId = -1;
						share.accountName = findEmail(ids[1]);
					}
					// 更新时提交Invitation ID
					if(arr[i].userid.indexOf('-100')<0 && type=="U") {
						share.invitationId = findInvitationId(arr[i].userid);
					}
					shareArray.push(share);
				}
			}
			return JSON.stringify(shareArray);
		}
		updatePower=getArrayString(this.difference.updatePower, "U");
		addShare=getArrayString(this.difference.addShare, "A");
		
		deleShare=function(arr){
			var deleArray = new Array();
			if(arr!=null && arr.length>0){
				for(var i=0;i<arr.length;i++){
					var dele = new Object();
					var ids = arr[i].split("_");
					dele.accountType = ids[0];
					dele.accountId = ids[1];
					if(ids[1] != "-100") {
						dele.invitationId = findInvitationId(arr[i]);
					}
					deleArray.push(dele);
				}
			}
			return JSON.stringify(deleArray);
		}(this.difference.deleShare);
		//debug
		//alert("id:"+this.calendarSets.id+",name:"+name+",color:"+color+",updatePower:"+updatePower+",addShare:"+addShare+",deleShare:"+deleShare);

		ajaxSubmit.saveChange(this.calendarSets.id,name,color,updatePower,addShare,deleShare,
				JSON.stringify(publicSetting),function(result){
			if(result){
				gotoMainPage();
				
			}else{
				alert("保存失败！");
				refresh();
			}
		});
	}
}

function CalendarManagerUI(){
	this.changeColor=function(color){
		$("#calManageColorSelected").css("background-color",color);
	}
	this.removeUser=function(userid){
		$("#divdel_for_user"+userid).parent().remove();
		refreshUI();
	}
	this.addUser=function(userid,username,power,extraUserInfo){
		//如果用户存在，则只需移动该用户的位置
		var item = $("#select_for_user"+userid);
		item.val(power);
		if(item.length==1){
			$("#userlist").append(item.parent());
			item.parent().show();
		}else{
			var html="<div class=\"cal_manage_content_shareline\" style=\"margin-top:0px;\">";
			html+="<span class=\"cal_manage_content_sharename\" style=\"width:300px;\">";
			if(userid.indexOf('-100')>=0) {
				html+="<img class=\"cal_manage_content_shareline_icon\" src=\"/images/cal365_default/365rili_icon_16x16.png\" />" + username;
			} else if(userid.indexOf('-200')>=0) {
				html+="<img class=\"cal_manage_content_shareline_icon\" src=\"/images/cal365_default/weibo_icon_16x16.png\" />" + extraUserInfo;	
			} else if (userid.indexOf('-300')>=0) {
				html+="<img class=\"cal_manage_content_shareline_icon\" src=\"/images/cal365_default/mail_icon_16x16.png\" />" + username;	
			} else {
				html+="<img class=\"cal_manage_content_shareline_icon\" src=\"/images/cal365_default/weibo_icon_16x16.png\" />" + extraUserInfo;
				html+="(<img class=\"cal_manage_content_shareline_icon_2\" src=\"/images/cal365_default/365rili_icon_16x16.png\" />" + username+")";
			}
				
			html+="</span>"+
				"<select id=\"select_for_user"+userid+"\" class=\"cal_manage_content_input\" style=\"width:80px;margin-top:4px;padding:1px;height:22px;\"  onchange=\"eventHandlers.userPower_changed(this);\" >"+	
					"<option value=\"1\" #normal# >只读</option>"+
					"<option value=\"2\" #edit# >编辑</option>";
			if(Calendar.isprimary=="false"){
			html += "<option value=\"3\" #admin# >管理</option>";
			}
				html+=
				"</select>"+
				"<div id=\"divdel_for_user"+userid+"\" class=\"cal_manage_content_sharedelebtn\" onclick=\"eventHandlers.userDele_click(this);\"></div>"+
				"</div>";
				switch(power){
					case "1":
						html=html.replace("#normal#","selected=\"selected\"");
						html=html.replace("#edit#","");
						html=html.replace("#admin#","");
						break;
					case "2":
						html=html.replace("#normal#","");
						html=html.replace("#edit#","selected=\"selected\"");
						html=html.replace("#admin#","");
						break;
					case "3":
						html=html.replace("#normal#","");
						html=html.replace("#edit#","");
						html=html.replace("#admin#","selected=\"selected\"");
						break;
				}
				//console.log('result which is formatted\n' + html);
				$("#userlist").append(html);
		}
		$("#ipt_newusername").val("");
		refreshUI();
	}
};
/*
 * 将日历名称存入javascript变量
 */
function saveName(){
	var input = $("#ipt_calname");
	if(input.length>0){
		var calname=$.trim(input.val());
		if(calname!=null){
			if(IsCreate){
				Calendar.name=calname;
			}else{
				Diff.checkName(calname);
			}
		}
	}
	
	var desc = $("#ipt_desc");
	if(desc.length>0){
		var caldesc=$.trim(desc.val());
		if(caldesc!=null){
			if(IsCreate){
				Calendar.desc=caldesc;
			}else{
				if(Diff.difference.isPublic)
					Diff.checkDesc(caldesc);
			}
		}
	}
}
/*
 * 判断Calendar中是否有增量未保存
 */
function isCalendarShouldBeSaved(cal){
	saveName();
	if(cal.name!=null && cal.name!=""){
		return true;
	}
	if(cal.isPublic){
		return true;
	}
	if(cal.isPublic && cal.desc!=null && cal.desc!=""){
		return true;
	}
	if(cal.share!=null && cal.share.length>0){
		return true;
	}
	return false;
}
/*
 * 判断Diff中是否有增量未保存
 */
function isDifferenceShouldBeSaved(diff){
	saveName();
	if(diff.difference.name!=null && diff.difference.name!=""){
		return true;
	}
	if(diff.difference.isPublic!=diff.calendarSets.isPublic){
		return true;
	}
	if(diff.difference.isPublic && diff.difference.desc!=null){
		return true;
	}
	if(diff.difference.color!=null){
		return true;
	}
	if(diff.difference.addShare!=null && diff.difference.addShare.length>0){
		return true;
	}
	if(diff.difference.deleShare!=null && diff.difference.deleShare.length>0){
		return true;
	}
	if(diff.difference.updatePower!=null && diff.difference.updatePower.length>0){
		return true;
	}
	return false;
}
/*
 * 返回到我的日历页
 */
function gotoMainPage(){
	window.location="/main/calendar.do";
	//window.history.back();
}
/*
 * 刷新当前页面
 */
function refresh(){
	window.location=window.location;
}
/*
 * 判断当前是创建还是编辑日历
 */
function getIsCreate(){
	var flag = $("#inpthd_calendarId").val();
	var id=parseInt(flag);
	if(id==-1){
		return true;
	}else{
		return false;
	}
}
/*
 * 将当前的日历信息存入javascript变量中
 */
function initCalendar(calendar){
	calendar.id=parseInt($("#inpthd_calendarId").val()); 
	calendar.name=$("#ipt_calname").val();
	calendar.isPublic = false;
	if($('#ipt_isPublic').prop('checked')) {
		calendar.isPublic = true;
    }
	
	calendar.desc=$("#ipt_desc").val();
	calendar.color=$("#calManageColorSelected").css("background-color");
	calendar.isprimary=$("#ipthd_isprimary").val();
	
	//用户列表
	$("select[id^='select_for_user']").each(function(){
		var userid =$(this).attr("id").substring(15);
		var power =$(this).val();
		Calendar.addShare(userid,power);
	});
}
/*
 * 全局变量
 */
var IsCreate=getIsCreate();
var Calendar=new CalendarSets();
if(!IsCreate){
	initCalendar(Calendar);
}
var Diff=IsCreate?null:new Difference(Calendar);
var UI =new CalendarManagerUI();

//设置相关高度、宽度
$(document).ready(function(){
	$("#riliPage").css("height",$(window).height()+"px");
	var width=document.documentElement.clientWidth - 100;
	$("#pageBody").css("width",width+"px");
	$("#pageNeck").css("width",(width-23)+"px");
	refreshUI();
});
/*
 * 事件处理句柄
 */
var eventHandlers={
	colorBox_click:function(color){
		if(IsCreate){
			Calendar.color=color;
		}else{
			Diff.checkColor(color);
		}
		UI.changeColor(color);
	},
	userPower_changed:function(selector){
		//"select_for_user";
		var end=selector.length;
		var userid=selector.id.substring(15);
		var power = selector.value;
		if(IsCreate){
			Calendar.updateSharePower(userid,power);
		}else{
			Diff.checkUpdatePower(userid,power);
		}
	},
	userDele_click:function(domDiv){
		//"divdel_for_user"
		//var userid=parseInt(domDiv.id.substring(15));
		var userid=domDiv.id.substring(15);
		if(IsCreate){
			Calendar.removeShare(userid);
		}else{
			Diff.checkDeleShare(userid);
		}
		UI.removeUser(userid);
	},
	addUer_click:function(){
		var username=$("#ipt_newusername").val();
		if(username!=null && $.trim(username)!=""){
			ajaxSubmit.findUser(username,function(result){
				//alert(result.userid+","+result.username+","+result.state);
				if(result.state == "correct"){
					var userid=parseInt(result.userid);
					var power=$("#select_newuserpower").val();
					
					//如果当前用户存在，则弹出提示
					var combinded_id = "-100" + KSeparator + userid;
					var item = $("#select_for_user"+combinded_id);
					if(item.length==1 && (item.parent())[0].style.display!="none"){
						alert("该用户已在您的分享列表中！")
						return;
					}
					
					if(IsCreate){
						Calendar.addShare(combinded_id,power);
					}else{
						Diff.checkAddShare(combinded_id,power);
					}
					UI.addUser(combinded_id,result.username,power, null);
				}else if(result.state == "currentUser"){
					alert("您填写的是自己的用户名或邮箱！");
				}else if(result.state == "noExist"){
					var emailReg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					if(!emailReg.test(username)){
						alert("该用户不存在，请输入您要邀请的的邮箱地址！")
					}else{
						if(confirm("该用户还不是365日历用户，确定邀请您的朋友加入吗？")){
							$("#emailNotice")[0].style.display = "block";
							var emailid = getEmailId(username);
							var power=$("#select_newuserpower").val();

							//如果当前用户存在，则弹出提示
							var combinded_id = "-300" + KSeparator + emailid;
							var item = $("#select_for_user"+combinded_id);
							if(item.length==1 && (item.parent())[0].style.display!="none"){
								alert("该用户已在您的分享列表中！")
								return;
							}

							if(IsCreate){
								Calendar.addShare(combinded_id,power);
							}else{
								Diff.checkAddShare(combinded_id,power);
							}
							UI.addUser(combinded_id,username,power,null);
						}
					}
				}
			});
		}else{
			alert("请填写用户名或邮箱！");
			$("#ipt_newusername").focus;
		}
	},
	cancel_click:function(){
		gotoMainPage();
	},
	save_click:function(){
		if(IsCreate){
			if(isCalendarShouldBeSaved(Calendar)){
				Calendar.save();	
			}else{
				alert("请填写日历名称！");
			}
		}else{
			if(isDifferenceShouldBeSaved(Diff)){
				Diff.save();
			}else{
				alert("您没有修改任何内容！");
			}
		}
	},
	goback_click:function(){
		if(IsCreate){
			if(isCalendarShouldBeSaved(Calendar)){
				if(confirm("您还未保存，确认现在离开页面吗？")){
					gotoMainPage();
				}else{
					return;
				}
			}else{
				gotoMainPage();
			}
		}else{
			if(isDifferenceShouldBeSaved(Diff)){
				if(confirm("您还未保存，确认现在离开页面吗？")){
					gotoMainPage();
				}else{
					return;
				}
			}else{
				gotoMainPage();
			}
		}
	},
	revoke_click:function(){
		if(!confirm("确认取消订阅日历吗？")){
			return;
		}
		if(Diff){
			ajaxSubmit.revoke(Diff.calendarSets.id,function(result){
				if(result){
					gotoMainPage();
				}
			});
		}
	},
	dele_click:function(){
		if(!confirm("确认删除该日历吗？")){
			return;
		}
		if(Diff){
			ajaxSubmit.dele(Diff.calendarSets.id,function(result){
				if(result){
					gotoMainPage();
				}
			});
		}
	},
	import_weibo_click:function(){
		if(!confirm("将从微博导入您的朋友，确定吗？")){
			return;
		}
		var cover = render.cover();
		render.googleSync();
		ajaxSubmit.importWeiboFriends(function(result){
			$(cover).click(function(){
				$(weiboUserList).remove();
				$(cover).remove();
			});
			if(result.state == "ok"){
				var userCount = result.users.length;
				if(userCount == 0){
					alert("您没有关注任何好友，请先到新浪微博添加要关注的好友！");
					render.removeGoogleSync();
					render.removeCover();
					return;
				}
					
				render.removeGoogleSync();
				var width=800;
				var height=480;
				var inHeight=435;
				var left=Math.floor(($(window).width()-width)/2);
				var top=Math.floor(($(window).height()-height)/2);
				
				var html='<div id= "weiboUserList" class="cal_manage_content_weibolist" style="width:'+ width +'px;height:'+ height +'px;top:'+top+'px;left:'+left+'px;" >';
				html+='<div class="titleline">';
				html+='<div class="cal_manage_content_upbtn" style="margin-top:0px;" onclick="eventHandlers.btn_invite_weibo_click()">邀&nbsp;请</div>';
				html+='<div class="title">微博朋友列表</div>';
				html+='</div>';
				html+='<div class="cal_manage_content_weibolistblock" style="height:'+ inHeight +'px;">';
				html+='<div class="cal_manage_content_weiboline" style="margin-top:0px;">';
				
				for(var i=0;i<userCount;i++)
				{
					var weiboUser = result.users[i];
					
					html+='<span class="cal_manage_content_weiboinfo">'; 
					html+='<img class ="cal_manage_content_weibo_profile_image" src="'+weiboUser.profileImageUrl.protocol+'://'
						+weiboUser.profileImageUrl.host+weiboUser.profileImageUrl.file+'" ';
					html+='onClick = "eventHandlers.weiboUser_click(\'' + weiboUser.userId + '\')">';
					html+='<input type="checkbox" style="margin-top:20px;margin-left:5px;" id="'+weiboUser.userId+'"';
					html+='name="weiboUserSelected"';
					html+='value="'+weiboUser.userId+'">';
					html+='&nbsp;&nbsp;&nbsp;';
					html+='<label>'+weiboUser.screenName+'</lable>';
					html+='</span>';
					
					if((i+1)%3 == 0 && (i+1) != userCount){
						html+='</div>';
						html+='<div class="cal_manage_content_weiboline" style="margin-top:0px;">';
					}
					
				}
				html+='</div>';
				html+='</div>';
				html+='</div>';
				
				$("body").append(html);
				//console.log('result which is formatted\n' + html);
			} else if(result.state == "no_weibo"){
				alert("未绑定新浪微博账号，请绑定您的账号！");
				render.removeGoogleSync();
				render.removeCover();
			} else if(result.state == "token_error"){
				alert("新浪微博账号有误，请重新用微博账号登陆！");
				render.removeGoogleSync();
				render.removeCover();
			} else {
				alert("导入微博账号失败，请联系365日历！");
				render.removeGoogleSync();
				render.removeCover();
			}
		});
	},	
	weiboUser_click:function(weiboUserId){
		$("#" + weiboUserId).click();
	},
	btn_invite_weibo_click:function(){
		var weiboUserShare = new Array();
		$("input[name='weiboUserSelected']:checked").each(function(i) {
			weiboUserShare.push($(this).val());
			invitedWeiboFriends.push({userId:$(this).val(),screenName:$(this).next('label').text()});
		});

		var share="";
		if(weiboUserShare!=null && weiboUserShare.length>0){
			for(var i=0;i<weiboUserShare.length;i++){
				share+=weiboUserShare[i];
				if(i<(weiboUserShare.length-1)){
					share+="&";
				}
			}

			ajaxSubmit.findUserByWeiboId(share, function(result){
				$("#weiboNotice")[0].style.display = "block";
				var userCount = result.length;
				for(var i = 0;i < userCount;i++)
				{
					var user = result[i];
					var userId = user.userId;
					var userName = user.userName;
					var power="2";
					
					var combinded_id;
					// weibo账号未绑定365账号
					if(userId ==-200)  {
						combinded_id = '-200' + KSeparator + user.weiboUserId;
					} else {
						combinded_id = '-100' + KSeparator + userId;
					}
					
					if(IsCreate){
						Calendar.addShare(combinded_id,power);
					}else{
						Diff.checkAddShare(combinded_id,power);
					}

					var weiboUserScreenName = findScreenName(user.weiboUserId);
					UI.addUser(combinded_id,userName,power,weiboUserScreenName);	
				}
			});
		}
		$("#weiboUserList").remove();
		render.removeCover();
	},	
	isPublic_change:function(){
		var isPublic = false;
		if($('#ipt_isPublic').prop('checked')) {
            $('#descSec').removeClass('desc_hidden');
            isPublic = true;
        } else {
            $('#descSec').addClass('desc_hidden');
        }
		 
		if(IsCreate){
			Calendar.isPublic=isPublic;
		}else{
			Diff.checkIsPublic(isPublic);
		}
	} 
}

function findScreenName(weiboUserId) {
	if(invitedWeiboFriends && invitedWeiboFriends.length > 0) {
		for(var i=0; i<invitedWeiboFriends.length; i++) {
			if(invitedWeiboFriends[i].userId == weiboUserId) {
				return invitedWeiboFriends[i].screenName;
			}
		}
	}
	return 'noName';
}

function findEmail(emailId) {
	if(invitedEmailFriends && invitedEmailFriends.length > 0) {
		for(var i=0; i<invitedEmailFriends.length; i++) {
			if(invitedEmailFriends[i].id == emailId) {
				return invitedEmailFriends[i].email;
			}
		}
	}
	return 'noName';
}

function getEmailId(email) {
	for(var i=0; i<invitedEmailFriends.length; i++) {
		if(invitedEmailFriends[i].email == email) {
			return invitedEmailFriends[i].id;
		}
	}
	emailIdLast++;
	invitedEmailFriends.push({email:email, id:emailIdLast});
	return emailIdLast;
}

function findInvitationId(userId) {
	if(invitedFriendIDs && invitedFriendIDs.length > 0) {
		for(var i=0; i<invitedFriendIDs.length; i++) {
			if(invitedFriendIDs[i].userId == userId) {
				return invitedFriendIDs[i].accountId;
			}
		}
	}
	return '-1';
}

function refreshUI() {
	var shareCount = 0;
	if (IsCreate) {
		if(Calendar.share) {
			shareCount = Calendar.share.length;	
		}
	} else {
		if (Diff.calendarSets.share) {
			shareCount += Diff.calendarSets.share.length;
		}
		if (Diff.difference.addShare) {
			shareCount += Diff.difference.addShare.length;
		}

		if (Diff.difference.deleShare) {
			shareCount -= Diff.difference.deleShare.length;
		}
	}
	if(shareCount == 0) {
		shareCount = shareCountofNoneAdmin;
	}
	var delta = shareCount * 35 + 80; // 70 for top 2 lines / 10 for space
	// 日历管理框的高度
	if (delta > 300) {
		if ($("#weiboNotice")[0].style.display != "none") {
			delta += 15;
		} else if ($("#emailNotice")[0].style.display != "none") {
			delta += 15;
		}
		$("#userbox")[0].style.height = delta + "px";
	}
	if (delta + 390 > document.body.offsetHeight ) {
		$("#rili365")[0].style.height = delta + 400 + "px";
	}
}

function addToCookie(cid) {
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
}

var ajaxSubmit={
	revoke:function(calendarId,callback){
		$.ajax({
        	type: 'post',
            url: '/main/calendarManager/revoke.do',
            data: {calendarId:calendarId},
            success: callback,
            dataType: 'json'
     	});
	},
	dele:function(calendarId,callback){
		$.ajax({
        	type: 'post',
            url: '/main/calendarManager/delete.do',
            data: {calendarId:calendarId},
            success: callback,
            dataType: 'json'
     	});
	},
	findUser:function(username,callback){
		$.ajax({
        	type: 'post',
            url: '/account/findUser.do',
            data: {username:username},
            success: callback,
            dataType: 'json'
     	});
	},
	saveChange:function(calendarId,name,color,updatePower,addShare,deleShare,publicSetting,callback){
		var para={
			calendarId:calendarId,
			name:name,
			color:color,
			updatePower:updatePower,
			addShare:addShare,
			deleShare:deleShare,
			publicSetting:publicSetting
		}
		$.ajax({
        	type: 'post',
            url: '/main/calendarManager/save.do',
            data: para,
            success: callback,
            dataType: 'json'
     	});
	},
	create:function(name,color,share,publicSetting,callback){
		var para={
			name:name,
			color:color,
			share:share,
			publicSetting:publicSetting
		}
		$.ajax({
        	type: 'post',
            url: '/main/calendarManager/create.do',
            data: para,
            success: callback,
            dataType: 'json'
     	});
	},
	importWeiboFriends:function(callback){
		$.ajax({
			type: 'post',
			url: '/weibo/friends-web.do',
			success: callback,
			dataType: 'json'
		});
	},
	findUserByWeiboId:function(share,callback){
		var para={
			share:share
		}
		$.ajax({
        	type: 'post',
            url: '/weibo/findUserByWeiboId.do',
            data: para,
            success: callback,
            dataType: 'json'
     	});
	}
}