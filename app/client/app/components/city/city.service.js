(function() {
	"use strict";

	angular
		.module('city')
		.service('cityService', function($http) {
	
			this.url = 'http://localhost:8080/api/cityList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			this.getAllByCountry = function(id) {
				return $http.get(this.url + "/filterByCountry/" + id);
			};
			
			this.save = function(city) {
				if (city.id) {
					return $http.put(this.url + '/' + city.id, city);
				} else {
					return $http.post(this.url, city);
				}
			};
		});
		
})();
