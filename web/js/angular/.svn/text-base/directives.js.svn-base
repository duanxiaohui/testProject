angular.module('365_calendar').directive( "addBookButton", [function() {
    return {
        restrict: "A",
		link: function(scope, element, attrs ) {
            element.bind( "click", function() {
            	var cellIndex = element.parent().parent().prop("cellIndex");
            	$(".schedule_layer ").position({
					collision: 'fit',
					my: cellIndex < 2 ? 'left top' : "right top" ,
					at: cellIndex < 2 ? 'right top' : "left top",
					offset: '0 -28px',
					of: element
				});
            	if(cellIndex < 2){
            		$(".schedule_layer").addClass("schedule_arrow_left");
            	}else{
            		$(".schedule_layer").removeClass("schedule_arrow_left");
            	}
			});
        }
    }
}]);


angular.module('365_calendar').directive( "scheduleMoreList", [function() {
    return {
        restrict: "A",
		link: function(scope, element, attrs ) {
            element.bind( "click", function() {
            	$(".schedule_list_layer").position({
            		of: element.parent().parent(),
    				my: 'left top',
    				at: 'left top',
    				collision: 'fit'
    			});
			});
        }
    }
}]);

angular.module('365_calendar').directive( "scheduleSmallCreator", [function() {
    return {
        restrict: "A",
		link: function(scope, element, attrs ) {
            element.bind( "click", function() {
            	var cellIndex = element.parent().prop("cellIndex");
            	$('#div_add_schedule div.add_schedule_bottom')[cellIndex < 2 ? 'addClass' : 'removeClass']('schedule_arrow_left');
            	$("#div_add_schedule").show().position({
					collision: 'fit',
					my: cellIndex < 2 ? 'left middle' : "right middle" ,
					at: cellIndex < 2 ? 'right middle' : "left middle",
					offset: '0 -28px',
					of: element
				});            	
			});
        }
    }
}]);
 
//resizable for month view table
angular.module('365_calendar').directive('resizable', function($window) {
	return function($scope) {
	    $scope.initializeWindowSize = function() {
	      var monthViewHeight = $window.innerHeight - 106;
	      var dlHeight = Math.max(0, monthViewHeight / 6 - 37);
	      var scheduleMaxCount = Math.floor(dlHeight / 22);
	  	  $scope.monthViewHeight = monthViewHeight;
	      $scope.scheduleMaxCount = scheduleMaxCount;
	    };
	    $scope.initializeWindowSize();
	    return angular.element($window).bind('resize', function() {
	      $scope.initializeWindowSize();
	      return $scope.$apply();
	    });
	 };
});



angular.module('365_calendar').directive('scroll', function($window) {
	return function($scope) {
	    return angular.element($window).bind('scroll', function(e) {
	      if($scope.viewType == 'hall_list' || $scope.viewType == 'hall_panel'){
	    	  if($window.pageYOffset == 0){
	    		  $scope.categoryPositionStyle = undefined;
	    	  }else{
	    		  $scope.categoryPositionStyle = {
	    				 position:"fixed",
	    				 top:0
	    		  }
	    	  }
	      }
	      return $scope.$apply();
	    });
	 };
});



