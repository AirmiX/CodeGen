(function() {
	"use strict";

	angular
		.module('restaurant')
		.service('restaurantService', function($http) {
	
			this.url = 'http://localhost:8080/api/restaurantList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			this.getAllByRestaurantBrand = function(id) {
				return $http.get(this.url + "/filterByRestaurantBrand/" + id);
			};
			this.getAllByCity = function(id) {
				return $http.get(this.url + "/filterByCity/" + id);
			};
			
			this.save = function(restaurant) {
				if (restaurant.id) {
					return $http.put(this.url + '/' + restaurant.id, restaurant);
				} else {
					return $http.post(this.url, restaurant);
				}
			};
		});
		
})();
