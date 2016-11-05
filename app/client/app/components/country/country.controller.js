(function() {
	"use strict";

	angular
		.module('country')
		.controller('CountryController', CountryController);

	CountryController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	 
	'cityService', 
	'countryService'];

	function CountryController($scope, $location, $routeParams, $uibModal,
	 
	cityService, 
	countryService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.countryList = $scope.countryList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'CountryAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          country: function () {
			            return $scope.country;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/countryList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			countryService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.countryList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			countryService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'Country with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting Country with ID ' + id + '!', type: 'danger'});
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
			$scope.country = {};
			if ($routeParams.id) {  // edit stranica
				countryService.getOne($routeParams.id)
						.success(function(data) {
							$scope.country = data;
							cityService.getAllByCountry($scope.country.id)
								.success(function(data) {
									$scope.cityList = data;
								})
								.error(function() {
									
								});
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'Country with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('country')
		.controller('CountryAddEditConfirmationController', CountryAddEditConfirmationController);
	
	CountryAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'countryService', 'country'];
	function CountryAddEditConfirmationController($scope, $uibModalInstance, countryService, country) {
	
		$scope.country = country;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			countryService.save($scope.country)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


