(function() {
	"use strict";

	angular
		.module('restaurant')
		.controller('RestaurantController', RestaurantController);

	RestaurantController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	'restaurantBrandService', 'cityService',  
	'menuItemService', 
	'restaurantService'];

	function RestaurantController($scope, $location, $routeParams, $uibModal,
	restaurantBrandService, cityService,  
	menuItemService, 
	restaurantService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.restaurantList = $scope.restaurantList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			$scope.restaurant.restaurantBrand = JSON.parse($scope.restaurant.restaurantBrand);
			$scope.restaurant.city = JSON.parse($scope.restaurant.city);
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'RestaurantAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          restaurant: function () {
			            return $scope.restaurant;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/restaurantList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			restaurantService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.restaurantList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			restaurantService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'Restaurant with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting Restaurant with ID ' + id + '!', type: 'danger'});
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
			$scope.restaurant = {};
				restaurantBrandService.getAll()
					.success(function(data) {
							$scope.restaurantBrandList = data;
						});
				cityService.getAll()
					.success(function(data) {
							$scope.cityList = data;
						});
			if ($routeParams.id) {  // edit stranica
				restaurantService.getOne($routeParams.id)
						.success(function(data) {
							$scope.restaurant = data;
							menuItemService.getAllByRestaurant($scope.restaurant.id)
								.success(function(data) {
									$scope.menuItemList = data;
								})
								.error(function() {
									
								});
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'Restaurant with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('restaurant')
		.controller('RestaurantAddEditConfirmationController', RestaurantAddEditConfirmationController);
	
	RestaurantAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'restaurantService', 'restaurant'];
	function RestaurantAddEditConfirmationController($scope, $uibModalInstance, restaurantService, restaurant) {
	
		$scope.restaurant = restaurant;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			restaurantService.save($scope.restaurant)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


