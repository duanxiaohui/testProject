$.widget('mxx.birthdaylunarPicker', {
	options: {
		yearStart: 1901,
		yearEnd: lunar(new Date()).lYear + 1984,
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
		this.setDate(opt.date);
	},
	_init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.setDate(opt.date);
	},
	init: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		//初始化年
		var year = this.lunarDate.sYear + 1984;
		this.$year.empty();
		this.$year.append(this.yearHtml.replace('"' + year + '"', '"' + year + '"' + ' selected="selected"'));
		this.$year.append("<option value='none'>无</option>");

		this.$year.off('change').change(function(evt){
				self._calYearData();
				self._fillMonth(evt);
				self._fillDate(evt);
			}).change();
		
		this.$month.off('change').change(function(evt){
			self._fillDate(evt);
		}).change();
		
		this.$date.off('change').change(function(evt){
			if(self.$year.find('option:selected').val()=="none"){
					$(".transform_solarlunar_txt").html('');
					return;
				}
			var solarTxt=self.$date.find('option:selected').attr("date").split("-");
			$(".transform_solarlunar_txt").html('公历：'+solarTxt[0]+'年'+solarTxt[1]+'月'+solarTxt[2]+'日')
		}).change();
	},
	_fillMonth: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var month = evt.isTrigger ? ((self.lunarDate.isLeap ? 'r' : '') + (self.lunarDate.monthIndex + 1)) : self.$month.val().slice(-(self.$month.val() - 1));
		self.$month.empty().append($.format('<option idx="{INDEX}" value="{value}">{text}</option>', self.data).replace('value="' + month + '"', 'value="' + month + '"' + ' selected="selected"'));
		self.$month.change();
	},
	_fillDate: function(evt){
		var self = this, $elem = $(this.element), opt = this.options;
		var idx = self.$month.find('option:selected').attr('idx'), date = evt.isTrigger ? self.lunarDate.dateIndex + 1 : self.$date.val();
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
        var ar = lunar(new Date(self.$year.val(), 2, 1)).getMonthInfo();
        var date = ar.solarSpringDay, obj;
        self.data = [];
        var today = new Date();
        var lunarToday = lunar(today);
        if (self.$year.val() != 'none' && opt.noyear != 0) {
            $.each(ar, function(index, o){
                if(self.$year.val() == today.getFullYear()) {
                    if(index > lunarToday.monthIndex) {
                        return;
                    }

                }
                obj = self.data[index] = {
                    value: (o.isLeap ? 'r' : '') + ((o.index - 2) % 12 + 1),
                    text: o.name + '月',
                    days: []
                };

                $.each(new Array(o.days), function(dayIndex){
                    if((self.$year.val() == today.getFullYear()) && (index == lunarToday.monthIndex) && (dayIndex > lunarToday.dateIndex)) {
                        return;
                    }
                    obj.days.push({
                        value: dayIndex + 1,
                        text: Lunar.DB.dateCn[dayIndex],
                        date: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
                    });
                    date.setDate(date.getDate() + 1);
                });
            });
        } else {
            $.each(Lunar.DB.monthCn, function(index,o) {
                i = (index + 2) % 12;
                obj = self.data[index] = {
                    value: index + 1,
                    text: Lunar.DB.monthCn[i] + '月',
                    days: []
                };
                $.each( Lunar.DB.dateCn, function(dayIndex,o){
                    //不显示三一
                    if(dayIndex == 30)
                        return;
                    obj.days.push({
                        value: dayIndex + 1,
                        text: o,
                        date: ''
                    });
                });
            });
        }
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
		this.lunarDate = lunar(this.date);
		this.init();
	},
	hideYear: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.$year.val("none");
	}
});
