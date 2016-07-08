var UA = (function(WIN, UA) {
	var key = {		//�ؼ��ֳ���
			ie: "msie",
			sf: "safari",
			tt: "tencenttraveler"
		},
		
		//�����б�
		reg = {
			browser: "(" + key.ie + "|" + key.sf + "|firefox|chrome|opera)",
			shell: "(maxthon|360se|theworld|se|theworld|greenbrowser|qqbrowser)",
			tt: "(tencenttraveler)",
			os: "(windows nt|macintosh|solaris|linux)"
		},
		
		//uaƥ�䷽��
		uaMatch = function(str) {
			var reg = new RegExp(str + "\\b[ \\/]?([\\w\\.]*)", "i"),
				result = UA.match(reg);
			return result ? result.slice(1) : ["", ""];
		},
		
		//������������
		is360 = function() {
			
			//����ģʽ
			var result = UA.toLowerCase().indexOf("360chrome")>-1 ? !!1 : !1,
				s;
				
			//��ͨģʽ
			try{
				if(WIN.external && WIN.external.twGetRunPath){
					s = WIN.external.twGetRunPath;
					if(s && s.toLowerCase().indexOf("360se")>-1) {
						result = !!1;
					}
				}
			}catch(e) {
				result = !1
			}
			return result;
		}(),
		
		//������maxthon���ذ汾��
		maxthonVer = function() {
			try {
				if (/(\d+\.\d)/.test(external.max_version)) {
					return parseFloat(RegExp['\x241']);
				}
			} catch (e) {}
		}(),
		
		browser = uaMatch(reg.browser),
		shell = uaMatch(reg.shell),
		os = uaMatch(reg.os);
	
	//��������IE��������
	if (browser[0].toLowerCase() === key.ie) {
		
		//360
		if(is360){
			shell = ["360se",""];
		} else if(maxthonVer) {
			shell = ["maxthon", maxthonVer];
		} else if(shell == ","){
			shell = uaMatch(reg.tt);
		}
	} else if(browser[0].toLowerCase() === key.sf) {
		
		//���⴦��sf��version
		browser[1] = uaMatch("version") + "." + browser[1];
	}
	
	return {
		browser: browser.join(","),
		shell: shell.join(","),
		os: os.join(",")
	};
})(window, navigator.userAgent);

var indexSetHome = {
	
	//������תê��
	config: {
		
		//���ð���ҳ���ַ
		helpUrl: "http://www.hao123.com/redian/sheshouyef.htm",
		
		//��������
		shell: {
			//360
			"360se": "02",
			"maxthon": "03",
			//�ѹ�
			"se": "04",
			"qqbrowser": "05",
			"theworld": "10",
			"greenbrowser": "12"
		},
		
		//�ں������
		browser: {
			"firefox": "ff",
			"chrome": "08",
			"opera": "09",
			"safari": "11"
		}
	},
	
	//������ҳ����ת����
	set: function(el, url) {
		
		//�����
		var browser = UA.browser.split(",")[0].toLowerCase(),
		
			//���
			shell = UA.shell.split(",")[0].toLowerCase(),
			
			config = this.config,
			
			helpUrl = config.helpUrl,
			
			errorTip = "�����������֧�֣����ֶ�����",
			
			setForIE = function() {
				try {
					el.style.behavior = 'url(#default#homepage)';
					el.setHomePage(url);
				} catch(e) {
					alert(errorTip);
				}
			};
		
		if(browser === "msie" && (!shell || shell === "tencenttraveler")) {
			setForIE();
      		return false;
		} else if(shell && config.shell[shell]) {
			
			//alert(shell)
			helpUrl += "#" + config.shell[shell];
			
			//���Է���maxthonҲ��ע��UA
			if(shell === "maxthon") {
				try {
					if(external.max_version) {
						window.open(helpUrl);
						return false;
					} else {
						setForIE();
						return false;
					}
				} catch (e) {
					setForIE();
					return false;
				}
			} else {
				window.open(helpUrl);
				return false;
			}
		} else if(config.browser[browser]) {
			//���Է���maxthon3����chrome
			if(browser === "chrome") {
				try {
					if(external.max_version) {
						helpUrl += "#" + "03";
						window.open(helpUrl);
						return false;
					} else {
						helpUrl += "#" + config.browser[browser];
						window.open(helpUrl);
    					return false;
					}
				} catch (e) {
					helpUrl += "#" + config.browser[browser];
					window.open(helpUrl);
    				return false;
				}
			} else {
				helpUrl += "#" + config.browser[browser];
				window.open(helpUrl);
    			return false;
			}
		}else {
			alert(errorTip);
       		return false;
		}
	},
	
	//�󶨶���ӿ�
	bind: function(el,url) {
		
		//����id��dom
		el = typeof el === "string" ? document.getElementById(el) : el;
		
		//����һ��Ԫ��href�����˳����ƣ�����ֶ��޸���A��hrefΪ�����������򲻾�����Ϊ��ҳ�Ĺ���
		if(el.href.indexOf("hao123.com") < 0) return;
		
		url = url || el.href || window.location;
		
		var that = this,
			on = document.addEventListener ? function(el, type, callback){
				el.addEventListener(type, callback, !1 );
			} : function(el, type, callback){
				el.attachEvent("on" + type, callback );
			};
			
		on(el, "click", function(e) {
			e = e || window.event;
			that.set(el, url);
			if (e.preventDefault)
			{
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			return false;
		});
		
		//������ʽ�󶨶��dom����
		return this;
	}
}