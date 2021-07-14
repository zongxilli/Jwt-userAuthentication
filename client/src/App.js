import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

// react-toastify better do this at root file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

import dotenv from 'dotenv';
dotenv.config();

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	async function isAuth() {
		try {
			// authentication middleware => return true if user is authenticated, false otherwise
			const response = await fetch(
				`http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/is-verify`,
				{
					method: 'GET',
					headers: { token: localStorage.token },
				}
			);

			const parseResponse = await response.json();

			parseResponse === true
				? setIsAuthenticated(true)
				: setIsAuthenticated(false);
		} catch (error) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		isAuth();
	});

	return (
		<Fragment>
			<BrowserRouter>
				<div className="container">
					<Switch>
						<Route
							exact
							path="/login"
							render={(props) =>
								!isAuthenticated ? (
									<Login {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/dashboard" />
								)
							}
						/>
						<Route
							exact
							path="/register"
							render={(props) =>
								!isAuthenticated ? (
									<Register {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/dashboard"
							render={(props) =>
								isAuthenticated ? (
									<Dashboard {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
