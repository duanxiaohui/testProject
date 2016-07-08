
var activity_orders = {

    init: function() {
        activity_orders.bindEvents();
        activity_orders.renderSelect(G.pageTotal);
    },

    bindEvents: function() {
        //搜索授权码
        $('.search_btn').on('click', function() {
            var $orders_search = $('.orders_search');
            var search_txt = $orders_search.find('input').val();
            activity_orders.searchCaptcha(search_txt);
        });
        //点击某一页
        $('.page_num').on('click', function() {
            var number = $(this).text();
            $('.page_box').data('pageNum', number);
            activity_orders.searchPage(number);
        });
        //上一页
        $('.prve_btn').on('click', function() {
            var number = $('.page_box').data('pageNum');
            if(number == undefined || number == 1) return;
            number--;
            $('.page_box').data('pageNum', number);
            activity_orders.searchPage(number);
        });
        //下一页
        $('.next_btn').on('click', function() {
            var number = $('.page_box').data('pageNum');
            if(number == G.pageTotal) return;
            number == undefined ? number=2 : number++;
            $('.page_box').data('pageNum', number);
            activity_orders.searchPage(number);
        });
        //选择某一页
        $('.true_btn').on('click', function() {
            var number = $('#pageTotal').val();
            activity_orders.searchPage(number);
        });
        //根据验证码来处理相应的情况
        $('.layer_btn').on('click', function() {
            var $activity_obj = $('.tips_layer p').data('activity_obj'),
                flag = $activity_obj.flag,
                captcha = $activity_obj.captcha;
            if(flag == 1) {
                activity_orders.acceptService(G.eventId, captcha);
            } else if(flag == 'recovery') {
                activity_orders.recoveryCaptcha(G.eventId, captcha);
            } else {
                $('.tips_layer').css('display', 'none');
            }
        });
        //取消
        $('.cancel_btn').on('click', function() {
            $('.tips_layer').css('display', 'none');
        });
        //恢复
        $('.orders_search_results').on('click', '.recovery_btn', function() {
            $('.tips_layer').css('display', 'block');
            var captcha = $(this).closest('li').find('p:first').text();
            $('.tips_layer p').text('是否恢复该授权码为未使用状态？').data('activity_obj', {
                'flag': 'recovery',
                'captcha': captcha
            });
        });
    },
    //填充select tag总页数
    renderSelect: function(number) {
        if(number == 0) return;
        var $pageTotal = $('#pageTotal');
        for(var i=0; i<number; i++) {
            $pageTotal.append('<option value="' + (i+1) + '">' + (i+1) + '</option>');
        }
    },
    //查询某页授权码列表
    searchPage: function(number) {
        $.ajax({
            url: '/event/business/getOrders.do',
            type: 'post',
            dataType: 'json',
            data: {
                eventId: G.eventId,
                page: number
            },
            success: function(data) {
                activity_orders.renderData(data);
            }
        });
    },
    //查询授权码
    searchCaptcha: function(search_txt) {
        if(search_txt == '') return;
        $.ajax({
            url: '/event/business/searchCode.do',
            type: 'post',
            dataType: 'json',
            data: {
                eventId: G.eventId,
                code: search_txt
            },
            success: function(data) {
                activity_orders.handleStatus(data);
            }
        });
    },
    //授权码接受服务
    acceptService: function(eventId, captcha) {
        $.ajax({
            url: '/event/business/acceptCode.do',
            type: 'post',
            dataType: 'json',
            data: {
                eventId: eventId,
                code: captcha
            },
            success: function(data) {
                $('.tips_layer').css('display', 'none');
                activity_orders.renderData(data);
            }
        });
    },
    //渲染授权码列表
    renderData: function(data) {
        if(data.state != 'ok') return;
        var $ul = $('.orders_search_results ul'),
            result = '';
        $ul.empty();
        $.each(data.orders, function(k, v) {
            result += '<li><p>' + v.code + '&nbsp;</p><p>' + v.cellphone + '&nbsp;</p><p>' + v.username + '&nbsp;</p><p><a href="javascript:;" class="recovery_btn">恢复</a></p></li>';
        });
        $ul.append(result);
    },

    handleStatus: function(data) {
        if(data.state != 'ok') return;
        var $orders_search = $('.orders_search'),
            search_txt = $orders_search.find('input').val(),
            $p = $('.tips_layer p');
        $('.tips_layer').css('display', 'block');
        $p.text(data.msg).data('activity_obj', {
            'flag': data.code,
            'captcha': search_txt
        });
    },
    //恢复授权码
    recoveryCaptcha: function(eventId, captcha) {
        $.ajax({
            url: '/event/business/recoverCode.do',
            type: 'post',
            dataType: 'json',
            data: {
                eventId: eventId,
                code: $.trim(captcha)
            },
            success: function(data) {
                $('.tips_layer').css('display', 'none');
                activity_orders.renderData(data);
            }
        });
    }

};

$(document).ready(function() {
    activity_orders.init();
});
