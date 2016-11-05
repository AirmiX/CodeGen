(function() {
	"use strict";

	angular
		.module('admin')
		.controller('AdminController', AdminController);

	AdminController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	 
	
	'adminService'];

	function AdminController($scope, $location, $routeParams, $uibModal,
	 
	
	adminService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.adminList = $scope.adminList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'AdminAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          admin: function () {
			            return $scope.admin;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/adminList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			adminService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.adminList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			adminService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'Admin with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting Admin with ID ' + id + '!', type: 'danger'});
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
			$scope.admin = {};
			if ($routeParams.id) {  // edit stranica
				adminService.getOne($routeParams.id)
						.success(function(data) {
							$scope.admin = data;
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'Admin with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('admin')
		.controller('AdminAddEditConfirmationController', AdminAddEditConfirmationController);
	
	AdminAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'adminService', 'admin'];
	function AdminAddEditConfirmationController($scope, $uibModalInstance, adminService, admin) {
	
		$scope.admin = admin;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			adminService.save($scope.admin)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


