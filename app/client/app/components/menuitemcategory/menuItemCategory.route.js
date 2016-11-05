(function() {
	"use strict";

	angular
		.module('menuItemCategory')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/menuItemCategoryList', {
	            templateUrl : '/app/components/menuItemCategory/menuItemCategory-list.html',
	            controller : 'MenuItemCategoryController'
	        })
	        .when('/menuItemCategoryList/add', {
	            templateUrl : '/app/components/menuItemCategory/menuItemCategory-add-edit.html',
	            controller : 'MenuItemCategoryController'
	        })
	        .when('/menuItemCategoryList/edit/:id', {
	            templateUrl : '/app/components/menuItemCategory/menuItemCategory-add-edit.html',
	            controller : 'MenuItemCategoryController'
	        })
	        .when('/menuItemCategoryList/:id', {
	            templateUrl : '/app/components/menuItemCategory/menuItemCategory.html',
	            controller : 'MenuItemCategoryController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
