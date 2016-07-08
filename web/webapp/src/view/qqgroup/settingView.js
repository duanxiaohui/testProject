define(function(require,exports, module) {
	var $calendar = require("../../server/calendar");
	var $util = require("../../common/util");
	var self = {};
	module.exports = self;
	
	var container = $(".setting_view");
	var containerHtml = '<div class="permission_box">' +
							'<div class="permission_box_left"><h2>权限设置</h2><ul><li class="edit_permission_tab on">编辑组</li><li class="read_permission_tab">普通成员</li></ul></div>' +
							'<div class="permission_box_right">' +
								'<div class="edit_permission_box">' + 
									'<h2>编辑组</h2>' +
									'<p>成员第一次使用日历自动进入编辑组，能添加日程。可以将成员移除，成为普通成员，只能查看</p>' +
									'<div class="manipulate_box"><a href="javascript:;" class="remove_btn">移除编辑组</a><a href="javascript:;" class="select_btn" sel="edit">全选</a><div class="manipulate_result"><span class="edit_summary">已选择0人</span><a href="javascript:;" class="cancel_select" sel="edit">取消选择</a></div></div>' +
									'<ul class="edit_permission_ul"></ul>' +
								'</div>' +
								'<div class="read_permission_box">'+
									'<h2>普通成员</h2>' +
									'<p>普通成员只能查看，可以添加到编辑组，拥有编辑权限</p>' +
									'<div class="manipulate_box"><a href="javascript:;" class="add_edit_per">添加到编辑组</a><a href="javascript:;" class="select_btn" sel="read">全选</a><div class="manipulate_result"><span class="read_summary">已选择0人</span><a href="javascript:;" class="cancel_select" sel="read">取消选择</a></div></div>' +
									'<ul class="read_permission_ul"></ul>' +								
								'</div>' +
							'</div>' +
						'</div>';
	var templateLi = "<li class='user_item e_clear' uid='{user_id}' access_type='{access_type}'><img src='{head}' /><span>{user_name}</span></li>";
	function init(){
		container.html(containerHtml);
		container.find(".permission_box_left li").click(function(){
			if($(this).hasClass("on")){
				return;
			}
			container.find(".permission_box_left li.on").removeClass("on");
			$(this).addClass("on");
			if($(this).hasClass("edit_permission_tab")){
				container.find(".edit_permission_box").show();
				container.find(".read_permission_box").hide();
				container.find(".edit_permission_ul").jScrollPane();
			}else{
				container.find(".edit_permission_box").hide();
				container.find(".read_permission_box").show();
				container.find(".read_permission_ul").jScrollPane();
			}
		});
		//全选
		container.find(".select_btn").click(function(){
			var sel = $(this).attr("sel");
			var $li = container.find("." + sel + "_permission_ul li");
			$li.addClass("on");
			
			container.find("."+ sel +"_summary").html("已选择"+$li.length+"人");
		});
		//取消选择
		container.find(".cancel_select").click(function(){
			var sel = $(this).attr("sel");
			var $li = container.find("." + sel + "_permission_ul li");
			$li.removeClass("on");
			container.find("."+ sel +"_summary").html("已选择0人");

		});
		//移除
		container.find(".remove_btn").click(function(){
			var $li = container.find(".edit_permission_ul li.on");
			if($li.length == 0){
				$.alert("请至少选择一个用户");
				return;
			}
			$.confirm('确定移除已选择的用户出编辑组？', {
				buttons: [{
					text: "移除",
					click: function(){
						userPermissionChanged("edit", $li, this);						
					}
				}, {
					text: "取消",
					click: function(){
						$(this).dialog("close");
					}
				}]
			});
		});
		//添加到编辑组
		container.find(".add_edit_per").click(function(){
			var $li = container.find(".read_permission_ul li.on");
			if($li.length == 0){
				$.alert("请至少选择一个用户");
				return;
			}
			$.confirm('确定添加已选择的用户到编辑组？', {
				buttons: [{
					text: "添加",
					click: function(){
						userPermissionChanged("read", $li, this);
					}
				}, {
					text: "取消",
					click: function(){
						$(this).dialog("close");
					}
				}]
			});
		});
	}
	
	function userPermissionChanged(type, $li, dialog){
		var userList = $.map($li, function(o, i){
			return $(o).attr("uid");
		});
		var sel = type;
		var op_sel = type == "edit" ? "read" : "edit";
		$calendar.adjustUserType(self.groupOpenID, type == "edit" ? 1 : 2, JSON.stringify(userList), function(data){
			$li.remove();
			$li.removeClass("on");
			if(container.find("."+op_sel+"_permission_ul .jspPane").length > 0){
				container.find("."+op_sel+"_permission_ul .jspPane").append($li);
			}else{
				container.find("."+op_sel+"_permission_ul").append($li);
			}
			$li.click(onUserItemClicked);
			container.find("."+sel+"_summary").html("已选择0人");
			container.find("."+sel+"_permission_ul").jScrollPane();
			$(dialog).dialog("close");

		});
	}
	
	
	var shouldLoadData = true;
	function render(cid, groupOpenID){
		self.groupOpenID = groupOpenID;
		container.show();
		if(shouldLoadData){
			loadData(cid, groupOpenID);
			shouldLoadData = false;
		}
	}
	
	function loadData(cid, groupOpenID){
		$calendar.getQqunUserList(groupOpenID, cid, function(data){
			self.editPermission = [];
			self.readPermission = [];
			$.each(data.list, function(i, o){
				if(o.access_type == 2){
					self.editPermission.push(o);
				}else{
					self.readPermission.push(o);
				}
			});
			
			container.find(".edit_permission_ul").html($util.format(templateLi, self.editPermission));
			container.find(".read_permission_ul").html($util.format(templateLi, self.readPermission));
			container.find(".edit_permission_ul").jScrollPane();
			summary();
			container.find(".edit_permission_ul li").add(container.find(".read_permission_ul li")).click(onUserItemClicked);
		});
	}
	
	function onUserItemClicked(){
		$(this).toggleClass("on");
		summary();
	}
	
	
	function summary(){
		var edit_len = container.find(".edit_permission_ul li.on").length;
		var read_len = container.find(".read_permission_ul li.on").length;
		container.find(".edit_summary").html("已选择"+edit_len+"人");
		container.find(".read_summary").html("已选择"+read_len+"人");
	}
	
	function hide(){
		container.hide();
	}
	
	self.init = init;
	self.render = render;
	self.hide = hide;
});