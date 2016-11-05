(function() {
	"use strict";

	angular
		.module('restaurant')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/restaurantList', {
	            templateUrl : '/app/components/restaurant/restaurant-list.html',
	            controller : 'RestaurantController'
	        })
	        .when('/restaurantList/add', {
	            templateUrl : '/app/components/restaurant/restaurant-add-edit.html',
	            controller : 'RestaurantController'
	        })
	        .when('/restaurantList/edit/:id', {
	            templateUrl : '/app/components/restaurant/restaurant-add-edit.html',
	            controller : 'RestaurantController'
	        })
	        .when('/restaurantList/:id', {
	            templateUrl : '/app/components/restaurant/restaurant.html',
	            controller : 'RestaurantController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
