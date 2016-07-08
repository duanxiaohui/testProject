/**
 * 日历列表
 * @authors huangyi
 * @date    2014-08-13
 * @version 1.0
 */

define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/module/weekPanel',
	'rebuild/module/monthPanel',
	'rebuild/module/listPanel'
//	'rebuild/module/dayPanel'
], function(c, cp) {
	// console.log("module : calendarPanel");

	var _data = {};
	var _ex = {
		init: function () {
			_ex.initData();

			//不能在这初始化，需要上报后才知道模块，所以需要在接收模块的时候反射
			// _ex.changeModule(_data.module);
		},

		initData: function () {
			_data.module = cp.getNormalPanel();
			_data.moduleHash = {};
		},

		/**
		 * 上报模块
		 * 参数1：模块名称
		 * 参数2：触发dom
		 */

		setModules: function () {
			var moduleName = arguments[0], 
				elementName = arguments[1];

			//建立模块与dom的hash
			_data.moduleHash[moduleName] = elementName;

			//绑定事件
			if(elementName){
				$(elementName).on('click', function () {
					_ex.changeModule(moduleName);
				});
			}

			//反射初始模块
			if(moduleName === _data.module){
				_ex.changeModule(moduleName);
			}
		},

		changeModule: function (moduleName) {
			//当前要切换的模块
			_data.module = moduleName;

			//设置UI
			var elementName = _data.moduleHash[moduleName];
			if(elementName){
				var me = $(elementName);
				me.parent().find('li').removeClass('on');
				me.addClass('on');
			}

			//切换
			amplify.publish('toChangeCalendarPanel', moduleName);
		}

	};

	amplify.subscribe('initApp', _ex.init);
	amplify.subscribe('initPanelModule', _ex.setModules);

	amplify.publish('panelReady');
})