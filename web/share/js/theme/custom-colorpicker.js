$.widget('skineditor.customColorPicker', {
	options: {
		title:"颜色",
		type:"normal"
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		if(opt.type == "special"){
			$elem.append('<span class="color_set">色值：</span><div class="colorPicker"><div></div></div>' +
						'<span class="trans">透明度：</span><input class="colorPicker_alpha" type="number" min="0" max="100" value="100" />');
			
		}else{
			//var dt = $("<dt>"+opt.header+"</dt>").appendTo($elem);
			var dd = $("<dd class='e_clear'></dd>").appendTo($elem);
			dd.append("<span class='colorPicker_header_span'>"+opt.header+"</span>");
			dd.append("<div class='colorPicker'><div></div></div>");			
			dd.append("<div class='color_quick_set'><input class='color_quick_set_text' type='text'/></div>");
			dd.append("<span class='trans colorPicker_trans_span'>透明度</span>");
			dd.append("<input class='colorPicker_alpha' type='number' min='0' max='100' value='100' />");
			//dd.hide();	
			//dt.click(function(){
			//	dd.toggle();
			//});
		}
		$elem.find(".colorPicker").each(function(){
			var $colorPicker = $(this);
			$colorPicker.ColorPicker({
				color:"#ffffff",
				onChange: function(hsb, hex, rgb){
					$colorPicker.find("div").css("background-color", "#" + hex);
					$colorPicker.find("div").attr("background-color", "#" + hex);
					$elem.find(".color_quick_set_text").val(hex);
					opt.onChange(self._getColor());
				}
			});
		});
		$elem.find(".colorPicker_alpha").change(function(){
			opt.onChange(self._getColor());
		});
		$elem.find(".color_quick_set_text").change(function(){
			var hex = $(this).val().trim().substring(0,6);
			if(/[a-fA-F0-9]{6}/.test(hex) == false ){
				hex = "000000";
				$.alert("颜色数值输入不正确");
			}
			$(this).val(hex);
			$elem.find(".colorPicker div").css("background-color", "#" + hex);
			$elem.find(".colorPicker div").attr("background-color", "#" + hex);
			$elem.find(".colorPicker").ColorPicker().ColorPickerSetColor("#" + hex);
			opt.onChange(self._getColor());	
		});
		
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;

		if(opt.color){
			var color = opt.color;
			$elem.find(".colorPicker div").css("background-color", self._formatColor(color, "rgb"));
			$elem.find(".colorPicker div").attr("background-color", self._formatColor(color, "rgb"));
			$elem.find(".colorPicker_alpha").attr("value", self._formatColor(color, "alpha"));
			$elem.find(".colorPicker").ColorPicker().ColorPickerSetColor(self._formatColor(color, "rgb"));
			$elem.find(".color_quick_set_text").val(self._formatColor(color, "rgb").substr(1));
		}
	},
	_formatColor: function(str, type){
		if(type == "rgb")
			return "#" + str.substr(2);
		if(type == "alpha"){
			try{
				var alpha = parseInt(str.substr(0,2), 16);
				return Math.ceil(alpha / 255 * 100);
			}catch(e){
				return 100;
			}
		}
	},
	_decodeColor: function(rgb, alpha){
		var a = parseInt(alpha);
		a = Math.ceil( a / 100 * 255);
		var s = a.toString(16);
		s = s.length==1 ? "0" + s : s;
		return s + rgb.substr(1);
	},
	getColor: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return self._getColor();
	},
	_getColor: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return self._decodeColor($elem.find(".colorPicker div").attr("background-color"),$elem.find(".colorPicker_alpha").attr("value"));
	}

});
