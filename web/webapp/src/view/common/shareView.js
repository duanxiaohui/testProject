/*
 * shareView.js
 */
define(function(require, exports, module) {
	var $share = require('../../server/share');
	//var $progressDialog = require('./progressDialogView');
	
	var self = {};
	module.exports = self;
	function showShareView(data, pic){
		if(!self.container){
			self.container = $("<div class='share_dialog none'></div>").appendTo("body");
			self.$mask = $('<div style="z-index: 500;width: 100%;height: 100%;overflow: hidden;-webkit-user-select: none;" class="ui-widget-overlay none"></div>').appendTo('body');
		}
		var url = ["http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey", 
		           "?url=", encodeURIComponent(data.url), 
		           "&title=", encodeURIComponent(data.title),
		           "&summary=", encodeURIComponent(data.desc),
		           "&pics=", encodeURIComponent(pic),
		           "&site=", "365日历"].join("");
		self.container.html("<a href='"+url+"' target='_blank'>点击此处分享</a>")
		self.$mask.css("height", document.body.scrollHeight + "px").show('fade');
		self.container.show('fade');
		
		self.container.find("a").click(function(){
			self.container.hide();
			self.$mask.hide();
		})
	}
	
	function shareSchedule(cid, uuid, d1, d2, pic){
		//$progressDialog.show("正在生成分享链接");
		$share.getScheuleShareUrl(cid, uuid, d1, d2, "QQ", function(data){
			//$progressDialog.close();
			showShareView(data, pic);
		});
	}
	
	function shareCalendar(cid, data, pic){
		//$progressDialog.show("正在生成分享链接");
		$share.getCalendarShareUrl(cid, data, "QQ", function(data){
			//$progressDialog.close();
			showShareView(data, pic);
		});
	}
	
	self.shareSchedule = shareSchedule;
	self.shareCalendar = shareCalendar;
});