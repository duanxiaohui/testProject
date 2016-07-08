/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-03 18:02:18
 * @version $Id$
 */
(function () {
	var _data = {};
	var constellation ={
		init:function () {
			$('body').on('tap', '[data-name]', function () {
				_data.dataName = $(this).data('name');
				_data.dataeName = $(this).attr('data-eName');
				$('.set_constellation_list li').removeClass("on");
				$(this).addClass("on");
				$(".save_constellaction_btn").css({
					"background":"#2bacee"
				})
			});

			if($('.set_constellation_list li').hasClass("on")){
				$(".save_constellaction_btn").css({
					"background":"#2bacee"
				})
			}else{
				$(".save_constellaction_btn").css({
					"background":"#ccc"
				})
			}

			$('body').on('tap', '.save_constellaction_btn', function (){
				if($('.set_constellation_list li').hasClass("on")){
					localStorage.constellationID = _data.dataName;
					localStorage.constellationNum = _data.dataeName;
					window.history.go(-1)
				}else{
					return false;
				}
			});

		}
	}
	constellation.init();
})()
