/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2015-03-04 18:04:04
 * @version 1.0
 */

function random(n, m) {
        return Math.random() * (m - n) + n
    }
$(function(){
	var num = Math.ceil(random(0,2));
	var jz_content_img = $(".jz_content_img");
	if(num>1){
		if(jz_content_img.hasClass("girls")){
			
		}else{
			jz_content_img.addClass("girls");
		}
		if(jz_content_img.hasClass("boy")){
			jz_content_img.removeClass("boy");
		}
	}else{
		if(jz_content_img.hasClass("boy")){
			
		}else{
			jz_content_img.addClass("boy");
		}
		if(jz_content_img.hasClass("girls")){
			jz_content_img.removeClass("girls");
		}
	}
	// if (location.href.indexOf('?isjumped=true') == -1) {
	// 	var url = location.href;
	// 	location.href = [
	// 			"coco://365rili.com/jumpEvent",
	// 			"?title=",
	// 			encodeURIComponent('惊蛰来了'),
	// 			"&url=",
	// 			encodeURIComponent(url.substr(7, url.length) + '?isjumped=true') ]
	// 			.join('');
	// }
})