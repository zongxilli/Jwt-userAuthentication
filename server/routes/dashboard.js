const router = require('express').Router();
const db = require('../db/db');
const authorization = require('../middleware/authorization');


//` dashboard route + authorization middleware
router.get('/', authorization, async (req, res) => {
	try {
		// req.user_id has the payload
		// (See authorization.js ->  req.user_id = payload.user_id; )
		// (payload is from jwtGenerator.js -> const payload = {user_id: user_id} )
		// We have the user_id -> we can get the user full information from database
		const userName = await db
			.select('user_name')
			.from('user')
			.where('user_id', req.user_id);

		res.json(userName[0]);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('User Not Verified: Unexpected Server Error');
	}
});

module.exports = router;
