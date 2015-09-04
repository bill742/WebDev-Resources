var myApp = angular.module('myApp', [
	'ngRoute',
	'linkControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	// when('/', {
	// 	templateUrl: 'partials/list.html',
	// 	controller: 'ListController'
	// }).
	when('/fw', {
		templateUrl: 'partials/fw.html',
		controller: 'ListController'
	}).
	when('/tools', {
		templateUrl: 'partials/tools.html',
		controller: 'ListController'
	}).
	when('/podcasts', {
		templateUrl: 'partials/podcasts.html',
		controller: 'ListController'
	}).
	when('/tutorials', {
		templateUrl: 'partials/tutorials.html',
		controller: 'ListController'
	}).
	otherwise({
		// redirectTo: '/list'
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	});
}]);