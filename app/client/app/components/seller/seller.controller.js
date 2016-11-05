(function() {
	"use strict";

	angular
		.module('seller')
		.controller('SellerController', SellerController);

	SellerController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	 
	
	'sellerService'];

	function SellerController($scope, $location, $routeParams, $uibModal,
	 
	
	sellerService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.sellerList = $scope.sellerList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'SellerAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          seller: function () {
			            return $scope.seller;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/sellerList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			sellerService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.sellerList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			sellerService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'Seller with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting Seller with ID ' + id + '!', type: 'danger'});
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
			$scope.seller = {};
			if ($routeParams.id) {  // edit stranica
				sellerService.getOne($routeParams.id)
						.success(function(data) {
							$scope.seller = data;
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'Seller with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('seller')
		.controller('SellerAddEditConfirmationController', SellerAddEditConfirmationController);
	
	SellerAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'sellerService', 'seller'];
	function SellerAddEditConfirmationController($scope, $uibModalInstance, sellerService, seller) {
	
		$scope.seller = seller;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			sellerService.save($scope.seller)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


