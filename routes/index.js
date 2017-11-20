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
	} else if(insanity > 5){
		insane_friends = `You have ${insanity} unicorn friends. You are insane!!`;
	} else {
		insane_friends = '';
	}

	let likes = [];
	let dislikes = [];
	//fill likes
	let fillLikes = () => {
		if (insanity <= 5) {
			likes.push('You like mild colors.');
			dislikes.push('You dislike dark and scary colors.');
		} else {
			likes.push('Your like dark and scary colors');
			dislikes.push('You dislike mild colors.');
		}
		if (goodEvil === 'good') {
			likes.push('You like being humble and kind');
			dislikes.push('You dislike being bossy.');
		} else {
			likes.push('You like being bossy');
			dislikes.push('You dislike being humble and kind.');
		}
		if (select_colors) {
			likes.push(`Your favorite color is ${select_colors}`);
			dislikes.push('You dislike invisible gremlins.');
		}
		if (favFood) {
			likes.push(`Your favorite food is ${favFood}`);
			dislikes.push('You dislike lutefisk!');
		}
	};
	fillLikes();
	let insanityMeter;
	if(insanity < 5){
		insanityMeter = "super insane";
	} else {
		insanityMeter = "super duper insane";
	}
	let biography;
	if(goodEvil && favFood && select_colors){
	biography = `You were born to a ${goodEvil} family. You went to school, where you learned to love ${favFood} and ${select_colors}. Later you attended Viking Code School where you went ${insanityMeter}!`;
} else {
	biography = "You need to fill out the form before we can tell you your life story.";
}

	let resume;
	switch(select_colors){
		case 'red':
			resume = "You can't seem to avoid fast cars.";
			break;
		case 'blue':
			resume = "You are infatuated with the sky.";
			break;
		case 'green':
			resume = "You gain great delight from being outdoors.";
			break;
		case 'yellow':
			resume = "You are a morning person."
			break;
	}

	if(goodEvil === 'good'){
		resume += " You had a job taking care of rescued orphan puppies.";
	}else {
		resume += " You had a job breaking into people's homes.";
	}
	if(!select_colors || !goodEvil){
		resume = "You need to fill out the form before we can give you your resume.";
	}

	test = (infoObj.good_evil && infoObj.colors && infoObj.favFood && infoObj.insanity);
	res.render('index', {
		goodEvil: goodEvil,
		select_colors: select_colors,
		insane_friends: insane_friends,
		likes: likes,
		dislikes: dislikes,
		biography: biography,
		resume: resume,
		test: test
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
