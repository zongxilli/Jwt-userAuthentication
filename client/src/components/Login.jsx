import React, { Fragment, useState } from 'react';

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = setState({
		email: '',
		password: '',
	});

	const { email, password } = inputs;

	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	return (
		<Fragment>
			<h1 className="text-center my-5">Login</h1>
			<form>
				<input
					type="email"
					name="email"
					placeholder="email"
					className="form-control my-3"
					value={email}
					onChange={ e => onChange(e)}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					className="form-control my-3"
					value={password}
					onChange={ e => onChange(e)}
				/>
				<button className="btn btn-success btn-block">Submit</button>
			</form>
		</Fragment>
	);
};

export default Login;
