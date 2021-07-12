const router = require('express').Router();
const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../controller/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

//`register route + validInfo middleware
router.post('/register', validInfo, async (req, res) => {
	try {
		// Destructure the req.body   ex: (user_name, user_email, user_password)

		const { user_name, user_email, user_password } = req.body;

		// Check if user exists
		//const userInfo = await db.select().from('user').whereRaw('user_email = ?', [user_email]);
		const userInfo = await db
			.select()
			.from('user')
			.where('user_email', user_email);

		// User exists
		if (userInfo.length !== 0) {
			return res.status(401).send('User already exists');
		}

		// Bcrypt user_password
		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);
		const bcryptPassword = await bcrypt.hash(user_password, salt);

		// Write the new user into our database
		const newUser = await db('user')
			.insert({
				user_name,
				user_email,
				user_password: bcryptPassword,
			})
			.returning('*');

		// Generating jwt token
		// Passing newUser[0].user_id is for adding it into payload
		const token = jwtGenerator(newUser[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Register Failed: Unexpected Server Error');
	}
});

//`login route + validInfo middleware
router.post('/login', validInfo, async (req, res) => {
	try {
		// Destructure the req.body   ex: (user_name, user_email, user_password)
		const { user_email, user_password } = req.body;

		// Check if user exists
		const userInfo = await db
			.select()
			.from('user')
			.where('user_email', user_email);

		if (userInfo.length === 0) {
			return res.status(401).send('Please double check your email or password');
		}

		// Check if the password (user typed) is as same sa the password in database
		const validPassword = await bcrypt.compare(
			user_password,
			userInfo[0].user_password
		);

		if (!validPassword) {
			return res.status(401).json('Please double check your email or password');
		}

		// Give them the jwt token
		const token = jwtGenerator(userInfo[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Login Failed: Unexpected Server Error');
	}
});

//`user token verify route + authorization middleware
router.get('/is-verify', authorization, async (req, res) => {
	try {
		// If the req can reach to this point
		// => which means it already went through authorization middleware
		// => which means it is been verified
		// Otherwise
		// => it will Response with Status 401 + Error Message in middleware
		// => also will never reach to this point

		res.json(true);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('User Not Verified: Unexpected Server Error');
	}
});

module.exports = router;
