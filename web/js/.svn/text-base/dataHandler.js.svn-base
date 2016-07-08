/*=============== 数据处理  DataHandler ================*/
var DataHandler = {
    /*
     * 记录缓存中数据的时间范围 XXX xj: 似乎yzm修改过缓存记录方式之后此数据已经无用了
     */
    cachedData : {
        from : new Date(),
        to : new Date()
    },
	loadCld : {},
    getLoadCld : function(dateStart, dateEnd,cld){
		var sel = [];
		var str = getDateKey(dateStart)+"-"+getDateKey(dateEnd);
		for(var i=0;i<cld.length;i++)
		{
			var signal = str+"-"+cld[i];
			if(typeof DataHandler.loadCld[signal] == 'undefined')
			{
				sel.push(cld[i]);
				DataHandler.loadCld[signal] = {};
			}
			
		}
		if(sel.length>0)
			return sel.join(",");
		else
			return false;
	},
    /*
     * 缓存中format以后的数据,格式见formatSchData
     */
    resultData: {},
    
    /*
     * id为键,日程简介为值
     */
    resultDataById: {},
    
    /*
     * 根据起始时间取日程数据,若缓存中不存在所需数据,则ajax请求并入缓存,若已存在,则数据请求无动作;若callback存在,调用之
     * dateStart, dateEnd : Date
     * callback : function
     */
    getSchByPeriod : function(dateStart, dateEnd, callback) {
        var s_time = dateStart, e_time = dateEnd;
        if (dateStart >= this.cachedData.from) {
            s_time = this.cachedData.to;
        }
        if (dateEnd <= this.cachedData.to) {
            e_time = this.cachedData.from;
        }
		var cld = calendarHandler.getSelectedArray();
			
		var cldStr = DataHandler.getLoadCld(dateStart, dateEnd,cld);
        if(cldStr) {
			
			// 杨：获取当前选中的日历id
			
            $.ajax({
                url: '/schedule/list.do',
                async: false,
                type: 'post',
                dataType: 'json',
                data: {
                    fromDate: cal365.templates.load_format(dateStart),
                    toDate: cal365.templates.load_format(dateEnd),
                    timeZone: - (new Date()).getTimezoneOffset() / 60,
                    calendarId: cldStr

                },
                success: function(result) {
					for(var i=0;i<result.length;i++)
					{
						var cldObj = result[i];
						DataHandler.formatSchData(cldObj.schlist, e_time);
					}
                    if(DataHandler.cachedData.from > s_time)
                       DataHandler.cachedData.from = s_time;
                    if(DataHandler.cachedData.to < e_time)
                       DataHandler.cachedData.to = e_time;
                    if(callback) {
                       callback();
                    }
                }
            });
        } else {
            if(callback) {
                callback();
            }
        }
    },
    
    /*
     * 获取date所在月份月视图区域内数据并显示,若缓存中存在所需数据,则返回缓存中数据,否则ajax请求数据
     * date : Date
     * callback : function
     * startOnMonday : 周一作为第一天,为true, 否则为false
     */
    getSchByMonth : function(date, callback, startOnMonday) {
        var s_date = cal365.date.month_view_start(date, startOnMonday);
        var e_date = cal365.date.add(s_date, CalUtil.monthViewInfo(date, startOnMonday).row*7, 'day');
        this.getSchByPeriod(s_date, e_date, callback);
    },
    
    /*
     * 此方法是从格式化的日程数据中获取一段时间的日程并返回规定的数据格式
     * 具体的数据格式如下
     * {
     *      "d2011-05-01":{
     *          schList:[{日程信息}],    // 该天的日程列表，todo：跨天日程的处理方式，重复日程，
     *          num:   // 日程的条数
     *      },
     *      "d2011-05-02":{
     *          schList:[]
     *          num:   // 日程的条数
     *      },
     *      maxNum:    // 算出最多日程的条数  方便月视图显示日程
     * }
     * 
     * sTime, eTime : Date OR string
     */
    getSchedulesByRange: function(sTime,eTime,data,cld) {
        var result= {};
        var dataSch = data||DataHandler.resultData;
        if(typeof sTime=="string") {
            sTime = cal365.templates.api_date(sTime);
        }
        if(typeof eTime=="string") {
            eTime = cal365.templates.api_date(eTime);
        }
        sTime = cal365.date.date_part(sTime);
        eTime = cal365.date.date_part(eTime);
        for(;sTime<=eTime;) {
            var k = "d"+getDateKey(sTime);
            result[k]= {
                schList:[],
                num:0
            };
            if(dataSch[k]) {
				var schList_temp = [];
				for(var j = 0; j<dataSch[k].schList.length;j++)
				{
					var sch_t = dataSch[k].schList[j];
					for(var q = 0;q<cld.length;q++)
					{
						if(sch_t.cid==cld[q])
						{
							schList_temp.push(sch_t);
							break;
						}
					}
				}
                result[k].schList = schList_temp;
                result[k].num = schList_temp.length;
            }
            sTime = cal365.date.add(sTime,1,"day");
        }
        var maxNum = 0;
        for(var i in result) {
            var k = result[i];
            if(k.num>maxNum)
                maxNum = k.num;
        }
        result.maxNum = maxNum;
        return JSON.parse(JSON.stringify(result)); //make a copy of data to keep original data safe
    },
    
    /*
     * 为了提高日程数据的处理效率，减少重复处理，将日程数据格式化为以下模式
     * {
     *      "d2011-05-01":{
     *          schList:[{日程信息}]    // 该天的日程列表，日程列表是排好序的，排序规则：1、按照时间排序，如果时间相同则按照日历id、日程id或者可以是日程的添加时间；todo：跨天日程的处理方式，重复日程，
     *      },
     *      "d2011-05-02":{
     *          schList:[]
     *      }
     * }
     * 
     * data : Object
     * dateScope : Date
     */
    formatSchData : function(data,dateScope) {
//        console.log('raw data \n' + JSON.stringify(data));
        var result = {};

        /*
         * 注：对于数组的操作，尽量少用for(var i in data) 模式，因为此模式不仅会操作数组中的数据，同时会操作数组对象的其他属性，
         * 此处只需要遍历一遍日程列表即可，但是需要注意对跨天日程的拆分，需要添加三个字段 1、cross_st  2、cross_et,3、是否显示isDisplay
         */
        for(var i=0;i<data.length;i++) {
            var sch = data[i];
            if('' == sch.text) sch.text = '(无标题)';
            var sTime = cal365.templates.api_date(sch.start_time);
            var eTime = new Date(sTime.valueOf()+sch.duration*1000);

            var sTemp = cal365.date.copy(sTime);
            var sideTime = cal365.date.add(cal365.date.date_part(sTemp),1,"day");
			sch.isDisplay = 0;
            if(sideTime>=eTime) {
                var key = "d"+getDateKey(sTime);
                if(!result[key])
                    result[key]= {
                        schList:[]
                    };
                result[key].schList.push(sch);
            } else {
                var s_t = cal365.date.copy(sTime);
                for(;s_t<eTime&&s_t<dateScope;)     // 此处应当避免没有必要阶段性日程划分；TODO：对日程进行排序
                {
                    var k = "d"+getDateKey(s_t);
                    var sch_temp = DataHandler.copySch(sch);
                    sch_temp.cross_st = cal365.templates.day_date(s_t)+":00";
                    var e_t = cal365.date.add(cal365.date.date_part(s_t),1,"day");
                    if(e_t<=eTime)
                        sch_temp.cross_et = cal365.templates.day_date(e_t)+":00";
                    else
                        sch_temp.cross_et = cal365.templates.day_date(eTime)+":00";
                    if(!result[k])
                        result[k]= {
                            schList:[]
                        };
                    result[k].schList.push(sch_temp);
                    s_t = e_t;
                }
            }
        }
//        console.log('result which is formatted\n' + JSON.stringify(result));
        DataHandler.mergeData(DataHandler.resultData, result);
        DataHandler.formatSchDataById(data);
    },
    
    /*
     * 为了提高日程数据的处理效率，减少重复处理，将日程数据格式化为以下形式(作用待评估,暂时保留)
     * {
     *      "1234":{日程信息}, //id 为key的日程的信息
     *      "1235":{}
     *      ... ...
     * }
     */
    formatSchDataById : function(data) {
        var result = {};
        for(var i=0;i<data.length;i++) {
            result[data[i].id] = data[i];
        }
        $.extend(true, DataHandler.resultDataById, result);
    },

    /*
     * 将source中的日程数据合并到target中
     * 基于DataHandler.resultData的数据结构
     */
    mergeData: function (target, source) {
        for(var dailySch in source) {
            if(target[dailySch]) {
                var src = source[dailySch]['schList'];
                var tgt = target[dailySch]['schList'];
                for(var i = 0; i < src.length; ++i) {
                    var flag = false;
                    for(var j = 0; j < tgt.length; ++j) {
                        if(tgt[j].id == src[i].id) {
                            tgt[j] = src[i];
                            flag = true;
                            break;
                        }
                    }
                    if(!flag) {
                        tgt.push(src[i]);
                    }
                }
            } else {
                target[dailySch] = source[dailySch];
            }
            //对日程排序按开始时间排序
            target[dailySch].schList.sort(function(a, b) {
                if(a.allday_event) return -1;
                if(b.allday_event) return 1;
                var a_stime = cal365.templates.api_date(a.start_time).getTime();
                var b_stime = cal365.templates.api_date(b.start_time).getTime();
                return (a_stime - b_stime);
            });
        }
    },
    
    /*
     * 根据日程id在缓存中删除日程
     */
    delSchById: function(id) {
        for (var dailySch in DataHandler.resultData) {
            var schList = DataHandler.resultData[dailySch]['schList'];
            for (var i = 0; i < schList.length; ++i) {
                if (schList[i].id == id) {
                    schList.splice(i, 1);
                    --i;
                }
            }
        }
        delete DataHandler.resultDataById[id];
    },
    
    /*
     * 根据日程id在缓存中更新数据
     * sch : Obj
     * dateScope : Date
     */
    updateSch: function(schList, dateScope) {
//        console.log('schList\n' + schList[0].id + '\n' +JSON.stringify(schList) );
        DataHandler.delSchById(schList[0].id);
//        console.log('after delSchById\n' + JSON.stringify(DataHandler.resultData));
        DataHandler.formatSchData(schList, dateScope);
//        console.log('after format\n' + JSON.stringify(DataHandler.resultData));
    },
    
    /*
     * 克隆日程
     */
    copySch : function(sch) {
        var t = function() {
        };
        t.prototype = sch;
        return new t();
    }
};
