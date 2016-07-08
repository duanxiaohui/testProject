/*
 * progressDialogView.js
 */
define(function(require, exports, module) {
	var self = {};
	module.exports = self;
	
	self.show = function(title){
		if(!self.dialog){
			self.dialog=$('<div><div class="ui-loading"></div></div>').dialog({
			   closeOnEscape: false,
			   modal:true,
			   autoOpen:false,
			   width:220,
			   height:133,
			   resizable:false
			});	
			self.dialog.parent().find(".ui-dialog-titlebar-close").hide();
		}
		self.dialog.dialog("option", "title", title);
		self.dialog.dialog("open");
		
	}
	
	self.close = function(){
		if(self.dialog){
			self.dialog.dialog("close");
		}
	}
	
});