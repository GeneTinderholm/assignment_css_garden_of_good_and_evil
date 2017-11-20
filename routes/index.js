var express = require('express');
var router = express.Router();

const cookieParser = require('cookie-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
	let infoObj = req.cookies.favorites;
	let goodEvil;
	if(typeof infoObj.good_evil !== 'undefined'){
		goodEvil = infoObj.good_evil;
	} else {
		goodEvil = 'default';
	}
	res.render('index', { goodEvil: goodEvil });
	console.log(req.cookies.favorites || 'No favorites');
});

router.post('/', function(req, res, next) {
	let infoObj = {};
	infoObj.good_evil = req.body.good_evil;
	infoObj.colors = req.body.colors;
	infoObj.favFood = req.body.favFood;
	infoObj.insanity = req.body.insanity;
	console.log(infoObj);
	res.cookie('favorites', infoObj);
	res.redirect('/');
});

module.exports = router;
