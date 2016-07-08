//document.domain="365rili.com";
var communicator={
	syncGoogleOnWeb:function(callback){
		$.ajax({
			type: 'post',
			data: {},
			url: '/syncGoogle-web.do',
			success: callback,
			dataType: 'json'
		});
	},
	removeGoogleBinding:function(callback){
		$.ajax({
			type: 'post',
			data: {},
			url: '/removeGoogleBind-web.do',
			success: callback,
			dataType: 'json'
		});
	},
	// Outlook Sync
	bindOutlook:function(parm,callback, callback2){
		$.ajax({
			type: 'post',
			data: parm,
			url: '/outlook/bind-web.do',
			success: callback,
			error: callback2,
			dataType: 'json'
		});
	},
	syncOutlookOnWeb:function(outlookAccount,callback){
		$.ajax({
			type: 'post',
			data: {outlookAccount:outlookAccount},
			url: '/outlook/sync-web.do',
			success: callback,
			dataType: 'json'
		});
	},
	removeOutlookBinding:function(outlookAccount,callback){
		$.ajax({
			type: 'post',
			data: {outlookAccount:outlookAccount},
			url: '/outlook/unbind-web.do',
			success: callback,
			dataType: 'json'
		});
	},
	bindBaidu_login:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/baidu/bind.do',
			success: callback,
			dataType: 'json'
		});
	},
	bindBaidu_reg:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/baidu/bind-reg.do',
			success: callback,
			dataType: 'json'
		});
	},
	bindWeibo_login:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/weibo/bind-365-login.do',
			success: callback,
			dataType: 'json'
		});
	},
	bindWeibo_reg:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/weibo/bind-365-reg.do',
			success: callback,
			dataType: 'json'
		});
	},
	bindqh360_login:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/qh360/bind.do',
			success: callback,
			dataType: 'json'
		});
	},
	bindqh360_reg:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/qh360/bind-reg.do',
			success: callback,
			dataType: 'json'
		});
	},
	checkUserName:function(username,callback){
		$.ajax({
            type:'post',
            url:'/account/checkUsernameAction.do',
            data:{username:username},
            async:false,
            success:callback
        });
	},
	checkUserName4Bind:function(username,callback){
		$.ajax({
            type:'post',
            url:'/account/checkUsername4Bind.do',
            data:{username:username},
            async:false,
            success:callback
        });
	},
	getWeibo:function(callback){
		$.ajax({
            type:'post',
            url:'/weibo/getWeibo.do',
            data:{},
            async:false,
            success:callback
        });
	},
	unbindWeibo_web:function(callback){
		$.ajax({
            type:'post',
            url:'/weibo/unbind-web.do',
            data:{},
            async:false,
            success:callback
        });
	},
	getBaidu:function(callback){
		$.ajax({
            type:'post',
            url:'/baidu/getBaidu.do',
            data:{},
            async:false,
            success:callback
        });
	},
	unbindBaidu:function(callback){
		$.ajax({
            type:'post',
            url:'/baidu/unbind.do',
            data:{},
            async:false,
            success:callback
        });
	},
	getQh360:function(callback){
		$.ajax({
            type:'post',
            url:'/qh360/getQh360.do',
            data:{},
            async:false,
            success:callback
        });
	},
	unbindQh360:function(callback){
		$.ajax({
            type:'post',
            url:'/qh360/unbind.do',
            data:{},
            async:false,
            success:callback
        });
	},
	getGoogle:function(callback){
		$.ajax({
            type:'post',
            url:'/getGoogle.do',
            data:{},
            async:false,
            success:callback
        });
	},
	getOutlook:function(callback){
		$.ajax({
            type:'post',
            url:'/outlook/getOutlook.do',
            data:{},
            async:false,
            success:callback
        });
	},
	basicInfo:function(email,userName,password,callback){
		$.ajax({
            type:'post',
            url:'/account/basicInfo.do',
            data:{email:email,userName:userName,password:password},
            async:false,
            success:callback
        });
	},
	changePwd:function(password,newPwd,newPwd2,callback){
		$.ajax({
            type:'post',
            url:'/account/changePwd.do',
            data:{password:password,newPwd:newPwd,newPwd2:newPwd2},
            async:false,
            success:callback
        });
	},
	getQQT:function(callback){
		$.ajax({
            type:'post',
            url:'/qt/getQQT.do',
            data:{},
            async:false,
            success:callback
        });
	},
	unbindQQT_web:function(callback){
		$.ajax({
            type:'post',
            url:'/qt/unbind-web.do',
            data:{},
            async:false,
            success:callback
        });
	},
	bindQQT_reg:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/qt/bind-365-reg.do',
			success: callback,
			dataType: 'json'
		});
	},
	bindQQZ_reg:function(username,password,callback){
		$.ajax({
			type: 'post',
			data: {username:username,password:password},
			url: '/qz/bind-365-reg.do',
			success: callback,
			dataType: 'json'
		});
	},
	getQQZ:function(callback){
		$.ajax({
            type:'post',
            url:'/qz/getQQZ.do',
            data:{},
            async:false,
            success:callback
        });
	},
	unbindQQZ_web:function(callback){
		$.ajax({
            type:'post',
            url:'/qz/unbind-web.do',
            data:{},
            async:false,
            success:callback
        });
	}
}