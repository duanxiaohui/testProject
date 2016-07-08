var activity_list = {

	init: function() {
		activity_list.bindEvents();
	},

	bindEvents: function() {
		//取消修改报名人数
		$('.alert_cancel_btn').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();    //注意此处如果不阻止事件冒泡，又会执行下面的.number绑定事件
			$('#enrollCount').val('');
			$('.edit_number').css('display', 'none');

		});
		//取消删除
		$('.cancel_btn').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();    
			$('.deleteActivity').css('display', 'none');

		});
		//确定修改报名人数
		$('.alert_save_btn').on('click', function() {
			event.preventDefault();
			event.stopPropagation(); 
			var $ele = $(this).closest('dl').find('dd:eq(0) b'),
				eventId = $(this).closest('.activity_date_list').data('id');
			activity_list.updateEnrollNumber(eventId, $('#enrollCount').val(), $ele);
			$('#enrollCount').val('');
			$('.edit_number').css('display', 'none');
		});
		//确定删除
		$('.sure_btn').on('click', function() {
			event.preventDefault();
			event.stopPropagation(); 
			var type = $('.deleteActivity').data('type'),
				$activity_date_list = $(this).closest('.activity_date_list'),
				eventId = $activity_date_list.data('id');
			if(type == 'deleteType') {
				activity_list.deleteActivity(eventId);
			} else if(type == 'displayType') {
				var $state = $activity_date_list.find('.state'),
				    $displayBtn = $activity_date_list.find('.displayBtn');
				activity_list.displayActivity(eventId, $displayBtn, $state);
			} else if(type == 'hideType') {
				var	$state = $activity_date_list.find('.state'),
					$hideBtn = $activity_date_list.find('.hideBtn');
				activity_list.hideActivity(eventId, $hideBtn, $state);
			}
			$('.deleteActivity').css('display', 'none');
		});
		//修改显示参加人数
		$('body').on('click', '#updateEnrollCount', function() {
			event.preventDefault();
			var $dd = $(this).closest('dd'),
				$edit_number = $('.edit_number');
			if($edit_number.hasClass('none')) {
				$edit_number.removeClass('none');
			}
			$dd.append($edit_number);
			$edit_number.css('display', 'block');
		});
		//展示活动-隐藏活动-删除活动
		$('body').on('click', '.operation_btn a.displayBtn, .operation_btn a.hideBtn, .operation_btn a.deleteBtn', function(event) {
			event.preventDefault();
			var $dd = $(this).closest('.activity_date_list_footer').prev('dl').find('.number'),
				$deleteActivity = $('.deleteActivity'),
				$txt = $(event.target).text(),
				$promptTxt = $('.deleteActivity .alert_layer_content').find('p');

			if($txt == '删除') {
				$deleteActivity.data('type', 'deleteType');
				$promptTxt.text('确定删除改日程？');
			} else if($txt == '隐藏') {
				$deleteActivity.data('type', 'hideType');
				$promptTxt.text('确定隐藏该活动');
			} else if($txt == '展示') {
				$deleteActivity.data('type', 'displayType');
				$promptTxt.text('确定展示该活动');
			}
			if($deleteActivity.hasClass('none')) {
				$deleteActivity.removeClass('none');
			}
			$dd.append($deleteActivity);
			$deleteActivity.css('display', 'block');
		});
		//创建活动
		$('.add_activity_btn').on('click', function() {
			
		});
		//日历选择
		$('#calendarSel').on('change', function() {
			var calendarId = $(this).find('option:selected').val(),
			    cityCode = $('#citySel').find('option:selected').val();

			activity_list.refreshActivity(location.href, cityCode, calendarId);
		});
		//城市选择
		$('#citySel').on('change', function() {
			var cityCode = $(this).find('option:selected').val(),
			    calendarId = $('#calendarSel').find('option:selected').val();

			activity_list.refreshActivity(location.href, cityCode, calendarId);
		});
	},

	updateEnrollNumber: function(eventId, count, $ele) {
		$.ajax({
            url: '/event/admin/setEnrollCount.do',
            type: 'post',
            dataType: 'json',
            data: {
            	eventId: eventId,
            	count: count
            },
            success: function(data) {
                if(data.state !== 'ok') {
                	alert('修改出错！');
                	return;
                }
                $ele.text(count + '人');
            }
        });
	},

	displayActivity: function(eventId, $ele, $state) {
		$.ajax({
            url: '/event/admin/show.do',
            type: 'post',
            dataType: 'json',
            data: {
            	eventId: eventId
            },
            success: function(data) {
                if(data.state !== 'ok') {
                	alert('请求出错！');
                	return;
                }

                activity_list.setActivityStatus($state, data.isExpire, data.status);
                $ele.removeClass().addClass('hideBtn').text('隐藏');
            }
        });
	},

	hideActivity: function(eventId, $ele, $state) {
		$.ajax({
            url: '/event/admin/hide.do',
            type: 'post',
            dataType: 'json',
            data: {
            	eventId: eventId
            },
            success: function(data) {
                if(data.state !== 'ok') {
                	alert('请求出错！');
                	return;
                }

				activity_list.setActivityStatus($state, data.isExpire, data.status);
				$ele.removeClass().addClass('displayBtn').text('展示');
            }
        });
	},

	deleteActivity: function(eventId) {
		$.ajax({
            url: '/event/admin/delete.do',
            type: 'post',
            dataType: 'json',
            data: {
            	eventId: eventId
            },
            success: function(data) {
                console.log(data);
                if(data.state !== 'ok') {
                	alert('请求出错！');
                	return;
                }

                window.location.reload();
            }
        });
	},

	setActivityStatus: function($state, isExpire, status) {
		if(isExpire == true) {
			if(status == 0) {
				$state.removeClass().addClass('state overdue').text('已过期（展示中）');
			} else if(status == 1) {
				$state.removeClass().addClass('state overdue').text('已过期（隐藏）');
			}
		} else {
			if(status == 0) {
				$state.removeClass().addClass('state show').text('展示中');
			} else if(status == 1) {
				$state.removeClass().addClass('state hide').text('隐藏');
			}
		}
	},

	refreshActivity: function(url, cityCode, calendarId) {
		var link = url.split('?')[0],
			pageParam = G.thisPage;

		window.location.href = link + '?page=' + pageParam + '&citycode=' + cityCode + '&calendarId=' + calendarId;
    }
	
};

$(document).ready(function() {
	activity_list.init();
});