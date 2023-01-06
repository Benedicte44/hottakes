// Middlewares for the user authentification

const bcrypt = require("bcrypt"); // we import this package to allow data encryption
const User = require("../models/user"); // the user mongooe model is imported for its datas to be used in this file
const jwt = require("jsonwebtoken"); // we import this package to allow the user to remain connected during a defined time

exports.signup = (req, res, next) => {
	// the middleware to create new users
	bcrypt
		.hash(req.body.password, 10) // we hash the user password in 10 turns
		.then((hash) => {
			// we get the hashed password and we send it in the new user object
			const user = new User({
				email: req.body.email,
				password: hash,
			});
			user
				.save() // we register the user in the data base
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error })); // if there is a server error we send it in an object
};

exports.login = (req, res, next) => {
	// the middleware to connect existing users
	User.findOne({ email: req.body.email }) // we use the method findOne on User to verify if the user exists in our data base
		.then((user) => {
			if (!user) {
				// if the user doesn't exist in the data base
				return res
					.status(401)
					.json({ message: "Paire identifiant/mot de passe incorrecte" });
			} else {
				// if the user exists in the database
				bcrypt
					.compare(req.body.password, user.password) // we use this method to compare if the password of the body request fits with the user hashed password in our data base
					.then((valid) => {
						if (!valid) {
							// if the password is false
							return res
								.status(401)
								.json({ message: "Paire identifiant/mot de passe incorrecte" });
						} else {
							// if the password is true we send the datas that will be used for the authentification
							res.status(200).json({
								userId: user._id, // we get the user ID sent by the database
								token: jwt.sign(
									// with this function of the jsonwebtoken package the user receive a token that will expire in 1 hours
									{ userId: user._id },
									process.env.KEY_TOKEN,
									{ expiresIn: "1h" }
								),
							});
						}
					})
					.catch((error) => res.status(500).json({ error }));
			}
		})
		.catch((error) => res.status(500).json({ error }));
};
