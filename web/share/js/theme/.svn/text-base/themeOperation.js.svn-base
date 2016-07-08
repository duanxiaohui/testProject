$.widget('skineditor.themeUpload', {
	options:{
		type:"pic",
		enableCancel:true
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		var iframeName = $elem.attr("id");
		var htmlStr = '<div class="upload_file">' +
					'<span class="upload_span"></span>' +
					'<a href="###" class="upload_cancel">取消</a>' +
					'</div><a href="###" class="upload_link">上传</a>' +
					'<form action="http://v0.api.upyun.com/" method="post" return_url="/main/callback.html" ' +
					'enctype="Multipart/form-data" class="upload_form" target="'+iframeName+'">' +
					'<input type="hidden" name="policy"    value="" class="form_policy">'+
					'<input type="hidden" name="signature" value="" class="form_signature">' +
					'<input type="file"   name="file" class="upload_input" style="display:none;" /></form>' +
					'<iframe name="'+iframeName+'" style="display:none;"></iframe>';
		$elem.html(htmlStr);
		
		var link  = $elem.find(".upload_link");
		var input = $elem.find(".upload_input");
		var form = $elem.find(".upload_form");
		var cancel = $elem.find(".upload_cancel");
		//是否有尚未上传的文件
		self.shouldUploadFile = false;
		
		self.type = opt.type;
		self.form = form;
		self.input = input;
		
		//点击上传图片
		link.click(function(){
			input.trigger("click");
		});
		input.change(function(){
			//check file size
			var size = input[0].files[0].size;
			if(size > 102400){
				$.alert("上传文件大小超过100k，请压缩后重新上传");
				self.shouldUploadFile = false;
				return false;
			}
			
			
			var IMG_FILE = /image.*/;
			if($.support.filereader || !this.files.length) return;
			var file = this.files[0];
			var reader = new FileReader();
			if(IMG_FILE.test(file.type)){
				reader.onload = function(e){
					//$(".phone_skin").css("background-image", "url("+e.target.result+")");
					//self.data.bgu = e.target.result;
					if(opt.type == "pic"){
						$(".phone_skin").css("background-image", "url("+e.target.result+")");							
					}else if(opt.type == "icon"){
						$(".mu_box").css("background", "url("+e.target.result+") no-repeat bottom left transparent");
						$(".mu_box").css("background-size", "70px");	
					}else if(opt.type == "month"){
						$(".calendar_panel").css("background", "url("+e.target.result+") no-repeat top left transparent");
					}else if(opt.type == "today"){
						$(".today").css("background-image","url("+e.target.result+")");
						$(".today").css("background-repeat","no-repeat");
						$(".today").css("background-position","0% 0%");
					}else if(opt.type == "font"){
						$("style").html("@font-face{font-family:'custom_font';src:url('"+e.target.result+"');}")
					}
				};
				reader.readAsDataURL(file);
			}
			self.shouldUploadFile = true;
			return;
			
		});
		//点击取消
		cancel.click(function(){
			$elem.find(".upload_span").html("");
			opt.cancel();
		});
		if(!opt.enableCancel)
			cancel.hide();
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		if(opt.filename != undefined && opt.path != undefined){
			$elem.find(".upload_span").html("<a href='"+opt.path+"' target='_blank'>"+opt.filename+"</a>");
		}
	},
	updateSpan: function(path, filename){
		var self = this, $elem = $(this.element), opt = this.options;
		$elem.find(".upload_span").html("<a href='"+path+"' target='_blank'>"+filename+"</a>");
		self.shouldUploadFile = false;
	},
	getShouldUpload: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		if(self.shouldUploadFile){
			var url;
			if(self.type === "font")
				url = "/admin/signature4Font.do";
			else
				url = "/admin/signature.do?type=" + self.type;
			$.ajax({
				url:url,
				type:"get",
				dataType:"json",
				success:function(data){
					self.form.attr("action", "http://v0.api.upyun.com/" + data.bucket)
					self.form.find(".form_policy").val(data.policy);
					self.form.find(".form_signature").val(data.signature);
					self.input[0].files[0].name = data.filename;
					self.form.submit();
				}
			});
		}
		return self.shouldUploadFile;
	}
	
});



$.widget('skineditor.themeOperation', {
	options: {
		render:themeRenderObj
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//define private method&data
		self._renderFont = opt.render.renderFont;
		self._hex2rgba = opt.render.hex2rgba;
		self._renderBackgroundColor = opt.render.renderBackgroundColor;
		self._t = opt.render.t;
		self._transferFontSize = opt.render.transferFontSize;
		
		//快速编辑
		$elem.find(".custom_style_edit").click(function(){
			var type = $(this).attr("id");
			var style_data = custom_theme_data[type];
			if(style_data){
				for(var i in style_data){
					self.data[i] = style_data[i]
				}
				self._initFontOperation(self.data);
				self._initColorPicker(self.data);
				$(".phone_area").themePreview({
					skinJson:self.data
				});
			}
		});
		//快速编辑-日程图标
		var iconHtml = "";
		for(var i=1;i<=67;i++){
			var icon_name;
			if(i<10)
				icon_name = "ico_00" + i + ".png";
			else if(i<32)
				icon_name = "ico_0" + i + ".png";
			else
				icon_name = "ico_" + i + ".png";
			iconHtml += "<li style='background:url("+"../images/icons/"+icon_name+") bottom left no-repeat transparent;"+
						"background-size:60px;' icon='"+icon_name+"'></li>"
		}
		$elem.find(".custom_schedule_icon").html(iconHtml);
		$elem.find(".custom_schedule_icon li").click(function(){
			var icon_name = $(this).attr("icon");
			self.data.mu = icon_name;
			var path = "http://cocoimg.365rili.com/icon/" + icon_name;
			$(".mu_box").css("background", "url("+path+") no-repeat bottom left transparent");
			$(".mu_box").css("background-size", "70px");
			self.muFileUpload.themeUpload("updateSpan", path, icon_name);
		});
		
		//自定义编辑 折叠编辑区域
		/*
		$elem.find("#edit_font .edit_header").click(function(){
			$elem.find("#edit_font .edit_content").toggle();
		});
		$elem.find("#edit_color .edit_header").click(function(){
			$elem.find("#edit_color .edit_content").toggle();
		});
		$elem.find("#edit_optional .edit_header").click(function(){
			$elem.find("#edit_optional .edit_content").toggle();
		});
		*/
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.data = opt.themeObj;
		//init operation area
		self._initUpload();
		self._initFontSelect()
		self._initFontOperation(self.data);
		self._initColorPicker(self.data);
		self._initOptional(self.data);		
		
	},
	_initFontSelect: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var fontOptionStr = "young.ttf,yingxiao.ttf,yangsheng.ttf,xianqing.ttf,web.ttf,time.ttf,tennis.ttf,show.ttf,pottery.ttf," +
							"photo_old.ttf,photo.ttf,nba.ttf,nai.ttf,kaoshi.ttf,immigrant.ttf,health.ttf,guoke.ttf," +
							"girl.ttf,eye.ttf,dark.ttf,crazy.ttf,biz.ttf,bay.ttf,Soccer.ttf,Show.ttf,Race.ttf,MOVIE.ttf,Health.ttf," +
							"GOLF.ttf,Eye.ttf,Doggy.ttf,monalisa.ttf,birthday.ttf,perform.ttf";
		var font_select = $elem.find("#fontFile_select");
		var fontOptionAry = fontOptionStr.split(",");
		var optionHtml = $.map(fontOptionAry, function(val, i){
			return "<option>"+val+"</option>";
		});
		font_select.html("<option>默认字体</option>" + optionHtml);
		if(self.data.tf){
			var fontName = self.data.tf;
			fontName = fontName.substr(fontName.lastIndexOf("/") + 1);
			font_select.val(fontName);
		}
		font_select.change(function(){
			var select_val = $(this).val();
			if(select_val == "默认字体"){
				self.data.tf = "";
				$("style").html("");
			}else{
				self.data.tf = "http://d2.365rili.com/coco/" + select_val;
				$("style").html("@font-face{font-family:'custom_font';src:url('"+self.data.tf+"');}")
			}
		});
	},
	_initUpload: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.bgFileUpload = $elem.find("#backgroundFile_upload");
		self.muFileUpload = $elem.find("#muFile_upload");
		self.monthFileUpload = $elem.find("#monthFile_upload");
		self.todayFileUpload = $elem.find("#todayFile_upload");
		
		self.bgFileUpload.themeUpload({
			type:"pic",
			filename:self.data.bgu,
			path:upyunPath.bgu + self.data.bgu,
			enableCancel: false,
			cancel:function(){
				self.data.bgu = "";
				$(".phone_skin").css("background-image", "");
			}
		});
		/*
		var fontName = self.data.tf;
		fontName = fontName.substr(fontName.lastIndexOf("/") + 1);
		$elem.find("#fontFile_upload").themeUpload({
			type:"font",
			filename:fontName,
			path:self.data.tf,
			cancel:function(){
				self.data.tf = "";
				$("style").html("");
			}
		});
		*/
		self.muFileUpload.themeUpload({
			type:"icon",
			filename:self.data.mu,
			path:upyunPath.mu + self.data.mu,
			cancel:function(){
				self.data.mu = "";
				$(".mu_box").css("background-image", "");
			}
		});
		self.monthFileUpload.themeUpload({
			type:"month",
			filename:self.data.mbu,
			path:upyunPath.mbu + self.data.mbu,
			cancel:function(){
				self.data.mbu = "";
				$(".calendar_panel").css("background-image", "");
			}
		});
		self.todayFileUpload.themeUpload({
			type:"today",
			filename:self.data.tbu,
			path:upyunPath.tbu + self.data.tbu,
			cancel:function(){
				self.data.tbu = "";
				$(".today").css("background-image", "");
			}
		});
	},
	_initFontOperation: function(skinJson){
		var self = this, $elem = $(this.element), opt = this.options;
		/*********************
		*** 字体属性
		**********************/
		var fontFamily;
		if(skinJson.tf)
			fontFamily = "custom_font";
			//fontFamily = skinJson.tf.substring(skinJson.tf.lastIndexOf("/") + 1, skinJson.tf.lastIndexOf("."));
		
		//日历名：字体属性 ——KEY_NAME_TEXT = "nt";
		$("#font_picker_nt").fontPicker({
			title:"日历名称",
			fontObj:skinJson.nt,
			$elem:$(".phone_header_title"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".phone_header_title"));
				self.data.nt = fontObj;
			}
		});
		//日历描述：字体属性 ——KEY_DESCRIPTION_TEXT = "dt";
		$("#font_picker_dt").fontPicker({
			title:"日历描述",
			fontObj:skinJson.dt,
			$elem:$(".phone_header_desc"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".phone_header_desc"));
				self.data.dt = fontObj;
			}
		});
		//年月：字体属性 ——KEY_YEAR_AND_MONTH_TEXT = "ynm";
		$("#font_picker_ynm").fontPicker({
			title:"年月",
			fontObj:skinJson.ynm,
			$elem:$(".calendar_header_year_month"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".calendar_header_year_month"));
				self.data.ynm = fontObj;
			}
		});
		//周（工作日）：字体属性 ——KEY_WEEK_WEEKDAY_TEXT = "wdt";
		$("#font_picker_wdt").fontPicker({
			title:"周（工作日）",
			fontObj:skinJson.wdt,
			$elem:$(".workday"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".workday"));
				self.data.wdt = fontObj;
			}
		});
		//周（周末）：字体属性 ——KEY_WEEK_WEEKAND_TEXT = "wkt";
		$("#font_picker_wkt").fontPicker({
			title:"周（周末）",
			fontObj:skinJson.wkt,
			$elem:$(".weekend"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".weekend"));
				self.data.wkt = fontObj;
			}
		});
		//日期（工作日）：字体属性 ——KEY_DATE_WEEKDAY_TEXT = "ddt";
		$("#font_picker_ddt").fontPicker({
			title:"日期（工作日）",
			fontObj:skinJson.ddt,
			$elem:$(".daybox_workday"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".daybox_workday"));
				self.data.ddt = fontObj;
			}
		});
		//日期（周末）：字体属性 ——KEY_DATE_WEEKAND_TEXT = "dkt";
		$("#font_picker_dkt").fontPicker({
			title:"日期（周末）",
			fontObj:skinJson.dkt,
			$elem:$(".daybox_weekend"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".daybox_weekend"));
				self.data.dkt = fontObj;
			}
		});
		
		//设置的图标：字体属性，自定义字体库 ——KEY_SETUP_TEXT = "st";
		$("#font_picker_st").fontPicker({
			title:"设置的图标",
			fontObj:skinJson.st,
			$elem:$(".phone_header_menu"),
			onChange:function(fontObj){	
				self._renderFont(fontObj, fontFamily, $(".phone_header_menu"));
				self.data.st = fontObj;
			}
		});
		//日期（今日）：字体属性 ——KEY_DATE_TODAY_TEXT = "tdt";
		$("#font_picker_tdt").fontPicker({
			title:"日期（今日）",
			fontObj:skinJson.tdt,
			//$elem:$(".daybox_today"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".daybox_today"));
				self.data.tdt = fontObj;
			}
		});
		//分享的图标：字体属性，自定义字体库 ——KEY_SHARE_TEXT = "sr";
		$("#font_picker_sr").fontPicker({
			title:"分享的图标",
			fontObj:skinJson.sr,
			$elem:$(".calendar_header_link"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".calendar_header_link"));
				self.data.sr = fontObj;
			}
		});
		//编辑的图标：字体属性，自定义字体库 ——KEY_EDIT_TEXT = "et";
		$("#font_picker_et").fontPicker({
			title:"编辑的图标",
			fontObj:skinJson.et,
			$elem:$(".calendar_header_edit"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".calendar_header_edit"));
				self.data.et = fontObj;
			}
		});

		//日程字体：字体属性 ——KEY_SCHEDULE_TEXT = "sct";
		$("#font_picker_sct").fontPicker({
			title:"日程字体",
			fontObj:skinJson.sct,
			$elem:$(".phone_activity_row"),
			onChange:function(fontObj){
				self._renderFont(fontObj, fontFamily, $(".phone_activity_row"));
				self.data.sct = fontObj;
			}
		});
	},
	_initColorPicker: function(skinJson){
		var self = this, $elem = $(this.element), opt = this.options;
		//背景颜色：string ——KEY_BACKGROUND_COLOR = "bgc";
		$("#colorpicker_bgc").customColorPicker({
			color:skinJson.bgc,
			type:"special",
			onChange:function(color){
				self._renderBackgroundColor(color, $(".phone_skin"));
				self.data.bgc = color;
			}
		});
		//格子背景颜色（周、工作日）：string ——KEY_WEEK_WEEKDAY_BG = "wdb";
		$("#colorpicker_wdb").customColorPicker({
			header:"周(工作日)",
			title:"格子背景颜色",
			color:skinJson.wdb,
			onChange:function(color){
				self._renderBackgroundColor(color, $(".workday"));
				self.data.wdb = color;
			}
		});
		//格子背景颜色（周、周末）：string ——KEY_WEEK_WEEKAND_BG = "wkb";
		$("#colorpicker_wkb").customColorPicker({
			header:"周(周末)",
			title:"格子背景颜色",
			color:skinJson.wkb,
			onChange:function(color){
				self._renderBackgroundColor(color, $(".weekend"));
				self.data.wkb = color;
			}
		});
		//格子背景颜色（日期、工作日）：string ——KEY_DATE_WEEKDAY_BG = "ddb";
		$("#colorpicker_ddb").customColorPicker({
			header:"日期（工作日）",
			title:"格子背景颜色",
			color:skinJson.ddb,
			onChange:function(color){
				self._renderBackgroundColor(color, $(".td_workday"));
				self.data.ddb = color;
			}
		});
		//格子背景颜色（日期、周末）：string ——KEY_DATE_WEEKAND_BG = "dkb";
		$("#colorpicker_dkb").customColorPicker({
			header:"日期（周末）",
			title:"格子背景颜色",
			color:skinJson.dkb,
			onChange:function(color){
				self._renderBackgroundColor(color, $(".td_weekend"));
				self.data.dkb = color;
			}
		});
		//格子背景颜色（今天）：string ——KEY_TODAY_BG = "tdb";
		$("#colorpicker_tdb").customColorPicker({
			header:"今天",
			title:"格子背景颜色",
			color:skinJson.tdb,
			onChange:function(color){
				self._renderBackgroundColor(color, $(".today"));
				self.data.tdb = color;
			}
		});
		//格子背景颜色（点击）：string ——KEY_DATE_SELECTED_BG = "dsb";
		$("#colorpicker_dsb").customColorPicker({
			header:"点击",
			title:"格子背景颜色",
			color:skinJson.dsb,
			onChange:function(color){
				self._renderBackgroundColor(color, $(".calendar_table .select"));
				self.data.dsb = color;
			}
		});

		//格子划线颜色：string ——KEY_LINE = "l";
		$("#colorpicker_l").customColorPicker({
			header:"格子",
			title:"格子划线颜色",
			color:skinJson.l,
			onChange:function(color){
				$(".day_box").css("border-color", self._hex2rgba(color));
				self.data.l = color;
			}
		});
		//日程背景颜色：string（可以是多个颜色，逗号分隔，如"111111,222222"）——KEY_SCHEDULE_BG = "sb";
		$("#colorpicker_sb").customColorPicker({
			header:"日程",
			title:"日程背景颜色",
			color:skinJson.sb,
			onChange:function(color){
				self._renderBackgroundColor(color, $(".phone_activity_row"));
				self.data.sb = color;
			}
		});
		
		//日程背景颜色：string（可以是多个颜色，逗号分隔，如"111111,222222"）——KEY_SCHEDULE_BG = "sb";

		//日程点击的颜色
		var default_select = $($(".day_box")[16]);
		var current_background_color = default_select.css("background-color");
		var hex = $("#colorpicker_dsb").customColorPicker("getColor");
		default_select.addClass("select").css("background-color", self._hex2rgba(hex));
		$(".calendar_table td").click(function(){
			$(".calendar_table .select").removeClass("select").css("background-color", current_background_color);
			current_background_color = $(this).css("background-color");
			var hex = $("#colorpicker_dsb").customColorPicker("getColor");
			$(this).addClass("select").css("background-color", self._hex2rgba(hex));
		});

	},
	_initOptional: function(skinJson){
		var self = this, $elem = $(this.element), opt = this.options;
		var fontFamily;
		if(skinJson.tf)
			fontFamily = "custom_font";


		//农历（工作日）：字体属性 ——KEY_LUNAR_WEEKDAY_TEXT = "ldt";
		$("#font_picker_ldt").fontPicker({
			title:"农历（工作日）",
			disable:true,
			fontObj:skinJson.ldt,
			$elem:$(".td_workday .lunar_normal"),
			onChange:function(fontObj){
				if($("#font_picker_ldt").fontPicker("getDisableChecked")){
					$(".td_workday .lunar_normal").show();
					self._renderFont(fontObj, fontFamily, $(".td_workday .lunar_normal"));
					self.data.ldt = fontObj;
				}else{
					$(".td_workday .lunar_normal").hide();
					delete self.data.ldt;
				}
			}
		});
		//农历（周末）：字体属性 ——KEY_LUNAR_WEEKAND_TEXT = "lkt";
		$("#font_picker_lkt").fontPicker({
			title:"农历（周末）",
			disable:true,
			fontObj:skinJson.lkt,
			$elem:$(".td_weekend .lunar_normal"),
			onChange:function(fontObj){
				if($("#font_picker_lkt").fontPicker("getDisableChecked")){
					$(".td_weekend .lunar_normal").show();
					self._renderFont(fontObj, fontFamily, $(".td_weekend .lunar_normal"));
					self.data.lkt = fontObj;
				}else{
					$(".td_weekend .lunar_normal").hide();
					delete self.data.lkt;
				}
			}
		});
		
		//农历（今日）：字体属性 ——KEY_LUNAR_TODAY_TEXT = "ltt";
		$("#font_picker_ltt").fontPicker({
			title:"农历（今日）",
			disable:true,
			fontObj:skinJson.ltt,
			$elem:$(".lunar_today"),
			onChange:function(fontObj){
				if($("#font_picker_ltt").fontPicker("getDisableChecked")){
					$(".lunar_today").show();
					self._renderFont(fontObj, fontFamily, $(".lunar_today"));
					self.data.ltt = fontObj;
				}else{
					$(".lunar_today").hide();
					delete self.data.ltt;
				}
			}
		});
		
		//农历（特殊日）：字体属性 ——KEY_LUNAR_SPECIAL_TEXT = "lst";
		$("#font_picker_lst").fontPicker({
			title:"农历（特殊日）",
			disable:true,
			fontObj:skinJson.lst,
			$elem:$(".lunar_special"),
			onChange:function(fontObj){
				if($("#font_picker_lst").fontPicker("getDisableChecked")){
					$(".lunar_special").show();
					self._renderFont(fontObj, fontFamily, $(".lunar_special"));
					self.data.lst = fontObj;
				}else{
					$(".lunar_special").hide();
					delete self.data.lst;
				}
			}
		});
	},
	_initOperationListerner: function(skinJson){
		var self = this, $elem = $(this.element), opt = this.options;
		//init draggable and scale background page
		var original_position = undefined;
		$(".phone_skin").mousemove(function(e){
			if(e.which == 1){
				if(!original_position){
					var pos = $(".phone_skin").css("background-position");
					var x = pos.split(" ")[0].replace("px","");
					x = parseInt(x);
					var y = pos.split(" ")[1].replace("px","");
					y = parseInt(y);
					original_position = {};
					original_position.pageX = e.pageX - x ;
					original_position.pageY = e.pageY - y;
				}else{
					var offsetX = e.pageX - original_position.pageX;
					var offsetY = e.pageY - original_position.pageY;
					$(".phone_skin").css("background-position", offsetX+"px " + offsetY +"px");
				}
				//e.pageX e.pageY
			}else if(e.which == 0 && original_position){
				original_position = undefined;
			}
		});
		
		$("#slider").slider({
			orientation: "vertical",
			range: "min",
			min: 1,
			max: 200,
			value: 50,
			slide: function( event, ui ) {
				if(ui.value > 50){
					var size = Math.floor(480 * ui.value / 50);
					$(".phone_skin").css("background-size", size + "px");
				}else if(ui.value == 50){
					$(".phone_skin").css("background-size", "480px");
				}else{
					var size = Math.floor(480 * ui.value / 50);
					$(".phone_skin").css("background-size", size + "px");
				}
			}
	    });
	},
	shouldUploadFiles: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//需要判断是否需要上传
		self.shouldUploadFilesAry = [];
		if(self.bgFileUpload.themeUpload("getShouldUpload"))
			self.shouldUploadFilesAry.push("bgFile");
		if(self.monthFileUpload.themeUpload("getShouldUpload"))
			self.shouldUploadFilesAry.push("monthFile");
		if(self.muFileUpload.themeUpload("getShouldUpload"))
			self.shouldUploadFilesAry.push("muFile");
		if(self.todayFileUpload.themeUpload("getShouldUpload"))
			self.shouldUploadFilesAry.push("todayFile");
		return self.shouldUploadFilesAry.length != 0;
	},
	getData: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		for(var key in self.data){
			if(self.data[key] == "")
				delete self.data[key];
		}
		return self.data;
	},
	fileUploadCallback: function(url){
		var self = this, $elem = $(this.element), opt = this.options;
		var host = "http://cocoimg.365rili.com";
		var filename = url.substr(url.lastIndexOf("/")+1);
		var index = 0;
		if(url.indexOf("pic") > -1){
			//背景图片
			self.data.bgu = filename;
			var path = host + url;
			//$(".phone_skin").css("background-image", "url("+path+")");
			$("#backgroundFile_upload").themeUpload("updateSpan", path, filename);
			index = self.shouldUploadFilesAry.indexOf("bgFile");
		}else if(url.indexOf("icon") > -1){ 
			//icon
			self.data.mu = filename;
			var path = host + url;
			//$(".mu_box").css("background", "url("+path+") no-repeat bottom left transparent");
			//$(".mu_box").css("background-size", "70px");
			$("#muFile_upload").themeUpload("updateSpan", path, filename);
			index = self.shouldUploadFilesAry.indexOf("muFile");
		}else if(url.indexOf("month") > -1){
			//month
			self.data.mbu = filename;
			var path = host + url;
			//$(".calendar_panel").css("background", "url("+path+") no-repeat top left transparent");
			$("#monthFile_upload").themeUpload("updateSpan", path, filename);
			index = self.shouldUploadFilesAry.indexOf("monthFile");
		}else if(url.indexOf("today") > -1){
			//today
			var path = host + url;
			//$(".today").css("background-image", "url("+path+")");
			//$(".today").css("background-repeat", "no-repeat");
			//$(".today").css("background-position", "0% 0%");
			self.data.tbu = filename;
			$("#todayFile_upload").themeUpload("updateSpan", path, filename);
			index = self.shouldUploadFilesAry.indexOf("todayFile");
		}else if(url.indexOf("coco") > -1){
			//font
			self.data.tf = "http://d2.365rili.com/coco/" + filename;
			$("style").html("@font-face{font-family:'custom_font';src:url('"+self.data.tf+"');}")
			$("#fontFile_upload").themeUpload("updateSpan", self.data.tf, filename);
		}
		if(index != -1)
			self.shouldUploadFilesAry.splice(index, 1);
		if(self.shouldUploadFilesAry.length == 0){
			setCalendarTheme();
		}
	}
});

