(function() {
	"use strict";

	angular
		.module('restaurantBrand')
		.service('restaurantBrandService', function($http) {
	
			this.url = 'http://localhost:8080/api/restaurantBrandList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			
			this.save = function(restaurantBrand) {
				if (restaurantBrand.id) {
					return $http.put(this.url + '/' + restaurantBrand.id, restaurantBrand);
				} else {
					return $http.post(this.url, restaurantBrand);
				}
			};
		});
		
})();
