var isLogin = false;
//		if(typeof opt.cldIDs != "undefined")
//			self.cldIDs = opt.cldIDs;
//		var now = this.today = new Date(), year = now.getFullYear(), month = now.getMonth() + 1;
//		this.initCalendar(year, month);
//		this.panel.find('li.today').click();
		this.panel.find('li.today').click();
								self.colors[o.id] = o.color;
								self.calendarMap[o.id] = o.title
								return o.id;
							}).join(',')
			var a_date = getDateFromStr(a.start_time, a.allday_event);
			var b_date = getDateFromStr(b.start_time, b.allday_event);
			return a_date.getTime() - b_date.getTime();
		});