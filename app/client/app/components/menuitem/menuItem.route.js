(function() {
	"use strict";

	angular
		.module('menuItem')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/menuItemList', {
	            templateUrl : '/app/components/menuItem/menuItem-list.html',
	            controller : 'MenuItemController'
	        })
	        .when('/menuItemList/add', {
	            templateUrl : '/app/components/menuItem/menuItem-add-edit.html',
	            controller : 'MenuItemController'
	        })
	        .when('/menuItemList/edit/:id', {
	            templateUrl : '/app/components/menuItem/menuItem-add-edit.html',
	            controller : 'MenuItemController'
	        })
	        .when('/menuItemList/:id', {
	            templateUrl : '/app/components/menuItem/menuItem.html',
	            controller : 'MenuItemController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
