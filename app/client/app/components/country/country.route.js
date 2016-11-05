(function() {
	"use strict";

	angular
		.module('country')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/countryList', {
	            templateUrl : '/app/components/country/country-list.html',
	            controller : 'CountryController'
	        })
	        .when('/countryList/add', {
	            templateUrl : '/app/components/country/country-add-edit.html',
	            controller : 'CountryController'
	        })
	        .when('/countryList/edit/:id', {
	            templateUrl : '/app/components/country/country-add-edit.html',
	            controller : 'CountryController'
	        })
	        .when('/countryList/:id', {
	            templateUrl : '/app/components/country/country.html',
	            controller : 'CountryController'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
