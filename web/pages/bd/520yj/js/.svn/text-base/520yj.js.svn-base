/**
 * 520yj
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-05-18 11:18:07
 */

(function () {
	var _data = window.d = {
		yj: 'y',
		url: ''
	};
	$('.btns a').on('click', function () {
		var yj = $(this).index() == 0 ? 'y' : 'j';
		if(yj != _data.yj){
			$('#yj').val('');
		}
		$('.btns a').removeClass('on');
		$('.' + yj).addClass('on');
		_data.yj = yj;
	})
	$('.fileSelect').on('change', change);
	$('.tjBtn').on('click', submit)
	function change() {
	    var files,
	        file;
	    files = $('.fileSelect').prop('files');

        if (files.length > 0) {
            file = files[0];
            if (isImageFile(file)) {
                _data.imgurl = URL.createObjectURL(file);
                startCropper();
            }
            else{
            	alert('请选择jpg|jpeg|png|gif格式的图片');
            }
        }
	}
	function isImageFile (file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
      }
    }

    // if(app.getUa.android){
    // 	$('.fileSelect').remove();
    // 	$('.picBtn a').css({
    // 		'background-image': 'url(/pages/bd/520yj/images/picBtn-dis.gif)'
    // 	});
    // 	$('<div style="width:210px;color:rgba(221,0,0,.6);margin:0 auto;">本次活动的上传图片功能暂不支持安卓用户。</div>').appendTo('.picBtn');
    // }

    function startCropper () {
		var $img = _data.img = $('<img src="' + _data.imgurl + '">');
		$('.cropper-example-1').empty().html($img);
		$img.cropper({
			aspectRatio: 1,
			autoCropArea: 1,
			autoCrop: true,
			strict: true,
			guides: false,
			highlight: false,
			dragCrop: false,
			movable: false,
			resizable: false,
	        built: function () {
	        	_data.crop = true;
	        	var _img = $img.cropper('getImageData');
				var w = _img.naturalWidth;
				var h = _img.naturalHeight;
				if(w > h){
					var _left = -(200 * w / h / 2 - (_img.width / 2));
					$img.cropper('setCanvasData',{
					    "top": 0,
					    "left" : _left,
					    "height": 200
					});
				}
				else{
					var _top = -(200 * h / w / 2 - (_img.height / 2));
					$img.cropper('setCanvasData',{
					    "left": 0,
					    "top" : _top,
					    "width": 200
					});
				}
				$img.cropper('setCropBoxData',{
				    "left": 0,
				    "top": 0,
				    "width": 200,
				    "height": 200
				});
	        }
		});
    }

    function submit () {
    	var yj = $.trim($('#yj').val());
    	var words = $.trim($('#words').val());
    	var name = $.trim($('#name').val());

    	if(yj == ''){
    		return alert('请填写宜忌');
    	}

    	function goOnSubmit(){
    		url = 'http://www.365rili.com/pages/bd/520yj/'+window.location.pathname.split('/')[4]+'/custom.html?c=user&type=' + _data.yj + '&yj=' + yj;

    		var tj = [102];
	    	if(words != ''){
	    		tj.push(104);
	    		url += '&words=' + words;
	    	}
	    	if(name != ''){
	    		tj.push(105);
	    		url += '&name=' + name;
	    	}
	    	if(_data.crop){
	    		tj.push(103);
	    		url += '&img=' + encodeURIComponent(_data.url);
	    	}

			$.ajax({
	    		url:'/operation/share.do',
	    		data: {
	    			shareId: tj.join(','),
	    			channel: 'weixin'
	    		},
	    		success: function () {
	    			window.location.href = url;
	    		}
	    	});
    	}

		if(_data.crop){
			var canvas = _data.img.cropper('getCroppedCanvas');
			var Q = loopToLowSize(canvas, 1);
	    	var filedata = dataURItoBlob(canvas.toDataURL('image/jpeg',Q));

	    	$.ajax({
				url: "/operation/signatures.do?fileCount=1&path=150520",
				type: "get",
				data: {
	                type: 'pic',
					nocallback: 1
				},
				dataType: "json"
			})
			.done(function(data) {
				var sign = data.signatures[0];
				var fd = new FormData();
				fd.append('file', filedata, sign.filename);
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
				.done(function(data) {
	                if(data.message != 'ok'){
	                    return false;
	                }
	                _data.url = 'http://cocoimg.365rili.com' + data.url;
	                goOnSubmit();
				});
			});
		}
		else{
			goOnSubmit();
		}
    }
    function loopToLowSize (canvas, Q) {
        Q -= 0.05;
        Q = Q > 0 ? Q : 0;
        var data = canvas.toDataURL('image/jpeg', Q);
        if(data.length > 1024 * 145){
            if(Q == 0){
                return -1;
            }
            Q = loopToLowSize(canvas, Q);
        }
        return Q;
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

	if(app.getUa.weixin){
		wxProtocol.init({
			imgUrl: 'http://www.365rili.com/pages/bd/520yj/images/share' + (type == 'y' ? 'y' : 'j') + '.png',
			title: '520定制日历，表示已玩嗨',
			desc: '没点进来的人都表示好遗憾',
			link: 'http://www.365rili.com/pages/bd/520yj/weixin/index.html',
			success: function () {
				$.ajax({
					url: '/operation/share.do?shareId=100&channel=weixin'
				});
			}
		});
	}

	if(window.location.pathname.split('/')[4] == 'plaza'){
		$('.bar').show();
		$('body').addClass('plaza');
	}

	$('.share_btn').on('click', function () {
		$.ajax({
			url: '/operation/share.do?shareId=100&channel=plaza'
		});
        app.call({
            action: 'share',
            params: [
                {
                    name: 'shareString',
        			value: JSON.stringify({
        				title: '520定制日历，表示已玩嗨',
        				content: '没点进来的人都表示好遗憾',
        				link: 'http://www.365rili.com/pages/bd/520yj/weixin/index.html',
        				image: 'http://www.365rili.com/pages/bd/520yj/images/share' + (type == 'y' ? 'y' : 'j') + '.png',
        				isEvent: 'true'
        			})
                }
            ],
            callBack: function (headers) {}
        });
	})

})();