/**
 * create
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-26 14:24:35
 */

(function() {
    var _data = {
        setup: 0,
        type: 'company'
    };

    function gotoSetup(setup) {
        var nextSetup = $('#js-setup_' + setup);

        //检测是否最后一步
        if (nextSetup.length === 0) {
            return saveData();
        }

        //验证上一步骤合法性
        checkSetup(setup - 1);

        //如果不合法则退回上一步，合法则_data.setup自动更新
        if (_data.setup != setup) {
            return window.location.hash = _data.setup;
        }

        //更新视图
        $('.setup').addClass('none');
        nextSetup.removeClass('none');

        //更新步骤
        $('#js-setup-index').removeClass('setup_1 setup_2 setup_3 setup_4').addClass('setup_' + setup);
    }

    function checkSetup(setup) {
    	setup = setup || _data.setup;
        var result = false;
        switch (setup) {
            case 0:
                result = true;
                break;
            case 1:
                result = setup1();
                break;
            case 2:
                result = setup2();
                break;
            case 3:
                result = setup3();
                break;
            case 4:
                result = setup4();
                break;
        }

        _data.setup = result ? setup + 1 : setup;
    }

    function saveData() {
        console.log('save data');
    }

    //公司名称
    function checkCompanyName () {
    	var company = $('#companyName');
        _data.companyName = company.val();
        if (_data.companyName == '') {
        	company.removeClass('suc').addClass('error');
            return false;
        }
        company.removeClass('error').addClass('suc');
        return true;
    }

    //联系人
    function checkContact () {
    	var contact = $('#contact');
        _data.contact = contact.val();
        if (_data.contact == '') {
        	contact.removeClass('suc').addClass('error');
            return false;
        }
        contact.removeClass('error').addClass('suc');
        return true;
    }
    //身份证验证
    function checkIdCard () {
    	var idCard = $('#idCard');
        _data.idCard = idCard.val();
        if (!checkIdCardRull(idCard.val())) {
        	idCard.removeClass('suc').addClass('error');
            return false;
        }
        idCard.removeClass('error').addClass('suc');
        return true;
    }

    //身份证号规则验证
    function checkIdCardRull(pid) { 
        var status = false;
        if (pid.length == 15) {
            if (pid.search(/^[1-9]\d{7}((0[1-9])|(1[0-2]))(([012]\d)|3[0-1])\d{3}$/) != -1) {
                status = true;
            } else {
                status = false;
            }
        } else if (pid.length == 18) {
            if (pid.search(/^[1-9]\d{5}[1-2]\d{3}((0[1-9])|(1[0-2]))(([012]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/) != -1) {
                var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
                var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
                var mod = 11;
                var max = 0;
                for (var i = 0; i < 17; i++) {
                    max = parseInt(pid.charAt(i)) * parseInt(powers[i]) + max;
                }
                mod = parseInt(max) % 11;
                if (pid.charAt(17).toUpperCase() == parityBit[mod]) {
                    status = true;
                } else {
                    status = false;
                }
            } else {
                status = false;
            }
        }
        return status;
    }

    //联系电话
    function checkTel () {
    	var tel = $('#tel');
        _data.tel = tel.val();
        if (_data.tel == '' || !/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(_data.tel)) {
            return false
        }
        return true
    }

    function setup1() {
    	var result = [];
        if (_data.type === 'company') {

            //公司名称
            result.push(checkCompanyName());

            //联系人
            result.push(checkContact());

            //身份证
            result.push(checkIdCard());

            //联系电话
            result.push(checkTel());
        }
        if (_data.type === 'personal') {

            //联系人
            _data.contactP = $('#contact_p').val();
            if (_data.contactP == '') {
                return false
            }

            //身份证
            _data.idCardP = $('#idCard_p').val();
            if (_data.idCardP == '' || !checkIdCard(_data.idCardP)) {
                return false
            }

            //联系电话
            _data.telP = $('#tel_p').val();
            if (_data.telP == '' || !/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(_data.telP)) {
                return false
            }
            return true
        }

        
    }

    function setup2() {
    	return true
        //日历名称
        _data.calendarName = $('#calendarName').val();
        if (_data.calendarName == '' || _data.calendarName.replace(/[^\x00-\xff]/g, "**").length > 20) {
            return false
        }

        //日历简介   暂时没有验证
        // _data.calendarDescript = $('#calendarDescript').val();
        // if (_data.calendarDescript == '') {
        //     return false
        // }
        return true
    }

    function setup3() {

    	return true
    }

    function setup4() {
    	return true
    }

    //点击下一步
    $('.js-next').on('click', function() {
        window.location.hash = _data.setup + 1;
    });

    //更新hash
    $(window).on('hashchange', function() {
        var setup = window.location.hash.substr(1);
        gotoSetup(setup);
    });


    /**
     * 没时间封装了，先复制，发版了再重构一下
     */

    //头像编辑
    (function () {
    	var fileInput = $('#js-face-file');
    	var file = null;
    	var dragAble = false;

    	//图片拖拽用
    	var dragAble_img = false;

    	$('#js-setup_3')
    		//点击选择图片，首先清空input值
    		.on('click.selectImg.s3', '.avatar_img, .js-selectFile, .js-reselect', function (e) {
    			if(fileInput.val() !== '' && this.className === 'avatar_img'){
    				return false;
    			}
	    		return fileInput.val('').click();
	    	})
	    	//图片预览
    		.on('change.s3', '#js-face-file', function (e) {
    			e = e || window.event;
    			var img = document.getElementById('js-face-img');
    			var target = e.target || e.srcElement;
    			var fileList = target.files || e.dataTrasfer.files;
    			file = fileList[0];
    			// if(window.webkitURL){
	      //           img.src = window.webkitURL.createObjectURL(fileList[0]);
	      //           positionImg(img);
	      //       }else if(window.URL){
	      //           img.src = window.URL.createObjectURL(fileList[0]);
	      //           positionImg(img);
	      //       }else{
	      //放弃其他方式，否则定位img存在读取问题
                var reader = new FileReader();
                reader.onload = function(e){
                    img.src = this.result;
                    positionImg(img);
                }
                reader.readAsDataURL(file);
	            // }
	            
	            //更新按钮
	            $('#js-setup_3 .js-selectFile').addClass('none');
	            $('#js-setup_3 .js-reselect, #js-setup_3 .js-upload').removeClass('none');
    		})
    		//图片大小调整
    		.on('mousedown.s3', '.scroll_btn', function (e) {
    			if(file === null){
    				dragAble = false;
    				return false;
    			}

		    	var pos = {x: 0, y: 0};//元素与鼠标坐标差值
		    	var area = {min: 0, max: 0};//范围

    			var mpos = getMousePos(e);
    			var _this = this;
    			var $this = $(_this);

    			pos.x = mpos.x - _this.offsetLeft;
    			pos.y = mpos.y - _this.offsetTop;

    			area.max = $this.next()[0].offsetLeft - $this.width();
    			area.min = $this.prev()[0].offsetLeft + $this.prev().width();

    			//重置按钮样式
    			_this.style.left = _this.offsetLeft + 'px';
    			_this.style.top = _this.offsetTop + 'px';
    			_this.style.margin = 0;

    			dragAble = true;

                if (e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }

	    		$(document).on('mouseup.resizeImg.s3', function (e) {
	    			dragAble = false;
	    			pos.x = 0;
	    			pos.y = 0;

	    			$(document).off('.resizeImg.s3');

	    			return false;
	    		})
	    		.on('mousemove.resizeImg.s3', function (e) {
	    			if(!dragAble){
	    				return false;
	    			}
                    if (document.all){
                        e.returnValue = false;
                    }

	    			var mpos = getMousePos(e);
	    			var nextX = Math.max(Math.min(mpos.x - pos.x, area.max), area.min);

	    			_this.style.left = nextX + 'px';

	    			setImgSize(document.getElementById('js-face-img'), (nextX - area.min) / (area.max - area.min));
	    		});
    		})
			.on('mousedown.s3', '.add_btn, .lessen_btn', function (e) {
				var _this = this;
				var $this = $(_this);

				var pre = +$this.parents('.avatar').find('#js-face-img').attr('data-pre');
				pre += _this.className === 'add_btn' ? -.1 : .1;
				pre = Math.max(Math.min(pre, 1), 0);

				setImgSize(document.getElementById('js-face-img'), pre);

				var scroll_btn = $this.parents('.avatar').find('.scroll_btn');

    			var max = scroll_btn.next()[0].offsetLeft - scroll_btn.width();
    			var min = scroll_btn.prev()[0].offsetLeft + scroll_btn.prev().width();

				scroll_btn[0].style.left = Math.max(Math.min(max * pre, max), min) + 'px';
			})
			//图片移动
			.on('mousedown.s3', '#js-face-img', function (e) {
    			if(file === null){
    				dragAble_img = false;
    				return false;
    			}

		    	var pos_img = {x: 0, y: 0};//元素与鼠标坐标差值
		    	var area_img = {min: 0, max: 0};//范围

    			var mpos = getMousePos(e);
    			var _this = this;
    			var $this = $(_this);

		    	var p = $(_this.parentNode);
		    	var pw = p.width();
		    	var ph = p.height();

    			pos_img.x = mpos.x - _this.offsetLeft;
    			pos_img.y = mpos.y - _this.offsetTop;

    			area_img.maxX = 0;
    			area_img.minX = +$this.attr('data-minx');
    			area_img.maxY = 0;
    			area_img.minY = +$this.attr('data-miny');

    			_this.style.cursor = 'move';

    			dragAble_img = true;

                if (e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }

	    		$(document).on('mouseup.moveImg.s3', function (e) {
	    			dragAble_img = false;
	    			pos_img.x = 0;
	    			pos_img.y = 0;

	    			_this.style.cursor = '';

	    			$(document).off('.moveImg.s3');

	    			return false;
	    		})
	    		.on('mousemove.moveImg.s3', function (e) {
	    			if(!dragAble_img){
	    				return false;
	    			}
                    if (document.all){
                        e.returnValue = false;
                    }

	    			var mpos = getMousePos(e);
	    			var nextX = Math.max(Math.min(mpos.x - pos_img.x, area_img.maxX), area_img.minX);
	    			var nextY = Math.max(Math.min(mpos.y - pos_img.y, area_img.maxY), area_img.minY);
	    			var pre = _this.getAttribute('data-pre');
	    			_this.style.left = nextX + 'px';
	    			_this.style.top = nextY + 'px';

	    			//计算出血，按照最小比例计算， 最后的2是双边
	    			_this.setAttribute('data-movex', (nextX + (_this.width - pw) / 2) / (+pre + 1) * 2);
	    			_this.setAttribute('data-movey', (nextY + (_this.height - ph) / 2) / (+pre + 1) * 2);
	    		});
			})
			//上传图片
			.on('click.upload.s3', '.js-upload', function (e) {
				var img = document.getElementById('js-face-img');
				saveImg(img, file);
			})
		;
    })();

    function cutImt (img, file) {
    	var canvas = document.getElementById('uploadCanvas');
    	if(canvas){
    		canvas.parentNode.removeChild(canvas);
    	}
    	canvas = document.createElement('canvas');
    	canvas.id = 'uploadCanvas';
    	var p = $(img).parent();
    	var pw = p.width();
    	var ph = p.height();
    	canvas.width = pw;
    	canvas.height = ph;
    	canvas.style.position = 'absolute';
    	canvas.style.left = '-999999px';
    	canvas.style.zIndex = '3';

    	document.body.insertBefore(canvas, document.body.firstChild);

    	var ca = canvas.getContext('2d'),
    	sx = parseInt(img.style.left),
    	sy = parseInt(img.style.top),
    	nw = img.width,
    	nh = img.height;

    	ca.drawImage(img,sx,sy,nw,nh);
    	return dataURItoBlob(canvas.toDataURL());
    }
	function dataURItoBlob(dataURI) {
	    // convert base64/URLEncoded data component to raw binary data held in a string
	    var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);

	    // separate out the mime component
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	    // write the bytes of the string to a typed array
	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }

	    return new Blob([ia], {type:mimeString});
	}

    function saveImg (img, file) {
		if(file === null){
			return false;
		}

		var filedata = cutImt(img, file);

		$.ajax({
			url: "/schedule/signatures.do",
			type: "post",
			data: {
				fileCount: 1,
				noCallback: true
			},
			dataType: "json"
		})
		.done(function(data) {
			if(data.state === 'wrongpass'){
				return false;
			}

			var sign = data.signatures[0];
			var fd = new FormData();
			fd.append('file', filedata, file.name);
			fd.append('signature', sign.signature);
			fd.append('policy', sign.policy);

			$.ajax({
				url: 'http://v0.api.upyun.com/' + sign.bucket,
				type: 'POST',
				dataType: 'json',
				processData:false,
		        contentType:false,
				data: fd
			})
			.done(function() {
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
    }

    function positionImg (img) {
    	var p = $(img.parentNode);
    	var pw = p.width();
    	var ph = p.height();
    	var w = img.width;
    	var h = img.height;
    	if(p.hasClass('high_img')){
    		if(w / h > pw / ph){
    			img.height = ph;
    		}
    		else{
    			img.width = pw;
    		}
    	}
    	else{
    		if(w > h){
	    		img.height = ph;
	    	}
	    	else{
	    		img.width = pw;
	    	}
    	}
    	w = img.width;
    	h = img.height;

    	var t = (ph - h) / 2;
    	var l = (pw - w) / 2;

    	img.style.left = l + 'px';
    	img.style.top = t + 'px';

    	img.setAttribute('data-width', w);
    	img.setAttribute('data-height', h);
    	img.setAttribute('data-left', l);
    	img.setAttribute('data-top', t);
    	img.setAttribute('data-movex', 0);
    	img.setAttribute('data-movey', 0);
    	img.setAttribute('data-minx', 0);
    	img.setAttribute('data-miny', 0);
    	img.setAttribute('data-pre', 0);

    	$(img).parents('.avatar').find('.scroll_btn')[0].style.left = '';

    	setImgSize(img, 0);
    }

    function setImgSize (img, pre) {
    	var p = $(img.parentNode);
    	var pw = p.width();
    	var ph = p.height();
    	var w = img.getAttribute('data-width');
    	var h = img.getAttribute('data-height');

    	var newW = w * (+pre + 1);
    	img.width = newW;
    	img.removeAttribute('height');

    	//弥补距离（图片被移位，相当于裁切掉移位空间，通过新的宽高来定位）
    	var ew = img.getAttribute('data-movex') * (+pre + 1);
    	var eh = img.getAttribute('data-movey') * (+pre + 1);

    	var l = img.getAttribute('data-left') - (newW - ew - w) / 2;
    	var t = img.getAttribute('data-top') - (img.height - eh - h) / 2;
    	l = Math.max(Math.min(l,0),pw - newW)
    	t = Math.max(Math.min(t,0),ph - img.height);
    	
    	img.style.left = l + 'px';
    	img.style.top = t + 'px';

    	img.setAttribute('data-minX', pw - img.width);
    	img.setAttribute('data-minY', ph - img.height);

    	img.setAttribute('data-pre', pre);
    }

    function position (obj) {
        var pos = {
            "x": 0,
            "y": 0
        };
        if (typeof obj == 'undefined' || obj == null) return pos;
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                pos.y += parseInt(obj.offsetTop);
                pos.x += parseInt(obj.offsetLeft);
                obj = obj.offsetParent
            }
        } else if (obj.x) {
            pos.x += obj.x
        } else if (obj.y) {
            pos.y += obj.y
        }
        return pos
    }

	function getMousePos (ev) {
		ev = ev || window.event;

        if (ev.pageX || ev.pageY) {
            return {
                x: ev.pageX,
                y: ev.pageY
            };
        }

        if (document.documentElement && document.documentElement.scrollTop) {
            return {
                x: ev.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,
                y: ev.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
            };
        }
        else if (document.body) {
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
    }

    //背景编辑
    (function () {
    	var fileInput = $('#js-bg-file');
    	var dragAble = false;

    	//图片拖拽用
    	var dragAble_img = false;

    	$('#js-setup_4')
    		//点击选择图片，首先清空input值
    		.on('click.selectImg.s4', '.avatar_img, .js-selectFile, .js-reselect', function (e) {
    			if(fileInput.val() !== '' && $(this).hasClass('avatar_img')){
    				return false;
    			}
	    		return fileInput.val('').click();
	    	})
    		.on('change.s4', '#js-bg-file', function (e) {
    			var img = document.getElementById('js-bg-img');
    			var fileList = e.target.files || e.dataTransfer.files;
    			if(window.webkitURL){
	                img.src = window.webkitURL.createObjectURL(fileList[0]);
	            }else if(window.URL){
	                img.src = window.URL.createObjectURL(fileList[0]);
	            }else{
	                var reader = new FileReader();
	                reader.onload = function(e){
	                    img.src = this.result;
	                }
	                reader.readAsDataURL(fileList[0]);
	            }
    		})
	    	//图片预览
    		.on('change.s4', '#js-bg-file', function (e) {
    			e = e || window.event;
    			var img = document.getElementById('js-bg-img');
    			var target = e.target || e.srcElement;
    			var fileList = target.files || e.dataTrasfer.files;
                var reader = new FileReader();
                reader.onload = function(e){
                    img.src = this.result;
                    positionImg(img);
                }
                reader.readAsDataURL(fileList[0]);
	            //更新按钮
	            $('#js-setup_4 .js-selectFile').addClass('none');
	            $('#js-setup_4 .js-reselect, #js-setup_4 .js-upload').removeClass('none');
    		})
    		//图片大小调整
    		.on('mousedown.s4', '.scroll_btn', function (e) {
    			if(fileInput.val() === ''){
    				dragAble = false;
    				return false;
    			}

		    	var pos = {x: 0, y: 0};//元素与鼠标坐标差值
		    	var area = {min: 0, max: 0};//范围

    			var mpos = getMousePos(e);
    			var _this = this;
    			var $this = $(_this);

    			pos.x = mpos.x - _this.offsetLeft;
    			pos.y = mpos.y - _this.offsetTop;

    			area.max = $this.next()[0].offsetLeft - $this.width();
    			area.min = $this.prev()[0].offsetLeft + $this.prev().width();

    			//重置按钮样式
    			_this.style.left = _this.offsetLeft + 'px';
    			_this.style.top = _this.offsetTop + 'px';
    			_this.style.margin = 0;

    			dragAble = true;

                if (e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }

	    		$(document).on('mouseup.resizeImg.s4', function (e) {
	    			dragAble = false;
	    			pos.x = 0;
	    			pos.y = 0;

	    			$(document).off('.resizeImg.s4');

	    			return false;
	    		})
	    		.on('mousemove.resizeImg.s4', function (e) {
	    			if(!dragAble){
	    				return false;
	    			}
                    if (document.all){
                        e.returnValue = false;
                    }

	    			var mpos = getMousePos(e);
	    			var nextX = Math.max(Math.min(mpos.x - pos.x, area.max), area.min);

	    			_this.style.left = nextX + 'px';

	    			setImgSize(document.getElementById('js-bg-img'), (nextX - area.min) / (area.max - area.min));
	    		});
    		})
			.on('mousedown.s4', '.add_btn, .lessen_btn', function (e) {
				var _this = this;
				var $this = $(_this);

				var pre = +$this.parents('.avatar').find('#js-bg-img').attr('data-pre');
				pre += _this.className === 'add_btn' ? -.1 : .1;
				pre = Math.max(Math.min(pre, 1), 0);

				setImgSize(document.getElementById('js-bg-img'), pre);

				var scroll_btn = $this.parents('.avatar').find('.scroll_btn');

    			var max = scroll_btn.next()[0].offsetLeft - scroll_btn.width();
    			var min = scroll_btn.prev()[0].offsetLeft + scroll_btn.prev().width();

				scroll_btn[0].style.left = Math.max(Math.min(max * pre, max), min) + 'px';
			})
			//图片移动
			.on('mousedown.s4', '#js-bg-img', function (e) {
    			if(fileInput.val() === ''){
    				dragAble_img = false;
    				return false;
    			}

		    	var pos_img = {x: 0, y: 0};//元素与鼠标坐标差值
		    	var area_img = {min: 0, max: 0};//范围

    			var mpos = getMousePos(e);
    			var _this = this;
    			var $this = $(_this);

		    	var p = $(_this.parentNode);
		    	var pw = p.width();
		    	var ph = p.height();

    			pos_img.x = mpos.x - _this.offsetLeft;
    			pos_img.y = mpos.y - _this.offsetTop;

    			area_img.maxX = 0;
    			area_img.minX = +$this.attr('data-minx');
    			area_img.maxY = 0;
    			area_img.minY = +$this.attr('data-miny');

    			_this.style.cursor = 'move';

    			dragAble_img = true;

                if (e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }

	    		$(document).on('mouseup.moveImg.s4', function (e) {
	    			dragAble_img = false;
	    			pos_img.x = 0;
	    			pos_img.y = 0;

	    			_this.style.cursor = '';

	    			$(document).off('.moveImg.s4');

	    			return false;
	    		})
	    		.on('mousemove.moveImg.s4', function (e) {
	    			if(!dragAble_img){
	    				return false;
	    			}
                    if (document.all){
                        e.returnValue = false;
                    }

	    			var mpos = getMousePos(e);
	    			var nextX = Math.max(Math.min(mpos.x - pos_img.x, area_img.maxX), area_img.minX);
	    			var nextY = Math.max(Math.min(mpos.y - pos_img.y, area_img.maxY), area_img.minY);
	    			var pre = _this.getAttribute('data-pre');
	    			_this.style.left = nextX + 'px';
	    			_this.style.top = nextY + 'px';

	    			//计算出血，按照最小比例计算， 最后的2是双边
	    			_this.setAttribute('data-movex', (nextX + (_this.width - pw) / 2) / (+pre + 1) * 2);
	    			_this.setAttribute('data-movey', (nextY + (_this.height - ph) / 2) / (+pre + 1) * 2);
	    		});
			})
			//上传图片
			.on('click.upload.s4', '.js-upload', function (e) {
				var img = document.getElementById('js-bg-img');
				saveImg(img, file);
			})
    	;

    })();

    //个人企业切换
    tabsDom({
        tabsSel: 'on',
        callBack: function(t, b) {
            _data.type = $(t).attr('data-type');
        }
    });

    //启动，检测hash
    $(function() {
        if (window.location.hash.substr(1) == 1) {
            gotoSetup(1);
        } else {
            window.location.hash = 1;
        }
    });

})();
