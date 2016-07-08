/**
 * type
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-07 15:01:29
 */

(function() {

    var temp = '<li data-title="{$title}" data-id="{$id}"><a class="overT" href="javascript:;">{$title}</a></li>'

    window.initType = function(typeId) {
        typeId = typeId || query('type') || 3;
        $('.type_panel').Swipe({
            eCallback: function(tPoint) {
                if (tPoint.mY < 0 && $('.type_panel').attr('data-pos') === 'bottom') {
                    $('.type_panel').attr('data-touch', 'onetouch')
                };
            },
            mCallback: function(tPoint) {
                if (tPoint.mY < 0 && $('.type_panel').attr('data-pos') === 'bottom' && $('.type_panel').attr('data-touch') == 'onetouch') {
                    $('.type_panel').attr('data-pos', '');
                    $('.type_panel').attr('data-touch', '')
                    toggleType();
                }
            }
        });
        $('.type_panel').on('scroll', function() {
            if ($('.type_panel').scrollTop() >= $('.type_panel ul').height() - $('.type_panel').height()) {
                $('.type_panel').attr('data-pos', 'bottom');
            } else {
                $('.type_panel').attr('data-pos', 'top');
            }
        });

        var headers = {};
        if(app.getUa.android){
            headers['coco-ua'] = 'android';
        }
        $.ajax({
            url: '/calendar/getSubCategoryById.do',
            type: 'POST',
            dataType: 'json',
            headers:headers,
            data: {
                id: typeId
            },
            success: function(datas) {
                if (datas.state !== 'ok') {
                    return false;
                }
                datas.data.sort(function(x, y) {
                    return x.sequence - y.sequence;
                });
                parseType(datas.data);
            }
        });

		$('.type_panel').on('tap', 'li', jumpType);
    }

    function jumpType (e) {
        var _this = $(this);
        var title = _this.attr('data-title');
        var id = _this.attr('data-id');
        toggleType();
        callCoCo('jump', {
            action:'list',
            title: title,
            url: 'http://www.365rili.com/pages/forum/list.html',
            type: id
        });
    }

    function parseType(types) {
        $('.type_list')[0].innerHTML = template(temp, types);

		if($('.type_panel ul').height() < $('.type_panel').height()){
			$('.type_panel').attr('data-pos', 'bottom')
		}
    }

    window.toggleType = function () {
        var typeBox = $('.type_panel');
        var status = typeBox.attr('data-status');
        var _top = status == 'opened' ? '0' : '100%';
        typeBox.attr('data-status', (status == 'opened' ? 'closed' : 'opened'));
        transl = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()) ? "translate3d(0," + _top + ",0)" : "translate(0," + _top + ")";
        typeBox.css({
            '-webkit-transform': transl,
            '-webkit-transition': '400ms ease-out'
        });
        $('.content').css('display', (status == 'opened' ? '' : 'none'));
    }
})();
