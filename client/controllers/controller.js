angular.module('pineNews')
.controller('landingPageCtrl', function($http, $scope) {
	$http.get('/api/recentNews').then(function(data) {
		$scope.news = data;
		console.log(data)
	});
})
.controller('MainController', function($http, $scope, $location, UserFactory, AuthTokenFactory) {
	getLoginStatus();
	// $scope.login = login;
	$scope.signup = signUp;
	$scope.logout = logout;

	function getLoginStatus() {
		AuthTokenFactory.getUser().then(function(data) {
			var token = data;
			if (token) {
			console.log('there is a token')
			$scope.user = token;
			$scope.header = "News For " + token.name
			} else {
				$scope.header = "News"
				$scope.user = false;
			}
		})
	}

	function logout() {
		UserFactory.logout();
		$scope.user = false;
	}

	$scope.login = function(name, password) {
		UserFactory.login(name, password).then(function(response) {
			$location.path('/recentnews')
			AuthTokenFactory.setToken(response);
			getLoginStatus();
		}).catch(handleError)
	}

	function signUp(name, password) {
		UserFactory.signup(name, password).then(function(data) {
			console.log(data);
			$scope.login(name, password);
		});
	}

	function handleError(response) {
		alert("ERR: " + response.message)
	}
})
.controller('searchCtrl', function($scope, $http, AuthTokenFactory, ApiRequestFactory) {
	getLoginStatus();
	$scope.showSecondaryBar = false;
	$scope.news = {};
	$scope.itemNumber = 4;
	$scope.currentPage = 1;
  $scope.pageSize = 1;
	$scope.searchAll = function(query) {
		ApiRequestFactory.getAPI('/api/search/'+ query).then(function(data) {
			console.log(data)
			$scope.data = data.data
			$scope.showSecondaryBar = true;
		})
	}

	function getLoginStatus() {
		var token = AuthTokenFactory.getUser();
		if (token) {
			console.log('there is a token')
			$scope.user = token;
			$scope.header = "News For " + token.name
		} else {
			$scope.header = "News"
		}
	}

	$scope.pageChangeHandler = function(num) {
	  console.log('going to page ' + num);
	}
})
.controller('OtherController', function ($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  }
})
.controller('MainPageCtrl', function($scope, $http, ApiRequestFactory, AuthTokenFactory) {
	$scope.news = {};
	$scope.itemNumber = 4;
	$scope.currentPage = 1;
  $scope.pageSize = 1;
  getLoginStatus();

  function getLoginStatus() {
  	var token = AuthTokenFactory.getUser();
  	if (token) {
  		console.log('there is a token')
  		$scope.user = token;
  		$scope.header = "News For " + token.name
  	} else {
  		$scope.user = false;
  		$scope.header = "News"
  	}
  }

  $scope.pageChangeHandler = function(num) {
      console.log('pageChanged ' + num);
  };

	ApiRequestFactory.getAPI('/api/recentNewsStories').then(function(data) {
		$scope.news.items = data.data;
		$scope.news.hidden = false;
	});
})
.controller('NewsCtrl', function($scope, $http, $routeParams, FavoritesFactory, AuthTokenFactory) {
	$scope.newsIcons = {
    'aljazeera': 'https://superrepo.org/static/images/icons/original/xplugin.video.aljazeera.png.pagespeed.ic.jD0-KvIrNw.png',
    'cnn': "http://www.borissanchez.com/wp-content/uploads/2015/06/cnn_logo.png",
    'guardian': "http://www.russellsimpson.co.uk/wp-content/uploads/2015/07/guardian-logo.jpg",
    'fox': "https://superrepo.org/static/images/icons/original/xplugin.video.fox.news.png.pagespeed.ic.z6lZCexhqL.png",
    'huffingtonpost': "http://dantickner.com/wp-content/uploads/2014/03/HuffPo-logo1.jpg",
    'nytimes': "https://www.blackgate.com/wp-content/uploads/2013/02/The-New-York-Times-logo.jpg",
    'reuters': "https://georgianpartners.com/wp-content/uploads/2014/09/Reuters-logo.png"
	}

	$scope.addToFav = function(id) {
		FavoritesFactory.favorite(id);
		$scope.hide = true;
		console.log('hit', id)
	}

	$http.get('/api/news/' + $routeParams.id).then(function(data1) {
		$http.get('/api/agency/' + data1.data[0].source).then(function(data2) {
			$scope.item = [data1, data2];
			console.log($scope.item);
		})
	})
})
.controller('FavoritesController', function($scope, $http, $routeParams, FavoritesFactory, AuthTokenFactory) {
	if(AuthTokenFactory.getUser()) {
		getFavs();
	}

	$scope.removeFav = function(id, item) {
		item.hide = true;
		console.log(item.favorites_id)
		FavoritesFactory.removeFav(item.favorites_id);
	}

	$scope.addToFav = function(id) {
		FavoritesFactory.favorite(id);
		$scope.added = true;
		$scope.hide = true;
		console.log('hit')
	}

	function getFavs() {
		console.log("hit")
		FavoritesFactory.getFav().then(function(data) {
			$scope.favorites = data;
		})
	}
});