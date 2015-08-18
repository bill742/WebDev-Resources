var linkControllers = angular.module('linkControllers', ['ngAnimate']);

// Display submitted links
linkControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
	$http.get('js/data.json').success(function(data) {
    $scope.products = data;
    $scope.linkOrder = 'name';
  });
}]);

// Display Categories
// linkControllers.controller('CatController', ['$scope', '$http', function($scope, $http) {
// 		$http.get('js/data.json').success(function(data) {
// 		$scope.productz = data;
// 		$scope.catOrder = 'category';
// 	});
// }]);


// Controller for submission form
// app.controller('LinkController', function(){
// 	this.list = {};

// 	this.addList = function(product) {
// 		product.lists.push(this.list);
// 	};
// });
