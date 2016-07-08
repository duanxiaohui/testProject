/**
 * 日历列表
 * @authors 张路 (veecam@vvedo.com)
 * @date    2014-05-26 16:37:04
 * @version 1.0
 */

define([
	'rebuild/base/common',
	'rebuild/base/solarAndLunar'
], function(c) {
	// console.log("module : user");

	function showLoginInfo() {
		$("#sp_user_info").html(getGreetingText(G.currDate));

		amplify.publish('userInfoShown');
	}

	function getHello(date) {
		var hour = date.getHours(),
			text;
		if (hour < 6) {
			text = "凌晨好，";
		} else if (hour < 9) {
			text = "早上好，";
		} else if (hour < 12) {
			text = "上午好，";
		} else if (hour < 14) {
			text = "中午好，";
		} else if (hour < 17) {
			text = "下午好，";
		} else if (hour < 19) {
			text = "傍晚好，";
		} else if (hour < 22) {
			text = "晚上好，";
		} else {
			text = "深夜好，";
		}
		return text;
	}

	function getGreetingText(date) {
		if (G.needBind) {
			$(".calendar_site").hide();
			return getHello(date) + '<a href="#" class="user_reg_bind" onclick="return openRegBindWin();">注册365日历账号并绑定</a>';
		}
		if(c.isPCVersion()){
			return getHello(date) + (window.G && G.currUser && G.currUser.username);
		}
		var l = lunar(date);
		var username = window.G && G.currUser && G.currUser.username && (G.currUser.username + "，") || "";
		var festival = l.festival();
		var dateStr = "今天是" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日，";
		var lunarDateStr = "农历" + l.lMonth + "月" + l.lDate + "，";
		var text = [getHello(date), username, dateStr, lunarDateStr, "周" + l.cnDay].join("");
		if (festival[0] && festival[0].desc) {
			text += "，";
			text += festival[0].desc;
		}
		return text;
	}

	amplify.subscribe('initApp', showLoginInfo);
})