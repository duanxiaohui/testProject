function AJAX(url, isAjax, method, data, callback, charSet){
	var xmlHttp, result;
	if (window.XMLHttpRequest)xmlHttp = new XMLHttpRequest();
	else if (window.ActiveXObject) xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				if (xmlHttp.responseXML != null && xmlHttp.responseXML.xml != null && xmlHttp.responseXML.xml != '') result = xmlHttp.responseXML;
				else result = xmlHttp.responseText;
				if (isAjax && typeof(callback) == 'function') callback(result);
			}
			xmlHttp = null;
		}
	}
	if (url.indexOf("?") > 0) url += "&random =" + Math.random();
	else url += "?&random =" + Math.random();
	xmlHttp.open(method, url, isAjax);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var charset = charSet ? charSet : "UTF-8";
	xmlHttp.setRequestHeader("CharSet", charset);
	xmlHttp.send(data);
	try {
		if (!isAjax) {
			var res = result || xmlHttp.responseText || xmlHttp.responseXML;
			if (typeof(callback) == 'function') callback(res);
			return res;
		}
	}
	catch (e) {};
}