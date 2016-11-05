(function() {
	"use strict";

	angular
		.module('menuItemCategory')
		.service('menuItemCategoryService', function($http) {
	
			this.url = 'http://localhost:8080/api/menuItemCategoryList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			
			this.save = function(menuItemCategory) {
				if (menuItemCategory.id) {
					return $http.put(this.url + '/' + menuItemCategory.id, menuItemCategory);
				} else {
					return $http.post(this.url, menuItemCategory);
				}
			};
		});
		
})();
