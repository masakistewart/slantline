angular.module('pineNews')
.controller('landingPageCtrl', function($http, $scope) {
	$http.get('/api/recentNews').then(function(data) {
		$scope.news = data;
		console.log(data)
	});
})
.controller('mainPageCtrl', function($http, $scope) {

})
.controller('searchResultsCtrl', function($scope, $http) {
	$scope.news = {};
	$scope.itemNumber = 4;
	$scope.currentPage = 1;
  $scope.pageSize = 1;

  $scope.pageChangeHandler = function(num) {
      console.log('pageChanged ' + num);
  };

	$http.get('/api/recentNewsStories').then(function(data) {
		$scope.news.items = data.data;
		$scope.news.hidden = false;
		console.log(data)
	});
})
.controller('OtherController', function ($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  }
})
.controller('searchAllCtrl', function($scope, $http) {
	$scope.showSecondaryBar = false;
	$scope.news = {};
	$scope.itemNumber = 4;
	$scope.currentPage = 1;
  $scope.pageSize = 1;
	$scope.searchAll = function(query) {
		$http.get('/api/search/'+ query).then(function(data) {
			console.log(data)
			$scope.data = data.data
			$scope.showSecondaryBar = true;
		})
	}

	$scope.pageChangeHandler = function(num) {
	  console.log('going to page ' + num);
	}
})