import React, { Fragment, useState, useEffect } from 'react';

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState('');

	async function getName() {
		try {
			const response = await fetch(
				`http://localhost:${process.env.REACT_APP_SERVER_PORT}/dashboard`,
				{
					method: 'GET',
					headers: { token: localStorage.token },
				}
			);

			const parseResponse = await response.json();

			setName(parseResponse.user_name);
		} catch (err) {
			console.error(err.message);
		}
	}

	const logout = (e) => {
		e.preventDefault();

		localStorage.removeItem('token');

		setAuth(false);
	};

	useEffect(() => {
		getName();
	}, []);

	return (
		<Fragment>
			<h1>Dashboard --- user: {name}</h1>
			<button className="btn btn-primary" onClick={(e) => logout(e)}>
				Log Out
			</button>
		</Fragment>
	);
};

export default Dashboard;
