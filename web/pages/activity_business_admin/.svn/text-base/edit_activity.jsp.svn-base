<%@page import="java.text.DecimalFormat"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="com.rili.common.beans.*" %>
<%
	long eventId = (Long)request.getAttribute("eventId");
	boolean isCreate = (Boolean) request.getAttribute("isCreate");
	List<Map<String, Object>> eventCityMaps = (List<Map<String, Object>>)request.getAttribute("eventCityMaps");
	List<Map<String, Object>> choiceCalendarMaps = (List<Map<String, Object>>)request.getAttribute("choiceCalendarMaps");
	List<Map<String, Object>> eventTypeMaps = (List<Map<String, Object>>)request.getAttribute("eventTypeMaps");
	String title = (String)request.getAttribute("title");
	String location = (String)request.getAttribute("location");
	boolean alldayEvent = (Boolean)request.getAttribute("alldayEvent");
	String startTime = (String)request.getAttribute("startTime");
	String endTime = (String)request.getAttribute("endTime");
	Set<Integer> beforeMinuteSet = (Set<Integer>)request.getAttribute("beforeMinuteSet");
	int enrollLimit = (Integer)request.getAttribute("enrollLimit");
	long calendarId = (Long)request.getAttribute("calendarId");
	boolean focusWhenJoin = (Boolean)request.getAttribute("focusWhenJoin");
	String description = (String)request.getAttribute("description");
	String picStr = (String)request.getAttribute("picStr");
	String linkedUrl = (String)request.getAttribute("linkedUrl");
	String joinButton = (String)request.getAttribute("joinButton");
	String joinedButton = (String)request.getAttribute("joinedButton");
	List<Map<String,Object>> businessMaps = (List<Map<String,Object>>)request.getAttribute("businessMaps");
	long businessUserId = (Long)request.getAttribute("businessUserId");
	String businessNumber = (String)request.getAttribute("businessNumber");
	boolean isActivityLimit = (Boolean)request.getAttribute("onlyInClient");
	boolean isCommonOffline = false;
	boolean isCustomLink = false;
	boolean isCommonLottery = false;
	if (!isCreate) {
		String type = (String)request.getAttribute("type");
		if (type.equals("commonOffline")) {
		    isCommonOffline = true;
		} else if(type.equals("customLink")) {
		    isCustomLink = true;
		} else if(type.equals("commonLottery")) {
			isCommonLottery = true;
		}
	}
	boolean expectDataCellphone = false;
	boolean requireDataCellphone = false;
	boolean needVerifyCellphone = false;
	boolean expectUserData = false;
	boolean expectDataBirthday = false;
	boolean requireDataBirthday = false;
	boolean expectDataEmail = false;
	boolean requireDataEmail = false;
	boolean expectDataName = false;
	boolean requireDataName = false;
	boolean expectDataSex = false;
	boolean requireDataSex = false;
	boolean expectDataLeaveWord = false;
	boolean hideCodeInWx = false;
	if (isCommonOffline) {
		expectDataCellphone = (Boolean)request.getAttribute("expectDataCellphone");
		requireDataCellphone = (Boolean)request.getAttribute("requireDataCellphone");
		needVerifyCellphone = (Boolean)request.getAttribute("needVerifyCellphone");
		expectUserData = (Boolean)request.getAttribute("expectUserData"); 
		expectDataBirthday = (Boolean)request.getAttribute("expectDataBirthday");
		requireDataBirthday = (Boolean)request.getAttribute("requireDataBirthday");
		expectDataEmail = (Boolean)request.getAttribute("expectDataEmail");
		requireDataEmail = (Boolean)request.getAttribute("requireDataEmail");
		expectDataName = (Boolean)request.getAttribute("expectDataName");
		requireDataName = (Boolean)request.getAttribute("requireDataName");
		expectDataSex = (Boolean)request.getAttribute("expectDataSex");
		requireDataSex = (Boolean)request.getAttribute("requireDataSex");
		expectDataLeaveWord = (Boolean)request.getAttribute("expectDataLeaveWord");
		hideCodeInWx = (Boolean)request.getAttribute("hideCodeInWx");
	}
	String contract = (String)request.getAttribute("contract");
	String startAcceptTime = (String)request.getAttribute("startAcceptTime");
	String endAcceptTime = (String)request.getAttribute("endAcceptTime");
	String joinUrl = (String)request.getAttribute("joinUrl");
	String defaultJoinButton = (String)request.getAttribute("defaultJoinButton");
	String defaultJoinedButton = (String)request.getAttribute("defaultJoinedButton");
	
	String lotteryTitle = "";
	String lotteryRule = "";
	String lotteryMessage = "";
	String lotteryPrizeName = "";
	String lotteryBtnName = "";
	int lotteryProbability = 0;
	int prizeCount = 0;
	int prizeOwned = 0;
	if(isCommonLottery) {
		lotteryTitle = (String) request.getAttribute("lotteryTitle");
		lotteryRule = (String) request.getAttribute("lotteryRule");
		lotteryMessage = (String) request.getAttribute("lotteryMessage");
		lotteryPrizeName = (String) request.getAttribute("lotteryPrizeName");
		lotteryBtnName = (String) request.getAttribute("lotteryBtnName");
		lotteryProbability = (int) (((Float) request.getAttribute("lotteryProbability")).floatValue() * 100);
		prizeCount = ((Integer) request.getAttribute("prizeCount")).intValue();
		prizeOwned = ((Integer) request.getAttribute("prizeOwned")).intValue();
	}
	
	boolean isNeedPay = false;
	EventPay eventPay = null;
	List<Map<String, Object>> tradeTypeMaps = (List<Map<String, Object>>)request.getAttribute("tradeTypeMaps");
	if(!isCreate) {
		isNeedPay = (Boolean) request.getAttribute("needPay");
		if(isNeedPay) {
			eventPay = (EventPay) request.getAttribute("eventPay");
		}
	}
	
	EventAdmin eventAdmin = (EventAdmin)request.getAttribute("eventAdmin");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>365日历活动及评论管理后台</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet"/>
<link href="/pages/activity_business_admin/css/main.css" rel="stylesheet">
<script src="/js/lib/DatePicker/WdatePicker.js"></script>
<script>
	var G = {
		pics: '<%=picStr%>',
		eventId: <%=eventId%>,
		alldayEvent: <%=alldayEvent%>
	};
</script>
</head>
<body>
    <div class="activity_comments_top">
    	<div class="activity_comments_top_content">
    		<div class="activity_name">
    			<a href="/event/admin/logout.do">退出</a>
    			<%=eventAdmin.getName() %>
    		</div>
    		<div class="activity_logo">活动及评论管理后台</div>
    	</div>
    </div>
    <div class="main">
    	<div class="crumbs"><a href="/event/admin/index.do">所有活动</a><span>&gt;</span><%if(isCreate) {%>创建活动<%} else { %>编辑活动<%} %></div>
    	<div class="create_activity_form_box">
    	<div class="create_activity_form">
    		<div class="create_select_city e_clear">
    			<div class="create_left_name">活动显示城市</div>
    			<div class="create_city_dl e_clear">
    				<dl class="e_clear">
	    				<dt>城市选择</dt>
	    				<dd>
	    					<select name="citySel" id="citySel">
							<%
							for(Map<String,Object> eventCityMap : eventCityMaps) {
							   		boolean selected = (Boolean) eventCityMap.get("selected");
					   		   	if(selected) {
							%>
								<option value="<%=eventCityMap.get("citycode") %>" selected><%=eventCityMap.get("cityname") %></option>
							<%
					   			} else {
							%>
								<option value="<%=eventCityMap.get("citycode") %>"><%=eventCityMap.get("cityname") %></option>
							<%
					   			}
							}
							%>
							</select>
	    				</dd>
	    			</dl>
    			</div>
    		</div>
    		<div class="create_info e_clear">
    			<div class="create_left_name">活动基本信息</div>
    			<div class="create_info_dl e_clear">
    				<dl class="e_clear">
	    				<dt>活动名称</dt>
	    				<dd class="activity_name_input">
	    					<input id="activityName" type="text" placeholder="请输入标题，字数在20个字左右" value="<%=title %>" />
	    				</dd>
	    			</dl>
	    			<dl class="e_clear">
	    				<dt>活动地点</dt>
	    				<dd class="activity_adress_input">
	    					<input id="activityLocation" type="text" placeholder="如无地点请留空" value="<%=location %>" />
	    				</dd>
	    			</dl>
	    			<dl class="e_clear">
	    				<dt></dt>
	    				<dd class="activity_allday_input">
	    					<input id="activityAllday" type="checkbox" <%if(alldayEvent) {%>checked<%}%>/><span>全天</span>
	    				</dd>
	    			</dl>
	    			<dl class="e_clear">
	    				<dt>活动时间</dt>
	    				<dd class="activity_time_input">
	    					<input id="startDate" type="text" name="startDate" readonly="readonly" value="<%=startTime%>" />-
	    					<input id="endDate" type="text" name="endDate" readonly="readonly" value="<%=endTime%>" />
	    				</dd>
	    			</dl>
	    			<dl class="e_clear">
	    				<dt>提醒时间</dt>
	    				<dd class="activity_remind">
	    					<ul>
	    						<li><label for="zeroM"><input id="zeroM" type="checkbox" value="0" <%if(beforeMinuteSet.contains(0)){ %>checked<%}%>><span>正点</span></label></li>
	    						<li><label for="fiveM"><input id="fiveM" type="checkbox" value="5" <%if(beforeMinuteSet.contains(5)){ %>checked<%}%>><span>5分钟前</span></label></li>
	    						<li><label for="tenM"><input id="tenM" type="checkbox" value="10" <%if(beforeMinuteSet.contains(10)){ %>checked<%}%>><span>10分钟前</span></label></li>
	    						<li><label for="thirtyM"><input id="thirtyM" type="checkbox" value="30" <%if(beforeMinuteSet.contains(30)){ %>checked<%}%>><span>30分钟前</span></label></li>
	    						<li><label for="sixtyM"><input id="sixtyM" type="checkbox" value="60" <%if(beforeMinuteSet.contains(60)){ %>checked<%}%>><span>1小时前</span></label></li>
	    						<li><label for="onedayM"><input id="onedayM" type="checkbox" value="1440" <%if(beforeMinuteSet.contains(1440)){ %>checked<%}%>><span>1天前</span></label></li>
	    						<li><label for="threedayM"><input id="threedayM" type="checkbox" value="4320" <%if(beforeMinuteSet.contains(4320)){ %>checked<%}%>><span>3天前</span></label></li>
	    					</ul>
	    				</dd>
	    			</dl>
	    			<dl class="e_clear">
	    				<dt>人数上限</dt>
	    				<dd class="activity_peo_num">
	    					<ul>
	    						<li>
	    							<lable>
	    								<input type="radio" name="countGroup" <%if(enrollLimit==0){%>checked<%}%> value="noLimit">
	    								<span>无上限</span>
	    							</lable>
	    						</li>
	    						<li>
	    							<lable>
	    								<input type="radio" name="countGroup" value="hasLimit" <%if(enrollLimit>0){%>checked<%}%>>
	    								<span>自定义</span>
	    								<input id="countMax" type="tel" placeholder="请输入数字" <%if(enrollLimit>0){%>value="<%=enrollLimit %>"<%} %>>
	    							</lable>
	    						</li>
	    					</ul>
	    				</dd>
	    			</dl>
	    			<dl class="e_clear">
	    				<dt>所属日历</dt>
	    				<dd class="attr_calendar">
	    					<div class="attr_calendar_sreach">
	    						<select name="calendarId" id="calendarId">
								<%for(Map<String, Object> calendar : choiceCalendarMaps) {%>
									<option value="<%=calendar.get("calendarId") %>" <%if((Boolean)calendar.get("selected")){%>selected<%}%>><%=calendar.get("title") %></option>
								<%} %>
    							</select>
	    						<label for="">
	    							<input id="isJoinIn" type="checkbox" <%if(focusWhenJoin){%>checked<%}%>><span>用户参与该活动的时候，同时关注该日历</span>
	    						</label>
	    					</div>
	    				</dd>
	    			</dl>
    			</div>
    		</div>
    		<div class="create_activity_content e_clear">
    			<div class="create_left_name">活动正文内容</div>
				<div class="create_content_dl e_clear">
					<dl class="e_clear">
	    				<dt>正文内容</dt>
	    				<dd class="activity_content_txt">
	    					<textarea name="activity_content" id="activity_content"><%=description %></textarea>
	    				</dd>
	    			</dl>
	    			<dl class="upload_img e_clear">
	    				<dt>活动图片</dt>
	    				<dd>
	    					<ul id="create_upload_imglist" class="create_upload_imglist">
	    					</ul>
	    					<div class="create_upload_box">
								<a href="javascript:void(0)" id="js-uploadImg" class="upload_image_link" title="本地上传"></a>
							</div>
							<ddd id="image_thumb"></ddd>
	    				</dd>
	    			</dl>
	    			<dl class="link_adress e_clear">
	    				<dt>链接地址</dt>
	    				<dd><input id="linkUrl" type="text" value="<%=linkedUrl %>"></dd>
	    			</dl>
				</div>
    		</div>
    		<div class="create_btn_name e_clear">
    			<div class="create_left_name">活动按钮名称</div>
    			<div class="create_btn_name_dl e_clear">
    				<dl class="e_clear">
	    				<dt>参加前</dt>
	    				<dd>
	    					<ul>
	    						<li>
	    							<lable>
	    								<input type="radio" name="joinBefore" value="joinIn" <%if(joinButton.equals(defaultJoinButton)){%>checked<%}%>>
	    								<span>默认名称(<%=defaultJoinButton %>)</span>
	    							</lable>
	    						</li>
	    						<li>
	    							<lable>
	    								<input type="radio" name="joinBefore" value="customJoinBefore" <%if(!joinButton.equals(defaultJoinButton)) {%>checked<%}%>>
	    								<span>自定义</span>
	    								<input id="customJoinButton" type="text" placeholder="不可超过4个汉字" <%if(!joinButton.equals(defaultJoinButton)) {%>value="<%=joinButton %>"<%}%>>
	    							</lable>
	    						</li>
	    					</ul>
	    				</dd>
	    			</dl>
	    			<dl class="e_clear">
	    				<dt>参加后</dt>
	    				<dd>
	    					<ul>
	    						<li>
	    							<lable>
	    								<input type="radio" name="joinAfter" value="viewOrder" <%if(joinedButton.equals(defaultJoinedButton)) {%>checked<%} %>>
	    								<span>默认名称(<%=defaultJoinedButton %>)</span>
	    							</lable>
	    						</li>
	    						<li>
	    							<lable>
	    								<input type="radio" name="joinAfter" value="customJoinAfter" <%if(!joinedButton.equals(defaultJoinedButton)) {%>checked<%}%>>
	    								<span>自定义</span>
	    								<input id="customJoinedButton" type="text" placeholder="不可超过4个汉字" <%if(!joinedButton.equals(defaultJoinedButton)) {%>value="<%=joinedButton %>"<%}%>>
	    							</lable>
	    						</li>
	    					</ul>
	    				</dd>
	    			</dl>
    			</div>
    		</div>
    		<div class="activity_acc e_clear">
    			<div class="create_left_name">活动商家账号</div>
    			<div class="activity_acc_dl e_clear">
    				<dl class="e_clear">
	    			 	<dt>账号名称</dt>
	    			 	<dd>
	    			 		<select name="businessUserId" id="businessUserId">
	    			 		<%for(Map<String, Object> business : businessMaps) {%>
	    			 			<option value="<%=business.get("id") %>" <%if((Boolean)business.get("selected")){%>selected<%}%>><%=business.get("name")%></option>
	    			 		<%} %>
							</select>
	    			 	</dd>
	    			 </dl>
    			</div>
    		</div>
    		<div class="activity_id e_clear">
    			<div class="create_left_name">活动ID</div>
				<div class="activity_id_dl e_clear">
					<dl class="e_clear">
	    			 	<dt>ID账号</dt>
	    			 	<dd>
	    			 		<input id="businessNumber" type="text" placeholder="" value="<%=businessNumber %>" />
	    			 	</dd>
	    			 </dl>
				</div>
    		</div>
    		<div class="activity_limit e_clear">
    			<div class="create_left_name">活动参与限制</div>
    			<div class="activity_limit_dl e_clear">
    				<dl class="e_clear">
	    			 	<dt>活动限制</dt>
	    			 	<dd>
	    			 		<div class="limit_radio e_clear">
    							<label for="">
    								<input type="radio" name="activityLimit" value="limit" <%if(isActivityLimit){%>checked<%}%> /><span>只限365日历客户端</span>
    							</label>
    							<label for="">
    								<input type="radio" name="activityLimit" value="nolimit" <%if(!isActivityLimit){%>checked<%}%> /><span>不限制</span>
   								</label>
    						</div>
	    			 	</dd>
	    			 </dl>
    			</div>
    		</div>
    	</div>
    		<div class="activity_type_div">
    			<div class="activity_type e_clear">
    				<div class="create_left_name">活动类型</div>
    				<div class="activity_type_dl e_clear">
    					<dl class="e_clear">
    						<dt>类型选择</dt>
    						<dd class="activity_type_dl_select">
    							<select name="activityType" id="activityType">
    								<!-- 这里如果是编辑状态则让活动类型不可选 -->
    								<%
    								if(isCreate) {
	    								for(Map<String, Object> eventType : eventTypeMaps) {
	    									%>
									<option value="<%=eventType.get("typecode") %>" <%if((Boolean)eventType.get("selected")){%>selected<%}%>><%=eventType.get("typename") %></option>
											<%
										}
    								} else {
    								    if(isCommonOffline) {
    								%>
    								<option value="offlineActivity" <%if(isCommonOffline){%>selected<%}%>>标准线下活动</option>
    								<%
    									}
    								    if(isCustomLink) {
    								%>
    								<option value="customLinkActivity" <%if(isCustomLink){%>selected<%}%>>自定义链接活动</option>
    								<%
    								    }
    								    if(isCommonLottery) {
 								   	%>
 		    						<option value="commonLottery" <%if(isCommonLottery){%>selected<%}%>>通用抽奖</option>
 		    						<%
 		    							}
    								}
    								%>							
    							</select>
    						</dd>
    					</dl>
    				</div>
    			</div>
    			<div class="activity_custom_link e_clear activity_common_div">
    				<div class="create_left_name">自定义活动</div>
    				<div class="activity_common_dl e_clear">
    					<dl class="custom_activity e_clear">
    						<dt>参与链接</dt>
    						<dd>
    							<input id="joinUrl" type="text" <%if(isCustomLink){%>value="<%=joinUrl%>"<%}%>/>
    						</dd>
    					</dl>
    				</div>
    			</div>
    			<div class="activity_user_behavior  e_clear activity_common_div">
    				<div class="create_left_name">用户参与行为</div>
    				<div class="activity_user_behavior_dl e_clear">
    					<dl class="e_clear">
    						<dt>活动协议</dt>
    						<dd>
    							<div class="behavior_radio e_clear">
    								<label for="">
    									<input type="radio" name="activeProtocol" value="hasProtocol" <%if((isCommonOffline && !contract.isEmpty()) || isCreate){%>checked<%}%>><span>有协议</span>
    								</label>
    								<label for="">
    									<input type="radio" name="activeProtocol" value="noProtocol" <%if(isCommonOffline && contract.isEmpty()){%>checked<%}%>><span>无协议</span>
   									</label>
    							</div>
    							<div class="behavior_textarea">
    								<div class="behavior_textarea_tips">
    									<span class="font_num">
    										0/200
    									</span>
    									<p>请填写协议内容</p>
    								</div>
    								<textarea name="protocolDesc" id="protocolDesc"><%if(isCommonOffline){%><%=contract %><%}%></textarea>
    							</div>
    						</dd>
    					</dl>
    					<dl>
    						<dt>兑换码</dt>
    						<dd>
    							<div class="behavior_radio e_clear">
    								<label for="">
    									<input type="radio" name="wechatHideExchange" value="hideExchange" <%if((isCommonOffline && hideCodeInWx) || isCreate){%>checked<%}%>><span>微信隐藏</span>
   									</label>
    								<label for="">
    									<input type="radio" name="wechatHideExchange" value="showExchange" <%if((isCommonOffline && !hideCodeInWx)){%>checked<%}%>><span>微信不隐藏</span>
    								</label>
    							</div>
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>用户数据</dt>
    						<dd>
    							<ul class="user_data_radio_list">
    								<li><input type="radio" name="userData" value="noUserData" <%if(!expectUserData){%>checked<%}%>><span>该活动不需要用户数据</span></li>
    								<li><input type="radio" name="userData" value="hasUserData" <%if(expectUserData){%>checked<%}%>><span>该活动需要用户数据</span></li>
    							</ul>
    							<div class="user_data">
    								<div class="title e_clear">
    									<span>项目名称</span><span>是否必填</span><span class="senior">高级功能</span>
    								</div>
    								<ul>
    									<li class="e_clear">
    										<div class="user_data_list"><input id="user_name_label" type="checkbox" <%if(expectDataName){%>checked<%}%>><span>姓名</span></div>
    										<div class="mandatory">
    											<input id="user_name" type="checkbox" <%if(requireDataName){%>checked<%}%>/><span>是</span>
    										</div>
    									</li>

    									<li class="e_clear">
    										<div class="user_data_list"><input id="user_mobile_label" type="checkbox" <%if(expectDataCellphone){%>checked<%}%>><span>手机号</span></div>
    										<div class="mandatory">
    											<input id="user_mobile" type="checkbox" <%if(requireDataCellphone){%>checked<%}%>><span>是</span></input>
    										</div>
    										<div class="validation">
    											<input id="user_mobile_validated" type="checkbox" <%if(needVerifyCellphone){%>checked<%}%>/><span>验证</span>
    										</div>
    									</li>
    									
    									<li class="e_clear">
    										<div class="user_data_list"><input id="user_mail_label" type="checkbox" <%if(expectDataEmail){%>checked<%}%>><span>邮箱</span></div>
    										<div class="mandatory">
    											<input id="user_mail" type="checkbox" <%if(requireDataEmail){%>checked<%}%>><span>是</span></input>
    										</div>
    									</li>

    									<li class="e_clear">
    										<div class="user_data_list"><input id="user_sex_label" type="checkbox" <%if(expectDataSex){%>checked<%}%>><span>性别</span></div>
    										<div class="mandatory">
    											<input id="user_sex" type="checkbox" <%if(requireDataSex){%>checked<%}%>><span>是</span></input>
    										</div>
    									</li>

    									<li class="e_clear">
    										<div class="user_data_list"><input id="user_birthday_label" type="checkbox" <%if(expectDataBirthday){%>checked<%}%>/><span>生日</span></div>
    										<div class="mandatory">
    											<input id="user_birthday" type="checkbox" <%if(requireDataBirthday){%>checked<%}%>><span>是</span></input>
    										</div>
    									</li>
    									
    									<li class="e_clear">
    										<div class="user_data_list"><input id="user_msg_label" type="checkbox" <%if(expectDataLeaveWord){%>checked<%}%>><span>留言</span></div>
    									</li>
    								</ul>
    							</div>
    						</dd>
    					</dl>
    				</div>
    			</div>
    			<div class="activety_parameter_set e_clear activity_common_div" >
    				<div class="create_left_name">时间参数设置</div>
    				<div class="activety_parameter_set_dl e_clear">
    					<dl class="e_clear">
    						<dt>兑换时间</dt>
    						<dd class="activity_time_input">
		    					<input id="exchangeStartDate" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:''})" name="exchangeStartDate" readonly="readonly" <%if(isCommonOffline){%>value="<%=startAcceptTime %>"<%}%> />-
	    						<input id="exchangeEndDate" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:''})" name="exchangeEndDate" readonly="readonly" <%if(isCommonOffline){%>value="<%=endAcceptTime %>"<%}%> />
		    				</dd>
    					</dl>
    				</div>
    			</div>
    			<div class="activity_lottery_info e_clear activity_common_div">
    				<div class="create_left_name">通用抽奖设置</div>
    				<div class="activity_lottery_info_dl e_clear">
    					<dl class="e_clear">
    						<dt>抽奖标题</dt>
    						<dd class="activity_common_dd">
    							<input id="lotteryTitle" type="text" placeholder="请输入抽奖标题，字数在60个字左右" <%if(isCommonLottery) {%>value="<%=lotteryTitle %>"<%} %> />
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>抽奖须知</dt>
    						<dd class="activity_common_dd">
    							<textarea name="lotteryRuleDesc" id="lotteryRuleDesc"><%if(isCommonLottery){ %><%=lotteryRule %><%} %></textarea>
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>短信模板</dt>
    						<dd class="activity_common_dd">
    							<textarea name="lotteryMessageModal" id="lotteryMessageModal"><%if(isCommonLottery){ %><%=lotteryMessage %><%} %></textarea>
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>中奖概率</dt>
    						<dd class="activity_lottery_probability_dd">
    							<input type="text" id="lotteryProbability" value="<%if(isCommonLottery) {%><%=lotteryProbability %><%} else { %>0<%} %>" /> %
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>按钮名称</dt>
    						<dd class="activity_common_dd">
    							<input type="text" id="lotteryBtnName" value="<%if(isCommonLottery) { %><%=lotteryBtnName %><%} else { %>开始抢票<%} %>" />
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>奖品名称</dt>
    						<dd class="activity_common_dd">
    							<input type="text" id="lotteryPrizeName" value="<%if(isCommonLottery) { %><%=lotteryPrizeName %><%} else { %>抵价券<%} %>" />
    						</dd>
    					</dl>
    					<%if(isCommonLottery) { %>
    					<dl class="e_clear">
    						<dt>奖品数量</dt>
    						<dd class="activity_common_dd">
    							目前共设置奖品 <%=prizeCount %> 个，已发出 <%=prizeOwned %> 个
    						</dd>
    					</dl>
    					<%} %>
    					<dl class="e_clear">
    						<dt>添加奖品</dt>
    						<dd>
								<div class="prizecode_source_radio e_clear">
    								<label for="">
    									<input type="radio" name="lotteryPrizeCodeSource" value="autoGenerate" checked="true" /><span>自动生成</span>
    								</label>
    								<label for="">
    									<input type="radio" name="lotteryPrizeCodeSource" value="importCodes" /><span>批量导入</span>
   									</label>
   									<%if(isCommonLottery) { %>
   									<label class="notice" for="">
   										<span><b>注意：兑换码只能追加，不能替换！</b></span>
   									</label>
   									<%} %>
    							</div>
    							<div class="behavior_textarea prizecode_import_area">
    								<div class="behavior_textarea_tips">
    									<p>每条兑换码不超过30字符，<b style='color:#0000ff'>一行代表一条</b>或者<b style='color:#0000ff'>用英文逗号“,”隔开</b>；如兑换码中间需换行，请用插入“\n”符号。</p>
    								</div>
    								<textarea name="lotteryPrizeCodes" id="lotteryPrizeCodes"></textarea>
    							</div> 
    							<div class="prizecode_generate_area">
    								要增加的数量：
    								<input type="text" id="lotteryPrizeCount" value="0" />
    							</div>
    						</dd>
    					</dl>
    				</div>
    			</div>
    		</div>
    		
    		<div class="activity_container_div">
    			<div class="activity_pay_type e_clear">
    				<div class="create_left_name">支付功能设置</div>
    				<div class="activity_type_dl e_clear">
    					<dl class="e_clear">
    						<dt>有无支付</dt>
    						<dd>
		    			 		<div class="need_pay_radio e_clear">
	    							<label for="">
	    								<input type="radio" name="activityNeedPay" value="noneed" <%if(!isNeedPay){%>checked<%}%> /><span>无支付</span>
	    							</label>
	    							<label for="">
	    								<input type="radio" name="activityNeedPay" value="need" <%if(isNeedPay){%>checked<%}%> /><span>有支付</span>
	   								</label>
	    						</div>
		    			 	</dd>
    					</dl>
    				</div>
    			</div>
    			<div class="activity_pay_info e_clear">
    				<div class="create_left_name">支付参数</div>
    				<div class="activity_common_dl e_clear">
    					<dl class="e_clear">
    						<dt>商品类型</dt>
    						<dd class="activity_common_dd_select">
    							<select name="payTradeType" id="payTradeType">
    								<!-- 这里如果是编辑状态则让活动类型不可选 -->
    								<%
	    							for(Map<String, Object> tradeType : tradeTypeMaps) {
	    							%>
									<option value="<%=tradeType.get("type") %>" <%if((Boolean)tradeType.get("selected")){%>selected<%}%>><%=tradeType.get("typename") %></option>
									<%
									}
    								%>							
    							</select>
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>商家名称</dt>
    						<dd class="activity_common_dd">
    							<input id="payMerchantName" type="text" placeholder="请输入商家名称，字数在60个字左右" <%if(isNeedPay) {%>value="<%=eventPay.getMerchantName() %>"<%} %> />
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>商品名称</dt>
    						<dd class="activity_common_dd">
    							<input id="payTradeName" type="text" placeholder="请输入商品名称，字数在60个字左右" <%if(isNeedPay) {%>value="<%=eventPay.getTradeName() %>"<%} %> />
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>商品描述</dt>
    						<dd class="activity_common_dd">
    							<textarea name="payTradeDescription" id="payTradeDescription"><%if(isNeedPay){ %><%=eventPay.getTradeDescription()%><%} %></textarea>
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>商品单价</dt>
    						<dd class="activity_common_dd">
    							<div class="pay_price_area">
    								<input id="payPrice" type="text" placeholder="商品价格" <%if(isNeedPay) {%>value="<%=(new DecimalFormat("#0.00")).format((double)eventPay.getPrice() / 100) %>"<%} else { %>value="0.00" <%} %> /> 元
    								<b style="color:#ff0000; padding-left:30px;">设置0元为免费，按无支付处理</b>
    							</div>
    						</dd>
    					</dl>
    					<dl class="e_clear">
    						<dt>支持退款</dt>
    						<dd>
    							<div class="need_pay_radio e_clear">
	    							<label for="">
	    								<input type="radio" name="activityAllowRufund" value="allow" <%if(isNeedPay && eventPay.isAllowRufund() || !isNeedPay){%>checked<%}%> /><span>支持</span>
	    							</label>
	    							<label for="">
	    								<input type="radio" name="activityAllowRufund" value="notallow" <%if(isNeedPay && !eventPay.isAllowRufund()){%>checked<%}%> /><span>不支持</span>
	   								</label>
	    						</div>
    						</dd>
    					</dl>
    				</div>
    			</div>
    		</div>
    		
    		<a href="" class="save_btn">发布</a>
    		<div style="display:none"><input type="file" id="js-fileInput" multiple /></div>
    	</div>
    </div>    	
    <script src="/js/jquery/jquery-1.8.3.min.js"></script>
    <script src="/js/jquery/jquery-ui-1.8.13.custom.min.js"></script>
    <script src="/js/jquery/jquery-ui-datepicker-1.8.14.min.js"></script>
    <script src="/js/lib/amplify.core.min.js"></script>
    <script src="/js/newweb/common.js"></script>
    <script>
    	$(document).ready(function() {
    		if(G.pics == '') return;
			var pics = G.pics.split(',');
			var $ul = $('#create_upload_imglist');
			for(var i=0; i<pics.length; i++) {
				var $li = $('<li><img src="' + pics[i] + '"/><i class="del_img_btn"></i></li>');
	            $ul.append($li);
			}
			
			if(G.alldayEvent) {
				var str = $('#startDate').val().split(' ')[1];
				if(str != undefined || str != '') {
					$('#startDate').val($('#startDate').val().split(' ')[0]);
					$('#endDate').val($('#endDate').val().split(' ')[0]);
				} 
			}
		});
    </script>
    <script src="/pages/activity_business_admin/js/edit_activity.js"></script>
</body>
</html>