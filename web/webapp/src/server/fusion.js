/*
 * fusion.js
 * QQ API 接口
 * require import fusion2
 */
define(function(require, exports, module) {
	var self = {};
	module.exports = self;
	
	self.resize = function(){
		var height = $(".wrapper").height();
		self.setHeight(height);
	}
	self.setHeight = function(height){
		fusion2.canvas.setHeight({height:height});
	}
	
	self.sendObjMsg = function(opengid, data,render){
		fusion2.dialog.sendObjMsg ({
			  opengid  : opengid,
			  data:data,
			  onSuccess : function (opt) {  render(opt); }
		});
	}
});