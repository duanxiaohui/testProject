/**
 * qp_holiday
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-10-19 17:04:23
 */

(function () {
    var _data = {
        page: 1,
        isLoading: false
    };

    getImgHeight();

    getData();

    $('.qp_holiday_list').on('tap', '.top_img', openUrl);

    function getImgHeight () {
        var ww = $(document).width() - 16;
        var iw = 690;
        var ih = 374;

        var oh = ih * ww / iw;
        _data.imgHeight = parseInt(oh);
    }

    function getData () {
        if(_data.page != 1){
            $('.more_btn').html('<img src="/third_cooperation/qqgroup/images/loading.gif" width="16" height="16" style="padding: 11px 0;">');
        }
        if(_data.isLoading){
            return false;
        }
        _data.isLoading = true;
        $.ajax({
            url: '/fantasticHoliday/list.do?currentPage=' + _data.page,
            success: function (data) {
                if(data.state != 'ok'){
                    return false;
                }

                parsePage(data);

                if(data.cp == data.totalpage){
                    $('.more_btn').remove();
                }
                else if(_data.page != 1){
                    $('.more_btn').html('<a href="javascript:;">加载更多</a>');
                }
                else{
                    $('<div class="more_btn"><a href="javascript:;">加载更多</a></div>').appendTo('body');
                    $('.more_btn').on('tap', getData);
                }
                _data.page++;
                _data.isLoading = false;
            }
        });
    }

    function parsePage (data) {
        var tmpl = '\
        <div data-url="{$linkurl}" class="top_img" style="height: ' + _data.imgHeight + 'px;">\
            <img src="' + data.picUrl + '{$picture}" width="100%">\
            <div class="info_txt">\
                <h1>{$title}</h1>\
                <span>{$starttime}</span>\
            </div>\
        </div>';

        var html = template(tmpl, data.datas);

        $('.qp_holiday_list').append(html);
    }

    function openUrl () {
        var url = $(this).data('url');
        if(window.location.pathname == '/discover/list.do'){
            app.call({
                action: 'openUrlWithNewActivity',
                params: [
                    {
                        name: 'url',
                        value: url
                    },
                    {
                        name: 'isInnerWebview',
                        value: true
                    }
                ],
                callBack: null
            })
        }
        else{
            window.location.href = url;
        }
    }

    function copyTo (ce, e) {
        for (var i in ce) {
            if (typeof i === 'undefined') continue;
            if (typeof ce[i] == 'object') {
                e[i] = {};
                if (ce[i] instanceof Array) e[i] = [];
                copyTo(ce[i], e[i]);
                continue;
            }
            e[i] = ce[i];
        }
    }
    function apply (object, config, defaults) {
        if (defaults) {
            apply(object, defaults);
        }
        if (object && config && typeof config === 'object') {
            var i, j;

            for (i in config) {
                object[i] = config[i];
            }
        }

        return object
    }
    function typeOf (o) {
        return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
    }

    function template (s,o,defaults) {
        if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
        var _html = [];
        defaults = defaults || {};
        if(typeOf(o) === 'array'){
            for (var i = 0, len = o.length; i < len; i++) {
                _html.push(template(s, o[i],defaults));
            };
        }else{
            var __o = {};
            copyTo(o, __o);
            apply(__o, defaults);
            _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
                return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o) : (o[_o] || __o[_o] || '');
            }));
        }
        return _html.join('');
    }
})();