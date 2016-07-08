/*
 * 365日历月视图插件
 *
 *
 */ 

var pResizeTimer = null;
/*
 * 插件的基本配置
 */
var options = {
    start_on_monday:0,
    theme : "default",
    defaultView: 'month',
    showLunar:1,
    calMinHeight:480,
    calMinWidth:780
};
/*
 * 记录当前日历的状态
 */
var record = {
    elem_id : "",
    nav_date : new Date(),
    nav_date_agenda : new Date(),   // 日视图导航
    calendarId: 0,                   // 记录当前显示的日历ID (need more consideration,
                                        // maybe an array)
	uid:null,
    cur_view: 'month',               // 当前视图,目前支持'month','agenda'
    list_prev_curdate: new Date(new Date().getTime() - 15 * 24 * 3600 * 1000),		// 当前月第一天日期
    list_next_curdate: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)			// 当前月最后一天日期
};

var commonFunction = {
    showMonthSch : function() {
    }
};

/* =========================插件部分====================== */
(function($) {
    /* 基本配置的参数 */
    var defaults = {
        start_on_monday:0,
        theme : "default",
        defaultView: 'month',
        showLunar:1,
        calMinHeight:480,
        calMinWidth:780
    };
    
    $.extend(true, defaults, options);
    
    $.fn.initCal365 = function(date) {
        if('month' == defaults.defaultView) {
            record.cur_view = 'month';
            gridView.genericWeekHeader();
            pageControl.autoAdaption();
            gridView.genericGrid(date);
			calEvent.addGridEvent();
			record.nav_date = date;
        } else {
            record.cur_view = 'agenda';
            // TODO list view
        }
        dialogHandle.initTodoBriefDialog();
        dialogHandle.initTodoDialog();
        calEvent.addBtnEvent();
    };
	$.fn.drawSch = function(){   // 为了实现多日历，此处为月视图一开始时，首先要获取用户的日历列表，然后根据cookie中存储的选中日历，获取这些选中日历的日程信息，而此处将此接口暴露出来是为了calendarHandler在取完日历信息后执行获取日程的方法，同时执行化日程。此种方法不是最优。
		 DataHandler.getSchByMonth(record.nav_date, gridView.drawSchedule, defaults.start_on_monday);
	};
    /*-------------------日历视图------------------*/
    var gridView = {
        /*
         * 生成日历的表头(星期的一行)
         */
        genericWeekHeader : function() {
            var str = new StringBuffer();
            str.append("<tbody><tr>");
            for(var i=defaults.start_on_monday;i<7;i++) {
                str.append('<th class="weekHeader">').append(cal365.locale.date.day_full[i]).append('</th>');
            }
            for(var j=0;j<defaults.start_on_monday;j++) {
                str.append('<th class="weekHeader">').append(cal365.locale.date.day_full[j]).append('</th>');
            }
            str.append('</tr></tbody>');
            $("#week_table").html(str.toString());
        },
        
        /*
         * 绘制日历界面，仅仅是日历界面的背景格子，没有绘画日程，绘画日程需等到数据加载完毕然后执行回调并进行单独绘画
         */
        genericGrid: function(date) {
            var date_cal = date || new Date();
            var cd=new Date();
            date_cal = cal365.date.date_part(date_cal);
            cd = cal365.date.date_part(cd);
            var dd = cal365.date.month_start(date_cal);
            var ed = cal365.date.add(dd,1,"month");
            var sd = cal365.date.week_start(dd,defaults.start_on_monday);
            var info = CalUtil.monthViewInfo(date, defaults.start_on_monday);
            var sd = info.start;
            var rows = info.row;
            record.row = rows;
            var str = new StringBuffer(),html = '';
            var height = Math.round(1 / rows * 1000000) / 10000;
            for (var i=0; i<rows; i++) {
                var top = Math.round(i / rows * 1000000) / 10000;
                var str_temp = new StringBuffer();
                str.append('<div class="monthRow" style="top:').append(top).append('%;height:').append(height).append('%">');
                var gridTable = new StringBuffer();
                // 绘出控制事件的表格
                var sd_detail = getDateKey(sd);
                var week_end = getDateKey(cal365.date.add(sd,6,"day"));
                gridTable.append('<table class="gridBgTable" cellspacing="0" cellpadding="0"><tbody><tr>');
                var schGrid = new StringBuffer(); /* 准备画日程的表格 */
                schGrid.append('<table class="schGrid" weekstart="').append(sd_detail).append('" weekend="').append(week_end).append('" cellspacing="0" cellpadding="0"><tbody>');
                var t_h = new StringBuffer(),t_event=new StringBuffer();
                t_event.append('<tr>');
                for(var j=0;j<7;j++) {
                    var t_title = new StringBuffer();
                    var cls = "", grid_cls = '';
                    var date_detail = getDateKey(sd);
                    var l_d = cal365.date.lunar_Info(sd);
                    if (sd<dd) {
                        cls='cal_before';
                    } else if (sd>=ed) {
                        cls='cal_after';
                    } else if (sd.valueOf()==cd.valueOf())
                        grid_cls='cal_now';
                    t_title.append('<div dayNav_m="').append(date_detail).append('" class="gridTitle ').append(cls).append('"><span style="float:left;" id="').append('more' + date_detail).append('"></span><span class="gridNum">').append(cal365.date.month_day(sd)).append('</span>');
                    if(defaults.showLunar==1) {
                        var lunar_day_name = l_d.l_day;
                        if('初一' == lunar_day_name) lunar_day_name = cmonthName[l_d.l_month-1] + '月';
                        t_title.append('<span class="gridLunar">').append(lunar_day_name).append('</span>');
                    }
                    t_title.append('</div>');
                    gridTable.append('<td class="gridBg"><div class="').append(grid_cls).append('" style="position:relative;height:100%;width:100%;" dayNav="').append(date_detail).append('">').append(t_title.toString()).append('</div></td>');
                    t_event.append('<td class="st-c st-s">&nbsp;</td>');
                    sd=cal365.date.add(sd,1,"day");
                }
                gridTable.append('</tr></tbody></table>');
                t_event.append('</tr>');
                schGrid.append(t_event.toString())/* .append(t_h.toString()) */;
                schGrid.append('</tbody></table>');
                str.append(gridTable.toString()).append(schGrid.toString());
                str.append('</div>');
            }
            $("#eventContainer").html(str.toString());
            
            viewController.drawCommonViewHeader(date_cal);
        },
        
        /*
         * 绘制日程
         */
        drawSchedule : function (data) {
// console.log($('table').find('.gridBg').height() + ' gridBg height');
            var tdHeight = Math.floor(($("table").find(".gridBg").height()-10)/20);
            $('.gridTitle [id^=more]').html(''); // 将之前的"另外x"清空
            $("table").filter(".schGrid").each( function() {
                var st = $(this).attr("weekstart");
                var et = $(this).attr("weekend");
				var cld = [];
				for(var i in calendarHandler.selected)
				{
					cld.push(i);
				}
				
                var result = DataHandler.getSchedulesByRange(st,et,DataHandler.resultData,cld);
                
// console.log('hello\n' + JSON.stringify(result));
                // TODO:计算格子最多显示的日程数，添加排序
                var str = new StringBuffer();
                var maxNum = result.maxNum>tdHeight?tdHeight:result.maxNum;
                for(var i=0;i<maxNum;i++) {
                    var s_t = cal365.templates.api_date(st);
                    var e_t = cal365.date.add(cal365.templates.api_date(et),1,"day");
                    str.append('<tr>');
                    
                    for(;s_t<e_t;) {
                        var k = "d"+getDateKey(s_t);
                        var dayCross = 0;
                        var sch = {};
                        var count = 0;

                        for(var q=0;q<result[k].num;q++) {
                            if(result[k].schList[q].writeType==-1)
                                continue;
                            else {
                                if(result[k].schList[q].cross_st) {
                                    var sch_t = cal365.templates.api_date(st);
                                    var cross_t = cal365.templates.api_date(result[k].schList[q].cross_st);
                                    var judge = 0;
                                    if(cross_t.getFullYear()==sch_t.getFullYear()&&cross_t.getMonth()==sch_t.getMonth()&&cross_t.getDate()==sch_t.getDate())
                                        judge=1;
                                    if(result[k].schList[q].start_time==result[k].schList[q].cross_st||judge==1) {
                                        sch = result[k].schList[q];
                                        count++;
                                        result[k].schList[q].writeType=-1;
                                        break;
                                    }
                                } else {
                                    sch = result[k].schList[q];
                                    count++;
                                    result[k].schList[q].writeType=-1;
                                    break;
                                }
                            }
                        }
                        
                        if(count!=0) {
							var cObj = calendarHandler.getCld(sch.cid);
                            var color = cObj.color;
                            if(sch.cross_st) {
                                var sTime = cal365.templates.api_date(sch.start_time);
                                var csTime = cal365.templates.api_date(sch.cross_st);
                                var eTime = new Date(sTime.valueOf()+sch.duration*1000);
                                var etTime = new Date(sTime.valueOf()+sch.duration*1000);

                                cal365.date.date_part(sTime);
                                if(eTime.valueOf()==cal365.date.date_part(etTime).valueOf()) {
                                } else
                                    eTime = cal365.date.add(cal365.date.date_part(eTime),1,"day");

                                try {
                                    for(;csTime<eTime&&csTime<e_t;) {
                                        var k1 = "d"+getDateKey(csTime);
                                        if(result[k1]) {
                                            for(var p=0;p<result[k1].num;p++) {
                                                var sch_temp = result[k1].schList[p];
                                                if(sch_temp.id==sch.id)
                                                    result[k1].schList[p].writeType=-1;
                                            }
                                        }
                                        csTime = cal365.date.add(csTime,1,"day");
                                        dayCross++;
                                    }
                                } catch(e) {
                                    alert(e.message); // TODO
                                }
                            }
							
                            str.append('<td class="st-c" colspan="').append(dayCross).append('"><div schid="').append(sch.id).append('" class="rb-n" style="z-index:4;position:relative;background-color:').append(color).append('">');
							//若为非全天日程则显示开始时间
							if(sch.allday_event==true)
							{
								str.append(sch.text.htmlspecialchars());
							}
							else
							{
								var sTimeS = cal365.templates.api_date(sch.start_time);
								str.append(sTimeS.getHours().toString().leftpad(2)+":"+sTimeS.getMinutes().toString().leftpad(2)+" "+sch.text.htmlspecialchars());
							}
							str.append('</div></td>');
                        } else {
                            str.append('<td class="st-c st-s">&nbsp;</td>');
                        }
                        if(dayCross==0)
                            s_t = cal365.date.add(s_t,1,"day");
                        else
                            s_t = cal365.date.add(s_t,dayCross,"day");
                    }
                    str.append('</tr>');
                }

                // 另外X
                var start = cal365.templates.api_date(st);
                while(start < e_t) {
                    var k = 'd' + getDateKey(start);
                    if(result[k]) {
                        var more = result[k].num;
                        for(var i = 0; i < result[k].num; ++i) {
                            if(-1 == result[k].schList[i].writeType) {
                                -- more;
                            }
                        }
                        if(more > 0) {
                            $('#more' + getDateKey(start)).html('<div style="z-index:4;position:relative;cursor:pointer;color:#2c414a;text-decoration:underline;padding-left:4px;" dayinfo="' + k + '">另外' + more + '个</div>');
                        }
                    }
                    start = cal365.date.add(start, 1, 'day');
                }
				
             // if(str.toString()!="") {
                    // $(this).find(".st-c").parent().remove();
                    $(this).html(str.toString());
					
              // }
            });
        }

    };
    
    /*----------------列表视图---------------------*/
    var viewController = {
        drawCommonViewHeader : function(date){
            $("#cal_header .dateNavInfo").html(date.getFullYear()+"-"+(date.getMonth()+1).toString().leftpad(2));// +"-"+date.getDate().toString().leftpad(2));
        },
        viewSwitcher : {
            showGridView: function(date) {
                record.cur_view = 'month';
                $("#listcontainer").hide();
                $("#listtodo").hide();
                $("#todoDialog").hide();
                $("#todoBriefDialog").hide();
                $("#moreCalendar").show();
            	$("#smallCal").show();
                $('.monthBtn').css({'background-position':'-4px -5px'});
                $('.todoBtn').css({'background-position':'65px 32px'});
                $('.listBtn').css({'background-position':'125px 32px'});
                $("#gridcontainer").show();
                gridView.genericWeekHeader();
                gridView.genericGrid(date);
                DataHandler.getSchByMonth(date, gridView.drawSchedule, defaults.start_on_monday);
            },
            showListView: function(s_date, e_date) {
                record.cur_view = 'agenda';
                $("#gridcontainer").hide();
                $("#listtodo").hide();
                $("#todoDialog").hide();
                $("#todoBriefDialog").hide();
                $("#moreCalendar").show();
            	$("#smallCal").show();
                viewController.drawCommonViewHeader(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
                $('.monthBtn').css({'background-position':'-4px 32px'});
                $('.todoBtn').css({'background-position':'65px 32px'});
                $('.listBtn').css({'background-position':'125px -5px'});
                var schedulesByCldId = DataHandler.getSchedulesByRange(s_date, e_date, DataHandler.resultData, calendarHandler.getSelectedArray());
                var instance = tplMgr.getInstance("listItemTpl");
                $("#list_content").html(instance.GetView(schedulesByCldId));
                $("#listcontainer").show(); 
            },
            showTodoView:function(){
            	record.cur_view='todo';//还不清楚设置这个变量值有什么作用，只是仿照前两个方法的做法
            	$("#listcontainer").hide();
            	$("#gridcontainer").hide();
            	$("#moreCalendar").hide();
            	$("#smallCal").hide();
            	$("#listtodo").show();
            	$('.monthBtn').css({'background-position':'-4px 32px'});
                $('.listBtn').css({'background-position':'125px 32px'});
                $('.todoBtn').css({'background-position':'65px -5px'});
                if(!todoHandler.isTodoPaint){
                	todoHandler.ajaxGetTodoList();
                }
            }
        }
    };
    
    /*-------------将drawSchedule公开-------------*/
    commonFunction.showMonthSch = gridView.drawSchedule;
    
    /*----------页面控制,包括页面自适应等的控制----------*/
    var pageControl = {
        // TODO 需要仔细考虑自适应的情况,尤其是切换详情页面时的自适应
        autoAdaption: function() {
            var height = document.documentElement.clientHeight - 58 - 90 - 20 - 60;
            if(height<480)
                height=480;
            var page_content_w = document.documentElement.clientWidth - 100;
            var page_width = page_content_w - 225;
            $("#page_content").width(page_content_w);
            
            $("#page").width(page_width);
            $("#gualiHeader").width(page_content_w-23); // 挂历头部);
            $('#det_desc').width(page_width-120); // 详情页"内容"textarea
            $("#gridcontainer").height(height);
            $('#listcontainer').height(height-2);
            $("#listtodo").height(height-2); 
            $("#eventContainer").height(height-30);
            $('#detailContent').height(height-30);
            $('#calList').height($('#cal_header').height() + $('#gridcontainer').height() + 80);
            $("#riliPage").height(document.documentElement.clientHeight);
            // TODO add controls other elements which need auto adaption
        }
    };
    
    /*------------------插件内部的dialog管理-------------------*/
    var dialogHandle = {
        initCreateDialog: function(date) {
            var instance = tplMgr.getInstance('createSchTpl');
            $("#schContent").html(instance.GetView(date));
        },
        initShowAllDialog: function(date, todaySch) {
			// $("#showAllSchTpl").val($("#showAllSchTpl").html());
            var instance = tplMgr.getInstance('showAllSchTpl');
            $("#showAllSchDialog").html(instance.GetView(date, todaySch));
			// $(".moreScheduler .rb-n").unbind("click");
			$(".moreScheduler").unbind("click");
			$(".moreScheduler").bind("click",function(ev){
				var mousePos = utils.getMousePosition(ev);
				dialogHandle.initShowSchDetail(DataHandler.resultDataById[$(this).attr("schid_more")]);
				var showSchDetail = document.getElementById("showSchBriefDialog");
				var schPos = utils.getOffsetXY(this);
				var gridContainer = document.getElementById("gridcontainer");
				var tablePos = utils.getOffsetXY(gridContainer);
				var schH = 20, diaH = 180, diaW = 280; // 日程条的高度, 对话框的高度,
                                                        // 对话框的宽度
				if(schPos.y + schH + diaH > tablePos.y + $(gridContainer).height()) {
					showSchDetail.style.top = (schPos.y - diaH - schH) + "px";
				} else {
					showSchDetail.style.top = (schPos.y + schH) + "px";
				}
				if(mousePos.x + diaW/2 > tablePos.x + $(gridContainer).width()) {
					showSchDetail.style.left = (tablePos.x + $(gridContainer).width() - diaW) + "px";
				} else if(mousePos.x - diaW/2 < tablePos.x) {
					showSchDetail.style.left = tablePos.x + "px";
				} else {
					showSchDetail.style.left = (mousePos.x - diaW/2) + "px";
				}
				$("#showSchBriefDialog").show();
				calEvent.addDlgEvent.addSchBriefDlgEvent($(this).attr("schid_more"));
				utils.mousedown_hide_ele("showSchBriefDialog", "rili365");
				
			});
			$("#moreBtn_close").unbind("click");
			$("#moreBtn_close").bind("click",function(){
				utils.hideDialog(["showAllSchDialog"]);
			});
        },
        initShowSchDetail: function(sch) {
            var instance = tplMgr.getInstance("showSchDetailTpl");
            var cld = calendarHandler.getCld(sch.cid);
            sch.cld = cld;
            $("#showSchBriefDialog").html(instance.GetView(sch));
        },
        initTodoDialog:function(){
        	$("#todo_dialog_btn_close").click(function(){
        		$("#todoDialog").hide();
        	});
        	$("#todo_dialog_btn_cancle").click(function(){
        		$("#todoDialog").hide();
        	});
        	$("#todo_dialog_btn_graystar").click(function(){
        		todoHandler.todoDialogChangePriorityClick(true);
        	});
        	$("#todo_dialog_btn_yellowstar").click(function(){
        		todoHandler.todoDialogChangePriorityClick(false);
        	});
        	$("#todo_dialog_btn_save").click(function(){
        		todoHandler.todoDialogSaveClick();
        	});
        	$("#todo_dialog_content").focus(function(){
        		if($("#todo_dialog_content").val()=="不超过1000个字..."){
        			$("#todo_dialog_content").val("");
        		}
        	});
        	$("#todo_dialog_content").keyup(function(){
        		var content=$("#todo_dialog_content").val();
        		if(content.length>1000){
        			$("#todo_dialog_content").val(content.substring(0,1000))
        		}
        	});
        },
        initTodoBriefDialog:function(){
        	$("#todoBrief_dialog_close").click(function(){
        		$("#todoBriefDialog").hide();
        	});
        	$("#todoBrief_dialog_undone").click(function(){
        		todoHandler.todoBriefDialogChangeStateClick(true);
        	});
        	$("#todoBrief_dialog_done").click(function(){
        		todoHandler.todoBriefDialogChangeStateClick(false);
        	});
        	$("#todoBrief_dialog_edit").click(function(event){
        		todoHandler.todoBriefDialogEditClick(event);
        	});
        	$("#todoBrief_dialog_delete").click(function(){
        		todoHandler.todoBriefDialogDeleteClick();
        	});
        	
        }
    };
    
	/*---------------------协同小日历和大日历--------------*/
	$.fn.changDate = function(){
		if('month' == record.cur_view) {
			
              gridView.genericGrid(record.nav_date);
              DataHandler.getSchByMonth(record.nav_date, gridView.drawSchedule, defaults.start_on_monday);
			 $("#smallCal_cal").changeNav();
         } else if('agenda' == record.cur_view) {
              DataHandler.getSchByMonth(record.nav_date, null, defaults.start_on_monday);
              viewController.viewSwitcher.showListView(record.list_prev_curdate, record.list_next_curdate);
			  $("#smallCal_cal").changeNav();
         }

	};
    /*------------------- 事件管理-----------------------------*/
    var calEvent = {
        /*
         * 控件上的按钮事件
         */
        addBtnEvent : function() {
            $("#cal_header .prevBtn").click( function() {
                record.nav_date = cal365.date.add(record.nav_date,-1,"month");
                // alert(record.nav_date.toLocaleString());
                /*
                 * if('month' == record.cur_view) {
                 * gridView.genericGrid(record.nav_date);
                 * DataHandler.getSchByMonth(record.nav_date,
                 * gridView.drawSchedule, defaults.start_on_monday); } else
                 * if('agenda' == record.cur_view) {
                 * DataHandler.getSchByMonth(record.nav_date, null,
                 * defaults.start_on_monday);
                 * viewController.viewSwitcher.showListView(record.nav_date); }
                 */
				$("#gridcontainer").changDate();

            });
            
            $("#cal_header .nextBtn").click( function() {
                record.nav_date = cal365.date.add(record.nav_date,1,"month");
               /*
                 * if('month' == record.cur_view) {
                 * gridView.genericGrid(record.nav_date); //
                 * DataHandler.getDataAndDraw(record.nav_date);
                 * DataHandler.getSchByMonth(record.nav_date,
                 * gridView.drawSchedule, defaults.start_on_monday);
                 * $("#nextMonth").click(); } else if('agenda' ==
                 * record.cur_view) { DataHandler.getSchByMonth(record.nav_date,
                 * null, defaults.start_on_monday);
                 * viewController.viewSwitcher.showListView(record.nav_date); }
                 */
				$("#gridcontainer").changDate();
            });
            $("#cal_header .todayBtn").click( function() {
                record.nav_date =cal365.date.date_part(new Date());
               /*
                 * if('month' == record.cur_view) {
                 * gridView.genericGrid(record.nav_date); //
                 * DataHandler.getDataAndDraw(record.nav_date);
                 * DataHandler.getSchByMonth(record.nav_date,
                 * gridView.drawSchedule, defaults.start_on_monday); } else
                 * if('agenda' == record.cur_view) {
                 * DataHandler.getSchByMonth(record.nav_date, null,
                 * defaults.start_on_monday);
                 * viewController.viewSwitcher.showListView(record.nav_date); }
                 */
				$("#gridcontainer").changDate();
            });
            $("#cal_header .refresh").click(function(){
            	window.location=window.location;
            });
            $("#cal_header .monthBtn").click( function() {
                viewController.viewSwitcher.showGridView(record.nav_date);
                $("#cal_header .todayBtn").show();
                $("#cal_header .todayBtn").unbind("click").bind("click", function() {
                    record.nav_date =cal365.date.date_part(new Date());
                    $("#gridcontainer").changDate();
                });
                //重新绑定创建按钮事件
                $("#cal_header .createBtn").unbind("click").click(function() {
	                mainCalendar.prepareDetailPage();
	                $("#main_page").hide();
	                $("#createSchTB").show();
	            });
                
                $(".prevBtn").show();
                $(".nextBtn").show();
            });
            $("#cal_header .listBtn").click( function() {
                viewController.viewSwitcher.showListView(record.list_prev_curdate, record.list_next_curdate);
                //第一次切换到列表视图，锚指定到今天
                if(!("first_time_to_list" in record)){
                	record["first_time_to_list"] = true;
                	$("#listcontainer").scrollTop(0).scrollTop($("#todayRecord").offset().top - $("#listcontainer").offset().top);
                }
                $("#cal_header .todayBtn").show();
                $("#cal_header .todayBtn").unbind("click").bind("click", function() {
                	$("#listcontainer").scrollTop(0).scrollTop($("#todayRecord").offset().top - $("#listcontainer").offset().top);
                });
                $("#cal_header .createBtn").unbind("click").click(function() {
	                mainCalendar.prepareDetailPage();
	                $("#main_page").hide();
	                $("#createSchTB").show();
	            });
                $(".prevBtn").hide();
                $(".nextBtn").hide();
            });
            $("#cal_header .todoBtn").click(function(){
            	viewController.viewSwitcher.showTodoView();
            	$("#cal_header .todayBtn").hide();
            	$(".prevBtn").hide();
                $(".nextBtn").hide();
                //重新绑定创建按钮事件
                $("#cal_header .createBtn").unbind("click").click(todoHandler.todoCreateClick);
            });
            
            $("#cal_header .createBtn").click( function() {
                mainCalendar.prepareDetailPage();
                $("#main_page").hide();
                $("#createSchTB").show();
            });
            
            $("#listcontainer").scroll(function(){
            	$(".schedule_wrapper").each(function(){
            		if($(this).offset().top <= $("#listcontainer").offset().top){
            			$(".dateNavInfo").text($(this).attr("month"));
            		}
            	});
            });
            $(window).resize( function() {
                pageControl.autoAdaption();
                gridView.drawSchedule();
            });
            
            $("#createCalendarBtn").click(function(e){
            	render.removePopupMenu();
        		var off = $("#createCalendarBtn").offset();
        		if(isOutlookSyncEnabled == false) {
        			render.popupMenu(off.left,off.top,$("#googleAccount").val());	
        		} else {
        			// Outlook Sync
            		render.popupMenuV2(off.left,off.top,$("#googleAccount").val(), $("#outlookAccount").val());	
        		}
        		if($("#syncGoogleLink").length>0){
        			$("#syncGoogleLink").click(function(){
        				render.cover();
        				render.googleSync();
        				communicator.syncGoogleOnWeb(function(result){
        					if(result.state=="ok"){
        						window.location=window.location;
        					}else{
        						render.removeCover();
        						render.removeGoogleSync();
        						render.showTip("同步出错！");
        						render.hideTip();
        					}
        				});
        			});
        			$("#unbindGoogleLink").click(function(){
        				render.cover();
        				render.googleSync();
        				communicator.removeGoogleBinding(function(result){
        					window.location=window.location;
        				});
        			})
        		}else{
        			$("#bindGoogleLink").click(function(){
        				render.cover();
        				var win = render.popupWin("http://when.365rili.com/google-account-bind-web.do","",400,530);
        				intervalId = setInterval(function(){
							if(win.closed==true){
								clearInterval(intervalId);
								window.location.reload();
							}
						},100);
						$(window).bind("unload",function(){
							win.close();
						});
        			});
        		}
        		// Outlook Sync
        		if($("#syncOutlookLink").length>0){
        			$("#syncOutlookLink").click(function(){
        				render.cover();
        				render.googleSync();
        				communicator.syncOutlookOnWeb($("#outlookAccount").val(),function(result){
        					if(result.state=="ok"){
        						window.location=window.location;
        					}else{
        						render.removeCover();
        						render.removeGoogleSync();
        						render.showTip("同步出错！");
        						render.hideTip();
        					}
        				});
        			});
        			$("#unbindOutlookLink").click(function(){
        				render.cover();
        				render.googleSync();
        				communicator.removeOutlookBinding($("#outlookAccount").val(),function(result){
        					if(result.state=="ok"){
        						window.location=window.location;
        					}else{
        						render.removeCover();
        						render.removeGoogleSync();
        						render.showTip("解除绑定出错！");
        						render.hideTip();
        					}
        				});
        			});
        		}
        		
        		$("#moreCal_popupMenu a").click(function(){
        			$("#moreCal_popupMenu").hide();
        		});
        		utils.mousedown_hide_ele("moreCal_popupMenu","rili365");
            });
            $("#calendarList li").live("mouseover",function(){
            	var data_domain = $(this).find(".calPart").attr("data_domain");
            	if(data_domain != "google" && data_domain != "exchange"){
            		$(this).find(".editCalendarBtn").show();
            	}
            });
            $("#calendarList li").live("mouseout",function(){
            	$(this).find(".editCalendarBtn").hide();
            });
            $(".editCalendarBtn").live("click",function(){
            	var calendarId = $(this).parent().attr("cid");
            	window.location='/main/manager.do?calendarId='+calendarId;
            });
        },
        /*
         * 控件上按钮以外的其他事件
         */
        addGridEvent : function() {
            $("#gridcontainer").click( function(ev) {
                var a = ev.target||ev.srcElement;
                // 点击背景格子,触发添加日程事件
                if($(a).attr("dayNav")) {
                	// TODO 弹出框的位置
                    dialogHandle.initCreateDialog($(a).attr("dayNav"));
                    var position = $(a).offset();
					var containerPos = $("#gridcontainer").offset();
					// alert(containerPos.top+"--"+position.top+"--"+$("#gridcontainer").height()+"--"+(position.top-containerPos.top+$("#createSchDialog").height())+"--"+$("#createSchDialog").height());
					var con_w = $("#gridcontainer").width();
					var con_h = $("#gridcontainer").height();
					var left = "0px";
					var top = "0px";
					var d_h = $("#createSchDialog").height();
					if((position.left-containerPos.left+302)<con_w)
							left =  position.left + 10 + "px";
					else
						   left =  position.left - 302+80 + "px";
					if((position.top-containerPos.top+d_h)<con_h)
							top =  position.top + 10 + "px";
					else
						   top =  position.top - d_h+20 + "px";
					// alert(top);
                    var schDialog = document.getElementById("createSchDialog");
                    schDialog.style.top = top;
                    schDialog.style.left =left;
                    calEvent.addDlgEvent.addCreateSchDlgEvent($(a).attr('dayNav'));
                    // 赵：增加日历选择列表
                    var calendars = new StringBuffer();
                    var cal_map = calendarHandler.cldMap;
                    var cal_map_arr = [];
                    for(var cld_id in cal_map) {
                        if(cal_map[cld_id].access_type > 1) {
                            cal_map_arr.push(cal_map[cld_id]);
                        }
                    }
                    cal_map_arr.sort(function(a, b) {
                        if(a.is_primary == 'true') return -1;
                        if(b.is_primary == 'true') return 1;
                        return (b.access_type - a.access_type);
                    });
                    for(var i = 0; i < cal_map_arr.length; ++i) {
                        calendars.append('<option value="').append(cal_map_arr[i].id).append('">').append(cal_map_arr[i].title).append('</option>');
                    }
                    $('#dlg_calendar_id').html(calendars.toString());
                    // 赵：增加日历选择列表(结束)
                    
                    $("#createSchDialog").show();
                    utils.mousedown_hide_ele("createSchDialog","rili365");
                    return;
                }
				// 杨：解决单击
				if($(a).attr("dayNav_m"))
				{
					dialogHandle.initCreateDialog($(a).attr("dayNav_m"));
                    var position = $(a).parent().offset();
                   
                    var containerPos = $("#gridcontainer").offset();
					// alert(containerPos.left+"--"+position.left+"--"+$("#gridcontainer").width()+"--"+(position.left-containerPos.left+302));
					var con_w = $("#gridcontainer").width();
					var con_h = $("#gridcontainer").height();
					var left = "0px";
					var top = "0px";
					var d_h = $("#createSchDialog").height();
					if((position.left-containerPos.left+302)<con_w)
							left =  position.left + 10 + "px";
					else
						   left =  position.left - 302+80 + "px";
					if((position.top-containerPos.top+d_h)<con_h)
							top =  position.top + 10 + "px";
					else
						   top =  position.top - d_h+20 + "px";
                    var schDialog = document.getElementById("createSchDialog");
                    schDialog.style.top = top;
                    schDialog.style.left =left;
                    calEvent.addDlgEvent.addCreateSchDlgEvent($(a).attr('dayNav_m'));
                    $("#createSchDialog").show();
                    utils.mousedown_hide_ele("createSchDialog","rili365");
                    return;
				}
                // 点击"另外x",显示当日全部日程
                if($(a).attr("dayInfo")) {
					
                    var date = $(a).attr("dayInfo");
                    dialogHandle.initShowAllDialog(date, DataHandler.resultData[date]);
                    var position = utils.getOffsetXY($("table").filter(".gridBgTable").find('div[daynav=' + $(a).attr("dayInfo").substring(1) + ']')[0]);
                    // alert(date);
                    var showAllSchDialog = document.getElementById("showAllSchDialog");
                    showAllSchDialog.style.top = position.y+"px";
                    showAllSchDialog.style.left = position.x+"px";
                    $("#showAllSchDialog").show();
                    utils.mousedown_hide_ele("showAllSchDialog", "rili365","showSchBriefDialog");
                    return;
                }
                // 点击日程,显示日程简介
                if($(a).attr("schid")) {
                    var mousePos = utils.getMousePosition(ev);
                    dialogHandle.initShowSchDetail(DataHandler.resultDataById[$(a).attr("schid")]);
                    var showSchDetail = document.getElementById("showSchBriefDialog");
                    var schPos = utils.getOffsetXY(a);
                    var gridContainer = document.getElementById("gridcontainer");
                    var tablePos = utils.getOffsetXY(gridContainer);
                    var schH = 18, diaH = 100, diaW = 300; // 日程条的高度, 对话框的高度,
                                                            // 对话框的宽度
                    if(schPos.y + schH + diaH > tablePos.y + $(gridContainer).height()) {
                        showSchDetail.style.top = (schPos.y - diaH) + "px";
                    } else {
                        showSchDetail.style.top = (schPos.y + schH) + "px";
                    }
                    if(mousePos.x + diaW/2 > tablePos.x + $(gridContainer).width()) {
                        showSchDetail.style.left = (tablePos.x + $(gridContainer).width() - diaW) + "px";
                    } else if(mousePos.x - diaW/2 < tablePos.x) {
                        showSchDetail.style.left = tablePos.x + "px";
                    } else {
                        showSchDetail.style.left = (mousePos.x - diaW/2) + "px";
                    }
                    $("#showSchBriefDialog").show();
                    calEvent.addDlgEvent.addSchBriefDlgEvent($(a).attr("schid"));
                    utils.mousedown_hide_ele("showSchBriefDialog", "rili365");
                    return;
                }
            });
            /*
             * $("#gridcontainer").mousedown(function(ev){
             * //alert($(this).attr("daynav")); var a =
             * ev.target||ev.srcElement; if($(a).attr("dayNav")) {
             * $("#createSchDialog").hide(); var position =
             * utils.getOffsetXY(a);
             * $("#drag-lasso-container>.drag-lasso").css({"height":$(a).height()+"px","width":$(a).width()+"px","top":position.y+"px","left":position.x+"px"});
             * $("#drag-lasso-container").show();
             *  } });
             */
        },
        /*
         * 控件上的dialog中按钮等事件的管理
         */
        addDlgEvent:  {
            /**
             * 创建日程dlg上的"创建日程"
             */
            addCreateSchDlgEvent: function(dayNav) {
                $("#dlg_createSch").click(function() {
                    var sch = {};
                    sch.schTitle = $('#dlg_title').val();
                    if(sch.schTitle.length > 1000){
                    	alert("日程字数不能超过1000");
                    	return false;
                    }
                    
                    sch.alldayEvent = $('#dlg_all_day').prop('checked');
                    if(sch.alldayEvent) {
                        sch.startTime = dayNav + ' ' + '09:00:00';
                    } else {
                        sch.startTime = dayNav + ' ' + $('#dlg_from_time_hour').val().leftpad(2) +
                                        ':' + $('#dlg_from_time_min').val().leftpad(2) + ":00";
                    }
                    sch['timeZone'] = - (new Date()).getTimezoneOffset() / 60;
                    sch.calendarId = $("#dlg_calendar_id").val();
                    // dialog内添加的都是简单日程(不重复,不跨天)
                    var dateScope = cal365.date.add(cal365.templates.api_date(sch.startTime), 1, 'day');

                    sch.updateV2Origin = '9';

                    $.ajax({
                    	type: 'post',
                    	data: sch,
                    	url: '/schedule/updateV2.do',
                    	success: function(result) {
                    		$('#createSchDialog').hide();
                    		if(result.state == 'ok') {
                    			var cldObj = result.cid;
                    			if(result.schlist) {
                    				DataHandler.formatSchData(result.schlist, dateScope);	
                    			}
                    			var notice = "您的一些小组日历成员还没有注册365日历，要通过如下方式通知TA们这条日程：";
                    			var shouldNotice = false;
                    			if(result.emailList) {
                    				notice +="发送邮件提醒给("+ result.emailList + ")";
                    				if(result.weiboList) {
                    					notice += "，"
                    				}
                    				shouldNotice = true;
                    			}
                    			if(result.weiboList) {
                    				notice += "发送微博提醒" + result.weiboList;
                    				shouldNotice = true;
                    			}
                    			if(shouldNotice) {
                    				var para = {};
                    				para.cid = result.cid;
                    				para.scheduleId = result.schlist[0].id;
                    				if(confirm(notice)){
                    					$.ajax({
                    						type: 'post',
                    						data: para,
                    						url: '/schedule/sendNotice.do',
                    						success: function(result) {
                    							if(result.state == "ok") {
                    								alert("发送提醒成功！");
                    							} else {
                    								alert("发送提醒失败！");
                    							}
                    						},
                    						dataType: 'json'
                    					});
                    				}
                    			}
                    		}
                    		gridView.drawSchedule();
                    	},
                    	dataType: 'json'                        
                    });
                });
                $('#dlg_toDetailSch').click(function() {
                    var info = {}; // .allday .start_time .title .flag
                    info.allday = $('#dlg_all_day').prop('checked');
                    info.start_time = cal365.templates.api_date(dayNav);
                    if(!info.allday) {
                        info.start_time.setHours($('#dlg_from_time_hour').val());
                        info.start_time.setMinutes($('#dlg_from_time_min').val());
                    }
                    info.title = $('#dlg_title').val();
                    info.flag = true;
                    mainCalendar.prepareDetailPage(info);
                    utils.hideDialog(['createSchDialog']);
                    $("#main_page").hide();
                    $("#createSchTB").show();
                });
                $('#dlg_all_day').change(function() {
                    if($(this).prop('checked')) {
                        $('#dlg_from_time').hide();
                    } else {
                        $('#dlg_from_time_hour').val(9);
                        $('#dlg_from_time_min').val(0);
                        $('#dlg_from_time').show();
                    }
                });
                $('#createDlgClose').click(function() {
                    utils.hideDialog(['createSchDialog']);
                });
            },
            
            /*
             * 日程简介dialog上的修改按钮
             */
            addSchBriefDlgEvent: function(schId) {
                $('#dlg_modify').click(function() {
                    $.ajax({
                        url: '/schedule/getRawScheduleById.do',
                        type:'post',
                        data:{scheduleId: schId},
                        success: function(result) {
                            mainCalendar.prepareDetailPage(result);
                            utils.hideDialog(['showSchBriefDialog','showAllSchDialog']);
                            $("#main_page").hide();
                            $("#createSchTB").show();
                        },
                        dataType: 'json'
                    });
                    // 为提醒设置赋值
                    $.ajax({
                        url: '/schedule/getScheduleAlermById.do',
                        type:'post',
                        data:{scheduleId: schId},
                        success: function(result) {
                        	$("#det_before_minutes").val(result);
                        },
                        dataType: 'json'
                    });
                });
                $('#dlg_del').click(function() {
                	if(confirm('确定删除该日程?')) {
	                    $.get(
	                        '/schedule/delete.do?scheduleId=' + schId,
	                        function() {
	                            DataHandler.delSchById(schId);
	                            utils.hideDialog(['showSchBriefDialog','showAllSchDialog']);
	                            gridView.drawSchedule();
	                        }
	                    );
                	}
                });
				$('#detailBtn').click(function() {
                	utils.hideDialog(['showSchBriefDialog']);
                });
            }
        }
    }; // EOF calEvent
})(jQuery);


/* ========================主页面入口====================== */
var mainCalendar = {
    init : function() {
        cal365.init_templates();
        record.nav_date = /* cal365.templates.api_date("2009-07-01 00:00:00") */new Date();
		// TODO：如果用户登录了，则取日历信息
		
        $("#gridcontainer").initCal365(record.nav_date);
		calendarHandler.getCalendarInfo($("#gridcontainer").drawSch);
		this.initDetailPage();
    },
    /*
     * NOTE:initDetailPage,prepareDetailPage,gatherDetailPageData三个函数
     * 中注释掉的代码是为跨天日程设计的,关闭这些注释以及calendar.jsp中有关结 束时间的代码的注释可实现阶段日程的添加
     */
    // 对详情页面的静态内容进行初始化,只在载入页面时执行一次,避免重复绑定事件
    initDetailPage: function() {
        $('#det_backToCalendar').click(function() {
            $("#createSchTB").hide();
            $("#main_page").show();
            $(window).trigger('resize');
        });
        
        $(".datepicker").datepicker({
            dateFormat: 'yy-mm-dd',
            showButtonPanel:true,
            showMonthAfterYear:true,
            changeYear:true,
            currentText:'回本月',
            yearRange:'1900:2099'
        });
        
        $('#det_calendar_type').change(function() {
            var s_time = cal365.templates.api_date($('#det_start_time_date').val());
            if(!$('#det_allday').prop('checked')) {
                s_time.setHours($('#det_from_time_hour').val());
                s_time.setMinutes($('#det_from_time_min').val());
            }
// var e_time = new Date(s_time.getTime() + $('#det_duration').val()*1000);
            if($(this).prop('checked')) {
                var s_l_info = new Lunar(s_time);
                $('#lunar_from_year').val(s_l_info.year);
                if(s_l_info.isLeap) {
                    $('#lunar_from_month').val((s_l_info.month-1)+'leap');
                } else {
                    $('#lunar_from_month').val(s_l_info.month-1);
                }
                $('#lunar_from_date').val(s_l_info.day);
// var e_l_info = new Lunar(e_time);
// $('#lunar_to_year').val(e_l_info.year);
// if(e_l_info.isLeap) {
// $('#lunar_to_month').val((e_l_info.month-1)+'leap');
// } else {
// $('#lunar_to_month').val(e_l_info.month-1);
// }
// $('#lunar_to_date').val(e_l_info.day);
                $('.solarTime').hide();
                $('.lunarTime').show();
                $('#det_repeat_type').html('<option value="0">不重复</option><option value="29">农历每月</option><option value="354">农历每年</option>');
                $('#det_repeat_type').val(0).trigger('change');
            } else {
                $('#det_from_date').val($('#det_start_time_date').val());
// $('#det_to_date').val(cal365.templates.load_format(e_time));
                $('.lunarTime').hide();
                $('.solarTime').show();
                $('#det_repeat_type').html('<option value="0">不重复</option><option value="1">每天</option><option value="7">每周</option><option value="31">每月</option><option value="365">每年</option>');
                $('#det_repeat_type').val(0).trigger('change');
            }
        });
        function setTimePeriod() {
            // 设置日程开始时间(公历表示)
            if($('#det_calendar_type').prop('checked')) {
                var lyear = $('#lunar_from_year').val();
                var lmonth = $('#lunar_from_month').val();
                var isLeap = false;
                if(lmonth.indexOf('leap') != -1) {
                    isLeap = true;
                }
                lmonth = parseInt(lmonth) + 1;
                var ldate = $('#lunar_from_date').val();
                var solar_date = getSolarDate(lyear, lmonth, ldate, isLeap);
                $('#det_start_time_date').val(cal365.templates.load_format(solar_date));
            } else {
                $('#det_start_time_date').val($('#det_from_date').val());
            }
            // 设置日程结束时间
// var s_time = cal365.templates.api_date($('#det_start_time_date').val());
// s_time.setHours($('#det_from_time_hour').val());
// s_time.setMinutes($('#det_from_time_min').val());
// var e_time = new Date(s_time.getTime() + $('#det_duration').val()*1000);
// $('#det_to_time_hour').val(e_time.getHours());
// $('#det_to_time_min').val(e_time.getMinutes());
// if($('#det_calendar_type').prop('checked')) {
// var lunar_info = new Lunar(e_time);
// $('#lunar_to_year').val(lunar_info.year).trigger('changeLunarYear');
// if(lunar_info.isLeap) {
// $('#lunar_to_month').val((lunar_info.month-1)+'leap');
// } else {
// $('#lunar_to_month').val(lunar_info.month-1);
// }
// $('#lunar_to_date').val(lunar_info.day);
// } else {
// $('#det_to_date').val(cal365.templates.load_format(e_time));
// }
        }
        
// function setDuration() {
// var s_time = cal365.templates.api_date($('#det_start_time_date').val());
// var e_time = cal365.templates.api_date($('#det_to_date').val());
// if($('#det_calendar_type').prop('checked')) {
// var lyear = $('#lunar_to_year').val();
// var lmonth = $('#lunar_to_month').val();
// var isLeap = false;
// if(lmonth.indexOf('leap') != -1) {
// isLeap = true;
// }
// lmonth = parseInt(lmonth)+1;
// var ldate = $('#lunar_to_date').val();
// e_time = getSolarDate(lyear, lmonth, ldate, isLeap);
// }
// if(!$('#det_allday').prop('checked')) {
// s_time.setHours($('#det_from_time_hour').val());
// s_time.setMinutes($('#det_from_time_min').val());
// e_time.setHours($('#det_to_time_hour').val());
// e_time.setMinutes($('#det_to_time_min').val());
// }
// var duration = Math.round((e_time.getTime() - s_time.getTime()) / 1000);
// if(duration < 0) {
// //TODO TODO 确保结束时间晚于开始时间
// duration = 0;
// }
// $('#det_duration').val(duration);
// }
        
        $('#lunar_from_year').change(function() {
            var lunar_year = $(this).val();
            var leap_month = leapMonth(lunar_year);
            if(0 != leap_month) {
                $('#lunar_from_month option[value=' + (leap_month-1) + ']')
                    .after('<option value="' + (leap_month-1) + 'leap">闰' + cmonthName[leap_month-1] + '月</option>');
            } else {
                $('#lunar_from_month option[value*=leap]').remove();
            }
            $('#lunar_from_month').trigger('change');
        });
        $('#lunar_from_month').change(function() {
            var month_days = monthDays($('#lunar_from_year').val(), parseInt($(this).val()));
            if(29 == month_days) {
                $('#lunar_from_date option:last-child').hide();
            } else {
                $('#lunar_from_date option:last-child').show();
            }
            $('#lunar_from_date').trigger('change');
        });
        $('#det_from_date,#lunar_from_date').change(function() {
            setTimePeriod();
            $('#det_repeat_type').trigger('change');
        });
        $('#det_from_time_hour,#det_from_time_min').change(function() {
            setTimePeriod();
        });
// $('#det_to_time_hour,#det_to_time_min').change(function() {
// setDuration();
// });
// $('#lunar_to_year').bind('changeLunarYear', function() {
// var lunar_year = $(this).val();
// var leap_month = leapMonth(lunar_year);
// if(0 != leap_month) {
// $('#lunar_to_month option[value=' + (leap_month-1) + ']')
// .after('<option value="' + (leap_month-1) + 'leap">闰' +
// cmonthName[leap_month-1] + '月</option>');
// } else {
// $('#lunar_to_month option[value*=leap]').remove();
// }
// });
// $('#lunar_to_month').bind('changeLunarMonth', function() {
// var month_days = monthDays($('#lunar_to_year').val(), $(this).val());
// if(29 == month_days) {
// $('#lunar_to_date option:last-child').hide();
// } else {
// $('#lunar_to_date option:last-child').show();
// }
// });
// $('#lunar_to_year').change(function() {
// $(this).trigger('changeLunarYear');
// $('#lunar_to_month').trigger('change');
// });
// $('#lunar_to_month').change(function() {
// $(this).trigger('changeLunarMonth');
// $('#lunar_to_date').trigger('change');
// });
// $('#lunar_to_date,#det_to_date').change(function() {
// setDuration();
// });
        $('input:radio[name=repeat_by_month_type][value=0]').prop('checked', true);
        // TODO 开始结束时间的相关判断
        $('#det_from_date').change(function() {
            $('#det_start_time_date').val($(this).val());
        });
        $('#det_repeat_type').change(function() {
            $('#det_repeat_content').show();
            $('#det_repeat_freq option')[0].selected = true;
            $('#det_repeat_freq').trigger('change');
            switch($(this).val()) {
            case '1': 
                $('#repeat_freq_unit,#abs_repeat_type span:last-child').text('天');
                $('#abs_repeat_when').text('');
                $('.repeat_by_week').hide();
                $('.repeat_by_month').hide();
                break;
            case '7':
                $('#repeat_freq_unit,#abs_repeat_type span:last-child').text('周');
                $('input:checkbox[name=repeat_by_week_day]').trigger('change');
                $('.repeat_by_week').show();
                $('.repeat_by_month').hide();
                break;
            case '29':
                $('#repeat_freq_unit,#abs_repeat_type span:last-child').text('月');
                $('.repeat_by_week,.repeat_by_month').hide();
                var s_date = cal365.templates.api_date($('#det_start_time_date').val());
                var lunar_day = (new Lunar(s_date)).day;
                $('#abs_repeat_when').text(cDay(lunar_day));
                break;
            case '31':
                $('#repeat_freq_unit,#abs_repeat_type span:last-child').text('月');
                var tmp = $('input:radio[name=repeat_by_month_type]:checked').val();
                $('input:radio[name=repeat_by_month_type][value='+tmp+']').trigger('change');
                $('.repeat_by_month').show();
                $('.repeat_by_week').hide();
                break;
            case '354':
                $('#repeat_freq_unit,#abs_repeat_type span:last-child').text('年');
                $('.repeat_by_week,.repeat_by_month').hide();
                var s_date = cal365.templates.api_date($('#det_start_time_date').val());
                var lunar_date = new Lunar(s_date);
                $('#abs_repeat_when').text(cmonthName[lunar_date.month-1] + '月' + cDay(lunar_date.day));
                break;
            case '365':
            	var d = cal365.templates.api_date($('#det_from_date').val());
                $('#repeat_freq_unit,#abs_repeat_type span:last-child').text('年');
                $('#abs_repeat_when').text('在' + (d.getMonth()+1) + '月' + d.getDate() + '日');
                $('.repeat_by_week').hide();
                $('.repeat_by_month').hide();
                break;
            default:
                $('#det_repeat_content').hide();
                break;
            }
        });

        $('#det_allday').change(function() {
            if($(this).prop('checked')) {
// setDuration();
                $('.det_time_part').hide();
            } else {
// setDuration();
                $('.det_time_part').show();
            }
        });
        
        $('input:radio[name=end]').change(function() {
            $('input:radio[name=end]').each(function() {
                if($(this).prop('checked')) {
                    $(this).parent().parent().children('input:text').prop('disabled', false);
                    if(1 == $(this).val()) {
                    	$('#det_repeat_count').trigger('keyup').focus();
                    } else if(2 == $(this).val()) {
                        $('#det_repeat_stop_time').trigger('change');
                    } else {
                        $('#abs_repeat_end').text('');
                    }
                } else {
                    $(this).parent().parent().children('input:text').prop('disabled', true);
                }
            });
        });
        // TODO 验证重复结束日期是否有效
        $('#det_repeat_stop_time').change(function() {
            if($(this).val().length < 10) {
                var d = cal365.templates.api_date($('#det_from_date').val());
                var e_d = cal365.date.add(d, 20, 'day'); // XXX
                                                            // 默认重复结束日期:开始时间之后的20天
                $('#det_repeat_stop_time').val(cal365.templates.load_format(e_d));
            }
            $('#abs_repeat_end').text('直到' +　$(this).val());
        })
        .blur(function() {
            $(this).trigger('change');
        });
        
        $('#det_repeat_count')
        .keyup(function(e) {
            if(!(e.keyCode > 36 && e.keyCode < 41)) { //对方向键不做处理
                $(this).val($(this).val().replace(/\D/gi, '').substring(0,3));
                var times = $(this).val();
                if(times.length > 0) {
                    times = parseInt(times, 10);
                    $(this).val(times);
                    $('#abs_repeat_end').text($(this).val() + ' 次后结束');
                } else {
                    $('#abs_repeat_end').text('');
                }
            }
        })
        .blur(function() {
            var times = parseInt($(this).val());
            if(isNaN(times)) {
                $(this).val(20).trigger('keyup');
            }
        });
        $('#det_repeat_freq').change(function() {
            if('1' != $(this).val()) {
                $('#abs_repeat_type span:first-child').text('隔' +　($(this).val()));
            } else {
            	$('#abs_repeat_type span:first-child').text('');
            }
        });
        $('input:checkbox[name=repeat_by_week_day]').change(function() {
            var abs_repeat_days = [];
            var repeat_days_brief = [];
            $('input:checkbox[name=repeat_by_week_day]').each(function() {
            	if($(this).prop('checked')) {
            		repeat_days_brief.push(cal365.date.getDayNameBrief(parseInt($(this).val())));
            		abs_repeat_days.push(cal365.date.numToWeek(parseInt($(this).val())));
            	}
            });
            // 若所有checkbox都未勾选,则为开始日期的周几
            if(abs_repeat_days.length > 0) {
            	$('#abs_repeat_when').text('周' + abs_repeat_days.join("、"));
            	$('#det_repeat_when').val(repeat_days_brief.join(':'));
            } else {
            	var d = cal365.templates.api_date($('#det_from_date').val()).getDay();
            	$('#det_repeat_when').val(cal365.date.getDayNameBrief(d));
            	$('#abs_repeat_when').text('周' + cal365.date.numToWeek(d));
            }
        });
        // 按月重复时摘要和数据的处理(若选择一周的某天且该周为最后一周时,传-1)
        $('input:radio[name=repeat_by_month_type]').change(function() {
        	var d = cal365.templates.api_date($('#det_from_date').val());
        	if(0 == $(this).val()) {
        		$('#abs_repeat_when').text('在第 ' + d.getDate() + ' 天');
        	} else if(1 == $(this).val()) {
// 紧跟着的注释掉的代码为"第x周周y"的情况,当前使用的是"第x个周y"的情况
// var week_of_month = cal365.date.getWeekOfMonth(d);
// var total_week_of_month = CalUtil.monthViewInfo(d,
// options.start_on_monday).row;
// if(week_of_month == total_week_of_month) {
// $('#abs_repeat_when').text('在最后一周 周' + cal365.date.numToWeek(d.getDay()));
// $('#det_repeat_when').val('-1' + cal365.date.getDayNameBrief(d.getDay()));
// } else {
// $('#abs_repeat_when').text('在第' + cal365.date.getChinaNum(week_of_month) + '周
// 周' + cal365.date.numToWeek(d.getDay()));
// }
        	    // NOTE 当前不考虑最后一周的情况,全部为正数第几周;若需要最后一周的情况,将本行至END_NOTE之间的注释代码打开
        	    var week_of_month = Math.ceil(d.getDate() / 7);
// var tmp_d = cal365.date.add(d, 1, 'week');
// if(tmp_d.getMonth() != d.getMonth()) {
// $('#abs_repeat_when').text('在最后一个周' + cal365.date.numToWeek(d.getDay()));
// $('#det_repeat_when').val('-1' + cal365.date.getDayNameBrief(d.getDay()));
// } else {
                    $('#abs_repeat_when').text('在第' + cal365.date.getChinaNum(week_of_month) + '个周' +　cal365.date.numToWeek(d.getDay()));
                    $('#det_repeat_when').val(week_of_month + cal365.date.getDayNameBrief(d.getDay()));
// }
                // END_NOTE
        	}
        });
        // 关联URL设置
        $('#det_linked_url_ck').change(function() {
            if($(this).prop('checked')) {
                $('#det_linked_url').removeClass('hidden');
            } else {
                $('#det_linked_url').addClass('hidden');
            }
        });
    },
    /*
     * 每次切换到详情页面时对页面的初始化
     */
    prepareDetailPage: function(result_data) {
    	//alert(result_data.title);
        // XXX 填充用户日历列表(放在此处是否合适?) TODO:此处也应该对日历进行排序
        var calendars = new StringBuffer();
        var cal_map = calendarHandler.cldMap;
        var cal_map_arr = [];
        for(var cld_id in cal_map) {
        	if(cal_map[cld_id].access_type > 1) {
        	    cal_map_arr.push(cal_map[cld_id]);
        	}
        }
        cal_map_arr.sort(function(a, b) {
            if(a.is_primary == 'true') return -1;
            if(b.is_primary == 'true') return 1;
            return (b.access_type - a.access_type);
        });
        for(var i = 0; i < cal_map_arr.length; ++i) {
            calendars.append('<option value="').append(cal_map_arr[i].id).append('">').append(cal_map_arr[i].title).append('</option>');
        }
        $('#det_calendar_id').html(calendars.toString());
        // result_data非字符串说明是修改详情页面
        if(result_data && !result_data.flag) {
            function check_repeat_stop_type(v) {
                $('input:radio[name=end]').each(function() {
                    if($(this).val() == v) {
                    	$(this).prop('checked', true).trigger('change');
                        $(this).parent().siblings('input:text').prop('disabled', false);
                        if(1 == v) {
                            $('#det_repeat_count').val(result_data.repeatCount).trigger('keyup');
                        } else if(2 == v) {
                            $('#det_repeat_stop_time').val(cal365.templates.load_format(new Date(result_data.repeatStopTime))).trigger('change');
                        }
                    } else {
                        $(this).prop('checked', false);
                        $(this).parent().siblings('input:text').prop('disabled', true);
                    }
                });
            }
            function config_repeat_type() {
                $('#det_repeat_freq').val(result_data.repeatFrequency).trigger('change');
                if(null != result_data.repeatStopTime) {
                    check_repeat_stop_type(2);
                } else if(0 != result_data.repeatCount) {
                    check_repeat_stop_type(1);
                } else {
                    check_repeat_stop_type(0);
                }
            }
            $('#det_desc').val(result_data.title);
            var start_time = new Date(result_data.startTime);
// var end_time = new Date(result_data.startTime + 1000*result_data.duration);
            $('#det_start_time_date').val(cal365.templates.load_format(start_time));
            $('#det_duration').val(result_data.duration);
            $('#det_from_date').val(cal365.templates.load_format(start_time));
// $('#det_to_date').val(cal365.templates.load_format(end_time));
            $('#det_from_time_hour').val(start_time.getHours());
            $('#det_from_time_min').val(start_time.getMinutes());
// $('#det_to_time_hour').val(end_time.getHours());
// $('#det_to_time_min').val(end_time.getMinutes());
            $('#det_calendar_type').prop('checked', ('L' == result_data.calendarType)).trigger('change');
            $('#det_allday').prop('checked', result_data.allDayEvent).trigger('change');
            $('#det_calendar_id').val(result_data.calendarId);
            if(result_data.url != null && result_data.url != '' ) {
            	$('#det_linked_url_ck').prop('checked', true).trigger('change');
            	$('#det_linked_url').val(result_data.url);
            } else {
            	$('#det_linked_url_ck').prop('checked', false).trigger('change');
            	$('#det_linked_url').val('');
            }
            $('#det_repeat_type').val(result_data.repeatType).trigger('change');
            if(0 != result_data.repeatType) {
                config_repeat_type();
            } else {
                $('input:radio[name=end][value=0]').prop('checked',true).trigger('change');
            }
            if(7 == result_data.repeatType) {
                $('#det_repeat_when').val(result_data.repeatDay);
                $('input:checkbox[name=repeat_by_week_day]').each(function() {
                    $(this).prop('checked', false);
                });
                var repeatDayArray = result_data.repeatDay.split(':');
                for(var i = 0; i < repeatDayArray.length; ++i) {
                	$('input:checkbox[name=repeat_by_week_day][value=' + cal365.date.daynameToIndex(repeatDayArray[i]) + ']').prop('checked', true);
                }
                $('input:checkbox[name=repeat_by_week_day]').trigger('change');
            } else if(31 == result_data.repeatType) {
                if(null != result_data.repeatMonthDay) {// 一月的某天
                	$('input:radio[name=repeat_by_month_type][value=0]').prop('checked', true).trigger('change');
                } else if(null != result_data.repeatDay) {// 一周的某天
                	$('input:radio[name=repeat_by_month_type][value=1]').prop('checked', true).trigger('change');
                }
            }
            $('#det_Btns').html('<span style="position:absolute;right:30px;top:5px;"><input style="margin-right:20px;" type="button" id="det_modSch" value="保 存"><input style="margin-right:20px;" id="det_discardMod" type="button" value="放 弃"><input style="margin-right:20px;" id="det_delSch" type="button" value="删 除"></span>');
            
            $('#det_modSch').click( function() {
            	var param = mainCalendar.gatherDetailPageData();
            	if(param['schTitle'].length > 1000){
            		alert("日程字数不能超过1000")
            		return false;
            	}

                var postData = $.extend({}, param, {'scheduleId':result_data.id});
                postData.updateV2Origin = '10';

                $.ajax({
                    url:'/schedule/updateV2.do',
                    type:'post',
                    data: postData,
                    dataType:'json',
                    success: function(result) {
            			if(result.state == 'ok') {
            				var cldObj = result.cid;
            				if(result.schlist) {
            					DataHandler.delSchById(result_data.id);
            					DataHandler.updateSch(result.schlist,DataHandler.cachedData.to);	
            				}
            				var notice = "您的一些小组日历成员还没有注册365日历，要通过如下方式通知TA们这条日程：";
            				var shouldNotice = false;
            				if(result.emailList) {
            					notice +="发送邮件提醒给("+ result.emailList + ")";
            					if(result.weiboList) {
            						notice += "，"
            					}
            					shouldNotice = true;
            				}
            				if(result.weiboList) {
            					notice += "发送微博提醒" + result.weiboList;
            					shouldNotice = true;
            				}
            				if(shouldNotice) {
            					var para = {};
            					para.cid = result.cid;
            					para.scheduleId = result.schlist[0].id;
            					if(confirm(notice)){
            						$.ajax({
            							type: 'post',
            							data: para,
            							url: '/schedule/sendNotice.do',
            							success: function(result) {
            								if(result.state == "ok") {
            									alert("发送提醒成功！");
            								} else {
            									alert("发送提醒失败！");
            								}
            							},
            							dataType: 'json'
            						});
            					}
            				}
            			}
            			$('#createSchTB').hide();
            			$('#main_page').show();
            			commonFunction.showMonthSch(); 
                    }
                });
            });
            $('#det_discardMod').click( function() {
                $('#det_desc').val('');
                $("#createSchTB").hide();
                $("#main_page").show();
                $(window).trigger('resize');
            });
            $('#det_delSch').click( function() {
            	if(confirm('确定删除该日程?')) {
	                $.ajax({
	                    url: '/schedule/delete.do',
	                    type: 'post',
	                    data: {scheduleId : result_data.id},
	                    success: function() {
	                        DataHandler.delSchById(result_data.id);
	                        $('#createSchTB').hide();
	                        $('#main_page').show();
	                        commonFunction.showMonthSch();
	                    }
	                });
            	}
            });
        } else { // 添加日程
            // XXX 需要仔细初始化
            // 默认duration=0
            $('#det_duration').val(0);
            // 默认公历
            $('#det_calendar_type').prop('checked', false).trigger('change');
            if(!result_data) {
                $('#det_start_time_date').val(cal365.templates.load_format(new Date()));
                $('#det_from_date').val($('#det_start_time_date').val());
                $('#det_allday').prop('checked', true).trigger('change');
                $('#det_from_time_hour').val(9);
                $('#det_from_time_min').val(0).trigger('change');
                $('#det_desc').val('');
            } else {
                $('#det_start_time_date').val(cal365.templates.load_format(result_data.start_time));
                $('#det_from_date').val($('#det_start_time_date').val());
                $('#det_allday').prop('checked', result_data.allday).trigger('change');
                $('#det_from_time_hour').val(result_data.start_time.getHours());
                $('#det_from_time_min').val(result_data.start_time.getMinutes()).trigger('change');
                $('#det_desc').val(result_data.title);
            }
            // 默认不重复
            $('#det_repeat_type').val('0').trigger('change');
            // 默认重复结束日期:从不
            $('input:radio[name=end]').each(function() {
                $(this).prop('checked', false);
                $(this).siblings('input:text').prop('disabled', true);
            });
            $('input:radio[name=end][value=0]').prop('checked', true).trigger('change');
            $('#det_linked_url_ck').prop('checked', false).trigger('change');
            $('#det_linked_url').val('');
            $('#det_Btns').html('<span style="position:absolute;right:30px;top:5px;"><input style="margin-right:20px;" type="button" id="det_createSch" value="完 成"><input id="det_discard" type="button" value="放 弃"></span>');
            
            // 放弃按钮的事件
            $("#det_discard").click( function() {
                $("#createSchTB").hide();
                $("#main_page").show();
                $(window).trigger('resize');
            });
            // 创建日程按钮
            $('#det_createSch').click( function() {
            	var param = mainCalendar.gatherDetailPageData();
//            	alert(param['before_minutes']);
//            	alert(param['fromDate']);
            	if(param['schTitle'].length > 1000){
            		alert("日程字数不能超过1000")
            		return false;
            	}

                param.updateV2Origin = '11';

            	$.ajax({
            		url: '/schedule/updateV2.do', 
            		data: param,
            		type: 'post',
            		dataType: 'json',
            		success: function(result) {
            			if(result.state == 'ok') {
            				var cldObj = result.cid;
            				if(result.schlist) {
            					DataHandler.formatSchData(result.schlist, DataHandler.cachedData.to);
            				}
            				var notice = "您的一些小组日历成员还没有注册365日历，要通过如下方式通知TA们这条日程：";
            				var shouldNotice = false;
            				if(result.emailList) {
            					notice +="发送邮件提醒给("+ result.emailList + ")";
            					if(result.weiboList) {
            						notice += "，"
            					}
            					shouldNotice = true;
            				}
            				if(result.weiboList) {
            					notice += "发送微博提醒" + result.weiboList;
            					shouldNotice = true;
            				}
            				if(shouldNotice) {
            					var para = {};
            					para.cid = result.cid;
            					para.scheduleId = result.schlist[0].id;
            					if(confirm(notice)){
            						$.ajax({
            							type: 'post',
            							data: para,
            							url: '/schedule/sendNotice.do',
            							success: function(result) {
            								if(result.state == "ok") {
            									alert("发送提醒成功！");
            								} else {
            									alert("发送提醒失败！");
            								}
            							},
            							dataType: 'json'
            						});
            					}
            				}
            			}
            			$('#createSchTB').hide();
            			$('#main_page').show();
            			commonFunction.showMonthSch();
            		}
            	});
            });
        }
    },
    
    /*
     * 收集详情页面数据形成一个对象
     */
    gatherDetailPageData: function() {
        param = {};
        param['scheduleId'] = '';
        param['schTitle'] = $('#det_desc').val();
        param['alldayEvent'] = $('#det_allday').prop('checked');
        param['startTime'] = $('#det_start_time_date').val();
        var duration = $('#det_duration').val();
        param['duration'] = duration;
        if(param.alldayEvent) {
            param['startTime'] += ' 09:00:00'; // allday日程默认上午9点开始
        } else {
            var start_hour = $('#det_from_time_hour').val();
            var start_min = $('#det_from_time_min').val();
            param['startTime'] += ' ' + start_hour.leftpad(2) + ':' + start_min.leftpad(2) + ':00';
        }
        param['calendarId'] = $('#det_calendar_id').val();
        param['calendarType'] = ($('#det_calendar_type').prop('checked'))? 'L':'S';
        param['fromDate'] = $('#det_from_date').val();
        param['toDate'] = cal365.templates.load_format(DataHandler.cachedData.to);
        param['timeZone'] = - (new Date()).getTimezoneOffset() / 60;
        param['repeatFrequency'] = '';
        param['repeatCount'] = '';
        param['repeatStopTime'] = '';
        param['repeatMonth'] = '';
        param['repeatMonthDay'] = '';
        param['repeatDay'] = '';
        param['repeatType'] = parseInt($('#det_repeat_type').val());
        // 以下开始设置重复类型
        if(0 != param['repeatType']) {
            var start_time = cal365.templates.api_date(param['startTime']);
            param['repeatFrequency'] = parseInt($('#det_repeat_freq').val());
            var repeatEndType = $('input:radio[name=end]:checked').val();
            if(1 == repeatEndType) {
                var rep_ct = parseInt($('#det_repeat_count').val());
                if(rep_ct < 1) rep_ct = 1;
                param['repeatCount'] = rep_ct;
            } else if(2 == repeatEndType) {
                param['repeatStopTime'] = $('#det_repeat_stop_time').val() + ' 00:00:00';
            }
            switch (param['repeatType']) {
            case 1:
                break;
            case 7:
                param['repeatDay'] = $('#det_repeat_when').val();
                break;
            case 29:
                var lunar_info = new Lunar(start_time);
                param['repeatMonthDay'] = lunar_info.day;
                break;
            case 31:
                var repeatMonthType = $('input:radio[name=repeat_by_month_type]:checked').val();
                if(0 == repeatMonthType) {
                    param['repeatMonthDay'] = start_time.getDate();
                } else {
                    param['repeatDay'] = $('#det_repeat_when').val();
                }
                break;
            case 365:
                param['repeatMonth'] = start_time.getMonth();
                param['repeatMonthDay'] = start_time.getDate();
                break;
            case 354:
                var lunar_info = new Lunar(start_time);
                param['repeatMonth'] = lunar_info.month-1;
                param['repeatMonthDay'] = lunar_info.day;
                break;
            }
        }
        // 提前多少分钟提醒
        param['before_minutes'] = $('#det_before_minutes').val();
        // 关联url
        if($('#det_linked_url_ck').is(':checked')) {
        	param['linked_url'] = $('#det_linked_url').val();
        } else {
        	param['linked_url'] = "";
        }
        return param;
    },
    
    list_more: function(direction){
    	// 默认5天
    	var day_diff = 5;
    	var day_mill_secs = 24 * 3600 * 1000;
    	var sdate = null, edate = null;
    	
    	// 计算起始日期
    	if(direction == -1){
    		sdate = new Date(record.list_prev_curdate.getTime() - day_diff * day_mill_secs);
    		edate = new Date(record.list_prev_curdate.getTime() - day_mill_secs)
    		record.list_prev_curdate = sdate;
    	}else if(direction == 1){
    		sdate = new Date(record.list_next_curdate.getTime() + day_mill_secs)
    		edate = new Date(record.list_next_curdate.getTime() + day_diff * day_mill_secs);
    		record.list_next_curdate = edate;
    	}
    	
    	// 获取更多日程
    	DataHandler.getSchByPeriod(sdate, edate);
    	
    	// 将新日历追加到list中
        var schedulesByCldId = DataHandler.getSchedulesByRange(sdate, edate, DataHandler.resultData, calendarHandler.getSelectedArray());
        var instance = tplMgr.getInstance("listItemTpl");
        if(direction == -1){
        	$("#list_content").html(instance.GetView(schedulesByCldId) + $("#list_content").html());
        }else if(direction == 1){
        	$("#list_content").html($("#list_content").html() + instance.GetView(schedulesByCldId));
        }
    }
};