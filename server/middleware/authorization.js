const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'server/.env' });

module.exports = async (req, res, next) => {
	try {
		const jwtToken = req.header('token');

		if (!jwtToken) {
			return res.status(403).json('Not Authorized');
		}

		// jwt.verify will tell us wether or not the TOKEN is valid
		const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

		// payload is in jwtGenerator
		req.user_id = payload.user_id;
	} catch (err) {
		console.error(err.message);
		return res.status(403).json('Not Authorized');
	}
};
