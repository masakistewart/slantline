angular.module('pineNews', ['ngRoute', 'ngAnimate','angularMoment'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/views/partials/landingPage.html',
		controller: 'landingPageCtrl'
	})
	.when('/search', {
		templateUrl: '/views/partials/mainPage.html',
		controller: 'searchCtrl'
	})

	$locationProvider.html5Mode(true)
})