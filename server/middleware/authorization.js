const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'server/.env' });

module.exports = async (req, res, next) => {
	try {
		const jwtToken = req.header('token');

		if (!jwtToken) {
			return res.status(403).json('Not Authorized');
		}

		// If verify passed => it will go to next line
		// Otherwise => it will cause an error and go to 'catch (err) {}'
		// Payload contains {user_id : user_id} which we initialized in jwtGenerator.js
		// (Means when we generate a jwtToken, it will comes with a payload {user_id : user_id})
		const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

		req.user_id = payload.user_id;
	} catch (err) {
		console.error(err.message);
		return res.status(403).json('Not Authorized');
	}

	next();
};
