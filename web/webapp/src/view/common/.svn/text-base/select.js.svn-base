define(function(require, exports, module){
	
	function Select($select){
		var self = this;
		
		self.$select = $select;
		self.fakeSelect = $("<div class='fake_select_wrapper'><span class='fake_select_span'></span><ul class='fake_select_ul'></ul></div>");
		self.title = self.fakeSelect.find(".fake_select_span");
		self.ul = self.fakeSelect.find(".fake_select_ul");
		
		self.$select.find("option").each(function(i, o){
			var value = $(o).val();
			var text  = $(o).html();
			if(self.$select.val() == value){
				self.title.html(text);
			}
			self.ul.append("<li val='"+value+"' style='cursor:pointer;padding:1px;'>"+text+"</li>");
		});
		
		$select.before(self.fakeSelect);
		$select.hide();
		
		//$select.parent().css("position", "relative");
		
		
		self.fakeSelect.css({
			"position":"relative",
			"background": "#fff"
		});
		self.title.css({"cursor":"pointer"});
		self.ul.css({
			"position":"absolute",
			"top":"20px",
			"left":"0px",
			"background":"#fff"
		});
		self.ul.hide();
		self.ul.find("li").click(function(){
			var val = $(this).attr("val");
			var text = $(this).html();
			$select.val(val);
			$select.change();
			self.title.html(text);
			self.ul.hide();
		});
		self.title.click(function(){
			if(self.ul.is(":visible")){
				self.ul.hide();
			}else{
				self.ul.show();				
			}
		})
	}
	
	module.exports = Select;
})