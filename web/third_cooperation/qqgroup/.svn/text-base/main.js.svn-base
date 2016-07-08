/* liumingren 2015.6.2 */
/*配置要加载的js*/
require.config({
    baseUrl: '/third_cooperation/base_calendar/js/app/',
    paths: {
        "zepto": "/js/lib/zepto.min",
        /* ----- common ----- */
        "util": "common/util",
        "amplify": "/js/lib/amplify.core.min",
        "lunar": "common/solarAndLunar",//转换农历
        /* -----Model----- */
        "data": "model/data",//2015节假日等数据
        /* -----contorller-----*/
        "monthInfo": "contorller/monthInfo",//处理月视图需要的数据
        "weekInfo": "contorller/weekInfo",//处理周视图需要的数据
        /* -----View----- */
        "monthView": "view/monthView",//月视图
        "dateSelectView": "view/dateSelectView1",//日期选择
        "weekView": "view/weekView",//周视图

        /* -----single----- */
        "appData": "/third_cooperation/qqgroup/js/appData",//跨界面记录数据
        "single": '/third_cooperation/qqgroup/js/single',
    },
    shim: {
        "zepto": {
            exports : "$"
        },
        "amplify": {
            exports : "amplify"
        }
    }
});
require(['zepto','monthView','weekView','dateSelectView', 'appData', 'single'], function ($,mv, wv, ds, appData){
    var viewType = appData.get('viewType') || 'month';
    var viewDate = appData.get('date');
    ds.init();
    if(viewType == 'month'){
        viewDate ? mv.init(true, new Date(viewDate)) : mv.init(true);
    }
    else{
        viewDate ? wv.init(true, new Date(viewDate)) : wv.init(true);
        viewDate ? (window.chooseDate = new Date(viewDate)) : (window.chooseDate = new Date());
        $("#viewType").attr("data-type","week");

        amplify.publish('ev:viewTypeChanged', 'week');

        var pix = $("#viewType").html().substr(1);

        $("#viewType").html("月" + pix);
        $("#calendar_panel_week").removeClass("none");
        $("#calendar_panel").addClass("none");
    }
});