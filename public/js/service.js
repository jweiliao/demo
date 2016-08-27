app.service('bankService', function($http) {
	var _self = this;
	_self.getBankInfo = function(callback) {
		$http.get('/bank').then(function(res) {
			callback(res);
		}, function(err) {
			console.log(err);
		});
	};
});