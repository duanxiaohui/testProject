
var activity_list = {

    init: function() {
        $('.product_info').addClass('product_info');

        $(document).on('click', 'a.view_btn', function(event) {
            event.stopPropagation();
            var id = $(this).data('id');
            window.location.href = '/event/business/orders.do?eventId=' + id;
        });

        $(document).on('click', 'div.activity_img, div.activity_content', function(event) {
            var $ele = $(this),
                $link = null,
                id = 0;

            if($ele.is('div.activity_img')) {
                $link = $ele.next('div.activity_content').find('a');
            } else if($ele.is('div.activity_content')) {
                $link = $ele.find('a');
            }

            id = $link.data('id');
            window.location.href = '/event/business/detail.do?eventId=' + id;
        });
    }

};

$(document).ready(function() {
    activity_list.init();
});




































