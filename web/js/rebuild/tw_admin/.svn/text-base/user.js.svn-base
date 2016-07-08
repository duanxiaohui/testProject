/**
 * user.js
 * @authors huangyi
 * @date    2014-08-10 16:57:30
 * @version 0.1
 */

define([
	'rebuild/base/common'
], function(c) {
	var _ex = {
		init: function(){
			_ex.setGreetingWord();
			_ex.bindEvent();
			_ex.getUserList(1);
		},
		bindEvent : function(){
			$('.user_manage_ul li').click(function(){
				$(this).addClass("on");
				$(".my_calendar_nav li.on").removeClass("on");
				$(".calendar_right_newbox").hide();
				$(".user_management").show();
			});
			$('.my_calendar_nav ul').on("click", "li", function(){
				$('.user_manage_ul li.on').removeClass("on");
				$(".calendar_right_newbox").show();
				$(".user_management").hide();
				
			})

			$('.user_list_td').on("click", ".reset_btn", function(){
				var uid = $(this).attr("uid");
				$.alert("确定要重置密码？", {
					buttons:{
						"确定": function(){
							$.ajax({
								url:"/tuanwei/tw_resetpwd.do",
								type:"POST",
								data:{
									userId: uid,
									currentPage: _ex.data.currentPage
								},
								dataType:"json",
								success: function(data){
									if(data.state == "ok"){
										$.alert("重置密码成功");
									}else{
										$.alert("重置密码失败");
									}
								}
							});
							$(this).dialog("close");
						},
						"取消": function(){
							$(this).dialog("close");
						}
					}
				});
			});
			
			$('.user_list_td').on("click", ".del_btn", function(){
				var uid = $(this).attr("uid");
				var row = $(this).parent().parent();
				$.alert("确定要删除该用户？", {
					buttons:{
						"确定": function(){
							$.ajax({
								url:"/tuanwei/tw_delUser.do",
								type:"POST",
								data:{
									userId: uid,
									currentPage: _ex.data.currentPage
								},
								dataType:"json",
								success: function(data){
									if(data.state == "ok"){
										row.remove();
									}
								}
							});
							$(this).dialog("close");
						},
						"取消": function(){
							$(this).dialog("close");
						}
					}
				});
			});


			$('.user_list_pages ul').on("click", ".page_normal a", function(){
				var page = $(this).html();
				_ex.getUserList(page);
			});

			$(".search_user_text").on("keypress", function(evt){
				if(evt.which == 13 || evt.which == 10){
					_ex.searchBtnClicked();
				}
			});
			$('.search_btn').on("click", _ex.searchBtnClicked);
			$('.show_user_btn').on("click", function(){
				$(this).hide();
				_ex.getUserList(1);
				$(".search_user_text").val("");
			});
		},
		searchBtnClicked: function(){
			var text = $(".search_user_text").val().trim();
			if(text == ""){
				_ex.getUserList(1);
				$(".show_user_btn").hide();
			}else{
				_ex.getUserByCondition(text);
				$(".show_user_btn").show();
			}
		},
		setGreetingWord: function(){
			var weekAry = ['日','一','二','三','四','五','六'];
			var date = new Date();
			var dateStr = "今天是" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 星期" + weekAry[date.getDay()];
			$("#sp_user_info").html('欢迎进入团委管理后台，' + dateStr);
		},
		getUserList: function(page){
			$.ajax({
				url:"/tuanwei/tw_getUserList.do?currentPage=" + page,
				type:"GET",
				dataType:"json",
				success: function(data){
					_ex.data = data;
					_ex.renderUserList(data);
				}
			});
		},
		getUserByCondition: function(condition){
			$.ajax({
				url:"/tuanwei/tw_getUserByCondition.do?condition=" + condition,
				type:"GET",
				dataType:"json",
				success: function(rs){
					if(rs.state == "ok"){
						_ex.renderUserList({"lists":rs.data, totalPage: 1, currentPage: 1});
					}else{
						$.alert("搜索结果出错");
					}
				}
			})
		},
		renderUserList: function(data){
			//render user list
			var table = $('.user_list_td');
			table.empty();
			for(var i in data.lists){
				var item = data.lists[i];
				var row = $('<tr></tr>');
				row.append('<td>'+item.userName+'</td>');
				row.append('<td><div title="'+item.company+'">'+item.company+'</div></td>');
				row.append('<td>'+item.phone_number+'</td>');
				row.append('<td><a href="'+item.account+'" target="_blank">'+item.account+'</a></td>');
				row.append('<td>'+item.place_name+'</td>');
				row.append('<td>'+item.group_name+'</td>');				
				row.append('<td><div title="'+item.bak+'">'+item.bak+'</div></td>');
				row.append('<td><a href="javascript:;" class="reset_btn" uid="'+item.userId+'">重置密码</a><a href="javascript:;" class="del_btn" uid="'+item.userId+'">删除</a></td>');
				table.append(row);
			}
			if(data.lists.length == 0){
				table.append('<tr><td>搜索结果为空</td></tr>');
			}
			//render page list
			var pageList = $('.user_list_pages ul');
			pageList.empty();
			if(data.totalPage <= 9){
				for(var i = 1;i <= data.totalPage; i++){
					_ex.renderPageItem(i, data.currentPage, pageList);
				}
			}else{
				var cp = data.currentPage;
				if(cp <= 5){
					for(var i = 1; i <= 8; i++){
						_ex.renderPageItem(i, cp,pageList);
					}
					_ex.renderPageItem(0, cp, pageList);
					_ex.renderPageItem(data.totalPage, cp, pageList);	
				}else if(cp > 5 && cp < data.totalPage - 4){
					_ex.renderPageItem(1, cp, pageList);
					_ex.renderPageItem(0, cp, pageList);
					for(var i = cp-3; i <= cp + 3; i++){
						_ex.renderPageItem(i, cp, pageList);
					}
					_ex.renderPageItem(0, cp, pageList);
					_ex.renderPageItem(data.totalPage, cp, pageList);
				}else if(cp >= data.totalPage -4){
					_ex.renderPageItem(1, cp, pageList);
					_ex.renderPageItem(0, cp, pageList);
					for(var i=data.totalPage-7; i <= data.totalPage; i++){
						_ex.renderPageItem(i, cp, pageList);
					}
				}
			}
		},
		renderPageItem: function(page, currentPage, container){
			if(page == 0){
				container.append('<li class="page_omit">...</li>');
			}else if(page == currentPage){
				container.append('<li class="page_select"><a href="javascript:;">'+page+'</a></li>');
			}else{
				container.append('<li class="page_normal"><a href="javascript:;">'+page+'</a></li>');
			}
		},
		login: function(){
			$.ajax({
				url:"/tuanwei/tw_loginAction.do",
				type:"POST",
				dataType:"json",
				data:{
					username:"twtest",
					password:"0b4e7a0e5fe84ad35fb5f95b9ceeac79",
					save:false
				},
				success: function(data){

				}
			})
		},
		relogin: function(){
			$.alert('对不起，您的登录已经过期，请重新登录！', {
	            buttons: {
	                '确定': function() {
	                    location = '/tuanwei/login.do';
	                }
	            }
		    });
		}
	}
	
	amplify.subscribe('initApp', _ex.init);
	amplify.subscribe('loginTimeout', _ex.relogin);

});