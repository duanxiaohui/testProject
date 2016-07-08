
var activity_detail = {

    init: function() {
        activity_detail.buildUI();
        activity_detail.bindEvents();
    },

    buildUI: function() {
        var $p = $('.txt_content').find('p'),
            desc = $p.text(),
            $state_icon = $('.state_icon'),
            $state_box = $('.state_box'),
            $activity_notes = $('.activity_notes p'),
            $notes_p = $activity_notes.text(),
            status = G.status;

        $('.activity_info_cover img').css({
            width: 147,
            height: 200
        });

        $p.html(desc.replace(/\n/g, '<br>'));
        //生成 分享链接
        //复制链接的时候使用的是 shareUrl
        var eventId = activity_detail.getURLParameter('eventId');
        var shareUrl = "http://www.365rili.com/event/shared.do?id=" + eventId;
        //复制链接
        $('.copy_url').zclip({
            path: '/pages/activity_business/js/ZeroClipboard.swf',
            copy: function() {
                return shareUrl;
            }
        });

        if(status == 0) {
            $state_icon.text('进行中');
            $state_box.removeClass('ac_hidden expired');
        } else if(status == 1) {
            $state_icon.text('隐藏');
            $state_box.removeClass('expired').addClass('ac_hidden');
        } else if(status == 2) {
            $state_icon.text('已过期');
            $state_box.removeClass('ac_hidden').addClass('expired');
        }
        console.log($notes_p);
        $activity_notes.html($notes_p.replace(/\n/g, '<br>'));
    },

    bindEvents: function() {
        $('.view_orders').on('click', function() {
            var id = $(this).data('id');
            window.location.href = '/event/business/orders.do?eventId=' + id;
        });

        $('a[rel*=lightbox]').lightbox({
            fitToScreen: true,
            fileLoadingImage: '/images/lightbox/loading.gif',
            fileBottomNavCloseImage: '/images/lightbox/closelabel.gif'
        });
    },

    getURLParameter: function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

};

$(document).ready(function() {
    activity_detail.init();
});
