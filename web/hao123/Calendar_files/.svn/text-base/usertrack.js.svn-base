var UserTrack = {
	send: function( oparam ) {
		var aparam = [],
			odefault = UserTrack._default,
			onosend = UserTrack._nosendParam;
		_hao123_image = new Image( 1, 1 );
		oparam = oparam || odefault;
		//防止缓存生成随机数
		oparam.randnum =  Math.round(Math.random() * 2147483647);
		//需要访问服务器的url
		oparam.sendurl = oparam.sendurl || odefault.sendurl;
		//访问的refer
		oparam.refer = oparam.refer || odefault.refer;
		//统计的类型
		oparam.type = oparam.type || odefault.type;
		for ( var key in oparam ) {
			if ( !onosend[key] )
				aparam.push( encodeURIComponent( key ) + "=" + encodeURIComponent( oparam[key] ) );	
		}
		_hao123_image.src = oparam.sendurl + "?" + aparam.join("&");
		_hao123_image.onload = function() {
			_hao123_image.onload = null;
		};
	    
	},
	//统计点击事件
	click: function( e ) {
		var e = e || window.event,
			op = {type:"click"},
			odom = e.target || e.srcElement || document;
		if ( odom.nodeName.toUpperCase() == "A" ) {
			op.tit = odom.innerText || odom.textContent ;
			op.url = odom.href ;
			UserTrack.send( op );
		}
		
	},
	//缺省配置
	_default: {
		sendurl: "http://www.hao123.com/images/track.gif",
		refer: document.referrer,
		type: "access"
	},
	//不需要发送的查询字符串
	_nosendParam:{
		sendurl: true
	}	
}
