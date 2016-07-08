//-------------数据转化-------------
var _data = globalData;
var DATA = globalData.data;
var worktime = {};
var festival_main = {};
var festivalData = {};
var fangjiaData = {};
for (var year in DATA) {
    worktime['y' + year] = {};
    var key, m, d;

    var __d = DATA[year].festiArr.concat(DATA[year].festiArrSupplemental);
    for (var __i = 0; __i < __d.length; __i++) {
    	var h = __d[__i];

        //生成假日数据
        if(_data.targetYear == year){
            festival_main[h.from.replace(/\//g, '_')] = h.name;
            var nameTable = {
                '元旦': 'yuandan',
                '春节': 'chunjie',
                '清明节': 'qingmingjie',
                '劳动节': 'laodong',
                '端午节': 'duanwu',
                '中秋节': 'zhongqiu',
                '国庆节': 'guoqing'
            }
            festivalData[nameTable[h.name]] = h.from.replace(/\//g, '_')

            fangjiaData[nameTable[h.name]] = (function () {
                var res = h.time + '放假。';
                for (var i = 0; i < h.remidy.length; i++) {
                    res += h.remidy[i].replace(/\//, '月') + '日'
                    var weekend = new Date(year + '/' + h.remidy[i]).getDay();
                    if(weekend == 6){
                        res += '（周六）';
                    }
                    else if(weekend == 0){
                        res += '（周日）'
                    }
                    res += '、';
                };
                if(h.remidy.length){res = res.substring(0, res.length - 1); res += '上班';}
                return res;
            })();
        }

        //生成休
        var start = new Date(h.from),
            end = new Date(h.to);
        while (1) {
            m = start.getMonth()
            _m = m + 1 + '';
            _m = (_m.length == 1 ? '0' : '') + _m;
            d = start.getDate();
            _d = d + '';
            _d = (_d.length == 1 ? '0' : '') + _d;
            key = 'd' + _m + _d;
            worktime['y' + year][key] = {
                "w": "放假"
            };
            if (m == end.getMonth() && d == +end.getDate()) {
                break;
            }
            start.setDate(start.getDate() + 1);
        }
    };
    //生成班
    for(var date in DATA[year].workArr){
        var _date = date.split('/');
        var _m = _date[0] + '';
            _m = (_m.length == 1 ? '0' : '') + _m;
        var _d = _date[1] + '';
            _d = (_d.length == 1 ? '0' : '') + _d;
        key = 'd' + _m + _d;
        worktime['y' + year][key] = {
            "w": "上班"
        };
    }

}
//-------------数据转化结束-------------