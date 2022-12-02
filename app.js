const express = require('express'); // we import express module
const mongoose = require('mongoose'); // we import mongoose
const app = express(); // we tell that the app will run with express
const path = require('path');
const userRoutes = require('./routes/user'); // we import the user router
const sauceRoutes = require('./routes/sauce'); // we import the sauce router

mongoose // we connect our API to the data base mongoDB
	.connect(
		"mongodb+srv://Benedicte:Sasha15022020@cluster0.i0xseoy.mongodb.net/?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json()); // to be able to read the body request

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes); // the user authentification datas
app.use('/api/sauces', sauceRoutes); // the sauces datas

module.exports = app;