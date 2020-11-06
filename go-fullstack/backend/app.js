const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');

mongoose.connect('mongodb+srv://commerce:commerce1@cluster0.8kcer.mongodb.net/test?retryWrites=true&w=majority',
	{	useNewUrlParser: true,
		useUnifiedTopology: true })
	.then(() => console.log('Successfully connected to MongoDB'))
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

app.use('/api/stuff', stuffRoutes);

module.exports = app;
