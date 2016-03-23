angular.module('pineNews')
.controller('landingPageCtrl', function($http, $scope) {
	$http.get('/api/recentNews').then(function(data) {
		$scope.news = data;
		console.log(data)
	});
})
.controller('/mainPageCtrl', function($http, $scope) {

})
.controller('/searchResultsCtrl', function($scope, $http) {

});