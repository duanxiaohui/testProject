/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2015-06-09 20:36:11
 * @version 1.0
 */
(function () {
	window.plug = {
		alert:function (title,msg,fn,reph) {
            fn = fn || function(){};
			var tmpHtml = $('<div class="cld-ui-dialog cld-ui-corner-all-5 cld-ui-shadow"><div class="cld-ui-dialog-content .cld-ui-corner-tl-5 cld-ui-corner-tr-5"><h4>' + title + '</h4><div class="cld-ui-content">' + msg + '</div></div><div class="cld-ui-dialog-ft cld-ui-btn-sidet "><a href="javascript:;" class="cld-ui-colseAlert cld-ui-btn-ab cld-ui-btn-normal cld-ui-corner-br-5 cld-ui-corner-bl-5">确定</a></div></di>');
            if(title.length <= 0 || title == " " || title == null){
                tmpHtml.find("h4").remove();
            }
            var mask = $('<div style="position:fixed; left:0; top:0; width: 100%; height: '+$(window).height()+'px;background-color:#000;opacity: 0.5; z-index: 99;"></div>').appendTo('body');
    		$('body').append(tmpHtml);
    		$('.cld-ui-colseAlert').on('tap',function(){
                mask.remove();
    			$(this).parents(".cld-ui-dialog").hide().remove();
                fn();
    		});

            //修正定位
            var _h = tmpHtml.height();
            var _wh = document.documentElement.clientHeight;
            var posH = (_wh - _h) / 2;
            tmpHtml.css('top', posH < 0 ? 0 : posH);

            if(posH < 0){
                $('.cld-ui-content').height(_wh - 30 - 28 - 41);
            }


            //暂时修复活动详情弹层定位问题 重新发布一次
            if(reph){
                tmpHtml.css({
                    "top":"50%",
                    "margin-top":-(_h/2) + 'px'
                })
            }

    	},
    	confirm:function(title,msg,cancel,success){
    		var tmpHtml = $('<div class="cld-ui-dialog cld-ui-corner-all-5 cld-ui-shadow"><div class="cld-ui-dialog-content .cld-ui-corner-tl-5 cld-ui-corner-tr-5"><h4>' + title + '</h4><div class="cld-ui-content">' + msg + '</div></div><div class="cld-ui-dialog-ft cld-ui-btn-sidet "><a href="javascript:;" class="cld-ui-cancel cld-ui-btn-ab cld-ui-btn-normal cld-ui-corner-bl-5">取消</a><a href="javascript:;" class="cld-ui-sure cld-ui-btn-ab cld-ui-btn-normal cld-ui-corner-br-5">确定</a></div></di>');

            if(title.length <= 0 || title == " " || title == null){
                tmpHtml.find("h4").remove();
            }

            var mask = $('<div style="position:fixed; left:0; top:0; width: 100%; height: '+$(window).height()+'px;background-color:#000;opacity: 0.5; z-index: 99;"></div>').appendTo('body');

    		$('body').append(tmpHtml);
    		$('.cld-ui-cancel').on('tap',function(){
    			$(this).parents(".cld-ui-dialog").hide().remove();
                mask.fadeOut(function () {
                    mask.remove()
                });
    			if(Object.prototype.toString.call(cancel) == "[object Function]"){
    				cancel();
    			}
    		});
    		$('.cld-ui-sure').on('tap',function(){
    			$(this).parents(".cld-ui-dialog").hide().remove();
                mask.fadeOut(function () {
                    mask.remove()
                });
    			if(Object.prototype.toString.call(success) == "[object Function]"){
    				success();
    			}
    		});

            //修正定位
            var _h = tmpHtml.height();
            var _wh = document.documentElement.clientHeight;

            var posH = (_wh - _h) / 2;
            tmpHtml.css('top', posH < 0 ? 0 : posH);

            if(posH < 0){
                $('.cld-ui-content').height(_wh - 30 - 28 - 41);
            }
    	}
	}
})()