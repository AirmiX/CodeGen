(function() {
	"use strict";

	angular
		.module('seller')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/sellerList', {
	            templateUrl : '/app/components/seller/seller-list.html',
	            controller : 'SellerController'
	        })
	        .when('/sellerList/add', {
	            templateUrl : '/app/components/seller/seller-add-edit.html',
	            controller : 'SellerController'
	        })
	        .when('/sellerList/edit/:id', {
	            templateUrl : '/app/components/seller/seller-add-edit.html',
	            controller : 'SellerController'
	        })
	        .when('/sellerList/:id', {
	            templateUrl : '/app/components/seller/seller.html',
	            controller : 'SellerController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
