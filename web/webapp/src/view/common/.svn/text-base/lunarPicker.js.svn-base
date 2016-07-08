define(function(require){
	var $util = require("../../common/util");
	var $lunar = require("../../common/solarAndLunar");
	
$.widget('xxx.lunarPicker', {
	options: {
		yearStart: 1901,
		yearEnd: 2099,
		date: new Date(),
		onChange: null
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.dlts = $elem.find('select');
		this.$year = this.dlts.eq(0);
		this.$month = this.dlts.eq(1);
		this.$date = this.dlts.eq(2);
		this.yearHtml = $util.format('<option value="{value}">{text}</option>', $.map(new Array(opt.yearEnd - opt.yearStart + 1), function(_, index){
			return {
				value: index + opt.yearStart,
				text: (index + opt.yearStart) + '年'
			};
		}));
		this.$date.change(function(){
			self._triggerChangeEvent();
		});
		this.setDate(opt.date);
	},
	init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//初始化年
		var year = this.lunarDate.sYear + 1984;
		this.$year.empty().append(this.yearHtml.replace('"' + year + '"', '"' + year + '"' + ' selected="selected"'));
		this.$year.selecter && this.$year.selecter();
		
		this.$year.off('change').change(function(evt){
			self._calYearData();
			self._fillMonth(evt);
			self._fillDate(evt);
		}).change();
		
		this.$month.off('change').change(function(evt){
			self._fillDate(evt);
		}).change();
		
	},
	_fillMonth: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var month = evt.isTrigger ? ((self.lunarDate.isLeap ? 'r' : '') + (self.lunarDate.monthIndex + 1)) : self.$month.val().slice(-(self.$month.val() - 1));
		self.$month.empty().append($util.format('<option idx="{INDEX}" value="{value}">{text}</option>', self.data).replace('value="' + month + '"', 'value="' + month + '"' + ' selected="selected"'));
		self.$month.selecter && self.$month.selecter();
		self.$month.change();
	},
	_fillDate: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var idx = self.$month.find('option:selected').attr('idx'), date = evt.isTrigger ? self.lunarDate.dateIndex + 1 : self.$date.val();
		self.$date.empty().append($util.format('<option date="{date}" value="{value}">{text}</option>', self.data[idx].days).replace('value="' + date + '"', 'value="' + date + '"' + ' selected="selected"'));
		self.$date.selecter && self.$date.selecter();
		self.$date.change();
	},
	_triggerChangeEvent: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var optDate = this.$date.find('option:selected');
		
		$.isFunction(opt.onChange) &&
		opt.onChange.apply(this, [optDate.attr('date'), this.$year.find('option:selected').text(), this.$month.find('option:selected').text(), optDate.text()]);
	},
	_calYearData: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var ar = $lunar.lunar(new Date(self.$year.val(), 2, 1)).getMonthInfo(), date = ar.solarSpringDay, obj;
		self.data = [];
		$.each(ar, function(index, o){
			obj = self.data[index] = {
				value: (o.isLeap ? 'r' : '') + ((o.index - 2) % 12 + 1),
				text: o.name + '月',
				days: []
			};
			$.each(new Array(o.days), function(dayIndex){
				obj.days.push({
					value: dayIndex + 1,
					text: $lunar.Lunar.DB.dateCn[dayIndex],
					date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
				});
				date.setDate(date.getDate() + 1);
			});
		});
	},
	getDate: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return new Date(this.$date.find('option:selected').attr('date').replace(/-/g, '/'));
	},
	getLunarInfo: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		return {
			year: this.$year.val(),
			month: this.$month.val(),
			date: this.$date.val(),
			cnYear: this.$year.find('option:selected').text(),
			cnMonth: this.$month.find('option:selected').text(),
			cnDate: this.$date.find('option:selected').text()
		};
	},
	setDate: function(date){
		this.date = date;
		this.lunarDate = $lunar.lunar(this.date);
		this.init();
	}
});

})
