module.exports = (req, res, next) => {
	const { user_name, user_email, user_password } = req.body;

	// Check the email whether it is valid or not
	function validEmail(userEmail) {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
	}

	if (req.path === '/register') {
		// Check the infos whether any of them is empty or not

		if (![user_name, user_email, user_password].every(Boolean)) {
			return res.status(401).json('Missing Credential(s)');
		} else if (!validEmail(user_email)) {
			return res.status(401).json('Email Is Invalid');
		}
	} else if (req.path === '/login') {
		if (![user_email, user_password].every(Boolean)) {
			return res.status(401).json('Missing Credential(s)');
		} else if (!validEmail(user_email)) {
			return res.status(401).json('Email Is Invalid');
		}
	}

	next();
};
