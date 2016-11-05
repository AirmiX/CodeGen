(function() {
	"use strict";

	angular
		.module('menuItem')
		.controller('MenuItemController', MenuItemController);

	MenuItemController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	'menuItemCategoryService', 'restaurantService',  
	
	'menuItemService'];

	function MenuItemController($scope, $location, $routeParams, $uibModal,
	menuItemCategoryService, restaurantService,  
	
	menuItemService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.menuItemList = $scope.menuItemList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			$scope.menuItem.menuItemCategory = JSON.parse($scope.menuItem.menuItemCategory);
			$scope.menuItem.restaurant = JSON.parse($scope.menuItem.restaurant);
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'MenuItemAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          menuItem: function () {
			            return $scope.menuItem;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/menuItemList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			menuItemService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.menuItemList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			menuItemService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'MenuItem with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting MenuItem with ID ' + id + '!', type: 'danger'});
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
			$scope.menuItem = {};
				menuItemCategoryService.getAll()
					.success(function(data) {
							$scope.menuItemCategoryList = data;
						});
				restaurantService.getAll()
					.success(function(data) {
							$scope.restaurantList = data;
						});
			if ($routeParams.id) {  // edit stranica
				menuItemService.getOne($routeParams.id)
						.success(function(data) {
							$scope.menuItem = data;
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'MenuItem with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('menuItem')
		.controller('MenuItemAddEditConfirmationController', MenuItemAddEditConfirmationController);
	
	MenuItemAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'menuItemService', 'menuItem'];
	function MenuItemAddEditConfirmationController($scope, $uibModalInstance, menuItemService, menuItem) {
	
		$scope.menuItem = menuItem;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			menuItemService.save($scope.menuItem)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


