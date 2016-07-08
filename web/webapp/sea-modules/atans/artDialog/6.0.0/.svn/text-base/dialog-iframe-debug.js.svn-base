/*!
 * artDialog v6.0.0 - iframe 插件
 * Date: 2013-12-06
 * https://github.com/aui/artDialog
 * (c) 2009-2013 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */
define("atans/artDialog/6.0.0/dialog-iframe-debug", [ "jquery-debug", "./dialog-debug", "./popup-debug", "./dialog-config-debug", "./ui-dialog-debug.css" ], function(require) {
    var $ = require("jquery-debug");
    var dialog = require("./dialog-debug");
    return $.extend(function(options) {
        options = options || {};
        var url = options.url;
        var oniframeload = options.oniframeload;
        options.padding = 0;
        var api = dialog(options);
        var $iframe = $("<iframe />");
        $iframe.attr({
            src: url,
            name: api.id,
            width: "100%",
            height: "100%",
            allowtransparency: "yes",
            frameborder: "no",
            scrolling: "no"
        }).on("load", function() {
            var test;
            try {
                // 跨域测试
                test = $iframe[0].contentWindow.frameElement;
            } catch (e) {}
            if (test) {
                !options.width && api.width($iframe.contents().width());
                !options.height && api.height($iframe.contents().height());
            }
            if (oniframeload) {
                oniframeload.call(api);
            }
        });
        api.addEventListener("beforeremove", function() {
            // 重要！需要重置iframe地址，否则下次出现的对话框在IE6、7无法聚焦input
            // IE删除iframe后，iframe仍然会留在内存中出现上述问题，置换src是最容易解决的方法
            $iframe.attr("src", "about:blank").remove();
        }, false);
        api.content($iframe[0]);
        api.iframeNode = $iframe[0];
        return api;
    }, dialog);
});

/*!
 * artDialog v6.0.0 
 * Date: 2013-12-13
 * https://github.com/aui/artDialog
 * (c) 2009-2013 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */
define("atans/artDialog/6.0.0/dialog-debug", [ "jquery-debug", "atans/artDialog/6.0.0/popup-debug", "atans/artDialog/6.0.0/dialog-config-debug" ], function(require) {
    var $ = require("jquery-debug");
    var Popup = require("atans/artDialog/6.0.0/popup-debug");
    var defaults = require("atans/artDialog/6.0.0/dialog-config-debug");
    //var css = defaults.cssUri;
    // css loader: RequireJS & SeaJS
    //if (css) {
    //    css = require[require.toUrl ? 'toUrl' : 'resolve'](css);
    //    css = '<link rel="stylesheet" href="' + css + '" />';
    //    $('base')[0] ? $('base').before(css) : $('head').append(css);
    //}
    require("atans/artDialog/6.0.0/ui-dialog-debug.css");
    var _version = "6.0.0";
    var _count = 0;
    var _expando = +new Date() + "";
    var _isIE6 = !("minWidth" in $("html")[0].style);
    var _isMobile = "createTouch" in document && !("onmousemove" in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
    var _isFixed = !_isIE6 && !_isMobile;
    var artDialog = function(options, ok, cancel) {
        var originalOptions = options = options || {};
        if (typeof options === "string" || options.nodeType === 1) {
            options = {
                content: options,
                fixed: !_isMobile
            };
        }
        options = $.extend(true, {}, artDialog.defaults, options);
        var id = options.id = options.id || _expando + _count;
        var api = artDialog.get(id);
        // 如果存在同名的对话框对象，则直接返回
        if (api) {
            return api.focus();
        }
        // 目前主流移动设备对fixed支持不好，禁用此特性
        if (!_isFixed) {
            options.fixed = false;
        }
        // 快捷关闭支持：点击对话框外快速关闭对话框
        if (options.quickClose) {
            options.modal = true;
            if (!originalOptions.backdropOpacity) {
                options.backdropOpacity = 0;
            }
        }
        // 按钮组
        if (!$.isArray(options.button)) {
            options.button = [];
        }
        // 取消按钮
        if (cancel !== undefined) {
            options.cancel = cancel;
        }
        if (options.cancel) {
            options.button.push({
                id: "cancel",
                value: options.cancelValue,
                callback: options.cancel
            });
        }
        // 确定按钮
        if (ok !== undefined) {
            options.ok = ok;
        }
        if (options.ok) {
            options.button.push({
                id: "ok",
                value: options.okValue,
                callback: options.ok,
                autofocus: true
            });
        }
        return artDialog.list[id] = new artDialog.create(options);
    };
    var popup = function() {};
    popup.prototype = Popup.prototype;
    var prototype = artDialog.prototype = new popup();
    artDialog.version = _version;
    artDialog.create = function(options) {
        var that = this;
        $.extend(this, new Popup());
        var $popup = $(this.node).html(options.innerHTML);
        this.options = options;
        this._popup = $popup;
        $.each(options, function(name, value) {
            if (typeof that[name] === "function") {
                that[name](value);
            } else {
                that[name] = value;
            }
        });
        // 更新 zIndex 全局配置
        if (options.zIndex) {
            Popup.zIndex = options.zIndex;
        }
        // 设置 ARIA 信息
        $popup.attr({
            "aria-labelledby": this._$("title").attr("id", "title:" + this.id).attr("id"),
            "aria-describedby": this._$("content").attr("id", "content:" + this.id).attr("id")
        });
        // 关闭按钮
        this._$("close").css("display", this.cancel === false ? "none" : "").attr("title", this.cancelValue).on("click", function(event) {
            that._trigger("cancel");
            event.preventDefault();
        });
        // 添加视觉参数
        this._$("dialog").addClass(this.skin);
        this._$("body").css("padding", this.padding);
        // 按钮组点击
        $popup.on("click", "[data-id]", function(event) {
            var $this = $(this);
            if (!$this.attr("disabled")) {
                // IE BUG
                that._trigger($this.data("id"));
            }
            event.preventDefault();
        });
        // 点击遮罩自动关闭对话框
        if (options.quickClose) {
            $(this.backdrop).on("onmousedown" in document ? "mousedown" : "click", function() {
                that._trigger("cancel");
            });
        }
        // ESC 快捷键关闭对话框
        this._esc = function(event) {
            var target = event.target;
            var nodeName = target.nodeName;
            var rinput = /^input|textarea$/i;
            var isTop = Popup.current === that;
            var keyCode = event.keyCode;
            // 避免输入状态中 ESC 误操作关闭
            if (!isTop || rinput.test(nodeName) && target.type !== "button") {
                return;
            }
            if (keyCode === 27) {
                that._trigger("cancel");
            }
        };
        $(document).on("keydown", this._esc);
        this.addEventListener("remove", function() {
            $(document).off("keydown", this._esc);
            delete artDialog.list[this.id];
        });
        _count++;
        return this;
    };
    artDialog.create.prototype = prototype;
    $.extend(prototype, {
        /**
     * 显示对话框
     * @name artDialog.prototype.show
     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
     */
        /**
     * 显示对话框（模态）
     * @name artDialog.prototype.showModal
     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
     */
        /**
     * 关闭对话框
     * @name artDialog.prototype.close
     * @param   {String, Number}    返回值，可被 onclose 事件收取（可选）
     */
        /**
     * 销毁对话框
     * @name artDialog.prototype.remove
     */
        /**
     * 重置对话框位置
     * @name artDialog.prototype.reset
     */
        /**
     * 让对话框聚焦（同时置顶）
     * @name artDialog.prototype.focus
     */
        /**
     * 让对话框失焦（同时置顶）
     * @name artDialog.prototype.blur
     */
        /**
     * 添加事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     * @name artDialog.prototype.addEventListener
     */
        /**
     * 删除事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     * @name artDialog.prototype.removeEventListener
     */
        /**
     * 对话框显示事件，在 show()、showModal() 执行
     * @name artDialog.prototype.onshow
     * @event
     */
        /**
     * 关闭事件，在 close() 执行
     * @name artDialog.prototype.onclose
     * @event
     */
        /**
     * 销毁前事件，在 remove() 前执行
     * @name artDialog.prototype.onbeforeremove
     * @event
     */
        /**
     * 销毁事件，在 remove() 执行
     * @name artDialog.prototype.onremove
     * @event
     */
        /**
     * 重置事件，在 reset() 执行
     * @name artDialog.prototype.onreset
     * @event
     */
        /**
     * 焦点事件，在 foucs() 执行
     * @name artDialog.prototype.onfocus
     * @event
     */
        /**
     * 失焦事件，在 blur() 执行
     * @name artDialog.prototype.onblur
     * @event
     */
        /**
     * 设置内容
     * @param    {String, HTMLElement}   内容
     */
        content: function(html) {
            this._$("content").empty("")[typeof html === "object" ? "append" : "html"](html);
            return this.reset();
        },
        /**
     * 设置标题
     * @param    {String}   标题内容
     */
        title: function(text) {
            this._$("title").text(text);
            this._$("header")[text ? "show" : "hide"]();
            return this;
        },
        /** 设置宽度 */
        width: function(value) {
            this._$("content").css("width", value);
            return this.reset();
        },
        /** 设置高度 */
        height: function(value) {
            this._$("content").css("height", value);
            return this.reset();
        },
        /**
     * 设置按钮组
     * @param   {Array, String}
     */
        button: function(args) {
            args = args || [];
            var that = this;
            var html = "";
            this.callbacks = {};
            this._$("footer")[args.length ? "show" : "hide"]();
            if (typeof args === "string") {
                html = args;
            } else {
                $.each(args, function(i, val) {
                    val.id = val.id || val.value;
                    that.callbacks[val.id] = val.callback;
                    html += "<button" + ' type="button"' + ' data-id="' + val.id + '"' + (val.disabled ? " disabled" : "") + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : "") + ">" + val.value + "</button>";
                });
            }
            this._$("button").html(html);
            return this;
        },
        statusbar: function(html) {
            this._$("statusbar").html(html)[html ? "show" : "hide"]();
            return this;
        },
        _$: function(i) {
            return this._popup.find("[i=" + i + "]");
        },
        // 触发按钮回调函数
        _trigger: function(id) {
            var fn = this.callbacks[id];
            return typeof fn !== "function" || fn.call(this) !== false ? this.close().remove() : this;
        }
    });
    /** 最顶层的对话框API */
    artDialog.getCurrent = function() {
        return Popup.current;
    };
    /**
 * 根据 ID 获取某对话框 API
 * @param    {String}    对话框 ID
 * @return   {Object}    对话框 API (实例)
 */
    artDialog.get = function(id) {
        return id === undefined ? artDialog.list : artDialog.list[id];
    };
    artDialog.list = {};
    /**
 * 默认配置
 */
    artDialog.defaults = defaults;
    return artDialog;
});

/*!
 * popupjs
 * Date: 2013-12-15
 * https://github.com/aui/popupjs
 * (c) 2009-2013 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */
define("atans/artDialog/6.0.0/popup-debug", [ "jquery-debug" ], function(require) {
    var $ = require("jquery-debug");
    var _count = 0;
    var _isIE6 = !("minWidth" in $("html")[0].style);
    var _isFixed = !_isIE6;
    function Popup() {
        this.destroyed = false;
        this.__popup = $("<div />").attr({
            tabindex: "-1"
        }).css({
            display: "none",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: "auto",
            right: "auto",
            margin: 0,
            padding: 0,
            outline: 0,
            border: "0 none",
            background: "transparent"
        }).html(this.innerHTML).appendTo("body");
        this.__backdrop = $("<div />");
        // 使用 HTMLElement 作为外部接口使用，而不是 jquery 对象
        // 统一的接口利于未来 Popup 移植到其他 DOM 库中
        this.node = this.__popup[0];
        this.backdrop = this.__backdrop[0];
        _count++;
        Popup.oncreate(this);
    }
    $.extend(Popup.prototype, {
        /**
     * 初始化完毕事件，在 show()、showModal() 执行
     * @name Popup.prototype.onshow
     * @event
     */
        /**
     * 关闭事件，在 close() 执行
     * @name Popup.prototype.onclose
     * @event
     */
        /**
     * 销毁前事件，在 remove() 前执行
     * @name Popup.prototype.onbeforeremove
     * @event
     */
        /**
     * 销毁事件，在 remove() 执行
     * @name Popup.prototype.onremove
     * @event
     */
        /**
     * 重置事件，在 reset() 执行
     * @name Popup.prototype.onreset
     * @event
     */
        /**
     * 焦点事件，在 foucs() 执行
     * @name Popup.prototype.onfocus
     * @event
     */
        /**
     * 失焦事件，在 blur() 执行
     * @name Popup.prototype.onblur
     * @event
     */
        /** 浮层 DOM 素节点 */
        node: null,
        /** 遮罩 DOM 节点 */
        backdrop: null,
        /** 是否开启固定定位 */
        fixed: false,
        /** 判断对话框是否删除 */
        destroyed: true,
        /** 判断对话框是否显示 */
        open: false,
        /** close 返回值 */
        returnValue: "",
        /** 是否自动聚焦 */
        autofocus: true,
        /** 对齐方式 */
        align: "bottom left",
        /** 设置遮罩背景颜色 */
        backdropBackground: "#000",
        /** 设置遮罩透明度 */
        backdropOpacity: .7,
        /** 内部的 HTML 字符串 */
        innerHTML: "",
        /** 类名 */
        className: "ui-popup",
        /**
     * 显示浮层
     * @param   {HTMLElement, Event}  指定位置（可选）
     */
        show: function(anchor) {
            if (this.destroyed) {
                return this;
            }
            var that = this;
            var popup = this.__popup;
            this.__activeElement = this.__getActive();
            this.open = true;
            this.follow = anchor;
            popup.addClass(this.className + "-show").attr("role", this.modal ? "alertdialog" : "dialog").css("position", this.fixed ? "fixed" : "absolute").show();
            this.__backdrop.show();
            if (!this.__ready) {
                if (this.modal) {
                    this.__lock();
                }
                if (!popup.html()) {
                    popup.html(this.innerHTML);
                }
                if (!_isIE6) {
                    $(window).on("resize", this.__onresize = function() {
                        that.reset();
                    });
                }
                this.__ready = true;
            }
            this.reset().focus();
            this.__dispatchEvent("show");
            return this;
        },
        /** 显示模态浮层。参数参见 show() */
        showModal: function() {
            this.modal = true;
            return this.show.apply(this, arguments);
        },
        /** 关闭浮层 */
        close: function(result) {
            if (!this.destroyed && this.open) {
                if (result !== undefined) {
                    this.returnValue = result;
                }
                this.__popup.hide().removeClass(this.className + "-show");
                this.__backdrop.hide();
                this.open = false;
                this.blur();
                this.__dispatchEvent("close");
            }
            return this;
        },
        /** 销毁浮层 */
        remove: function() {
            if (this.destroyed) {
                return this;
            }
            this.__dispatchEvent("beforeremove");
            if (Popup.current === this) {
                Popup.current = null;
            }
            this.__unlock();
            this.__popup.remove();
            this.__backdrop.remove();
            // 恢复焦点，照顾键盘操作的用户
            this.blur();
            if (!_isIE6) {
                $(window).off("resize", this.__onresize);
            }
            this.__dispatchEvent("remove");
            for (var i in this) {
                delete this[i];
            }
            return this;
        },
        /** 手动刷新位置 */
        reset: function() {
            var elem = this.follow;
            if (elem) {
                this.__follow(elem);
            } else {
                this.__center();
            }
            this.__dispatchEvent("reset");
            return this;
        },
        /** 让浮层获取焦点 */
        focus: function() {
            var node = this.node;
            var current = Popup.current;
            if (current && current !== this) {
                current.blur(false);
            }
            // 检查焦点是否在浮层里面
            if (!$.contains(node, this.__getActive())) {
                var autofocus = this.__popup.find("[autofocus]")[0];
                if (!this._autofocus && autofocus) {
                    this._autofocus = true;
                } else {
                    autofocus = node;
                }
                this.__focus(autofocus);
            }
            Popup.current = this;
            this.__popup.addClass(this.className + "-focus");
            this.__zIndex();
            this.__dispatchEvent("focus");
            return this;
        },
        /** 让浮层失去焦点。将焦点退还给之前的元素，照顾视力障碍用户 */
        blur: function() {
            var activeElement = this.__activeElement;
            var isBlur = arguments[0];
            // ie11 bug: iframe 页面点击会跳到顶部
            if (isBlur !== false && activeElement && !/^iframe$/i.test(activeElement.nodeName)) {
                this.__focus(activeElement);
            }
            this._autofocus = false;
            this.__popup.removeClass(this.className + "-focus");
            this.__dispatchEvent("blur");
            return this;
        },
        /**
     * 添加事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     */
        addEventListener: function(type, callback) {
            this.__getEventListener(type).push(callback);
            return this;
        },
        /**
     * 删除事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     */
        removeEventListener: function(type, callback) {
            var listeners = this.__getEventListener(type);
            for (var i = 0; i < listeners.length; i++) {
                if (callback === listeners[i]) {
                    listeners.splice(i--, 1);
                }
            }
            return this;
        },
        // 获取事件缓存
        __getEventListener: function(type) {
            var listener = this.__listener;
            if (!listener) {
                listener = this.__listener = {};
            }
            if (!listener[type]) {
                listener[type] = [];
            }
            return listener[type];
        },
        // 派发事件
        __dispatchEvent: function(type) {
            var listeners = this.__getEventListener(type);
            if (this["on" + type]) {
                this["on" + type]();
            }
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].call(this);
            }
        },
        // 对元素安全聚焦
        __focus: function(elem) {
            // 防止 iframe 跨域无权限报错
            // 防止 IE 不可见元素报错
            try {
                if (this.autofocus) {
                    elem.focus();
                }
            } catch (e) {}
        },
        // 获取当前焦点的元素
        __getActive: function() {
            try {
                // try: ie8~9, iframe #26
                var activeElement = document.activeElement;
                var contentDocument = activeElement.contentDocument;
                var elem = contentDocument && contentDocument.activeElement || activeElement;
                return elem;
            } catch (e) {}
        },
        // 置顶浮层
        __zIndex: function() {
            var index = Popup.zIndex++;
            // 设置叠加高度
            this.__popup.css("zIndex", index);
            this.__backdrop.css("zIndex", index - 1);
            this.zIndex = index;
        },
        // 居中浮层
        __center: function() {
            var popup = this.__popup;
            var $window = $(window);
            var $document = $(document);
            var fixed = this.fixed;
            var dl = fixed ? 0 : $document.scrollLeft();
            var dt = fixed ? 0 : $document.scrollTop();
            var ww = $window.width();
            var wh = $window.height();
            var ow = popup.width();
            var oh = popup.height();
            var left = (ww - ow) / 2 + dl;
            var top = (wh - oh) * 382 / 1e3 + dt;
            // 黄金比例
            var style = popup[0].style;
            style.left = Math.max(parseInt(left), dl) + "px";
            style.top = Math.max(parseInt(top), dt) + "px";
            popup.removeClass(this.__followSkin);
        },
        // 指定位置 @param    {HTMLElement, Event}  anchor
        __follow: function(anchor) {
            var $elem = anchor.parentNode && $(anchor);
            // 隐藏元素不可用
            if ($elem) {
                var o = $elem.offset();
                if (o.left * o.top < 0) {
                    return this.__center();
                }
            }
            var that = this;
            var fixed = this.fixed;
            var popup = this.__popup;
            var $window = $(window);
            var $document = $(document);
            var winWidth = $window.width();
            var winHeight = $window.height();
            var docLeft = $document.scrollLeft();
            var docTop = $document.scrollTop();
            var popupWidth = popup.width();
            var popupHeight = popup.height();
            var width = $elem ? $elem.outerWidth() : 0;
            var height = $elem ? $elem.outerHeight() : 0;
            var offset = this.__offset(anchor);
            var x = offset.left;
            var y = offset.top;
            var left = fixed ? x - docLeft : x;
            var top = fixed ? y - docTop : y;
            var minLeft = fixed ? 0 : docLeft;
            var minTop = fixed ? 0 : docTop;
            var maxLeft = minLeft + winWidth - popupWidth;
            var maxTop = minTop + winHeight - popupHeight;
            var css = {};
            var align = this.align.split(" ");
            var className = this.className + "-";
            var reverse = {
                top: "bottom",
                bottom: "top",
                left: "right",
                right: "left"
            };
            var name = {
                top: "top",
                bottom: "top",
                left: "left",
                right: "left"
            };
            var temp = [ {
                top: top - popupHeight,
                bottom: top + height,
                left: left - popupWidth,
                right: left + width
            }, {
                top: top,
                bottom: top - popupHeight + height,
                left: left,
                right: left - popupWidth + width
            } ];
            var center = {
                left: left + width / 2 - popupWidth / 2,
                top: top + height / 2 - popupHeight / 2
            };
            var range = {
                left: [ minLeft, maxLeft ],
                top: [ minTop, maxTop ]
            };
            // 超出可视区域重新适应位置
            $.each(align, function(i, val) {
                // 超出右或下边界：使用左或者上边对齐
                if (temp[i][val] > range[name[val]][1]) {
                    val = align[i] = reverse[val];
                }
                // 超出左或右边界：使用右或者下边对齐
                if (temp[i][val] < range[name[val]][0]) {
                    align[i] = reverse[val];
                }
            });
            // 一个参数的情况
            if (!align[1]) {
                name[align[1]] = name[align[0]] === "left" ? "top" : "left";
                temp[1][align[1]] = center[name[align[1]]];
            }
            className += align.join("-");
            popup.removeClass(this.__followSkin);
            that.__followSkin = className;
            if ($elem) {
                popup.addClass(className);
            }
            css[name[align[0]]] = parseInt(temp[0][align[0]]);
            css[name[align[1]]] = parseInt(temp[1][align[1]]);
            popup.css(css);
        },
        // 获取元素相对于页面的位置（包括iframe内的元素）
        // 暂时不支持两层以上的 iframe 套嵌
        __offset: function(anchor) {
            var isNode = anchor.parentNode;
            var offset = isNode ? $(anchor).offset() : {
                left: anchor.pageX,
                top: anchor.pageY
            };
            anchor = isNode ? anchor : anchor.target;
            var ownerDocument = anchor.ownerDocument;
            var defaultView = ownerDocument.defaultView || ownerDocument.parentWindow;
            if (defaultView == window) {
                // IE <= 8 只能使用两个等于号
                return offset;
            }
            // {Element Ifarme}
            var frameElement = defaultView.frameElement;
            var $ownerDocument = $(ownerDocument);
            var docLeft = $ownerDocument.scrollLeft();
            var docTop = $ownerDocument.scrollTop();
            var frameOffset = $(frameElement).offset();
            var frameLeft = frameOffset.left;
            var frameTop = frameOffset.top;
            return {
                left: offset.left + frameLeft - docLeft,
                top: offset.top + frameTop - docTop
            };
        },
        // 设置屏锁遮罩
        __lock: function() {
            var that = this;
            var popup = this.__popup;
            var backdrop = this.__backdrop;
            var backdropCss = {
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                userSelect: "none",
                opacity: 0,
                background: this.backdropBackground
            };
            popup.addClass(this.className + "-modal");
            // 避免遮罩不能盖住上一次的对话框
            // 如果当前对话框是上一个对话框创建，点击的那一瞬间它会增长 zIndex 值
            Popup.zIndex = Popup.zIndex + 2;
            this.__zIndex();
            if (!_isFixed) {
                $.extend(backdropCss, {
                    position: "absolute",
                    width: $(window).width() + "px",
                    height: $(document).height() + "px"
                });
            }
            backdrop.css(backdropCss).animate({
                opacity: this.backdropOpacity
            }, 150).insertAfter(popup).attr({
                tabindex: "0"
            }).on("focus", function() {
                that.focus();
            });
        },
        // 卸载屏锁遮罩
        __unlock: function() {
            if (this.modal) {
                this.__popup.removeClass(this.className + "-modal");
                this.__backdrop.remove();
                delete this.modal;
            }
        }
    });
    /** 当前叠加高度 */
    Popup.zIndex = 1024;
    /** 顶层浮层的实例 */
    Popup.current = null;
    Popup.oncreate = $.noop;
    return Popup;
});

/*!
 * artDialog v6.0.0 - 默认配置
 * Date: 2013-12-13
 * https://github.com/aui/artDialog
 * (c) 2009-2013 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */
define("atans/artDialog/6.0.0/dialog-config-debug", [], {
    /* -----注释的配置继承自 popup.js，可以再这里重新定义它----- */
    // 对齐方式
    //align: 'bottom left',
    // 是否固定定位
    //fixed: false,
    // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
    //zIndex: 1024,
    // 设置遮罩背景颜色
    //backdropBackground: '#000',
    // 设置遮罩透明度
    //backdropOpacity: 0.7,
    // 消息内容
    content: '<span class="ui-dialog-loading">Loading..</span>',
    // 标题
    title: "",
    // 对话框状态栏区域 HTML 代码
    statusbar: "",
    // 自定义按钮
    button: null,
    // 确定按钮回调函数
    ok: null,
    // 取消按钮回调函数
    cancel: null,
    // 确定按钮文本
    okValue: "ok",
    // 取消按钮文本
    cancelValue: "cancel",
    // 内容宽度
    width: "",
    // 内容高度
    height: "",
    // 内容与边界填充距离
    padding: "",
    // 对话框自定义 className
    skin: "",
    // 是否支持快捷关闭（点击遮罩层自动关闭）
    quickClose: false,
    // css 文件路径，留空则不会使用 js 自动加载样式
    // 注意：css 只允许加载一个
    cssUri: "../css/ui-dialog.css",
    // 模板（使用 table 解决 IE7 宽度自适应的 BUG）
    // js 使用 i="***" 属性识别结构，其余的均可自定义
    innerHTML: '<div i="dialog" class="ui-dialog">' + '<div class="ui-dialog-arrow-a"></div>' + '<div class="ui-dialog-arrow-b"></div>' + '<table class="ui-dialog-grid">' + "<tr>" + '<td i="header" class="ui-dialog-header">' + '<button i="close" class="ui-dialog-close">&times;</button>' + '<div i="title" class="ui-dialog-title"></div>' + "</td>" + "</tr>" + "<tr>" + '<td i="body" class="ui-dialog-body">' + '<div i="content" class="ui-dialog-content"></div>' + "</td>" + "</tr>" + "<tr>" + '<td i="footer" class="ui-dialog-footer">' + '<div i="statusbar" class="ui-dialog-statusbar"></div>' + '<div i="button" class="ui-dialog-button"></div>' + "</td>" + "</tr>" + "</table>" + "</div>"
});

define("atans/artDialog/6.0.0/ui-dialog-debug.css", [], function() {
    seajs.importStyle(".ui-dialog{*zoom:1;_float:left;position:relative;background-color:#FFF;border:1px solid #999;border-radius:6px;outline:0;background-clip:padding-box;font-family:Helvetica,arial,sans-serif;font-size:14px;line-height:1.428571429;color:#333;opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform .15s ease-in-out,opacity .15s ease-in-out;transition:transform .15s ease-in-out,opacity .15s ease-in-out}.ui-popup-show .ui-dialog{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.ui-popup-focus .ui-dialog{box-shadow:0 0 8px rgba(0,0,0,.1)}.ui-popup-modal .ui-dialog{box-shadow:0 0 8px rgba(0,0,0,.1),0 0 256px rgba(255,255,255,.3)}.ui-dialog-grid{width:auto;margin:0;border:0 none;border-collapse:collapse;border-spacing:0;background:transparent}.ui-dialog-header,.ui-dialog-body,.ui-dialog-footer{padding:0;border:0 none;text-align:left;background:transparent}.ui-dialog-header{white-space:nowrap;border-bottom:1px solid #E5E5E5}.ui-dialog-close{position:relative;_position:absolute;float:right;top:13px;right:13px;_height:26px;padding:0 4px;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #FFF;opacity:.2;filter:alpha(opacity=20);cursor:pointer;background:transparent;_background:#FFF;border:0;-webkit-appearance:none}.ui-dialog-close:hover,.ui-dialog-close:focus{color:#000;text-decoration:none;cursor:pointer;outline:0;opacity:.5;filter:alpha(opacity=50)}.ui-dialog-title{margin:0;line-height:1.428571429;min-height:16.428571429px;padding:15px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:700;cursor:default}.ui-dialog-body{padding:20px;text-align:center}.ui-dialog-content{display:inline-block;position:relative;vertical-align:middle;*zoom:1;*display:inline;text-align:left}.ui-dialog-footer{padding:0 20px 20px}.ui-dialog-statusbar{float:left;margin-right:20px;padding:6px 0;line-height:1.428571429;font-size:14px;color:#888;white-space:nowrap}.ui-dialog-statusbar label:hover{color:#333}.ui-dialog-statusbar input,.ui-dialog-statusbar .label{vertical-align:middle}.ui-dialog-button{float:right;white-space:nowrap}.ui-dialog-footer button+button{margin-bottom:0;margin-left:5px}.ui-dialog-footer button{width:auto;overflow:visible;display:inline-block;padding:6px 12px;_margin-left:5px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.428571429;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;background-image:none;border:1px solid transparent;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.ui-dialog-footer button:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.ui-dialog-footer button:hover,.ui-dialog-footer button:focus{color:#333;text-decoration:none}.ui-dialog-footer button:active{background-image:none;outline:0;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.ui-dialog-footer button[disabled]{pointer-events:none;cursor:not-allowed;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}.ui-dialog-footer button{color:#333;background-color:#fff;border-color:#ccc}.ui-dialog-footer button:hover,.ui-dialog-footer button:focus,.ui-dialog-footer button:active{color:#333;background-color:#ebebeb;border-color:#adadad}.ui-dialog-footer button:active{background-image:none}.ui-dialog-footer button[disabled],.ui-dialog-footer button[disabled]:hover,.ui-dialog-footer button[disabled]:focus,.ui-dialog-footer button[disabled]:active{background-color:#fff;border-color:#ccc}.ui-dialog-footer button.ui-dialog-autofocus{color:#fff;background-color:#428bca;border-color:#357ebd}.ui-dialog-footer button.ui-dialog-autofocus:hover,.ui-dialog-footer button.ui-dialog-autofocus:focus,.ui-dialog-footer button.ui-dialog-autofocus:active{color:#fff;background-color:#3276b1;border-color:#285e8e}.ui-dialog-footer button.ui-dialog-autofocus:active{background-image:none}.ui-popup-top-left .ui-dialog,.ui-popup-top .ui-dialog,.ui-popup-top-right .ui-dialog{top:-8px}.ui-popup-bottom-left .ui-dialog,.ui-popup-bottom .ui-dialog,.ui-popup-bottom-right .ui-dialog{top:8px}.ui-popup-left-top .ui-dialog,.ui-popup-left .ui-dialog,.ui-popup-left-bottom .ui-dialog{left:-8px}.ui-popup-right-top .ui-dialog,.ui-popup-right .ui-dialog,.ui-popup-right-bottom .ui-dialog{left:8px}.ui-dialog-arrow-a,.ui-dialog-arrow-b{position:absolute;display:block;width:0;height:0;overflow:hidden;line-height:0;font-size:0;_color:#FF3FFF;_filter:chroma(color=#FF3FFF)}.ui-popup-top-left .ui-dialog-arrow-a,.ui-popup-top .ui-dialog-arrow-a,.ui-popup-top-right .ui-dialog-arrow-a{bottom:-8px;border-top:8px solid #7C7C7C;border-bottom:0 none;border-left:8px solid transparent;border-right:8px solid transparent}.ui-popup-top-left .ui-dialog-arrow-b,.ui-popup-top .ui-dialog-arrow-b,.ui-popup-top-right .ui-dialog-arrow-b{bottom:-7px;border-top:8px solid #fff;border-bottom:0 none;border-left:8px solid transparent;border-right:8px solid transparent}.ui-popup-top-left .ui-dialog-arrow-a,.ui-popup-top-left .ui-dialog-arrow-b{left:15px}.ui-popup-top .ui-dialog-arrow-a,.ui-popup-top .ui-dialog-arrow-b{left:50%;margin-left:-8px}.ui-popup-top-right .ui-dialog-arrow-a,.ui-popup-top-right .ui-dialog-arrow-b{right:15px}.ui-popup-bottom-left .ui-dialog-arrow-a,.ui-popup-bottom .ui-dialog-arrow-a,.ui-popup-bottom-right .ui-dialog-arrow-a{top:-8px;border-bottom:8px solid #7C7C7C;border-top:0 none;border-left:8px solid transparent;border-right:8px solid transparent}.ui-popup-bottom-left .ui-dialog-arrow-b,.ui-popup-bottom .ui-dialog-arrow-b,.ui-popup-bottom-right .ui-dialog-arrow-b{top:-7px;border-bottom:8px solid #fff;border-top:0 none;border-left:8px solid transparent;border-right:8px solid transparent}.ui-popup-bottom-left .ui-dialog-arrow-a,.ui-popup-bottom-left .ui-dialog-arrow-b{left:15px}.ui-popup-bottom .ui-dialog-arrow-a,.ui-popup-bottom .ui-dialog-arrow-b{margin-left:-8px;left:50%}.ui-popup-bottom-right .ui-dialog-arrow-a,.ui-popup-bottom-right .ui-dialog-arrow-b{right:15px}.ui-popup-left-top .ui-dialog-arrow-a,.ui-popup-left .ui-dialog-arrow-a,.ui-popup-left-bottom .ui-dialog-arrow-a{right:-8px;border-left:8px solid #7C7C7C;border-right:0 none;border-top:8px solid transparent;border-bottom:8px solid transparent}.ui-popup-left-top .ui-dialog-arrow-b,.ui-popup-left .ui-dialog-arrow-b,.ui-popup-left-bottom .ui-dialog-arrow-b{right:-7px;border-left:8px solid #fff;border-right:0 none;border-top:8px solid transparent;border-bottom:8px solid transparent}.ui-popup-left-top .ui-dialog-arrow-a,.ui-popup-left-top .ui-dialog-arrow-b{top:15px}.ui-popup-left .ui-dialog-arrow-a,.ui-popup-left .ui-dialog-arrow-b{margin-top:-8px;top:50%}.ui-popup-left-bottom .ui-dialog-arrow-a,.ui-popup-left-bottom .ui-dialog-arrow-b{bottom:15px}.ui-popup-right-top .ui-dialog-arrow-a,.ui-popup-right .ui-dialog-arrow-a,.ui-popup-right-bottom .ui-dialog-arrow-a{left:-8px;border-right:8px solid #7C7C7C;border-left:0 none;border-top:8px solid transparent;border-bottom:8px solid transparent}.ui-popup-right-top .ui-dialog-arrow-b,.ui-popup-right .ui-dialog-arrow-b,.ui-popup-right-bottom .ui-dialog-arrow-b{left:-7px;border-right:8px solid #fff;border-left:0 none;border-top:8px solid transparent;border-bottom:8px solid transparent}.ui-popup-right-top .ui-dialog-arrow-a,.ui-popup-right-top .ui-dialog-arrow-b{top:15px}.ui-popup-right .ui-dialog-arrow-a,.ui-popup-right .ui-dialog-arrow-b{margin-top:-8px;top:50%}.ui-popup-right-bottom .ui-dialog-arrow-a,.ui-popup-right-bottom .ui-dialog-arrow-b{bottom:15px}@-webkit-keyframes ui-dialog-loading{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes ui-dialog-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.ui-dialog-loading{vertical-align:middle;position:relative;display:block;*zoom:1;*display:inline;overflow:hidden;width:32px;height:32px;top:50%;margin:-16px auto 0 auto;font-size:0;text-indent:-999em;color:#666}.ui-dialog-loading{width:100%\\9;text-indent:0\\9;line-height:32px\\9;text-align:center\\9;font-size:12px\\9}.ui-dialog-loading::after{position:absolute;content:'';width:3px;height:3px;margin:14.5px 0 0 14.5px;border-radius:100%;box-shadow:0 -10px 0 1px #ccc,10px 0 #ccc,0 10px #ccc,-10px 0 #ccc,-7px -7px 0 .5px #ccc,7px -7px 0 1.5px #ccc,7px 7px #ccc,-7px 7px #ccc;-webkit-transform:rotate(360deg);-webkit-animation:ui-dialog-loading 1.5s infinite linear;transform:rotate(360deg);animation:ui-dialog-loading 1.5s infinite linear;display:none\\9}");
});
