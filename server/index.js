const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: 'client/.env'});

// middleware

app.use(express.json());
app.use(cors());

//ROUTES

// register and login routes
app.use('/auth', require('./routes/jwtAuth'));

// dashboard route
app.use('/dashboard', require('./routes/dashboard'));

app.listen(process.env.SERVER_PORT, () => {
	console.log(`server is running on port ${process.env.SERVER_PORT}`);
});
