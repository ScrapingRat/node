const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect('mongodb+srv://commerce:commerce1@cluster0.8kcer.mongodb.net/test?retryWrites=true&w=majority',
	{	useNewUrlParser: true,
		useUnifiedTopology: true })
	.then(() => console.log('Successfully connected to MongoDB'))
	.then(() => console.log('running at http://localhost:4200/'))
	.catch(() => console.log('Connection to MongoDB failed'));

const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;