$.widget('mxx.solarPicker', {
	options: {
		yearStart: 1901,
		yearEnd: new Date().getFullYear(),
		date: new Date(),
		onChange: null
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.dlts = $elem.find('select');
		this.$year = this.dlts.eq(0);
		this.$month = this.dlts.eq(1);
		this.$date = this.dlts.eq(2);
		this.yearHtml = $.format('<option value="{value}">{text}</option>', $.map(new Array(opt.yearEnd - opt.yearStart + 1), function(_, index){
			return {
				value: index + opt.yearStart,
				text: (index + opt.yearStart) + '年'
			};
		}));
		this.$date.change(function(){
			self._triggerChangeEvent();
		});
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.setDate(opt.date);
	},
	init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//初始化年
		var year = this.date.getFullYear();
		this.$year.empty();
		this.$year.append(this.yearHtml.replace('"' + year + '"', '"' + year + '"' + ' selected="selected"'));
		this.$year.append("<option value='none'>无</option>");

		// if (opt.noneyear == 0) {
		// 	self.$year.val("none")
		// }
		
		this.$year.off('change').change(function(evt){
			self._calYearData();
			self._fillMonth(evt);
			self._fillDate(evt);
		}).change();
		
		this.$month.off('change').change(function(evt){
			self._fillDate(evt);
		}).change();
		
		this.$date.off('change').change(function(evt){
			if (self.$year.find('option:selected').val() == "none") {
				$(".transform_solarlunar_txt").html('');
				return;
			}
			var dateStrAry = self.$date.find('option:selected').attr("date").split("-");
			var selectDate = new Date();
			selectDate.setFullYear(dateStrAry[0]);
			selectDate.setMonth(parseInt(dateStrAry[1]) - 1);
			selectDate.setDate(dateStrAry[2]);
			var lunarTxt=lunar(selectDate),lunarTxtY=lunarTxt.gzYear,lunarTxtM=lunarTxt.lMonth,lunarTxtD=lunarTxt.lDate;
			$(".transform_solarlunar_txt").html("农历："+lunarTxtY+"年"+lunarTxtM+"月"+lunarTxtD)
		}).change();
	},
	_fillMonth: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var month = evt.isTrigger ? (self.date.getMonth()) : self.$month.val().slice(-(self.$month.val() - 1));
		self.$month.empty().append($.format('<option idx="{INDEX}" value="{value}">{text}</option>', self.data).replace('value="' + month + '"', 'value="' + month + '"' + ' selected="selected"'));
		self.$month.change();
	},
	_fillDate: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var idx = self.$month.find('option:selected').attr('idx'), date = evt.isTrigger ? self.date.getDate() : self.$date.val();
		self.$date.empty().append($.format('<option date="{date}" value="{value}">{text}</option>', self.data[idx].days).replace('value="' + date + '"', 'value="' + date + '"' + ' selected="selected"'));
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
        var ar = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var obj;
		var y = this.$year.find('option:selected').text().slice(0,4);
		var today = new Date();
        self.data = [];

        $.each(ar, function(index, o) {
            var d = self.getDays(y, index+1);
            if(self.$year.val() == today.getFullYear() && opt.noneyear != 0) {
                if(index > today.getMonth()) {
                    return;
                } else if(index == today.getMonth()) {
                    d = today.getDate();
                }

            }
            obj = self.data[index] = {
                value: o,
                text: (o+1) + '月',
                days: []
            };
            for(dayIndex=1; dayIndex <= d; dayIndex++) {
                obj.days.push({
                    value: dayIndex,
                    text: dayIndex,
                    date: [y, (index + 1) > 9 ? (index + 1) : '0' + (index + 1), dayIndex > 9 ? dayIndex : '0' + dayIndex].join('-')
                });
            }
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
		this.init();
	},
	hideYear: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.$year.val("none");
	},
    isRN: function(year) {
        return (year%4 == 0 && year%100 != 0) || (year%400 == 0);
    },
    getDays: function(year, month) {
        var self = this, $elem = $(this.element), opt = this.options;
        if(month == 2) {
            return self.isRN(year) ? 29 : 28;
        } else if(month < 8) {
            return month%2 == 0 ? 30 : 31;
        } else {
            return month%2 == 0 ? 31 : 30;
        }
    }
});
