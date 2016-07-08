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
        "dateSelectView": "view/dateSelectView",//日期选择
        "weekView": "view/weekView",//周视图

        /* -----single----- */
        "appData": "/third_cooperation/qqgroup/js/appData",//跨界面记录数据
        "create": "../../../qqgroup/js/create"
    },
    shim: {
        "zepto": {
            exports : "$"
        }
    }
});
require(['zepto', 'util', 'create'], function ($, util, create){
	create.create();
});