
$.widget('skineditor.fontPicker', {
	options: {
		title:"字体属性",
		disable:false
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//create font picker dom
		if(opt.disable){
			var inputDisable = $("<input class='disable_check' type='checkbox' />").appendTo($elem);
			inputDisable.change(function(){
				opt.onChange(self._getFontObj());
			});
		}
		var header = $("<dt><a href='javascript:void(0)' class='open_btn'>展开</a>"+
						"<a class='colse_btn' href='javascript:void(0)'>收起</a>"+opt.title+"</dt>").appendTo($elem);
		var dd = $("<dd>");
		var table = $("<table class='fontPicker_table'>").appendTo(dd);
		table.append("<tr><td>字号</td> <td><input class='fontPicker_fontsize' type='number'/></td><td></td></tr>");
		table.append("<tr><td colspan='3'><div class='fontPicker_custom_fontcolor'></div></td></tr>");
		table.append("<tr><td colspan='3'><div class='fontPicker_custom_activecolor'></div></td></tr>");

		//table.append("<tr><td>颜色</td>"+
		//				" <td><div class='fontPicker_fontcolor colorPicker'><div></div></div></td>"+
		//				"<td><input class='fontPicker_fontcolor_alpha' type='number' min='0' max='100' value='100' /></td></tr>");
		//table.append("<tr><td>点击的颜色</td> <td><div class='fontPicker_activecolor colorPicker'><div></div></div></td>"+
		//			"<td><input class='fontPicker_activecolor_alpha' type='number' min='0' max='100' value='100' /></td></tr>");
		//table.append("<tr><td>shadowX</td> <td><input class='fontPicker_shadowX' type='number'/></td><td></td></tr>");
		//table.append("<tr><td>shadowY</td> <td><input class='fontPicker_shadowY' type='number'/></td><td></td></tr>");
		//table.append("<tr><td>投影颜色</td> <td><div class='fontPicker_shadowColor colorPicker'><div></div></div></td>"+
		//			"<td><input class='fontPicker_shadowColor_alpha' type='number' min='0' max='100' value='100' /></td></tr>");
		//table.append("<tr><td>radio</td> <td><input class='fontPicker_radio' type='number' min='0' max='5'/></td><td></td></tr>");
		table.append("<tr><td>是否使用阴影</td> <td><input class='fontPicker_shadow' type='checkbox'/></td><td></td></tr>");
		table.append("<tr><td>是否使用字库</td> <td><input class='fontPicker_fontfamily' type='checkbox'/></td><td></td></tr>");

		$elem.append(dd);
		//table.hide();
		//header.click(function(){
		//	table.toggle();
		//});
		header.click(function(){
			$(this).parent("dl").toggleClass("on");
			
		});
		
		table.find(".fontPicker_fontsize").add(table.find(".fontPicker_shadow")).add(table.find(".fontPicker_fontfamily")).change(function(){
			opt.onChange(self._getFontObj());
		});
		
		if(opt.$elem){
			opt.$elem.hover(function(){
				//mouse in
				var hex = $elem.find(".fontPicker_custom_activecolor").customColorPicker("getColor");
				$(this).css("color", self._hex2rgba(hex));
			}, function(){
				//mouse out
				var hex = $elem.find(".fontPicker_custom_fontcolor").customColorPicker("getColor");
				$(this).css("color", self._hex2rgba(hex));
			});
		}
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		/*
			字体属性：
				字号 ——KEY_SIZE = "sz";
				颜色 ——KEY_COLOR = "cl";
				点击时的颜色 ——KEY_COLOR_SELECTED = "cls";
				（投影） shadowX ——KEY_SHADOW_DX = "dx";
				shadowY ——KEY_SHADOW_DY = "dy";
				投影颜色 ——KEY_SHADOW_COLOR = "sc";
				radio ——KEY_RADIO = "r";
				是否使用字库 ——KEY_USE_TYPEFACE = "tf";
		*/
		var defaultFont = {
				"cls":"ffffffff",
				"dx":1,
				"r":1,
				"dy":1,
				"cl":"ffffffff",
				"tf":1,
				"sc":"33000000",
				"sz":8
		};
		var font;
		if(opt.fontObj){
			font = opt.fontObj;
		}else{
			font = defaultFont;
			if(opt.fontSize)
				font.sz = opt.fontSize;
		}
			
		$elem.find(".fontPicker_custom_fontcolor").customColorPicker({
			header:"颜色",
			title:"颜色",
			color:font.cl,
			onChange:function(color){
				opt.onChange(self._getFontObj());
			}
		});
		$elem.find(".fontPicker_custom_activecolor").customColorPicker({
			header:"点击的颜色",
			title:"点击的颜色",
			color:font.cls,
			onChange:function(color){
				opt.onChange(self._getFontObj());
			}
		});
		$elem.find(".fontPicker_fontsize").attr("value", font.sz);
		if(font.r > 0){
			$elem.find(".fontPicker_shadow").attr("checked", true);
		}else{
			$elem.find(".fontPicker_shadow").attr("checked", false);
		}
		$elem.find(".fontPicker_fontfamily").attr("checked", font.tf == 1);
		if(opt.fontObj)
			$elem.find(".disable_check").attr("checked", true);
		else
			$elem.find(".disable_check").attr("checked", false);
	},
	_hex2rgba: function(hex){
		var r = parseInt(hex.substr(2, 2), 16); 
		var g = parseInt(hex.substr(4, 2), 16); 
		var b = parseInt(hex.substr(6, 2), 16); 
		var alpha = parseInt(hex.substr(0, 2), 16);
		return ["rgba","(",r,",",g,",",b,",",alpha/255,")"].join('');
	},
	_formatColor: function(str, type){
		if(type == "rgb")
			return "#" + str.substr(2);
		if(type == "alpha"){
			try{
				var alpha = parseInt(str.substr(0,2), 16);
				return Math.ceil(alpha / 255 * 100);
			}catch(e){
				return 255;
			}
		}
	},
	_decodeColor: function(rgb, alpha){
		var a = parseInt(alpha);
		a = Math.ceil( a / 100 * 255);
		var s = a.toString(16);
		s = s.length==1?"0"+s : s;
		return s + rgb.substr(1);
	},
	getFontObj: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return self._getFontObj();
	},
	_getFontObj: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var font = {};
		font.sz	= $elem.find(".fontPicker_fontsize").attr("value");
		font.cl = $elem.find(".fontPicker_custom_fontcolor").customColorPicker("getColor");
		font.cls = $elem.find(".fontPicker_custom_activecolor").customColorPicker("getColor");
		
		if($elem.find(".fontPicker_shadow").attr("checked") == "checked"){
			font.dx = 1;
			font.dy = 1;
			font.sc = "33000000";
			font.r  = 1;			
		}else{
			font.dx = 0;
			font.dy = 0;
			font.sc = "00000000";
			font.r  = 0;
		}
		
		font.tf = $elem.find(".fontPicker_fontfamily").attr("checked") ? 1 : 0;
		return font;
	},
	getDisableChecked: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return $elem.find(".disable_check").attr("checked") == "checked";
	}

});
