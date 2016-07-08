define([
	'rebuild/base/common'
], function(c) {
	$.widget('mxx.imageUpload', {
		options: {},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			self.type = opt.type;
			self.shouldUploadFile = false;
			if (opt.type == "edit") {
				$elem.append('<a href="javascript:;" class="del_photo"></a><img src="' + opt.image + '"/>');
				self.filename = opt.filename;
			} else {
				var iframeName = opt.iframeName;
				var htmlStr = '<form action="http://v0.api.upyun.com/" method="post" return_url="/upyun/callback.html" ' +
					'enctype="Multipart/form-data" class="upload_form" target="' + iframeName + '">' +
					'<input type="hidden" name="policy"    value="" class="form_policy">' +
					'<input type="hidden" name="signature" value="" class="form_signature">' +
					'<input type="file" multiple="multiple" name="file" class="upload_input" style="" />' +
					'<a href="javascript:;" class="upload_input_link"></a>' +
					'</form>' +
					'<iframe name="' + iframeName + '" style="display:none;"></iframe>';
				$elem.append('<div class="image_block_none"><a href="javascript:;" class="del_photo"></a><img/></div>');
				$elem.append(htmlStr);
				//$elem.hide();
				var input = $elem.find(".upload_input");
				var form = $elem.find(".upload_form");
				self.form = form;
				self.input = input;

				input.change(function() {
					//check file size
					if (!input[0].files) {
						$.alert("您的浏览器不支持图片上传功能，建议您使用chrome,firefox或者双核浏览器的高速模式");
						return;
					}
					for(var i = 0, l = input[0].files.length;i<l;i++){
						var size = input[0].files[i].size;
						if (size > 102400 * 5) {
							$.alert("上传文件大小超过500k，请压缩后重新上传");
							self.shouldUploadFile = false;
							return false;
						}

						var IMG_FILE = /image.*/;
						if ($.support.filereader || !this.files.length) return;
						var file = this.files[i];
						var reader = new FileReader();
						if (IMG_FILE.test(file.type)) {
							reader.onload = function(e) {
								$elem.find("img").attr("src", e.target.result);

								$elem.find(".image_block_none").show();
								$elem.find(".upload_input").hide();
								$elem.find(".upload_input_link").hide();
								$("#image_upload_container").imageCreator("addImageBlock");
								self.type = "add";
								self.shouldUploadFile = true;
								$elem = $elem.next();
							};
							reader.readAsDataURL(file);
						} else {
							$.alert("请上传图片类型的文件");
							self.shouldUploadFile = false;
							return false;
						}

					}
					return;
				});
			}

			$elem.find(".del_photo").click(function() {
				self.type = "delete";
				self.shouldUploadFile = false;
				$elem.hide();
				$("#image_upload_container").imageCreator("deleteImageBlock");
			});
		},
		_init: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
		},
		getShouldUpload: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			return self.shouldUploadFile;
		},
		showFileDialog: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			self.input.trigger("click");
		},
		uploadImage: function(data) {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var index = data.index;
			data = data.data;
			self.form.attr("action", "//v0.api.upyun.com/" + data.bucket)
			self.form.find(".form_policy").val(data.policy);
			self.form.find(".form_signature").val(data.signature);
			self.input[0].files[index].name = data.filename;
			$(self).next().input[0] = self.input[0];
			self.shouldUploadFile = false;
			self.filename = data.filename;
			self.form.submit();
		},
		getFilename: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			return {
				filename: self.filename,
				type: self.type,
				shouldUploadFile: self.shouldUploadFile
			};
		}
	});

	$.widget('mxx.imageCreator', {
		options: {},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var tmpl = '<div class="add_photo_content"><ul id="image_upload_container_ul"></ul><p id="image_upload_tip">共0张，还能上传9张</p></div>';
			$elem.html(tmpl);
			/*
			$elem.draggable({
				containment: 'body',
				handle: 'h2',
				cancel: 'a',
				cursor: "move",
				opacity: 0.85
			});
			*/
			$elem.find('a.js_close').click(function() {
				$elem.hide('fade');
			});
			self.saveSchedule = opt.saveSchedule;
		},
		_init: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			self.newImageIndex = 0;
			self.imageCount = 0;
			var container = $elem.find("#image_upload_container_ul");
			container.empty();
			if (opt.pics) {
				for (var i in opt.pics) {
					var item = opt.pics[i];
					var li = $('<li class="image_block"></li>').appendTo(container);
					li.imageUpload({
						image: opt.pic_url + item.pic,
						type: "edit",
						filename: item.pic
					});
				}
				self.imageCount = opt.pics.length;
			}
			// container.append('<li class="add_photo_btn"><a href="javascript:;" class="add_photo_link"></a></li>');
			self.addImageBlock();
			// container.find(".add_photo_link").click(function() {
			// 	self.currentImage.imageUpload("showFileDialog");
			// });
			//$elem.hide();
		},
		addImageBlock: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var container = $elem.find("#image_upload_container");
			self.currentImage = $('<li class="image_block"></li>');
			self.currentImage.imageUpload({
				type: "none",
				iframeName: "image_upload_form_" + self.newImageIndex,
				self: self.currentImage
			});
			self.newImageIndex++;
			self.imageCount++;
			$elem.find("#image_upload_container_ul").append(self.currentImage);

			if (self.imageCount == 10) {
				self.currentImage.hide();
			}
			self._showCount();
		},
		deleteImageBlock: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			self.imageCount--;
			if (self.imageCount < 10) {
				self.currentImage.show();
			}

			self._showCount();
		},
		_showCount: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var count = self.imageCount - 1;
			var countdown = 10 - self.imageCount;
			$elem.find("#image_upload_tip").html("共" + count + "张，还能上传" + countdown + "张");
		},
		show: function(top) {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			$elem.show().css({
				left: "650px",
				top: top + "px"
			});
		},
		shouldUploadImage: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var imageBlocks = $elem.find(".image_block");
			for (var i = 0; i < imageBlocks.length; i++) {
				var block = imageBlocks.eq(i);
				if (block.imageUpload("getShouldUpload")) {
					return true;
				}
			}
			return false;
		},
		uploadImage: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var imageBlocks = $elem.find(".image_block");
			self.shouldUploadBlocks = [];
			self.callbackCount = 0;
			for (var i = 0; i < imageBlocks.length; i++) {
				var block = imageBlocks.eq(i);
				//if (block.imageUpload("getShouldUpload")) {
				if(block.children('form').length>0 && block.find('.upload_input').css('display')=='none'){
					self.shouldUploadBlocks.push(block);
				}
			}

			if (self.shouldUploadBlocks.length > 0) {
				$.ajax({
					url: "/schedule/signatures.do",
					type: "post",
					data: {
						fileCount: self.shouldUploadBlocks.length
					},
					dataType: "json",
					success: function(data) {
						for (var i in data.signatures) {
							self.shouldUploadBlocks[i].imageUpload("uploadImage", {data: data.signatures[i],index: i});
						}
					}
				});
			}
		},
		getImageList: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var imageBlocks = $elem.find(".image_block");
			var imageList = [];
			var sequence = 1;
			for (var i = 0; i < imageBlocks.length; i++) {
				var block = imageBlocks.eq(i);
				var item = block.imageUpload("getFilename");
				if (item.type != "delete" && item.type != "none" && !item.shouldUploadFile) {
					imageList.push({
						pic: item.filename,
						sequence: sequence++,
						source: "schedule_pics"
					});
				}
			}
			return imageList;
		},
		imageUploadCallback: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			self.callbackCount++;
			if (self.callbackCount == self.shouldUploadBlocks.length) {
				self.saveSchedule();
			}
		}
	});

	window.upyun_callback = function(code, msg, url) {
		if (code == "200" && msg == "ok") {
			//上传图片成功
			$("#image_upload_container").imageCreator("imageUploadCallback");
		} else {
			//上传图片失败 后续交互
			$.alert('上传图片失败');
		}
	};
})
