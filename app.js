// We define here our app params

const express = require("express"); // we import express module
const mongoose = require("mongoose"); // we import mongoose
const dotenv = require("dotenv"); // to import our environnement variables
const app = express(); // we tell that the app will run with express
const path = require("path"); // to have access to the file architecture
const userRoutes = require("./routes/user"); // we import the user router
const sauceRoutes = require("./routes/sauce"); // we import the sauce router
dotenv.config(); // to be able to use our environment variables
const helmet = require("helmet"); // we import helmet package to secure our headers
app.use(helmet()); // to use the default configuration of helmet
const rateLimit = require("express-rate-limit"); // we import the express-rate-limit module to avoid someone send too much request and destroy the server
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // We define a laps time of 10 minutes
	max: 100, // We define a maximum of 100 requests each 10 minutes on all our routes
});
app.use(limiter); // to use the request limiter

mongoose // we connect our API to the data base mongoDB
	.connect(process.env.MDBBC, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json()); // to be able to read the body request”

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cross-Origin-Resource-Policy", "same-site");
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

app.use("/images", express.static(path.join(__dirname, "images"))); // the route for the images storage
app.use("/api/auth", userRoutes); // the route for the user authentification datas
app.use("/api/sauces", sauceRoutes); // the route for the sauces datas

module.exports = app;
