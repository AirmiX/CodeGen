(function() {
	"use strict";

	angular
		.module('admin')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/adminList', {
	            templateUrl : '/app/components/admin/admin-list.html',
	            controller : 'AdminController'
	        })
	        .when('/adminList/add', {
	            templateUrl : '/app/components/admin/admin-add-edit.html',
	            controller : 'AdminController'
	        })
	        .when('/adminList/edit/:id', {
	            templateUrl : '/app/components/admin/admin-add-edit.html',
	            controller : 'AdminController'
	        })
	        .when('/adminList/:id', {
	            templateUrl : '/app/components/admin/admin.html',
	            controller : 'AdminController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
