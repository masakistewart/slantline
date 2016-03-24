angular.module('pineNews', ['ngRoute', 'ngAnimate','angularMoment','angularUtils.directives.dirPagination'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/views/partials/landingPage.html',
		controller: 'landingPageCtrl'
	})
	.when('/search', {
		templateUrl: '/views/partials/mainPage.html'
	})
})