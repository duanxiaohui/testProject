/**
 * * colorUtil
 * 和颜色相关的算法
 * */
define(function(require, exports, module) {
	var self = {};
	module.exports = self;
	
	function uniform(color){
		if (String(color).slice(0, 3) == 'rgb') {
			var ar = color.slice(4, -1).split(','), r = parseInt(ar[0]), g = parseInt(ar[1]), b = parseInt(ar[2]);
			return ['#', r < 16 ? '0' : '', r.toString(16), g < 16 ? '0' : '', g.toString(16), b < 16 ? '0' : '', b.toString(16)].join('');
		}
		return color;
	}

	function hslToRgb(h, s, l){
		var r, g, b;
		if (s == 0) {
			r = g = b = l;
		} else {
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}
		return uniform(['rgb(', Math.round(r * 255), ', ', Math.round(g * 255), ', ', Math.round(b * 255), ')'].join(''));
	}

	function rgbToHsl(r, g, b){
		if (typeof(r) == 'string') { return arguments.callee.apply(null, convertHexColor(r)); }
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b), h = 0, s = 0, l = (max + min) / 2, d, sum = max + min;
		if (d = max - min) {
			s = l > 0.5 ? d / (2 - sum) : d / sum;
			h = (max == r ? ((g - b) / d + (g < b ? 6 : 0)) : max == g ? ((b - r) / d + 2) : ((r - g) / d + 4)) / 6;
		}
		return [h, s, l];
	}

	function hue2rgb(p, q, t){
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}

	function convertHexColor(color){
		color = String(color || '');
		color.charAt(0) == '#' && (color = color.substring(1));
		color.length == 3 && (color = color.replace(/([0-9a-f])/ig, '$1$1'));
		return color.length == 6 ? [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)] : [0, 0, 0];
	}
	
	function hex2rgba(hex){
		var r = parseInt(hex.substr(2, 2), 16); 
		var g = parseInt(hex.substr(4, 2), 16); 
		var b = parseInt(hex.substr(6, 2), 16); 
		var alpha = parseInt(hex.substr(0, 2), 16);
		return ["rgba","(",r,",",g,",",b,",",alpha/255,")"].join('');
	}
	
	self.hslToRgb = hslToRgb;
	self.rgbToHsl = rgbToHsl;
	self.hex2rgba = hex2rgba;
});