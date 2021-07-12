const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'server/.env' });

function jwtGenerator(user_id) {
	const payload = {
		user_id: user_id,
	};

	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = jwtGenerator;
