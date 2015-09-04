(function(){
	var linkControllers = angular.module('linkControllers', []);

	// Display submitted links
	linkControllers.controller('ListController', ['$scope', '$http', function($scope, $http){
		$http.get('js/data.json').success(function(l) {
			$scope.links = l;
		});
	}]);

})();