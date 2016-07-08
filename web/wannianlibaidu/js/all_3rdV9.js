var JSON = function() {
    var m = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        s = {
            "boolean": function(x) {
                return String(x);
            },
            number: function(x) {
                return isFinite(x) ? String(x) : "null";
            },
            string: function(x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            },
            object: function(x) {
                if (x) {
                    var a = [],
                        b, f, i, l, v;
                    if (x instanceof Array) {
                        a[0] = "[";
                        l = x.length;
                        for (i = 0; i < l; i += 1) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == "string") {
                                    if (b) {
                                        a[a.length] = ",";
                                    }
                                    a[a.length] = v;
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = "]";
                    } else {
                        if (x instanceof Object) {
                            a[0] = "{";
                            for (i in x) {
                                v = x[i];
                                f = s[typeof v];
                                if (f) {
                                    v = f(v);
                                    if (typeof v == "string") {
                                        if (b) {
                                            a[a.length] = ",";
                                        }
                                        a.push(s.string(i), ":", v);
                                        b = true;
                                    }
                                }
                            }
                            a[a.length] = "}";
                        } else {
                            return;
                        }
                    }
                    return a.join("");
                }
                return "null";
            }
        };
    return {
        copyright: "(c)2005 JSON.org",
        license: "http://www.crockford.com/JSON/license.html",
        stringify: function(v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == "string") {
                    return v;
                }
            }
            return null;
        },
        parse: function(text) {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g, ""))) && eval("(" + text + ")");
            } catch (e) {
                return false;
            }
        }
    };
}();
var term_spring = {
    1948: 5,
    1952: 5,
    1956: 5,
    1960: 5,
    1964: 5,
    1968: 5,
    1972: 5,
    1976: 5,
    1980: 5
};
var lunarInfo = new Array(19416, 19168, 42352, 21717, 53856, 55632, 21844, 22191, 39632, 21970, 19168, 42422, 42192, 53840, 53909, 46415, 54944, 44450, 38320, 18807, 18815, 42160, 46261, 27216, 27968, 43860, 11119, 38256, 21234, 18800, 25958, 54432, 59984, 27285, 23263, 11104, 34531, 37615, 51415, 51551, 54432, 55462, 46431, 22176, 42420, 9695, 37584, 53938, 43344, 46423, 27808, 46416, 21333, 19887, 42416, 17779, 21183, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 38310, 38335, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 20854, 21183, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 53430, 53855, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 45653, 27951, 44448, 19299, 37759, 18936, 18800, 25776, 26790, 59999, 27424, 42692, 43759, 37600, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 19285, 19311, 42352, 21732, 53856, 59752, 54560, 55968, 27302, 22239, 19168, 43476, 42192, 53584, 62034, 54560);
var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array("日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
var nStr2 = new Array("初", "十", "廿", "卅", "□");
var monthName = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
var cmonthName = new Array("正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊");
var sFtv = new Array("0101*元旦", "0214 情人节", "0308 妇女节", "0312 植树节", "0401 愚人节", "0422 地球日", "0501 劳动节", "0504 青年节", "0531 无烟日", "0601 儿童节", "0606 爱眼日", "0701 建党日", "0707 抗战纪念日", "0801 建军节", "0910 教师节", "0918 九·一八事变纪念日", "1001*国庆节", "1031 万圣节", "1111 光棍节", "1201 艾滋病日", "1213 南京大屠杀纪念日", "1224 平安夜", "1225 圣诞节");
var wFtv = new Array("0520 母亲节", "0630 父亲节", "1144 感恩节");
var lFtv = new Array("0101*春节", "0115 元宵节", "0202 龙抬头", "0505 端午节", "0707 七夕", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1223 小年", "0100*除夕");

function lYearDays(c) {
    var a, b = 348;
    for (a = 32768; a > 8; a >>= 1) {
        b += (lunarInfo[c - 1900] & a) ? 1 : 0;
    }
    return (b + leapDays(c));
}

function leapDays(a) {
    if (leapMonth(a)) {
        return ((lunarInfo[a - 1899] & 15) == 15 ? 30 : 29);
    } else {
        return (0);
    }
}

function leapMonth(b) {
    var a = lunarInfo[b - 1900] & 15;
    return (a == 15 ? 0 : a);
}

function monthDays(b, a) {
    return ((lunarInfo[b - 1900] & (65536 >> a)) ? 30 : 29);
}

function Lunar(e) {
    var c, b = 0,
        a = 0;
    var f = (Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (c = 1900; c < 2100 && f > 0; c++) {
        a = lYearDays(c);
        f -= a;
    }
    if (f < 0) {
        f += a;
        c--;
    }
    this.year = c;
    b = leapMonth(c);
    this.isLeap = false;
    for (c = 1; c < 13 && f > 0; c++) {
        if (b > 0 && c == (b + 1) && this.isLeap == false) {
            --c;
            this.isLeap = true;
            a = leapDays(this.year);
        } else {
            a = monthDays(this.year, c);
        }
        if (this.isLeap == true && c == (b + 1)) {
            this.isLeap = false;
        }
        f -= a;
    }
    if (f == 0 && b > 0 && c == b + 1) {
        if (this.isLeap) {
            this.isLeap = false;
        } else {
            this.isLeap = true;
            --c;
        }
    }
    if (f < 0) {
        f += a;
        --c;
    }
    this.month = c;
    this.day = f + 1;
}

function getSolarDate(f, a, h, b) {
    var j = 0;
    for (var e = 1900; e < f; e++) {
        j += lYearDays(e);
    }
    for (var e = 1; e < a; e++) {
        if (e == leapMonth(f)) {
            j += leapDays(f);
        }
        j += monthDays(f, e);
    }
    if (b) {
        j += monthDays(f, e);
    }
    j += parseInt(h) - 1;
    var g = new Date(1900, 0, 31);
    var c = new Date(g.valueOf() + j * 86400000);
    return c;
}

function solarDays(b, a) {
    if (a == 1) {
        return (((b % 4 == 0) && (b % 100 != 0) || (b % 400 == 0)) ? 29 : 28);
    } else {
        return (solarMonth[a]);
    }
}

function cyclical(a) {
    return (Gan[a % 10] + Zhi[a % 12]);
}

function calElement(a, h, l, b, g, e, f, j, c, k, m) {
    this.isToday = false;
    this.sYear = a;
    this.sMonth = h;
    this.sDay = l;
    this.week = b;
    this.lYear = g;
    this.lMonth = e;
    this.lDay = f;
    this.isLeap = j;
    this.cYear = c;
    this.cMonth = k;
    this.cDay = m;
    this.color = "";
    this.lunarFestival = "";
    this.solarFestival = "";
    this.solarTerms = "";
}

function sTerm(c, b) {
    var a = new Date((31556925974.7 * (c - 1900) + sTermInfo[b] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (a.getUTCDate());
}

function sTerm_spring(b) {
    var a = term_spring[b];
    if (a != undefined) {
        return a;
    } else {
        return 4;
    }
}

function calendar(j, s) {
    var z, k, x, b, h = 1,
        f, A = 0,
        q, o, l;
    var w, a, g;
    var e = new Array(3);
    var r = 0;
    var c = 0;
    z = new Date(j, s, 1, 0, 0, 0, 0);
    this.length = solarDays(j, s);
    this.firstWeek = z.getDay();
    if (s < 2) {
        w = cyclical(j - 1900 + 36 - 1);
    } else {
        w = cyclical(j - 1900 + 36);
    }
    var u = sTerm_spring(j);
    var t = sTerm(j, s * 2);
    a = cyclical((j - 1900) * 12 + s + 12);
    var p = Date.UTC(j, s, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    for (var v = 0; v < this.length; v++) {
        if (h > A) {
            z = new Date(j, s, v + 1);
            k = new Lunar(z);
            x = k.year;
            b = k.month;
            h = k.day;
            f = k.isLeap;
            A = f ? leapDays(x) : monthDays(x, b);
            if (r == 0) {
                c = b;
            }
            e[r++] = v - h + 1;
        }
        if (s == 1 && (v + 1) == u) {
            w = cyclical(j - 1900 + 36);
        }
        if ((v + 1) == t) {
            a = cyclical((j - 1900) * 12 + s + 13);
        }
        g = cyclical(p + v);
        this[v] = new calElement(j, s + 1, v + 1, nStr1[(v + this.firstWeek) % 7], x, b, h++, f, w, a, g);
    }
    q = sTerm(j, s * 2) - 1;
    o = sTerm(j, s * 2 + 1) - 1;
    this[q].solarTerms = solarTerm[s * 2];
    this[o].solarTerms = solarTerm[s * 2 + 1];
    for (v in sFtv) {
        if (sFtv[v].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
            if (Number(RegExp.$1) == (s + 1)) {
                this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + " ";
                if (RegExp.$3 == "*") {
                    this[Number(RegExp.$2) - 1].color = "red";
                }
            }
        }
    }
    for (v in wFtv) {
        if (wFtv[v].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {
            if (Number(RegExp.$1) == (s + 1)) {
                q = Number(RegExp.$2);
                o = Number(RegExp.$3);
                if (q < 5) {
                    this[((this.firstWeek > o) ? 7 : 0) + 7 * (q - 1) + o - this.firstWeek].solarFestival += RegExp.$5 + " ";
                } else {
                    q -= 5;
                    l = (this.firstWeek + this.length - 1) % 7;
                    this[this.length - l - 7 * q + o - (o > l ? 7 : 0) - 1].solarFestival += RegExp.$5 + " ";
                }
            }
        }
    }
    for (v in lFtv) {
        if (lFtv[v].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            q = Number(RegExp.$1) - c;
            if (q == -11) {
                q = 1;
            }
            if (q >= 0 && q < r) {
                o = e[q] + Number(RegExp.$2) - 1;
                if (o >= 0 && o < this.length && this[o].isLeap != true) {
                    this[o].lunarFestival += RegExp.$4 + " ";
                    if (RegExp.$3 == "*") {
                        this[o].color = "red";
                    }
                }
            }
        }
    }
}

function cDay(b) {
    var a;
    switch (b) {
        case 10:
            a = "初十";
            break;
        case 20:
            a = "二十";
            break;
            break;
        case 30:
            a = "三十";
            break;
            break;
        default:
            a = nStr2[Math.floor(b / 10)];
            a += nStr1[b % 10];
    }
    return (a);
}
var worktime = {};
worktime.y2012 = {
    d0101: {
        w: "放假"
    },
    d0102: {
        w: "放假"
    },
    d0103: {
        w: "放假"
    },
    d0121: {
        w: "上班"
    },
    d0122: {
        w: "放假"
    },
    d0123: {
        w: "放假"
    },
    d0124: {
        w: "放假"
    },
    d0125: {
        w: "放假"
    },
    d0126: {
        w: "放假"
    },
    d0127: {
        w: "放假"
    },
    d0128: {
        w: "放假"
    },
    d0129: {
        w: "上班"
    },
    d0331: {
        w: "上班"
    },
    d0401: {
        w: "上班"
    },
    d0402: {
        w: "放假"
    },
    d0403: {
        w: "放假"
    },
    d0404: {
        w: "放假"
    },
    d0428: {
        w: "上班"
    },
    d0429: {
        w: "放假"
    },
    d0430: {
        w: "放假"
    },
    d0501: {
        w: "放假"
    },
    d0622: {
        w: "放假"
    },
    d0623: {
        w: "放假"
    },
    d0624: {
        w: "放假"
    },
    d0929: {
        w: "上班"
    },
    d0930: {
        w: "放假"
    },
    d1001: {
        w: "放假"
    },
    d1002: {
        w: "放假"
    },
    d1003: {
        w: "放假"
    },
    d1004: {
        w: "放假"
    },
    d1005: {
        w: "放假"
    },
    d1006: {
        w: "放假"
    },
    d1007: {
        w: "放假"
    }
};
worktime.y2013 = {
    d0101: {
        w: "放假"
    },
    d0102: {
        w: "放假"
    },
    d0103: {
        w: "放假"
    },
    d0105: {
        w: "上班"
    },
    d0106: {
        w: "上班"
    },
    d0209: {
        w: "放假"
    },
    d0210: {
        w: "放假"
    },
    d0211: {
        w: "放假"
    },
    d0212: {
        w: "放假"
    },
    d0213: {
        w: "放假"
    },
    d0214: {
        w: "放假"
    },
    d0215: {
        w: "放假"
    },
    d0216: {
        w: "上班"
    },
    d0217: {
        w: "上班"
    },
    d0404: {
        w: "放假"
    },
    d0405: {
        w: "放假"
    },
    d0406: {
        w: "放假"
    },
    d0407: {
        w: "上班"
    },
    d0427: {
        w: "上班"
    },
    d0428: {
        w: "上班"
    },
    d0429: {
        w: "放假"
    },
    d0430: {
        w: "放假"
    },
    d0501: {
        w: "放假"
    },
    d0608: {
        w: "上班"
    },
    d0609: {
        w: "上班"
    },
    d0610: {
        w: "放假"
    },
    d0611: {
        w: "放假"
    },
    d0612: {
        w: "放假"
    },
    d0919: {
        w: "放假"
    },
    d0920: {
        w: "放假"
    },
    d0921: {
        w: "放假"
    },
    d0922: {
        w: "上班"
    },
    d0929: {
        w: "上班"
    },
    d1001: {
        w: "放假"
    },
    d1002: {
        w: "放假"
    },
    d1003: {
        w: "放假"
    },
    d1004: {
        w: "放假"
    },
    d1005: {
        w: "放假"
    },
    d1006: {
        w: "放假"
    },
    d1007: {
        w: "放假"
    },
    d1012: {
        w: "上班"
    }
};
worktime.y2014 = {
    d0101: {
        w: "放假"
    },
    d0126: {
        w: "上班"
    },
    d0131: {
        w: "放假"
    },
    d0201: {
        w: "放假"
    },
    d0202: {
        w: "放假"
    },
    d0203: {
        w: "放假"
    },
    d0204: {
        w: "放假"
    },
    d0205: {
        w: "放假"
    },
    d0206: {
        w: "放假"
    },
    d0208: {
        w: "上班"
    },
    d0405: {
        w: "放假"
    },
    d0406: {
        w: "放假"
    },
    d0407: {
        w: "放假"
    },
    d0501: {
        w: "放假"
    },
    d0502: {
        w: "放假"
    },
    d0503: {
        w: "放假"
    },
    d0504: {
        w: "上班"
    },
    d0531: {
        w: "放假"
    },
    d0601: {
        w: "放假"
    },
    d0602: {
        w: "放假"
    },
    d0906: {
        w: "放假"
    },
    d0907: {
        w: "放假"
    },
    d0908: {
        w: "放假"
    },
    d0928: {
        w: "上班"
    },
    d1001: {
        w: "放假"
    },
    d1002: {
        w: "放假"
    },
    d1003: {
        w: "放假"
    },
    d1004: {
        w: "放假"
    },
    d1005: {
        w: "放假"
    },
    d1006: {
        w: "放假"
    },
    d1007: {
        w: "放假"
    },
    d1011: {
        w: "上班"
    }
};
worktime.y2016 = {
    d0101: {
        w: "放假"
    },
    d0102: {
        w: "放假"
    },
    d0103: {
        w: "放假"
    },
    d0206: {
        w: "上班"
    },
    d0207: {
        w: "放假"
    },
    d0208: {
        w: "放假"
    },
    d0209: {
        w: "放假"
    },
    d0210: {
        w: "放假"
    },
    d0211: {
        w: "放假"
    },
    d0212: {
        w: "放假"
    },
    d0213: {
        w: "放假"
    },
    d0214: {
        w: "上班"
    },
    d0402: {
        w: "放假"
    },
    d0403: {
        w: "放假"
    },
    d0404: {
        w: "放假"
    },
    d0430: {
        w: "放假"
    },
    d0501: {
        w: "放假"
    },
    d0502: {
        w: "放假"
    },
    d0609: {
        w: "放假"
    },
    d0610: {
        w: "放假"
    },
    d0611: {
        w: "放假"
    },
    d0612: {
        w: "上班"
    },
    d0915: {
        w: "放假"
    },
    d0916: {
        w: "放假"
    },
    d0917: {
        w: "放假"
    },
    d1001: {
        w: "放假"
    },
    d1002: {
        w: "放假"
    },
    d1003: {
        w: "放假"
    },
    d1004: {
        w: "放假"
    },
    d1005: {
        w: "放假"
    },
    d1006: {
        w: "放假"
    },
    d1007: {
        w: "放假"
    },
    d0918: {
        w: "上班"
    },
    d1008: {
        w: "上班"
    },
    d1008: {
        w: "上班"
    },
};
var festival_main = {
    "2016_01_01": "元旦",
    "2016_02_07": "春节",
    "2016_04_04": "清明节",
    "2016_05_01": "劳动节",
    "2016_06_09": "端午节",
    "2016_09_15": "中秋节",
    "2016_10_01": "国庆节"
};
$.dom = function(a) {
    return document.getElementById(a);
};

function StringBuffer() {
    this._strings = new Array();
}
StringBuffer.prototype.append = function(a) {
    this._strings.push(a);
    return this;
};
StringBuffer.prototype.toString = function() {
    var a = arguments.length == 0 ? "" : arguments[0];
    return this._strings.join(a);
};
String.prototype.leftpad = function(a, e) {
    if (!e) {
        e = "0";
    }
    var c = "";
    for (var b = 0; b < a - this.length; b++) {
        c += e;
    }
    return c + this;
};

function getMonthKey(a, b) {
    return a.toString() + (b + 1).toString().leftpad(2);
}

function getDateKey(a) {
    return a.getFullYear().toString() + "-" + (a.getMonth() + 1).toString().leftpad(2) + "-" + a.getDate().toString().leftpad(2);
}

function is_leap_year(a) {
    if (a % 400 == 0 || (a % 100 != 0 && a % 4 == 0)) {
        return 1;
    }
    return 0;
}

function getDaysByMonth(a) {
    var b = [
        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    ];
    return b[is_leap_year(a.getFullYear())][a.getMonth()];
}
var cacheMgr = {
    cldCache: {},
    getCld: function(c, e) {
        var a = getMonthKey(c, e);
        var b = this.cldCache[a];
        if (typeof b == "undefined") {
            b = new calendar(c, e);
            this.cldCache[a] = b;
        }
        return b;
    }
};
var cal365 = {};
cal365.date = {
    date_part: function(a) {
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0);
        return a;
    },
    month_view_start: function(b, a) {
        return this.week_start(this.month_start(b), a);
    },
    week_start: function(c, b) {
        var a = c.getDay();
        if (b) {
            if (a == 0) {
                a = 6;
            } else {
                a--;
            }
        }
        return this.date_part(this.add(c, -1 * a, "day"));
    },
    month_start: function(a) {
        a.setDate(1);
        return this.date_part(a);
    },
    add: function(b, c, e) {
        var a = new Date(b.valueOf());
        switch (e) {
            case "day":
                a.setDate(a.getDate() + c);
                break;
            case "week":
                a.setDate(a.getDate() + 7 * c);
                break;
            case "month":
                a.setMonth(a.getMonth() + c);
                break;
            case "year":
                a.setYear(a.getFullYear() + c);
                break;
            case "hour":
                a.setHours(a.getHours() + c);
                break;
            case "minute":
                a.setMinutes(a.getMinutes() + c);
                break;
            default:
                return defaults.date["add_" + e](b, c, e);
        }
        return a;
    },
    to_fixed: function(a) {
        if (a < 10) {
            return "0" + a;
        }
        return a;
    },
    copy: function(a) {
        return new Date(a.valueOf());
    },
    date_to_str: function(b, a) {
        b = b.replace(/%[a-zA-Z]/g, function(c) {
            switch (c) {
                case "%d":
                    return '"+cal365.date.to_fixed(date.getDate())+"';
                case "%m":
                    return '"+cal365.date.to_fixed((date.getMonth()+1))+"';
                case "%j":
                    return '"+date.getDate()+"';
                case "%n":
                    return '"+(date.getMonth()+1)+"';
                case "%y":
                    return '"+cal365.date.to_fixed(date.getYear()%100)+"';
                case "%Y":
                    return '"+date.getFullYear()+"';
                case "%D":
                    return '"+cal365.locale.date.day_short[date.getDay()]+"';
                case "%l":
                    return '"+cal365.locale.date.day_full[date.getDay()]+"';
                case "%M":
                    return '"+cal365.locale.date.month_short[date.getMonth()]+"';
                case "%F":
                    return '"+cal365.locale.date.month_full[date.getMonth()]+"';
                case "%h":
                    return '"+cal365.date.to_fixed((date.getHours()+11)%12+1)+"';
                case "%H":
                    return '"+cal365.date.to_fixed(date.getHours())+"';
                case "%i":
                    return '"+cal365.date.to_fixed(date.getMinutes())+"';
                case "%a":
                    return '"+(date.getHours()>11?"pm":"am")+"';
                case "%A":
                    return '"+(date.getHours()>11?"PM":"AM")+"';
                case "%s":
                    return '"+cal365.date.to_fixed(date.getSeconds())+"';
                default:
                    return c;
            }
        });
        if (a) {
            b = b.replace(/date\.get/g, "date.getUTC");
        }
        return new Function("date", 'return "' + b + '";');
    },
    str_to_date: function(f, c) {
        var g = "var temp=date.split(/[^0-9a-zA-Z]+/g);";
        var a = f.match(/%[a-zA-Z]/g);
        for (var b = 0; b < a.length; b++) {
            switch (a[b]) {
                case "%j":
                case "%d":
                    g += "set[2]=temp[" + b + "]||0;";
                    break;
                case "%n":
                case "%m":
                    g += "set[1]=(temp[" + b + "]||1)-1;";
                    break;
                case "%y":
                    g += "set[0]=temp[" + b + "]*1+(temp[" + b + "]>50?1900:2000);";
                    break;
                case "%h":
                case "%H":
                    g += "set[3]=temp[" + b + "]||0;";
                    break;
                case "%i":
                    g += "set[4]=temp[" + b + "]||0;";
                    break;
                case "%Y":
                    g += "set[0]=temp[" + b + "]||0;";
                    break;
                case "%a":
                case "%A":
                    g += "set[3]=set[3]%12+((temp[" + b + "]||'').toLowerCase()=='am'?0:12);";
                    break;
                case "%s":
                    g += "set[5]=temp[" + b + "]||0;";
                    break;
            }
        }
        var e = "set[0],set[1],set[2],set[3],set[4],set[5]";
        if (c) {
            e = " Date.UTC(" + e + ")";
        }
        return new Function("date", "var set=[0,0,0,0,0,0]; " + g + " return new Date(" + e + ");");
    }
};
cal365.templates = {};
cal365.config = {
    default_date: "%Y-%m-%d %H:%i",
    month_date: "%F %Y",
    load_date: "%Y-%m-%d",
    week_date: "%l",
    day_date: "%D, %F %j",
    hour_date: "%H:%i",
    month_day: "%d",
    xml_date: "%Y/%m/%d %H:%i",
    api_date: "%Y-%m-%d %H:%i",
    server_utc: false
};
cal365.init_templates = function() {
    var b = cal365.date.date_to_str;
    var e = cal365.config;
    var a = function(g, f) {
        for (var h in f) {
            if (!g[h]) {
                g[h] = f[h];
            }
        }
    };
    a(cal365.templates, {
        day_date: b(e.default_date),
        month_date: b(e.month_date),
        week_date: function(f, c) {
            return cal365.templates.day_date(f) + " &ndash; " + cal365.templates.day_date(cal365.date.add(c, -1, "day"));
        },
        day_scale_date: b(e.default_date),
        month_scale_date: b(e.week_date),
        week_scale_date: b(e.day_date),
        hour_scale: b(e.hour_date),
        time_picker: b(e.hour_date),
        event_date: b(e.hour_date),
        month_day: b(e.month_day),
        xml_date: cal365.date.str_to_date(e.xml_date, e.server_utc),
        load_format: b(e.load_date, e.server_utc),
        xml_format: b(e.xml_date, e.server_utc),
        api_date: cal365.date.str_to_date(e.api_date),
        event_header: function(g, c, f) {
            return cal365.templates.event_date(g) + " - " + cal365.templates.event_date(c);
        },
        event_text: function(g, c, f) {
            return f.text;
        },
        event_class: function(g, c, f) {
            return "";
        },
        month_date_class: function(c) {
            return "";
        },
        week_date_class: function(c) {
            return "";
        },
        event_bar_date: function(g, c, f) {
            return cal365.templates.event_date(g) + " ";
        },
        event_bar_text: function(g, c, f) {
            return f.text;
        }
    });
};
cal365.locale = {
    date: {
        month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        day_short: ["日", "一", "二", "三", "四", "五", "六"]
    }
};
var CalUtil = {
    monthViewInfo: function(c, f) {
        var a = cal365.date;
        var e = {};
        var g = a.copy(c);
        g = a.month_view_start(g, f);
        e.start = a.copy(a.week_start(g, f));
        var b = a.copy(c);
        b.setMonth(c.getMonth() + 1);
        b.setDate(1);
        e.row = Math.ceil((b.valueOf() - g.valueOf()) / 604800000);
        e.end = a.add(e.start, 7 * e.row, "day");
        return e;
    }
};
var DataHandler = {
    cachedData: {
        from: new Date(),
        to: new Date()
    },
    loadCld: {},
    getLoadCld: function(g, c, b) {
        var f = [];
        var h = getDateKey(g) + "-" + getDateKey(c);
        for (var a = 0; a < b.length; a++) {
            var e = h + "-" + b[a];
            if (typeof DataHandler.loadCld[e] == "undefined") {
                f.push(b[a]);
                DataHandler.loadCld[e] = {};
            }
        }
        if (f.length > 0) {
            return f.join(",");
        } else {
            return false;
        }
    },
    resultData: {},
    resultDataById: {},
    getSchByPeriod: function(g, e, h) {
        var b = g,
            f = e;
        if (g >= this.cachedData.from) {
            b = this.cachedData.to;
        }
        if (e <= this.cachedData.to) {
            f = this.cachedData.from;
        }
        var c = calendarHandler.getSelectedArray();
        var a = DataHandler.getLoadCld(g, e, c);
        if (a) {
            $.ajax({
                data: {
                    fromDate: cal365.templates.load_format(g),
                    toDate: cal365.templates.load_format(e),
                    timeZone: -(new Date()).getTimezoneOffset() / 60,
                    calendarId: a
                },
                url: "http://www.365rili.com/schedule/list.jsonp",
                dataType: "jsonp",
                jsonp: "callback",
                success: function(j) {
                    for (var l = 0; l < j.length; l++) {
                        var k = j[l];
                        DataHandler.formatSchData(k.schlist, f);
                    }
                    if (DataHandler.cachedData.from > b) {
                        DataHandler.cachedData.from = b;
                    }
                    if (DataHandler.cachedData.to < f) {
                        DataHandler.cachedData.to = f;
                    }
                    if (h) {
                        h();
                    }
                }
            });
        } else {
            if (h) {
                h();
            }
        }
    },
    getSchByMonth: function(b, f, c) {
        var e = cal365.date.month_view_start(b, c);
        var a = cal365.date.add(e, CalUtil.monthViewInfo(b, c).row * 7, "day");
        this.getSchByPeriod(e, a, f);
    },
    getSchedulesByRange: function(m, p, h, l) {
        var r = {};
        var n = h || DataHandler.resultData;
        if (typeof m == "string") {
            m = cal365.templates.api_date(m);
        }
        if (typeof p == "string") {
            p = cal365.templates.api_date(p);
        }
        m = cal365.date.date_part(m);
        p = cal365.date.date_part(p);
        for (; m <= p;) {
            var e = "d" + getDateKey(m);
            r[e] = {
                schList: [],
                num: 0
            };
            if (n[e]) {
                var b = [];
                for (var f = 0; f < n[e].schList.length; f++) {
                    var o = n[e].schList[f];
                    for (var a = 0; a < l.length; a++) {
                        if (o.cid == l[a]) {
                            b.push(o);
                            break;
                        }
                    }
                }
                r[e].schList = b;
                r[e].num = b.length;
            }
            m = cal365.date.add(m, 1, "day");
        }
        var c = 0;
        for (var g in r) {
            var e = r[g];
            if (e.num > c) {
                c = e.num;
            }
        }
        r.maxNum = c;
        return r;
    },
    formatSchData: function(f, e) {
        var q = {};
        for (var g = 0; g < f.length; g++) {
            var a = f[g];
            if ("" == a.text) {
                a.text = "(无标题)";
            }
            var j = cal365.templates.api_date(a.start_time);
            var l = new Date(j.valueOf() + a.duration * 1000);
            var b = cal365.date.copy(j);
            var p = cal365.date.add(cal365.date.date_part(b), 1, "day");
            a.isDisplay = 0;
            if (p >= l) {
                var n = "d" + getDateKey(j);
                if (!q[n]) {
                    q[n] = {
                        schList: []
                    };
                }
                q[n].schList.push(a);
            } else {
                var o = cal365.date.copy(j);
                for (; o < l && o < e;) {
                    var c = "d" + getDateKey(o);
                    var h = DataHandler.copySch(a);
                    h.cross_st = cal365.templates.day_date(o) + ":00";
                    var m = cal365.date.add(cal365.date.date_part(o), 1, "day");
                    if (m <= l) {
                        h.cross_et = cal365.templates.day_date(m) + ":00";
                    } else {
                        h.cross_et = cal365.templates.day_date(l) + ":00";
                    }
                    if (!q[c]) {
                        q[c] = {
                            schList: []
                        };
                    }
                    q[c].schList.push(h);
                    o = m;
                }
            }
        }
        DataHandler.mergeData(DataHandler.resultData, q);
        DataHandler.formatSchDataById(f);
    },
    formatSchDataById: function(c) {
        var a = {};
        for (var b = 0; b < c.length; b++) {
            a[c[b].id] = c[b];
        }
        $.extend(true, DataHandler.resultDataById, a);
    },
    mergeData: function(g, f) {
        for (var c in f) {
            if (g[c]) {
                var h = f[c]["schList"];
                var k = g[c]["schList"];
                for (var e = 0; e < h.length; ++e) {
                    var a = false;
                    for (var b = 0; b < k.length; ++b) {
                        if (k[b].id == h[e].id) {
                            k[b] = h[e];
                            a = true;
                            break;
                        }
                    }
                    if (!a) {
                        k.push(h[e]);
                    }
                }
            } else {
                g[c] = f[c];
            }
            g[c].schList.sort(function(m, j) {
                if (m.allday_event) {
                    return -1;
                }
                if (j.allday_event) {
                    return 1;
                }
                var n = cal365.templates.api_date(m.start_time).getTime();
                var l = cal365.templates.api_date(j.start_time).getTime();
                return (n - l);
            });
        }
    },
    delSchById: function(e) {
        for (var a in DataHandler.resultData) {
            var c = DataHandler.resultData[a]["schList"];
            for (var b = 0; b < c.length; ++b) {
                if (c[b].id == e) {
                    c.splice(b, 1);
                    --b;
                }
            }
        }
        delete DataHandler.resultDataById[e];
    },
    updateSch: function(b, a) {
        DataHandler.delSchById(b[0].id);
        DataHandler.formatSchData(b, a);
    },
    copySch: function(b) {
        var a = function() {};
        a.prototype = b;
        return new a();
    }
};
(function(j) {
    var l = true,
        a = /^d(\d{4})-(\d{2})-(\d{2})/,
        b = /^0/,
        q = null,
        m = null,
        n = null,
        o = null,
        g = null;
    var f = function(s) {},
        h = function(s) {
            if (s instanceof Date) {
                m = s;
            } else {
                m = null;
            }
        },
        r = function(s) {
            if (m) {
                DataHandler.getSchByMonth(m, function() {
                    var v = CalUtil.monthViewInfo(m, l);
                    var u = v.start,
                        w = v.end;
                    var t = new Array();
                    t.push(q);
                    g = DataHandler.getSchedulesByRange(u, w, DataHandler.resultData, t);
                    if (s) {
                        s();
                    }
                }, l);
            }
        },
        e = function(x, s, t, v, y) {
            var w = {};
            w.schTitle = x;
            w.alldayEvent = s;
            if (s) {
                w.startTime = getDateKey(n) + " 09:00:00";
            } else {
                t = t + "";
                v = v + "";
                w.startTime = getDateKey(n) + " " + t.leftpad(2) + ":" + v.leftpad(2) + ":00";
            }
            w.timeZone = -(new Date()).getTimezoneOffset() / 60;
            var u = cal365.date.add(cal365.templates.api_date(w.startTime), 1, "day");
            $.ajax({
                data: w,
                url: "http://www.365rili.com/schedule/update.jsonp",
                dataType: "jsonp",
                jsonp: "callback",
                success: function(z) {
                    for (var B = 0; B < z.length; B++) {
                        var A = z[B];
                        DataHandler.formatSchData(A.schlist, u);
                    }
                    r(function() {
                        for (var E in g) {
                            if (E != "maxNum") {
                                var D = g[E].num;
                                var C = E.replace(a, function(H, G, I, F) {
                                    return G + "-" + I.replace(b, "") + "-" + F.replace(b, "");
                                });
                                if (D > 0) {
                                    y(cal365.templates.api_date(C));
                                }
                            }
                        }
                    });
                }
            });
        },
        k = function(v, u) {
            var s = 0;
            var t;
            for (t = 0; t < v.length; t++) {
                var w = v.charCodeAt(t);
                if ((w >= 1 && w <= 126) || (65376 <= w && w <= 65439)) {
                    s++;
                } else {
                    s += 2;
                }
                if (s >= u) {
                    return v.substring(0, t + 1);
                }
            }
            return v;
        };
    var c = {
        drawSch: function(w) {
            $("#taskList").children().remove();
            var s = [];
            if (w.length > 0) {
                for (var v = 0; v < 3 && v < w.length; v++) {
                    var x = k(w[v].text, 10);
                    if (x.length < w[v].text.length) {
                        x += "...";
                    }
                    var t = "&nbsp;";
                    if (!w[v].allday_event) {
                        var u = w[v].start_time.split(" ")[1].split(":");
                        u.splice(2);
                        t = u.join(":") + "&nbsp;";
                    }
                    s.push("<div class='workitem'>");
                    s.push("<div class='tastWorkDot'></div>");
                    if (!w[v].allday_event) {
                        s.push("<div class='taskWorkTime'>" + t + "</div>");
                        s.push("<div style='margin-left:5px;'>" + x + "</div>");
                    } else {
                        s.push("<div style='margin-left:11px;'>" + x + "</div>");
                    }
                    s.push("</div>");
                }
            }
            $("#taskList").html(s.join(""));
        }
    };
    var p = {
        init: function(s) {
            if (typeof s == "number") {
                q = s;
            } else {
                if (typeof s == "string") {
                    q = parseInt(s);
                }
            }
            m = n = new Date();
            cal365.init_templates();
        },
        isLogin: function() {
            return !!q;
        },
        getSelectedArray: function() {
            var s = new Array();
            s.push(q);
            return s;
        },
        prepareData4: function(t, u, v) {
            var s = new Date();
            s.setYear(t);
            s.setMonth(u - 1);
            s.setDate(1);
            h(s);
            r(function() {
                for (var y in g) {
                    if (y != "maxNum") {
                        var x = g[y].num;
                        var w = y.replace(a, function(C, B, D, A) {
                            return B + "-" + D.replace(b, "") + "-" + A.replace(b, "");
                        });
                        if (x > 0) {
                            var z = cal365.templates.api_date(w);
                            v(z);
                        }
                    }
                }
            });
        },
        getSelectedDate: function() {
            return n;
        },
        setSelectedDate: function(s) {
            if (typeof s == "string") {
                n = cal365.templates.api_date(s);
            } else {
                if (s instanceof Date) {
                    n = s;
                }
            }
        },
        getSch: function() {
            return g["d" + getDateKey(o)];
        },
        addSch: function(v, s, t, u, w) {
            e(v, s, t, u, w);
        },
        drawSch: function() {
            if (this.isLogin()) {
                c.drawSch(this.getSch().schList);
            }
        },
        setHoverDate: function(s) {
            if (typeof s == "string") {
                o = cal365.templates.api_date(s);
            } else {
                if (s instanceof Date) {
                    o = s;
                }
            }
        }
    };
    if (j.calendarHandler) {
        j._calendarHandler = j.calendarHandler;
    }
    j.calendarHandler = p;
})(window);
var HuangLi = {};
var calData = new Array();
var currentDate = new Date();
var rows;
var showingToday = true;
var taskHover_inblock = false;
var taskHover_inhover = false;
var madeRiliDate = new Date();
var record = {
    elem_id: "",
    nav_date: new Date()
};
var timeSelf = 0;
var timeBeijing;

function clock(a) {
    timeSelf = (new Date()).getTime();
    timeBeijing = a * 1000;
}
var calander = {
    init: function() {
        makeCal.pareData(new Date());
        makeCal.showCal(new Date());
        makeCal.initAction();
        makeCal.makeHuangli(currentDate);
    },
    pareData: function(g) {
        g = makeCal.setTimeZero(g);
        madeRiliDate = new Date(g);
        var e = makeCal.getMonthFirst(g);
        var f = makeCal.getWeekFirst(e);
        var h = makeCal.addTime(e, 1, "month");
        var b = makeCal.addTime(h, -1, "day");
        rows = Math.ceil((h.valueOf() - f.valueOf()) / (60 * 60 * 24 * 1000 * 7));
        var a = new Date(f);
        var c = makeCal.setTimeZero(new Date());
        makeCal.fillCalData(a, e, b, c);
    },
    fillCalData: function(b, g, h, l) {
        calData = [];
        for (var e = 0; e < rows; e++) {
            var a = [];
            for (var c = 0; c < 7; c++) {
                var f = makeCal.createDay();
                f.year = b.getFullYear();
                f.month = b.getMonth();
                f.date = b.getDate();
                if (b.getTime() < g.getTime()) {
                    f.before = true;
                } else {
                    if (b.getTime() > h.getTime()) {
                        f.after = true;
                    }
                }
                if (b.getTime() == l.getTime()) {
                    f.today = true;
                }
                if (c == 5 || c == 6) {
                    f.weekend = true;
                }
                f.rows = rows;
                f.inrow = e + 1;
                f.value = b;
                f.china = templates.lunar_Info(f.value);
                var k = f.value.getFullYear() + "-" + (f.value.getMonth() + 1) + "-" + f.value.getDate();
                switch (k) {
                    case "2011-11-22":
                        f.china.l_day = "廿七";
                        f.china.color = "";
                        break;
                    case "2011-11-23":
                        f.china.l_day = "小雪";
                        f.china.color = "#bc5016";
                        break;
                    case "2012-1-1":
                        f.china.l_day = "元旦";
                        f.china.color = "#bc5016";
                        break;
                    case "2012-1-20":
                        f.china.l_day = "廿七";
                        f.china.color = "";
                        break;
                    case "2012-1-21":
                        f.china.l_day = "大寒";
                        f.china.color = "#bc5016";
                        break;
                }
                a.push(f);
                b = makeCal.addTime(b, 1, "day");
            }
            calData.push(a);
        }
    },
    prepareData4Festival: function(j, b) {
        b = makeCal.setTimeZero(b);
        madeRiliDate = new Date(b);
        var f = b,
            m = b;
        while (true) {
            var h = worktime["y" + f.getFullYear()];
            var a = getMonthDateStr(f);
            if (h["d" + a]) {
                f = makeCal.addTime(f, -1, "day");
            } else {
                f = makeCal.addTime(f, 1, "day");
                break;
            }
        }
        while (true) {
            var h = worktime["y" + m.getFullYear()];
            var a = getMonthDateStr(m);
            if (h["d" + a]) {
                m = makeCal.addTime(m, 1, "day");
            } else {
                m = makeCal.addTime(m, -1, "day");
                break;
            }
        }
        var g = f;
        var e = makeCal.getWeekFirst(g);
        var k = m;
        rows = 5;
        var c = new Date(e);
        var l = makeCal.setTimeZero(new Date());
        makeCal.fillCalData(c, g, k, l);
    },
    showCal: function(c) {
        if (typeof(c) == "undefined") {
            c = date = makeCal.setTimeZero(new Date());
        }
        c = makeCal.setTimeZero(c);
        $("#festival_detail_str").text("");
        $("#festival_raiders").text("");
        $("#month_num").text(c.getMonth() + 1);
        $("#year_num").text(c.getFullYear());
        var q = "<table> 						<thead class='tablehead'> 							<tr> 								<td class='thead" + rows + "'>一</td> 								<td class='thead" + rows + "'>二</td> 								<td class='thead" + rows + "'>三</td> 								<td class='thead" + rows + "'>四</td> 								<td class='thead" + rows + "'>五</td> 								<td class='thead" + rows + "' style='color:#bc5016;'>六</td> 								<td class='thead" + rows + "' style='color:#bc5016;'>日</td> 							</tr> 						</thead> 						<tbody>";
        var r = "";
        for (var g = 0; g < rows; g++) {
            var a = "<tr>";
            for (var f = 0; f < 7; f++) {
                var r = "";
                if (calData[g][f].before == true) {
                    r = "before";
                } else {
                    if (calData[g][f].after == true) {
                        r = "after";
                    }
                }
                var b = getMonthDateStr(calData[g][f].value);
                var l = "";
                try {
                    var m = worktime["y" + calData[g][f].year];
                    if (m) {
                        l = m["d" + b];
                    }
                } catch (k) {}
                var n = "";
                if (l) {
                    if (l.w == "上班") {
                        r = "workBlock";
                        n = "work";
                    } else {
                        r = "restBlock";
                        n = "rest";
                    }
                }
                if (calData[g][f].today == true) {
                    r = "today today" + calData[g][f].rows;
                }
                var p = "number";
                if (calData[g][f].weekend == true) {
                    p = "weekendNum";
                }
                if (calData[g][f].before) {
                    p = "before number";
                } else {
                    if (calData[g][f].after) {
                        p = "after number";
                    }
                }
                var o = "";
                if (calData[g][f].today == false && calData[g][f].value.getTime() == c.getTime()) {
                    o = " clickBlock" + calData[g][f].rows;
                }
                var h = "<td i=" + g + " j=" + f + " class='block block" + calData[g][f].rows + " " + r + o + "'>";
                h += "<div class='block_content block_content" + calData[g][f].rows + "'>";
                if (n == "work") {
                    h += "<div class='workrest work'></div>";
                } else {
                    if (n == "rest") {
                        h += "<div class='workrest rest'></div>";
                    }
                }
                if (calData[g][f].today == false) {
                    h += "	<div class='" + p + " number" + calData[g][f].rows + "'>" + calData[g][f].date + "</div>								<div class='chinaday chinaday" + calData[g][f].rows + " festival' style='color: " + calData[g][f].china.color + "'>" + calData[g][f].china.l_day + "</div>";
                } else {
                    h += "	<div class='" + p + " number" + calData[g][f].rows + "'>" + calData[g][f].date + "</div>								<div class='chinaday chinaday" + calData[g][f].rows + " festival'>" + calData[g][f].china.l_day + "</div>";
                }
                if (calData[g][f].hasWork) {
                    h += "<img class='workDot workDot" + calData[g][f].rows + "' src='http://baidu365.cdn.duapp.com/wannianlibaidu/BD_images/dot.png'/>";
                }
                h += "</div></td>";
                a += h;
            }
            a += "<tr>";
            q += a;
        }
        q += "</tbody></table>";
        $("#mainCal").empty();
        $("#mainCal").append(q);
        calendarHandler.prepareData4(c.getFullYear(), (c.getMonth() + 1), this.appendScheduleIcon);
        makeCal.makeAction();
    },
    appendScheduleIcon: function(b) {
        if (b.getTime() < calData[0][0].value.getTime()) {
            return false;
        }
        var e = (b.getTime() - calData[0][0].value.getTime()) / 86400000;
        if (e > (7 * rows - 1)) {
            return false;
        }
        var c = Math.floor(e / 7),
            a = Math.floor(e) % 7;
        if (!(calData[c][a].hasWork)) {
            calData[c][a].hasWork = true;
            $("td[i=" + c + "][j=" + a + "] div:first-child").append("<img class='workDot workDot" + calData[c][a].rows + "' src='http://baidu365.cdn.duapp.com/wannianlibaidu/BD_images/dot.png'/>");
        }
    },
    initAction: function() {
        $("#next_button").bind("click", function(k) {
            var j = currentDate.getMonth();
            var g = currentDate.getFullYear();
            var f = madeRiliDate.getMonth();
            j = f;
            j++;
            if (j > 11) {
                j = 0;
                g++;
            }
            var h = f;
            currentDate = makeCal.addTime(currentDate, 1, "month");
            if (currentDate.getMonth() != (h + 1) % 12) {
                currentDate.setDate(1);
                currentDate.setMonth(h + 1);
            }
            $("#year_num").text(g);
            $("#month_num").text(j + 1);
            $("#festival").text("假期安排");
            makeCal.nextMonth(currentDate);
        });
        $("#prev_button").bind("click", function(k) {
            var j = currentDate.getMonth();
            var g = currentDate.getFullYear();
            var f = madeRiliDate.getMonth();
            j = f;
            j--;
            if (j < 0) {
                j = 11;
                g--;
            }
            var h = f;
            currentDate = makeCal.addTime(currentDate, -1, "month");
            if (currentDate.getMonth() != (h + 11) % 12) {
                currentDate.setDate(1);
                currentDate.setMonth((h + 11) % 12);
            }
            $("#year_num").text(g);
            $("#month_num").text(j + 1);
            $("#festival").text("假期安排");
            makeCal.prevMonth(currentDate);
        });
        $("#today_button").bind("click", function(f) {
            makeCal.showToday();
        });
        $("#top_bar_time").text(makeCal.get365riliTime());
        $("#year_num").text(currentDate.getFullYear());
        $("#month_num").text(currentDate.getMonth() + 1);
        setInterval(function() {
            var f = makeCal.get365riliTime();
            $("#top_bar_time").text(makeCal.get365riliTime());
            if (f == "00:00:00" && showingToday) {
                var g = new Date();
                makeCal.pareData(g);
                makeCal.showCal(g);
                makeCal.makeHuangli(g);
                $("#year_num").text(g.getFullYear());
                $("#month_num").text(g.getMonth() + 1);
            }
        }, 1000);
        $("#festival").bind("click", function(f) {
            if ($("#festival_select_selecter").css("display") == "block") {
                $("#festival_select_selecter").css({
                    display: "none"
                });
                return;
            }
            $("#festival_select_selecter").css({
                top: $("#festival").offset().top + 30 + "px"
            });
            $("#festival_select_selecter").css({
                left: $("#festival").position().left + 15 + "px"
            });
            $("#festival_select_selecter").css({
                display: "block"
            });
        });
        $("#month_func").bind("click", function(f) {
            if ($("#month_select_selecter").css("display") == "block") {
                $("#month_select_selecter").css({
                    display: "none"
                });
                return;
            }
            $("#month_select_selecter").css({
                top: $("#month_func").offset().top + 30 + "px"
            });
            $("#month_select_selecter").css({
                left: $("#month_func").position().left + "px"
            });
            $("#month_select_selecter").css({
                display: "block"
            });
        });
        $("#year_func").bind("click", function(f) {
            if ($("#year_select_selecter").css("display") == "block") {
                $("#year_select_selecter").css({
                    display: "none"
                });
                return;
            }
            $("#year_select_selecter").css({
                top: $("#year_func").offset().top + 30 + "px"
            });
            $("#year_select_selecter").css({
                left: $("#year_func").position().left + "px"
            });
            $("#year_select_selecter").css({
                display: "block"
            });
            var h = $("#year_num").text();
            var g = $("#yearitem" + h).position().top;
            $("#year_select_selecter").scrollTop(g);
        });
        for (var c = 1900; c <= 2050; c++) {
            $("#year_select_selecter").append('<div id="yearitem' + c + '" data=' + c + ' class="select_item year_item">' + c + "</div>");
        }
        for (var c = 1; c <= 12; c++) {
            $("#month_select_selecter").append("<div data=" + (c - 1) + ' class="select_item month_item">' + c + "月</div>");
        }
        for (var b in festival_main) {
            $("#festival_select_selecter").append("<div data=" + b + ' class="select_item festival_item">' + festival_main[b] + "</div>");
        }
        $("#popHourSelectList").append('<div class="hourItem" data="-1">全天</div>');
        for (var c = 0; c < 24; c++) {
            $("#popHourSelectList").append('<div class="hourItem" data="' + c + '">' + c + "点</div>");
        }
        for (var c = 0; c < 60; c += 5) {
            $("#popMinuteSelectList").append('<div class="minItem" data="' + c + '">' + c + "分</div>");
        }
        $("#popMinuteSelect").bind("click", function(f) {
            $("#popMinuteSelectList").css({
                display: "block"
            });
        });
        $("#popHourSelect").bind("click", function(f) {
            $("#popHourSelectList").css({
                display: "block"
            });
        });
        $(".minItem").bind("click", function(f) {
            $("#popMinuteSelectNumb").html($(f.target).html());
        });
        $(".hourItem").bind("click", function(f) {
            $("#popHourSelectNumb").html($(f.target).html());
            if ($(f.target).attr("data") == "-1") {
                $("#popMinuteSelect").css({
                    visibility: "hidden"
                });
            } else {
                $("#popMinuteSelect").css({
                    visibility: "visible"
                });
            }
        });
        $(".year_item").bind("click", function(f) {
            data = $(f.target).attr("data");
            currentDate.setFullYear(data);
            $("#year_num").text(currentDate.getFullYear());
            makeCal.pareData(currentDate);
            makeCal.showCal(currentDate);
            makeCal.makeHuangli(currentDate);
            $("#festival").text("假期安排");
            showingToday = false;
        });
        $(".month_item").bind("click", function(f) {
            data = $(f.target).attr("data");
            currentDate.setMonth(data);
            if (currentDate.getMonth() != data) {
                currentDate.setDate(1);
                currentDate.setMonth(data);
            }
            $("#month_num").text(currentDate.getMonth() + 1);
            makeCal.pareData(currentDate);
            makeCal.showCal(currentDate);
            makeCal.makeHuangli(currentDate);
            $("#festival").text("假期安排");
            showingToday = false;
        });
        $(".festival_item").bind("click", function(h) {
            var g = $(h.target).attr("data").split("_");
            currentDate.setFullYear(parseInt(g[0], 10));
            currentDate.setMonth(parseInt(g[1], 10) - 1, 1);
            currentDate.setDate(parseInt(g[2], 10));
            $("#year_num").text(currentDate.getFullYear());
            $("#month_num").text(currentDate.getMonth() + 1);
            $("#festival").text($(h.target).text());
            makeCal.prepareData4Festival((new Date()).getFullYear(), currentDate);
            makeCal.showCal(currentDate);
            makeCal.makeHuangli(currentDate);
            showingToday = false;
            var f = $(h.target).attr("data");
            if (f == "2016_01_01") {
                $("#festival_detail_str").text("2016年1月1日放假1天");
                $("#festival_raiders").text("");
            } else {
                if (f == "2016_02_07") {
                    $("#festival_detail_str").text("2月7日~2月8日放假，2月6日(周六)、2月14日（周日）上班");
                    $("#festival_raiders").text("");
                } else {
                    if (f == "2016_04_04") {
                        $("#festival_detail_str").text("4月2日~4日放假");
                        $("#festival_raiders").text("");
                    } else {
                        if (f == "2016_05_01") {
                            $("#festival_detail_str").text("5月1日~5月2日放假");
                            $("#festival_raiders").text("");
                        } else {
                            if (f == "2016_06_09") {
                                $("#festival_detail_str").text("6月9日~6月11日放假，共三天。6月12日(星期日)上班");
                                $("#festival_raiders").text("");
                            } else {
                                if (f == "2016_09_15") {
                                    $("#festival_detail_str").text("9月15日~9月17日放假，共三天。9月18日(星期日)上班");
                                    $("#festival_raiders").text("");
                                } else {
                                    if (f == "2016_10_01") {
                                        $("#festival_detail_str").text("10月1日~7日放假，10月8日(星期六)、10月9日(星期日)上班");
                                        $("#festival_raiders").text("");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        $("body").bind("click", function(f) {
            if (f.target.id != "year_func" && f.target.id != "year_num" && f.target.id != "year_str") {
                $("#year_select_selecter").css({
                    display: "none"
                });
            }
            if (f.target.id != "month_func" && f.target.id != "month_num" && f.target.id != "month_str") {
                $("#month_select_selecter").css({
                    display: "none"
                });
            }
            if (f.target.id != "festival_button" && f.target.id != "festival") {
                $("#festival_select_block").css({
                    display: "none"
                });
                $("#festival_select_selecter").css({
                    display: "none"
                });
            }
            if ($(f.target).hasClass("minuteselect") == false) {
                $("#popMinuteSelectList").css({
                    display: "none"
                });
                document.getElementById("popMinuteSelectList").style.display = "none";
            }
            if ($(f.target).hasClass("hourselect") == false) {
                $("#popHourSelectList").css({
                    display: "none"
                });
                document.getElementById("popHourSelectList").style.display = "none";
            }
            if ($(f.target).attr("class") != "YJdiv" && $(f.target).attr("class") != "popYJ" && $(f.target).attr("class") != "popWord" && $(f.target).attr("class") != "popHuangliItemY" && $(f.target).attr("class") != "popHuangliItemJ" && $(f.target).attr("class") != "popStr") {
                $("#huangliDiv").css({
                    display: "none"
                });
            }
        });
        var a = false;
        var e = false;
        $("#YJdiv").bind("mouseover", function(f) {
            a = true;
            setTimeout(function() {
                if (a || e) {
                    $("#huangliDiv").css({
                        display: "block"
                    });
                }
            }, 500);
        });
        $("#YJdiv").bind("mouseout", function(f) {
            a = false;
            if (e == false) {
                setTimeout(function() {
                    if (e == false && a == false) {
                        $("#huangliDiv").css({
                            display: "none"
                        });
                    }
                }, 500);
            }
        });
        $("#huangliDiv").bind("mouseover", function(f) {
            e = true;
            setTimeout(function() {
                if (a || e) {
                    $("#huangliDiv").css({
                        display: "block"
                    });
                }
            }, 500);
        });
        $("#huangliDiv").bind("mouseout", function(f) {
            e = false;
            if (a == false) {
                setTimeout(function() {
                    if (e == false && a == false) {
                        $("#huangliDiv").css({
                            display: "none"
                        });
                    }
                }, 500);
            }
        });
        $("#plusDivCreate").bind("click", function(l) {
            try {
                var g = parseInt($("#popHourSelectNumb").html()),
                    j = parseInt($("#popMinuteSelectNumb").html()),
                    f = $("#popTextarea").val().replace(/^\s*|\s*$/g, "");
                if (f.length == 0) {
                    $("#popTextarea").css("border-color", "red");
                    var k = 0;
                    var m = setInterval(function() {
                        if (k++ % 2 == 0) {
                            $("#popTextarea").css("border-color", "#888");
                        } else {
                            $("#popTextarea").css("border-color", "red");
                        }
                        if (k >= 5) {
                            clearInterval(m);
                        }
                    }, 200);
                    return;
                }
                var h = false;
                if ($("#popHourSelectNumb").text() == "全天") {
                    h = true;
                }
                calendarHandler.addSch(f, h, g, j, makeCal.appendScheduleIcon);
            } catch (l) {}
            $("#popTextarea").val("");
            $("#poparea").val("");
            $("#popHourSelectNumb").html("全天");
            $("#popMinuteSelectNumb").html("0分");
            $("#plusDivEle").css({
                display: "none"
            });
            $("#plusDiv").css({
                display: "none"
            });
        });
        $("#cal_plusbutton").bind("click", function(f) {
            if (!calendarHandler.isLogin()) {
                bd_loginOrAuth();
                return;
            }
            if ($("#plusDiv").css("display") == "block") {
                $("#closePlus").click();
                return;
            }
            $("#plusTime").text(getFullDateStr(currentDate));
            $("#plusDiv").css({
                display: "block"
            });
            $("#plusDivEle").css({
                display: "block"
            });
            $("#popSHI").css({
                visibility: "hidden"
            });
            $("#popFEN").css({
                visibility: "hidden"
            });
            $("#popMinuteSelect").css({
                visibility: "hidden"
            });
        });
        $("#closePlus").bind("click", function(f) {
            $("#popTextarea").val("");
            $("#plusDiv").css({
                display: "none"
            });
            $("#plusDivEle").css({
                display: "none"
            });
            $("#popMinuteSelectNumb").text("0分");
            $("#popHourSelectNumb").text("全天");
        });
    },
    makeAction: function() {
        $(".block").bind("click", function(b) {
            var a = madeRiliDate.getMonth();
            ele = $(b.target);
            while (1) {
                if (ele.hasClass("block")) {
                    break;
                } else {
                    ele = ele.parent();
                }
            }
            $(".block").removeClass("clickBlock4");
            $(".block").removeClass("clickBlock5");
            $(".block").removeClass("clickBlock6");
            click_date = calData[ele.attr("i")][ele.attr("j")].value;
            if (click_date.getMonth() == (a + 11) % 12) {
                makeCal.prevMonth(click_date);
                return;
            } else {
                if (click_date.getMonth() == (a + 1) % 12) {
                    makeCal.nextMonth(click_date);
                    return;
                }
            }
            if (ele.hasClass("today") == false) {
                if (ele.hasClass("block4")) {
                    ele.addClass("clickBlock4");
                } else {
                    if (ele.hasClass("block5")) {
                        ele.addClass("clickBlock5");
                    } else {
                        if (ele.hasClass("block6")) {
                            ele.addClass("clickBlock6");
                        }
                    }
                }
            }
            makeCal.makeHuangli(calData[ele.attr("i")][ele.attr("j")].value);
        });
        $("#cal_down").bind("mouseover", function(f) {
            ele = $(f.target);
            for (var c = 0; c < 5; c++) {
                if (ele.hasClass("block")) {
                    break;
                } else {
                    ele = ele.parent();
                }
            }
            var a;
            var c = ele.attr("i"),
                b = ele.attr("j");
            if (ele.hasClass("block") && calData[c][b].hasWork) {
                a = calData[c][b].value;
                calendarHandler.setHoverDate(a);
                calendarHandler.drawSch();
            } else {
                $("#taskHover").css({
                    display: "none"
                });
                return;
            }
            if (ele.hasClass("block4")) {
                $("#taskHover").css({
                    display: "block"
                });
                $("#taskHover").css({
                    left: ele.position().left - 35 + "px"
                });
                $("#taskHover").css({
                    top: ele.position().top + 66 + "px"
                });
            } else {
                if (ele.hasClass("block5")) {
                    $("#taskHover").css({
                        display: "block"
                    });
                    $("#taskHover").css({
                        left: ele.position().left - 35 + "px"
                    });
                    $("#taskHover").css({
                        top: ele.position().top + 53 + "px"
                    });
                } else {
                    if (ele.hasClass("block6")) {
                        $("#taskHover").css({
                            display: "block"
                        });
                        $("#taskHover").css({
                            left: ele.position().left - 35 + "px"
                        });
                        $("#taskHover").css({
                            top: ele.position().top + 46 + "px"
                        });
                    }
                }
            }
        });
    },
    makeHuangli: function(c) {
        currentDate = c;
        c = makeCal.setTimeZero(c);
        var b = c.getDate();
        lunar = templates.lunar_Info_detail(c, k);
        $("#right_big_date").text(b);
        var l = c.getFullYear() + "年" + (c.getMonth() + 1) + "月 ";
        switch (c.getDay()) {
            case 1:
                l += "星期一";
                break;
            case 2:
                l += "星期二";
                break;
            case 3:
                l += "星期三";
                break;
            case 4:
                l += "星期四";
                break;
            case 5:
                l += "星期五";
                break;
            case 6:
                l += "星期六";
                break;
            case 0:
                l += "星期日";
                break;
        }
        l += " ";
        l += getYearWeek(c);
        l += "周 ";
        $("#gregorianDayStr").text(l);
        $("#popDateStr").text(getFullDateStr(c));
        $("#popChineseStr").text((lunar.lunar).substring(2));
        var j = makeCal.setTimeZero(new Date());
        var g = j.getTime();
        var e = c.getTime();
        var f = Math.ceil((e - g) / 86400000);
        var h = "";
        if (j.getDate() == c.getDate()) {
            h = "今天";
        }
        if (f < 0) {
            h = (0 - f) + "天前";
        } else {
            if (f > 0) {
                h = f + "天后";
            }
        }
        $("#dayafterorbefore").text(h);
        $("#chinaDay").text((lunar.lunar).substring(2));
        info = lunar.y_Info;
        var a = info.split(" ");
        $("#chinaDay2").text(a[0]);
        $("#chinaDay3").text(a[1]);

        function k(m) {
            Y = m.huangliY;
            Ys = Y.split(".");
            $("#ylist").empty();
            var o = 0;
            for (var n in Ys) {
                o++;
                if (o > 5) {
                    break;
                }
                $("#ylist").append('<div class="YJdiv">' + Ys[n] + "</div>");
            }
            $("#popYStr").empty();
            for (var n in Ys) {
                $("#popYStr").append('<div class="popHuangliItemY">' + Ys[n] + "</div>");
            }
            J = m.huangliJ;
            Js = J.split(".");
            $("#jlist").empty();
            o = 0;
            for (var n in Js) {
                o++;
                if (o > 5) {
                    break;
                }
                $("#jlist").append('<div class="YJdiv">' + Js[n] + "</div>");
            }
            $("#popJStr").empty();
            for (var n in Js) {
                $("#popJStr").append('<div class="popHuangliItemJ">' + Js[n] + "</div>");
            }
        }
        calendarHandler.setSelectedDate(c);
    },
    getWeekFirst: function(b) {
        var a = b.getDay();
        if (a == 0) {
            a = 7;
        }
        return makeCal.addTime(b, 0 - a + 1, "day");
    },
    getMonthFirst: function(a) {
        ndate = new Date(a);
        ndate.setDate(1);
        return ndate;
    },
    addTime: function(a, b, c) {
        ndate = new Date(a);
        switch (c) {
            case "day":
                ndate.setDate(a.getDate() + b);
                break;
            case "week":
                ndate.setDate(a.getDate() + 7 * b);
                break;
            case "month":
                ndate.setMonth(a.getMonth() + b);
                break;
            case "year":
                ndate.setYear(a.getFullYear() + b);
                break;
            case "hour":
                ndate.setHours(a.getHours() + b);
                break;
            case "minute":
                ndate.setMinutes(a.getMinutes() + b);
                break;
            default:
                return ndate;
        }
        return ndate;
    },
    setTimeZero: function(a) {
        ndate = new Date(a);
        ndate.setHours(0);
        ndate.setMinutes(0);
        ndate.setSeconds(0);
        ndate.setMilliseconds(0);
        return ndate;
    },
    createDay: function() {
        obj = new Object();
        obj.year = 0;
        obj.month = 0;
        obj.date = 0;
        obj.day = 0;
        obj.before = false;
        obj.after = false;
        obj.weekend = false;
        obj.china = null;
        obj.rows = 0;
        obj.inrow = 0;
        obj.today = false;
        obj.value = null;
        obj.hasWork = false;
        return obj;
    },
    nextMonth: function(a) {
        makeCal.pareData(a);
        makeCal.showCal(a);
        showingToday = false;
        makeCal.makeHuangli(a);
    },
    prevMonth: function(a) {
        makeCal.pareData(a);
        makeCal.showCal(a);
        showingToday = false;
        makeCal.makeHuangli(a);
    },
    showToday: function() {
        currentDate = new Date();
        makeCal.pareData(currentDate);
        makeCal.showCal(new Date());
        $("#festival").text("假期安排");
        $("#year_num").text(currentDate.getFullYear());
        $("#month_num").text(currentDate.getMonth() + 1);
        showingToday = true;
        makeCal.makeHuangli(currentDate);
    },
    bind_funcbutton: function(b, c, a) {
        $("#" + b).bind("click", function(f) {
            $("#" + a).css({
                top: $("#" + b).offset().top + 30 + "px"
            });
            $("#" + a).css({
                left: $("#" + b).position().left - 39 + "px"
            });
            $("#" + a).css({
                display: "block"
            });
            if (b == "year_func") {
                var h = $("#year_num").text();
                var g = $("#yearitem" + h).position().top;
                $("#" + a).scrollTop(g);
            }
        });
    },
    get365riliTime: function() {
        var a = (function() {
            if (timeBeijing != null) {
                var b = new Date();
                var c = b.getTime() - timeSelf;
                b.setTime(timeBeijing + c);
                return b;
            } else {
                return new Date();
            }
        })();
        hour = a.getHours();
        minute = a.getMinutes();
        second = a.getSeconds();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return hour + ":" + minute + ":" + second;
    }
};

function StringBuffer() {
    this._strings = new Array();
}
StringBuffer.prototype.append = function(a) {
    this._strings.push(a);
    return this;
};
StringBuffer.prototype.toString = function() {
    var a = arguments.length == 0 ? "" : arguments[0];
    return this._strings.join(a);
};
var templates = {
    lunar_Info: function(e) {
        var h = cacheMgr.getCld(e.getFullYear(), e.getMonth());
        var b = e.getDate();
        var j = h[b - 1];
        var a = {
            l_day: "",
            l_month: "",
            l_day_full: ""
        };
        a.l_day = cDay(j.lDay);
        a.l_month = j.lMonth;
        a.color = "";
        var g, c;
        g = j.lunarFestival;
        if (g.length > 0) {
            if (g.length > 4) {
                c = g.toString();
                g = g.substr(0, 3) + "...";
            }
            a.color = "#bc5016";
        } else {
            g = j.solarTerms;
            c = g.toString();
            var f = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
            if (typeof SolarTermException[f] != "undefined") {
                g = c = SolarTermException[f];
            }
            if (g.length > 0) {
                a.color = "#bc5016";
                if ((g == "清明") || (g == "芒种") || (g == "夏至") || (g == "冬至")) {
                    a.color = "#bc5016";
                    if (g == "清明") {
                        g = "清明节";
                    }
                }
            } else {
                g = j.solarFestival;
                c = g.toString();
                if (g.length > 4) {
                    if (g.length > 3) {
                        g = g.substr(0, 3) + "..";
                    }
                    a.color = "#bc5016";
                }
            }
        }
        if (g.length > 0) {
            a.l_day = g;
            a.l_day_full = c;
        }
        return a;
    },
    lunar_Info_detail: function(date, callback) {
        var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
        var year = date.getFullYear();
        var day = date.getDate();
        var cld_day = cld[day - 1];
        var festival = [];
        var info = {
            lunar: "",
            y_Info: "",
            huangliY: "无",
            huangliJ: "无"
        };
        info.lunar = "农历" + (cld_day.isLeap ? "闰 " : "") + templates.getChinaNum(cld_day.lMonth) + "月" + cDay(cld_day.lDay);
        info.y_Info = cld_day.cYear + "年" + this.lunar_year(date) + " " + cld_day.cMonth + "月" + cld_day.cDay + "日";
        try {
            if (year >= 2008 && year <= 2020) {
                var huangliYearMonth = year + "" + (cld_day.sMonth < 10 ? ("0" + cld_day.sMonth) : cld_day.sMonth);
                if (eval("HuangLi.y" + huangliYearMonth) == null) {
                    var filename = "http://baidu365.duapp.com/wannianlibaidu/js/huangli/month/" + huangliYearMonth + ".js";
                    $.getScript(filename, function() {
                        var hl = eval("HuangLi.y" + huangliYearMonth + ".d" + (cld_day.sMonth < 10 ? ("0" + cld_day.sMonth) : cld_day.sMonth) + (cld_day.sDay < 10 ? ("0" + cld_day.sDay) : cld_day.sDay));
                        info.huangliY = hl.y;
                        info.huangliJ = hl.j;
                        if (hl.y.length > 8 && hl.j.indexOf("诸事不宜") >= 0) {
                            info.huangliJ = "余事勿取";
                        }
                        if (callback) {
                            callback(info);
                        }
                    });
                } else {
                    var hl = eval("HuangLi.y" + huangliYearMonth + ".d" + (cld_day.sMonth < 10 ? ("0" + cld_day.sMonth) : cld_day.sMonth) + (cld_day.sDay < 10 ? ("0" + cld_day.sDay) : cld_day.sDay));
                    info.huangliY = hl.y;
                    info.huangliJ = hl.j;
                    if (hl.y.length > 8 && hl.j.indexOf("诸事不宜") >= 0) {
                        info.huangliJ = "余事勿取";
                    }
                    if (callback) {
                        callback(info);
                    }
                }
            } else {
                if (callback) {
                    callback(info);
                }
            }
        } catch (e) {}
        return info;
    },
    lunar_year: function(b) {
        var c = b.getFullYear();
        var a = sTerm_spring(c);
        if ((b.getMonth() == 0 || (b.getMonth() == 1 && b.getDate() < a))) {
            c--;
        }
        var e = "【" + Animals[(c - 4) % 12] + "年】";
        return e;
    },
    getChinaNum: function(b) {
        var a;
        switch (b) {
            case 1:
                a = "一";
                break;
            case 2:
                a = "二";
                break;
            case 3:
                a = "三";
                break;
            case 4:
                a = "四";
                break;
            case 5:
                a = "五";
                break;
            case 6:
                a = "六";
                break;
            case 7:
                a = "七";
                break;
            case 8:
                a = "八";
                break;
            case 9:
                a = "九";
                break;
            case 10:
                a = "十";
                break;
            case 11:
                a = "十一";
                break;
            case 12:
                a = "腊";
                break;
        }
        return a;
    }
};
window.makeCal = calander;

function getMonthDateStr(a) {
    month = a.getMonth() + 1;
    day = a.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return month + "" + day;
}

function getFullDateStr(a) {
    month = a.getMonth() + 1;
    day = a.getDate();
    year = a.getFullYear();
    return year + "-" + month + "-" + day;
}
var SolarTermException = {
    "2012-5-20": "小满",
    "2012-5-21": "",
    "2012-12-6": "",
    "2012-12-7": "大雪",
    "2013-2-3": "",
    "2013-2-4": "立春",
    "2013-7-22": "大暑",
    "2013-7-23": "",
    "2013-12-21": "",
    "2013-12-22": "冬至",
    "2014-3-5": "",
    "2014-3-6": "惊蛰",
    "2015-1-5": "",
    "2015-1-6": "小寒",
    "2016-6-6": "",
    "2016-6-7": "",
    "2017-7-22": "大暑",
    "2017-7-23": "",
    "2017-12-21": "",
    "2017-12-22": "冬至",
    "2018-2-18": "",
    "2018-2-19": "雨水",
    "2018-3-20": "",
    "2018-3-21": "春分",
    "2019-2-4": "立春",
    "2019-2-5": "",
    "2019-6-21": "夏至",
    "2019-6-22": "",
    "2020-7-6": "小暑",
    "2020-7-7": "",
    "2020-8-22": "处暑",
    "2020-8-23": "",
    "2020-12-6": "",
    "2020-12-7": "大雪",
    "1976-2-5": "立春",
    "1980-2-5": "立春",
    "2009-2-4": "立春",
    "2009-2-3": "",
    "1976-2-4": "",
    "1980-2-4": ""
};

function getYearWeek(a) {
    var b = new Date(a.getFullYear(), 0, 1);
    var e = a.getDay();
    if (e == 0) {
        e = 7;
    }
    var c = b.getDay();
    if (c == 0) {
        c = 7;
    }
    d = Math.round((a.getTime() - b.getTime() + (c - e) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(d / 7) + 1;
}
$(document).ready(function() {
    calendarHandler.init();
    makeCal.init();
    var a = document.body.clientWidth;
    if (a > 540) {
        var b = Math.floor((document.body.clientWidth - 540) / 2);
        $("#middle").css("left", b + "px");
    }
    gotoFestival();
    $("#cal_365riliUser").hide();
    $("#cal_plusbutton").hide();
});

function getUrlParam(f) {
    var e, g, c, a, b;
    e = window.location.href;
    g = e.indexOf("?");
    end = e.indexOf("#");
    if (end < 0) {
        end = e.length;
    }
    c = e.substring(g + 1, end);
    a = c.split("&");
    b = "";
    for (i = 0; i < a.length; i++) {
        b = a[i];
        g = b.indexOf("=");
        if (b.substring(0, g) == f) {
            return b.substring(g + 1);
        }
    }
    return null;
}

function gotoFestival() {
    var b = window.location.search.substring(1);
    var f = b.split("&");
    var e = "";
    for (var a in f) {
        var c = f[a].split("=");
        if (c.length == 2 && c[0] == "s_param") {
            var g = decodeURIComponent(c[1]).split("=");
            if (g.length == 2) {
                e = g[1];
            }
            break;
        }
    }
    switch (e) {
        case "yuandan":
            $("#festival_select_selecter div:nth-child(1)").trigger("click");
            break;
        case "chunjie":
            $("#festival_select_selecter div:nth-child(2)").trigger("click");
            break;
        case "qingming":
            $("#festival_select_selecter div:nth-child(3)").trigger("click");
            break;
        case "laodong":
            $("#festival_select_selecter div:nth-child(4)").trigger("click");
            break;
        case "duanwu":
            $("#festival_select_selecter div:nth-child(5)").trigger("click");
            break;
        case "zhongqiu":
            $("#festival_select_selecter div:nth-child(6)").trigger("click");
            break;
        case "guoqing":
            $("#festival_select_selecter div:nth-child(7)").trigger("click");
            break;
        default:
            break;
    }
}
