/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-14 15:33:10
 * @version $Id$
 */

function copyTo(ce, e) {
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

function apply(object, config, defaults) {
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

function typeOf(o) {
    return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
}

function template (s,o,defaults, index) {
    index = index || 0;
    if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
    var _html = [];
    defaults = defaults || {};
    if(typeOf(o) === 'array'){
        for (var i = 0, len = o.length; i < len; i++) {
            _html.push(template(s, o[i], defaults, i));
        };
    }else{
        var __o = {};
        copyTo(o, __o);
        apply(__o, defaults);
        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o, index) : (o[_o] || __o[_o] || '');
        }));
    }
    return _html.join('');
}

function openUrl(isNew) {
    isNew = !!isNew;
    var url;
    var dataUrl = $(this).data('url');
    var arge = dataUrl.substring(0,4);
    if (dataUrl == "undefined" || dataUrl == undefined) {
        url = $(this).attr('topic-url');
    } else {
        url = encodeURI(dataUrl);
    }
    if(arge == 'coco' || app.getUa.weixin){
        window.location.href= url;
    }else{
          app.call({
            action: 'openUrlWithNewActivity',
            params: [{
                name:   'url',
                value: url
            }, {
                name: 'isInnerWebview',
                value: !isNew
            }],
            callBack: null
        })
    }
  
}

function compare(arg){
    return function(a,b){
        var val1 = a[arg],
            val2 = b[arg];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if(val1 > val2){
            return 1;
        }else if(val1 < val2){
            return -1;
        }else{
            return 0;
        }
    }
}
function query(name, href) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
    href = href || location.href;
    if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return ""
}