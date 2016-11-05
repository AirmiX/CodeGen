(function() {
	"use strict";

	angular
		.module('${class.name?uncap_first}')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
	        .when('/', {
	            templateUrl : '/app/home.html'
	        })
	        .when('/${class.name?uncap_first}List', {
	            templateUrl : '/app/components/${class.name?uncap_first}/${class.name?uncap_first}-list.html',
	            controller : '${class.name}Controller'
	        })
	        .when('/${class.name?uncap_first}List/add', {
	            templateUrl : '/app/components/${class.name?uncap_first}/${class.name?uncap_first}-add-edit.html',
	            controller : '${class.name}Controller'
	        })
	        .when('/${class.name?uncap_first}List/edit/:id', {
	            templateUrl : '/app/components/${class.name?uncap_first}/${class.name?uncap_first}-add-edit.html',
	            controller : '${class.name}Controller'
	        })
	        .when('/${class.name?uncap_first}List/:id', {
	            templateUrl : '/app/components/${class.name?uncap_first}/${class.name?uncap_first}.html',
	            controller : '${class.name}Controller'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}
})();
