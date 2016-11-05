(function() {
	"use strict";

	angular
		.module('admin')
		.service('adminService', function($http) {
	
			this.url = 'http://localhost:8080/api/adminList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			
			this.save = function(admin) {
				if (admin.id) {
					return $http.put(this.url + '/' + admin.id, admin);
				} else {
					return $http.post(this.url, admin);
				}
			};
		});
		
})();
