var express = require('express');
var router = express.Router();

const cookieParser = require('cookie-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
	let infoObj = req.cookies.favorites || {};
	let goodEvil;
	let favFood = infoObj.favFood;
	let insanity = infoObj.insanity;
	let select_colors = infoObj.colors;
	if (typeof infoObj.good_evil !== 'undefined') {
		goodEvil = infoObj.good_evil;
	} else {
		goodEvil = 'default';
	}
	if (insanity <= 5) {
		insane_friends = `You have ${
			insanity
		} unicorn friends. You are not insane!`;
	} else {
		insane_friends = `You have ${insanity} unicorn friends. You are insane!!`;
	}
	let likes = [];
	let dislikes = [];
	//fill likes
	let fillLikes = () => {
		if (insanity <= 5) {
			likes.push('You like mild colors.');
		} else {
			likes.push('Your like dark and scary colors');
		}
		if (goodEvil === 'good') {
			likes.push('You like being humble and kind');
		} else {
			likes.push('You like being bossy');
		}
		if (select_colors) {
			likes.push(`Your favorite color is ${select_colors}`);
		}
		if (favFood) {
			likes.push(`Your favorite color is ${favFood}`);
		}
	};
	fillLikes();
	res.render('index', {
		goodEvil: goodEvil,
		select_colors: select_colors,
		insane_friends: insane_friends,
		likes: likes
	});
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
