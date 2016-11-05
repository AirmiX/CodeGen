(function() {
	"use strict";

	angular
		.module('restaurantBrand')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/restaurantBrandList', {
	            templateUrl : '/app/components/restaurantBrand/restaurantBrand-list.html',
	            controller : 'RestaurantBrandController'
	        })
	        .when('/restaurantBrandList/add', {
	            templateUrl : '/app/components/restaurantBrand/restaurantBrand-add-edit.html',
	            controller : 'RestaurantBrandController'
	        })
	        .when('/restaurantBrandList/edit/:id', {
	            templateUrl : '/app/components/restaurantBrand/restaurantBrand-add-edit.html',
	            controller : 'RestaurantBrandController'
	        })
	        .when('/restaurantBrandList/:id', {
	            templateUrl : '/app/components/restaurantBrand/restaurantBrand.html',
	            controller : 'RestaurantBrandController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
