(function() {
	"use strict";

	angular
		.module('country')
		.service('countryService', function($http) {
	
			this.url = 'http://localhost:8080/api/countryList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			
			this.save = function(country) {
				if (country.id) {
					return $http.put(this.url + '/' + country.id, country);
				} else {
					return $http.post(this.url, country);
				}
			};
		});
		
})();
