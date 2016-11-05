(function() {
	"use strict";

	angular
		.module('city')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/cityList', {
	            templateUrl : '/app/components/city/city-list.html',
	            controller : 'CityController'
	        })
	        .when('/cityList/add', {
	            templateUrl : '/app/components/city/city-add-edit.html',
	            controller : 'CityController'
	        })
	        .when('/cityList/edit/:id', {
	            templateUrl : '/app/components/city/city-add-edit.html',
	            controller : 'CityController'
	        })
	        .when('/cityList/:id', {
	            templateUrl : '/app/components/city/city.html',
	            controller : 'CityController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
