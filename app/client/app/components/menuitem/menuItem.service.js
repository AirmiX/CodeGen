(function() {
	"use strict";

	angular
		.module('menuItem')
		.service('menuItemService', function($http) {
	
			this.url = 'http://localhost:8080/api/menuItemList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			this.getAllByMenuItemCategory = function(id) {
				return $http.get(this.url + "/filterByMenuItemCategory/" + id);
			};
			this.getAllByRestaurant = function(id) {
				return $http.get(this.url + "/filterByRestaurant/" + id);
			};
			
			this.save = function(menuItem) {
				if (menuItem.id) {
					return $http.put(this.url + '/' + menuItem.id, menuItem);
				} else {
					return $http.post(this.url, menuItem);
				}
			};
		});
		
})();
