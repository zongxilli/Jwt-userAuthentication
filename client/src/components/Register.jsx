import React, { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';

const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		name: '',
	});

	const { email, password, name } = inputs;
	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();

		try {
			// Because my server is waiting for {user_name, user_email, user_password }
			// {user_name, user_email, user_password } is the name of Cols in database
			const body = {
				user_email: email,
				user_password: password,
				user_name: name,
			};

			const response = await fetch(
				`http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/register`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			const parseResponse = await response.json();

			localStorage.setItem('token', parseResponse.token);

			setAuth(true);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<h1 className="text-center my-5">Register</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="email"
					name="email"
					placeholder="email"
					className="form-control my-3"
					value={email}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					className="form-control my-3"
					value={password}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="name"
					placeholder="name"
					className="form-control my-3"
					value={name}
					onChange={(e) => onChange(e)}
				/>
				<button className="btn-success btn-lock">Submit</button>
			</form>
			<Link to="/login">Login</Link>
		</Fragment>
	);
};

export default Register;
