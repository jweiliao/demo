app.controller('bankInfoCtrl', function($scope, bankService) {
	bankService.getBankInfo(function(res) {
		$scope.bankInfo = res.data;
	});
});