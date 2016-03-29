angular.module('pineNews', ['ngRoute', 'ngAnimate','angularMoment','angularUtils.directives.dirPagination'])
.factory('ApiRequestFactory', function(AuthTokenFactory, $q, $http){
	return {
		getAPI: getAPI
	}

	function getAPI(route) {
		var deferred = $q.defer();
		var token = AuthTokenFactory.getToken();
		if(token) {
			console.log('inside')
			$http.get(route)
			.then(function(data) {
				deferred.resolve(data);
			}).catch(function(data) {
				deferred.reject(data);
			})
			return deferred.promise;
		} else {
			console.log('rejected: not logged in');
			var data = { data: { title: "ERROR", summary: "YOU SIR OR MAM ARE NOT ALLOWED TO BE HERE!", source: "Cairo" } }
			deferred.resolve(data)
			return deferred.promise;
		}
	}
})
.factory('FavoritesFactory', function($http, $routeParams, AuthTokenFactory, $q) {
	return {
		favorite: function(newsID) {
			$http.get('/api/addFavorites/' + $routeParams.id).then(function(data) {
				console.log(data)
			}).catch(function(error) {
				console.log("ERROR: " + error);
			})
		},
		getFav: function() {
			var deferred = $q.defer();
			var user = AuthTokenFactory.getUser()
			$http.get('/api/getFavorites/' + user.id).success(function(data) {
					deferred.resolve(data)
			}).catch(function(data) {
				deferred.reject(data)
			})
			return deferred.promise;
		}
	}
})
.factory('UserFactory', function($http, $q, AuthTokenFactory){
	return {
		login: login,
		signup: signup,
		logout: logout
	}

	function  logout() {
		AuthTokenFactory.setToken();
		console.log('Removing Token')
	}



	function login(name, password) {
		var deferred = $q.defer();
		var data = JSON.stringify({
			name: name,
			password: password
		});

		$http.post('http://localhost:8000/auth/login', data)
		.success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		})

		return deferred.promise;
	}

	function signup(name, password) {
		var data = JSON.stringify({name: name, password: password})
		var deferred = $q.defer();
		$http.post('http://localhost:8000/auth/signup', data)
		.success(function(data) {
			console.log(data);
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		})

		return deferred.promise;
	}
})
.factory('AuthTokenFactory', function($window, $q) {
	var store = $window.localStorage;
	var key = 'auth-token';

	return {
		getToken: getToken,
		setToken: setToken,
		getUser: getUser
	}

	function setToken(token) {
		if(token) {
			store.setItem(key, token);
		} else {
			store.removeItem(key);
		}
	}

	function getUser() {
		var deferred = $q.defer();
		var token = getToken();
		if(token) {
			deferred.resolve(parseToken(token))
		}
		return deferred.promise;
	}

	function parseToken(token) {
  	var base64Url = token.split('.')[1];
  	var base64 = base64Url.replace('-', '+').replace('_', '/');
  	return JSON.parse($window.atob(base64));
	}

	function getToken() {
		return store.getItem(key);
	}
})
.factory('AuthInterceptor', function(AuthTokenFactory) {
	return {
		request: addToken
	}

	function addToken(config) {
		var token = AuthTokenFactory.getToken();
		if(token) {
			config.headers = config.headers || {};
			config.headers.Authorization = 'Bearer ' + token;
		}

		return config;
	}
})
.config(function($routeProvider, $locationProvider, $httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
	$routeProvider
	.when('/', {
		templateUrl: '/views/partials/landingPage.html',
		controller: 'landingPageCtrl'
	})
	.when('/favorites', {
		templateUrl: '/views/partials/favorites.html',
		controller: 'newsCtrl'
	})
	.when('/recentnews', {
		templateUrl: '/views/partials/mainPage.html'
	})
	.when('/search', {
		templateUrl: '/views/partials/search.html'
	})
	.when('/news/:id', {
		templateUrl: '/views/partials/story.html',
		controller: 'newsCtrl'
	})
	.when('/login', {
		templateUrl: '/views/partials/login.html',
		controller: 'MainController'
	})
	.when('/signup', {
		templateUrl: '/views/partials/signup.html',
		controller: 'MainController'
	})
})