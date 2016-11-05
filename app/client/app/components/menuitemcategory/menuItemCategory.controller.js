(function() {
	"use strict";

	angular
		.module('menuItemCategory')
		.controller('MenuItemCategoryController', MenuItemCategoryController);

	MenuItemCategoryController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	 
	'menuItemService', 
	'menuItemCategoryService'];

	function MenuItemCategoryController($scope, $location, $routeParams, $uibModal,
	 
	menuItemService, 
	menuItemCategoryService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.menuItemCategoryList = $scope.menuItemCategoryList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'MenuItemCategoryAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          menuItemCategory: function () {
			            return $scope.menuItemCategory;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/menuItemCategoryList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			menuItemCategoryService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.menuItemCategoryList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			menuItemCategoryService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'MenuItemCategory with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting MenuItemCategory with ID ' + id + '!', type: 'danger'});
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
			$scope.menuItemCategory = {};
			if ($routeParams.id) {  // edit stranica
				menuItemCategoryService.getOne($routeParams.id)
						.success(function(data) {
							$scope.menuItemCategory = data;
							menuItemService.getAllByMenuItemCategory($scope.menuItemCategory.id)
								.success(function(data) {
									$scope.menuItemList = data;
								})
								.error(function() {
									
								});
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'MenuItemCategory with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('menuItemCategory')
		.controller('MenuItemCategoryAddEditConfirmationController', MenuItemCategoryAddEditConfirmationController);
	
	MenuItemCategoryAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'menuItemCategoryService', 'menuItemCategory'];
	function MenuItemCategoryAddEditConfirmationController($scope, $uibModalInstance, menuItemCategoryService, menuItemCategory) {
	
		$scope.menuItemCategory = menuItemCategory;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			menuItemCategoryService.save($scope.menuItemCategory)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


