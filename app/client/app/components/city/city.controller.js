(function() {
	"use strict";

	angular
		.module('city')
		.controller('CityController', CityController);

	CityController.$inject = ['$scope', '$location', '$routeParams', '$uibModal',
	'countryService',  
	'restaurantService', 
	'cityService'];

	function CityController($scope, $location, $routeParams, $uibModal,
	countryService,  
	restaurantService, 
	cityService) {
	
		$scope.reverse = true;
		
		$scope.changeReverse = function() {
			$scope.cityList = $scope.cityList.slice().reverse();
		}
		
		$scope.maxSize = 12;
		
		$scope.open = function () {
			if(!$routeParams.if) {
			$scope.city.country = JSON.parse($scope.city.country);
			}
			var modalInstance = $uibModal.open({
				  animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'CityAddEditConfirmationController',
			      size : 'sm',
			      resolve: {
			          city: function () {
			            return $scope.city;
			          }
			      }
			});	
			
			modalInstance.result.then(function () {
					$location.path('/cityList');
			    }, function () {
			});
			
		}
		
		$scope.alerts = [];
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getAll = function() {
			cityService.getAll($scope.search, $scope.page-1)
					.success(function(data, status, headers) {
						$scope.cityList = data;
						$scope.hideSpinner = true;
						$scope.totalItems = headers('total-items');
					})
					.error(function() {
						$scope.showError = true;
						$scope.hideSpinner = true;
					});
		};
		
		$scope.remove = function(id) {
			cityService.remove(id)
					.success(function(data) {
						$scope.getAll();
						$scope.alerts.push({msg: 'City with ID ' + id + ' successufully deleted', type: 'success'});
					})
					.error(function() {
						$scope.alerts.push({msg: 'Error while deleting City with ID ' + id + '!', type: 'danger'});
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
			$scope.city = {};
				countryService.getAll()
					.success(function(data) {
							$scope.countryList = data;
						});
			if ($routeParams.id) {  // edit stranica
				cityService.getOne($routeParams.id)
						.success(function(data) {
							$scope.city = data;
							restaurantService.getAllByCity($scope.city.id)
								.success(function(data) {
									$scope.restaurantList = data;
								})
								.error(function() {
									
								});
							
							
						})
						.error(function() {
							$scope.alerts.push({msg: 'City with ID ' + $routeParams.id + ' does not exist!', type: 'danger'});
						});
			}
		};
	}
	
	angular
		.module('city')
		.controller('CityAddEditConfirmationController', CityAddEditConfirmationController);
	
	CityAddEditConfirmationController.$inject = ['$scope', '$uibModalInstance', 'cityService', 'city'];
	function CityAddEditConfirmationController($scope, $uibModalInstance, cityService, city) {
	
		$scope.city = city;
		
		$scope.confirm = function () {
			$scope.save();
		};
	
		$scope.revert = function () {
		    $uibModalInstance.dismiss();
		};
		
		$scope.save = function() {
			cityService.save($scope.city)
					.success(function() {
						$uibModalInstance.close();
					})
					.error(function() {
						$uibModalInstance.dismiss();
					});
		};
	}

})();


