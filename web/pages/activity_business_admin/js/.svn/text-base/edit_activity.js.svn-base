var create_activity = {

	config: {
		_data: {
			pics: [],
			eventId: G.eventId
		},
		uploadImageNum: 0
	},

	init: function() {
		create_activity.showActivityType();
		create_activity.checkRadioStatus();
		create_activity.bindEvents();
	},

	checkRadioStatus: function() {
		$(':radio:checked').each(function(index, value) {
			var v = $(this).val();
			if(v == 'noLimit') {
				$('#countMax').attr('disabled', true);
			} else if(v == 'joinIn') {
				$('#customJoinButton').attr('disabled', true);
			} else if(v == 'viewOrder') {
				$('#customJoinedButton').attr('disabled', true);
			} else if(v == 'noProtocol') {
				$('#protocolDesc').attr('disabled', true);
			}
			
			if(v == 'noUserData') {
				$('.user_data input').each(function() {
					$(this).attr('disabled', true);
				});
			} else if(v == 'hasUserData') {
				$('.user_data input').each(function() {
					$(this).attr('disabled', false);
				});
			}
			
			if(v == 'need') {
				$('.activity_pay_info').show();
			} 
		});
	},

	showActivityType: function() {
//		var activityType = $('#activityType').find('option:selected').val(),
//		    isHasClass = $('.activity_type_div').hasClass('standard_line');
//
//		if(activityType == 'offlineActivity') {
//			if(!isHasClass) {
//				$('.activity_type_div').addClass('standard_line');
//			}			
//		} else {
//			if(isHasClass) {
//				$('.activity_type_div').removeClass('standard_line');
//			}
//		}
		
		var activityType = $('#activityType').find('option:selected').val();
		$('.activity_common_div').hide();
		
		if(activityType == 'customLinkActivity') {
			$('.activity_custom_link').show();
		} else if(activityType == 'offlineActivity') {
			$('.activity_user_behavior').show();
			$('.activety_parameter_set').show();
		} else if(activityType == 'commonLottery') {
			$('.activity_lottery_info').show();
		}			

	},

	bindEvents: function() {
		var timer = null;

		$('#activityType').on('change', create_activity.showActivityType);

		$(':radio').on('click', function(event) {
			var v = $(this).val();
			if(v == 'noLimit') {
				$('#countMax').attr('disabled', true);
			} else if(v == 'hasLimit') {
				$('#countMax').attr('disabled', false);
			} else if(v == 'joinIn') {
				$('#customJoinButton').attr('disabled', true);
			} else if(v == 'customJoinBefore') {
				$('#customJoinButton').attr('disabled', false);
			} else if(v == 'viewOrder') {
				$('#customJoinedButton').attr('disabled', true);
			} else if(v == 'customJoinAfter') {
				$('#customJoinedButton').attr('disabled', false);
			} else if(v == 'noProtocol') {
				$('#protocolDesc').attr('disabled', true);
			} else if(v == 'hasProtocol') {
				$('#protocolDesc').attr('disabled', false);
			} else if(v == 'noUserData') {
				$('.user_data input').each(function() {
					$(this).attr('disabled', true);
				});
			} else if(v == 'hasUserData') {
				$('.user_data input').each(function() {
					$(this).attr('disabled', false);
				});
			} else if(v == 'autoGenerate') {
				$('.prizecode_import_area').hide();
				$('.prizecode_generate_area').show();
			} else if(v == 'importCodes') {
				$('.prizecode_generate_area').hide();
				$('.prizecode_import_area').show();
			} else if(v == 'limit') {
				
			} else if(v == 'nolimit') {
				
			} else if(v == 'need') {
				$('.activity_pay_info').show();
			} else if(v == 'noneed') {
				$('.activity_pay_info').hide();
			}
		});

		$('#activityAllday').on('click', function(event) {
			$('#startDate, #endDate').off('focus');
			var flag = $(this).is(':checked');
			if(flag == true) {
				$('#startDate, #endDate').on('focus', function() {
					WdatePicker({dateFmt:'yyyy-MM-dd',minDate:''});
				});
				var $startDate = $('#startDate'),
					startDate = $startDate.val().split(' '),
					$endDate = $('#endDate'),
					endDate = $endDate.val().split(' '),
					s_ymd = startDate[0],
					s_hms = startDate[1],
					e_ymd = endDate[0],
					e_hms = endDate[1];
				if(s_hms == undefined) {
					s_ymd = '';
					e_ymd = '';
				}
				$startDate.attr('data-hms', s_hms);
				$startDate.val(s_ymd);
				$endDate.attr('data-hms', e_hms);
				$endDate.val(e_ymd);
			} else {
				$('#startDate, #endDate').on('focus', function () {
					WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:''});
				}).each(function(i, o) {
					var hms = $(o).attr('data-hms');
					if(hms == undefined) {
						hms = '09:00:00';
					}
					o.value += ' ' + hms;
				});
			}
		});

		$('#startDate, #endDate').on('focus', function () {
			if($('#activityAllday').is(':checked')) {
				WdatePicker({dateFmt:'yyyy-MM-dd',minDate:''});
			} else {
				WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:''});
			}
		});

		$('.save_btn').on('click', create_activity.saveData);

		$('.upload_image_link').on('click', create_activity.selectImage);

		$(document).on('click', '.del_img_btn', function(){
			var box = $(this.parentNode);
			var index = box.index();
			box.remove();
			create_activity.config._data.pics.splice(index, 1);
			if(create_activity.config._data.pics.length < 9){
				$('#js-uploadImg').show();
			}
		});

		//拖拽上传
		$(document).on({
            dragleave:function(e){
                e.preventDefault();
                $('.create_upload_box').removeClass('over');
            },
            drop:function(e){
                e.preventDefault();
            },
            dragenter:function(e){
                e.preventDefault();
                $('.create_upload_box').addClass('over');
            },
            dragover:function(e){
                e.preventDefault();
                $('.create_upload_box').addClass('over');
            }
        });

		document.body.addEventListener('drop', create_activity.logicImage);
	},
	
	savingData: function() {
		$('.save_btn').unbind('click');
		$('.save_btn').html("发布中，请稍候...");
	},
	
	saveDataInterrupt: function() {
		$('.save_btn').on('click', create_activity.saveData);
		$('.save_btn').html("发布");
	},

	saveData: function(event) {
		event.preventDefault();
		var activityType = $('#activityType').find('option:selected').val(),
			flag = false,
			params = create_activity.config._data;

		flag = create_activity.validate(activityType);
		if(!flag) return;

		if(create_activity.config.uploadImageNum != 0){
//			$.alert("请等待图片上传完毕", {
//				buttons: {
//					'确定': function() {
//						$(this).dialog("close");
//					}
//				}
//			});
			alert("请等待图片上传完毕");
			return;
		}

		create_activity.savingData();
		
		if(activityType == 'offlineActivity') {
			create_activity.saveOfflineActivity(params);
		} else if(activityType == 'customLinkActivity') {
			create_activity.saveCustomLinkActivity(params);
		} else if(activityType == 'commonLottery') {
			create_activity.saveCommonLotteryActivity(params);
		}
//		clearTimeout(timer);
//        timer = setTimeout(function() {
//            if(activityType == 'offlineActivity') {
//				create_activity.saveOfflineActivity(params);
//			} else if(activityType == 'customLinkActivity') {
//				create_activity.saveCustomLinkActivity(params);
//			} else if(activityType == 'commonLottery') {
//				create_activity.saveCommonLotteryActivity(params);
//			}
//        }, 1500);
	},
	
	//选择图片
	selectImage: function() {
		$('#js-fileInput').val('');
		$('#js-fileInput').off('change');
		$('#js-fileInput').on('change', create_activity.logicImage);
		$('#js-fileInput').click();
	},

	//处理图片
	logicImage: function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		var fileList = target.files || e.dataTransfer.files;
		var imgNum = $('.create_upload_imglist li').length;
		var elseImgNum = 9 - imgNum;

		var fileLen = fileList.length > elseImgNum ? elseImgNum : fileList.length;

		create_activity.config.uploadImageNum += fileLen;

		$.ajax({
			url: "/event/admin/signatures.do",
			type: "post",
			data: {
				fileCount: fileLen,
				//nocallback: 1
				noCallback: true
			},
			dataType: "json"
		})
		.done(function(data) {
			if(data.state === 'wrongpass'){
				return amplify.publish('loginTimeout');
			}
			for (var i = 0; i < fileLen; i++) {
				create_activity.uploadImage(fileList[i], data.signatures[i], imgNum + i + 1);
			};
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	},

	//上传图片
	uploadImage: function(file, sign, i) {
		if(i >= 9){
			$('#js-uploadImg').hide();
		}
		var img = $('<li><img src="/images/cal365_default/loading.gif" alt=""><i class="del_img_btn"></i></li>');
		$('.create_upload_imglist').append(img);
		var fd = new FormData();
			fd.append('file', file, file.name);
			fd.append('signature', sign.signature);
			fd.append('policy', sign.policy);

		$.ajax({
			url: 'https://v0.api.upyun.com/' + sign.bucket,
			type: 'POST',
			dataType: 'json',
			processData:false,
	        contentType:false,
			data: fd
		})
		.done(function(data) {
			var image = new Image;
			image.onload = function () {
				img.find('img').attr('src', 'http://cocoimg.365rili.com/' + data.url);
			};
			image.src = 'http://cocoimg.365rili.com/' + data.url;
			var info = data.url.split('/');
			create_activity.config._data.pics[i-1] = {
				pic: info[3],
				sequence: i,
				source : info[1]
			};

			create_activity.config.uploadImageNum--;
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	},

	validate: function(activityType) {

		var data = create_activity.config._data;
		//城市选择
		var citycode = $('#citySel').find('option:selected').val();
		data.citycode = citycode;
		//活动名称
		var $activityName = $('#activityName');
		if(!create_activity.checkWordsLenLimit($activityName, 60, '请输入标题，并且标题字数在60个字符以内')) {
			return;
		}
		data.title = $activityName.val();
		//活动地点
		var $activityLocation = $('#activityLocation');
//		if(!create_activity.checkFieldEmpty($activityLocation, '请输入活动地点')) {
//			return;
//		}
		data.location = $activityLocation.val();
		//是否全天
		//data.alldayEvent = false;
		var isAllday = $('#activityAllday').is(':checked');
		if(isAllday) {
			data.alldayEvent = true;
		} else {
			data.alldayEvent = false;
		}
		//活动时间
		var startTime = $('#startDate').val(),
			endTime = $('#endDate').val(),
		    startDate = new Date(startTime),
		    endDate = new Date(endTime),
		    duration = (endDate.getTime()-startDate.getTime()) / 1000;
		if(!create_activity.checkComparisonTime(startDate.getTime(), endDate.getTime(), $('#endDate'), '开始时间不能大于结束时间')) {
			return;
		}
		var _startTime = $('#startDate'),
			_startTimeParam2 =_startTime.val().split(' ')[1];
		if(_startTimeParam2 == undefined || _startTimeParam2 == '') {
			data.startTime = _startTime.val() + ' 09:00:00';
		} else {
			data.startTime = _startTime.val();
		}
		data.duration = duration;
		//提醒时间
		var str = '';
		$('.activity_remind input').each(function(index, value) {
            if($(this).is(':checked')) {
                str += $(this).val() + ' ';
            }  
        });
        data.beforeMinutes = $.trim(str).split(' ').join(',');
		//人数上限
		var $enrollLimit = $('input[name="countGroup"]:checked');
		if($enrollLimit.val() == 'noLimit') {
			data.enrollLimit = 0;
		} else {
			var $countMax = $('#countMax');
			if(!create_activity.checkNumberField($countMax, '人数上线必须是数字')) {
				return;
			}
			data.enrollLimit = $countMax.val();
		}
		//所属日历
		var $calendarId = $('#calendarId');
		data.calendarId = $calendarId.val();
		data.focusWhenJoin = $('#isJoinIn').is(':checked') ? true: false;
		//正文内容
		var $activity_content = $('#activity_content');
		if(!create_activity.checkWordsLenLimit($activity_content, 3000, '请输入正文内容，并且字符在3000个字符以内')) {
			return;
		}
		data.description = $activity_content.val();
		//活动图片
		var size = $('#create_upload_imglist img').length;
		//var size = create_activity.config._data.pics.length;
		if(!create_activity.checkPics($('.create_upload_imglist'), size, '至少上传一张图片')) {
			return;
		}
		var arr = [];
		$('#create_upload_imglist img').each(function(index, value) {
			var url = $(this).attr('src'),
				obj = {
					pic: url.substring(url.lastIndexOf('/')+1, url.length),
					sequence: index,
					source: 'schedule_pics'
				}
			arr.push(obj);
		});
		data.pics = JSON.stringify(arr);
		//链接地址
		var $linkUrl = $('#linkUrl');
		data.linkedUrl = ($linkUrl.val() == '') ? '' : $linkUrl.val();
		//参与前
		var $joinButton = $('input[name="joinBefore"]:checked');
		if($joinButton.val() == 'joinIn') {
			data.joinButton = '我要参加';
		} else {
			var $customJoinButton = $('#customJoinButton');
			if(!create_activity.checkWordsLenLimit($customJoinButton, 4, '不可超过4个汉字')) {
				return;
			}
			data.joinButton = $customJoinButton.val();
		}
		//参与后
		var $joinedButton = $('input[name="joinAfter"]:checked');
		if($joinedButton.val() == 'viewOrder') {
			data.joinedButton = '查看订单';
		} else {
			var $customJoinedButton = $('#customJoinedButton');
			if(!create_activity.checkWordsLenLimit($customJoinedButton, 4, '不可超过4个汉字')) {
				return;
			}
			data.joinedButton = $customJoinedButton.val();
		}
		//账号名称
		var $businessUserId = $('#businessUserId');
		data.businessUserId = $businessUserId.val();
		//ID账号(活动ID)
		var $businessNumber = $('#businessNumber');
		data.businessNumber = ($businessNumber.val() == '') ? '' : $businessNumber.val();
		
		//是否限制在客户端里打开
		var $activityLimit = $('input[name="activityLimit"]:checked');
		if($activityLimit.val() == 'limit') {
			//限制
			data.onlyInClient = true;
		} else {
			//不限制
			data.onlyInClient = false;
		}
		
		//是否支持支付
		var $needPay = $('input[name="activityNeedPay"]:checked');
		if($needPay.val() == 'need') {
			//有无支付
			data.needPay = true;
			
			//商品类型
			var $payTradeType = $('#payTradeType');
			data.payTradeType = $payTradeType.val();
			
			//商家名称
			var $payMerchantName = $('#payMerchantName');
			if(!create_activity.checkWordsLenLimitAllowEmpty($payMerchantName, 60, '不可超过60个汉字')) {
				return;
			}
			data.payMerchantName = $payMerchantName.val();
			
			//商品名称
			var $payTradeName = $('#payTradeName');
			if(!create_activity.checkWordsLenLimit($payTradeName, 60, '不可超过60个汉字')) {
				return;
			}
			data.payTradeName = $payTradeName.val();
			
			//商品描述
			var $payTradeDescription = $('#payTradeDescription');
			if(!create_activity.checkWordsLenLimitAllowEmpty($payTradeDescription, 3000, '不可超过3000个汉字')) {
				return;
			}
			data.payTradeDescription = $payTradeDescription.val();
			
			//商品单价
			var $payPrice = $('#payPrice');
			if(!create_activity.checkPriceField($payPrice, '请输入正确的价格，格式如“10”、“10.1”、“10.25')) {
				return;
			}
			data.payPrice = $payPrice.val() * 100;
			
			//是否支持退款
			var $allowRufund = $('input[name="activityAllowRufund"]:checked');
			data.allowRufund = $allowRufund.val() == 'allow' ? true : false;
			
		} else {
			//无支付
			data.needPay = false;
		}
		
		
		//其余字段
		if(activityType == 'offlineActivity') {
			//协议
			var $contract = $('input[name="activeProtocol"]:checked');
			if($contract.val() == 'noProtocol') {
				data.contract = '';
				$('.behavior_textarea').hide();
			} else {
				var $protocolDesc = $('#protocolDesc');
				if(!create_activity.checkWordsLenLimit($protocolDesc, 200, '不可超过200个字数')) {
					return;
				}
				data.contract = $protocolDesc.val();
			}
			//微信隐藏兑换码
			var $hideCodeInWx = $('input[name="wechatHideExchange"]:checked');
			data.hideCodeInWx = ($hideCodeInWx.val() == 'hideExchange') ? true: false;
			//用户数据
			var $userData = $('input[name="userData"]:checked');
			if($userData.val() == 'noUserData') {
				data.expectDataName = false;
                data.requireDataName = false;
                data.expectDataBirthday = false;
                data.requireDataBirthday = false;
                data.expectDataSex = false;
                data.requireDataSex = false;
                data.expectDataEmail = false;
                data.requireDataEmail = false;
               
                data.expectDataCellphone = false;
                data.requireDataCellphone = false;
                data.needVerifyCellphone = false;
                data.expectDataLeaveWord = false;
			} else {
				
				var nameLabelChecked = $('#user_name_label').is(':checked');
				data.expectDataName = nameLabelChecked ? true : false;
				var nameChecked = $('#user_name').is(':checked');
				data.requireDataName = nameChecked ? true : false;

				var mailLabelChecked = $('#user_mail_label').is(':checked');
				data.expectDataEmail = mailLabelChecked ? true : false;
				var mailChecked = $('#user_mail').is(':checked');
				data.requireDataEmail = mailChecked ? true : false;

				var sexLabelChecked = $('#user_sex_label').is(':checked');
				data.expectDataSex = sexLabelChecked ? true : false;
				var sexChecked = $('#user_sex').is(':checked');
				data.requireDataSex = sexChecked ? true : false;

				var birthdayLabelChecked = $('#user_birthday_label').is(':checked');
				data.expectDataBirthday = birthdayLabelChecked ? true : false;
				var birthdayChecked = $('#user_birthday').is(':checked');
				data.requireDataBirthday = birthdayChecked ? true : false;

				var msgLabelChecked = $('#user_msg_label').is(':checked');
				data.expectDataLeaveWord = msgLabelChecked ? true : false;

				var mobileLabelChecked = $('#user_mobile_label').is(':checked');
				data.expectDataCellphone = mobileLabelChecked ? true : false;
				var mobileChecked = $('#user_mobile').is(':checked');
				data.requireDataCellphone = mobileChecked ? true : false;
				var mobileValidatedChecked = $('#user_mobile_validated').is(':checked');
				data.needVerifyCellphone = mobileValidatedChecked ? true : false;
			}
			var startAcceptTime = $('#exchangeStartDate').val(),
				endAcceptTime = $('#exchangeEndDate').val(),
				startAcceptDate = new Date(startAcceptTime),
				endAcceptDate = new Date(endAcceptTime);
			if(!create_activity.checkComparisonTime(startAcceptDate.getTime(), endAcceptDate.getTime(), $('#exchangeStartDate'), '开始时间不能大于结束时间')) {
				return;
			}
			data.startAcceptTime = startAcceptTime;
			data.endAcceptTime = endAcceptTime;
		} else if(activityType == 'customLinkActivity') {
			var $joinUrl = $('#joinUrl');
			if(!create_activity.checkFieldEmpty($joinUrl, '请输入参与链接')) {
				return;
			}
			data.joinUrl = $joinUrl.val();
		} else if(activityType == 'commonLottery') {
			var $lotteryTitle = $('#lotteryTitle');
			if(!create_activity.checkWordsLenLimit($lotteryTitle, 60, '请输入抽奖标题，并且标题字数在60个字符以内')) {
				return;
			}
			data.lotteryTitle = $lotteryTitle.val();
			
			var $lotteryRuleDesc = $('#lotteryRuleDesc');
			if(!create_activity.checkWordsLenLimit($lotteryRuleDesc, 3000, '请输入活动须知，并且字数在3000个字符以内')) {
				return;
			}
			data.lotteryRuleDesc = $lotteryRuleDesc.val();
			
			var $lotteryMessageModal = $('#lotteryMessageModal');
			if(!create_activity.checkWordsLenLimit($lotteryMessageModal, 300, '请输入短信模板，并且字数在300个字符以内')) {
				return;
			}
			data.lotteryMessageModal = $lotteryMessageModal.val();
			
			var $lotteryProbability = $('#lotteryProbability');
			if(!create_activity.checkNumberField($lotteryProbability, '中奖概率必须是1-100的整数')) {
				return;
			} 
			var prob = $lotteryProbability.val();
			if(prob < 1 || prob > 100) {
				create_activity.showErrorMsg($lotteryProbability.attr('id'), '中奖概率必须是1-100的整数');
				return;
			}
			data.lotteryProbability = prob / 100;
			
			var $lotteryBtnName = $('#lotteryBtnName');
			if(!create_activity.checkWordsLenLimit($lotteryBtnName, 6, '不可超过6个汉字')) {
				return;
			}
			data.lotteryBtnName = $lotteryBtnName.val();
			
			var $lotteryPrizeName = $('#lotteryPrizeName');
			if(!create_activity.checkWordsLenLimit($lotteryPrizeName, 20, '请输入奖品名称，并且字数在20个字符以内')) {
				return;
			}
			data.lotteryPrizeName = $lotteryPrizeName.val();
			
			var $imgs = $('#create_upload_imglist img').toArray();
			if($imgs.length < 1) {
				create_activity.showErrorMsg('#create_upload_imglist', '请上传一张图片');
				return;
			}
			data.lotteryBgImage = $imgs[0].src;
			
			var $lotteryPrizeCodeSource = $('input[name="lotteryPrizeCodeSource"]:checked');
			if($lotteryPrizeCodeSource.val() == 'autoGenerate') {
				// 自动生成
				$lotteryPrizeCount = $('#lotteryPrizeCount');
				if(!create_activity.checkNumberField($lotteryPrizeCount, '奖品数量必须是0以上的整数')) {
					return;
				}
				data.autoGeneratePrizeCode = true;
				data.lotteryPrizeCount = $lotteryPrizeCount.val();
			} else {
				// 导入
				$lotteryPrizeCodes = $('#lotteryPrizeCodes');
				var prizeCodes = $.trim($lotteryPrizeCodes.val());
				if(prizeCodes != '') {
					if(prizeCodes.indexOf("\n") >= 0) {
						prizeCodes = prizeCodes.replace(/\n/g, ",");
					}
					var codeAry = prizeCodes.split(',');
					for(var i = 0, l = codeAry.length; i < l; i++) {
						codeAry[i] = $.trim(codeAry[i]);
					}
					data.autoGeneratePrizeCode = false;
					data.lotteryPrizeCodes = JSON.stringify(codeAry);
				} else {
					data.autoGeneratePrizeCode = true;
					data.lotteryPrizeCount = 0;
				}
			}
		}

		return true;
	},

	checkPics: function($ele, size, msg) {
		if(size < 1) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},

	checkFieldEmpty: function($ele, msg) {
		if($ele.val() == '') {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},

	checkMobileField: function($ele, msg) {
		if($ele.val() == '' || !/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test($ele.val())) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},

	checkEmailField: function($ele, msg) {
		if($ele.val() == '' || !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i.test($ele.val())) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},

	checkWordsLenLimit: function($ele, count, msg) {
		if($ele.val() == '' || $ele.val().length > count) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},

	checkNumberField: function($ele, msg) {
		if($ele.val() == '' || !/^\d+$/i.test($ele.val())) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},
	
	checkWordsLenLimitAllowEmpty: function($ele, count, msg) {
		if($ele.val().length > count) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},
	
	checkPriceField: function($ele, msg) {
		if($ele.val() == '' || !/^\d+(\.\d{1,2})?$/i.test($ele.val())) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			$ele.focus();
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},

	checkComparisonTime: function(startTime, endTime, $ele, msg) {
		var time = (endTime - startTime)/1000;
		if(time < 0) {
			create_activity.showErrorMsg($ele.attr('id'), msg);
			setTimeout(function() {
				$ele.focus().click();
			}, 100);
			return false;
		}
		create_activity.showErrorMsg($ele.attr('id'), '');
		return true;
	},

    showErrorMsg: function(id, msg) {
    	$('#' + id).closest('dd').find('.error').remove();
    	var $span = $('<span></span>').addClass('error').text(msg);
    	if(msg != '') {
    		$('#' + id).closest('dd').append($span);
    	} else {
    		$('#' + id).closest('dd').find('.error').hide();
    	}
    },

	//标准线下活动
	saveOfflineActivity: function(params) {
		$.ajax({
            url: '/event/admin/updateCommonOffline.do',
            type: 'post',
            dataType: 'json',
            data: params,
            success: function(data) {
                console.log(data);
                if(data.state !== 'ok') {
                	alert('请求出错！');
                	create_activity.saveDataInterrupt();
                	return;
                }

                window.location.href = '/event/admin/detail.do?eventId=' + data.eventId;
            }
        });
	},

	//自定义链接活动
	saveCustomLinkActivity: function(params) {
		$.ajax({
            url: '/event/admin/updateCustomLink.do',
            type: 'post',
            dataType: 'json',
            data: params,
            success: function(data) {
                console.log(data);
                if(data.state !== 'ok') {
                	alert('请求出错！');
                	create_activity.saveDataInterrupt();
                	return;
                }

                window.location.href = '/event/admin/detail.do?eventId=' + data.eventId;
            }
        });
	},
	
	//通用抽奖活动
	saveCommonLotteryActivity: function(params) {
		$.ajax({
			url: '/event/admin/updateCommonLottery.do',
            type: 'post',
            dataType: 'json',
            data: params,
            success: function(data) {
                if(data.state !== 'ok') {
                	alert('请求出错！' + JSON.stringify(data));
                	create_activity.saveDataInterrupt();
                	return;
                }

                window.location.href = '/event/admin/detail.do?eventId=' + data.eventId;
            }
		});
	}

};

$(document).ready(function() {
	create_activity.init();
});
