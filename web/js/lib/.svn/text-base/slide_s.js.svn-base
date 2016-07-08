/**
 * 封装幻灯
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-10-22 12:11:14
 */

(function() {
    var data = {};

    function slide(opt) {
        var pics = opt.pics || {};
        var index = opt.index; //是否显示点点点 index等于2时 显示数字
        var scroll = opt.scroll;
        var proportion = opt.proportion;
        var auto = opt.auto;
        //限制小图滚动
        var banSlid = opt.banSlid || opt.banSlid == undefined ? true : false; 
        var imgBIg = opt.imgBIg || opt.imgBIg == undefined ? true : false; //限制小图点击事件
        var imgZoom = opt.imgZoom || opt.imgZoom == undefined ? true : false; //限制小图等比例缩放
        var arrow = opt.arrow; //是否显示左右箭头
        var _this = $(this);

        var unde;
        if (unde == index) {
            index = true;
        }
        if (unde == scroll) {
            scroll = true;
        }

        data.scroll = scroll;
        data.index = index;

        var imageContainer = $('<div class="public_image_container public_image_container_out"></div>');
        _this.append(imageContainer);
        index && index != "2" && _this.append('<div class="public_image_index"></div>');

        var $ul = $("<ul class='public_image_container_ul'></ul>").appendTo(imageContainer);
        var picAry;
        console.log(pics);
        if (Object.prototype.toString.call(pics).toLowerCase() == '[object array]') {
            picAry = pics
        } else {
            picAry = pics.split(',');
            console.log(picAry);
        }
        index && index == "2" && _this.append('<div class="public_image_num"><span class="public_image_current">1</span><span class="public_image_sum">/' + picAry.length + '</span></div>');
        arrow && imageContainer.append('<a href="javascript:;" class="prev_btn flip_btn"></a><a href="javascript:;" class="next_btn flip_btn"></a>');

        if (!scroll) {
            for (var i in picAry) {
                var $img = $('<li data-index="' + i + '"><a href="javascript:;"><img class="public_image"/></a></li>').appendTo($ul);
                index && index != "2" && _this.find('.public_image_index').append('<span class="public_image_span"></span>');
                (function(img, o) {
                    var _img = new Image();
                    _img.onload = function() {
                        var w = _img.width;
                        var h = _img.height;
                        var imgO = o.find('img')[0];
                        if (imgZoom) {
                            if (w > h) {
                                imgO.style.height = '100%';
                                imgO.style.width = 'auto';
                            } else {
                                imgO.style.width = '100%';
                                imgO.style.height = 'auto';
                            }
                        }
                        if (img.pic) {
                            imgO.src = img.pic;
                            $(imgO).data('url', img.jumpUrl);
                        } else {
                            imgO.src = img;
                        }
                    };
                    if (img.pic) {
                        _img.src = img.pic;
                    } else {
                        _img.src = img;
                    }

                })(picAry[i], $img);
            }
        } else if (proportion) {
            for (var i in picAry) {
                var $img = $('<li data-index="' + i + '"><a href="javascript:;"><img class="public_image"/></a></li>').appendTo($ul);
                index && index != "2" && _this.find('.public_image_index').append('<span class="public_image_span"></span>');
                (function(img, o) {
                    var _img = new Image();
                    _img.onload = function() {
                        var w = _img.width;
                        var h = _img.height;
                        var imgO = o.find('img')[0];
                        if (w / h == 75 / 38) {
                            imgO.style.width = '100%';
                            imgO.style.height = 'auto';
                        }
                        if (w > h) {
                            imgO.style.width = '100%';
                            imgO.style.height = 'auto';
                        } else {
                            imgO.style.height = '100%';
                            imgO.style.width = 'auto';
                        }
                        if (img.pic) {
                            imgO.src = img.pic;
                            $(imgO).data('url', img.jumpUrl);
                        } else {
                            imgO.src = img;
                        }
                    };
                    if (img.pic) {
                        _img.src = img.pic;
                    } else {
                        _img.src = img;
                    }

                })(picAry[i], $img);
            }
        } else if (auto) {
            for (var i in picAry) {
                var $img = $('<li data-index="' + i + '"><a href="javascript:;"><img class="public_image"/></a></li>').appendTo($ul);
                index && index != "2" && _this.find('.public_image_index').append('<span class="public_image_span"></span>');
                (function(img, o) {
                    var _img = new Image();
                    _img.onload = function() {
                        var w = _img.width;
                        var h = _img.height;
                        var imgO = o.find('img')[0];
                        if (w > h) {
                            imgO.style.width = '100%';
                            imgO.style.height = 'auto';
                        } else {
                            imgO.style.height = '100%';
                            imgO.style.width = 'auto';
                        }
                        if (img.pic) {
                            imgO.src = img.pic;
                            $(imgO).data('url', img.jumpUrl);
                        } else {
                            imgO.src = img;
                        }
                    };
                    if (img.pic) {
                        _img.src = img.pic;
                    } else {
                        _img.src = img;
                    }

                })(picAry[i], $img);
            }
        } else {
            for (var i in picAry) {
                var $img = $('<li data-index="' + i + '"><a href="javascript:;"><img src="' + picAry[i] + '" class="public_image"/></a></li>').appendTo($ul);
                index && index != "2" && _this.find('.public_image_index').append('<span class="public_image_span"></span>');
            }
        }
        _this.find('.public_image_span').eq(0).addClass('on');
        if (picAry.length === 1) {
            $('.public_image_index').addClass('none');
        }
        var currentIndex = 0;

        var maxIndex = picAry.length;
        var _tPoint;
        if (!scroll) {
            var li = $($ul.find('li')[0]);
            var w = (parseInt(li.css('width')) + parseInt(li.css('margin-right')) + parseInt(li.css('margin-left'))) * maxIndex;
            $ul.css('width', w + 'px');
        }

        // imageContainer.Swipe(args(function(tPoint){
        //     if(tPoint.direction == "left"){
        //         if(currentIndex >= maxIndex - 1){
        //             return;
        //         }
        //         currentIndex ++;
        //     }else if(tPoint.direction == "right"){
        //         if(currentIndex <= 0)
        //             return;
        //         currentIndex--;
        //     }
        //     index && _this.find('.public_image_span.on').removeClass('on');
        //     index && _this.find('.public_image_span').eq(currentIndex).addClass('on');
        //     var unde;
        //     tPoint.setAttr("direction", unde);
        //     _tPoint = tPoint;
        // }));
        if (banSlid) {
            imageContainer.Swipe(args(function(tPoint) {
                if (tPoint.direction == "left") {
                    if (currentIndex >= maxIndex - 1) {
                        return;
                    }
                    currentIndex++;
                } else if (tPoint.direction == "right") {
                    if (currentIndex <= 0)
                        return;
                    currentIndex--;
                }
                index && _this.find('.public_image_span.on').removeClass('on');
                index && _this.find('.public_image_span').eq(currentIndex).addClass('on');
                index && index == "2" && _this.find('.public_image_current').html(currentIndex + 1);
                if(arrow){
                    if(currentIndex == 0){
                        $(".prev_btn").hide();
                    }else if(currentIndex == picAry.length - 1){
                        $(".next_btn").hide();
                    }else{
                        $(".prev_btn").show();
                        $(".next_btn").show();
                    }
                }
                var unde;
                tPoint.setAttr("direction", unde);
                _tPoint = tPoint;
            }));
        }


        //点击图片弹层
        if (imgBIg) {
            $('.public_image_container_ul img').on('tap', function(event) {
                $(document.documentElement).css({
                    'overflow': 'hidden',
                    height: '100%'
                });
                $(document.body).css({
                    'overflow': 'hidden',
                    height: '100%'
                });
                event.preventDefault();
                var $popDiv = $('<div class="popDiv" style="display:none"></div>');
                $('body').append($popDiv);
                $popDiv.fadeIn('fast');

                var imageContainer = $('<div class="public_image_container"></div>');
                var $popDiv = $('.popDiv');
                $popDiv.append(imageContainer);
                var $ul = $("<ul class='public_image_container_ul'></ul>").appendTo(imageContainer);
                // var picAry;
                // if (Object.prototype.toString.call(pics)) {
                //     picAry = pics
                // } else {
                //     picAry = pics.split(',');
                // }
                for (var i in picAry) {
                    $ul.append('<li data-index="' + i + '"><img style="display:none;" data-src="' + picAry[i] + '" class="public_image"/></li>');
                }
                $ul.hide();


                // var currentIndex = $(this).closest('li').data('index');
                var maxIndex = picAry.length;
                var currIdx = $(this).parents('li').data('index');
                var opt = args(function(tPoint) {
                    if (!scroll) {
                        return;
                    }
                    if (tPoint.direction == "left") {
                        if (currentIndex >= maxIndex - 1) {
                            return;
                        }
                        scroll && currentIndex++;
                    } else if (tPoint.direction == "right") {
                        if (currentIndex <= 0)
                            return;
                        scroll && currentIndex--;
                    }
                    index && _this.find('.public_image_span.on').removeClass('on');
                    index && _this.find('.public_image_span').eq(currentIndex).addClass('on');
                    var unde;
                    tPoint.setAttr("direction", unde);
                });
                var offset = -currIdx * imageContainer.width();
                opt.afterCallback = function(tPoint) {
                    tPoint.setAttr('count', -currIdx);
                    tPoint.setAttr('offset', offset);
                };
                imageContainer.on('tap', function(event) {
                    $popDiv.remove();
                    $(document.documentElement).css({
                        height: 'auto',
                        overflow: 'visible',
                        '-webkit-overflow-scrolling': 'touch'
                    });
                    $(document.body).css({
                        height: 'auto',
                        overflow: 'visible',
                        '-webkit-overflow-scrolling': 'touch'
                    });
                    if (!scroll) {
                        return;
                    }
                    var _imageContainer = $('.public_image_container_out');
                    var offset = -currentIndex * _imageContainer.width();
                    transformBox(_imageContainer.find('.public_image_container_ul'), offset, 0, 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
                    _tPoint.setAttr('count', -currentIndex);
                    _tPoint.setAttr('offset', -currIdx * _imageContainer.width());
                    imageContainer.die("tap");
                    return false;
                })
                $ul.find('img').each(function(i, o) {
                    var _o = $(o);
                    var src = _o.data('src');
                    var img = new Image;
                    img.onload = function() {
                        o.src = src;
                        var ww = $(window).width();
                        var wh = $(window).height();
                        if (img.width / img.height >= ww / wh) {
                            o.style.width = ww + 'px';
                        } else {
                            o.style.height = wh + 'px';
                        }

                        setTimeout(function() {
                            transformBox(imageContainer.find('.public_image_container_ul'), offset, 0, 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
                            $ul.is(':visible') || $ul.fadeIn('fast', function() {
                                imageContainer.Swipe(opt);
                            });
                            o.style.display = 'block';
                            var w = _o.width();
                            var h = _o.height();
                            o.style.top = (wh - h) / 2 + 'px'
                            o.style.marginLeft = -w / 2 + 'px';
                        }, 500);
                    };
                    img.src = src;
                });

            });
        }

        function args(success) {
            return {
                iniL: 30,
                iniT: 100,
                pointDom: arrow ? '.flip_btn' : '',
                pointCallback: function(tPoint) {
                    var direction = $(this).hasClass('next_btn')? "left" : "right";
                    tPoint.setAttr("direction", direction);
                    tPoint.eCallback(tPoint);
                },
                eCallback: function(tPoint, d) {

                    var _this = tPoint.self;
                    var _inner = _this.children("ul"),
                        singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right')));

                    if (!data.scroll && _this.hasClass('public_image_container_out')) {
                        tPoint.total = Math.ceil(parseInt(_this.find('.public_image_container_ul').css('width')) / _this.width());
                        singleW = parseInt(_this.width());
                    }
                    var innerW = singleW * tPoint.total;
                    var count = tPoint.count;

                    switch (tPoint.direction) {
                        case "left":
                            count -= (parseInt(-tPoint.mX / singleW) + 1)
                            break;
                        case "right":
                            count += (parseInt(tPoint.mX / singleW) + 1)
                            break;
                        default:
                            break;
                    }

                    if (count >= 1) {
                        count = 0;
                    }
                    if (count <= -tPoint.total) {
                        count = (typeof _autoSlide != "undefined") ? 0 : -tPoint.total + 1;
                    }

                    var offset = count * innerW / tPoint.total;
                    if (!data.scroll && _this.hasClass('public_image_container_out')) {} else {
                        //判断右边界
                        if ((innerW + offset) < _inner.width()) {
                            offset = -innerW + _inner.width() + parseInt(_inner.children().css('margin-right'));
                            //修复count
                            count = -(tPoint.total - parseInt(_inner.width() / singleW) - 1);
                        }
                    }


                    //判断左边界
                    if (innerW < _inner.width()) {
                        offset = 0;
                        count = 0;
                    }
                    transformBox(_inner, offset, tPoint.speed, tPoint.has3d);

                    tPoint.setAttr("count", count);
                    tPoint.setAttr("offset", offset);

                    success && success(tPoint);
                },
                mCallback: function(tPoint) {
                    var _this = tPoint.self,
                        _inner = _this.children("ul"),
                        singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right'))),
                        innerW = singleW * tPoint.total;
                    var offset = tPoint.mX + tPoint.offset;
                    transformBox(_inner, offset, 0, tPoint.has3d);
                }
            }

        }
    }

    function transformBox(obj, value, time, has3d) {
        var time = time ? time : 0;
        transl = has3d ? "translate3d(" + value + "px,0,0)" : "translate(" + value + "px,0)";
        obj.css({
            '-webkit-transform': transl,
            '-webkit-transition': time + 'ms linear'
        });
    }

    if (window.jQuery || window.Zepto) {
        (function(a) {
            a.fn.Slide = slide;
        })(window.jQuery || window.Zepto)
    };
})();