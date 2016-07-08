
var activity_detail = {

    init: function() {
        activity_detail.buildUI();
        activity_detail.bindEvents();
    },

    buildUI: function() {
        var $p = $('.txt_content').find('p'),
            desc = $p.text(),
            shareUrl = 'http://www.365rili.com/event/shared.do?id=' + G.eventId;
            //var shareUrl = location.host + '/event/shared.do?id=' + G.eventId;


        $('.activity_info_cover img').css({
            width: 150,
            height: 200
        });

        $p.html(desc.replace(/\n/g, '<br>'));

        //复制链接
        $('.copy_url').zclip({
            path: '/pages/activity_business_admin/js/ZeroClipboard.swf',
            copy: function() {
                return shareUrl;
            }
        });
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
    }
    
};

$(document).ready(function() {
    activity_detail.init();
});
