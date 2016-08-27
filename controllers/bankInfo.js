var pg = require('pg');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: '0000', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

var bankInfoController = function() {};

bankInfoController.prototype.findBankInfo = function(res) {
	pool.connect(function(err, client, release) {
		client.query('SELECT * FROM bank_info', function(err, result) {
			release();
			var isSuccessed = false;
			if(!err) isSuccessed = true;
			res.json({
				'result': isSuccessed,
				'bankList': !err ? result.rows : []
			});
			// console.log(result);
		});
	});
};

bankInfoController.prototype.findBankInfoByBid = function(bankId, res) {
	pool.connect(function(err, client, release) {
		client.query('SELECT * FROM bank_info WHERE bid = $1', [bankId], function(err, result) {
			release();
			var isSuccessed = false;
			if(!err) isSuccessed = true;
			res.json({
				'result': isSuccessed,
				'bankList': !err ? result.rows : []
			});
			// console.log(result);
		});
	});
};

bankInfoController.prototype.createBankInfo = function(bankInfoObj, res) {
	pool.connect(function(err, client, release) {
		client.query(
			'INSERT INTO bank_info (name, address, tel, employees) VALUES($1, $2, $3, $4)', 
			[bankInfoObj.name, bankInfoObj.address, bankInfoObj.tel, bankInfoObj.employees], 
			function(err, result) {
				release();
				var isSuccessed = false;
				if(!err) isSuccessed = true;
				res.json({
					'result': isSuccessed
				});
				console.error(err);
				console.log(result);
		});
	});
};

module.exports = bankInfoController;