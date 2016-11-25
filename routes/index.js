var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'aburd\'s Portfolio | aburdのポートフォリオ' });
});

router.get('/test', function(req, res, next) {
	res.render('index', { title: 'A Test', layout: 'layout-test' })
})

module.exports = router;