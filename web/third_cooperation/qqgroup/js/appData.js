define(function(){
	var _ex = {
		clear: function () {
			
		}
	}
	return {
		set: function () {
			var data = window.name || '{}';
			data = JSON.parse(data);

			var args = [].slice.call(arguments);
			if(args.length == 2){
				data[args[0]] = args[1];
			}

			window.name = JSON.stringify(data);
		},
		get: function () {
			var data = window.name || '{}';
			data = JSON.parse(data);

			var args = [].slice.call(arguments);
			if(args.length == 1){
				return  data[args[0]] || null;
			}
		}
	}
});