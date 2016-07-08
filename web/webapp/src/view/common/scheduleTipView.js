/*
**	scheduleTipView
*/
define(function(require, exports, module) {
	var $util	 = require("../../common/util");
	var dateInfo = require("../../model/dateInfo");
	var $shareView = require("./shareView");
	var self = {};
	module.exports = self;
	var tmpl =  '<div class="schedule_tip_content">' +
					'<a href="javascript:;" class="close_btn">关闭</a>' +
					'<p class="schedule_time">{datetime}</p>' +
					'<p class="schedule_lunar_time">{lunartime}</p>' +
					'<div class="image_div"></div>' +
					'<div class="content_div">{content}</div>'+
					'<div class="tip_url_div {url_class}"><span>详细链接：</span><a href="{url}" target="_blank">{url}</a></div>' +
					'<div class="tip_location_div {location_class}"><span>地址：</span><a href="{location_url}" target="_blank">{location_name}</a></div>' +
					'<div class="schedule_bottom">'+
						'<a href="javascript:;" class="js_delete {delete_class}" sid="{sid}">删除</a>'+
						'<a href="javascript:;" sid="{sid}" date={date} class="js_detail {detail_class}">编辑</a>'+
						'<a href="javascript:;" class="js_addnotice {notice_class}" sid="{sid}">添加提醒</a>'+
						'<a href="javascript:;" uuid="{uuid}" cid="{cid}" class="js_share {share_class}">分享</a>'+
					'</div>'+
				'</div>';
	var imageTmpl = '<img src="http://cocoimg.365rili.com/schedule_pics/default/{thumb}" pic="http://cocoimg.365rili.com/schedule_pics/default/{pic}" class="image_item" />';
	self.init = function(callback, addNotice){
		self.$tip = $('<div class="schedule_tip_layer none"></div>').appendTo('body');
		self.$mask = $('<div style="z-index: 500;width: 100%;height: 100%;overflow: hidden;-webkit-user-select: none;" class="ui-widget-overlay"></div>').appendTo('body');
		closeTip();

		self.callback = callback;
		self.$tip.click(function(evt){
			var $lnk = $(evt.target);
			if ($lnk.hasClass('js_delete')) {
				delSchedule($lnk);
			} else if ($lnk.hasClass('close_btn')) {
				closeTip();
			} else if($lnk.hasClass('js_detail')) {
				var sid = $lnk.attr("sid");
				closeTip();
				self.callback.detail(sid);
			} else if($lnk.hasClass('js_share')) {
				var cid = $lnk.attr("cid");
				var uuid = $lnk.attr("uuid");
				var pic;
				var d1 = self.$tip.find(".schedule_time").html();
				var d2 = self.$tip.find(".schedule_lunar_time").html();
				if(self.$tip.find(".image_item").length > 0){
					pic = self.$tip.find(".image_item").eq(0).attr("src");
				}else{
					pic = self.bgu;
				}
				$shareView.shareSchedule(cid, uuid, d1, d2, pic);
			} else if($lnk.hasClass('js_addnotice')){
				callback.addNotice(self.schedule);
			}
		});
	}
	
	
	self.show = function(schedule, access_type, bgu){
		self.bgu = bgu;
		self.schedule = schedule;
		self.$tip.html($util.format(tmpl, packageSchedule(schedule, access_type)));
		if(schedule.pics){
			self.$tip.find(".image_div").html($util.format(imageTmpl, schedule.pics));
			//点击显示大图
			self.$tip.find(".image_item").click(function(){
				var big_image_canvas = $("#big_image_canvas");
				var path = $(this).attr("pic");
				var width = 500;
				var height = 500;
				if(big_image_canvas.length == 0){
					big_image_canvas = $("<div id='big_image_canvas'>").appendTo("body");
				}
				var style = "width:" + (width-50) + "px;height:" + (height-60) + "px;" + "margin:auto;display:block;"
				big_image_canvas.html("<img src='"+path+"' style='"+style+"'/>");
				big_image_canvas.dialog({
					modal:true,
					title:"显示大图",
					width: width,
					height: height
				});
			});
		}
		showTip();
	}
	
	function delSchedule($lnk){
		var sid = $lnk.attr('sid');
		$.confirm('确定要删除这个日程吗？', {
			buttons: [{
				text: "删除",
				click: function(){
					var dialog = this;
					$.getJSON('/schedule/delete.do?scheduleId=' + sid, function(data){
						if (data == true) {
							$(dialog).dialog("close");
							closeTip();
							self.callback.remove(sid);
						} else if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新打开此应用！');
						}
					});
				}
			}, {
				text: "取消",
				click: function(){
					$(this).dialog("close");
				}
			}]
		});
	}

	function packageSchedule(s, access_type){
		var rs = {};
		rs.datetime = s.start_time;
		if(s.allday_event){
			rs.datetime = rs.datetime.split(" ")[0] + " 全天";
		}
		rs.lunartime = dateInfo.getLunartimeForScheduleTip(new Date(s.start_time));
		if(s.url){
			rs.url = s.url;
			rs.url_class = "";
		}else{
			rs.url_class = "none";
		}
		if(s.location){
			if(s.location.indexOf("@") != -1){
				var locationAry = s.location.split("@");
				rs.location_url = "http://api.map.baidu.com/marker?location="+locationAry[1]+"&title="+locationAry[0]+"&content="+locationAry[0]+"&output=html";
				rs.location_name = locationAry[0];
			}else{
				rs.location_url = "http://api.map.baidu.com/geocoder?address="+location+"&output=html&src=365rili";
				rs.location_name = s.location;
			}
		}else{
			rs.location_class = "none";
		}
		rs.content = s.text.replace(/\n/g,'<br/>');
		rs.sid = s.id;
		rs.cid = s.cid;
		rs.uuid = s.uuid;
		if(access_type == 1){
			rs.delete_class = "none";
			rs.detail_class = "none";
			rs.notice_class = "";
			rs.share_class  = "";
		}else if(access_type == 2 || access_type == 3){
			rs.delete_class = "";
			rs.detail_class = "";
			rs.notice_class = "none";
			rs.share_class  = "";			
		}else{
			rs.delete_class = "none";
			rs.detail_class = "none";
			rs.notice_class = "none";
			rs.share_class  = "";
		}
		return rs;
	}
	
	function showTip(){
		self.$tip.show('fade');
		self.$mask.css("height", document.body.scrollHeight + "px").show('fade');
	}
	
	function closeTip(){
		self.$tip.hide('fade');
		self.$mask.hide('fade');
	}
});