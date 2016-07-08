/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-06-03 10:52:29
 * @version 1.0
 */

(function () {
	var _data = {};
	var key = query('key',decodeURIComponent(window.location.href));
	var startDate = query('startDate',decodeURIComponent(window.location.href)), startTime = query('startTime',decodeURIComponent(window.location.href)) ,team_1 = query('team_1',decodeURIComponent(window.location.href)),team_2 = query('team_2',decodeURIComponent(window.location.href));
	var codeArray ={"80fc5e12-ca03-4d8e-954a-92cabc121641": "gQHO8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1VeXJYQ2ZsZ1JqNGZJT1RLV0FTAAIE24ZOVwMEAAAAAA==",
					"2b358c25-08bf-4868-845b-270b6a23a064": "gQEz8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dFeVl2dGJsdGhqUGltWjFHbUFTAAIE2oZOVwMEAAAAAA==", 
					"7e6d9a19-48f4-4b06-b419-953fd2525206": "gQHD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2xreFE4MGJsZXhnQzJlZzkwbUFTAAIE2oZOVwMEAAAAAA==", 
					"6e28a0b9-79cb-46e2-90a5-e3e5973ef3a6": "gQFF8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFVeDVObHZsV3hnaVFxdnhfMkFTAAIE2oZOVwMEAAAAAA==", 
					"85f62ab0-48b6-4d6e-9c97-c126362eb55e": "gQGi8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dreXkwU0RsblJqa0VXUWJNR0FTAAIE3YZOVwMEAAAAAA==",
					"1fff5c14-5525-42b2-9136-2c8d382573f0": "gQEo8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3dFeGtiaTdsWGhnbmVyNng1bUFTAAIE3YZOVwMEAAAAAA==",
					"2b358c25-08bf-4868-845b-270b6a23a064": "gQEz8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dFeVl2dGJsdGhqUGltWjFHbUFTAAIE2oZOVwMEAAAAAA==",
					"2d7a5283-0b7f-4bac-8cf8-fd1abb52b2f8": "gQGO8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzYwd1F6SnZsTlJoTVJwVU1rbUFTAAIE24ZOVwMEAAAAAA==",
					"03b81141-ffbb-40aa-a76e-5464968b6542": "gQHT8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzBrd1NXSlhsUEJoRjVheVRrR0FTAAIE3IZOVwMEAAAAAA==",
					"4a51a74f-49cc-46fa-a4b8-86f06e792c2c": "gQGQ8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2FreXRSVWZrZEJnTmtoUjVMMkFTAAIE2oZOVwMEAAAAAA==",
					"4c0a04c8-eb90-4d42-9e41-b2780973a30b": "gQGT8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzYweHhZbG5sWFJna0twV3I4MkFTAAIE3IZOVwMEAAAAAA==",
					"4d91612d-4d85-44e7-9d2b-121c0d91fc24": "gQGD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1ZFeG5WdHZsVEJnMUl5cVk1V0FTAAIE2IZOVwMEAAAAAA==",
					"5a5a69a4-01d0-451c-b4dc-e52e39044b19": "gQEE8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1IwdzMyZDdsQkJoOXVqa1B0V0FTAAIE24ZOVwMEAAAAAA==",
					"6ddad046-d721-487e-b531-97f1dda846ef": "gQHt8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1pVeDlXaURsV1JnZzVSdWItMkFTAAIE3YZOVwMEAAAAAA==",
					"6e28a0b9-79cb-46e2-90a5-e3e5973ef3a6": "gQFF8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFVeDVObHZsV3hnaVFxdnhfMkFTAAIE2oZOVwMEAAAAAA==",
					"7c253b67-8523-4063-931d-1c7513d4bb8b": "gQHj8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL09Vd0ZyeVRsTUJoSlNFZC1oMkFTAAIE24ZOVwMEAAAAAA==",
					"7df81ca8-19f6-45ac-a516-cfd83d759696": "gQFv8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2RFeXZ4cVBsakJqMTZ3b0FMV0FTAAIE24ZOVwMEAAAAAA==",
					"7e6d9a19-48f4-4b06-b419-953fd2525206": "gQHD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2xreFE4MGJsZXhnQzJlZzkwbUFTAAIE2oZOVwMEAAAAAA==",
					"8cdbea2f-29ff-477d-bb9e-dce0a9dad4af": "gQFS8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0YweVdtOXpscGhqZnFtbE9GR0FTAAIE3IZOVwMEAAAAAA==",
					"9adca046-b9be-4201-aa54-8d868f398030": "gQGE8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dVd3pEWVBsQWhoN2JXZlpzV0FTAAIE2YZOVwMEAAAAAA==",
					"9d3e851b-8709-41db-bbc0-ff3a2a4bf533": "gQF28DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFreFBaWjNsWnhnZTFLaW96V0FTAAIE3oZOVwMEAAAAAA==",
					"16f077fe-4b6e-4ae7-bc6a-469cfd2c928a": "gQE08ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2dVeDh2OVBsVUJncEYtOTItbUFTAAIE3YZOVwMEAAAAAA==",
					"41ea5604-4569-4dbe-9461-48929b331aea": "gQEI8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3drd2RfdW5sTGhoWEs3d3NuMkFTAAIE24ZOVwMEAAAAAA==",
					"048c93e7-c47a-4b7e-858a-301009d77d13": "gQFP8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2IweFRwNmpraXhqeW1oR2EwV0FTAAIE3oZOVwMEAAAAAA==",
					"52ea7388-ad2e-414f-9118-8830cd20d9d3": "gQFp8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1Rrd3VNYkhsQ1Jod05ERHpyR0FTAAIE2oZOVwMEAAAAAA==",
					"67a69b68-340f-4a8b-aec7-3125cb64c16f": "gQH/8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL28weVk4UzdsdUJqQmh0MDBHbUFTAAIE3YZOVwMEAAAAAA==",
					"74e39aa2-40e7-4acc-9a5c-ef2bc22d0197": "gQGM8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0hrd1VKWEhsTlJoTXNHRGhsbUFTAAIE2YZOVwMEAAAAAA==",
					"80fc5e12-ca03-4d8e-954a-92cabc121641": "gQHO8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1VeXJYQ2ZsZ1JqNGZJT1RLV0FTAAIE24ZOVwMEAAAAAA==",
					"85f62ab0-48b6-4d6e-9c97-c126362eb55e": "gQGi8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0dreXkwU0RsblJqa0VXUWJNR0FTAAIE3YZOVwMEAAAAAA==",
					"532ab88c-1ba6-40dc-87f5-1007c563a632": "gQHK8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1AweU4yYXZrVXhncXQwSGlEMkFTAAIE2YZOVwMEAAAAAA==",
					"541c2f52-b874-430b-8cc5-354cc7e6a657": "gQGm8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzNFeEpiTFBsYWhnVF9hS3F5MkFTAAIE2YZOVwMEAAAAAA==",
					"573fd784-d0f3-40bb-b746-0d87b877b1ce": "gQGN8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL24weG9aS1BrdUJqQm91RlI2bUFTAAIE2oZOVwMEAAAAAA==",
					"927a9f15-530d-423f-a82c-e97f925c69b2": "gQHj8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzhVeUQyR1hsclJqVXRvOFRBV0FTAAIE2oZOVwMEAAAAAA==",
					"1219b6ae-53f1-4054-ac29-c692593c5281": "gQHh8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLy1Vd0xRNHprMFJpb3lJTjhpV0FTAAIE3IZOVwMEAAAAAA==",
					"7306ad8a-dd04-487b-bfd3-17548a173ce8": "gQHY8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL21VeWRCMWZsdUJqQk1fZkhIMkFTAAIE24ZOVwMEAAAAAA==",
					"8089cf31-743f-4eee-a10b-dc5a8ba1310c": "gQGD8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2JFd3NCY2ZsQXhoNlZCTFBybUFTAAIE2YZOVwMEAAAAAA==",
					"09854f86-6579-476f-8938-af5663add0fc": "gQFX8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0Uwd3NzVS1sQUJoNUYyMTRybUFTAAIE24ZOVwMEAAAAAA==",
					"9946a019-7466-4bbb-a259-d7e260e8529f": "gQFq8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL25Vd25BZVRsQmhoLWd1UEZwV0FTAAIE3oZOVwMEAAAAAA==",
					"34288a20-4cdb-4299-adc8-b0f26dc0a89d": "gQES8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1dVeXJqTmJsaXhqeV9TZEpLV0FTAAIE2YZOVwMEAAAAAA==",
					"48237ada-88b9-4712-965e-3b476930a0b3": "gQGF8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzFreHlTVFBsVlJnc1ZxaUw4R0FTAAIE3IZOVwMEAAAAAA==",
					"50239b10-3cff-4653-bd48-ec7744f476b2": "gQFP8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01FeVMxNzNsdVJqQW9FNFpFR0FTAAIE2oZOVwMEAAAAAA==",
					"095379ae-c663-4b52-bbe2-0922da431f94": "gQGp8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1cwd3N4V1BsREJoMUJ5VUFybUFTAAIE2oZOVwMEAAAAAA==",
					"362218f7-00a7-4b16-87ba-4babe81ba894": "gQFo8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2JVeGdrWXJsVGhnM2pCTmE0bUFTAAIE3IZOVwMEAAAAAA==",
					"09557423-5b71-4841-937e-8bb85fab5cb8": "gQGq8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL21FeXBkOS1sanhqMnl1YTBLMkFTAAIE2YZOVwMEAAAAAA==",
					"63288125-dad8-48f9-872d-ab376fe34aa4": "gQGR8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL04weXV1QzNsbVJqZ1dFbHFMR0FTAAIE3oZOVwMEAAAAAA==",
					"80076653-690c-466d-8eb4-afac8fdfef20": "gQFn8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL19VeXk0ZDdsbmhqblBJY29NR0FTAAIE2YZOVwMEAAAAAA==",
					"a34d47d2-16d0-4ea1-91e0-9442e1ba706c": "gQF58DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3FreFZLVWpsZXhnQ01kVGkxMkFTAAIE3YZOVwMEAAAAAA==",
					"b9be26b2-5474-4499-9fcb-74af97604421": "gQGE8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0pVd09DWnZsT2hoRFRWdllqR0FTAAIE2YZOVwMEAAAAAA==",
					"c1c75569-f776-4c26-8037-3e120e87185c": "gQHR8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0NreDkzcm5sV2hnamwzUWMtMkFTAAIE3YZOVwMEAAAAAA==",
					"cca9b219-4ccc-437e-b395-df3d8be55a1d": "gQE/8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3FFeDhndnJsVWhnckt0WkotbUFTAAIE24ZOVwMEAAAAAA==",
					"cfa5c908-66f3-40ec-a322-f184e7fd3cef": "gQFk8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL21reUVpTlRsdWhqRFBPUlRCbUFTAAIE3oZOVwMEAAAAAA==",
					"d18f2421-9d7a-4ac8-aea8-d2f5e0d17e97": "gQGH8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1pVeWo3TjNsblJqa3JoczNJV0FTAAIE3IZOVwMEAAAAAA==",
					"d400585e-918e-4bf1-8175-5f40b4c197e3": "gQGH8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1BVd1g0WFRsTmhoUFVrTWxsV0FTAAIE3YZOVwMEAAAAAA==",
					"e9fc99f4-d578-4a5c-a2b0-cbb361945a61": "gQG48DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2pFd2ZSX1BreEJpOTB2SjVuV0FTAAIE2IZOVwMEAAAAAA==",
					"f9342cb6-fe5e-4c07-be82-5d2c69ad07fe": "gQGQ8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1ZFeXZONDdsaHhqX0Z5cjZMV0FTAAIE3IZOVwMEAAAAAA==",
					"f94775b9-37e8-49bc-9221-aec25d22b471": "gQGd8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1Vrd0ZsT3psTmhoUDBDeENoMkFTAAIE3YZOVwMEAAAAAA=="}
	var listInfo = {
		init:function () {
			listInfo.render();
			listInfo.bindEventFn();
			listInfo.shareFn();
			listInfo.judgEnvirFn();
		},
		render:function () {
			$('.list_time').html(startDate +' '+startTime);
			$('.list_team_1').html(team_1);
			$('.list_team_2').html(team_2);

			$('.list_info').css({
				'min-height':$(window).height() + 'px'
			})
		},
		judgEnvirFn:function () {
			if(app.getUa.coco){
				var url ='/schedule/checkUserStatus.do';
				app.getTokenByCoco(url,function (headers) {
					$.ajax({
						url:'/schedule/checkUserStatus.do',
						type:"post",
						dataType:"json",
						headers:headers,
						data:{
							key:key
						},
						success:function(result){
							if(!result.isLogin){
								plug.confirm('','登陆成功点击确定，登陆失败点击取消',function () {
									window.location.reload();
								},function () {
									window.location.reload();
								});
								
								if(app.getUa.android){
									app.call({
						                action: 'login',
						                params: [
						                    {
						                        name: 'content',
						                        value: '请您登陆365日历，以便您添加日程提醒'
						                    }
						                    ],
						                callBack: null
						            })
								}

								if(app.getUa.ios){
									window.location.href = 'coco://365rili.com/login'
								}
							}else{
								$('.list_share_btn').removeClass('none');
								for (var i = 0; i < result.joinMap.length; i++) {
									for(var _i in result.joinMap[i]){
										if(_i == 'fsid'){
											$('.list_add_btn').show().text('已提醒').css({
												'background':'rgba(221,221,221,.5)'
											});
											$('.list_add_btn').attr('fsid',result.joinMap[i].fsid);
											break;
										}else{
											$('.list_add_btn').show().text('添加提醒');
										}
									}
								}
							}
							var trueStr = app.getUa.ios ? "true" : true;
							var shareData ={
					            "title": team_1 +' VS '+team_2,
					            "content": '关注365日历公众账号，即刻获得欧洲杯赛程无死角提醒！',
					            "link":window.location.href,
					            "image": 'http://www.365rili.com/pages/bd/2016_football/images/share_icon.png',
					            "isEvent":trueStr
					        }
					        app.call({
				                action: 'setShareContent',
				                params: [
				                    {
				                        name: 'shareString',
				                        value: JSON.stringify(shareData)
				                    }
				                    ],
				                callBack: null
				            })
						}
					})
				})
			}
			if(app.getUa.weixin){
				$.ajax({
					url:'/schedule/checkUserStatus.do',
					type:"get",
					dataType:"json",
					data:{
						key:key
					},
					success:function(result){
						if(!result.isLogin){
							window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(window.location.href);
						}else{
							if(!result.isWxFollowed){
								$('.list_share_btn').hide();
								$('.list_code_div').show().html('<h3>扫描二维码关注公众账号</h3><p>轻松获取欧洲杯全部赛程提醒</p><img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+codeArray[key]+'" width="180" alt="">');
							}else{
								$('.list_share_btn').removeClass('none');
								for (var i = 0; i < result.joinMap.length; i++) {
									for(var _i in result.joinMap[i]){
										if(_i == 'fsid'){
											$('.list_add_btn').show().text('已提醒').css({
												'background':'rgba(221,221,221,.5)'
											});
											$('.list_add_btn').attr('fsid',result.joinMap[i].fsid);
											break;
										}else{
											$('.list_add_btn').show().text('添加提醒');
										}
									}
								}
							}
						}
					}
				})
			}
		},
		bindEventFn:function () {
			$('body').on('tap','.list_add_btn',function () {
				var dom = $(this);
				if(dom.text() == '已提醒'){
					plug.confirm('','确定要删除 '+team_1 +' VS '+team_2 +' 比赛的提醒吗？删除后不再提醒','',function(){
						listInfo.delSchedule(dom)
					})
				}else{
					listInfo.addAjaxFn(dom)
				}
			});
			$('body').on('tap','.list_share_btn',function () {
				$('<div class="share_bg"></div>').height($(window).height()).appendTo($('body'));
			})

			$('body').on('tap','.share_bg',function () {
				dom.hide();
			})
		},
		delSchedule:function (dom) {
			var fsid = dom.attr('fsid');
			if(app.getUa.coco){
				var url ='/schedule/wxDelete.do';
				app.getTokenByCoco(url,function (headers) {
					$.ajax({
						url:'/schedule/wxDelete.do',
						type:"post",
						dataType:"json",
						headers:headers,
						data:{
							scheduleId:fsid
						},
						success:function (datas) {
							if(datas.state == 'ok'){
								app.call({
									action:'getNotify',
									params: [],
									callBack: function (data) {
										console.log('同步成功')
									}
								});

								dom.css({
									"background":"#e3a02c"
								})
								dom.text('提醒');
							}
						}
					})
				})
			}
			if(app.getUa.weixin){
				$.ajax({
					url:'/schedule/wxDelete.do',
					type:"post",
					dataType:"json",
					data:{
						scheduleId:fsid
					},
					type:'post',
					success:function (data) {
						dom.css({
							"background":"#e3a02c"
						})
						dom.text('提醒');
					}
				})
			}
		},
		addAjaxFn:function (btnDom) {
			if(app.getUa.coco){
				var url ='/schedule/joinWeixinSchedule.do';
				app.getTokenByCoco(url,function (headers) {
					$.ajax({
						url:'/schedule/joinWeixinSchedule.do',
						type:"post",
						dataType:"json",
						headers:headers,
						data:{
							key:key
						},
						success:function (datas) {
							if(datas.state == 'ok'){
								app.call({
									action:'getNotify',
									params: [],
									callBack: function (data) {
										console.log('同步成功')
									}
								});
								
								btnDom.show();
								btnDom.html('已提醒').css({
									'background':'rgba(221,221,221,.5)'
								});
								btnDom.attr('fsid',datas.schedule.id);
							}
						}
					})
				})
			}
			if(app.getUa.weixin){
				$.ajax({
					url:'/schedule/joinWeixinSchedule.do',
					type:"post",
					dataType:"json",
					data:{
						key:key
					},
					success:function (datas) {
						if(datas.state == 'ok'){
							btnDom.show();
							btnDom.html('已提醒').css({
								'background':'rgba(221,221,221,.5)'
							});
							btnDom.attr('fsid',datas.schedule.id);
						}
					}
				})
			}
		},
		shareFn:function () {
			if(app.getUa.weixin){
				wxProtocol.init(function (wx, link) {
		            wx.onMenuShareAppMessage({
		                title: team_1 +' VS '+team_2,
		                desc: '关注365日历公众账号，即刻获得欧洲杯赛程无死角提醒！',
		                imgUrl: 'http://www.365rili.com/pages/bd/2016_football/images/share_icon.png'
		            });
		            wx.onMenuShareTimeline({
		                title: team_1 +' VS '+team_2,
		                imgUrl: 'http://www.365rili.com/pages/bd/2016_football/images/share_icon.png'
		            });
		        });
			}
			if(!app.getUa.coco){
	        	footer.init({
		            type: 'publicSchedule',
		            cocourl: 'coco://365rili.com'
		        });
	        }
		}

	}
	listInfo.init();
})()