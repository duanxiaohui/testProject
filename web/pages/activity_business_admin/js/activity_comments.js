
var activity_comments = {

	init: function() {
		activity_comments.bindEvents();
	},

	bindEvents: function() {
		$('body').on('click', '.del_comments', function(event) {
			event.preventDefault();
			var replyId = $(this).closest('li').data('id');
			activity_comments.deleteComments(replyId);
		});
	},

	deleteComments: function(replyId) {
		$.ajax({
            url: '/event/admin/deleteComment.do',
            type: 'post',
            dataType: 'json',
            data: {
            	replyId: replyId
            },
            success: function(data) {
                if(data.state !== 'ok') {
                	alert('请求出错！');
                	return;
                }
                window.location.reload();
            }
        });
	}

};

$(document).ready(function() {
	activity_comments.init();
});