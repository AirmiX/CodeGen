(function() {
	"use strict";

	angular
		.module('seller')
		.service('sellerService', function($http) {
	
			this.url = 'http://localhost:8080/api/sellerList';
			
			this.getOne = function(id) {
				return $http.get(this.url + '/' + id);
			};
			
			this.remove = function(id) {
				return $http.delete(this.url + '/' + id);
			};
			
			this.getAll = function(name, page) {
				return $http.get(this.url, { params: {'name': name, 'page': page}});
			};
			
			
			this.save = function(seller) {
				if (seller.id) {
					return $http.put(this.url + '/' + seller.id, seller);
				} else {
					return $http.post(this.url, seller);
				}
			};
		});
		
})();
