define(function () {

	var holidays = {
		2014:{
			festival: (function () {
				var festival = 'm1d1 m1d31 m2d1 m2d2 m2d3 m2d4 m2d5 m2d6 m4d5 m4d6 m4d7 m5d1 m5d2 m5d3 m5d31 m6d1 m6d2 m9d6 m9d7 m9d8 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' ');
				var o = {};
				for (var i = 0, l = festival.length; i < l; i++) {
					o[festival[i]] = 'rest';
				};
				return o;
			})(),
			workday: (function () {
				var workday = 'm1d26 m2d8 m5d4 m9d28 m10d11'.split(' ');
				var o = {};
				for (var i = 0, l = workday.length; i < l; i++) {
					o[workday[i]] = 'work';
				};
				return o;
			})()
		},
		2015:{
			festival: (function () {
				var festival = 'm1d1 m1d2 m1d3 m2d18 m2d19 m2d20 m2d21 m2d22 m2d23 m2d24 m4d4 m4d5 m4d6 m5d1 m5d2 m5d3 m6d20 m6d21 m6d22 m9d26 m9d27 m9d3 m9d4 m9d5 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' ');
				var o = {};
				for (var i = 0, l = festival.length; i < l; i++) {
					o[festival[i]] = 'rest';
				};
				return o;
			})(),
			workday: (function () {
				var workday = 'm1d4 m2d15 m2d28 m9d6 m10d10'.split(' ');
				var o = {};
				for (var i = 0, l = workday.length; i < l; i++) {
					o[workday[i]] = 'work';
				};
				return o;
			})()
		},
		2016:{
			festival: (function () {
				var festival = 'm1d1 m1d2 m1d3 m2d7 m2d8 m2d8 m2d9 m2d10 m2d11 m2d12 m2d13 m4d2 m4d3 m4d4 m4d30 m5d1 m5d2 m6d9 m6d10 m6d11 m9d15 m9d16 m9d17 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' ');
				var o = {};
				for (var i = 0, l = festival.length; i < l; i++) {
					o[festival[i]] = 'rest';
				};
				return o;
			})(),
			workday: (function () {
				var workday = 'm2d6 m2d14 m6d12 m9d18 m10d8 m10d9'.split(' ');
				var o = {};
				for (var i = 0, l = workday.length; i < l; i++) {
					o[workday[i]] = 'work';
				};
				return o;
			})()
		}
	};

	return {
		getHolidays: function () {
			return holidays;
		}
	}
})