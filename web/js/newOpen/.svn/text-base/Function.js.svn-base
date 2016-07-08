/**
 * Function
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-26 14:24:05
 */

function query(name, href) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
    href = href || location.href;
    if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
}

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

function template(s, o, defaults) {
    if (typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
    var _html = [];
    defaults = defaults || {};
    if (typeOf(o) === 'array') {
        for (var i = 0, len = o.length; i < len; i++) {
            _html.push(template(s, o[i], defaults));
        };
    } else {
        var __o = {};
        copyTo(o, __o);
        apply(__o, defaults);
        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_, _o) {
            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o) : (o[_o] || __o[_o] || '');
        }));
    }
    return _html.join('');
}

function tabsDom(opt) {
    if (typeof opt == "undefined") {
        opt = {}
    }
    var tabs = opt.tabs || "tabs",
        tabLi = opt.tabLi || "tabLi",
        tabsBox = opt.tabsBox || "tabsBox",
        tabsSel = opt.tabsSel || "sel",
        type = opt.type || "click",
        isStop = opt.isStop,
        animate = opt.animate || false,
        func = opt.callBack ||
        function(title, box) {};
    if (typeof isStop == "undefined") {
        isStop = true
    }

    $('.' + tabs).on(type, '.' + tabLi, function(e) {
        var _this = $(this);
        var _parent = _this.parents('.' + tabs);
        var index = _this.index();
        var boxs = _parent.find('.' + tabsBox);
        var box = _parent.find('.' + tabsBox + '.' + tabsSel);
        var list = _parent.find('.' + tabLi);

        box.removeClass(tabsSel);
        boxs.eq(index).addClass(tabsSel);
        list.removeClass(tabsSel);
        _this.addClass(tabsSel);

        func(this, boxs.eq(index)[0])

        e.stopPropagation();
        e.preventDefault();
    });
}
