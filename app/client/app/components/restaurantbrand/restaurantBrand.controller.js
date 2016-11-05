(function() {
	"use strict";

	angular
		.module('restaurantBrand')
		.controller('RestaurantBrandController', RestaurantBrandController);

	RestaurantBrandController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	'sellerService',  
	'restaurantService', 
	'restaurantBrandService'];

	function RestaurantBrandController($scope, $location, $routeParams, $uibModal,
	sellerService,  
	restaurantService, 
	restaurantBrandService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.restaurantBrandList = $scope.restaurantBrandList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			$scope.restaurantBrand.seller = JSON.parse($scope.restaurantBrand.seller);
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'RestaurantBrandAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          restaurantBrand: function () {
			            return $scope.restaurantBrand;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/restaurantBrandList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			restaurantBrandService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.restaurantBrandList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			restaurantBrandService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'RestaurantBrand with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting RestaurantBrand with ID ' + id + '!', type: 'danger'});
					});
		};
		
		$scope.addEditHeading;
		
		$scope.initAddEditPage = function () {
			if ($routeParams.id) {
				$scope.addEditHeading = 'Edit';
			}
			else {
				$scope.addEditHeading = 'Add';
			}
		}
		
		$scope.getOne = function() {
			$scope.restaurantBrand = {};
				sellerService.getAll()
					.success(function(data) {
							$scope.sellerList = data;
						});
			if ($routeParams.id) {  // edit stranica
				restaurantBrandService.getOne($routeParams.id)
						.success(function(data) {
							$scope.restaurantBrand = data;
							restaurantService.getAllByRestaurantBrand($scope.restaurantBrand.id)
								.success(function(data) {
									$scope.restaurantList = data;
								})
								.error(function() {
									
								});
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'RestaurantBrand with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('restaurantBrand')
		.controller('RestaurantBrandAddEditConfirmationController', RestaurantBrandAddEditConfirmationController);
	
	RestaurantBrandAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'restaurantBrandService', 'restaurantBrand'];
	function RestaurantBrandAddEditConfirmationController($scope, $uibModalInstance, restaurantBrandService, restaurantBrand) {
	
		$scope.restaurantBrand = restaurantBrand;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			restaurantBrandService.save($scope.restaurantBrand)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


