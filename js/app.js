var myApp = angular.module('myApp', [
	'ngRoute',
	'linkControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	}).
	otherwise({
		redirectTo: '/list'
	});
}]);