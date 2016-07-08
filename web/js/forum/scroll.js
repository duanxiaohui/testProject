/**
 * scroll
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-05 14:09:29
 */

// (function() {

    function args() {
        return {
            iniL: 30,
            iniT: 100,
            eCallback: slide,
            mCallback: function(tPoint) {
                if(tPoint.noScroll){
                    return false;
                }
                if(!tPoint.keepScroll){
                    var x = Math.abs(tPoint.mX);
                    var y = Math.abs(tPoint.mY);
                    if(y != 0 && x / y < 1.7){
                        tPoint.noScroll = true;
                        return false;
                    }
                    else{
                        tPoint.keepScroll = true;
                        var _body = $(document.body);
                        var _document = $(document.documentElement);
                        var bst = _body.scrollTop();
                        var dst = _document.scrollTop();
                        _body.css({
                            'overflow':'hidden',
                            height:'100%'
                        }).scrollTop(bst);
                        _document.css({
                            'overflow':'hidden',
                            height:'100%'
                        }).scrollTop(dst);
                    }
                }
                var _this = tPoint.self,
                    _inner = _this.children(),
                    singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right'))),
                    innerW = singleW * tPoint.total;
                var offset = tPoint.mX + tPoint.offset;
                transformBox(_inner, offset, 0, tPoint.has3d);
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

    function slide(tPoint, d) {
        delete tPoint.keepScroll;
        $(document.documentElement).css({
            height:'auto',
            overflow:'visible',
            '-webkit-overflow-scrolling' : 'touch'
        });
        $(document.body).css({
            height:'auto',
            overflow:'visible',
            '-webkit-overflow-scrolling' : 'touch'
        });
        if(tPoint.noScroll){
            delete tPoint.noScroll;
            return false;
        }
        var _this = tPoint.self,
            _inner = _this.children(),
            singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right'))),
            innerW = singleW * tPoint.total;
            count = tPoint.count,
            d = d ? d : tPoint.direction;

        switch (d) {
            case "left":
                count -= (parseInt(-tPoint.mX / singleW) + 1)
                break;
            case "right":
                count += (parseInt(tPoint.mX / singleW) + 1)
        }

        if (count >= 1) {
            count = 0;
        }
        if (count <= -tPoint.total) {
            count = (typeof _autoSlide != "undefined") ? 0 : -tPoint.total + 1;
        }

        var offset = count * innerW / tPoint.total;

        //判断右边界
        if((innerW + offset) < _inner.width()){
        	offset = - innerW + _inner.width() + parseInt(_inner.children().css('margin-right'));
	        //修复count
	        count = -(tPoint.total - parseInt(_inner.width() / singleW) - 1);
        }

        //判断左边界
        if(innerW < _inner.width()){
        	offset = 0;
        	count = 0;
        }

        transformBox(_inner, offset, tPoint.speed, tPoint.has3d);

        tPoint.setAttr("count", count);
        tPoint.setAttr("offset", offset);
    }
// })()
