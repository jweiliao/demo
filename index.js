var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var bankInfoController = require('./controllers/bankInfo.js'),
	bankInfoControllerIns = new bankInfoController();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/bank', function(req, res) {
	console.log(req.query.bid)
	if(req.query.bid)
		bankInfoControllerIns.findBankInfoByBid(req.query.bid, res);
	else
		bankInfoControllerIns.findBankInfo(res);
});

app.post('/bank', function(req, res) {
	bankInfoControllerIns.createBankInfo(req.body, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});