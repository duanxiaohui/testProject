/* 相关数据 liumingren*/
;(function(){
    var globalData = (function() {
		var data = {
			// 2015节假日
			2015:{
				// 法定节假日
				festiArr : [
			    	{name: '元旦', remidy: [], time: '1月1日~1月3日', from: '2015/1/1', to: '2015/1/3'},
			        {name: '春节', remidy: [], time: '2月18日~2月24日', from: '2015/2/18', to: '2015/2/24'},
			        {name: '清明节', remidy: [], time: '4月4日~4月6日', from: '2015/4/4', to: '2015/4/6'},
			        {name: '劳动节', remidy: [], time: '5月1日~5月3日', from: '2015/5/1', to: '2015/5/3'},
			        {name: '端午节', remidy: [], time: '6月20日~6月22日', from: '2015/6/20', to: '2015/6/22'},
			        {name: '中秋节', remidy: [], time: '9月26日~9月27日', from: '2015/9/26', to: '2015/9/27'},
			        {name: '国庆节', remidy: [], time: '10月1日~10月7日', from: '2015/10/1', to: '2015/10/7'}
			    ],
			    // 节假日补充
			    festiArrSupplemental:[
			    	{name:'',from: '2015/9/1', to: '2015/9/3'}
			    ],
			    // 调整工作日
			    workArr:{
			    	"9/4":1
			    }
			},
			// 2016节假日
			2016:{
				// 法定节假日
				festiArr : [
			    	{name: '元旦', remidy: [], time: '1月1日~1月3日', from: '2016/1/1', to: '2016/1/3'},
			        {name: '春节', remidy: ['2/6', '2/14'], time: '2月7日~2月13日', from: '2016/2/7', to: '2016/2/13'},
			        {name: '清明节', remidy: [], time: '4月2日~4月4日', from: '2016/4/2', to: '2016/4/4'},
			        {name: '劳动节', remidy: [], time: '4月30日~5月2日', from: '2016/4/30', to: '2016/5/2'},
			        {name: '端午节', remidy: ['6/12'], time: '6月9日~6月11日', from: '2016/6/9', to: '2016/6/11'},
			        {name: '中秋节', remidy: [], time: '9月15日~9月17日', from: '2016/9/15', to: '2016/9/17'},
			        {name: '国庆节', remidy: ['10/8', '10/9'], time: '10月1日~10月7日', from: '2016/10/1', to: '2016/10/7'}
			    ],
			    // 节假日补充
			    festiArrSupplemental:[],
			    // 调整工作日
			    workArr:{}
			}
		};
		for(var year in data){
			var festiArr = data[year].festiArr;
			for (var i = 0; i < festiArr.length; i++) {
				var festi = festiArr[i];
				for (var j = 0; j < festi.remidy.length; j++) {
					data[year].workArr[festi.remidy[j]] = 1;
				};
			};
		}

		return {data : data, targetYear : 2016};
	})();
    var moduleName = globalData;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return moduleName; });
    } else {
        this.globalData = globalData;
    }
}).call(this || (typeof window !== 'undefined' ? window : global));