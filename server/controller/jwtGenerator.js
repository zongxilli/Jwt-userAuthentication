const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'server/.env' });

function jwtGenerator(user_id) {
	//= The second part of the token is the payload, which contains the claims. 
	//= Claims are statements about an entity (typically, the user) and additional data. 
	const payload = {
		user_id: user_id,
	};

	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = jwtGenerator;
